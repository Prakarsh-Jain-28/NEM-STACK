const express = require("express");

const {PostUrl,GetAnalytics} = require("../controllers/url");

const router = express.Router({ mergeParams: true });

router.route("/").post(PostUrl);
router.route("/analytics/:id").get(GetAnalytics);

module.exports = router;