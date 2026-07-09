const {getUser} = require("../Service/Auth");

async function loginRestriction(req,res,next)
{
    const token = req.headers["authorization"];
    if(!token) return res.redirect("/user/login");

    const uid = token.split("Bearer ")[1];
    const user = getUser(uid);
    
    if(!user) return res.redirect("/user/login");
    req.user = user;
    next();
}

module.exports = {loginRestriction};