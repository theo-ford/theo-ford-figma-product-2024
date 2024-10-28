"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(p) {
  return process.env.NODE_ENV === 'production' ? undefined : ['row', p.alignItems ? "align-items-".concat(p.alignItems) : '', p.smAlignItems ? "align-items-sm-".concat(p.smAlignItems) : '', p.mdAlignItems ? "align-items-md-".concat(p.mdAlignItems) : '', p.lgAlignItems ? "align-items-lg-".concat(p.lgAlignItems) : '', p.xlAlignItems ? "align-items-xl-".concat(p.xlAlignItems) : '', p.justifyContent ? "justify-content-".concat(p.justifyContent) : '', p.smJustifyContent ? "justify-content-sm-".concat(p.smJustifyContent) : '', p.mdJustifyContent ? "justify-content-md-".concat(p.mdJustifyContent) : '', p.lgJustifyContent ? "justify-content-lg-".concat(p.lgJustifyContent) : '', p.xlJustifyContent ? "justify-content-xl-$p.{xlJustifyContent}" : ''].filter(Boolean).join(' ');
};

exports.default = _default;