var stat = require('./crons/stat')

/**
 * Register all crons here
 *
 */
const crons = [stat]

/**
 * Schedule all registered crons
 */
var boot = function () {
  crons.forEach(function (cron) {
    cron.start()
  })
}

module.exports = { boot }
