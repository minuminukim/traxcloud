module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  passwords: {
    demo: process.env.DEMO_PASSWORD,
    seed: process.env.SEED_PASSWORD,
  },
  awsConfig: {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_BUCKET,
  },
};
