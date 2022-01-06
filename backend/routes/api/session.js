const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Login
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
      const error = new Error('Login failed');
      error.status = 401;
      error.title = 'Login failed';
      error.errors = ['The provided credentials were invalid.'];
      return next(error);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// Logout
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

module.exports = router;
