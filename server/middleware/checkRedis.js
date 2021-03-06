const redis = require('../redisConfig.js');

const checkRedis = (req, res, next) => {
  if (req.params.endpoint === 'listing') {
    const { id } = req.params;
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
        next();
      });
  } else if (req.params.endpoint === 'reservation') {
    const { id } = req.params;
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
        next();
      });
  } else {
    next();
  }
};

module.exports = checkRedis;
