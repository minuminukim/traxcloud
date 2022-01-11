const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateTrack = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters.'),
  check('artworkUrl').isURL().withMessage('Please provide a valid link.'),
  check('description')
    .isLength({ max: 4000 })
    .withMessage('Description cannot be longer than 4000 characters.'),
  check('trackFile').custom((_value, { req }) => {
    const { file } = req;
    if (!file) {
      throw new Error('Please provide a valid mp3.');
    } else if (file.mimetype !== 'audio/mpeg') {
      throw new Error('File must be an .mp3');
    } else if (file.size >= 10485760) {
      throw new Error('File size cannot exceed 10MB.');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateTrack;
