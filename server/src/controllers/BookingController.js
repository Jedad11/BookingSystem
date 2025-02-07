import * as bookingModel from "../models/BookingModel.js";


export const getReserveDetails = async (req,res) => {
    try {
      const ReserveDetails = await bookingModel.getReserveDetails();
      return res.json({
        success: true,
        data: ReserveDetails,
        message: "Reserve details retrieved successfully",
      });
    }catch (error) {
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
// const room_name ="CB2308"

export const searchRooms = async (req, res) => {
  try {
    const searchRoom = await bookingModel.searchRooms(room_name);
    return res.json({
      success: true,
      data: searchRoom,
      message: "Search room successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to search room",
  });
}
};

const building_name = "CB2"
export const searchBuilding = async (req, res) => {
  try {
    const searchBuilding = await bookingModel.searchBuilding(building_name);
    return res.json({
      success: true,
      data: searchBuilding,
      message: "Search building successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to search building",
  });
}
};

const report = {
  room_name:"CB2301",
  brief_description:"Hello Capibara", 
  full_description:"activity", 
  user_role:"Student", 
  start_day:'2025-2-9', 
  end_day:'2025-2-10'
}

export const addReports = async (req, res) => {
  try {
    const AddReport = await bookingModel.addReports(report);
    return res.json({
      success: true,
      data: AddReport,
      message: "Add report successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to add report",
  });
}
};