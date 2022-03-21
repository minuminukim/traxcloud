const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Track, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validateTrack = require('../../validations/validateTrack');
const validateTrackPUT = require('../../validations/validateTrackPUT');
const getObjectKey = require('../../utils/getObjectKey');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  singlePublicFileDelete,
} = require('../../awsS3');

const router = express.Router();

const trackNotFoundError = () => {
  const trackError = new Error('Track not found.');
  trackError.status = 404;
  trackError.title = 'Track not found.';
  trackError.errors = {
    trackId: `The requested track could not be found.`,
  };

  return trackError;
};

router.get(
  '/:trackId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.fetchSingleTrackWithUser(trackId);

    if (!track) {
      return next(trackNotFoundError());
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
    const tracks = await Track.fetchTracks();
    return res.json({ tracks });
  })
);

router.post(
  '/',
  requireAuth,
  singleMulterUpload,
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
    }

    await currentUser.setDataSpent(req.file.size, 'post');
    const trackUrl = await singlePublicFileUpload(req.file);
    const track = await Track.create({ ...req.body, trackUrl });
    const newTrack = await Track.fetchSingleTrackWithUser(track.id);
    return res.json({ newTrack });
  })
);

router.put(
  '/:trackId(\\d+)',
  requireAuth,
  validateTrackPUT,
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.getTrackById(trackId);

    if (track) {
      const pairs = Object.entries(req.body);
      pairs.forEach(([key, value]) => track.set(key, value));
      await track.save();
      const updatedTrack = await Track.fetchSingleTrackWithUser(track.id);
      res.status(200).json({ updatedTrack });
    } else {
      res
        .status(404)
        .json({ message: 'The requested track could not be found.' });
    }
  })
);

router.delete(
  '/:trackId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    const trackId = +req.params.trackId;
    const track = await Track.getTrackById(trackId);

    if (track) {
      const key = getObjectKey(track.trackUrl);
      const userId = +req.body.userId;
      const currentUser = await User.getCurrentUserById(userId);
      await singlePublicFileDelete(key);
      await currentUser.setDataSpent(track.fileSize, 'delete');
      await track.destroy();
      res.status(204).json({ message: 'You have deleted your track.' });
    } else {
      res.status(404).json({ message: 'Track does not exist.' });
    }
  })
);

router.get(
  '/:trackId(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.findOne({
      where: { id: trackId },
      include: {
        model: Comment,
        as: 'comments',
        // include: {
        //   model: User,
        //   as: 'user',
        // },
      },
    });

    if (!track) {
      return next(trackNotFoundError());
    }

    const { comments } = track;

    return res.json({
      comments,
    });
  })
);

module.exports = router;
