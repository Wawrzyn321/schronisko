"use strict";
(() => {
var exports = {};
exports.id = 385;
exports.ids = [385];
exports.modules = {

/***/ 648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ VolunteerDogs),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./api/api.ts
var api = __webpack_require__(3438);
// EXTERNAL MODULE: ./components/Breadcrumbs/Breadcrumbs.tsx
var Breadcrumbs = __webpack_require__(1417);
// EXTERNAL MODULE: ./components/LayoutWrapper.tsx
var LayoutWrapper = __webpack_require__(5535);
// EXTERNAL MODULE: ./components/Page.tsx
var Page = __webpack_require__(1612);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Article/Article.tsx
var Article = __webpack_require__(261);
// EXTERNAL MODULE: ./components/VolunteeringForm/VolunteeringForm.tsx + 1 modules
var VolunteeringForm = __webpack_require__(7133);
// EXTERNAL MODULE: ./errors.tsx
var errors = __webpack_require__(3506);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/DogVolunteeringWrapper.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function DogVolunteeringWrapper({
  ssrSettings
}) {
  var _settings$find;

  const {
    0: settings,
    1: setSettings
  } = (0,external_react_.useState)(ssrSettings);
  const {
    0: error,
    1: setError
  } = (0,external_react_.useState)();
  (0,external_react_.useEffect)(() => {
    const loadSettings = async () => {
      const {
        data,
        error
      } = await (0,api/* fetchSettings */.wv)();
      setSettings(data);
      setError(error);
    };

    loadSettings();
  }, []);

  if (error) {
    return /*#__PURE__*/jsx_runtime_.jsx(Article/* Article */.d, _objectSpread({}, errors/* ERROR_VOLUNTEERING_FORM */.FQ));
  }

  const areDogVolunteeringEnabled = (settings === null || settings === void 0 ? void 0 : (_settings$find = settings.find(s => s.id === 'DOG_VOLUNTEERING_ENABLED')) === null || _settings$find === void 0 ? void 0 : _settings$find.value) === 'true';
  return areDogVolunteeringEnabled && /*#__PURE__*/jsx_runtime_.jsx(VolunteeringForm/* VolunteeringForm */.Z, {});
}
;// CONCATENATED MODULE: ./pages/volunteering/dogs.tsx








function VolunteerDogs({
  ssrPage,
  ssrSettings
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(LayoutWrapper/* LayoutWrapper */.W, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {
      items: ['Wolontariat', 'Pies']
    }), /*#__PURE__*/jsx_runtime_.jsx(VolunteerDogsPage, {
      ssrPage: ssrPage
    }), /*#__PURE__*/jsx_runtime_.jsx(DogVolunteeringWrapper, {
      ssrSettings: ssrSettings
    })]
  });
}

function VolunteerDogsPage({
  ssrPage
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(Page/* Page */.T, {
    id: null,
    ssrPage: ssrPage,
    fetchFn: api/* fetchDogVolunteeringPage */.SL
  });
}

async function getServerSideProps() {
  return {
    props: {
      ssrPage: (await (0,api/* fetchDogVolunteeringPage */.SL)()).data,
      ssrSettings: (await (0,api/* fetchSettings */.wv)()).data
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
var __webpack_exports__ = __webpack_require__.X(0, [624,577,64,506,612,778,370,727], () => (__webpack_exec__(648)));
module.exports = __webpack_exports__;

})();