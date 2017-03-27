const app = require('./app');

const port = '8080';

const User = require('./database/models/User');


function createMe() {
  User
    .forge({
      email: 'lucanathan@live.com',
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




app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
})
