var moment = require('moment')
var getNepaliNumber = require('get-nepali-number')

var prepareMessage = function (isMisleading, newRecord, delta) {
  var message = ''

  if (isMisleading) {
    message = 'सम्भवत तथ्यांक सच्याएको हुन सक्छ। पछिल्लो तथ्यांक यस प्रकार छ : '
  }

  message += 'निको भएको : ' + getNepaliNumber(newRecord.recovered)
  if (!isMisleading && delta.recovered) {
    message += '(+' + getNepaliNumber(delta.recovered) + ')'
  }
  message += '\n मृत्यु भएको : ' + getNepaliNumber(newRecord.death)
  if (!isMisleading && delta.death) {
    message += '(+' + getNepaliNumber(delta.death) + ')'
  }
  message +=
    '\n संक्रमण देखिएको (PCR) : ' + getNepaliNumber(newRecord.pcr_positive)
  if (!isMisleading && delta.pcr_positive) {
    message += '(+' + getNepaliNumber(delta.pcr_positive) + ')'
  }
  message +=
    '\n PCR परिक्षण गरिएको : ' + getNepaliNumber(newRecord.pcr_sample_tested)
  if (!isMisleading && delta.pcr_sample_tested) {
    message += '(+' + getNepaliNumber(delta.pcr_sample_tested) + ')'
  }
  message +=
    '\n RDT परिक्षण गरिएको : ' + getNepaliNumber(newRecord.rdt_sample_tested)
  if (!isMisleading && delta.rdt_sample_tested) {
    message += '(+' + getNepaliNumber(delta.rdt_sample_tested) + ')'
  }

  message +=
    '\n पछिल्लो तथ्यांक अपडेट : ' +
    moment(newRecord.last_updated_at)
      .locale('ne')
      .format('LLL')
  message += '\n #covid19 #covid19Nepal #covid19StatsNepal #StatsNepal'

  return message
}

module.exports = { prepareMessage }
