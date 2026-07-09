const express = require("express");

const {PostUrl,GetAnalytics,GetId} = require("../controllers/url");

const router = express.Router({ mergeParams: true });

router.route("/").post(PostUrl);
router.route("/analytics/:id").get(GetAnalytics);
router.get("/:id", GetId);

module.exports = router;