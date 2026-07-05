const express = require("express");

const router = express.Router({ mergeParams: true });

const { GetId } = require("../controllers/short");

router.get("/", GetId);

module.exports = router;