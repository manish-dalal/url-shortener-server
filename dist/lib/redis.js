"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */
const client = _redis.default.createClient(_config.default.redis);

client.on('error', function (error) {
  console.error('connect error', error);
});
client.on('connect', function () {
  console.log('redis connected success'); // client.quit()
});
var _default = client;
exports.default = _default;