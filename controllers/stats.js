var statService = require("../services/stat");
var formatData = require("../utils/formatData");

var index = function(req, res, next) {
  statService
    .latest(50)
    .then(function(data) {
      var stats = formatData.groupIntoBucket(
        data.toJSON(),
        "last_updated_date"
      );
      res.render("index", { stats: stats, latest: data.toJSON()[0] });
    })
    .catch(function(error) {
      next(error);
    });
};

module.exports = { index };
