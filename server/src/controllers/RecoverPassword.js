const generateUniqueId = require('../utils/generateUniqueId')
const mailer = require('../modules/mailer');
const User = require('../models/user');

module.exports = {
  async create(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({ error: 'User not found.' });

      const token = generateUniqueId();

      const now = new Date();
      now.setMinutes(now.getMinutes() + 30);
  
      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      });

     
      const link = `http://localhost:3333/reset_password/${email}/${token}`;

      mailer.sendMail({
        to: email,
        subject: 'Recuperação de Senha',
        from: 'remind.app0101@gmail.com',
        template: 'auth/forgot_password',
        context: { link },
      }, (err) => {

        if (err) {
          console.log(err);
          return res.status(400).send({ error: 'Cannot send forgot password email' });
        }

        return res.send();
      });
    } catch (err) {
      res.status(400).send({ error: 'Error on forgot password, try again.' });
    }

  },

  async store(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

      if (!user)
        return res.status(400).send({ error: 'User not found' });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid' });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, generate a new again a new one' });

      user.password = password;

      await user.save();

      res.send();
    } catch (err) {
      res.status(400).send({ error: 'Cannot reset password, try again' });
    }
  }

};


// module.exports = app => app.use('/auth', router);