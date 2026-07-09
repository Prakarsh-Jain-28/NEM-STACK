const {getUser} = require("../Service/Auth");

async function loginRestriction(req,res,next)
{
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect("/user/login");
    const user = getUser(userUid); 
    if(!user) return res.redirect("/user/login");
    req.user = user;
    next();
}

module.exports = {loginRestriction};