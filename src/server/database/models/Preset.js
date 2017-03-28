const bookshelf = require('../index');

var Preset = bookshelf.Model.extend({
    tableName: 'presets',
    hasTimestamps: true,

    phrases: function() {
      return this.belongsToMany('Phrase', 'presets_phrases', 'preset_id', 'phrase_id')
    },
    phrasesForClient: function() {
      return new Promise((resolve, reject) => {
        this.phrases()
          .fetch()
          .then(phrases => {
            let phrasesShrunk = phrases.map((phrase) => {
              return phrase.toRepresentation();
            })
            resolve({
              name: this.get('name'),
              phrases: phrasesShrunk
            });
          })
          .catch(err => reject(err));
      })
    }

}, {

});

module.exports = bookshelf.model('Preset', Preset);
