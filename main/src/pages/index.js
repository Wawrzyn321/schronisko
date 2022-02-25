(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 8200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./api/config.ts
var config = __webpack_require__(7228);
// EXTERNAL MODULE: ./components/MainPage/BigSection/BigSection.module.scss
var BigSection_module = __webpack_require__(3085);
var BigSection_module_default = /*#__PURE__*/__webpack_require__.n(BigSection_module);
// EXTERNAL MODULE: ./components/Article/Article.tsx
var Article = __webpack_require__(261);
// EXTERNAL MODULE: ../../node_modules/next/image.js
var next_image = __webpack_require__(6577);
;// CONCATENATED MODULE: ./public/site/main/white arrow.svg
/* harmony default export */ const white_arrow = ({"src":"/_next/static/image/public/site/main/white arrow.4f8170cba839bbbcf581dc9c94bcf893.svg","height":492,"width":492});
// EXTERNAL MODULE: ./components/MainPage/BigSection/NewsCarousel/NewsCarousel.module.scss
var NewsCarousel_module = __webpack_require__(9502);
var NewsCarousel_module_default = /*#__PURE__*/__webpack_require__.n(NewsCarousel_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
// EXTERNAL MODULE: ./components/MainPage/BigSection/PageLink/PageLink.module.scss
var PageLink_module = __webpack_require__(1455);
var PageLink_module_default = /*#__PURE__*/__webpack_require__.n(PageLink_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/MainPage/BigSection/PageLink/PageLink.tsx



function PageLink({
  children,
  href
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
    href: href,
    passHref: true,
    children: /*#__PURE__*/jsx_runtime_.jsx("a", {
      className: (PageLink_module_default())["page-link"],
      children: children
    })
  });
}
;// CONCATENATED MODULE: ./components/MainPage/BigSection/NewsCarousel/NewsCarousel.tsx










function CarouselControl({
  index,
  total,
  setIndex
}) {
  const inc = () => setIndex((index + 1) % total);

  const dec = () => setIndex(index - 1 < 0 ? total - 1 : index - 1);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (NewsCarousel_module_default())["carousel__left-right"],
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: white_arrow,
        alt: "lewo",
        onClick: dec
      }), /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: white_arrow,
        alt: "prawo",
        onClick: inc
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
      className: (NewsCarousel_module_default()).carousel__bottom,
      children: new Array(total).fill(null).map((_, i) => /*#__PURE__*/jsx_runtime_.jsx("li", {
        className: index === i ? (NewsCarousel_module_default())["carousel--current"] : '',
        onClick: () => setIndex(i)
      }, i))
    })]
  });
}

function NewsCarousel({
  recentNews
}) {
  const {
    0: index,
    1: setIndex
  } = (0,external_react_.useState)(0);
  const currentNews = recentNews[index];

  const currentItem = currentNews && /*#__PURE__*/jsx_runtime_.jsx("img", {
    src: config/* IMAGES_URL */.eG + '/news/' + currentNews.imageName,
    alt: currentNews.id
  });

  const title = currentNews && /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: (NewsCarousel_module_default()).carousel__title,
    children: /*#__PURE__*/jsx_runtime_.jsx(PageLink, {
      href: '/news/' + currentNews.id,
      children: currentNews.title
    })
  });

  const description = (currentNews === null || currentNews === void 0 ? void 0 : currentNews.description) && /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: (NewsCarousel_module_default()).carousel__description,
    children: /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: currentNews.description
    })
  });

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (NewsCarousel_module_default()).carousel__wrapper,
    children: [/*#__PURE__*/jsx_runtime_.jsx(CarouselControl, {
      total: recentNews.length,
      index: index,
      setIndex: setIndex
    }), currentItem, title, description]
  });
}
;// CONCATENATED MODULE: ./components/MainPage/BigSection/BigSection.tsx







