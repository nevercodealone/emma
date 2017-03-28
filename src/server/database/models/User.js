const bookshelf = require('../index');
const Phrase = require('../models/Phrase');


var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,


    verifyPassword: function(password) {
        return this.get('password') === password;
    },
    toTokenFormat: function() {
      // deliver userdata for token signing
      return {
        id: this.get('id'),
        role: this.get('role')
      }
    },
    phrases: function() {
    return this.hasMany(Phrase, 'author_id');
    },
    phrasesForClient: function() {
      return new Promise((resolve, reject) => {
        this.phrases()
          .fetch()
          .then(phrases => {
            let phrasesShrunk = phrases.map((phrase) => {
              return phrase.toRepresentation();
            })
            resolve(phrasesShrunk);
          })
          .catch(err => reject(err));
      })

    }

}, {
    byEmail: function(email) {
        return this.forge().query({where:{ email: email }}).fetch();
    }
});

module.exports = bookshelf.model('User', User);
