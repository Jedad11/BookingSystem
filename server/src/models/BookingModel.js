import db from "../configs/database.js";
import { minutesToTime } from "../utils/BookingUtil.js";
import { formatISODate } from "../utils/BookingUtil.js";

export const displayRooms = async (room_name) => {
  const [response] = await db.promise().query(
    `SELECT *
    FROM rooms
    WHERE room_name like ?`,
    [room_name]
  );
  return response;
};

export const searchRooms = async (room_name) => {
  const searchTerm = `${room_name}%`;
  const [response] = await db.promise().query(
    `SELECT *
    FROM rooms
    WHERE room_name LIKE ?`,
    [searchTerm]
  );
  return response;
};

export const findAllRooms = async () => {
  const [response] = await db.promise().query(
    `SELECT *
    FROM rooms`
  );
  return response;
};

export const searchBuildings = async (building_name) => {
  const searchTerm = `${building_name}%`;
  const [response] = await db.promise().query(
    `SELECT *
    FROM buildings
    `
    // [searchTerm]
  );
  return response;
};
export const displayBuildings = async (building_name) => {
  const [response] = await db.promise().query(
    `SELECT *
        FROM buildings
        WHERE building_name like ?`,
    [building_name]
  );
  return response;
};

export const addReport = async (reportData) => {
  const {
    room_name,
    brief_description,
    full_description,
    user_role,
    start_day,
    end_day,
  } = reportData;
  const [response] = await db
    .promise()
    .query(
      `INSERT INTO reports (room_name, brief_description, full_description,user_role,start_day,end_day) VALUES (?, ?, ?,?,?,?)`,
      [
        room_name,
        brief_description,
        full_description,
        user_role,
        start_day,
        end_day,
      ]
    );
};

export const getReserveDetails = async () => {
  const [response] = await db.promise().query(
    `SELECT *
        FROM booking join mydb.booking_detail bd on booking.booking_id = bd.booking_id
        ORDER BY booking.booking_id DESC LIMIT 1;`
  );
  return response;
};

export const getAllReserveDetails = async () => {
  const [response] = await db.promise().query(
    `SELECT *
        FROM booking join mydb.booking_detail bd on booking.booking_id = bd.booking_id;`
  );
  return response;
};

