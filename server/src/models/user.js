const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
        set: value => bcrypt.hashSync(value, 10),
    },

    passwordResetToken: {
        type: String,
        select: false,
    },

    // passwordResetExpires: {
    //     type: Date,
    //     select: Date.now,
    // },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const TestUser = mongoose.model("TestUser", UserSchema);
const Users = mongoose.model('User', UserSchema);

const User = process.env.NODE_ENV === 'test' ? TestUser : Users;

module.exports = User;