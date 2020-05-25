var Twit = require("twit");
var logger = require("../utils/logger").logger;

// configure Twit
try {
  var twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true // optional - requires SSL certificates to be valid.
  });
} catch (error) {
  logger.info("Error while initiliazing Twit client");
  var twit = {
    post: function() {} // dummy function
  };
}

var tweet = function(status) {
  twit.post("statuses/update", { status: status }, function(
    error,
    data,
    response
  ) {
    logger.info("Posting new tweet : " + status);
    logger.info("twitter data : " + JSON.stringify(data));
  });
};

module.exports = { tweet };
