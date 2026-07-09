const User = require("../models/user");
const {setUser} = require("../Service/Auth");

async function UserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;

        await User.create({
            name,
            email,
            password,
        });

        return res.redirect("/user/login");
    } catch (err) {

        return res.render("signup", {
            errors: err.errors,
            values: req.body,
        });
    }
}

async function UserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.render("login", {
            errors: {
                email: {
                    message: "No account found with this email.",
                },
            },
            values: { email },
        });
    }

    if (user.password !== password) {
        return res.render("login", {
            errors: {
                password: {
                    message: "Incorrect password.",
                },
            },
            values: { email },
        });
    }

    //setting cookie
    const token = setUser(user);
    res.cookie("uid",token);
    // Login successful
    return res.redirect("/");
}
async function UserLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/user/login");
}

module.exports = {
    UserSignUp,
    UserLogin,
    UserLogout
}