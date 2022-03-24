const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Comment, Track } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const validateSignup = require('../../validations/validateSignup');

const router = express.Router();

// Sign Up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.signup({
      email,
      username,
      password,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

const userNotFoundError = () => {
  const userError = new Error('User not found.');
  userError.status = 404;
  userError.title = 'User not found.';
  userError.errors = {
    userId: `The requested user could not be found.`,
  };

  return userError;
};

router.get(
  '/:userId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const userId = +req.params.userId;
    // const user = await User.getSingleUserById(userId);
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Track,
          as: 'tracks',
          attributes: ['id'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id'],
        },
      ],
    });

    if (!user) {
      next(userNotFoundError());
    }

    return res.json({
      user,
    });
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    return res.json({ users });
  })
);

router.get(
  '/:userId(\\d+)/tracks',
  asyncHandler(async (req, res, next) => {
    const userId = +req.params.userId;
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Track,
        as: 'tracks',
        include: {
          model: Comment,
          as: 'comments',
          attributes: ['id'],
        },
      },
    });

    // const tracks = await Track.findAll({
    //   where: { userId: userId },
    //   order: [['id', 'DESC']],
    //   include: {
    //     model: Comment,
    //     as: 'comments',
    //     attributes: ['id'],
    //   },
    // });

    if (!user) {
      next(userNotFoundError());
    }

    const { tracks } = user;

    return res.json({
      tracks,
    });
  })
);

router.get(
  '/:userId(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const userId = +req.params.userId;
    const user = await User.findOne({
      where: { id: userId },
      include: { model: Comment, as: 'comments' },
    });

    if (!user) {
      next(userNotFoundError());
    }

    const { comments } = user;

    return res.json({
      comments,
    });
  })
);

module.exports = router;
