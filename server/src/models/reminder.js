const { defaultConfiguration } = require('../app');
const mongoose = require('../database');

const RemindersSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        require: false,
    },
    dateActivity: {
        type: Date,
        require: false,
    },
    repeat: {
        type: Boolean,
        require: false,
    },
    dayWeek: [{
        type: Number,
        require: false,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reminders = mongoose.model("Reminders", RemindersSchema);
const TestReminder = mongoose.model("Tests", RemindersSchema);

const Reminder = process.env.NODE_ENV === 'test' ? TestReminder : Reminders;

module.exports = Reminder;