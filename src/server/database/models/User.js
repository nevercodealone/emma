const bookshelf = require('../index');

var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    verifyPassword: function(password) {
        return this.get('password') === password;
    },
    toTokenFormat: function() {
      return {
        id: this.get('id'),
        role: this.get('role')
      }
    }
}, {
    byEmail: function(email) {
        return this.forge().query({where:{ email: email }}).fetch();
    }
});

module.exports = User;
