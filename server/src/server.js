const app = require('./app');
const HistoricController = require('./controllers/HistoricController');
const cron = require('node-cron');
const NotificationController = require('./controllers/NotificationController');
const Reminder = require('./models/reminder');
require('dotenv/config');

cron.schedule("* * * * * *", async () => {

    try {
        var start = new Date();
        start.setHours(start.getHours() - 1);
        start.setSeconds(0, 0);

        var end = new Date();
        end.setHours(end.getHours());
        end.setSeconds(59, 999);

        console.log("INICIO: " + start + " ---- FIM: " + end);

        const reminders = await Reminder.find({
            dateActivity: { $gte: start, }
        },
            { description: 1, dateActivity: 1, user: 1, _id: 0 });

        if (reminders != null) {
            reminders.map(element => {
                NotificationController.getNotification(element);
                console.log("NOTIFICAÇÃO");
            });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`[*] Server running on port: ${process.env.SERVER_PORT}`);

    const timer = setInterval(() => {
        HistoricController.Loop();
    }, 86400000);
    // }, 3000);

    return () => clearInterval(timer);

});
