var express = require("express");
var router = express.Router();

var stat = require("./routes/stat");
/**
 * Register all routes here
 */
router.use("/", stat);

module.exports = router;
