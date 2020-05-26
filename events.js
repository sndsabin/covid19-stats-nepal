var EventEmitter = require('events').EventEmitter
var newDataInserted = require('./events/newDataInserted')

/***
 * Register all the events
 */
const events = [newDataInserted]

var boot = function () {
  const modes = ['on', 'once']
  events.forEach(function (event) {
    if (event.emitter instanceof EventEmitter === false) {
      throw new Error(event.eventName + "'s emitter must be instance of" + EventEmitter)
    }
    var mode = modes.includes(event.mode) ? event.mode : 'on'

    // register listeners
    event.listeners.forEach(function (listener) {
      if (listener instanceof Function === false) {
        throw new Error(listener +
          ' of event ' +
          event.eventName +
          ' must be of type function')
      }

      event.emitter[mode](event.eventName, function () {
        listener(event.data)
      })
    })
  })
}

module.exports = { boot }
