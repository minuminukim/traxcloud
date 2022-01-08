const express = require('express');
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require('../../awsS3');

const router = express.Router();

// Sign Up
router.post(
  '/',
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
