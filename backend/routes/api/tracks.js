const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpoad } = require('../../awsS3');

const router = express.Router();

router.post(
  '/',
  requireAuth,
  singleMulterUpload('track'),
  asyncHandler(async (req, res) => {
    const { file } = req;
    console.log(file);
  })
);

module.exports = router;
