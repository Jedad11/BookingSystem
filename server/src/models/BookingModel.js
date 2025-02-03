import db from "./config/database.js"

export const searchRooms = async (room_name) => {
    `select *
    from rooms
    where room_name like ?`[room_name]
}