var cron = require('node-cron')
var statDataService = require('../services/statData')
var logger = require('../utils/logger').logger

const CRON_EXPRESSION = cron.validate(process.env.STAT_CRON_EXPRESSION)
  ? process.env.STAT_CRON_EXPRESSION
  : '0 * * * *'

// schedule cron tasks to run
var stat = cron.schedule(CRON_EXPRESSION, function () {
  logger.debug('cron job running ' + CRON_EXPRESSION)
  statDataService.sync()
})

module.exports = stat
