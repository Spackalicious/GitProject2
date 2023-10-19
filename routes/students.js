const routes = require('express').Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

routes.get('/', studentsController.getStudents);
routes.get('/:id', studentsController.getIndividualStudent);

routes.post('/', validation.saveStudent, studentsController.newStudent);

routes.put('/:id', validation.saveStudent, studentsController.updateStudent);

routes.delete('/:id', studentsController.removeStudent);

module.exports = routes;