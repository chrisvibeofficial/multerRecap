const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  IMG: [{
    type: String,
    require: true
  }]
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel