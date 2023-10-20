const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

router.get('/', studentsController.getStudents);

router.get('/:id', studentsController.getOneStudent);

router.post('/', validation.saveStudent, studentsController.createStudent);

router.put('/:id', validation.saveStudent, studentsController.updateStudent);

router.delete('/:id', studentsController.deleteStudent);

module.exports = router;