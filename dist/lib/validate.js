"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* @flow */
const REGEX = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

const validate = url => {
  // TODO Add check that url !== hostname
  return REGEX.test(url);
};

var _default = validate;
exports.default = _default;