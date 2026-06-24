const math1 = require("./math1");
const math2 = require("./math2");

console.log("Hello World");
console.log("Using Single Export = ",math1);
console.log(math1.add(2,3));
console.log(math1.sub(2,3));
console.log(math1.mul(2,3));

console.log();
console.log("Using Export Object (multiple export) = ",math2);
console.log(math2.add(2,3));
console.log(math2.sub(2,3));
console.log(math2.mul(2,3));
