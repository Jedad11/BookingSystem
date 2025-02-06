export const BookingReserves = async (bkReserves) => {
    const bkReserves = {
        booking: {
            id: booking_id,
            title: booking_title,
            date: booking_date,
            created_at: booking_create,
            room: room_name,
            start_time,
            end_time,
            repeat: {
                type: repeat_type,
                day: repeat_day
            }
        },
        user: {
            id: user_id,
            firstname: user_firstname,
            lastname: user_lastname,
            email: user_email,
            phone: user_tel,
            role: user_role,
            department: user_department
        }
    };
    

    

     

    
    const [response] = await db.promise().query( 
        
        
    )
    return response;
}