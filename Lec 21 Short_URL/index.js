require("dotenv").config();

const express = require("express");
const connectMongoDB = require("./connection");
const urlRouter = require("./routes/url");
const shortIdRouter = require("./routes/short");
const logReqRes = require("./middleware");

const app = express();

//connect to mongoDB
connectMongoDB(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB Connection Established")})
.catch((err)=>{
    console.log("Error - ",err);
});

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logReqRes("log.txt"));

//routes
app.use("/url",urlRouter);
app.use("/:id",shortIdRouter);

app.listen(process.env.PORT,()=>{console.log("Server Started")});