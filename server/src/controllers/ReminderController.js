const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Reminder = require('../models/reminder');

const router = express.Router();

router.use(authMiddleware);
module.exports = {
    async store(req, res) {
        try {
            const status = false;
            const repeat = false;
            const { description, dateActivity, dayWeek } = req.body;


            dateActivity.setHours(dateActivity.getHours() - 3);

            const reminder = await Reminder.create({
                status,
                description,
                dateActivity,
                repeat,
                dayWeek,
                user: req.userId
            }
            );

            await reminder.save();

            return res.json(reminder);
        } catch (err) {
            res.status(400).send({ error: 'Error creating new reminder' });
        }
    },

    async update(req, res) {
        try {
            const { description, status, repeat, dateActivity, dayWeek } = req.body;

            // const number =  Array();
            // if(dateActivity === )

            const reminder = await Reminder.findByIdAndUpdate(req.params.reminderId, {
                description,
                status,
                repeat,
                dateActivity,
                dayWeek,
            }, { new: true });


            // console.log({reminder});
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



