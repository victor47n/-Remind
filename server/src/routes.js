const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const RecoverPassword = require('./controllers/RecoverPassword');
const ReminderController = require('./controllers/ReminderController');
const RemindersListController = require('./controllers/RemindersListController');
const profileController = require('./controllers/ProfileController');
const AuthVincController = require('./controllers/AuthVincController');


const routes = express.Router();

//Cadastro e Login
routes.post('/auth', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), AuthController.store);

routes.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    prime: Joi.string(),
    vinculos: Joi.array(),
  })
}), UserController.store);

routes.post('/forgot_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
  })
}), RecoverPassword.create);

routes.post('/reset_password', RecoverPassword.store);

//Profile
routes.get('/profile_list/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string(),
  })
}), profileController.show);

routes.put('/profile_edit/:userId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string(),
  })
}), profileController.update);

//Cadastro de Lembretes
routes.get('/reminders', RemindersListController.index);

routes.get('/reminder/:reminderId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string(),
  })
}), RemindersListController.show);

routes.post('/reminder', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required().max(400),
    dateActivity: Joi.date().required(),
    dayWeek: Joi.array().required(),
  })
}), ReminderController.store);

routes.put('/reminder/:reminderId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    repeat: Joi.boolean().required(),
    dateActivity: Joi.date().required(),
    dayWeek: Joi.array().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string(),
  })
}), ReminderController.update);

routes.delete('/reminder/:reminderId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string().required(),
  })
}), ReminderController.destroy);

//Vinculo de Usuários
routes.post('/autorizacao_vinculo', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    emailAuth: Joi.string().required().email(),
  })
}), AuthVincController.create);

routes.put('/autorizacao_update', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    email: Joi.string().required().email(),
    emailAuth: Joi.string().required().email(),
  })
}), AuthVincController.authVinc);

routes.post('/autorizacao_store', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required().max(400),
    dateActivity: Joi.date().required(),
    repeat: Joi.boolean().required(),
    dayWeek: Joi.array().required(),
    emailAuth: Joi.string().required().email(),
  })
}), AuthVincController.store);

routes.put('/autorizacao_update/:reminderId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    repeat: Joi.boolean().required(),
    dateActivity: Joi.date().required(),
    dayWeek: Joi.array().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string(),
  })
}), AuthVincController.update);

routes.delete('/autorizacao_delete/:reminderId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string().required(),
  })
}), AuthVincController.destroy);

module.exports = routes;