const { Router } = require("express");
const router = Router();

router.use("/login", require("./login"));
router.use("/jobs", require("./jobs"));

module.exports = router;
