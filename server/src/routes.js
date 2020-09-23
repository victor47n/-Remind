const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const RecoverPassword = require('./controllers/RecoverPassword');
const AssignmentController = require('./controllers/AssignmentController');
const AssignmentListController = require('./controllers/AssignmentListController');
const profileController = require('./controllers/ProfileController');


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
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string(),
  })
}), profileController.update);

//Cadastro de Lembretes
routes.get('/assignments', AssignmentListController.index);

routes.get('/assignment/:assignmentId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    assignmentId: Joi.string(),
  })
}), AssignmentListController.show);

routes.post('/assignment', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required().max(400),
    dateActivity: Joi.date().required(),
    dayWeek: Joi.array().required(),
  })
}), AssignmentController.store);

routes.put('/assignment/:assignmentId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    repeat: Joi.boolean().required(),
    dateActivity: Joi.date().required(),
    dayWeek: Joi.array().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    assignmentId: Joi.string(),
  })
}), AssignmentController.update);

routes.delete('/assignment/:assignmentId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    assignmentId: Joi.string().required(),
  })
}), AssignmentController.destroy);

module.exports = routes;