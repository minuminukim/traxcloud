const express = require('express');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const tracksRouter = require('./tracks');
const commentsRouter = require('./comments');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);
router.use('/comments', commentsRouter);

module.exports = router;
