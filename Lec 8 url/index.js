const http = require("http");
const fs = require("fs");
const url = require("url");

//how google and youtube works 
const server = http.createServer((req,res)=>{
    const myurl = url.parse(req.url,true);
    if(myurl.pathname==="/favicon.ico") return res.end();

    let myName = "Unknown User";
    if(myurl.query.name) myName = myurl.query.name;

    const queryPairs = Object.entries(myurl.query || {})
    .map(([key, val]) => `  ${key}: ${val}`)
    .join("\n");

    const log = `${Date.now()}: ${myurl.pathname} New Req from -> ${myName}\nQueries:\n${queryPairs || '  None'}\n\n`;


    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myurl.pathname)
        {
            case "/":
            case "/home": //home = http://localhost:8000/?name=Hardik
                res.end(`Hello ${myName} from server`);
                break;

            case "/about":  //about = http://localhost:8000/about?name=Sachin&age=25&gender=Male
                const myAge = myurl.query.age;
                const myGender = myurl.query.gender;
                res.end(`Server is being handled by ${myName}\n
                         I am ${myAge} years old\n
                         I am ${myGender}`);
                break;

            case "/results":  //yt search = http://localhost:8000/results?search_query=chessbase+india&name=Raj
                const sq = myurl.query.search_query;
                res.end(`Here are your results for ${sq}\nBe sure to Subscribe!`);
                break;

            case "/search":  //google search = http://localhost:8000/search?q=ipl+2026&name=Gauri
                const q = myurl.query.q;
                res.end(`Here are your results for ${q}\nTry out Gemini for Free!`);
                break;

            default: 
                res.end("Error 404\nPage Does Not Exist");
                break;
        }
    });
});

server.listen(8000, ()=>{
    console.log("Server Started");
});