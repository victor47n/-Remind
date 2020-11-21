const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const router = express.Router();
const vincularService = require('../utils/populaVinc');

router.use(authMiddleware);


module.exports = {
    async update(req, res) {
        try {
            const { userId, name, email, password } = req.body;
            // const { userId } = req.params;

            if (email) {
                const userFind = await User.findOne({ email })
                if ((userFind) && (userFind._id != userId)) {
                    return res.status(400).send({ error: "Email already existe." });
                }
            }

            const user = null;

            if (password != null) {
                user = await User.findByIdAndUpdate(userId, {
                    name,
                    email,
                    password,
                }, { new: true });
            } else {
                user = await User.findByIdAndUpdate(userId, {
                    name,
                    email,
                }, { new: true });
            }

            await user.save()

            return res.send(user);
        } catch (err) {
            return res.status(400).send({ error: 'Error updating reminder' });

        }
    },

    async show(req, res) {
        try {
            const user = await (await User.findById(req.params.userId).populate('user').lean());
            const dados = await vincularService.geraVinculos(user.vinculos)
            
            user.dadosVinculos = dados;
            console.log("ABATEUA UI",user);
            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading reminder' });
        }
    }
};

