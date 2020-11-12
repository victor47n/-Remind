const { defaultConfiguration } = require('../app');
const { Mongoose } = require('../database');
const mongoose = require('../database');
 

const dayWeek = mongoose.Schema({
  number: {
    type: Number,
    require: false,
}
},{ _id : false });

const dayWeek =  mongoose.Schema({
    number: {
        type: Number,
        require: false,
    }
},{ _id : false });

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
    dayWeek: [dayWeek],
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