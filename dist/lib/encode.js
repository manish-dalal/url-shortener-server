"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const encode = url => {
  return _crypto.default.createHash('md5').update(url).digest('hex');
};

var _default = encode;
exports.default = _default;