const express = require("express");
const users = require("../MOCK_DATA.json");
const fs = require("fs");

const app = express();
let myName = "Unknown User";

//Built-in Middleware
app.use(express.urlencoded({extended: false}));

//User Middleware says hello
app.use((req,res,next)=>{
    console.log("Hello from Middleware");
    next();
});

//User Middleware logs Data
app.use((req,res,next)=>{

    fs.appendFile("./log.txt",`\n${Date.now()}: ${req.method}: ${req.path}`,(err)=>{
        if(err) return res.status(500).json({ status: "Error Middleware", message: "Failed to log to file" });
    });
    next();
});


//Same code as Lec 14
app.route("/api/users")
    .get((req,res)=>{
        return res.json(users);
    })
    .post((req,res)=>{
        const body = req.body;
        const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

        users.push({...body, id: nextId});
        fs.writeFile('../MOCK_DATA.json', JSON.stringify(users),(err)=>{
            if (err) {
                return res.status(500).json({ status: "Error", message: "Failed to write to file" });
            }
            return res.json({status: "Success",message: "Post Successful",id: nextId});
        });
    });

app.route("/api/users/:id")
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id===id);
        if(user) return res.json(user);
        else res.status(400).json({error: "Invalid User ID"});
    })
    .patch((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id===id);
        if(!user) res.status(400).json({error: "Invalid User ID"});
        const { first_name, last_name, email, gender, job } = req.body;

        if(email && users.find(user => user.email === email && user.id !== id))
        {
            return res.status(400).json({error: "Email Already Exists"});
        }
        else if(email)
        {
            user.email = email;
        }

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (gender) user.gender = gender;
        if (job) user.job_title = job;

        fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "Error", message: "Failed to write to file" });
            }
            return res.status(200).json({status: "Success",message: "Patch Successful",id: `${id}`});
        });
    })
    .delete((req,res)=>{
        const id = Number(req.params.id);

        const userIndex = users.findIndex(user => user.id === id);
        if(userIndex === -1) return res.status(400).json({error: "Invalid User ID",Total_Users: users.length});
        users.splice(userIndex, 1);

        fs.writeFile("../MOCK_DATA.json", JSON.stringify(users),(err)=>{
            if(err) return res.status(500).json({ status: "Error", message: "Failed to write to file" });

            return res.status(200).json({status: "Success", message: "Delete Successful", Total_Users: users.length});
        });
    })
    .put((req, res) => {
        const id = Number(req.params.id);

        // 1. Locate the physical array index position of the user
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return res.status(400).json({ error: "Invalid User ID" });

        // 2. Destructure fields from incoming body to validate or clean them
        const { first_name, last_name, email, gender, job } = req.body;

        // 3. Unique email validation check (Skip checking against this user's current index)
        if (email) {
            const emailTaken = users.some((u) => u.email === email && u.id !== id);
            if (emailTaken) {
                return res.status(400).json({ error: "Email Already Exists" });
            }
        }

        // 4. Overwrite the entire user object in place at that index
        // Note: We maintain the original 'id', but allow all other fields to be completely reset by the body
        users[userIndex] = {
            id: id,
            first_name: first_name || "",
            last_name: last_name || "",
            email: email || "",
            gender: gender || "",
            job: job || ""
        };

        // 5. Persistently write the updated array back to your local JSON file
        fs.writeFile('../MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ status: "Error", message: "Failed to write to file" });
            }
            return res.status(200).json({ status: "Success", message: "User completely replaced", user: users[userIndex] });
        });
    });



//html documentation of all users
app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map(user=>`<li>${user.first_name} ${user.last_name}`).join("")}
    </ul>`;
    res.send(html);
});

app.listen(8000, () => console.log("Server Started!"));