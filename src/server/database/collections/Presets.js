const bookshelf = require('../index');
const Preset = require('../models/Preset');

var Presets = bookshelf.Collection.extend({
  model: Preset
});

module.exports = Presets;
