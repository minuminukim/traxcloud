const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');


const validateTrackFile = [
  check('trackFile').custom((_value, { req }) => {
    const { file } = req;
    if (!file) {
      throw new Error('Please provide a valid mp3.');
    } else if (file.mimetype !== 'audio/mpeg') {
      throw new Error('File must be an .mp3.');
    } else if (file.size >= 10485760) {
      throw new Error('File size cannot exceed 10MB.');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateTrackFile;
