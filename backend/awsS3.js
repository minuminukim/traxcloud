const AWS = require('aws-sdk');
const { MulterError } = require('multer');
const multer = require('multer');
const { awsConfig } = require('./config/');
const NAME_OF_BUCKET = awsConfig.bucket;

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require('path');
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
  };

  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const singlePublicFileDelete = async (key) => {
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key: key,
  };

  const result = await s3.deleteObject(uploadParams).promise();
  return result;
};

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};

// --------------------------- Prviate UPLOAD ------------------------

const singlePrivateFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require('path');
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file);
    })
  );
};

const retrievePrivateFile = (key) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl('getObject', {
      Bucket: NAME_OF_BUCKET,
      Key: key,
    });
  }
  return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

// Validate upload with both track && image fields
const fileFilter = (req, file, cb) => {
  const supportedTrackFormats = ['audio/mp3', 'audio/mpeg'];
  const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

  if (file.fieldname === 'trackFile') {
    if (supportedTrackFormats.some((format) => format === file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: 'Unsupported File Format' }, false);
    }
  } else {
    // file.fieldname === 'imageFile'
    if (supportedImageFormats.some((format) => format === file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: 'Unsupported File Format' }, false);
    }
  }
};

const imageFilter = (req, file, cb) => {
  const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

  if (supportedImageFormats.some((format) => format === file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Unsopported File Format',
      },
      false
    );
  }
};

const trackFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Unsupported File Format',
      },
      false
    );
  }
};

/**
 * Handles an upload with multiple fields (track && image).
 * Accepts an array of files, all with the name 'fieldname'.
 * An object with arrays of files will be stored in req.files:
 */
const multerFieldsUpload = () => {
  const trackSizeLimit = 10 * 1024 * 1024;
  const imageSizeLimit = 3 * 1024 * 1024;
  console.log('hello');

  return multer({
    storage,
    limits: {
      fileSize: trackSizeLimit + imageSizeLimit,
      /**
       * Don't seem to be able to map individiual limits,
       * and multer stops reading from the stream as soon as
       * we encounter the limit, so we have to pass the sum of both files
       */
    },
    fileFilter,
  }).fields([
    {
      name: 'trackFile',
      maxCount: 1,
    },
    {
      name: 'imageFile',
      maxCount: 1,
    },
  ]);
};

const singleMulterUpload = (nameOfKey) => {
  const trackSizeLimit = 10 * 1024 * 1024;
  const imageSizeLimit = 3 * 1024 * 1024;
  const isTrack = nameOfKey === 'trackFile';

  return multer({
    storage,
    limits: {
      fileSize: isTrack ? trackSizeLimit : imageSizeLimit,
    },
    fileFilter: isTrack ? trackFilter : imageFilter,
  }).single(nameOfKey);
};

const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  singlePublicFileDelete,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload,
  multerFieldsUpload,
};
