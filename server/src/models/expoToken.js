const mongoose = require('../database');

const ExpoTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const TestExpoToken = mongoose.model("ExpoTokenTest", ExpoTokenSchema);
const ExpoTokens = mongoose.model('ExpoToken', ExpoTokenSchema);

const ExpoToken = process.env.NODE_ENV === 'test' ? TestExpoToken : ExpoTokens;

module.exports = ExpoToken;