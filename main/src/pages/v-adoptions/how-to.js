(() => {
var exports = {};
exports.id = 755;
exports.ids = [755];
exports.modules = {

/***/ 1417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ Breadcrumbs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Breadcrumbs_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9066);
/* harmony import */ var _Breadcrumbs_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Breadcrumbs_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




function Breadcrumbs({
  items
}) {
  const last = items.splice(-1);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
    className: (_Breadcrumbs_module_scss__WEBPACK_IMPORTED_MODULE_2___default().breadcrumbs),
    children: [items.map((str, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
      children: str
    }, index)), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("strong", {
        children: last
      })
    })]
  });
}

/***/ }),

/***/ 5535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 2292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VirtualHowTo),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var components_Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1612);
/* harmony import */ var components_Breadcrumbs_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1417);
/* harmony import */ var api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3438);
/* harmony import */ var components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5535);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






const ID = 'jak-adoptowac-wirtualnie';
function VirtualHowTo({
  ssrPage
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(components_LayoutWrapper__WEBPACK_IMPORTED_MODULE_3__/* .LayoutWrapper */ .W, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(components_Breadcrumbs_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__/* .Breadcrumbs */ .O, {
      items: ['Adopcje wirtualne', 'Jak adoptować wirtualnie']
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(components_Page__WEBPACK_IMPORTED_MODULE_0__/* .Page */ .T, {
      id: ID,
      ssrPage: ssrPage
    })]
  });
}
async function getServerSideProps() {
  return {
    props: {
      ssrPage: (await (0,api_api__WEBPACK_IMPORTED_MODULE_2__/* .fetchPage */ .H6)(ID)).data
    }
  };
}

/***/ }),

/***/ 9066:
/***/ ((module) => {

// Exports
module.exports = {
	"breadcrumbs": "Breadcrumbs_breadcrumbs__3w6o0"
};


/***/ }),

/***/ 5423:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [624,64,506,612], () => (__webpack_exec__(2292)));
module.exports = __webpack_exports__;

})();