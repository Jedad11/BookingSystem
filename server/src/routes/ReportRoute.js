import express from "express"
import * as BookingController from '../controllers/BookingController.js'

const ReportRoute = express.Router();

ReportRoute.post("/report",BookingController.addReport)

export default ReportRoute;