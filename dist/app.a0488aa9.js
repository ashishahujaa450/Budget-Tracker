// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/Model/Eventing.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Eventing =
/** @class */
function () {
  function Eventing() {
    var _this = this;

    this.events = {}; //registering events

    this.on = function (eventName, callback) {
      var handler = _this.events[eventName] || [];
      handler.push(callback);
      _this.events[eventName] = handler;
    }; //trigger event


    this.trigger = function (eventName) {
      var handler = _this.events[eventName];

      if (handler) {
        handler.forEach(function (callback) {
          callback();
        });
      } else {
        throw new Error("event not found");
      }
    };
  }

  return Eventing;
}();

exports.Eventing = Eventing;
},{}],"ts/Model/Expense.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Eventing_1 = require("./Eventing");

var Expense =
/** @class */
function () {
  function Expense() {
    var _this = this;

    this.totalExpense = 0;
    this.expenseList = [];
    this.events = new Eventing_1.Eventing(); //bind change

    this.bindChange = function () {
      _this.events.on("change", function () {
        _this.updateTotalExpense();
      });
    }; //updating total expense


    this.updateTotalExpense = function () {
      var expense = 0;

      _this.expenseList.forEach(function (item) {
        expense += item.value;
      });

      _this.totalExpense = expense;
    }; //add list item to expense list


    this.addListItem = function (item) {
      if (item.value && item.title) {
        //attach unique id
        if (_this.expenseList.length > 0) {
          item.id = _this.expenseList[_this.expenseList.length - 1].id + 1;
        } else {
          item.id = 0;
        }

        _this.expenseList.push(item);
      } else {
        throw new Error("please enter correct data");
      } //trigger app change event


      _this.events.trigger("change");
    }; //remove list item from expense list


    this.removeListItem = function (id) {
      var index = _this.expenseList.findIndex(function (item) {
        return item.id === id;
      });

      var item = _this.expenseList.splice(index, 1);

      console.log(item); //trigger app change event

      _this.events.trigger("change");
    }; //update existing list item from expense list


    this.updateListItem = function (id, updatedItem) {
      var replaceWith = _this.expenseList.find(function (item) {
        return item.id === id;
      });

      if (replaceWith) {
        replaceWith.title = updatedItem.title;
        replaceWith.value = updatedItem.value;
      } else {
        throw new Error("trying to update the item which is not existed!");
      } //trigger app change event


      _this.events.trigger("change");
    };

    this.bindChange();
  }

  return Expense;
}();

exports.Expense = Expense;
},{"./Eventing":"ts/Model/Eventing.ts"}],"ts/Model/Budget.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Expense_1 = require("./Expense");

