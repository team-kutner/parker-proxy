/*
  This file is responsible for requiring your express server and then binding it to the desired port
*/
require('newrelic');
const result = require('dotenv').config();
const server = require('./server.js');

if (result.error) {
  console.log(result.error);
}
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
