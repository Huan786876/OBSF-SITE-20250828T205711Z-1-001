const express = require('express');
const app = express();
const port = 3000;

// Configura middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('app/public'));

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Importa rotas
const rotas = require('./app/routes/router');
app.use('/', rotas);

// Inicia servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
