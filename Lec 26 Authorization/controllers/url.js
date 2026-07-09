const shortid = require("shortid");
const URL = require("../models/url");

async function PostUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            status: "Error",
            message: "Enter Valid URL",
        });
    }

    const existing = await URL.findOne({
        redirectURL: body.url,
    });

    if (existing) {
        const allUrls = await URL.find({createdBy: req.user._id,});

        return res.render("home", {
            urls: allUrls,
            id: existing.shortId,
            originalURL: existing.redirectURL,
            port: process.env.PORT,
            user: req.user,
        });
    }

    const id = shortid();

    const result = await URL.create({
        redirectURL: body.url,
        shortId: id,
        visitHistory: [],
        createdBy: req.user._id,
    });

    const allUrls = await URL.find({createdBy: req.user._id,});

    return res.render("home", {
        urls: allUrls,
        id: result.shortId,
        originalURL: result.redirectURL,
        port: process.env.PORT,
        user: req.user,
    });
}
async function GetAnalytics(req,res)
{
    const id = req.params.id;
    const result = await URL.findOne({shortId: id,createdBy: req.user._id,});
    return res.json({
        Clicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    })
}

async function GetId(req, res) {

    const shortId = req.params.id;

    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { returnDocument: "after" }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
}

module.exports = {PostUrl,GetAnalytics,GetId};