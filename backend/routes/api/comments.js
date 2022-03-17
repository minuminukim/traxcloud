const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validateComment = require('../../validations/validateComment');

const router = express.Router();

const unauthorizedError = () => {
  const error = new Error('Unauthorized');
  error.status = 401;
  error.title = 'Unauthorized';
  error.errors = ['You are not authorized to update this comment.'];

  return error;
};

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const comments = await Comment.findAll();
    return res.json({
      comments,
    });
  })
);

router.post(
  '/',
  requireAuth,
  validateComment,
  asyncHandler(async (req, res) => {
    const { userId, trackId, body, timePosted } = req.body;
    const comment = await Comment.create({
      userId,
      trackId,
      body,
      timePosted,
    });

    return res.json({
      comment,
    });
  })
);

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateComment,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const oldComment = await Comment.findByPk(id);

    if (!oldComment) {
      return next();
    }

    const { userId, body } = req.body;

    if (oldComment.userId !== userId) {
      return next(unauthorizedError());
    }

    await oldComment.update({ body: body });
    const comment = await Comment.findByPk(id);

    return res.json({
      comment,
    });
  })
);

router.delete(
  `/:id(\\d+)`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return next();
    }
    // if (comment.userId !== req.user.id) {
    //   return next(unauthorizedError());
    // }
    if (comment.userId !== req.body.userId) {
      return next(unauthorizedError());
    }

    await comment.destroy();

    return res.status(204).json({});
  })
);

module.exports = router;
