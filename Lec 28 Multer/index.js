const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null, "./uploads");
    },
    filename: function(req,file,cb){
        const name = `${Date.now()}+${file.originalname}`;
        return cb(null, name);
    }
});

const upload = multer({storage});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/uploads", express.static("uploads"));

app.get("/",(req,res)=>{
    res.render("homepage");
});

app.get("/view", (req, res) => {

    const folder = path.join(__dirname, "uploads");

    fs.readdir(folder, (err, files) => {
        if (err) return res.send(err)
        res.render("view", { files });
    });

});

app.post("/view",upload.single('image'),(req,res)=>{

    const folder = path.join(__dirname,"uploads");

    fs.readdir(folder,(err,files)=>{
        if(err) return res.end(err);
        return res.render("view",{files});
    });
});

app.post("/",(req,res)=>{
    return res.render("homepage");
});

app.listen(8000, ()=> console.log("Server Started"));