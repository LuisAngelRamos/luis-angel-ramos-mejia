'use strict';

const router = require('express').Router();

const controller = require('../controllers/auth.controller');

router.post('/', controller.auth);
router.post('/aplication', controller.create);

module.exports = router;