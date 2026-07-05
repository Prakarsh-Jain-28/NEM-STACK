require("dotenv").config();

const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const {connectMongoDB} = require("./connection");
const {logReqRes} = require("./middleware");
//connection database

connectMongoDB(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB Connection Established"))
    .catch(err=>console.log("Error - ",err));




//middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

// url route
app.use("/api/users", userRouter);

app.listen(process.env.PORT,()=>console.log("Server Started"));

//npm start in integrated terminal