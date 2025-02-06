import * as bookingModel from "../models/BookingModel.js";


export const getReserveDetails = async (req,res) => {
    try {
      const ReserveDetails = await bookingModel.getReserveDetails();
      return res.json({
        success: true,
        data: ReserveDetails,
        message: "Reserve details retrieved successfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to retrieve Reserve details",
      });
    }
  };

export const createBooking = async (req, res) => {
      try {
          const bookingData = req.body;
          const response = await bookingModel.BookingReserves(bookingData);
  
          if (!response.success) {
              return res.status(400).json(response); // Conflict or error
          }
  
          return res.status(201).json(response); // Successfully booked
          } catch (error) {
              console.error("Error: ", error);
              return res.status(500).json({
              success: false,
              message: "Failed to create booking.",
          });
      }
  };
  