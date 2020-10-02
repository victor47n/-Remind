const Reminder = require('../models/reminder');


module.exports = {
  async store(req, res){
    try {
      const status = false;
      const repeat = false;
      const { description, dateActivity, dayWeek, userId} = req.body;
      
      
      dateActivity.setHours(dateActivity.getHours() - 3);

      const reminder = await Reminder.create({ 
        status, 
        description,
        dateActivity,
        repeat,
        dayWeek,
        user: userId
      }
      );

      await reminder.save();

      return res.send({ reminder });
    } catch (err) {
      res.status(400).send({ error: 'Error creating new reminder' });
    }
  },

  async update(req, res){
    try {
      const { description, status, repeat, dateActivity, dayWeek } = req.body;
      
      dateActivity.setHours(dateActivity.getHours());
      // const number =  Array();
      // if(dateActivity === )

            const reminder = await Reminder.create({
                status,
                description,
                dateActivity,
                repeat,
                dayWeek,
                user: userId,
            }
            );

            await reminder.save();

            return res.send({ reminder });
        } catch (err) {
            res.status(400).send({ error: 'Error creating new reminder' });
        }
    },

    async update(req, res) {
        try {
            const { description, status, repeat, dateActivity, dayWeek } = req.body;

            dateActivity.setHours(dateActivity.getHours() - 3);

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



