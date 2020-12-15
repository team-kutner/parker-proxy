const redis = require('redis');
const { promisifyAll } = require('bluebird');
const result = require('dotenv').config();

if (result.error) {
  console.log(result.error);
}

promisifyAll(redis);

const client = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
});

module.exports = client;
