var fs = require('fs')
var winston = require('winston')
var DailyRotateFile = require('winston-daily-rotate-file')

const LOG_DIR = process.env.LOG_DIR || 'logs'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

// create log directory if not exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}

/**
 * winston logger
 */
var logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: 'debug'
    }),
    new DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      maxFiles: '15d',
      level: LOG_LEVEL,
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log'
    })
  ]
})

var stream = {
  /**
   * writable stream for winston logger
   * @param {*} message
   */
  write: function (message) {
    logger.info(message.toString())
  }
}

module.exports = { logger, stream }
