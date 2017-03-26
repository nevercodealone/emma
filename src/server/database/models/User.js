const mongoose = require('../index');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
