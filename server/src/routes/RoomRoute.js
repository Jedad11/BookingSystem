import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const RoomRoute = express.Router();

RoomRoute.get("/search",BookingController.searchRooms)
RoomRoute.get("/display",BookingController.displayRooms)

export default RoomRoute;