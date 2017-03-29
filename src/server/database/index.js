const config = require('../../../knexfile');

const environment = process.env.environment;

var knex = require('knex')(config[environment]);

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
