const app = require('./app');
const HistoricController = require('./controllers/HistoricController')
require('dotenv/config');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[*] Server running on port: ${process.env.SERVER_PORT}`);
  
  const timer = setInterval(() => {
    HistoricController.Loop();
  }, 86400000);
  // }, 3000);

  return () => clearInterval(timer);

});
