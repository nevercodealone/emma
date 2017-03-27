const config = require('../../../knexfile');

var knex = require('knex')(config['development']);

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
