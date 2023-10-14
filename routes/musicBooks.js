/**
 * @swagger
 * components:
 *   schemas:
 *     musicBook:
 *       type: object
 *       required:
 *         - title
 *         - series
 *         - level
 *         - publisher
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the music book
 *         series:
 *           type: string
 *           description: The series that the music book belongs to
 *         level:
 *           type: string
 *           description: The book level within the series
 *         publisher:
 *           type: string
 *           description: The music book publisher
 *       example:
 *         id: 6528b14f74ef262b0d2b18b8
 *         title: Faber & Faber
 *         series: Piano Adventures
 *         level: 5
 *         publisher: Hal Leonard
 */

/**
 * @swagger
 * tags:
 *   name: Music Books
 *   description: The music books managing API
 * /musicBooks:
 *   post:
 *     summary: Create a new music book
 *     tags: [musicBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/musicBook'
 *     responses:
 *       200:
 *         description: The created music book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/musicBook'
 *       500:
 *         description: Some server error
 *
 */

const routes = require('express').Router();
const musicBooksController = require('../controllers/musicBooks');

routes.get('/', musicBooksController.getBooks);
routes.get('/:id', musicBooksController.getIndividualBook);

routes.post('/', musicBooksController.newBook);

routes.put('/:id', musicBooksController.updateBook);

routes.delete('/:id', musicBooksController.removeBook);

module.exports = routes;
