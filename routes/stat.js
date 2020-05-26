var express = require('express')
var router = express.Router()

var StatController = require('../controllers/stats')

/* GET home page. */
router.get('/', StatController.index)

module.exports = router
