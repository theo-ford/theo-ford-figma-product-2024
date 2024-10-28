"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var css = {
  alignItems: {
    start: "\n      -ms-flex-align: start !important;\n      align-items: flex-start !important;\n    ",
    end: "\n      -ms-flex-align: end !important;\n      align-items: flex-end !important;\n    ",
    center: "\n      -ms-flex-align: center !important;\n      align-items: center !important;\n    ",
    baseline: "\n      -ms-flex-align: baseline !important;\n      align-items: baseline !important;\n    ",
    stretch: "\n      -ms-flex-align: stretch !important;\n      align-items: stretch !important;\n    "
  },
  justifyContent: {
    start: "\n      -ms-flex-pack: start !important;\n      justify-content: flex-start !important;\n    ",
    end: "\n      -ms-flex-pack: end !important;\n      justify-content: flex-end !important;\n    ",
    center: "\n      -ms-flex-pack: center !important;\n      justify-content: center !important;\n    ",
    between: "\n      -ms-flex-pack: justify !important;\n      justify-content: space-between !important;\n    ",
    around: "\n      -ms-flex-pack: distribute !important;\n      justify-content: space-around !important;\n    "
  }
};
var _default = css;
exports.default = _default;