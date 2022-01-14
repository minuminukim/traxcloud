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

const fileFilter = (req, file, cb) => {
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

const singleMulterUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
}).single('trackFile');


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
};
