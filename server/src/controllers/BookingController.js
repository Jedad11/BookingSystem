import * as bookingModel from "../models/BookingModel.js";

export const getReserveDetails = async (req, res) => {
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

const room_name ="CB2308"

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