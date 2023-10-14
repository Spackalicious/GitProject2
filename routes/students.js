const routes = require('express').Router();
const studentsController = require('../controllers/students');

routes.get('/', studentsController.getStudents);
routes.get('/:id', studentsController.getIndividualStudent);

routes.post('/', studentsController.newStudent);

routes.put('/:id', studentsController.updateStudent);

routes.delete('/:id', studentsController.removeStudent);

module.exports = routes;