const bookshelf = require('../index');
const User = require('../models/Phrase');

var Users = bookshelf.Collection.extend({
  model: User
});

module.exports = Users;
