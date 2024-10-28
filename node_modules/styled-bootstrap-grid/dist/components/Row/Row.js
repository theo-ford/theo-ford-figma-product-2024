"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _css = _interopRequireDefault(require("./css"));

var _media = _interopRequireDefault(require("../../media"));

var _getDataName = _interopRequireDefault(require("./getDataName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -", "px;\n  margin-left: -", "px;\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = _styledComponents.default.div.attrs(function (props) {
  return {
    'data-name': (0, _getDataName.default)(props)
  };
})(_templateObject(), function (p) {
  if (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getRowPadding) {
    return 15;
  }

  return p.theme.styledBootstrapGrid.getRowPadding();
}, function (p) {
  if (!p.theme || !p.theme.styledBootstrapGrid || !p.theme.styledBootstrapGrid.getRowPadding) {
    return 15;
  }

  return p.theme.styledBootstrapGrid.getRowPadding();
}, function (p) {
  return p.alignItems && _css.default.alignItems[p.alignItems];
}, function (p) {
  return p.smAlignItems && _media.default.sm(_templateObject2(), _css.default.alignItems[p.smAlignItems]);
}, function (p) {
  return p.mdAlignItems && _media.default.md(_templateObject3(), _css.default.alignItems[p.mdAlignItems]);
}, function (p) {
  return p.lgAlignItems && _media.default.lg(_templateObject4(), _css.default.alignItems[p.lgAlignItems]);
}, function (p) {
  return p.xlAlignItems && _media.default.xl(_templateObject5(), _css.default.alignItems[p.xlAlignItems]);
}, function (p) {
  return p.justifyContent && _css.default.justifyContent[p.justifyContent];
}, function (p) {
  return p.smJustifyContent && _media.default.sm(_templateObject6(), _css.default.justifyContent[p.smJustifyContent]);
}, function (p) {
  return p.mdJustifyContent && _media.default.md(_templateObject7(), _css.default.justifyContent[p.mdJustifyContent]);
}, function (p) {
  return p.lgJustifyContent && _media.default.lg(_templateObject8(), _css.default.justifyContent[p.lgJustifyContent]);
}, function (p) {
  return p.xlJustifyContent && _media.default.xl(_templateObject9(), _css.default.justifyContent[p.xlJustifyContent]);
});

exports.default = _default;