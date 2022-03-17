const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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
  // requireAuth,
  // validateComment,
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

module.exports = router;
