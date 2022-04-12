'use strict';

const router = require('express').Router();

const controller = require('../controllers/main.controller');

router.get('/', controller.all);
router.post('/', controller.create);
router.get('/:id', controller.info);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;