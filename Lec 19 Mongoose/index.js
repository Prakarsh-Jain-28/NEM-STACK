require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connection Established"))
.catch(err=>console.log("Error - ",err));


//schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job: {
        type: String,
    },
},{
    timestamps: true
});

//model
const Users = mongoose.model("User",userSchema);

//middleware
app.use(express.urlencoded({extended: false}));


//router /api/users/:id
app.route("/api/users/:id")
.get(async (req,res)=>{
    const user = await Users.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: "Error",
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        status: "Success",
        user: user,
    });
})
.patch(async (req,res)=>{
    const user = await Users.findByIdAndUpdate(req.params.id,req.body,{returnDocument: "after",runValidators:true});
    if (!user) {
        return res.status(404).json({
            status: "Error",
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        status: "Success",
        user: user
    });
})
.put(async (req,res)=>{
    const user = await Users.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "Error",
            message: "User Not Found"
        });
    }

    user.overwrite(req.body);
    await user.save();

    return res.status(200).json({
        status: "Success",
        user: user
    });
})
.delete(async (req,res)=>{
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: "Error",
            message: "User Not Found"
        });
    }
    const totalUsers = await Users.countDocuments();

    return res.status(200).json({
        status: "Success",
        user: user,
        total_users: totalUsers
    });
});


//router /api/users
app.route("/api/users")
.get(async (req,res)=>{
    const user = await Users.find();

    return res.status(200).json({
        status: "Success",
        total_users: user.length,
        users: user,
    });
})
.post(async (req,res)=>{
    const user = await Users.create(req.body);

    return res.status(201).json({
        status: "Success",
        user: user,
    });
});

// GET /users
app.get("/users",async (req,res)=>{
    const allUsers = await Users.find({});
    const html = 
    `
        <ul>
            ${allUsers.map((user)=>`<li>${user.first_name} ${user.last_name} - ${user.email}`).join("")}
        </ul>
    `;
    res.send(html);
});

app.listen(process.env.PORT,()=>console.log("Server Started"));

//npm start in integrated terminal