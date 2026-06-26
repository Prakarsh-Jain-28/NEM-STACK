const fs = require("fs");

fs.writeFileSync("./testSync.txt","Hello from NodeJS");
fs.cpSync("./testSync.txt","./copySync.txt");
fs.appendFileSync("./testSync.txt","\nAppending from NodeJS");

const a = fs.readFileSync("./testSync.txt","utf-8");
const b = fs.readFileSync("./copySync.txt","utf-8");
console.log(a + "\n" + b + "\n");

// console.log(fs.statSync("./testSync.txt"));
// fs.unlinkSync("./testSync.txt");
// fs.unlinkSync("./copySync.txt");

