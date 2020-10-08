const Reminder = require('../models/reminder');


module.exports = {
    async store(req, res) {
        try {
            const status = false;
            const { description, dateActivity, repeat, dayWeek, userId } = req.body;


            // dateActivity.setHours(dateActivity.getHours() - 3);

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

            const reminder = await Reminder.findByIdAndUpdate(req.body.reminderId, {
                description,
                status,
                repeat,
                dateActivity,
                dayWeek,
            }, { new: true });
            console.log("Teste Rota");
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
