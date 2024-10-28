"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../media/types");

var makeAliases = function makeAliases() {
  var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = Object.assign({}, breakpoints);
  var breakpointsKeys = Object.keys(breakpoints);
  breakpointsKeys.forEach(function (key) {
    var key1 = key;
    var key2 = key;

    if (_types.MediaLabels[key1]) {
      data[_types.MediaLabels[key1]] = breakpoints[key];
    }

    if (_types.MediaAliases[key2] && !data[_types.MediaAliases[key2]]) {
      data[_types.MediaAliases[key2]] = breakpoints[key];
    }
  });
  return data;
};

var _default = makeAliases;
exports.default = _default;