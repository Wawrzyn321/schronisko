"use strict";
(() => {
var exports = {};
exports.id = 392;
exports.ids = [392];
exports.modules = {

/***/ 5535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ LayoutWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function LayoutWrapper({
  children
}) {
  const style = {
    margin: '0 32px'
  };
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    style: style,
    children: children
  });
}

/***/ }),

/***/ 5215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PageComponent),
/* harmony export */   "ActualPage": () => (/* binding */ ActualPage),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var components_IdWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1625);
/* harmony import */ var components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1612);
/* harmony import */ var api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3438);
/* harmony import */ var components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5535);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function PageComponent({
  ssrPage
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(components_IdWrapper__WEBPACK_IMPORTED_MODULE_0__/* .IdWrapper */ .j, {
    Component: ActualPage,
    ssrPage: ssrPage
  });
}
function ActualPage({
  id,
  ssrPage
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_3__/* .LayoutWrapper */ .W, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(components_Page__WEBPACK_IMPORTED_MODULE_1__/* .Page */ .T, {
      id: id,
      ssrPage: ssrPage
    })
  });
}
async function getStaticPaths() {
  const ids = await (0,api_api__WEBPACK_IMPORTED_MODULE_2__/* .fetchPageIds */ .R)();
  const paths = ids.map(id => ({
    params: {
      id
    }
  })); // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.

  return {
    paths,
    fallback: true
  };
}
async function getStaticProps({
  params
}) {
  const {
    id
  } = params;
  return {
    props: {
      ssrPage: (await (0,api_api__WEBPACK_IMPORTED_MODULE_2__/* .fetchPage */ .H6)(id)).data
    }
  };
}

/***/ }),

/***/ 5423:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

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
var __webpack_exports__ = __webpack_require__.X(0, [624,64,506,612,625], () => (__webpack_exec__(5215)));
module.exports = __webpack_exports__;

})();