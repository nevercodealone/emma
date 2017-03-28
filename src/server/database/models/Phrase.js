const bookshelf = require('../index');

var Phrase = bookshelf.Model.extend({
    tableName: 'phrases',
    hasTimestamps: true,

    creator: function() {
      return this.belongsTo('User');
    },
    toRepresentation: function() {
      return {
        id: this.get('id'),
        text: this.get('text')
      }
    },
    presets: function() {
      return this.belongsToMany(Preset, 'presets_phrases', 'preset_id', 'phrase_id');
    }

}, {

});

module.exports = bookshelf.model('Phrase', Phrase);
