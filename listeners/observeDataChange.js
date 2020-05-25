var messageUtils = require("../utils/message");
var twitter = require("../services/twitter");

var observeDataChange = function(data) {
  var dataToBeObserved = process.env.DATA_TO_BE_OBSERVED;
  var lastRecord = data[0];
  var newRecord = data[1];
  var delta = [];
  var isMisleading = false;

  dataToBeObserved.split(",").forEach(function(atribute) {
    if (lastRecord && newRecord) {
      // calculate delta
      delta[atribute] = parseInt(newRecord[atribute] - lastRecord[atribute]);
    }
  });

  // if any of the deltas is negative, set the isMisleading flag to true
  isMisleading = Object.values(delta).some(function(value) {
    return value < 0;
  });

  // prepare message
  var message = messageUtils.prepareMessage(isMisleading, newRecord, delta);

  // notify
  twitter.tweet(message);
};

module.exports = observeDataChange;