function BigSection({
  recentNews,
  mainPage
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (BigSection_module_default())["layout-wrapper"],
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (BigSection_module_default())["img-wrapper"],
      id: (BigSection_module_default()).yellow,
      children: /*#__PURE__*/jsx_runtime_.jsx("img", {
        src: config/* MAIN_PAGE_IMAGES_URL */.Bp + '/yellow.svg',
        alt: ""
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (BigSection_module_default())["flex-end"],
      children: recentNews && /*#__PURE__*/jsx_runtime_.jsx("div", {
        id: (BigSection_module_default()).carousel,
        children: /*#__PURE__*/jsx_runtime_.jsx(NewsCarousel, {
          recentNews: recentNews
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (BigSection_module_default())["img-wrapper"],
      id: (BigSection_module_default()).green,
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        src: config/* MAIN_PAGE_IMAGES_URL */.Bp + '/green.svg',
        alt: ""
      }), mainPage && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (BigSection_module_default()).article,
        children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
          children: "Adopcje"
        }), /*#__PURE__*/jsx_runtime_.jsx(Article/* Article */.d, {
          title: mainPage.title,
          content: mainPage.content,
          showTitle: false
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      id: (BigSection_module_default()).links,
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (BigSection_module_default())["flex-end"],
        children: /*#__PURE__*/jsx_runtime_.jsx(PageLink, {
          href: "/animals/to-adopt",
          children: "Adoptuj"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (BigSection_module_default())["flex-end"],
        children: /*#__PURE__*/jsx_runtime_.jsx(PageLink, {
          href: "/v-adoptions/to-adopt",
          children: "Adoptuj wirtualnie"
        })
      })]
    })]
  });
}
// EXTERNAL MODULE: ./components/MainPage/AfterAdoption/AfterAdoptionAnimals/AfterAdoptionAnimals.module.scss
var AfterAdoptionAnimals_module = __webpack_require__(2945);
var AfterAdoptionAnimals_module_default = /*#__PURE__*/__webpack_require__.n(AfterAdoptionAnimals_module);
;// CONCATENATED MODULE: ./components/MainPage/AfterAdoption/AfterAdoptionAnimals/AfterAdoptionAnimals.tsx






function AnimalImage({
  animal
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (AfterAdoptionAnimals_module_default())["animal-image"],
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        src: (0,config/* buildAnimalImageUrl */.Um)(animal),
        alt: animal.imageName
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (AfterAdoptionAnimals_module_default())["animal-image__link"],
        children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
          href: (0,config/* buildAnimalUrl */.Uw)(animal.id),
          children: "Dowiedz si\u0119 wi\u0119cej"
        })
      })]
    })
  });
}

function AfterAdoptionAnimals({
  afterAdoptionAnimals
}) {
  if (!afterAdoptionAnimals) return null;
  const placeholders = new Array(3 - afterAdoptionAnimals.length).fill(null);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (AfterAdoptionAnimals_module_default())["after-adoption-animals__pics"],
    children: [afterAdoptionAnimals.map(animal => /*#__PURE__*/jsx_runtime_.jsx(AnimalImage, {
      animal: animal
    }, animal.id)), placeholders.map((_, id) => /*#__PURE__*/jsx_runtime_.jsx("img", {
      src: config/* MAIN_PAGE_IMAGES_URL */.Bp + '/404_placeholder.png',
      alt: "404?"
    }, id))]
  });
}
;// CONCATENATED MODULE: ./public/site/main/pies.svg
/* harmony default export */ const pies = ({"src":"/_next/static/image/public/site/main/pies.23a7ae50e11655cf619556f084a57ba8.svg","height":97,"width":124});
;// CONCATENATED MODULE: ./public/site/main/kot.svg
/* harmony default export */ const kot = ({"src":"/_next/static/image/public/site/main/kot.d9e777c0d40a9eafdcaf1ff5ebd7ac4e.svg","height":97,"width":88});
// EXTERNAL MODULE: ./components/MainPage/AfterAdoption/AfterAdoptionHeader/AfterAdoptionHeader.module.scss
var AfterAdoptionHeader_module = __webpack_require__(3737);
var AfterAdoptionHeader_module_default = /*#__PURE__*/__webpack_require__.n(AfterAdoptionHeader_module);
;// CONCATENATED MODULE: ./components/MainPage/AfterAdoption/AfterAdoptionHeader/AfterAdoptionHeader.tsx






