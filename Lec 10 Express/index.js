const express = require("express");

const app = express();
let myName = "Unknown User";

app.get("/" || "/home",(req,res)=>{    //home = http://localhost:8000/?name=Hardik
    if(req.query.name) myName = req.query.name;
    res.end(`Hello ${myName} from server`);
});
app.get("/results",(req,res)=>{     //yt search = http://localhost:8000/results?search_query=chessbase+india&name=Raj
    const sq = req.query.search_query;
    res.end(`Here are your results for ${sq}\nBe sure to Subscribe!`);    
});
app.get("/search",(req,res)=>{   //google search = http://localhost:8000/search?q=ipl+2026&name=Gauri
    const q = req.query.q;
    res.end(`Here are your results for ${q}\nTry out Gemini for Free!`);    
});

app.listen(8000, () => console.log("Server Started!"));