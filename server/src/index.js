// Importando
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

// criando nossa app chamando a função express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// req dados das requisições (parametros, tokens)
// res objeto que vamos utilizar, pra enviar alguma resposta
// quando o usuario acessar a rota

/*
// Testando rota
app.get('/', (req, res) =>{
    res.send('ok');
});
*/

// Referenciar authController repassando o app
require('./app/controllers/index')(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`[*] Server running on port: ${process.env.SERVER_PORT}`);
  });

