import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const BookingRoute = express.Router();

BookingRoute.get("/searchRoom",BookingController.searchRooms)
BookingRoute.get("/searchBuilding",BookingController.searchBuilding)
BookingRoute.get("/reserveDetails",BookingController.getReserveDetails)
BookingRoute.post("/booking",BookingController.createBooking)

export default BookingRoute;
