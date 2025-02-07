import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const SearchRoute = express.Router();

BookingRoute.get("/searchRoom",BookingController.searchRooms)
BookingRoute.get("/searchBuilding",BookingController.searchBuilding)

export default SearchRoute;