export const BookingReserves = async (bkReserves) => {
  const {
    booking_title,
    booking_date,
    booking_create,
    room_name,
    start_time,
    end_time,
    user_id,
    user_firstname,
    user_lastname,
    user_email,
    user_tel,
    user_role,
  } = bkReserves;

  try {
    // **1. Check for Booking Conflicts**
    const checkQuery = `
            SELECT * 
            FROM booking b
            JOIN booking_detail bd ON b.booking_id = bd.booking_id
            WHERE b.room_name = ?
            AND b.booking_date = ?
            AND (
                (bd.start_time < ? AND bd.end_time > ?)  -- New booking overlaps existing
                OR
                (bd.start_time >= ? AND bd.start_time < ?)  -- New booking starts inside existing
                OR
                (bd.end_time > ? AND bd.end_time <= ?)  -- New booking ends inside existing
);

        `;

    const [existingBookings] = await db
      .promise()
      .query(checkQuery, [
        room_name,
        booking_date,
        start_time,
        end_time,
        start_time,
        end_time,
        start_time,
        end_time,
      ]);

    if (existingBookings.length > 0) {
      return {
        success: false,
        message:
          "Booking conflict detected. Please choose a different time slot.",
      };
    }

    // **2. Insert into `booking` Table**
    const insertBookingQuery = `
            INSERT INTO booking
            (room_name, booking_title, booking_date, 
            user_id, user_firstname, user_lastname, user_email, user_tel, user_role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

    const bookingValues = [
      room_name,
      booking_title,
      booking_date,
      user_id,
      user_firstname,
      user_lastname,
      user_email,
      user_tel,
      user_role,
    ];

    const [bookingResponse] = await db
      .promise()
      .query(insertBookingQuery, bookingValues);
    const booking_id = bookingResponse.insertId;

    // **3. Insert into `booking_detail` Table**
    const durationMin =
      (new Date(`1970-01-01T${end_time}Z`) -
        new Date(`1970-01-01T${start_time}Z`)) /
      60000;
    const duration = minutesToTime(90); // Converts 90 → "01:30:00"
    const formattedDate = formatISODate(booking_create);

    const insertDetailQuery = `
        INSERT INTO booking_detail 
        (booking_id, booking_createAt, start_time, end_time, duration)
        VALUES (?, ?, ?, ?, ?);
        `;

    const bookingDetailValues = [
      booking_id,
      formattedDate,
      start_time,
      end_time,
      duration,
    ];

    await db.promise().query(insertDetailQuery, bookingDetailValues);

    return { success: true, message: "Booking confirmed!", booking_id };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Database error. Please try again later.",
    };
  }
};

export const removeReserves = async (booking_id) => {
  await db.promise().query(
    `DELETE booking_detail  FROM booking_detail
         WHERE booking_detail.booking_id = ?`,
    [booking_id]
  );

  await db.promise().query(
    `DELETE booking FROM booking
         WHERE booking.booking_id = ?`,
    [booking_id]
  );
};

export const updateBooking = async (bkReserves) => {
  const {
    booking_id,
    booking_title,
    booking_date,
    booking_create,
    room_name,
    start_time,
    end_time,
    user_id,
    user_firstname,
    user_lastname,
    user_email,
    user_tel,
    user_role,
  } = bkReserves;

  try {
    // **1. Check for Booking Conflicts**
    const checkQuery = `
            SELECT * 
            FROM booking b
            JOIN booking_detail bd ON b.booking_id = bd.booking_id
            WHERE b.room_name = ?
            AND b.booking_date = ?
            AND (
                (bd.start_time < ? AND bd.end_time > ?)  -- New booking overlaps existing
                OR
                (bd.start_time >= ? AND bd.start_time < ?)  -- New booking starts inside existing
                OR
                (bd.end_time > ? AND bd.end_time <= ?)  -- New booking ends inside existing
            );
        `;

    const [existingBookings] = await db
      .promise()
      .query(checkQuery, [
        room_name,
        booking_date,
        start_time,
        end_time,
        start_time,
        end_time,
        start_time,
        end_time,
      ]);

    if (existingBookings.length > 0) {
      return {
        success: false,
        message:
          "Booking conflict detected. Please choose a different time slot.",
      };
    }

    // **2. Update Booking Information**
    const updateBookingQuery = `
        UPDATE booking
        SET 
            room_name = ?, 
            booking_title = ?, 
            booking_date = ?, 
            user_id = ?, 
            user_firstname = ?, 
            user_lastname = ?, 
            user_email = ?, 
            user_tel = ?, 
            user_role = ?
        WHERE booking_id = ?;
        `;

    const bookingValues = [
      room_name,
      booking_title,
      booking_date,
      user_id,
      user_firstname,
      user_lastname,
      user_email,
      user_tel,
      user_role,
      booking_id,
    ];

    const [bookingResponse] = await db
      .promise()
      .query(updateBookingQuery, bookingValues);

    if (bookingResponse.affectedRows === 0) {
      return { success: false, message: "No booking found to update." };
    }

    // **3. Update `booking_detail` Table**
    const durationMin =
      (new Date(`1970-01-01T${end_time}Z`) -
        new Date(`1970-01-01T${start_time}Z`)) /
      60000;

    function minutesToTime(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}:00`;
    }

    const duration = minutesToTime(durationMin);

    const updateDetailQuery = `
        UPDATE booking_detail 
        SET booking_createAt = ?, start_time = ?, end_time = ?, duration = ?
        WHERE booking_id = ?;
        `;

    const bookingDetailValues = [
      booking_create,
      start_time,
      end_time,
      duration,
      booking_id,
    ];

    await db.promise().query(updateDetailQuery, bookingDetailValues);

    return {
      success: true,
      message: "Booking updated successfully!",
      booking_id,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Database error. Please try again later.",
    };
  }
};


  