var Budget =
/** @class */
function () {
  function Budget(data) {
    var _this = this;

    this.data = data;
    this.balance = 0;
    this.expense = new Expense_1.Expense();

    this.bindChange = function () {
      _this.on("change", function () {
        _this.updateBalance();
      });
    }; //updating balance


    this.updateBalance = function () {
      _this.balance = _this.data.totalBudget - _this.expense.totalExpense;
    };

    this.bindChange();
  }

  Object.defineProperty(Budget.prototype, "addListItem", {
    //delegating methods to expense class
    get: function get() {
      return this.expense.addListItem;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Budget.prototype, "removeListItem", {
    get: function get() {
      return this.expense.removeListItem;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Budget.prototype, "updateListItem", {
    get: function get() {
      return this.expense.updateListItem;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Budget.prototype, "on", {
    get: function get() {
      return this.expense.events.on;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Budget.prototype, "trigger", {
    get: function get() {
      return this.expense.events.trigger;
    },
    enumerable: true,
    configurable: true
  });
  return Budget;
}();

exports.Budget = Budget;
},{"./Expense":"ts/Model/Expense.ts"}],"ts/View/View.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View =
/** @class */
function () {
  function View(parent, model) {
    this.parent = parent;
    this.model = model;
    this.checkChange();
  }

  View.prototype.eventsBind = function (fragment) {
    var eventDetail = this.eventsMap();

    var _loop_1 = function _loop_1(key) {
      var _a = key.split(":"),
          eventName = _a[0],
          selector = _a[1];

      fragment.querySelectorAll(selector).forEach(function (element) {
        element.addEventListener(eventName, eventDetail[key]);
      });
    };

    for (var key in eventDetail) {
      _loop_1(key);
    }
  };

  View.prototype.checkChange = function () {
    var _this = this;

    this.model.on("change", function () {
      _this.render();
    });
  };

  View.prototype.render = function () {
    this.parent.innerHTML = "";
    var template = document.createElement("template");
    template.innerHTML = this.template(); //binding event

    this.eventsBind(template.content);
    this.parent.append(template.content);
  };

  return View;
}();

exports.View = View;
},{}],"ts/View/DashboardView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var DashboardView =
/** @class */
function (_super) {
  __extends(DashboardView, _super);

  function DashboardView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  DashboardView.prototype.template = function () {
    return "\n    <div class=\"row my-3\">\n        <div class=\"col-4 text-center mb-2\">\n        <h6 class=\"text-uppercase info-title\">budget</h6>\n        <span class=\"budget-icon\"><i class=\"fas fa-money-bill-alt\"></i></span>\n        <h4 class=\"text-uppercase mt-2 budget\" id=\"budget\">\n            <span>$ </span><span id=\"budget-amount\">" + this.model.data.totalBudget + "</span>\n        </h4>\n        </div>\n        <div class=\"col-4 text-center\">\n        <h6 class=\"text-uppercase info-title\">expenses</h6>\n        <span class=\"expense-icon\"><i class=\"far fa-credit-card\"></i></span>\n        <h4 class=\"text-uppercase mt-2 expense\" id=\"expense\">\n            <span>$ </span><span id=\"expense-amount\">" + this.model.expense.totalExpense + "</span>\n        </h4>\n        </div>\n        <div class=\"col-4 text-center\">\n        <h6 class=\"text-uppercase info-title\">balance</h6>\n        <span class=\"balance-icon\"><i class=\"fas fa-dollar-sign\"></i></span>\n        <h4 class=\"text-uppercase mt-2 balance\" id=\"balance\">\n            <span>$ </span><span id=\"balance-amount\">" + this.model.balance + "</span>\n        </h4>\n        </div>\n    </div>\n      ";
  };

  DashboardView.prototype.eventsMap = function () {
    return {};
  };

  return DashboardView;
}(View_1.View);

exports.DashboardView = DashboardView;
},{"./View":"ts/View/View.ts"}],"ts/View/BudgetView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var BudgetView =
/** @class */
function (_super) {
  __extends(BudgetView, _super);

  function BudgetView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BudgetView.prototype.eventsMap = function () {
    return {
      "click: .budget-submit": this.onBudgetClick
    };
  };

  BudgetView.prototype.onBudgetClick = function (event) {
    event.preventDefault();
    console.log("btn clicked");
    console.log(this.model);
  };

  BudgetView.prototype.template = function () {
    return "\n    <form id=\"budget-form\" class=\" budget-form\">\n        <h5 class=\"text-capitalize\">please enter your budget</h5>\n        <div class=\"form-group\">\n        <input type=\"number\" class=\"form-control budget-input\" id=\"budget-input\">\n        </div>\n        <!-- submit button -->\n        <button type=\"submit\" class=\"btn text-capitalize budget-submit\" id=\"budget-submit\">\n        calculate\n        </button>\n    </form>\n      ";
  };

  return BudgetView;
}(View_1.View);

exports.BudgetView = BudgetView;
},{"./View":"ts/View/View.ts"}],"ts/View/ExpenseAdderView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var ExpenseAdderView =
/** @class */
function (_super) {
  __extends(ExpenseAdderView, _super);

  function ExpenseAdderView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ExpenseAdderView.prototype.template = function () {
    return "\n    <form id=\"expense-form\" class=\" expense-form\">\n        <h5 class=\"text-capitalize\">please enter your expense</h5>\n        <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control expense-input\" id=\"expense-input\">\n        </div>\n        <h5 class=\"text-capitalize\">please enter expense amount</h5>\n        <div class=\"form-group\">\n        <input type=\"number\" class=\"form-control expense-input\" id=\"amount-input\">\n        </div>\n        <!-- submit button -->\n        <button type=\"submit\" class=\"btn text-capitalize expense-submit\" id=\"expense-submit\">\n        add expense\n        </button>\n    </form>\n        ";
  };

  ExpenseAdderView.prototype.eventsMap = function () {
    return {};
  };

  return ExpenseAdderView;
}(View_1.View);

