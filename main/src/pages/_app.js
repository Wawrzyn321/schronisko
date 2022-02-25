(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./components/Header/HeaderContactInfo/HeaderContactInfo.module.scss
var HeaderContactInfo_module = __webpack_require__(7372);
var HeaderContactInfo_module_default = /*#__PURE__*/__webpack_require__.n(HeaderContactInfo_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/Header/HeaderContactInfo/HeaderContactInfo.tsx




function Tel({
  tel
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("strong", {
    children: /*#__PURE__*/jsx_runtime_.jsx("a", {
      href: `tel:${tel}`,
      children: tel
    })
  });
}

function HeaderContactInfo() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (HeaderContactInfo_module_default())["header-contact-info"],
    children: ["Biuro (7:00-14:00): ", /*#__PURE__*/jsx_runtime_.jsx(Tel, {
      tel: "32 293 75 56"
    }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("span", {
      style: {
        color: 'red'
      },
      className: "important",
      children: "Zg\u0142oszenia 24 h:"
    }), ' ', /*#__PURE__*/jsx_runtime_.jsx(Tel, {
      tel: "655 734 532"
    })]
  });
}
// EXTERNAL MODULE: ../../node_modules/next/image.js
var next_image = __webpack_require__(6577);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
;// CONCATENATED MODULE: ./public/site/logo-mini.png
/* harmony default export */ const logo_mini = ({"src":"/_next/static/image/public/site/logo-mini.1aed9d3916b998a8f7c4b6cef0cb6cb9.png","height":122,"width":120,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAG1BMVEVMaXEQOB4jJB8CRh0ARx0ASR0mOh8FQx0ASR0PbnT8AAAACXRSTlMAHhBxi2AFSlO+2um4AAAACXBIWXMAACE3AAAhNwEzWJ96AAAAMklEQVQImSXIwQkAMAzDQNlO0u4/cQn96EAAzAZOcr9yN0zGIsZlaUqQ2KcAV/cOQMsDFF4Ai4hbhy8AAAAASUVORK5CYII="});
// EXTERNAL MODULE: ./components/Header/HeaderTitle/HeaderTitle.module.scss
var HeaderTitle_module = __webpack_require__(2916);
var HeaderTitle_module_default = /*#__PURE__*/__webpack_require__.n(HeaderTitle_module);
;// CONCATENATED MODULE: ./components/Header/HeaderTitle/HeaderTitle.tsx






function HeaderTitle() {
  return /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
    href: "/",
    passHref: true,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
      className: (HeaderTitle_module_default())["header-title"],
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: logo_mini,
        alt: "logo"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (HeaderTitle_module_default()).title,
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Schronisko"
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "Dla bezdomnych zwierz\u0105t"
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          children: "W Sosnowcu"
        })]
      })]
    })
  });
}
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/Header/Nav/Nav.module.scss
var Nav_module = __webpack_require__(1813);
var Nav_module_default = /*#__PURE__*/__webpack_require__.n(Nav_module);
;// CONCATENATED MODULE: ./components/Header/Nav/Nav.tsx







function LinkBorder({
  to
}) {
  const router = (0,router_.useRouter)();
  const isActive = router.pathname.startsWith(to);
  const borderClassName = isActive ? `${(Nav_module_default()).border} ${(Nav_module_default()).active}` : (Nav_module_default()).border;
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: borderClassName
  });
}

function SimpleLink({
  to,
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
    children: [/*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
      href: to,
      children: children
    }), /*#__PURE__*/jsx_runtime_.jsx(LinkBorder, {
      to: to
    })]
  });
}

function ParentLink({
  to,
  title,
  links
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
    className: (Nav_module_default()).anchor,
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      children: title
    }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
      children: links.map(link => /*#__PURE__*/jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
          href: to + link.path,
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            children: link.name
          })
        })
      }, link.path))
    }), /*#__PURE__*/jsx_runtime_.jsx(LinkBorder, {
      to: to
    })]
  });
}

