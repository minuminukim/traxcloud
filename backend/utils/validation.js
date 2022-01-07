const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log('validation', validationErrors.mapped());
    const errors = validationErrors.array().map((e) => `${e.msg}`);
    // const errorsMap = validationErrors.mapped();

    // const errors = Object.keys(errorsMap).reduce((acc, field) => {
    //   acc[field] = errorsMap[field].msg;
    //   return acc;
    // }, {});

    // console.log('errors@@@@@@@@', errors);
    const error = Error('Bad request.');
    error.errors = errors;
    error.status = 400;
    error.title = 'Bad request.';
    next(error);
  }

  next();
};

// Validators
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

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

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
};
