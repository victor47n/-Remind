const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const e = require('express');
const router = express.Router();

router.use(authMiddleware);

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async update(req, res) {
        try {
            const { name, email, password, birthdate } = req.body;
            const { userId } = req.params;

            if (email) {
                const userFind = await User.findOne({ email })
                if ((userFind) && (userFind._id != userId)) {
                    return res.status(400).send({ error: "Email already existe." });
                }

            }

            const user = await User.findByIdAndUpdate(userId, {
                name,
                email,
                password,
                birthdate
            }, { new: true });

            res.send({
                user,
                token: generateToken({ id: user.id }),
            });

            await user.save()

            return res.send(user);
        } catch (err) {
            return res.status(400).send({ error: 'Error updating assignment' });

        }
    },

    async show(req, res) {
        try {
            const user = await User.findById(req.params.userId).populate('user');

            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading assignment' });
        }
    }
};
