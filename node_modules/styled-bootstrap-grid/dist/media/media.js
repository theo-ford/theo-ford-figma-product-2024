"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = require("styled-components");

var _aliases = _interopRequireDefault(require("../aliases"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      @media (max-width: ", "px) {\n        ", "\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      @media (min-width: ", "px) {\n        ", "\n      }\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultBreakpoints = (0, _aliases.default)({
  xxl: 1540,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 575
});

var getBreakpoints = function getBreakpoints(props) {
  return _objectSpread({}, defaultBreakpoints, props.theme && props.theme.styledBootstrapGrid && props.theme.styledBootstrapGrid.breakpoints || {});
};

var media = Object.keys(defaultBreakpoints).reduce(function (accumulator, label) {
  var minMedia = function minMedia(strings) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    return (0, _styledComponents.css)(_templateObject(), function (props) {
      return getBreakpoints(props)[label];
    }, _styledComponents.css.apply(void 0, [strings].concat(interpolations)));
  };

  var maxMedia = function maxMedia(strings) {
    for (var _len2 = arguments.length, interpolations = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      interpolations[_key2 - 1] = arguments[_key2];
    }

    return (0, _styledComponents.css)(_templateObject2(), function (props) {
      return getBreakpoints(props)[label] - 1;
    }, _styledComponents.css.apply(void 0, [strings].concat(interpolations)));
  };

  accumulator[label] = label === 'xs' || label === 'smaller' ? maxMedia : minMedia;
  accumulator.max[label] = maxMedia;
  accumulator.min[label] = minMedia;
  return accumulator;
}, {
  min: {},
  max: {}
});
var _default = media;
exports.default = _default;