const express = require("express");
const users = require("../MOCK_DATA.json");

const app = express();
let myName = "Unknown User";

//GET Rest API only
app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map(user=>`<li>${user.first_name} ${user.last_name}`).join("")}
    </ul>`;
    res.send(html);
});

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    if(user) return res.json(user);
    else return res.end("Invalid User ID");
});

app.listen(8000, () => console.log("Server Started!"));