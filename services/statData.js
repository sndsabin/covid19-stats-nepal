var moment = require("moment");
var logger = require("../utils/logger").logger;
var httpUtils = require("../utils/httpUtil");
var statService = require("./stat");
var newDataInsteredEvent = require("../events/newDataInserted");

const API_URL = process.env.BASE_API_URL + "/confirmedcases";

var fetchData = function() {
  return httpUtils.get(API_URL);
};

var bakeStatData = function(data) {
  if (!data) return {};

  return {
    death: data.deaths,
    recovered: data.extra1,
    isolation: data.extra2,
    quarrentine: data.extra8,
    pcr_positive: data.positive,
    pcr_negative: data.negative,
    pcr_sample_tested: data.samples_tested,
    rdt_sample_tested: data.extra7,
    last_updated_at: data.updated_at
  };
};

var fetchAndBakeStatData = function() {
  return fetchData()
    .then(function(response) {
      if (response.data && response.data.nepal) {
        return bakeStatData(response.data.nepal);
      }

      return {};
    })
    .catch(function(error) {
      logger.error("Error while fetching the data", error);
    });
};

var sync = async function() {
  // fetch stat data
  var data = await fetchAndBakeStatData();

  // fetch the latest record
  var lastRecord = await statService.latest();
  lastRecord = lastRecord.toJSON()[0];

  // only save if the data is fresh
  if (
    !lastRecord ||
    moment(data.last_updated_at).isAfter(lastRecord.last_updated_at)
  ) {
    statService.create(data); // save in database
    logger.info("New record saved", data);
    newDataInsteredEvent.emit([lastRecord, data]);
  }
};

module.exports = { sync };
