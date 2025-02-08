import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const BuidlingRoute = express.Router();

BuidlingRoute.get("/search",BookingController.searchBuildings)
BuidlingRoute.get("/display",BookingController.displayBuildings)

export default BuidlingRoute;