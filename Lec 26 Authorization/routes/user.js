const express = require("express");



const router = express.Router();
const {
    UserSignUp,
    UserLogin,
    UserLogout
} = require("../controllers/user");


router.post('/signup',UserSignUp);
router.post('/login',UserLogin);
router.get("/signup", (req, res) => {
    res.render("signup", {
        errors: {},
        values: {},
    });
});
router.get("/login", (req, res) => {
    res.render("login", {
        errors: {},
        values: {},
    });
});
router.get("/logout", UserLogout);

module.exports = router;