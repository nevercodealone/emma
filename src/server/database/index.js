const config = require('../../../knexfile');

var knex = require('knex')(config['development']);

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
