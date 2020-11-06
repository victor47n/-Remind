const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const schedule = require("./services/schedule");

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const RecoverPassword = require('./controllers/RecoverPassword');
const ReminderController = require('./controllers/ReminderController');
const RemindersListController = require('./controllers/RemindersListController');
const profileController = require('./controllers/ProfileController');
const authMiddleware = require('./middlewares/auth')
const ScheduledNotification = require("./models/scheduleNotification");

const routes = express.Router();
const route = express.Router();


route.use(authMiddleware);
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
    token: Joi.string().required(),
    // birthdate: Joi.date().required(),
  })
}), UserController.store);

routes.post('/forgot_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
  })
}), RecoverPassword.create);

routes.post('/reset_password', RecoverPassword.store);

// Notificações
routes.post('/notification', async function (req, res) {
  try {
    const payload = {
      time: req.body.time,
      days: req.body.days,
      title: req.body.title,
      body: req.body.body,
    };

    await schedule.createSchedule(payload);

    res.json({
      data: {},
      message: "Success",
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
});

routes.get('/notification', async function (req, res) {
  try {
    const list = schedule.getJobs();
    const keys = Object.keys(list);

    let schedules = await ScheduledNotification.find({});

    schedules = schedules.filter((item) => keys.includes(item._id.toString()));

    res.json({
      data: { schedules },
      status: "success",
      message: "successfull",
    });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
});

routes.delete('/notification', async function (req, res) {
  try {
    const jobId = req.body.id;
    const list = schedule.getJobs();
    const currentJob = list[jobId];

    if (!currentJob) throw new Error("Job not found");

    await ScheduledNotification.findByIdAndRemove(jobId);

    currentJob.cancel();

    res.json({
      data: {},
      status: "success",
      message: "successfull",
    });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
});

//Profile
routes.get('/profile_list/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string(),
  })
}), profileController.show);

routes.put('/profile/edit', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  // [Segments.PARAMS]: Joi.object().keys({
  // })
}), profileController.update);

/* Lembretes */
routes.get('/reminders/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.required(),
  })
}), RemindersListController.index);

routes.get('/reminders-today/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.required(),
  })
}), RemindersListController.today);

routes.get('/reminder/:reminderId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string(),
  })
}), RemindersListController.show);

routes.post('/reminder', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required().max(400),
    dateActivity: Joi.date(),
    repeat: Joi.boolean(),
    userId: Joi.required(),
    dayWeek: Joi.array(),
  })
}), ReminderController.store);

routes.put('/reminder/edit', celebrate({
  [Segments.BODY]: Joi.object().keys({
    reminderId: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    repeat: Joi.boolean(),
    dateActivity: Joi.date(),
    dayWeek: Joi.array(),
  }),
}), ReminderController.update);

routes.put('/reminder/status', celebrate({
  [Segments.BODY]: Joi.object().keys({
    reminderId: Joi.string().required(),
    status: Joi.boolean(),
  }),
}), ReminderController.updateStatus);

routes.delete('/reminder/:reminderId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    reminderId: Joi.string().required(),
  })
}), ReminderController.destroy);

module.exports = routes;