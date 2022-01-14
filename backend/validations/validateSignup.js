const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');
const { User } = require('../db/models');

const validateSignup = [
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('email').custom(async (value) => {
    const unique = await User.isUnique(value);
    if (!unique) throw new Error('Email is already registered to an account.');
    return true;
  }),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4, max: 30 })
    .withMessage('Username must be between 4 and 30 characters.')
    .matches(/^[A-Za-z-0-9 \-]+$/i)
    .withMessage('Username can include letters, numbers, and dashes (-).'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('username').custom(async (value) => {
    const unique = await User.isUnique(value);
    if (!unique) throw new Error('Username already exists.');
    return true;
  }),
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
