const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateTrackData = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters.'),
  check('description')
    .isLength({ max: 4000 })
    .withMessage('Description cannot be longer than 4000 characters.'),
  handleValidationErrors,
];

module.exports = validateTrackData;
