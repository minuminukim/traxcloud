const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');
const { User } = require('../db/models');

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
  check('confirmPassword').custom((value, { req }) => {
    const { password } = req.body;
    if (password && value !== password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateSignup;
