import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const BookingRoute = express.Router();

BookingRoute.get("/reserveDetails",BookingController.getReserveDetails)

export default BookingRoute;