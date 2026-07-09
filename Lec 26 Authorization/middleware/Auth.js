const { getUser } = require("../Service/Auth");

async function loginRestriction(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        return res.redirect("/user/login");
    }

    const user = getUser(token);

    if (!user) {
        return res.redirect("/user/login");
    }

    req.user = user;
    next();
}

function viewOnlyBy(roles = []) {
    return function (req, res, next) {

        if (!req.user) {
            return res.redirect("/user/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Unauthorized");
        }

        next();
    };
}

module.exports = {
    loginRestriction,
    viewOnlyBy,
};