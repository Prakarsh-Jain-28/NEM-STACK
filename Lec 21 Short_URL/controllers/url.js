const shortid = require("shortid");
const URL = require("../models/url");

async function PostUrl(req,res)
{
    const body = req.body;
    if(!body.url) return res.status(400).json({status: "Error",message: "Enter Valid URL"});
    
    const existing = await URL.findOne({
        redirectURL: body.url,
    });

    if (existing) {
        return res.json({
            id: existing.shortId,
        });
    }
    
    const id = shortid();

    const result = await URL.create({
        redirectURL: body.url,
        shortId: id,
        visitHistory: [],
    });

    return res.status(201).json({id: result.shortId});
}
async function GetAnalytics(req,res)
{
    const id = req.params.id;
    console.log(id);
    const result = await URL.findOne({shortId: id});
    return res.json({
        Clicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    })
}


module.exports = {PostUrl,GetAnalytics};