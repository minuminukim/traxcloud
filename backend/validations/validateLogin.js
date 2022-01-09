const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

module.exports = validateLogin;
