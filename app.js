const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoutes"); 
const instructorRouter = require("./routes/instructorRoutes");
const courseRouter = require("./routes/courseRoutes");
const studentRouter = require("./routes/studentRoutes");
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(express.json()) //BODY PARSER
app.use(morgan("dev")) //CAHNGE FOR PROD
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/admin",adminRouter);
app.use("/instructor",instructorRouter);
app.use("/course",courseRouter);
app.use("/student",studentRouter);

module.exports = app;