function Nav() {
  const animalsLinks = [{
    name: 'Psy do adopcji',
    path: '/to-adopt/dogs'
  }, {
    name: 'Koty do adopcji',
    path: '/to-adopt/cats'
  }, {
    name: 'Zwierzęta znalezione',
    path: '/recently-found'
  }, {
    name: 'Znalazły dom',
    path: '/adopted'
  }, {
    name: 'Odeszły',
    path: '/gone'
  }];
  const volunteeringLinks = [{
    name: 'Pies',
    path: '/dogs'
  }, {
    name: 'Kot',
    path: '/cats'
  }];
  const vAdoptionLinks = [{
    name: 'Jak adoptować wirtualnie',
    path: '/how-to'
  }, {
    name: 'Szukają opiekunów',
    path: '/to-adopt'
  }, {
    name: 'Znalazły opiekunów',
    path: '/adopted'
  }];
  return /*#__PURE__*/jsx_runtime_.jsx("nav", {
    className: (Nav_module_default()).nav,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [/*#__PURE__*/jsx_runtime_.jsx(SimpleLink, {
        to: "/about",
        children: "O nas"
      }), /*#__PURE__*/jsx_runtime_.jsx(ParentLink, {
        to: "/animals",
        title: "Zwierz\u0119ta",
        links: animalsLinks
      }), /*#__PURE__*/jsx_runtime_.jsx(ParentLink, {
        to: "/v-adoptions",
        title: "Adopcje wirtualne",
        links: vAdoptionLinks
      }), /*#__PURE__*/jsx_runtime_.jsx(ParentLink, {
        to: "/volunteering",
        title: "Wolontariat",
        links: volunteeringLinks
      }), /*#__PURE__*/jsx_runtime_.jsx(SimpleLink, {
        to: "/how-to",
        children: "Jak pom\xF3c"
      }), /*#__PURE__*/jsx_runtime_.jsx(SimpleLink, {
        to: "/contact",
        children: "Kontakt"
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/Header/Header.module.scss
var Header_module = __webpack_require__(1994);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
;// CONCATENATED MODULE: ./components/Header/Header.tsx






function Header() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Header_module_default())["top-bar"],
      children: [/*#__PURE__*/jsx_runtime_.jsx(HeaderTitle, {}), /*#__PURE__*/jsx_runtime_.jsx(HeaderContactInfo, {})]
    }), /*#__PURE__*/jsx_runtime_.jsx(Nav, {})]
  });
}
;// CONCATENATED MODULE: ./public/site/social/fb.svg
/* harmony default export */ const fb = ({"src":"/_next/static/image/public/site/social/fb.6a2597a88780e4abc03e92951cc66a69.svg","height":175,"width":178});
;// CONCATENATED MODULE: ./public/site/social/insta.svg
/* harmony default export */ const insta = ({"src":"/_next/static/image/public/site/social/insta.9fca2fdc11e49b62b5c300c0301165b9.svg","height":175,"width":178});
// EXTERNAL MODULE: ./components/Footer/MediaIcons/MediaIcons.module.scss
var MediaIcons_module = __webpack_require__(3113);
var MediaIcons_module_default = /*#__PURE__*/__webpack_require__.n(MediaIcons_module);
;// CONCATENATED MODULE: ./components/Footer/MediaIcons/MediaIcons.tsx






function MediaIcons() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (MediaIcons_module_default())["media-icons"],
    children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
      href: "https://www.facebook.com/schroniskowsosnowcu/",
      target: "_blank",
      rel: "noopener noreferrer",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: fb,
        alt: "facebook link"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("a", {
      href: "https://www.instagram.com/schroniskososnowiec/",
      target: "_blank",
      rel: "noopener noreferrer",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: insta,
        alt: "instagram link"
      })
    })]
  });
}
// EXTERNAL MODULE: ./components/Footer/AddressInfo/AddressInfo.module.scss
var AddressInfo_module = __webpack_require__(5660);
var AddressInfo_module_default = /*#__PURE__*/__webpack_require__.n(AddressInfo_module);
;// CONCATENATED MODULE: ./components/Footer/AddressInfo/AddressInfo.tsx



