var logger = require('../utils/logger').logger
var Stat = require('../models/stat')

var findAll = function () {
  return Stat.query('orderBy', 'last_updated_at', 'DESC').fetchAll()
}

var create = function (data) {
  var record = new Stat(data)

  logger.debug('Creating a new stat with data', data)

  return record.save()
}

var latest = function (limit = 1) {
  return Stat.query(function (qb) {
    qb.orderBy('last_updated_at', 'DESC')
    qb.limit(limit)
  }).fetchAll()
}

module.exports = { findAll, create, latest }
