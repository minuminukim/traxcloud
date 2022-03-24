const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment, Track } = require('../../db/models');
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

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return next();
    }

    return res.json({
      comment,
    });
  })
);

router.post(
  '/',
  requireAuth,
  validateComment,
  asyncHandler(async (req, res, next) => {
    const { userId, trackId, body, timePosted } = req.body;
    const track = await Track.findByPk(trackId);

    if (!track) {
      return next();
    }

    const comment = await Comment.create({
      userId,
      trackId,
      body,
      timePosted,
    });

    const { commentCount } = track;

    // increment track.commentCount
    await track.update({ commentCount: commentCount + 1 });

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

    if (comment.userId !== req.user.id) {
      return next(unauthorizedError());
    }

    // Delete comment, then decrement track.commentCount
    const { trackId } = comment;
    await comment.destroy();
    const track = await Track.findByPk(trackId);
    const { commentCount } = track;
    await track.update({ commentCount: commentCount - 1 });

    return res.status(204).json({});
  })
);

module.exports = router;
