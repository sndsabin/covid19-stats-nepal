var Twit = require('twit')
var logger = require('../utils/logger').logger

// configure Twit
try {
  var twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true // optional - requires SSL certificates to be valid.
  })
} catch (error) {
  logger.info('Error while initializing Twit client')
  twit = {
    post: function () {
      logger.info(
        'No status was posted due to error in initializing Twit client'
      ) // dummy function
    }
  }
}

var tweet = function (status) {
  logger.info('trying to post new tweet : \n ' + status)
  twit.post('statuses/update', { status: status }, function (
    error,
    data,
    response
  ) {
    logger.info('twitter response data : ' + JSON.stringify(data))
    logger.info('twitter error : ' + JSON.stringify(error))
  })
}

module.exports = { tweet }
