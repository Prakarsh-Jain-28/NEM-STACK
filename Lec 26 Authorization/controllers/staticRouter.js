const URL = require("../models/url");

async function normalHomePage(req, res) {
    const allUrls = await URL.find({
        createdBy: req.user._id,
    });

    return res.render("home", {
        urls: allUrls,
        port: process.env.PORT,
        user: req.user,
    });
}

async function adminHomePage(req, res) {
    const allUrls = await URL.find({})
        .populate("createdBy", "name email");

    return res.render("admin", {
        urls: allUrls,
        port: process.env.PORT,
        user: req.user,
    });
}

module.exports = {
    normalHomePage,
    adminHomePage,
};