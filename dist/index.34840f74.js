// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3wsem":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "a14803d334840f74";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"14mSY":[function(require,module,exports) {
// createBooking.js
var _bookingServiceJs = require("./bookingService.js");
document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        (0, _bookingServiceJs.createBooking)();
    });
    const updateButton = document.getElementById("updateButton");
    if (updateButton) updateButton.addEventListener("click", function() {
        (0, _bookingServiceJs.updateBooking)();
    });
});

},{"./bookingService.js":"7lj45"}],"7lj45":[function(require,module,exports) {
// bookingService.js
// Funktion för att visa snackbar-meddelande
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showSnackbar", ()=>showSnackbar);
// Hämta bokningar från servern
parcelHelpers.export(exports, "fetchBookings", ()=>fetchBookings);
// Funktion för att skapa en ny bokning
parcelHelpers.export(exports, "createBooking", ()=>createBooking);
// Funktion för att uppdatera en bokning
parcelHelpers.export(exports, "updateBooking", ()=>updateBooking);
// Funktion för att rensa bokningsformuläret
parcelHelpers.export(exports, "clearForm", ()=>clearForm);
// Funktion för att radera en bokning
parcelHelpers.export(exports, "deleteBooking", ()=>deleteBooking);
// Funktion för att visa bokningar på sidan
parcelHelpers.export(exports, "displayBookings", ()=>displayBookings);
// Funktion för att lägga till händelselyssnare på redigerings- och raderingsikoner
parcelHelpers.export(exports, "attachBookingEventListeners", ()=>attachBookingEventListeners);
// Fyll formuläret med bokningsdata för redigering
parcelHelpers.export(exports, "editBooking", ()=>editBooking);
// Funktion för att sanera inmatade värden för att undvika XSS-attacker
parcelHelpers.export(exports, "sanitizeInput", ()=>sanitizeInput);
function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(()=>{
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}
function fetchBookings() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    fetch("https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
        return response.json();
    }).then((bookings)=>{
        displayBookings(bookings);
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
function createBooking() {
    const name = sanitizeInput(document.getElementById("name").value);
    const phone = sanitizeInput(document.getElementById("phone").value);
    const email = sanitizeInput(document.getElementById("email").value);
    const numberOfPeople = sanitizeInput(document.getElementById("numberOfPeople").value);
    const date = sanitizeInput(document.getElementById("date").value);
    const time = sanitizeInput(document.getElementById("time").value);
    console.log("Creating booking with data:", {
        name,
        phone,
        email,
        numberOfPeople,
        date,
        time
    });
    fetch("https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            phone,
            email,
            numberOfPeople,
            date,
            time
        })
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to create booking. Status: " + response.status);
        return response.json();
    }).then((data)=>{
        console.log("Booking created:", data);
        showSnackbar("Bokning skapad!");
        clearForm();
        // Kontrollerar om användaren har JWT-token innan anrop till fetchBookings()
        const token = localStorage.getItem("token");
        if (token) fetchBookings(); // Uppdatera bokningslistan om användaren är inloggad
    }).catch((error)=>{
        console.error("Error:", error);
        showSnackbar("N\xe5got gick fel. F\xf6rs\xf6k igen.");
    });
}
function updateBooking() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";
        return;
    }
    const id = document.getElementById("bookingId").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const numberOfPeople = document.getElementById("numberOfPeople").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            phone,
            email,
            numberOfPeople,
            date,
            time
        })
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to update booking. Status: " + response.status);
        return response.json();
    }).then((data)=>{
        console.log("Booking updated:", data);
        fetchBookings(); // Uppdatera bokningslistan
        clearForm();
        showSnackbar("Bokning uppdaterad!");
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("bookingForm").querySelector('button[type="submit"]').style.display = "block";
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
function clearForm() {
    const bookingId = document.getElementById("bookingId");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const numberOfPeople = document.getElementById("numberOfPeople");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    if (bookingId) bookingId.value = "";
    if (name) name.value = "";
    if (phone) phone.value = "";
    if (email) email.value = "";
    if (numberOfPeople) numberOfPeople.value = "1";
    if (date) date.value = "";
    if (time) time.value = "";
}
function deleteBooking(id) {
    console.log(`Delete booking ID: ${id}`); // Debug utskrift
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";
        return;
    }
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to delete booking. Status: " + response.status);
        fetchBookings(); // Uppdatera bokningslistan
        showSnackbar("Bokning raderad!");
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
function displayBookings(bookings) {
    const bookingsList = document.getElementById("bookingsList");
    if (!bookingsList) {
        console.warn('Element with id "bookingsList" not found');
        return;
    }
    bookingsList.innerHTML = ""; // Clear existing bookings
    bookings.forEach((booking)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            ${booking.name} - ${booking.date.split("T")[0]} - ${booking.time} - ${booking.numberOfPeople} personer
            <span class="material-icons edit-booking-icon" data-bookingid="${booking._id}">refresh</span>
            <span class="material-icons delete-booking-icon" data-bookingid="${booking._id}">delete</span>
        <hr>
            `;
        bookingsList.appendChild(li);
    });
    attachBookingEventListeners();
}
function attachBookingEventListeners() {
    const deleteIcons = document.querySelectorAll(".delete-booking-icon");
    const editIcons = document.querySelectorAll(".edit-booking-icon");
    if (deleteIcons.length === 0 || editIcons.length === 0) {
        console.warn("No delete or edit icons found");
        return;
    }
    deleteIcons.forEach((icon)=>{
        icon.addEventListener("click", function() {
            const bookingId = this.getAttribute("data-bookingid");
            deleteBooking(bookingId);
        });
    });
    editIcons.forEach((icon)=>{
        icon.addEventListener("click", function() {
            const bookingId = this.getAttribute("data-bookingid");
            editBooking(bookingId);
        });
    });
}
function editBooking(id) {
    console.log(`Editing booking ID: ${id}`);
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";
        return;
    }
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to fetch booking. Status: " + response.status);
        return response.json();
    }).then((booking)=>{
        document.getElementById("bookingId").value = booking._id;
        document.getElementById("name").value = booking.name;
        document.getElementById("phone").value = booking.phone;
        document.getElementById("email").value = booking.email;
        document.getElementById("numberOfPeople").value = booking.numberOfPeople;
        document.getElementById("date").value = booking.date.split("T")[0];
        document.getElementById("time").value = booking.time;
        document.getElementById("updateButton").style.display = "block";
        document.getElementById("bookingForm").querySelector('button[type="submit"]').style.display = "none";
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, "") : "";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"38NU3":[function(require,module,exports) {
// fetchMenu.js
/*
 * Denna fil hanterar hämtning och visning av menyalternativ på webbplatsen.
 * Innehåller funktioner för att hämta menyalternativ från servern, visa dem som artiklar eller lista,
 * samt för att redigera och radera menyalternativ.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Funktion för att hämta menyalternativ från servern
parcelHelpers.export(exports, "fetchMenuItems", ()=>fetchMenuItems);
// Skickar de uppdaterade värdena från formulärfält till servern för att uppdatera menyalternativet
parcelHelpers.export(exports, "updateMenuItem", ()=>updateMenuItem);
// Rensa formuläret efter uppdatering eller skapande av menyalternativ
parcelHelpers.export(exports, "clearMenuForm", ()=>clearMenuForm);
// Funktion för att sanera inmatade värden för att undvika XSS-attacker
parcelHelpers.export(exports, "sanitizeInput", ()=>sanitizeInput);
var _utilsJs = require("./utils.js");
document.addEventListener("DOMContentLoaded", function() {
    const menuSection = document.getElementById("menuSection");
    const menuItemsList = document.getElementById("menuItemsList");
    if (menuSection || menuItemsList) fetchMenuItems();
    else console.error('Neither "menuSection" nor "menuItemsList" found on this page.');
});
let menuItems = [];
function fetchMenuItems() {
    fetch("https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu").then((response)=>{
        if (!response.ok) throw new Error(`Failed to fetch menu items. Status: ${response.status}`);
        return response.json();
    }).then((data)=>{
        menuItems = data;
        if (document.getElementById("menuSection")) printMenuAsArticles(menuItems);
        if (document.getElementById("menuItemsList")) displayMenuItems(menuItems);
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
// Funktion för att visa menyalternativ som artiklar för externa användare
function printMenuAsArticles(menuItems) {
    const menuSection = document.getElementById("menuSection");
    if (!menuSection) return;
    menuSection.innerHTML = "";
    menuItems.forEach((item)=>{
        const article = document.createElement("article");
        article.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.price} kr</p>
        `;
        menuSection.appendChild(article);
    });
}
// Funktion för att visa menyalternativ som lista med ikoner i admingränssnittet
function displayMenuItems(menuItems) {
    const menuItemsList = document.getElementById("menuItemsList");
    if (!menuItemsList) {
        console.error('Element with id "menuItemsList" not found');
        return;
    }
    menuItemsList.innerHTML = "";
    menuItems.forEach((menuItem)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            ${menuItem.name} - ${menuItem.description} - ${menuItem.price} kr - ${menuItem.category}
            <br>
            <span class="material-icons edit-menu-icon" data-menuid="${menuItem._id}">refresh</span>
            <span class="material-icons delete-menu-icon" data-menuid="${menuItem._id}">delete</span>
            <hr>
            `;
        menuItemsList.appendChild(li);
    });
    attachMenuEventListeners();
}
// Funktion för att lägga till händelselyssnare på redigerings- och raderingsikoner
function attachMenuEventListeners() {
    const deleteIcons = document.querySelectorAll(".delete-menu-icon");
    const editIcons = document.querySelectorAll(".edit-menu-icon");
    deleteIcons.forEach((icon)=>{
        icon.addEventListener("click", function() {
            const menuId = this.getAttribute("data-menuid");
            deleteMenuItem(menuId);
        });
    });
    editIcons.forEach((icon)=>{
        icon.addEventListener("click", function() {
            const menuId = this.getAttribute("data-menuid");
            editMenuItem(menuId);
        });
    });
}
// Hämtar ett menyalternativ från servern och fyller i formulärfält för redigering
function editMenuItem(id) {
    console.log(`Editing menu item ID: ${id}`);
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";
        return;
    }
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to fetch menu item. Status: " + response.status);
        return response.json();
    }).then((menuItem)=>{
        document.getElementById("menuId").value = menuItem._id;
        document.getElementById("menuName").value = menuItem.name;
        document.getElementById("description").value = menuItem.description;
        document.getElementById("price").value = menuItem.price;
        document.getElementById("category").value = menuItem.category;
        document.getElementById("updateMenuButton").style.display = "block";
        document.getElementById("menuForm").querySelector('button[type="submit"]').style.display = "none";
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
function updateMenuItem() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    const id = document.getElementById("menuId").value;
    const name = sanitizeInput(document.getElementById("menuName").value);
    const description = sanitizeInput(document.getElementById("description").value);
    const price = sanitizeInput(document.getElementById("price").value);
    const category = sanitizeInput(document.getElementById("category").value);
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            description,
            price,
            category
        })
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to update menu item. Status: " + response.status);
        return response.json();
    }).then((data)=>{
        console.log("Menu item updated:", data);
        fetchMenuItems();
        clearMenuForm();
        (0, _utilsJs.showSnackbar)("Menyalternativ uppdaterad!");
    }).catch((error)=>{
        console.error("Error:", error);
        (0, _utilsJs.showSnackbar)("N\xe5got gick fel. F\xf6rs\xf6k igen.");
    });
}
function clearMenuForm() {
    document.getElementById("menuId").value = "";
    document.getElementById("menuName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("updateMenuButton").style.display = "none";
    document.getElementById("menuForm").querySelector('button[type="submit"]').style.display = "block";
}
// Raderar ett menyalternativ
function deleteMenuItem(id) {
    console.log(`Delete menu item ID: ${id}`);
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";
        return;
    }
    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) throw new Error("Failed to delete menu item. Status: " + response.status);
        fetchMenuItems();
        (0, _utilsJs.showSnackbar)("Menyalternativ raderad!");
    }).catch((error)=>{
        console.error("Error:", error);
        (0, _utilsJs.showSnackbar)("N\xe5got gick fel. F\xf6rs\xf6k igen.");
    });
}
function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, "") : "";
}

},{"./utils.js":"72Dku","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"72Dku":[function(require,module,exports) {
/*
 * Denna fil innehåller allmänna verktygsfunktioner som används i flera delar av applikationen.
 * Funktioner inkluderar att växla navigeringsmenyn, visa snackbars och sanera inmatade värden.
 */ // Funktion för att växla navigeringsmenyn på små skärmar
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "myFunction", ()=>myFunction);
// Funktion för att visa en snackbar med ett meddelande
parcelHelpers.export(exports, "showSnackbar", ()=>showSnackbar);
// Funktion för att sanera inmatade värden för att undvika XSS-attacker
parcelHelpers.export(exports, "sanitizeInput", ()=>sanitizeInput);
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") x.className += " responsive";
    else x.className = "topnav";
}
function showSnackbar(message) {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(function() {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}
function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, "") : "";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["3wsem"], null, "parcelRequireb44e")

//# sourceMappingURL=index.34840f74.js.map
