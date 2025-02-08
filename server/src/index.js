import express from "express"
import connection from "./configs/database.js";
const app = express();
const port = 3000;
import BookingRoute from "./routes/BookingRoute.js";
import cors from "cors"; // import cross origin security
import { logger } from "./middlewares/BookingMiddleware.js";
import ReportRoute from "./routes/ReportRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import BuildRoute from "./routes/BuildingRoute.js";


app.use(logger);
app.use(express.json());
app.use(cors()) // cors have in slide, cross origin
app.use("/api/booking", BookingRoute);
app.use("/api/report", ReportRoute)
app.use("/api/room", RoomRoute)
app.use("/api/building", BuildRoute)

connection.connect( (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Database is connected");
    }
})

app.listen(port,() => {
    console.log(`App listen on port ${port}`);   
})