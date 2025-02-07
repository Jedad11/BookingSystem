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

  export const addReport = async (req,res) => {
    const reportData = req.body;
    try {
      const addReport= await bookingModel.addReport(reportData);
      return res.json({
        success: true,
        data: addReport,
        message: "reported successfully",
      });
    }catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to report",
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
  const room_name = req.body.room_name;
  console.log(req.body.room_name);
  
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
export const displayRooms = async (req, res) => {
  try {
    const displayRoom = await bookingModel.displayRooms(room_name);
    return res.json({
      success: true,
      data: displayRoom,
      message: "Display room successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to display room",
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

export const deleteReserve = async (req, res) => {
  const booking_id = req.body.booking_id;
  try {
    const deleteReserve = await bookingModel.removeReserves(booking_id);
    return res.json({
      success: true,
      data: deleteReserve,
      message: "Deletes reserve successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to deletes",
  });
}
};

export const updateReserve = async (req, res) => {
  const bkReserves = req.body
  try {
    const updateReserves = await bookingModel.updateBooking(bkReserves);
    return res.json({
      success: true,
      data: updateReserves,
      message: "Update reserve successfully",
    });
  }catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to updates",
  });
}
};

export const getAllReserve = async (req,res) => {
  try {
    const AllReserveDetails = await bookingModel.getAllReserveDetails();
    return res.json({
      success: true,
      data: AllReserveDetails,
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