var define = require("factoria").define;
var moment = require("moment");

var stat = define("stat", function(faker) {
  var now = Math.floor(new Date() / 1000);
  var pcr_sample_tested = now;
  var rdt_sample_tested = now + faker.random.number({ min: 0, max: 200 });
  var pcr_positive = faker.random.number({ min: 0, max: pcr_sample_tested });

  return {
    death: 0,
    recovered: faker.random.number({ min: 0, max: pcr_positive }),
    isolation: faker.random.number(),
    quarrentine: faker.random.number(),
    pcr_positive: pcr_positive,
    pcr_negative: pcr_sample_tested - pcr_positive,
    pcr_sample_tested: pcr_sample_tested,
    rdt_sample_tested: rdt_sample_tested,
    last_updated_at: moment(faker.date.future(0.1)).format(
      "YYYY-MM-DD HH:mm:ss"
    )
  };
});

module.exports = stat;
