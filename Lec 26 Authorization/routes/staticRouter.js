const express = require("express");
const urlRouter = require("./url");

const router = express.Router({ mergeParams: true });

const { normalHomePage,adminHomePage } = require("../controllers/staticRouter");
const { viewOnlyBy } = require("../middleware/Auth");

router.get("/admin",viewOnlyBy(["ADMIN"]), adminHomePage);
router.use("/url",urlRouter);
router.get("/", normalHomePage);



module.exports = router;