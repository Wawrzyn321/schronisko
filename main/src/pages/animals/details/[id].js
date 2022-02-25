(() => {
var exports = {};
exports.id = 866;
exports.ids = [866];
exports.modules = {

/***/ 7127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ isReadonly)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5624);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

function isReadonly(category) {
  return category === _prisma_client__WEBPACK_IMPORTED_MODULE_0__.AnimalCategory.ZaTeczowymMostem || category === _prisma_client__WEBPACK_IMPORTED_MODULE_0__.AnimalCategory.ZnalazlyDom;
}

/***/ }),

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

/***/ 7641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AnimalWrapper),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./api/api.ts
var api = __webpack_require__(3438);
// EXTERNAL MODULE: ./components/IdWrapper.tsx
var IdWrapper = __webpack_require__(1625);
// EXTERNAL MODULE: ./components/LayoutWrapper.tsx
var LayoutWrapper = __webpack_require__(5535);
// EXTERNAL MODULE: ./components/AnimalFetcher.tsx
var AnimalFetcher = __webpack_require__(2450);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
// EXTERNAL MODULE: ../../../node_modules/.prisma/client/index.js
var client = __webpack_require__(5624);
// EXTERNAL MODULE: ./components/Breadcrumbs/Breadcrumbs.tsx
var Breadcrumbs = __webpack_require__(1417);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/AnimalDetails/AnimalBreadcrumbs.tsx





function AnimalBreadcrumbs({
  animal
}) {
  const getNameAndHref = () => {
    const type = animal.type === client.AnimalType.DOG ? 'Psy' : 'Koty';

    switch (animal.category) {
      case client.AnimalCategory.DoAdopcji:
      case client.AnimalCategory.PilniePotrzebuja:
      case client.AnimalCategory.Weterani:
        const hrefType = animal.type === client.AnimalType.DOG ? 'dogs' : 'cats';
        return {
          name: `${type} do adopcji`,
          href: '/animals/to-adopt/' + hrefType
        };

      case client.AnimalCategory.NiedawnoZnalezione:
        return {
          name: `Niedawno znalezione`,
          href: '/animals/recently-found'
        };

      case client.AnimalCategory.ZaTeczowymMostem:
        return {
          name: `Odeszły`,
          href: '/animals/gone'
        };

      default:
        return {
          name: type,
          href: '/'
        };
    }
  };

  const {
    name,
    href
  } = getNameAndHref();
  return /*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {
    items: ['Zwierzęta', /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
      href: href,
      children: name
    }, "last")]
  });
}
// EXTERNAL MODULE: ./components/AnimalDetails/AnimalHeader/AnimalHeader.module.scss
var AnimalHeader_module = __webpack_require__(9984);
var AnimalHeader_module_default = /*#__PURE__*/__webpack_require__.n(AnimalHeader_module);
// EXTERNAL MODULE: ./components/AnimalList/isReadonly.tsx
var isReadonly = __webpack_require__(7127);
;// CONCATENATED MODULE: ./components/AnimalDetails/AnimalHeader/AnimalHeader.tsx







function AnimalHeader({
  animal
}) {
  const canVAdopt = !(0,isReadonly/* isReadonly */.$)(animal.category) && animal.virtualCaretakerType === client.VirtualCaretakerType.Szuka;
  const vAdoptLink = `/animals/v-adopt/${animal.id}`;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (AnimalHeader_module_default())["animal-details--header"],
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: animal.name
      }), canVAdopt && /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
        href: vAdoptLink,
        children: /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: (AnimalHeader_module_default())["animal-details--v-adopt-button"],
          children: "Adoptuj wirtualnie"
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (AnimalHeader_module_default())["animal-details--description"],
      children: animal.description.split('\n').map((str, i) => /*#__PURE__*/jsx_runtime_.jsx("p", {
        children: str
      }, i))
    })]
  });
}
// EXTERNAL MODULE: ../../node_modules/next/image.js
var next_image = __webpack_require__(6577);
;// CONCATENATED MODULE: ./public/site/animal-details/opiekun.svg
/* harmony default export */ const opiekun = ({"src":"/_next/static/image/public/site/animal-details/opiekun.bafce483a9a2dfb9e2a9dd449f509850.svg","height":512,"width":512});
;// CONCATENATED MODULE: ./public/site/animal-details/kontakt.svg
/* harmony default export */ const kontakt = ({"src":"/_next/static/image/public/site/animal-details/kontakt.57859a0c9a85ee3919970b13525dfd44.svg","height":212,"width":212});
// EXTERNAL MODULE: ./components/AnimalDetails/AnimalMetadata/AnimalMetadata.module.scss
var AnimalMetadata_module = __webpack_require__(9690);
var AnimalMetadata_module_default = /*#__PURE__*/__webpack_require__.n(AnimalMetadata_module);
;// CONCATENATED MODULE: ./components/AnimalDetails/AnimalMetadata/AnimalMetadata.tsx







