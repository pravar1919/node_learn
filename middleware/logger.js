const log = (req, res, next) => {
  console.log("Logging....");
  next();
};

const auth = (req, res, next) => {
  console.log("Authenticating....");
  next();
};

module.exports = { log: log, auth: auth };