function AfterAdoptionHeader() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (AfterAdoptionHeader_module_default())["after-adoption-animals__header"],
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (AfterAdoptionHeader_module_default())["after-adoption-animals__header__title"],
      children: ["Dzi\u015B po adopcji", /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: pies,
        alt: "pies\u0142"
      }), /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: kot,
        alt: "kitku"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (AfterAdoptionHeader_module_default())["after-adoption-animals__header__description"],
      children: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa cupiditate porro, I guess."
    })]
  });
}
// EXTERNAL MODULE: ./components/MainPage/AfterAdoption/AfterAdoption.module.scss
var AfterAdoption_module = __webpack_require__(9111);
var AfterAdoption_module_default = /*#__PURE__*/__webpack_require__.n(AfterAdoption_module);
;// CONCATENATED MODULE: ./components/MainPage/AfterAdoption/AfterAdoption.tsx





function AfterAdoption({
  afterAdoptionAnimals
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (AfterAdoption_module_default())["after-adoption-animals"],
    children: [/*#__PURE__*/jsx_runtime_.jsx(AfterAdoptionHeader, {}), /*#__PURE__*/jsx_runtime_.jsx(AfterAdoptionAnimals, {
      afterAdoptionAnimals: afterAdoptionAnimals
    })]
  });
}
;// CONCATENATED MODULE: ./public/site/main/faq.png
/* harmony default export */ const faq = ({"src":"/_next/static/image/public/site/main/faq.22c2040116be289257ba65e2941a92ba.png","height":165,"width":1800,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAD1BMVEX09vDa497n7en19/Pj6uOCeQUPAAAABXRSTlP+/vTv/fvxM5cAAAAJcEhZcwAACxMAAAsTAQCanBgAAAARSURBVAiZY2BmYGBgYWRkAgAAOAAMJqod0QAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./components/MainPage/FaqBanner.tsx




function FaqBanner() {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    style: {
      marginBottom: '64px'
    },
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
      href: "/pages/faq",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
          src: faq,
          alt: "najcz\u0119\u015Bciej zadawane pytania"
        })
      })
    })
  });
}
;// CONCATENATED MODULE: ./public/site/main/donate.png
/* harmony default export */ const donate = ({"src":"/_next/static/image/public/site/main/donate.ec2cd4b44a95205196d7fd4fb5bfe0d6.png","height":493,"width":1500,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAHlBMVEWnx4iVl26Bq2/1/7ONlGK/2pV5o2yFrHft373/5dZraBLfAAAAB3RSTlNRYzonZuT1M03F5gAAAAlwSFlzAAALEwAACxMBAJqcGAAAABpJREFUCJljYGJhZGRgYGBmYOXg5GBnZ2cDAAGyAEW/pw2dAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./public/site/main/recently-found.png
/* harmony default export */ const recently_found = ({"src":"/_next/static/image/public/site/main/recently-found.034175a06686f59a404bc0f3aab648b2.png","height":532,"width":800,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAAXVBMVEXe3OI+QExOREJUWmbt8/vPzNGEipfvsYxDPEBSS00UEhmtlIzc5e9ua25cVllSSUtMaXGtsbu5o5ifpLB6gYuioay5tLmbnKRnY2htb3njoXnWrptTTVHGzdm8rqqqOP6cAAAAFXRSTlP+E52+/v7V+/1A/fv+1djLAPp8zWtCy4N0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVQImWNgZ5eSFmMQY2MQkuNmZRDlkGQQkRTkYRHlkmDg5JCQFReXYWYQ4OQX5uNlYgQANpgCXTZGfgoAAAAASUVORK5CYII="});
// EXTERNAL MODULE: ./components/MainPage/DonateAndRecentlyFound/DonateAndRecentlyFound.module.scss
var DonateAndRecentlyFound_module = __webpack_require__(6789);
var DonateAndRecentlyFound_module_default = /*#__PURE__*/__webpack_require__.n(DonateAndRecentlyFound_module);
;// CONCATENATED MODULE: ./components/MainPage/DonateAndRecentlyFound/DonateAndRecentlyFound.tsx









function ImageLink({
  href,
  children
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    style: {
      cursor: 'pointer'
    },
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
      href: href,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        children: children
      })
    })
  });
}

