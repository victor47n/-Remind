const { defaultConfiguration } = require('../app');
const mongoose = require('../database');


const HistoricSchema = new mongoose.Schema({
    descriptionHistoric: {
        type: String,
        require: true,
    },
    statusHistoric: {
        type: Boolean,
        require: true,
    },
    dateActivityHistoric: {
        type: Date,
        require: false,
    },
    repeatHistoric: {
        type: Boolean,
        require: false,
    },
    dayWeekHistoric: {
      type: Number,
      require: false,
    },
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

const Historic = mongoose.model("Historic", HistoricSchema);

module.exports = Historic;