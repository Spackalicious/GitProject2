const routes = require('express').Router();
const musicBooksController = require('../controllers/musicBooks');
const validation = require('../middleware/validate');

routes.get('/', musicBooksController.getBooks);
routes.get('/:id', musicBooksController.getIndividualBook);

routes.post('/', validation.saveMusicBook, musicBooksController.newBook);

routes.put('/:id', validation.saveMusicBook, musicBooksController.updateBook);

routes.delete('/:id', musicBooksController.removeBook);

module.exports = routes;
