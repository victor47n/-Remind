const mongoose = require('../database');

const AssignmentSchema = new mongoose.Schema({
  description:{
    type: String,
    require: true,
  },
  status:{
    type: Boolean,
    require: false,
  },
  dateActivity:{
    type: Date,
    require: false,
  },
  repeat:{
    type: Boolean,
    require: false,
  },
  dayWeek:[{
    type: Number,
    require: true,
  }],
  user:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  require: true,
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignment;