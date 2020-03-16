"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _redis = _interopRequireDefault(require("../lib/redis"));

var _encode = _interopRequireDefault(require("../lib/encode"));

var _validate = _interopRequireDefault(require("../lib/validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/:hash', (req, res) => {
  const {
    hash
  } = req.params;

  if (hash) {
    _redis.default.get(hash, (err, url) => {
      if (!err && url) {
        return res.redirect(url);
      } else {
        return res.status(400).send({
          message: 'THE LINK YOU ARE TRYING TO ACCESS HAS EXPIRED'
        });
      }
    });
  } else {
    return res.status(400).send({
      message: 'No hash provided'
    });
  }
});
router.post('/', (req, res) => {
  const {
    url,
    expireTime = -1
  } = req.body;

  if (url && (0, _validate.default)(url)) {
    const hash = (0, _encode.default)(url);

    if (expireTime <= -1) {
      _redis.default.get(hash, (err, shortUrl) => {
        if (!err) {
          if (shortUrl) {
            res.status(200).send({
              hash: shortUrl
            });
          } else {
            shortUrl = new Date().getTime().toString(36);

            _redis.default.multi([['set', hash, shortUrl], ['set', shortUrl, url]]).exec(function (err, result) {
              if (err) {
                res.status(500).send({
                  message: err
                });
              } else {
                res.status(200).send({
                  hash: shortUrl
                });
              }
            });
          }
        } else {
          res.status(500).send({
            message: err
          });
        }
      });
    } else {
      // Always create new hash
      const newShortUrl = new Date().getTime().toString(36);

      _redis.default.multi([['set', newShortUrl, url, 'EX', expireTime]]).exec(function (err, result) {
        if (err) {
          res.status(500).send({
            message: err
          });
        } else {
          res.status(200).send({
            hash: newShortUrl
          });
        }
      });
    }
  } else {
    res.status(400).send({
      message: 'Url not valid'
    });
  }
});
var _default = router;
exports.default = _default;