var eventEmitter = require('../foundations/eventEmitter')
var observeDataChange = require('../listeners/observeDataChange')

module.exports = {
  eventName: 'newDataInserted',
  emitter: eventEmitter.get(), // singleton instance
  listeners: [observeDataChange],
  data: null,
  mode: 'on',
  emit: function (data) {
    this.data = data
    this.emitter.emit(this.eventName, this.data)
  }
}
