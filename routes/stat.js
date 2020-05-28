var express = require('express')
var router = express.Router()

var StatsController = require('../controllers/stats')

/* GET home page. */
router.get('/', StatsController.index)

module.exports = router
