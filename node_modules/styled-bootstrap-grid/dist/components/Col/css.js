"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var css = {
  col: function col(column, gridColumns) {
    switch (column) {
      case true:
        return "\n          -ms-flex-preferred-size: 0;\n          flex-basis: 0;\n          -ms-flex-positive: 1;\n          flex-grow: 1;\n          max-width: 100%;\n        ";

      case 'auto':
        return "\n          -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n          width: auto;\n          max-width: none;\n        ";

      default:
        var singleCol = 100 / gridColumns;
        var colFlexBasis = singleCol * column;
        return "\n            -ms-flex: 0 0 ".concat(colFlexBasis, "%;\n            flex: 0 0 ").concat(colFlexBasis, "%;\n            max-width: ").concat(colFlexBasis, "%;\n        ");
    }
  },
  offset: function offset(_offset, gridColumns) {
    var singleCol = 100 / gridColumns;
    var offsetFlexBasis = singleCol * _offset;
    var offsetUnit = offsetFlexBasis > 0 ? '%' : '';
    return "margin-left: ".concat(offsetFlexBasis).concat(offsetUnit, ";");
  },
  order: function order(_order) {
    switch (_order) {
      case 'first':
        return "\n          -ms-flex-order: -1;\n          order: -1;\n        ";

      case 'last':
        return "\n           -ms-flex-order: 13;\n           order: 13;\n        ";

      default:
        return "\n            -ms-flex-order: ".concat(_order, ";\n            order: ").concat(_order, ";\n        ");
    }
  },
  alignSelf: {
    auto: "\n      -ms-flex-item-align: auto;\n      align-self: auto;\n    ",
    start: "\n      -ms-flex-item-align: start;\n      align-self: flex-start;\n    ",
    end: "\n      -ms-flex-item-align: end;\n      align-self: flex-end;\n    ",
    center: "\n      -ms-flex-item-align: center;\n      align-self: center;\n    ",
    baseline: "\n      -ms-flex-item-align: baseline;\n      align-self: baseline;\n    ",
    stretch: "\n      -ms-flex-item-align: stretch;\n      align-self: stretch;\n    "
  },
  display: {
    none: "\n      display: none;\n    "
  },
  noGutter: "\n    padding-right: 0;\n    padding-left: 0;\n  "
};
var _default = css;
exports.default = _default;