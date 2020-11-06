const mongoose = require("../database");

const ScheduleSchema = new mongoose.Schema({
    time: {
        type: String,
    },
    days: {
        type: [],
    },
    notification: {},
});

const TestScheduledNotification = mongoose.model("TestScheduledNotification", ScheduleSchema);
const ScheduledNotification = mongoose.model("scheduledNotification", ScheduleSchema);

const _ScheduledNotification = process.env.NODE_ENV === 'test' ? TestScheduledNotification : ScheduledNotification;

module.exports = _ScheduledNotification;