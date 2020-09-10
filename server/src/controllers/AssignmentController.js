const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Assignment = require('../models/assignment');

const router = express.Router();

router.use(authMiddleware);
module.exports = {
  async store(req, res){
    try {
      const status = false;
      const repeat = false;
      const { description, dateActivity, dayWeek } = req.body;

      dateActivity.setHours(dateActivity.getHours() - 3);

      const assignment = await Assignment.create({ status, description, dateActivity,  repeat, dayWeek, user: req.userId});

      await assignment.save();

      return res.json( assignment );
    } catch (err) {
      console.log(err);
      console.log(err);
      res.status(400).send({ error: 'Error creating new assignment' });
    }
  },

  async update(req, res){
    try {
      const { description, status, repeat, dateActivity, dayWeek } = req.body;

      const assignment = await Assignment.findByIdAndUpdate(req.params.assignmentId,{ 
        description,
        status,
        repeat, 
        dateActivity,
        dayWeek,
      },  { new: true });

      await assignment.save();

      return res.send({ assignment });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating assignment' });
    }
  },

  async destroy(req, res){
    try {
      await Assignment.findByIdAndRemove(req.params.assignmentId);
      
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro deleting assignment' });
    }
  }
};



