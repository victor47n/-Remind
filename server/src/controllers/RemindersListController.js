
const Reminder = require('../models/reminder');

module.exports = {
  async index(req, res){
    try {
      const reminders = await Reminder.find().populate('user');

      return res.send({ reminders });
    } catch (error) {
      return res.status(400).send({ error: 'Erro loading reminders' });
    }
  },

  async show(req, res){
    try {
      const reminder = await Reminder.findById(req.params.reminderId).populate('user');

      return res.send({ reminder });
    } catch (error) {
      return res.status(400).send({ error: 'Erro loading reminder' });
    }
  }
};



