const Users = require("../models/user");

async function GetAllUser(req,res)
{
    const users = await Users.find({});

    const html = `
        <ul>
            ${users.map(user =>
                `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`
            ).join("")}
        </ul>
    `;

    res.send(html);
}

async function PostUser(req,res)
{
    const user = await Users.create(req.body);

    return res.status(201).json({
        status: "Success",
        user: user,
    });
}

async function GetUserById(req,res)
{
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
}
async function PatchUserById(req,res)
{
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
}
async function PutUserById(req,res)
{
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
}
async function DeleteUserById(req,res)
{
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
}

module.exports = {
    GetAllUser,
    PostUser,
    GetUserById,
    PatchUserById,
    PutUserById,
    DeleteUserById
}