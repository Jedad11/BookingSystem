import db from "../configs/database.js";


export const getReserveDetails = async () => {
    const [response] = await db.promise().query( 
        `SELECT *
        FROM booking join mydb.booking_detail bd on booking.booking_id = bd.booking_id
        ORDER BY booking.booking_id DESC LIMIT 1;`
    )
    return response;
}


export const BookingReserves = async (bkReserves) => {
    const {
        booking_title, booking_date, booking_create, room_name,
        start_time, end_time, repeat_type, repeat_day,
        user_id, user_firstname, user_lastname, user_email, user_tel, user_role, user_department
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

        const [existingBookings] = await db.promise().query(checkQuery, [
            room_name, booking_date, start_time, end_time,
            start_time, end_time, start_time, end_time
        ]);

        if (existingBookings.length > 0) {
            return { success: false, message: "Booking conflict detected. Please choose a different time slot." };
        }

        // **2. Insert into `booking` Table**
        const insertBookingQuery = `
            INSERT INTO booking
            (room_name, booking_title, booking_date, 
            user_id, user_firstname, user_lastname, user_email, user_tel, user_role, user_department)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const bookingValues = [
            room_name, booking_title, booking_date,
            user_id, user_firstname, user_lastname, user_email, user_tel, user_role, user_department
        ];

        const [bookingResponse] = await db.promise().query(insertBookingQuery, bookingValues);
        const booking_id = bookingResponse.insertId;

        // **3. Insert into `booking_detail` Table**
        const durationMin = (new Date(`1970-01-01T${end_time}Z`) - new Date(`1970-01-01T${start_time}Z`)) / 60000;


        function minutesToTime(minutes) {
            let hours = Math.floor(minutes / 60);
            let mins = minutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
        }
        const duration = minutesToTime(90); // Converts 90 → "01:30:00"

        const insertDetailQuery = `
        INSERT INTO booking_detail 
        (booking_id, booking_createAt, start_time, end_time, duration, repeat_type, repeat_day)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        const bookingDetailValues = [booking_id, booking_create, start_time, end_time, duration, repeat_type, repeat_day];

        await db.promise().query(insertDetailQuery, bookingDetailValues);


        return { success: true, message: "Booking confirmed!", booking_id };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, message: "Database error. Please try again later." };
    }
};






