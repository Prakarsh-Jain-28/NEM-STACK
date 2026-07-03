const express = require("express");
const users = require("../MOCK_DATA.json");

const app = express();
let myName = "Unknown User";


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











// app.get("/" || "/home",(req,res)=>{    //home = http://localhost:8000/?name=Hardik
//     if(req.query.name) myName = req.query.name;
//     res.end(`Hello ${myName} from server`);
// });
// app.get("/results",(req,res)=>{     //yt search = http://localhost:8000/results?search_query=chessbase+india&name=Raj
//     const sq = req.query.search_query;
//     res.end(`Here are your results for ${sq}\nBe sure to Subscribe!`);    
// });
// app.get("/search",(req,res)=>{   //google search = http://localhost:8000/search?q=ipl+2026&name=Gauri
//     const q = req.query.q;
//     res.end(`Here are your results for ${q}\nTry out Gemini for Free!`);    
// });

app.listen(8000, () => console.log("Server Started!"));