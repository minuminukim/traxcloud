const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Track } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpoad } = require('../../awsS3');

const router = express.Router();

router.get(
  '/:trackId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.getTrackById(trackId);

    if (!track) {
      const trackError = new Error('Track not found.');
      trackError.status = 404;
      trackError.title = 'Track not found.';
      trackError.errors = {
        trackId: `The requested track could not be found.`,
      };

      return next(trackError);
    }

    return res.json({
      track,
    });
  })
);

// for /stream
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tracks = await Track.getTracksByMostRecent(User);
    return res.json({ tracks });
  })
);

router.post(
  '/',
  requireAuth,
  singleMulterUpload('track'),
  asyncHandler(async (req, res) => {
    const { file } = req;
    console.log(file);
    // if no errors, await singlePublicFileUpload
    // then pull metadata and make entry to db
    // then if no errors, send info to client
    // else send error(s)
  })
);

module.exports = router;
