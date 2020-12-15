const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const checkRedis = require('./middleware/checkRedis.js');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(express.static(PUBLIC_DIR));
app.use(morgan('dev'));

app.get('/homes/:id', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

// app.get('/', (req, res) => {
//   console.log('here')
//   res.sendFile(path.resolve('public', 'index.html'))
// });

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// First check cache for values
app.use('/api/homes/:id/*', checkRedis);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
