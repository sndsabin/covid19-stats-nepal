var define = require('factoria').define
var moment = require('moment')

var stat = define('stat', function (faker) {
  var now = Math.floor(new Date() / 1000)
  var pcrSampleTested = now
  var rdtSampleTested = now + faker.random.number({ min: 0, max: 200 })
  var pcrPositive = faker.random.number({ min: 0, max: pcrSampleTested })

  return {
    death: 0,
    recovered: faker.random.number({ min: 0, max: pcrPositive }),
    isolation: faker.random.number(),
    quarrentine: faker.random.number(),
    pcrPositive: pcrPositive,
    pcr_negative: pcrSampleTested - pcrPositive,
    pcrSampleTested: pcrSampleTested,
    rdtSampleTested: rdtSampleTested,
    last_updated_at: moment(faker.date.future(0.1)).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  }
})

module.exports = stat
