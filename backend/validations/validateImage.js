const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const isValidImageFormat = (mimetype) =>
  ['image/jpeg', 'image/jpg', 'image/png'].some(
    (format) => format === mimetype
  );

const validateImage = [
  check('imageFile').custom((_value, { req }) => {
    if (!('imageFile' in req.files)) {
      return true;
    }
    const image = req.files?.imageFile[0];
    if (!isValidImageFormat(image.mimetype)) {
      throw new Error('Image file must be .jpeg, .jpg, or .png');
    } else if (image.size >= 3 * 1024 * 1024) {
      throw new Error('Image size cannot exceed 3MB.');
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateImage;
