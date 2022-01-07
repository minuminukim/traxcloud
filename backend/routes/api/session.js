const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validateLogin } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

// User Login
router.post(
  '/',
  validateLogin,
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

// User Logout
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Success' });
});

// Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  return user ? res.json({ user: user.toSafeObject() }) : res.json({});
});

module.exports = router;
