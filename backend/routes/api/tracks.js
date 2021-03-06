const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Track, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const validateTrackFile = require('../../validations/validateTrackFile');
const validateImage = require('../../validations/validateImage');
const validateTrackData = require('../../validations/validateTrackData');
const getObjectKey = require('../../utils/getObjectKey');
const {
  singlePublicFileUpload,
  singlePublicFileDelete,
  multerFieldsUpload,
  multiplePublicFileUpload,
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

const dataLimitError = () => {
  const error = new Error('You have reached your data limit.');
  error.status = 400;
  error.title = 'Data Limit Error';
  error.errors = { trackFile: `${dataLimitError.message}` };

  return error;
};

router.get(
  '/:trackId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    // const track = await Track.fetchSingleTrackWithUser(trackId);
    const track = await Track.findOne({
      where: { id: trackId },
      order: [['id', 'DESC']],
      include: {
        model: Comment,
        as: 'comments',
        attributes: ['id'],
      },
    });

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
    // const tracks = await Track.fetchTracks();
    const tracks = await Track.findAll({
      order: [['id', 'DESC']],
      include: {
        model: Comment,
        as: 'comments',
        attributes: ['id'],
      },
    });

    return res.json({ tracks });
  })
);

// req.files = {
//   trackFile: [
//     {
//       fieldname: 'trackFile',
//       originalName: '...',
//       mimetype: '...',
//       buffer: <Buffer ...>,
//       size: 1231421412,
//     },
//   ],
//   imageFile: [
//     {
//       fieldName: 'imageFile',
//       ...
//     }
//   ]
// }

router.post(
  '/',
  requireAuth,
  multerFieldsUpload(),
  validateTrackData,
  validateImage,
  validateTrackFile,
  asyncHandler(async (req, res, next) => {
    /**
     * REQ.FILES EXAMPLE
     * req.files = {
     *   trackFile: [
     *     {
     *       fieldname: 'trackFile',
     *       originalName: '...',
     *       mimetype: '...',
     *       buffer: <Buffer ...>,
     *       size: 1231421412,
     *     },
     *   ],
     *   imageFile: [
     *     {
     *       fieldName: 'imageFile',
     *       ...
     *     }
     *   ]
     * }
     */

    const { body, files, user } = req;

    // Check if upload will push user over data limit of 50mb;
    const trackFile = files.trackFile[0];
    const isImageUpload = 'imageFile' in files;
    const imageSize = isImageUpload ? files.imageFile[0].size : 0;
    const uploadSize = trackFile.size + imageSize;
    if (user.dataSpent + uploadSize >= 52428800) {
      return next(dataLimitError());
    }

    /**
     * Image isn't a required field, so we'll upload the track,
     * and then create a new track with artworkUrl set to
     * user.profilePictureUrl...
     */

    if (!isImageUpload) {
      const trackUrl = await singlePublicFileUpload(trackFile);
      const track = await Track.create({
        ...body,
        trackUrl,
        artworkUrl: user.profilePictureUrl,
        playCount: 0,
        commentCount: 0,
        peakData: [],
      });
      await user.setDataSpent(uploadSize, 'post');
      await user.update({ trackCount: user.trackCount + 1 });

      return res.json({ track });
    }

    // ...else we upload both files
    const imageFile = files.imageFile[0];
    const [trackUrl, artworkUrl] = await multiplePublicFileUpload([
      trackFile,
      imageFile,
    ]);

    const track = await Track.create({
      ...body,
      trackUrl,
      artworkUrl,
      fileSize: uploadSize,
    });

    await user.setDataSpent(uploadSize, 'post');
    await user.update({ trackCount: user.trackCount + 1 });

    return res.json({ track });
  })
);

router.put(
  '/:trackId(\\d+)',
  requireAuth,
  multerFieldsUpload(),
  validateTrackData,
  validateImage,
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.getTrackById(trackId);
    const user = req.user;

    if (track) {
      const pairs = Object.entries(req.body);
      pairs.forEach(([key, value]) => track.set(key, value));
      const isImageUpdate = 'imageFile' in req.files;
      if (isImageUpdate && track.artworkUrl !== user.profilePictureUrl) {
        const key = getObjectKey(track.artworkUrl);
        const [artworkUrl, _] = await Promise.all([
          singlePublicFileUpload(req.files.imageFile[0]),
          singlePublicFileDelete(key),
        ]);
        track.set('artworkUrl', artworkUrl);
      }

      await track.save();
      await user.update();
      const updatedTrack = await Track.fetchSingleTrackWithUser(track.id);
      res.status(200).json({ updatedTrack });
    } else {
      res
        .status(404)
        .json({ message: 'The requested track could not be found.' });
    }
  })
);

// Increment playcount
router.post(
  '/:trackId(\\d+)/plays',
  asyncHandler(async (req, res, next) => {
    const trackId = +req.params.trackId;
    const track = await Track.findByPk(trackId);
    const updated = await track.update({ playCount: track.playCount + 1 });

    return res.json({
      track: updated,
    });
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
      const user = req.user;
      await singlePublicFileDelete(key);

      // Since artwork defaults to the user's profile picture
      // we check to see if they are separate resources
      // and delete the artwork if so
      if (track.artworkUrl !== user.profilePictureUrl) {
        const imageKey = getObjectKey(track.artworkUrl);
        await singlePublicFileDelete(imageKey);
      }

      await user.setDataSpent(track.fileSize, 'delete');
      await user.update({ trackCount: user.trackCount + 1 });
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
