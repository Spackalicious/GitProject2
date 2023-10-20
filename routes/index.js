const routes = require('express').Router();

// routes.use('/', require('./swagger'));
routes.use('/students', require('./students'));
routes.use('/musicBooks', require('./musicBooks'));

module.exports = routes; 