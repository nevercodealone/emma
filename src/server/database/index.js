const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.database);

module.exports = mongoose;
