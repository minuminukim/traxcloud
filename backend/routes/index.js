const express = require('express');
const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/hello/world', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// fetch('/api/test', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `BtiMH600-rQjn8y97U4ck2TCgxD8mziqNxCg`,
//   },
//   body: JSON.stringify({ hello: 'world' }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

module.exports = router;
