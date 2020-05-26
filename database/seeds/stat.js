var factory = require('../factories/stat')

var stat = factory('stat', 20)

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('stats')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('stats').insert(stat)
    })
}
