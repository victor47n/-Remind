const mongoose = require('../database');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required:true,
    lowercase:true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: value => crypto.createHash('md5').update(value).digest('hex'),
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;