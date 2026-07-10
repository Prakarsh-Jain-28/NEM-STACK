const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    return res.json({
        message: "Hello From Server",
        server: process.pid
    });
});
 
app.listen(8000,()=> console.log("Server Started"));