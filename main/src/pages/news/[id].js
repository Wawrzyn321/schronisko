"use strict";
(() => {
var exports = {};
exports.id = 232;
exports.ids = [232];
exports.modules = {

/***/ 8647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ News),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var components_IdWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1625);
/* harmony import */ var api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3438);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_Article_Article__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(261);
/* harmony import */ var errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3506);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function News({
  ssrNews
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(components_IdWrapper__WEBPACK_IMPORTED_MODULE_0__/* .IdWrapper */ .j, {
    Component: ActualNews,
    ssrNews: ssrNews
  });
}

function ActualNews({
  id,
  ssrNews
}) {
  const {
    0: news,
    1: setNews
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(ssrNews);
  const {
    0: error,
    1: setError
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const loadPage = async () => {
      const {
        data,
        error
      } = await (0,api_api__WEBPACK_IMPORTED_MODULE_1__/* .fetchNews */ .aL)(id);
      setNews(data);
      setError(error);
    };

    if (!ssrNews) {
      loadPage();
    }
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(errors__WEBPACK_IMPORTED_MODULE_4__/* .ErrorWrapper */ .Vx, {
    isLoaded: !!news,
    error: error,
    errorGeneric: errors__WEBPACK_IMPORTED_MODULE_4__/* .ERROR_GENERIC */ .Ye,
    error404: errors__WEBPACK_IMPORTED_MODULE_4__/* .ERROR_NEWS_NOT_FOUND */ .zG,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(components_Article_Article__WEBPACK_IMPORTED_MODULE_3__/* .Article */ .d, {
      title: news === null || news === void 0 ? void 0 : news.title,
      content: news === null || news === void 0 ? void 0 : news.content,
      date: news === null || news === void 0 ? void 0 : news.createdAt
    })
  });
}

async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
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
      ssrNews: (await (0,api_api__WEBPACK_IMPORTED_MODULE_1__/* .fetchNews */ .aL)(id)).data
    },
    revalidate: 60
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
var __webpack_exports__ = __webpack_require__.X(0, [624,64,506,625], () => (__webpack_exec__(8647)));
module.exports = __webpack_exports__;

})();