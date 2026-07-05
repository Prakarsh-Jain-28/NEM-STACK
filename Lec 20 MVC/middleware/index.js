const fs = require("fs");

function logReqRes(filename)
{
    return (req,res,next) => {
        fs.appendFile(
            filename,
            `${Date.now()}: ${req.method}: ${req.path}\n`,
            (err,val) => {
                next();
            }
        );
    };
}
//structure of middleware
// app.use((req,res,next)=>{
//     //function
//     next();
// })


module.exports = {
    logReqRes,
}