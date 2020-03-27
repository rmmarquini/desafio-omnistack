const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

// Antes de todas as requisições, solicito ao Express que execute os dados como JSON
app.use(express.json());
app.use(routes);

app.listen(3333);