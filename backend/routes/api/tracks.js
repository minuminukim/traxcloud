const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Track } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validateTrack = require('../../validations/validateTrack');
const getObjectKey = require('../../utils/getObjectKey');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  singlePublicFileDelete,
} = require('../../awsS3');

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
  singleMulterUpload('trackFile'),
  validateTrack,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.body.userId, 10);
    const currentUser = await User.getCurrentUserById(userId);

    // check if upload will push user over data limit of 50mb;
    if (currentUser.dataSpent + req.file.size >= 52428800) {
      const dataLimitError = new Error('You have reached your data limit.');
      dataLimitError.status = 400;
      dataLimitError.title = 'Data Limit Error';
      dataLimitError.errors = { trackFile: `${dataLimitError.message}` };

      return next(dataLimitError);
    } else {
      await currentUser.setDataSpent(req.file.size, 'post');
    }

    const trackUrl = await singlePublicFileUpload(req.file);
    const newTrack = await Track.create({ ...req.body, trackUrl });

    return res.json({ newTrack });
  })
);

router.delete(
  '/track/:trackId',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.getTrackById(trackId);

    if (track) {
      const { trackUrl } = track;
      const key = getObjectKey(trackUrl);
      await singlePublicFileDelete(key);
      await track.destroy();

      const userId = +req.body.userId;
      const currentUser = await User.getCurrentUserById(userId);
      await currentUser.setDataSpent(track.fileSize, 'delete');
  
      res.status(204).json({ message: 'You have deleted your track.' });
    } else {
      res.status(404).json({ message: 'Track does not exist.' });
    }
  })
);

module.exports = router;
