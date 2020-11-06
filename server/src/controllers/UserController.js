const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/user');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async store(req, res) {

        console.log(req.body);
        const { email } = req.body;

        try {

            if (await User.findOne({ email }))
                return res.status(400).send({ error: "User already existe." });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });

        } catch (err) {
            console.log(err);
            res.status(400).send({ error: "Registration faild" });
        }
    }
}