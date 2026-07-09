const express = require("express");

const router = express.Router({ mergeParams: true });

const { HomePage } = require("../controllers/staticRouter");

router.get("/", HomePage);



module.exports = router;