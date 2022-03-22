const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const isValidImageFormat = (mimetype) =>
  ['image/jpeg', 'image/jpg', 'image/png'].some(
    (format) => format === mimetype
  );

const validateTrack = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters.'),
  // check('artworkUrl').isURL().withMessage('Please provide a valid link.'),
  check('description')
    .isLength({ max: 4000 })
    .withMessage('Description cannot be longer than 4000 characters.'),
  check('imageFile').custom((_value, { req }) => {
    const image = req.files.imageFile[0];
    if (!image) {
      throw new Error('Please provide an image.');
    } else if (!isValidImageFormat(image.mimetype)) {
      throw new Error('Image file must be .jpeg, .jpg, or .png');
    } else if (image.size >= 3 * 1024 * 1024) {
      throw new Error('Image size cannot exceed 3MB.');
    }
    return true;
  }),
  check('trackFile').custom((_value, { req }) => {
    // const { file } = req;
    const track = req.files.trackFile[0];
    if (!track) {
      throw new Error('Please provide a valid mp3.');
    } else if (track.mimetype !== 'audio/mpeg') {
      throw new Error('File must be an .mp3');
    } else if (track.size >= 10485760) {
      throw new Error('File size cannot exceed 10MB.');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateTrack;
