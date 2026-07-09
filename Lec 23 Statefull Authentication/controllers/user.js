const User = require("../models/user");
const {v4: uuidv4} = require("uuid");
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
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    // Login successful
    return res.redirect("/");
}

module.exports = {
    UserSignUp,
    UserLogin,
}