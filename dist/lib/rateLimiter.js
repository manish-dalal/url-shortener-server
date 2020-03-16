"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("./redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const maxReqMin = 100;

var _default = (req, res, next) => {
  const {
    headers
  } = req;
  const {
    iptoken = ''
  } = headers;
  const userAgent = headers['user-agent'];
  let token = iptoken ? iptoken : userAgent; // I am using token here but it can be ip address, API_KEY, etc

  _redis.default.multi() // starting a transaction
  .set([token, 0, 'EX', 60, 'NX']) // SET UUID 0 EX 60 NX
  .incr(token) // INCR UUID
  .exec((err, replies) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      });
    }

    const reqCount = replies[1];

    if (reqCount > maxReqMin) {
      return res.status(500).send({
        message: `Quota of ${maxReqMin} request per min exceeded`
      });
    }

    return next();
  });
};

exports.default = _default;