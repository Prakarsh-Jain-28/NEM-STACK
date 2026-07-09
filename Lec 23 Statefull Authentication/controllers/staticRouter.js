const URL = require("../models/url");

async function HomePage(req,res)
{
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls: allUrls,
        port: process.env.PORT,
    });
}

module.exports = { HomePage };