exports.ExpenseAdderView = ExpenseAdderView;
},{"./View":"ts/View/View.ts"}],"ts/View/ExpenseListingView.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = require("./View");

var ExpenseListingView =
/** @class */
function (_super) {
  __extends(ExpenseListingView, _super);

  function ExpenseListingView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.deleteListItemFromView = function (e) {
      var itemId = e.target.parentElement.getAttribute("data-id");

      _this.model.expense.removeListItem(parseInt(itemId));
    };

    return _this;
  }

  ExpenseListingView.prototype.template = function () {
    var html = "";
    this.model.expense.expenseList.forEach(function (item) {
      html += "\n       <div class=\"expense\">\n        <div class=\"expense-item d-flex justify-content-between align-items-baseline\">\n\n        <h6 class=\"expense-title mb-0 text-uppercase list-item text-left\">" + item.title + "</h6>\n        <h5 class=\"expense-amount mb-0 list-item\">" + item.value + "</h5>\n\n        <div class=\"expense-icons list-item\">\n\n        <a href=\"#\" class=\"edit-icon mx-2\" data-id=\"" + item.id + "\">\n        <i class=\"fas fa-edit\"></i>\n        </a>\n        <a href=\"#\" class=\"delete-icon\" data-id=\"" + item.id + "\">\n        <i class=\"fas fa-trash\"></i>\n        </a>\n        </div>\n        </div>\n    </div>    \n       ";
    });
    return html;
  };

  ExpenseListingView.prototype.eventsMap = function () {
    return {
      "click: .delete-icon": this.deleteListItemFromView
    };
  };

  return ExpenseListingView;
}(View_1.View);

exports.ExpenseListingView = ExpenseListingView;
},{"./View":"ts/View/View.ts"}],"ts/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Budget_1 = require("./Model/Budget");

var DashboardView_1 = require("./View/DashboardView");

var item = new Budget_1.Budget({
  totalBudget: 5000
});
item.addListItem({
  title: "attached item",
  value: 100
});
item.addListItem({
  title: "exp",
  value: 500
});
item.addListItem({
  title: "new attached item",
  value: 2100
});
item.addListItem({
  title: "car purchase",
  value: 200
});
item.addListItem({
  title: "laptop accessories",
  value: 150
});
item.removeListItem(3);
item.addListItem({
  title: "final exp",
  value: 500
});
item.removeListItem(4);
item.updateListItem(2, {
  title: "updatedTitle",
  value: 2100
});

var BudgetView_1 = require("./View/BudgetView");

var ExpenseAdderView_1 = require("./View/ExpenseAdderView");

var ExpenseListingView_1 = require("./View/ExpenseListingView");

var view = new BudgetView_1.BudgetView(document.getElementById("budgetView"), item);
var dashboard = new DashboardView_1.DashboardView(document.getElementById("dashboardView"), item);
var expenseAdder = new ExpenseAdderView_1.ExpenseAdderView(document.getElementById("expenseAdderView"), item);
var expenseListing = new ExpenseListingView_1.ExpenseListingView(document.getElementById("expense-list"), item);
view.render();
dashboard.render();
expenseAdder.render();
expenseListing.render();
},{"./Model/Budget":"ts/Model/Budget.ts","./View/DashboardView":"ts/View/DashboardView.ts","./View/BudgetView":"ts/View/BudgetView.ts","./View/ExpenseAdderView":"ts/View/ExpenseAdderView.ts","./View/ExpenseListingView":"ts/View/ExpenseListingView.ts"}],"C:/Users/De-coder/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56900" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/De-coder/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/app.ts"], null)
//# sourceMappingURL=/app.a0488aa9.js.map