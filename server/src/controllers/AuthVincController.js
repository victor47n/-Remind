const jwt = require('jsonwebtoken')
const mailer = require('../modules/mailer');
const User = require('../models/user');
const Reminder = require('../models/reminder');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret,{
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req, res) {
    const { email, emailAuth } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({ error: 'User not found.' });

      const token = generateToken({email, emailAuth});

      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalid' });
    
        console.log("Dados", decoded);
        return console.log(decoded);
      })

      const link = `http://localhost:3333/${token}`;
      const emailSolicitante = `${email}`;
      mailer.sendMail({
        to: emailAuth,
        subject: 'Autorização de Vinculo de Conta',
        from: 'remind.app0101@gmail.com',
        template: 'auth/autorizacao_vinculo',
        context: { link, emailSolicitante },
      }, (err) => {

        if (err) {

          return res.status(400).send({ err: 'Não foi possivel enviar a autorização de vinculo' });
        }

        return res.send();
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: 'teste' });
    }

  },

  async authVinc(req, res) {
    const { email, emailAuth } = req.params;

    try {

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({ error: 'User not found.' });

      const update = await User.update({ _id: user._id }, { $push: { vinculos: emailAuth } })

      res.json(update);

    } catch (error) {
      res.status(400).send({ error: 'a' });
    }
  },

  async store(req, res) {

    try {
      const status = false;
      //   const repeat = false;
      const { description, dateActivity, repeat, dayWeek, emailAuth } = req.body;

      const userId = await User.findOne({ email: emailAuth });
      //console.log(userId);

      dateActivity.setHours(dateActivity.getHours() - 3);

      const reminder = await Reminder.create({
        status,
        description,
        dateActivity,
        repeat,
        dayWeek,
        user: userId._id
      }
      );
      //console.log(reminder);
      await reminder.save();

      return res.json(reminder);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: 'Error creating new reminder' });
    }
  },

  async update(req, res) {
    try {
      const { description, status, repeat, dateActivity, dayWeek } = req.body;

      const reminder = await Reminder.findByIdAndUpdate(req.params.reminderId, {
        description,
        status,
        repeat,
        dateActivity,
        dayWeek,
      }, { new: true });

      await reminder.save();


      return res.send({ reminder });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating reminder' });
    }
  },

  async destroy(req, res) {
    try {
      await Reminder.findByIdAndRemove(req.params.reminderId);

      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro deleting reminder' });
    }
  }

};
