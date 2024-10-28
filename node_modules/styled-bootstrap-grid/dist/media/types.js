"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaAliases = exports.MediaLabels = void 0;
var MediaLabels;
exports.MediaLabels = MediaLabels;

(function (MediaLabels) {
  MediaLabels["xs"] = "smaller";
  MediaLabels["sm"] = "phone";
  MediaLabels["md"] = "tablet";
  MediaLabels["lg"] = "desktop";
  MediaLabels["xl"] = "giant";
  MediaLabels["xxl"] = "veryGiant";
})(MediaLabels || (exports.MediaLabels = MediaLabels = {}));

var MediaAliases;
exports.MediaAliases = MediaAliases;

(function (MediaAliases) {
  MediaAliases["smaller"] = "xs";
  MediaAliases["phone"] = "sm";
  MediaAliases["tablet"] = "md";
  MediaAliases["desktop"] = "lg";
  MediaAliases["giant"] = "xl";
  MediaAliases["veryGiant"] = "xxl";
})(MediaAliases || (exports.MediaAliases = MediaAliases = {}));