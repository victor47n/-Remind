const mongoose = require('../database');
const bcrypt = require('bcryptjs');


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
    set: value =>  bcrypt.hashSync(value, 10),
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: Date.now,
  },
  birthdate:{
    type: Date,
    select: true,
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  
});


const User = mongoose.model('User', UserSchema);

module.exports = User;