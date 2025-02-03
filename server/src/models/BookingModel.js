import db from "../configs/database.js"


export const searchRooms = async (room_name) => {
    const [response] = await db.promise().query(
    `SELECT *
    FROM rooms
    WHERE room_name like ?`,[room_name]
    )
    return response;
}

export const searchBuilding = async (building_name) => {
    const [response] = await db.promise().query(
        `SELECT *
        FROM buildings
        WHERE building_name like ?`,[building_name]
    )
    return response;
}

export const getReserveDetails = async () => {
    const [response] = await db.promise().query( 
        `SELECT booking.user_id, user_firstname, user_lastname, user_email,
       user_tel, user_role, department_name , booking_id, booking_id,
       room_name, booking_title, booking_date, start_time, end_time, duration
        FROM booking join mydb.users u on u.user_id = booking.user_id `
    )
    return response;
}