const { TokenExpiredError } = require('jsonwebtoken');
const authConfig = require('../config/auth');
const ExpoToken = require('../models/expoToken');

module.exports = {
    async store(req, res) {

        const { token } = req.body;

        console.log(token);

        let response = await ExpoToken.findOne({ where: { token } });

        if (response == null) {
            ExpoToken.create({ token });
        }
    }
}