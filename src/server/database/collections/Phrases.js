const bookshelf = require('../index');
const Phrase = require('../models/Phrase');

var Phrases = bookshelf.Collection.extend({
  model: Phrase
});

module.exports = Phrases;
