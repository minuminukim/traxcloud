const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorsMap = validationErrors.mapped();

    const errors = Object.keys(errorsMap).reduce((acc, field) => {
      acc[field] = errorsMap[field].msg;
      return acc;
    }, {});

    const error = Error('Bad request.');
    error.errors = errors;
    error.status = 400;
    error.title = 'Bad request.';
    next(error);
  }

  next();
};

module.exports = handleValidationErrors;
