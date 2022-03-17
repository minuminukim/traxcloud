const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateComment = [
  check('body')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Comment cannot be empty.')
    .isLength({ min: 1, max: 280 })
    .withMessage('Comment cannot be longer than 280 characters.'),
  handleValidationErrors,
];

module.exports = validateComment;
