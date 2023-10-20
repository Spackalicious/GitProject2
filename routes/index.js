const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/musicBooks', require('./musicBooks'));
router.use('/students', require('./students'));

module.exports = router;
