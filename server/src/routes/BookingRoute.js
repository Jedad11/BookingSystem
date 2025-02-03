import express from "express"
import {searchRooms} from "./model/Bookingmodel.js"

const Bookingroute = express.Router();

Bookingroute.get("/searchRoom",searchRooms)