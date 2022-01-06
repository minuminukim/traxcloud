const express = require('express');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;
