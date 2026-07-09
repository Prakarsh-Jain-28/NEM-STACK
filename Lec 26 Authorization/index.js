require("dotenv").config();

const URL = require("./models/url");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./connection");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const logReqRes = require("./middleware/index");
const {loginRestriction} = require("./middleware/Auth");

const path = require("path");

const app = express();

//connect to mongoDB
connectMongoDB(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB Connection Established")})
.catch((err)=>{
    console.log("Error - ",err);
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(logReqRes("log.txt"));

//routes

app.use("/user",userRouter);
app.use("/",loginRestriction,staticRouter);

app.listen(process.env.PORT,()=>{console.log("Server Started")});