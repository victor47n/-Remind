// Importando express para podermos mexer com rotas
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

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

// Rota para esqueci minha senha.
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar se o e-mail esta cadastrado
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');

        // Tempo de expiração do token
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);

        // Alterar usuário que acabou de gerar o token
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'remind.app0101@gmail.com',
            subject: 'Recuperação de Senha',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email' })

            return res.send();
        })

    } catch (err) {
        res.status(400).send({ error: 'Error on forgot password, try again' })
    }
});

// Rota para resetar senha.
router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        // Buscando usuário pra verificar se existe no BD.
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        // Se o usuário existir confirmar token
        if (!user)
            return res.status(400).send({ error: 'User not found' });

        // Comparando token
        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        // Se o token for confirmado, verificar se não esta expirado
        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' });

        // Atualiza a password, se tudo estiver ok
        user.password = password;
        await user.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }

});

// Recuperando app
module.exports = app => app.use('/auth', router);
