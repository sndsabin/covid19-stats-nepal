var knexConfig = require('./knexfile')

var knex = require('knex')(knexConfig)
var bookshelf = require('bookshelf')(knex)

bookshelf.plugin(['bookshelf-virtuals-plugin'])

module.exports = bookshelf
