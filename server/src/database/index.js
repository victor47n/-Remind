// definindo uma constante
const mongoose = require('mongoose');
require('dotenv/config');

// classe de promise que o mongoose vai usar
mongoose.Promise = global.Promise;

// criando conexão com o banco de dados
mongoose.connect(process.env.SERVER_MONGODB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
});

module.exports = mongoose;