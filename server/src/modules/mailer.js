const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass, secure, rejectUnauthorized } = require('../config/mail.json');


var transport = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  tls:{
    rejectUnauthorized
  }
});

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/modules/utils/mail/')
  },
  viewPath: path.resolve('./src/modules/utils/mail/'),
  extName: '.html',
}));
module.exports = transport;