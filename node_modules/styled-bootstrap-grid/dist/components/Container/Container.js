"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ThemeProvider = require("../ThemeProvider/ThemeProvider");

var _media = _interopRequireDefault(require("../../media"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    max-width: ", "px;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    max-width: ", "px;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    max-width: ", "px;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    max-width: ", "px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  padding-right: ", "px;\n  padding-left: ", "px;\n  margin-right: auto;\n  margin-left: auto;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = _styledComponents.default.div.attrs(function (props) {
  return {
    'data-name': process.env.NODE_ENV !== 'production' ? "container".concat(props.fluid ? '-fluid' : '') : undefined
  };
})(_templateObject(), function (p) {
  if (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerPadding) {
    return 15;
  }

  return p.theme.styledBootstrapGrid.getContainerPadding();
}, function (p) {
  if (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerPadding) {
    return 15;
  }

  return p.theme.styledBootstrapGrid.getContainerPadding();
}, function (p) {
  return !p.fluid && _media.default.sm(_templateObject2(), (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerMaxWidth) && _ThemeProvider.defaultContainerMaxWidth.sm || p.theme.styledBootstrapGrid.getContainerMaxWidth('sm'));
}, function (p) {
  return !p.fluid && _media.default.md(_templateObject3(), (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerMaxWidth) && _ThemeProvider.defaultContainerMaxWidth.md || p.theme.styledBootstrapGrid.getContainerMaxWidth('md'));
}, function (p) {
  return !p.fluid && _media.default.lg(_templateObject4(), (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerMaxWidth) && _ThemeProvider.defaultContainerMaxWidth.lg || p.theme.styledBootstrapGrid.getContainerMaxWidth('lg'));
}, function (p) {
  return !p.fluid && _media.default.xl(_templateObject5(), (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getContainerMaxWidth) && _ThemeProvider.defaultContainerMaxWidth.xl || p.theme.styledBootstrapGrid.getContainerMaxWidth('xl'));
});

exports.default = _default;