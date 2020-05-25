var EventEmitter = require("events").EventEmitter;

module.exports = {
  eventEmitter: null,
  get: function() {
    if (!this.eventEmitter) {
      this.eventEmitter = new EventEmitter();
    }

    return this.eventEmitter;
  }
};
