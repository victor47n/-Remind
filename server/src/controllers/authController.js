const express = require('express');

const User = require('../models/user')

const router = express.Router();

router.post('/register', async (request, response) => {
  try{
    const result = await User.create(request.body);
    const {...user} = result.toObject();
    user.password = undefined;
    console.log(user)
    response.send(user);
  } catch(err) {
    response.status(400).send({ error: "Registration faild" });
  }
});


module.exports = app => app.use('/auth', router);