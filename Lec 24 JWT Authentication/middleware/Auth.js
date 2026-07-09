const {getUser} = require("../Service/Auth");

async function loginRestriction(req,res,next)
{
    const token = req.cookies?.uid;
    if(!token) return res.redirect("/user/login");
    const user = getUser(token); 
    if(!user) return res.redirect("/user/login");
    req.user = user;
    next();
}

module.exports = {loginRestriction};