const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const { MulterError } = require('multer');

const isProduction = environment === 'production';
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: { policy: 'credentialless' },
    crossOriginResourcePolicy: true,
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const error = new Error(`The requested resource couldn't be found.`);
  error.title = 'Resource Not Found';
  error.errors = [`The requested resource couldn't be found.`];
  error.status = 404;
  next(error);
});

// Process Sequelize errors
app.use((error, _req, _res, next) => {
  if (error instanceof ValidationError) {
    error.errors = error.errors.map((err) => err.message);
    error.title = 'Validation error';
  }
  next(error);
});

app.use((error, _req, _res, next) => {
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      error.message = 'File size cannot exceed 10MB.';
    }
    error.title = 'File upload error';
    error.errors = { trackFile: `${error.message}` };
  }
  next(error);
});

// Error formatter
app.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  console.error(error);
  res.json({
    title: error.title || 'Server Error',
    message: error.message,
    errors: error.errors,
    stack: isProduction ? null : error.stack,
  });
});

module.exports = app;
