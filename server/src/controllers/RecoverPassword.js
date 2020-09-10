const crypto = require('crypto');
const mailer = require('../modules/mailer');
const User = require('../models/user');



module.exports ={
  async create(req, res){
    const { email } = req.body;
    
    try{
      const user = await User.findOne({ email });
  
      if(!user)
        return res.status(400).send({ error: 'User not found.' });
  
      const token = crypto.randomBytes(20).toString('hex');
  
      const now = new Date();
      now.setHours(now.getHours() + 1);
  
      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      });
  
      mailer.sendMail({
        to: email,
        subject: 'Recuperação de Senha',
        from: 'remind.app@gmail.com',
        template: 'auth/forgot_password',
        context: { token },
      }, (err) => {
        
        if(err){
          console.log(err);
          return res.status(400).send({ error: 'Cannot send forgot password email' });
        }
        
        return res.send();
      });
    } catch (err) {
      res.status(400).send({ error: 'Error on forgot password, try again.' });
    }
  
  },
  
  async store(req, res){
    const { email, token, password } = req.body;
  
    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');
  
      if(!user)
        return res.status(400).send({ error: 'User not found' });
  
      if(token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid' });
  
      const now = new Date();
  
      if(now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, generate a new again a new one' });
  
      user.password = password;
  
      await user.save();
      
      res.send();
    } catch (error) {
      res.status(400).send({ error: 'Cannot reset password, try again' });
    }
  }
  
};


// module.exports = app => app.use('/auth', router);