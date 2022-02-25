"use strict";
(() => {
var exports = {};
exports.id = 365;
exports.ids = [365];
exports.modules = {

/***/ 7333:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VolunteerCats),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3438);
/* harmony import */ var components_Breadcrumbs_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1417);
/* harmony import */ var components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5535);
/* harmony import */ var components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1612);
/* harmony import */ var components_VolunteeringForm_VolunteeringForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7133);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







const ID = 'wolontariat-kot';
function VolunteerCats({
  ssrPage
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_2__/* .LayoutWrapper */ .W, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(components_Breadcrumbs_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__/* .Breadcrumbs */ .O, {
      items: ['Wolontariat', 'Kot']
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(components_Page__WEBPACK_IMPORTED_MODULE_3__/* .Page */ .T, {
      id: ID,
      ssrPage: ssrPage
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(components_VolunteeringForm_VolunteeringForm__WEBPACK_IMPORTED_MODULE_4__/* .VolunteeringForm */ .Z, {})]
  });
}
async function getServerSideProps() {
  return {
    props: {
      ssrPage: (await (0,api_api__WEBPACK_IMPORTED_MODULE_0__/* .fetchPage */ .H6)(ID)).data
    }
  };
}

/***/ }),

/***/ 5423:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime");

/***/ }),

/***/ 8028:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3018:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9931:
/***/ ((module) => {

module.exports = require("react-modal");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [624,577,64,506,612,778,370,727], () => (__webpack_exec__(7333)));
module.exports = __webpack_exports__;

})();