const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
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

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
