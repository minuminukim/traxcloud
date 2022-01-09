const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateSignup = [
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least four characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be six characters or more.'),
  handleValidationErrors,
];

module.exports = validateSignup;
