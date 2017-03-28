const app = require('./app');

const port = '8080';

const User = require('./database/models/User');
const Phrases = require('./database/collections/Phrases');
const Preset = require('./database/models/Preset');


function createMe() {
  User
    .forge({
      email: 'test@test.com',
      password: 'sehrsicher'
    })
    .save()
    .catch(err => {

    })
}


function updateMe() {
  User
    .forge()
    .fetch({ email: 'lucanathan@live.com'})
    .then((user) => {
      user.set({ role: 'admin'});
      user.save()
    })
    .catch(err => {
      console.log(err);
    })
}


User
  .forge()
  .fetch()
  .then(user => {
    if (user) {
      user.phrasesForClient()
        .then(phrases => phrases);
    } else {
      console.log('no user')
    }
  })






app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
})
