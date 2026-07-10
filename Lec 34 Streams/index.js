const express = require("express");
const fs = require("fs");
const zlib = require("zlib");

const app = express();

const PORT = 8000;

//creating zip file
fs.createReadStream(`./sample.txt`).pipe(zlib.createGzip().pipe(fs.createWriteStream(`./sample.zip`)));

//writing a file
app.get("/", (req, res) => {
    const stream = fs.createReadStream("./sample.txt","utf-8");
    stream.on("data",(chunk)=>{
        res.write(chunk);
    })
    stream.on("end",()=>res.end());
});

app.listen(PORT, () =>
    console.log(`Server Started at http://localhost:${PORT}`)
);