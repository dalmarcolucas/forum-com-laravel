webpackJsonp([3],{

/***/ 4:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = __webpack_require__(3);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('replies-component', __webpack_require__(52));

var app = new Vue({
  el: '#app'
});

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(53)
/* template */
var __vue_template__ = __webpack_require__(54)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/replies/components/RepliesComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3446a5b9", Component.options)
  } else {
    hotAPI.reload("data-v-3446a5b9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['replied', 'reply', 'yourAnswer', 'send', 'threadId'],
    data: function data() {
        return {
            replies: [],
            thread_id: this.threadId,
            reply_to_save: {
                body: '',
                thread_id: this.threadId
            }
        };
    },

    methods: {
        getReplies: function getReplies() {
            var _this = this;

            window.axios.get('/replies/' + this.thread_id).then(function (response) {
                _this.replies = response.data;
            });
        },
        save: function save() {
            var _this2 = this;

            window.axios.post('/replies', this.reply_to_save).then(function () {
                _this2.getReplies();
            });
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        this.getReplies();

        Echo.channel('new.reply.' + this.thread_id).listen('NewReply', function (e) {
            if (e.reply) {
                _this3.getReplies();
            }
        });
    }
});

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "card" },
      _vm._l(_vm.replies, function(reply) {
        return _c("div", { key: reply.id, staticClass: "card-content" }, [
          _c("span", { staticClass: "card-title" }, [
            _vm._v(_vm._s(reply.user.name) + " " + _vm._s(_vm.replied))
          ]),
          _vm._v(" "),
          _c("blockquote", [
            _vm._v("\n               " + _vm._s(reply.body) + "\n            ")
          ])
        ])
      })
    ),
    _vm._v(" "),
    _c("div", { staticClass: "card grey lighten-4" }, [
      _c("div", { staticClass: "card-content" }, [
        _c("span", { staticClass: "card-title" }, [_vm._v(_vm._s(_vm.reply))]),
        _vm._v(" "),
        _c(
          "form",
          {
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.save()
              }
            }
          },
          [
            _c("div", { staticClass: "input-field" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.reply_to_save.body,
                    expression: "reply_to_save.body"
                  }
                ],
                staticClass: "materialize-textarea",
                attrs: { rows: "10", placeholder: _vm.yourAnswer },
                domProps: { value: _vm.reply_to_save.body },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.reply_to_save, "body", $event.target.value)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "button",
              { staticClass: "btn red accent-2", attrs: { type: "submit" } },
              [_vm._v(_vm._s(_vm.send))]
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3446a5b9", module.exports)
  }
}

/***/ })

},[50]);