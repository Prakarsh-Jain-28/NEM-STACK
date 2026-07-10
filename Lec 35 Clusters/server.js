const cluster = require("node:cluster");
const os = require("os");
const express = require("express");

const ncpu = os.cpus().length;


if(cluster.isPrimary)
{
    for(let i=0;i<ncpu;i++)
    {
        cluster.fork();
    }
}
else
{
    const app = express();
    
    app.get("/",(req,res)=>{
        return res.json({
            message: "Hello From Server",
            server: process.pid
        });
    });
     
    app.listen(8000,()=> console.log("Server Started"));
}