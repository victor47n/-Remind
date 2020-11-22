
const Reminder = require('../models/reminder');
const getDay = require('date-fns/getDay');

module.exports = {
    async index(req, res) {
        try {

            const reminders = await Reminder.find({ user: req.params.userId }).sort({ dateActivity: 1 }).populate('user');

            return res.send({ reminders });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading reminders' });
        }
    },

    async today(req, res) {
        try {

            var start = new Date();
            start.setHours(0, 0, 0, 0);

            var end = new Date();
            end.setHours(23, 59, 59, 999);

            const reminders = await Reminder.find({ user: req.params.userId })
                .or([
                    { dayWeek: { $elemMatch: { number: getDay(new Date()) } } },
                    { dateActivity: { $gte: start, $lt: end } }
                ])
                .populate('user');
                console.log("AAAA", reminders);

            return res.send({ reminders });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading reminders', user: req.body.userId });
        }
    },
    async historic(req, res) {
        try {

            var start = new Date();
            start.setHours(0, 0, 0, 0);

            var end = new Date();
            end.setHours(23, 59, 59, 999);

            const newReminder = [];

            const reminders = await Reminder.find({ user: req.params.userId })
                .or([
                    { dayWeek: { $elemMatch: { number: {$gte: 0, $lt: 6 } } } },
                    { dateActivity: { $gte: start, $lt: end } }
                ])
                .populate('user').lean();

                reminders.map(reminder => {
                    console.log(reminder)
                    if(reminder.dayWeek.length){
                        for(let day of reminder.dayWeek){
                            newReminder.push({...reminder, dayWeek: [day]});
                        }
                    }else{
                        newReminder.push(reminder);
                    }

                    return reminder;
                })
                
            return res.send({ newReminder });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading reminders', user: req.body.userId });
        }
    },

    async show(req, res) {
        try {
            const reminder = await Reminder.findById(req.params.reminderId).populate('user');
            return res.send({ reminder });
        } catch (error) {
            return res.status(400).send({ error: 'Erro loading reminder' });
        }
    }
};



