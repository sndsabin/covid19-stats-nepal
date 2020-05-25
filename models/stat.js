var bookshelf = require("../db");
var moment = require("moment");

var Stat = bookshelf.Model.extend({
  tableName: "stats",
  virtuals: {
    last_updated_date() {
      return moment(this.get("last_updated_at")).format("YYYY-MM-DD");
    }
  }
});

module.exports = Stat;
