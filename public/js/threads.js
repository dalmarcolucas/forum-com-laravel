webpackJsonp([2],{

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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),

/***/ 44:
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

Vue.component('threads-component', __webpack_require__(47));

var app = new Vue({
  el: '#app'
});

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(48)
/* template */
var __vue_template__ = __webpack_require__(49)
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
Component.options.__file = "resources/js/threads/components/ThreadsComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d372214e", Component.options)
  } else {
    hotAPI.reload("data-v-d372214e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 48:
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
    props: ['title', 'threads', 'replies', 'open', 'newThread', 'newTitle', 'newBody', 'send'],
    data: function data() {
        return {
            threads_response: [],
            thread_to_save: {
                title: '',
                body: ''
            }
        };
    },

    methods: {
        save: function save() {
            var _this = this;

            window.axios.post('/threads', this.thread_to_save).then(function () {
                _this.getThreads();
            });
        },
        getThreads: function getThreads() {
            var _this2 = this;

            window.axios.get('/threads').then(function (response) {
                _this2.threads_response = response.data;
            });
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        this.getThreads();

        Echo.channel('new.threads').listen('NewThread', function (e) {
            if (e.thread) {
                _this3.threads_response.data.splice(0, 0, e.thread);
            }
        });
    }
});

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card" }, [
      _c("div", { staticClass: "card-content" }, [
        _c("span", { staticClass: "card-title" }, [_vm._v(_vm._s(_vm.title))]),
        _vm._v(" "),
        _c("table", [
          _c("thead", [
            _c("tr", [
              _c("th", [_vm._v("#")]),
              _vm._v(" "),
              _c("th", [_vm._v(_vm._s(_vm.threads))]),
              _vm._v(" "),
              _c("th", [_vm._v(_vm._s(_vm.replies))]),
              _vm._v(" "),
              _c("th")
            ])
          ]),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.threads_response.data, function(thread) {
              return _c("tr", { key: thread.id }, [
                _c("th", [_vm._v(_vm._s(thread.id))]),
                _vm._v(" "),
                _c("th", [_vm._v(_vm._s(thread.title))]),
                _vm._v(" "),
                _c("th", [_vm._v("0")]),
                _vm._v(" "),
                _c("th", [
                  _c("a", { attrs: { href: "/threads/" + thread.id } }, [
                    _vm._v(_vm._s(_vm.open))
                  ])
                ])
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card" }, [
      _c("div", { staticClass: "card-content" }, [
        _c("span", { staticClass: "card-title" }, [
          _vm._v(_vm._s(_vm.newThread))
        ]),
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
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.thread_to_save.title,
                    expression: "thread_to_save.title"
                  }
                ],
                attrs: { type: "text", placeholder: _vm.newTitle },
                domProps: { value: _vm.thread_to_save.title },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.thread_to_save, "title", $event.target.value)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "input-field" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.thread_to_save.body,
                    expression: "thread_to_save.body"
                  }
                ],
                staticClass: "materialize-textarea",
                attrs: { placeholder: _vm.newBody },
                domProps: { value: _vm.thread_to_save.body },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.thread_to_save, "body", $event.target.value)
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
    require("vue-hot-reload-api")      .rerender("data-v-d372214e", module.exports)
  }
}

/***/ })

},[43]);