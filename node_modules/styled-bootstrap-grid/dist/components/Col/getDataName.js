"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _default = function _default(p) {
  return process.env.NODE_ENV === 'production' ? undefined : [p.col && "col".concat((0, _utils.suffix)(p.col)), (0, _utils.isNumber)(p.offset) && "offset-".concat(p.offset), p.auto && "col-auto", p.alignSelf && "align-self-".concat(p.alignSelf), (0, _utils.isNumber)(p.order) || p.order === 'first' || p.order === 'last' && "order-".concat(p.order), p.xs && "col-xs".concat((0, _utils.suffix)(p.xs)), (0, _utils.isNumber)(p.xsOffset) && "offset-xs-".concat(p.xsOffset), p.xsAuto && "col-xs-auto", p.xsAlignSelf && "align-self-xs-".concat(p.xsAlignSelf), (0, _utils.isNumber)(p.xsOrder) || p.xsOrder === 'first' || p.xsOrder === 'last' && "order-xs-".concat(p.xsOrder), p.hiddenXsDown && "hidden-xs-down", p.hiddenXsUp && "hidden-xs-up", p.sm && "col-sm".concat((0, _utils.suffix)(p.sm)), (0, _utils.isNumber)(p.smOffset) && "offset-sm-".concat(p.smOffset), p.smAuto && "col-sm-auto", p.smAlignSelf && "align-self-sm-".concat(p.smAlignSelf), (0, _utils.isNumber)(p.smOrder) || p.smOrder === 'first' || p.smOrder === 'last' && "order-sm-".concat(p.smOrder), p.hiddenSmDown && "hidden-sm-down", p.hiddenSmUp && "hidden-sm-up", p.md && "col-md".concat((0, _utils.suffix)(p.md)), (0, _utils.isNumber)(p.mdOffset) && "offset-md-".concat(p.mdOffset), p.mdAuto && "col-md-auto", p.mdAlignSelf && "align-self-md-".concat(p.mdAlignSelf), (0, _utils.isNumber)(p.mdOrder) || p.mdOrder === 'first' || p.mdOrder === 'last' && "order-md-".concat(p.mdOrder), p.hiddenMdDown && "hidden-md-down", p.hiddenMdUp && "hidden-md-up", p.lg && "col-lg".concat((0, _utils.suffix)(p.lg)), (0, _utils.isNumber)(p.lgOffset) && "offset-lg-".concat(p.lgOffset), p.lgAuto && "col-lg-auto", p.lgAlignSelf && "align-self-lg-".concat(p.lgAlignSelf), (0, _utils.isNumber)(p.lgOrder) || p.lgOrder === 'first' || p.lgOrder === 'last' && "order-lg-".concat(p.lgOrder), p.hiddenLgDown && "hidden-lg-down", p.hiddenLgUp && "hidden-lg-up", p.xl && "col-xl".concat((0, _utils.suffix)(p.xl)), (0, _utils.isNumber)(p.xlOffset) && "offset-xl-".concat(p.xlOffset), p.xlAuto && "col-xl-auto", p.xlAlignSelf && "align-self-xl-".concat(p.xlAlignSelf), (0, _utils.isNumber)(p.xlOrder) || p.xlOrder === 'first' || p.xlOrder === 'last' && "order-xl-".concat(p.xlOrder), p.hiddenXlDown && "hidden-xl-down", p.hiddenXlUp && "hidden-xl-up", p.noGutter && "no-gutter"].filter(Boolean).join(' ');
};

exports.default = _default;