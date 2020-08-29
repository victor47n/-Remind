// Importando express para podermos mexer com rotas
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

// Importar nosso model de User, para fazer ações de login e de cadastro
const User = require('../models/User');

// Definir uma classe chamada router, para definirmos rotas só para os usuarios
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

// Definir rota de cadastro
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica se já existe o email cadastrado
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        // cria novo usuario, quando chama essa rota, pegando todos parametros que o
        // usuario esta enviando como nome, email, password. 
        // No qual todos os parametros estao dentro do req.body
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration Failed' });
    }
});

// Rota para autenticação (login).
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    // Buscando usuário pra verificar se existe no BD.
    const user = await User.findOne({ email }).select('+password');

    // Se o usuário não existir. 
    if (!user)
        return res.status(400).send({ error: 'User not found' });

    // Verificar se o password  corresponde com o BD.
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' })

    // Removendo retorno do password
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
    })

    // Se logou normalmento com o usuário.
    res.send({
        user,
        token: generateToken({ id: user.id }),
    });

});

// Recuperando app
module.exports = app => app.use('/auth', router);
