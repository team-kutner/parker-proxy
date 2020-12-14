const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const redis = require('./redisConfig.js');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(express.static(PUBLIC_DIR));
app.use(morgan('dev'));

app.get('/homes/:id', (req, res) => {
  console.log('here');
  console.log(path.resolve('public', 'index.html'));
  res.sendFile(path.resolve('public', 'index.html'));
});

// app.get('/', (req, res) => {
//   console.log('here')
//   res.sendFile(path.resolve('public', 'index.html'))
// });

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use((req, res, next) => {
  const splitUrl = req.originalUrl.split('/');
  if (splitUrl[1] === 'api' && splitUrl[splitUrl.length - 1] === 'listing') {
    const id = splitUrl[3];
    redis.getAsync(`listLId${id}`)
      .then((result) => {
        if (result === null) {
          next();
        } else {
          res.status(200).json(JSON.parse(result));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (splitUrl[1] === 'api' && splitUrl[splitUrl.length - 1] === 'reservation') {
    const id = splitUrl[3];
    console.log('check');
    redis.getAsync(`resLId${id}`)
      .then((result) => {
        if (result === null) {
          next();
        } else {
          res.status(200).json(JSON.parse(result));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});
app.use('/api', router.api);

module.exports = app;
