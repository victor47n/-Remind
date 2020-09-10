const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Assignment = require('../models/assignment');

const router = express.Router();

router.use(authMiddleware);
module.exports = {
  async index(req, res){
    try {
      const assignments = await Assignment.find().populate('user');

      return res.send({ assignments });
    } catch (error) {
      return res.status(400).send({ error: 'Erro loading assignments' });
    }
  },

  async show(req, res){
    try {
      const assignment = await Assignment.findById(req.params.assignmentId).populate('user');

      return res.send({ assignment });
    } catch (error) {
      return res.status(400).send({ error: 'Erro loading assignment' });
    }
  }
};



