const fs = require("fs");

fs.writeFile("./test.txt", "Hello from NodeJS", (err) => {
    if (err) return console.log(err);

    fs.cp("./test.txt", "./copy.txt", (err) => {
        if (err) return console.log(err);

        fs.appendFile("./test.txt", "\nAppending from NodeJS", (err) => {
            if (err) return console.log(err);

            fs.readFile("./test.txt", "utf-8", (err, data) => {
                console.log(data);
            });
            fs.readFile("./copy.txt", "utf-8", (err, data) => {
                console.log(data);
            });
        });
    });
});

// console.log(fs.stat("./test.txt",(err,res)=>{
//     if(err) console.log(err);
//     else console.log(res);
// }));
// fs.unlink("./test.txt",(err)=>{console.log(err);});
// fs.unlink("./copy.txt",(err)=>{console.log(err);});