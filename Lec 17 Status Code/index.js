// Status Code Demonstration

const express = require("express");
const users = require("../MOCK_DATA.json");

const app = express();
let myName = "Unknown User";


app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    if(isNaN(id))
    {
        return res.status(400).json({status: "Bad Request", message: "Enter a Valid ID number"});
    }
    const user = users.find(user => user.id === id);
    if(!user)
    {
        return res.status(404).json({status: "User Not Found", message: "Enter a Valid ID number"});
    }

    return res.status(200).json({status: "Success", data: user});
});

app.listen(8000, () => console.log("Server Started!"));