const MiniIcon = ({
  name,
  icon
}) => /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
  src: icon,
  alt: name,
  width: "30px",
  height: "30px"
});

function AnimalMetadata({
  animal
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("dl", {
    className: (AnimalMetadata_module_default())["animal-metadata"],
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("dt", {
        children: [/*#__PURE__*/jsx_runtime_.jsx(MiniIcon, {
          name: "opiekun",
          icon: opiekun
        }), "Opiekun wirtualny:"]
      }), /*#__PURE__*/jsx_runtime_.jsx("dd", {
        children: animal.virtualCaretakerName || 'brak'
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("dt", {
        children: [/*#__PURE__*/jsx_runtime_.jsx(MiniIcon, {
          name: "kontakt",
          icon: kontakt
        }), "Kontakt:"]
      }), /*#__PURE__*/jsx_runtime_.jsx("dd", {
        children: animal.contactInfo
      })]
    })]
  });
}
// EXTERNAL MODULE: ./api/config.ts
var config = __webpack_require__(7228);
// EXTERNAL MODULE: ./components/AnimalDetails/AnimalImages/AnimalImages.module.scss
var AnimalImages_module = __webpack_require__(9989);
var AnimalImages_module_default = /*#__PURE__*/__webpack_require__.n(AnimalImages_module);
// EXTERNAL MODULE: ./components/Article/Article.tsx
var Article = __webpack_require__(261);
// EXTERNAL MODULE: ./errors.tsx
var errors = __webpack_require__(3506);
;// CONCATENATED MODULE: ./components/AnimalDetails/AnimalImages/AnimalImages.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function AnimalImages({
  id
}) {
  const {
    0: images,
    1: setImages
  } = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    const loadImages = async () => {
      const {
        data
      } = await (0,api/* fetchAnimalImages */.ug)(id);
      setImages(data);
    };

    if (!(images !== null && images !== void 0 && images.length)) {
      loadImages();
    }
  }, []);

  if (images) {
    return /*#__PURE__*/jsx_runtime_.jsx("ul", {
      className: (AnimalImages_module_default())["animal-images"],
      children: images.map(i => /*#__PURE__*/jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/jsx_runtime_.jsx("img", {
          src: config/* ANIMAL_IMAGES_IMAGES_URL */.cB + '/' + i.imageName
        })
      }, i.id))
    });
  } else {
    return /*#__PURE__*/jsx_runtime_.jsx(LayoutWrapper/* LayoutWrapper */.W, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Article/* Article */.d, _objectSpread(_objectSpread({}, errors/* ERROR_ANIMAL_IMAGES */.LI), {}, {
        showTitle: false
      }))
    });
  }
}
;// CONCATENATED MODULE: ./pages/animals/details/[id].tsx












function AnimalWrapper({
  ssrAnimal
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(IdWrapper/* IdWrapper */.j, {
    Component: AnimalComponent,
    ssrAnimal: ssrAnimal
  });
}

function AnimalComponent({
  id,
  ssrAnimal
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(LayoutWrapper/* LayoutWrapper */.W, {
    children: /*#__PURE__*/jsx_runtime_.jsx(AnimalFetcher/* AnimalFetcher */.r, {
      id: id,
      ssrAnimal: ssrAnimal,
      Component: AnimalDetails
    })
  });
}

function AnimalDetails({
  animal
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(AnimalBreadcrumbs, {
      animal: animal
    }), /*#__PURE__*/jsx_runtime_.jsx(AnimalHeader, {
      animal: animal
    }), /*#__PURE__*/jsx_runtime_.jsx(AnimalMetadata, {
      animal: animal
    }), /*#__PURE__*/jsx_runtime_.jsx(AnimalImages, {
      id: animal.id
    })]
  });
}

async function getServerSideProps(context) {
  const {
    id
  } = context.query;
  return {
    props: {
      ssrAnimal: (await (0,api/* fetchAnimal */.pz)(id)).data
    }
  };
}

/***/ }),

/***/ 9984:
/***/ ((module) => {

// Exports
module.exports = {
	"animal-details--header": "AnimalHeader_animal-details--header__3H2iM",
	"animal-details--description": "AnimalHeader_animal-details--description__MKV2O",
	"animal-details--v-adopt-button": "AnimalHeader_animal-details--v-adopt-button__1UJeI"
};


/***/ }),

/***/ 9989:
/***/ ((module) => {

// Exports
module.exports = {
	"animal-images": "AnimalImages_animal-images__3Amrc"
};


/***/ }),

/***/ 9690:
/***/ ((module) => {

// Exports
module.exports = {
	"animal-metadata": "AnimalMetadata_animal-metadata__2S9wM"
};


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

/***/ 562:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 8028:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 3018:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [624,577,97,64,506,625,450], () => (__webpack_exec__(7641)));
module.exports = __webpack_exports__;

})();