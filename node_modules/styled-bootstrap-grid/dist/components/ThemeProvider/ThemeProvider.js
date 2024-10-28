"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultContainerMaxWidth = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _aliases = _interopRequireDefault(require("../../aliases"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultContainerMaxWidth = {
  xxl: 1141,
  xl: 1140,
  lg: 960,
  md: 720,
  sm: 540,
  xs: 540
};
exports.defaultContainerMaxWidth = defaultContainerMaxWidth;

var _default = function _default(props) {
  var _props$gridTheme = props.gridTheme,
      theme = _props$gridTheme === void 0 ? {} : _props$gridTheme;

  var getContainerPadding = function getContainerPadding() {
    if ((0, _utils.isNumber)(styledBootstrapGridTheme.container.padding)) {
      return styledBootstrapGridTheme.container.padding;
    }

    return 15;
  };

  var getContainerMaxWidth = function getContainerMaxWidth(breakpoint) {
    if ((0, _utils.isNumber)(styledBootstrapGridTheme.container.maxWidth[breakpoint])) {
      return styledBootstrapGridTheme.container.maxWidth[breakpoint];
    }

    return defaultContainerMaxWidth[breakpoint];
  };

  var getRowPadding = function getRowPadding() {
    if (styledBootstrapGridTheme.row && (0, _utils.isNumber)(styledBootstrapGridTheme.row.padding)) {
      return styledBootstrapGridTheme.row.padding;
    }

    return 15;
  };

  var getColPadding = function getColPadding() {
    if (styledBootstrapGridTheme.col && (0, _utils.isNumber)(styledBootstrapGridTheme.col.padding)) {
      return styledBootstrapGridTheme.col.padding;
    }

    return 15;
  };

  var getGridColumns = function getGridColumns() {
    if (styledBootstrapGridTheme && (0, _utils.isNumber)(styledBootstrapGridTheme.gridColumns)) {
      return styledBootstrapGridTheme.gridColumns;
    }

    return 12;
  };

  var styledBootstrapGridTheme = {
    gridColumns: theme.gridColumns,
    breakpoints: (0, _aliases.default)(theme.breakpoints),
    col: theme.col,
    row: theme.row,
    container: _objectSpread({}, theme.container, {
      maxWidth: _objectSpread({}, (0, _aliases.default)(defaultContainerMaxWidth), (0, _aliases.default)((theme.container || {}).maxWidth || {}))
    }),
    getContainerPadding: getContainerPadding,
    getContainerMaxWidth: getContainerMaxWidth,
    getRowPadding: getRowPadding,
    getColPadding: getColPadding,
    getGridColumns: getGridColumns
  };
  return _react.default.createElement(_styledComponents.ThemeProvider, _extends({
    theme: {
      styledBootstrapGrid: styledBootstrapGridTheme
    }
  }, props));
};

exports.default = _default;