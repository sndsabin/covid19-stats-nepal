var moment = require("moment");
var getNepaliNumber = require("../utils/misc").getNepaliNumber;

var prepareMessage = function(isMisleading, newRecord, delta) {
  var message = "";
  if (!isMisleading) {
    message = "निको भएको : " + getNepaliNumber(newRecord.recovered);
    if (delta["recovered"]) {
      message += "( +" + getNepaliNumber(delta["recovered"]) + ")";
    }
    message += "\n मृत्यु भएको : " + getNepaliNumber(newRecord.death);
    if (delta["death"]) {
      message += "( +" + getNepaliNumber(delta["death"]) + ")";
    }
    message +=
      "\n संक्रमण देखिएको (PCR) : " + getNepaliNumber(newRecord.pcr_positive);
    if (delta["pcr_positive"]) {
      message += "( +" + getNepaliNumber(delta["pcr_positive"]) + ")";
    }
    message +=
      "\n PCR परिक्षण गरिएको : " + getNepaliNumber(newRecord.pcr_sample_tested);
    if (delta["pcr_sample_tested"]) {
      message += "( +" + getNepaliNumber(delta["pcr_sample_tested"]) + ")";
    }
    message +=
      "\n RDT परिक्षण गरिएको : " + getNepaliNumber(newRecord.rdt_sample_tested);
    if (delta["rdt_sample_tested"]) {
      message += "( +" + getNepaliNumber(delta["rdt_sample_tested"]) + ")";
    }
  } else {
    message =
      "सम्भवत तथ्यांक सच्याएको हुन सक्छ। पछिल्लो तथ्यांक यस प्रकार छ : ";
    message += "\n निको भएको : " + getNepaliNumber(newRecord.recovered);
    message += "\n मृत्यु भएको : " + getNepaliNumber(newRecord.death);
    message +=
      "\n संक्रमण देखिएको (PCR) : " + getNepaliNumber(newRecord.pcr_positive);
    message +=
      "\n PCR परिक्षण गरिएको : " + getNepaliNumber(newRecord.pcr_sample_tested);
    message +=
      "\n RDT परिक्षण गरिएको : " + getNepaliNumber(newRecord.rdt_sample_tested);
  }

  message +=
    "\n पछिल्लो तथ्यांक अपडेट : " +
    moment(newRecord.last_updated_at)
      .locale("ne")
      .format("LLL");
  message += "\n #covid19 #covid19Nepal #covid19StatsNepal #StatsNepal";

  return message;
};

module.exports = { prepareMessage };
