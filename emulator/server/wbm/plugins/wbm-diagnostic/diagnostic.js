/*!
 * @wago/wbm-diagnostic@1.2.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *
 *
 *   Description:
 *     Diagnostic log
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.diagnostic = t() : e.diagnostic = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function i(n) {
            if (t[n])
                return t[n].exports;
            var r = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(r.exports, r, r.exports, i),
            r.l = !0,
            r.exports
        }
        return i.m = e,
        i.c = t,
        i.d = function(e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }
        ,
        i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(e, t) {
            if (1 & t && (e = i(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var n = Object.create(null);
            if (i.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    i.d(n, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return n
        }
        ,
        i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return i.d(t, "a", t),
            t
        }
        ,
        i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        i.p = "",
        i(i.s = 0)
    }([function(e, t, i) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, i, n) {
            return new (i || (i = Promise))((function(r, o) {
                function a(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function c(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                c((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var i, n, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (r = 2 & o[0] ? n.return : o[0] ? n.throw || ((r = n.return) && r.call(n),
                                0) : n.next) && !(r = r.call(n, o[1])).done)
                                    return r;
                                switch (n = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                n = 0
                            } finally {
                                i = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(1);
        base.plugin.register("wbm-diagnostic", (function(e) {
            return n(this, void 0, void 0, (function() {
                var t;
                return r(this, (function(i) {
                    return t = {
                        title: {
                            default: "Diagnostic Information",
                            localized: "diagnostic"
                        },
                        content: [new o.Diagnostic(e)]
                    },
                    [2, {
                        id: "diagnostic",
                        title: {
                            fallback: "Diagnostic",
                            key: "diagnostic-menu-title"
                        },
                        priority: 700,
                        controller: e.viewGenerator.generate(e, t)
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, i) {
        "use strict";
        var n, r = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i])
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            n(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), o = this && this.__awaiter || function(e, t, i, n) {
            return new (i || (i = Promise))((function(r, o) {
                function a(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function c(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                c((n = n.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var i, n, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (r = 2 & o[0] ? n.return : o[0] ? n.throw || ((r = n.return) && r.call(n),
                                0) : n.next) && !(r = r.call(n, o[1])).done)
                                    return r;
                                switch (n = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                n = 0
                            } finally {
                                i = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = i(2);
        i(3);
        var c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.view = document.createElement("wbm-diagnostic"),
                t.didLoad = !1,
                t.isPeriodicallyRefreshing = !1,
                t
            }
            return r(t, e),
            Object.defineProperty(t.prototype, "checkboxReadLast", {
                get: function() {
                    return this.view.querySelector('[taid="field-diagnostic-limit"] input[type="checkbox"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "textfieldReadLast", {
                get: function() {
                    return this.view.querySelector('[taid="field-diagnostic-limit"] input[type="text"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "checkboxAutoRefresh", {
                get: function() {
                    return this.view.querySelector('[taid="field-diagnostic-automatic-refresh-interval"] input[type="checkbox"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "textfieldAutoRefresh", {
                get: function() {
                    return this.view.querySelector('[taid="field-diagnostic-automatic-refresh-interval"] input[type="text"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "refreshButton", {
                get: function() {
                    return this.view.querySelector("button")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "sourceSelectElement", {
                get: function() {
                    return this.view.querySelector('[taid="field-diagnostic-source-selection"] select')
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.updateDisabledStates = function() {
                this.isPeriodicallyRefreshing ? (this.checkboxReadLast.disabled = !0,
                this.textfieldReadLast.disabled = !0,
                this.checkboxAutoRefresh.disabled = !0,
                this.textfieldAutoRefresh.disabled = !0) : (this.textfieldReadLast.disabled = !this.checkboxReadLast.checked,
                this.textfieldAutoRefresh.disabled = !this.checkboxAutoRefresh.checked,
                this.checkboxReadLast.disabled = !1,
                this.checkboxAutoRefresh.disabled = !1)
            }
            ,
            t.prototype.updateButtonName = function() {
                this.checkboxAutoRefresh.checked ? this.isPeriodicallyRefreshing ? this.refreshButton.innerText = "Stop" : this.refreshButton.innerText = "Start" : this.refreshButton.innerText = "Refresh"
            }
            ,
            t.prototype.addSourceSelectOption = function(e) {
                var t = this.sourceSelectElement
                  , i = document.createElement("option");
                i.value = e,
                i.text = e,
                t.add(i, null)
            }
            ,
            t.prototype.updateLocalizables = function() {
                var e = this.view.querySelector('[taid="form-title"]')
                  , t = this.view.querySelector('[taid="field-diagnostic-limit"] label')
                  , i = this.view.querySelector('[taid="field-diagnostic-automatic-refresh-interval"] label');
                e.innerText = this.base.localization.localized({
                    fallback: e.innerText,
                    key: "form-diagnostic-title"
                }),
                t.innerText = this.base.localization.localized({
                    fallback: t.innerText,
                    key: "field-diagnostic-limit"
                }),
                i.innerText = this.base.localization.localized({
                    fallback: i.innerText,
                    key: "field-diagnostic-auto-refresh"
                })
            }
            ,
            t.prototype.load = function() {
                return o(this, void 0, void 0, (function() {
                    var e = this;
                    return a(this, (function(t) {
                        return this.didLoad || (this.view.innerHTML = i(7),
                        this.updateLocalizables(),
                        this.updateButtonName(),
                        this.updateDisabledStates(),
                        "admin" == this.base.authentication.getActiveUser().name && this.loadAndAddSourceSelectOption(),
                        this.checkboxReadLast.addEventListener("change", (function() {
                            return e.updateDisabledStates()
                        }
                        )),
                        this.checkboxAutoRefresh.addEventListener("change", (function() {
                            e.updateDisabledStates(),
                            e.updateButtonName()
                        }
                        )),
                        this.refreshButton.addEventListener("click", (function() {
                            var t = parseInt(e.textfieldAutoRefresh.value);
                            (t < 1 || isNaN(t)) && (t = 1),
                            e.textfieldAutoRefresh.value = "" + t;
                            var i = e.checkboxReadLast.checked
                              , n = parseInt(e.textfieldReadLast.value);
                            (n < 1 || isNaN(n)) && (n = 1),
                            e.textfieldReadLast.value = "" + n,
                            e.checkboxAutoRefresh.checked ? e.isPeriodicallyRefreshing ? e.stopRefreshingReriodically() : e.startRefreshingPeriodically(t, i ? n : 0) : e.refreshOnce(i ? n : 0),
                            e.updateButtonName(),
                            e.updateDisabledStates()
                        }
                        ))),
                        this.didLoad = !0,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return o(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        return this.stopRefreshingReriodically(),
                        this.view.innerHTML = "",
                        this.didLoad = !1,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.refreshOnce = function(e) {
                return void 0 === e && (e = 0),
                o(this, void 0, void 0, (function() {
                    var t, i, n, r, o, s;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            switch (t = this.view.querySelector("textarea"),
                            (i = this.view.querySelector("div.indicator")).style.display = "",
                            t.style.opacity = "0.5",
                            n = "diagnostic.getlog",
                            (r = this.sourceSelectElement).value) {
                            case "Standard":
                                n = "diagnostic.getlog";
                                break;
                            default:
                                n = "printlog.read"
                            }
                            return [4, this.base.parameter.execute(n, {
                                limit: "" + e,
                                filename: "" + r.value
                            })];
                        case 1:
                            return (o = a.sent()).error ? (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Fetching log failed",
                                    key: "fetching-log-failed-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "An error occured when trying to fetch the logs",
                                    key: "fetching-log-failed-modal-message"
                                }),
                                detailMessage: o.error.message
                            }),
                            this.stopRefreshingReriodically(),
                            this.updateButtonName(),
                            this.updateDisabledStates()) : (s = o.returnValue || "",
                            t.value = s,
                            i.style.display = "none",
                            t.style.opacity = "",
                            t.style.overflow = "auto"),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.startRefreshingPeriodically = function(e, t) {
                return void 0 === t && (t = 0),
                o(this, void 0, void 0, (function() {
                    return a(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            this.isPeriodicallyRefreshing && this.stopRefreshingReriodically(),
                            this.isPeriodicallyRefreshing = !0,
                            i.label = 1;
                        case 1:
                            return this.isPeriodicallyRefreshing ? [4, this.refreshOnce(t)] : [3, 4];
                        case 2:
                            return i.sent(),
                            [4, new Promise((function(t) {
                                return setTimeout(t, 1e3 * e)
                            }
                            ))];
                        case 3:
                            return i.sent(),
                            [3, 1];
                        case 4:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.stopRefreshingReriodically = function() {
                return o(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        return this.isPeriodicallyRefreshing = !1,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.loadAndAddSourceSelectOption = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, i, n;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return [4, this.base.parameter.execute("printlog.scan")];
                        case 1:
                            if ((e = r.sent()).error)
                                this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        fallback: "Get source options failed",
                                        key: "get-source-options-failed-modal-title"
                                    }),
                                    message: this.base.localization.localized({
                                        fallback: "An error occured when trying to get the source options",
                                        key: "get-source-options-failed-modal-message"
                                    }),
                                    detailMessage: e.error.stack
                                });
                            else if ((t = e.returnValue || "").length > 0)
                                for (i = JSON.parse(t),
                                n = 0; n < i.length; n++)
                                    this.addSourceSelectOption(i[n]);
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(s.ViewController);
        t.Diagnostic = c
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = n
    }
    , function(e, t, i) {
        var n = i(4);
        "string" == typeof n && (n = [[e.i, n, ""]]);
        var r = {
            insert: "head",
            singleton: !1
        };
        i(6)(n, r);
        n.locals && (e.exports = n.locals)
    }
    , function(e, t, i) {
        (e.exports = i(5)(!1)).push([e.i, 'wbm-diagnostic div.form {\n    max-width: none !important;\n}\n\nwbm-diagnostic input[type="text"] {\n    width: 100px !important;\n}\n\nwbm-diagnostic select {\n    width: 141px !important;\n}\n\nwbm-diagnostic textarea {\n    width: 100%;\n    margin: 0px;\n    padding: 5px;\n    resize: vertical;\n    height: 500px;\n    white-space: pre;\n}\n\nwbm-diagnostic div.section-body {\n    position: relative;\n}\n\nwbm-diagnostic div.indicator {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n}', ""])
    }
    , function(e, t, i) {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var i = function(e, t) {
                        var i = e[1] || ""
                          , n = e[3];
                        if (!n)
                            return i;
                        if (t && "function" == typeof btoa) {
                            var r = (a = n,
                            s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                            c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),
                            "/*# ".concat(c, " */"))
                              , o = n.sources.map((function(e) {
                                return "/*# sourceURL=".concat(n.sourceRoot).concat(e, " */")
                            }
                            ));
                            return [i].concat(o).concat([r]).join("\n")
                        }
                        var a, s, c;
                        return [i].join("\n")
                    }(t, e);
                    return t[2] ? "@media ".concat(t[2], "{").concat(i, "}") : i
                }
                )).join("")
            }
            ,
            t.i = function(e, i) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var n = {}, r = 0; r < this.length; r++) {
                    var o = this[r][0];
                    null != o && (n[o] = !0)
                }
                for (var a = 0; a < e.length; a++) {
                    var s = e[a];
                    null != s[0] && n[s[0]] || (i && !s[2] ? s[2] = i : i && (s[2] = "(".concat(s[2], ") and (").concat(i, ")")),
                    t.push(s))
                }
            }
            ,
            t
        }
    }
    , function(e, t, i) {
        "use strict";
        var n, r = {}, o = function() {
            return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)),
            n
        }, a = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var i = document.querySelector(t);
                    if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement)
                        try {
                            i = i.contentDocument.head
                        } catch (e) {
                            i = null
                        }
                    e[t] = i
                }
                return e[t]
            }
        }();
        function s(e, t) {
            for (var i = [], n = {}, r = 0; r < e.length; r++) {
                var o = e[r]
                  , a = t.base ? o[0] + t.base : o[0]
                  , s = {
                    css: o[1],
                    media: o[2],
                    sourceMap: o[3]
                };
                n[a] ? n[a].parts.push(s) : i.push(n[a] = {
                    id: a,
                    parts: [s]
                })
            }
            return i
        }
        function c(e, t) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i]
                  , o = r[n.id]
                  , a = 0;
                if (o) {
                    for (o.refs++; a < o.parts.length; a++)
                        o.parts[a](n.parts[a]);
                    for (; a < n.parts.length; a++)
                        o.parts.push(v(n.parts[a], t))
                } else {
                    for (var s = []; a < n.parts.length; a++)
                        s.push(v(n.parts[a], t));
                    r[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: s
                    }
                }
            }
        }
        function l(e) {
            var t = document.createElement("style");
            if (void 0 === e.attributes.nonce) {
                var n = i.nc;
                n && (e.attributes.nonce = n)
            }
            if (Object.keys(e.attributes).forEach((function(i) {
                t.setAttribute(i, e.attributes[i])
            }
            )),
            "function" == typeof e.insert)
                e.insert(t);
            else {
                var r = a(e.insert || "head");
                if (!r)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                r.appendChild(t)
            }
            return t
        }
        var u, d = (u = [],
        function(e, t) {
            return u[e] = t,
            u.filter(Boolean).join("\n")
        }
        );
        function f(e, t, i, n) {
            var r = i ? "" : n.css;
            if (e.styleSheet)
                e.styleSheet.cssText = d(t, r);
            else {
                var o = document.createTextNode(r)
                  , a = e.childNodes;
                a[t] && e.removeChild(a[t]),
                a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
            }
        }
        function h(e, t, i) {
            var n = i.css
              , r = i.media
              , o = i.sourceMap;
            if (r && e.setAttribute("media", r),
            o && btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")),
            e.styleSheet)
                e.styleSheet.cssText = n;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        var p = null
          , b = 0;
        function v(e, t) {
            var i, n, r;
            if (t.singleton) {
                var o = b++;
                i = p || (p = l(t)),
                n = f.bind(null, i, o, !1),
                r = f.bind(null, i, o, !0)
            } else
                i = l(t),
                n = h.bind(null, i, t),
                r = function() {
                    !function(e) {
                        if (null === e.parentNode)
                            return !1;
                        e.parentNode.removeChild(e)
                    }(i)
                }
                ;
            return n(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                        return;
                    n(e = t)
                } else
                    r()
            }
        }
        e.exports = function(e, t) {
            (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {},
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = o());
            var i = s(e, t);
            return c(i, t),
            function(e) {
                for (var n = [], o = 0; o < i.length; o++) {
                    var a = i[o]
                      , l = r[a.id];
                    l && (l.refs--,
                    n.push(l))
                }
                e && c(s(e, t), t);
                for (var u = 0; u < n.length; u++) {
                    var d = n[u];
                    if (0 === d.refs) {
                        for (var f = 0; f < d.parts.length; f++)
                            d.parts[f]();
                        delete r[d.id]
                    }
                }
            }
        }
    }
    , function(e, t) {
        e.exports = '<div taid=form-diagnostic class=form> <span class=title taid=form-title>Refresh Options</span> <div class=body> <div class=section> <div class=section-body> <div taid=field-diagnostic-limit class=field> <label taid=field-title>Read only the last</label> <div class="control textfield"> <input type=checkbox taid=field-control checked=checked> <span class=checkbox></span> <input type=text value=20 taid=field-control class=no-validation> </div> </div> <div taid=field-diagnostic-automatic-refresh-interval class=field> <label taid=field-title>Automatic refresh interval (sec)</label> <div class="control textfield"> <input type=checkbox taid=field-control> <span class=checkbox></span> <input type=text value=20 taid=field-control class=no-validation disabled=disabled> </div> </div> <div taid=field-diagnostic-source-selection class=field> <label taid=field-title>Source</label> <div class="control dropdown"> <div class=select-wrapper> <select taid=field-control> <option value=Standard>Standard</option> </select> </div> </div> </div> </div> <div class=actions> <button class=action taid=diagnostic-section-refresh-button>Refresh</button> </div> </div> <div class=section> <div class=section-body> <div class=field> <textarea readonly=readonly></textarea> <div style=display:none class=indicator></div> </div> </div> </div> </div> </div>'
    }
    ])
}
));
//# sourceMappingURL=diagnostic.js.map