function DonateAndRecentlyFound() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (DonateAndRecentlyFound_module_default())["donate-and-recently-found"],
    children: [/*#__PURE__*/jsx_runtime_.jsx(ImageLink, {
      href: "/pages/dotacje",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: donate,
        alt: "przeka\u017C darowizn\u0119"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(ImageLink, {
      href: "/animals/recently-found",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image["default"], {
        src: recently_found,
        alt: "niedawno znalezione"
      })
    })]
  });
}
// EXTERNAL MODULE: ./api/api.ts
var api = __webpack_require__(3438);
;// CONCATENATED MODULE: ./pages/index.tsx








const ID = 'glowna-adopcje';
function Home({
  ssrData
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(BigSection, {
      mainPage: ssrData.mainPage,
      recentNews: ssrData.recentNews
    }), /*#__PURE__*/jsx_runtime_.jsx(AfterAdoption, {
      afterAdoptionAnimals: ssrData.afterAdoptionAnimals
    }), /*#__PURE__*/jsx_runtime_.jsx(FaqBanner, {}), /*#__PURE__*/jsx_runtime_.jsx(DonateAndRecentlyFound, {})]
  });
}
async function getServerSideProps() {
  const afterAdoptionAnimals = (await (0,api/* fetchAfterAdoptionAnimals */.G1)()).data;
  const recentNews = (await (0,api/* fetchRecentNews */.OG)()).data;
  const mainPage = (await (0,api/* fetchPage */.H6)(ID)).data;
  return {
    props: {
      ssrData: {
        afterAdoptionAnimals,
        recentNews,
        mainPage
      }
    }
  };
}

/***/ }),

/***/ 9111:
/***/ ((module) => {

// Exports
module.exports = {
	"after-adoption-animals": "AfterAdoption_after-adoption-animals__QA2Mn"
};


/***/ }),

/***/ 2945:
/***/ ((module) => {

// Exports
module.exports = {
	"after-adoption-animals__pics": "AfterAdoptionAnimals_after-adoption-animals__pics__1VqLy",
	"animal-image": "AfterAdoptionAnimals_animal-image__3zvXC",
	"animal-image__link": "AfterAdoptionAnimals_animal-image__link__h-IGh"
};


/***/ }),

/***/ 3737:
/***/ ((module) => {

// Exports
module.exports = {
	"after-adoption-animals__header": "AfterAdoptionHeader_after-adoption-animals__header__RYBSv",
	"after-adoption-animals__header__title": "AfterAdoptionHeader_after-adoption-animals__header__title__2mMgQ",
	"after-adoption-animals__header__description": "AfterAdoptionHeader_after-adoption-animals__header__description__1C-vd"
};


/***/ }),

/***/ 3085:
/***/ ((module) => {

// Exports
module.exports = {
	"layout-wrapper": "BigSection_layout-wrapper__3WsS4",
	"img-wrapper": "BigSection_img-wrapper__1dzy-",
	"yellow": "BigSection_yellow__Tj2BU",
	"green": "BigSection_green__1Cli7",
	"carousel": "BigSection_carousel__7f95g",
	"article": "BigSection_article__3YNhk",
	"flex-end": "BigSection_flex-end__1kja_",
	"links": "BigSection_links__22736"
};


/***/ }),

/***/ 9502:
/***/ ((module) => {

// Exports
module.exports = {
	"carousel__wrapper": "NewsCarousel_carousel__wrapper__HxiBz",
	"carousel__left-right": "NewsCarousel_carousel__left-right__1n72x",
	"carousel__bottom": "NewsCarousel_carousel__bottom__1U80k",
	"carousel--current": "NewsCarousel_carousel--current__29KKI",
	"carousel__title": "NewsCarousel_carousel__title__xg9FG",
	"carousel__description": "NewsCarousel_carousel__description__1D9tT"
};


/***/ }),

/***/ 1455:
/***/ ((module) => {

// Exports
module.exports = {
	"page-link": "PageLink_page-link__2YFKp"
};


/***/ }),

/***/ 6789:
/***/ ((module) => {

// Exports
module.exports = {
	"donate-and-recently-found": "DonateAndRecentlyFound_donate-and-recently-found__37gCk"
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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [624,577,97,64], () => (__webpack_exec__(8200)));
module.exports = __webpack_exports__;

})();