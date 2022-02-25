(() => {
var exports = {};
exports.id = 319;
exports.ids = [319];
exports.modules = {

/***/ 6172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AnimalWrapper),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
// EXTERNAL MODULE: ./api/api.ts
var api = __webpack_require__(3438);
// EXTERNAL MODULE: ./components/IdWrapper.tsx
var IdWrapper = __webpack_require__(1625);
// EXTERNAL MODULE: ./components/Breadcrumbs/Breadcrumbs.tsx
var Breadcrumbs = __webpack_require__(1417);
// EXTERNAL MODULE: ./components/AnimalFetcher.tsx
var AnimalFetcher = __webpack_require__(2450);
// EXTERNAL MODULE: ./components/Page.tsx
var Page = __webpack_require__(1612);
// EXTERNAL MODULE: ./components/Modal.tsx
var Modal = __webpack_require__(8929);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/VAdoptionForm/VAdoptionModalContent/VAdoptionModalContent.module.scss
var VAdoptionModalContent_module = __webpack_require__(8454);
var VAdoptionModalContent_module_default = /*#__PURE__*/__webpack_require__.n(VAdoptionModalContent_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/VAdoptionForm/VAdoptionModalContent/VAdoptionModalContent.tsx





const copyToClipboard = (value, successfully = () => null, failure = () => null) => {
  const clipboard = navigator.clipboard;

  if (clipboard !== undefined) {
    navigator.clipboard.writeText(value).then(successfully, failure);
  } else {
    if (document.execCommand) {
      const el = document.createElement('input');
      el.value = value;
      document.body.append(el);
      el.select();
      el.setSelectionRange(0, value.length);

      if (document.execCommand('copy')) {
        successfully();
      }

      el.remove();
    } else {
      failure();
    }
  }
};

function VAdoptionModalContent({
  data,
  error
}) {
  const {
    page,
    accountNo
  } = data;

  if (error) {
    return /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "'Ups... co\u015B posz\u0142o nie tak.'"
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (VAdoptionModalContent_module_default())["v-adoption-modal-content"],
    children: [/*#__PURE__*/jsx_runtime_.jsx(Page/* Page */.T, {
      id: "modal-adopcji-wirtualnej",
      ssrPage: page
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      className: (VAdoptionModalContent_module_default()).para,
      children: ["Numer konta: ", /*#__PURE__*/jsx_runtime_.jsx("strong", {
        children: accountNo
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (VAdoptionModalContent_module_default())["copy-button-wrapper"],
      children: /*#__PURE__*/jsx_runtime_.jsx("button", {
        className: `${(VAdoptionModalContent_module_default())["copy-button"]} button-link`,
        onClick: () => copyToClipboard(accountNo),
        children: "Kopiuj numer konta"
      })
    })]
  });
}
;// CONCATENATED MODULE: ./components/VAdoptionForm/VAdoptionModalContent/usePrefetchVAdoptionModalQueries.tsx


function usePrefetchVAdoptionModalQueries() {
  const {
    0: data,
    1: setData
  } = (0,external_react_.useState)();
  const {
    0: error,
    1: setError
  } = (0,external_react_.useState)();
  (0,external_react_.useEffect)(() => {
    const loadData = async () => {
      const {
        data: page,
        error: pageError
      } = await (0,api/* fetchPage */.H6)('modal-adopcji-wirtualnej');
      const {
        data: settings,
        error: settingsError
      } = await (0,api/* fetchSettings */.wv)();
      const accountNoSetting = settings === null || settings === void 0 ? void 0 : settings.find(s => s.id === 'V_ADOPTION_ACCOUNT_NUMBER');
      setData({
        page,
        accountNo: (accountNoSetting === null || accountNoSetting === void 0 ? void 0 : accountNoSetting.value) || 'Nie podano numeru konta!'
      });
      setError(pageError || settingsError);
    };

    loadData();
  }, []);
  return {
    data,
    error
  };
}
// EXTERNAL MODULE: ./components/Form/FormComponents.tsx
var FormComponents = __webpack_require__(1016);
// EXTERNAL MODULE: ./components/Form/Form.tsx
var Form = __webpack_require__(5630);
// EXTERNAL MODULE: ./components/Captcha/useCapcha.tsx + 1 modules
var useCapcha = __webpack_require__(3372);
// EXTERNAL MODULE: ./components/SimpleModal/useModal.tsx
var useModal = __webpack_require__(8364);
// EXTERNAL MODULE: ./public/site/ilu kot.png
var ilu_kot = __webpack_require__(7667);
;// CONCATENATED MODULE: ./components/VAdoptionForm/VAdoptionForm.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














function VAdoptionForm({
  animal
}) {
  const adoptionModalProps = usePrefetchVAdoptionModalQueries();
  const {
    0: fullName,
    1: setFullName
  } = (0,external_react_.useState)('');
  const {
    0: vCaretakerName,
    1: setVCaretakerName
  } = (0,external_react_.useState)('');
  const {
    0: email,
    1: setEmail
  } = (0,external_react_.useState)('');
  const {
    0: additionalMessage,
    1: setAdditionalMessage
  } = (0,external_react_.useState)('');
  const {
    0: showAdoptionModal,
    1: setShowAdoptionModal
  } = (0,external_react_.useState)(false);
  const [badCaptchaModal, showBadCaptchaModal] = (0,useModal/* useBadCaptchaModal */.r)();
  const [errorModal, showErrorModal] = (0,useModal/* useSimpleModal */.c)({
    title: 'Upsss...',
    image: ilu_kot/* default */.Z,
    text: /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: ["Co\u015B posz\u0142o nie tak.", /*#__PURE__*/jsx_runtime_.jsx("br", {}), "Spr\xF3buj ponownie."]
    })
  });
  const {
    refetchCaptcha,
    captchaElement,
    captchaInput,
    captchaValue
  } = (0,useCapcha/* useCaptcha */.m)();

  const onSubmit = async () => {
    try {
      await (0,api/* fetchVAdoptionForm */.ft)(captchaValue, {
        fullName,
        vCaretakerName,
        email,
        additionalMessage,
        animalId: animal.id,
        animalName: animal.name,
        animalRefNo: animal.refNo
      });
      setShowAdoptionModal(true);
    } catch (e) {
      if (e.statusCode === 400) {
        showBadCaptchaModal();
        refetchCaptcha();
      } else {
        console.warn(e);
        showErrorModal();
      }
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Form/* Form */.l, {
      handleSubmit: onSubmit,
      children: triedSubmitCounter => /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "form-grid-2",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
            children: ["Imi\u0119", /*#__PURE__*/jsx_runtime_.jsx("input", {
              readOnly: true,
              defaultValue: animal.name
            })]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
            children: ["Numer ewidencyjny", /*#__PURE__*/jsx_runtime_.jsx("input", {
              readOnly: true,
              defaultValue: animal.refNo
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "form-grid-2",
          children: [/*#__PURE__*/jsx_runtime_.jsx(FormComponents/* FullName */.cK, {
            value: fullName,
            setValue: setFullName,
            triedSubmitCounter: triedSubmitCounter
          }), /*#__PURE__*/jsx_runtime_.jsx(FormComponents/* Email */.GT, {
            value: email,
            setValue: setEmail,
            triedSubmitCounter: triedSubmitCounter
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(FormComponents/* VCaretakerName */.ID, {
          value: vCaretakerName,
          setValue: setVCaretakerName,
          triedSubmitCounter: triedSubmitCounter
        }), /*#__PURE__*/jsx_runtime_.jsx(FormComponents/* AdditionalMessage */.hy, {
          value: additionalMessage,
          setValue: setAdditionalMessage
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "form-grid-3",
          children: [captchaElement, captchaInput(triedSubmitCounter), /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "form--button",
            children: "Wy\u015Blij"
          })]
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(Modal/* Modal */.u, {
      isOpen: showAdoptionModal,
      onRequestClose: () => setShowAdoptionModal(false),
      children: /*#__PURE__*/jsx_runtime_.jsx(VAdoptionModalContent, _objectSpread({}, adoptionModalProps))
    }), badCaptchaModal, errorModal]
  });
}
;// CONCATENATED MODULE: ./pages/animals/v-adopt/[id].tsx










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
  return /*#__PURE__*/jsx_runtime_.jsx(AnimalFetcher/* AnimalFetcher */.r, {
    id: id,
    ssrAnimal: ssrAnimal,
    Component: VAdoptionDetails
  });
}

function VAdoptionDetails({
  animal
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Breadcrumbs/* Breadcrumbs */.O, {
      items: ['Adopcje wirtualne', /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
        href: "/v-adoptions/to-adopt",
        children: "Szukaj\u0105 opiekun\xF3w"
      }, "last"), /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
        href: `/animals/details/${animal.id}`,
        children: animal.name
      }, "last")]
    }), /*#__PURE__*/jsx_runtime_.jsx(Page/* Page */.T, {
      id: "formularz-adopcji-wirtualnej",
      ssrPage: null
    }), /*#__PURE__*/jsx_runtime_.jsx(VAdoptionForm, {
      animal: animal
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

/***/ 8454:
/***/ ((module) => {

// Exports
module.exports = {
	"v-adoption-modal-content": "VAdoptionModalContent_v-adoption-modal-content__19Iqa",
	"para": "VAdoptionModalContent_para__3ROWV",
	"copy-button-wrapper": "VAdoptionModalContent_copy-button-wrapper__2wFTm",
	"copy-button": "VAdoptionModalContent_copy-button__18I2j"
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

/***/ 9931:
/***/ ((module) => {

"use strict";
module.exports = require("react-modal");

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
var __webpack_exports__ = __webpack_require__.X(0, [624,577,97,64,506,612,778,625,370,450], () => (__webpack_exec__(6172)));
module.exports = __webpack_exports__;

})();