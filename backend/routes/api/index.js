const express = require('express');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const tracksRouter = require('./tracks')

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);

module.exports = router;
