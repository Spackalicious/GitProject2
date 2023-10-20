const express = require('express');
const router = express.Router();

const musicBooksController = require('../controllers/musicBooks');
const validation = require('../middleware/validate');

router.get('/', musicBooksController.getAll);

router.get('/:id', musicBooksController.getSingle);

router.post('/', validation.saveBook, musicBooksController.createBook);

router.put('/:id', validation.saveBook, musicBooksController.updateBook);

router.delete('/:id', musicBooksController.deleteBook);

module.exports = router;
