"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suffix = exports.isNumber = void 0;

var isNumber = function isNumber(value) {
  return !Number.isNaN(parseInt(value + '', 10));
};

exports.isNumber = isNumber;

var suffix = function suffix(value) {
  return isNumber(value) ? "-".concat(value) : '';
};

exports.suffix = suffix;