function AddressInfo() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (AddressInfo_module_default())["address-info"],
    children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "Schronisko dla Bezdomnych Zwierz\u0105t Miejskiego"
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "Zak\u0142adu Us\u0142ug Komunalnych"
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "Baczy\u0144skiego 2B, 41-203 Sosnowiec"
    })]
  });
}
;// CONCATENATED MODULE: ./public/site/nadzieja_logo.gif
/* harmony default export */ const nadzieja_logo = ({"src":"/_next/static/image/public/site/nadzieja_logo.7455bdc57a3e6d2ac2f2da5950cf56aa.gif","height":120,"width":221});
// EXTERNAL MODULE: ./components/Footer/LeadBy/LeadBy.module.scss
var LeadBy_module = __webpack_require__(1781);
var LeadBy_module_default = /*#__PURE__*/__webpack_require__.n(LeadBy_module);
;// CONCATENATED MODULE: ./components/Footer/LeadBy/LeadBy.tsx





function LeadBy() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (LeadBy_module_default())["lead-by"],
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      children: "Strona prowadzona spo\u0142ecznie przez:"
    }), /*#__PURE__*/jsx_runtime_.jsx("a", {
      href: "https://nadziejanadom.org/",
      target: "_blank",
      rel: "noopener noreferrer",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: nadzieja_logo,
        alt: "nadzieja na dom link"
      })
    })]
  });
}
// EXTERNAL MODULE: ./components/Footer/Footer.module.scss
var Footer_module = __webpack_require__(4518);
var Footer_module_default = /*#__PURE__*/__webpack_require__.n(Footer_module);
;// CONCATENATED MODULE: ./components/Footer/Footer.tsx






function Footer() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Footer_module_default())["footer-flex"],
      children: [/*#__PURE__*/jsx_runtime_.jsx(LeadBy, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Footer_module_default())["footer-flex"],
        children: [/*#__PURE__*/jsx_runtime_.jsx(AddressInfo, {}), /*#__PURE__*/jsx_runtime_.jsx(MediaIcons, {})]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Footer_module_default()).spacer
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      className: (Footer_module_default()).copyright,
      children: "Copyright 2021 R"
    })]
  });
}
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function App({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("main", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Schronisko dla zwierz\u0105t Miejskiego Zak\u0142adu Us\u0142ug Komunalnych w Sosnowcu"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "Schronisko dla zwierz\u0105t Miejskiego Zak\u0142adu Us\u0142ug Komunalnych w Sosnowcu"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        type: "image/png",
        href: "/site/favicon.ico"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Header, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps)), /*#__PURE__*/jsx_runtime_.jsx(Footer, {})]
  });
}

/***/ }),

/***/ 5660:
/***/ ((module) => {

// Exports
module.exports = {
	"address-info": "AddressInfo_address-info__1jq1i"
};


/***/ }),

/***/ 4518:
/***/ ((module) => {

// Exports
module.exports = {
	"footer-flex": "Footer_footer-flex__3TSyd",
	"spacer": "Footer_spacer__ALo-u",
	"copyright": "Footer_copyright__3I8Dv"
};


/***/ }),

/***/ 1781:
/***/ ((module) => {

// Exports
module.exports = {
	"lead-by": "LeadBy_lead-by__3u5tX"
};


/***/ }),

/***/ 3113:
/***/ ((module) => {

// Exports
module.exports = {
	"media-icons": "MediaIcons_media-icons__1yNqv"
};


/***/ }),

/***/ 1994:
/***/ ((module) => {

// Exports
module.exports = {
	"top-bar": "Header_top-bar__10aH7"
};


/***/ }),

/***/ 7372:
/***/ ((module) => {

// Exports
module.exports = {
	"header-contact-info": "HeaderContactInfo_header-contact-info__125HU"
};


/***/ }),

/***/ 2916:
/***/ ((module) => {

// Exports
module.exports = {
	"header-title": "HeaderTitle_header-title__1TxG1",
	"title": "HeaderTitle_title__1jftL"
};


/***/ }),

/***/ 1813:
/***/ ((module) => {

// Exports
module.exports = {
	"border": "Nav_border__3exgS",
	"active": "Nav_active__GawPg",
	"nav": "Nav_nav__WOQEq",
	"anchor": "Nav_anchor__2pWcV"
};


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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [577,97], () => (__webpack_exec__(5191)));
module.exports = __webpack_exports__;

})();