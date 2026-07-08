require("dotenv").config();

const URL = require("./models/url");
const express = require("express");
const connectMongoDB = require("./connection");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const logReqRes = require("./middleware");

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
app.use(logReqRes("log.txt"));

//routes

app.use("/url",urlRouter);
app.use("/",staticRouter);

app.listen(process.env.PORT,()=>{console.log("Server Started")});