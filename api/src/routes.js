const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Rotas referentes a ONGs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Rotas referentes a Profiles
routes.get('/profile', ProfileController.index);

// Rotas referentes a casos/incidentes
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;