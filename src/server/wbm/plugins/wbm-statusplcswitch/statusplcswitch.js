/*!
 * @wago/wbm-statusplcswitch@1.1.0
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
 *     Shows the plc-switch state in status area
 *
 *
 */
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.statusplcswitch = e() : t.statusplcswitch = e()
}(window, (function() {
    return function(t) {
        var e = {};
        function n(r) {
            if (e[r])
                return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = t,
        n.c = e,
        n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(t, e) {
            if (1 & e && (t = n(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var o in t)
                    n.d(r, o, function(e) {
                        return t[e]
                    }
                    .bind(null, o));
            return r
        }
        ,
        n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return n.d(e, "a", e),
            e
        }
        ,
        n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(t, e, n) {
        "use strict";
        var r = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(t) {
                    try {
                        c(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    try {
                        c(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function c(t) {
                    var e;
                    t.done ? o(t.value) : (e = t.value,
                    e instanceof n ? e : new n((function(t) {
                        t(e)
                    }
                    ))).then(a, s)
                }
                c((r = r.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = e.call(t, a)
                            } catch (t) {
                                i = [6, t],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(1);
        base.plugin.register("wbm-statusplcswitch", (function(t) {
            return r(this, void 0, void 0, (function() {
                return o(this, (function(e) {
                    return [2, {
                        id: "statusplcswitch",
                        priority: 1,
                        controller: new i.PLCSwitchController(t)
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(t, e, n) {
        "use strict";
        var r, o = this && this.__extends || (r = function(t, e) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n])
            }
            )(t, e)
        }
        ,
        function(t, e) {
            function n() {
                this.constructor = t
            }
            r(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(t) {
                    try {
                        c(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    try {
                        c(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function c(t) {
                    var e;
                    t.done ? o(t.value) : (e = t.value,
                    e instanceof n ? e : new n((function(t) {
                        t(e)
                    }
                    ))).then(a, s)
                }
                c((r = r.apply(t, e || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(t, e) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = e.call(t, a)
                            } catch (t) {
                                i = [6, t],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s, c = n(2);
        n(3),
        function(t) {
            t.run = "run",
            t.stop = "stop"
        }(s || (s = {}));
        var u = function(t) {
            function e(e) {
                var n = t.call(this, e) || this;
                return n.view = document.createElement("div"),
                n.view.setAttribute("taid", "status-area-plc-switch"),
                n.view.classList.add("status-area-plc-switch"),
                n
            }
            return o(e, t),
            e.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var t, e, n = this;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return [4, this.base.parameter.read("plc.switch.state")];
                        case 1:
                            return (t = r.sent()[0]).error ? (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "failed-to-read-status-switch-modal-title",
                                    fallback: "Error"
                                }),
                                message: this.base.localization.localized({
                                    key: "failed-to-read-status-switch-modal-message",
                                    fallback: "Failed to read PLC Switch data."
                                })
                            }),
                            [2]) : (this.updateSwitchState("run" == t.value ? s.run : s.stop),
                            e = this,
                            [4, this.base.parameter.observe("plc.switch.state", {
                                kind: "sample",
                                interval: 30
                            }, (function(t, e) {
                                n.updateSwitchState("run" == e["plc.switch.state"] ? s.run : s.stop)
                            }
                            ))]);
                        case 2:
                            return e.observation = r.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.unload = function() {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return this.observation.cancel(),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.updateSwitchState = function(t) {
                t == s.run ? this.view.classList.add("switch-state-toggler") : this.view.classList.remove("switch-state-toggler")
            }
            ,
            e
        }(c.ViewController);
        e.PLCSwitchController = u
    }
    , function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            function t(t) {
                this.base = t
            }
            return t.prototype.onRouteChange = function(t) {}
            ,
            t.prototype.unload = function() {}
            ,
            t
        }();
        e.ViewController = r
    }
    , function(t, e, n) {
        var r = n(4);
        "string" == typeof r && (r = [[t.i, r, ""]]);
        var o = {
            insert: "head",
            singleton: !1
        };
        n(6)(r, o);
        r.locals && (t.exports = r.locals)
    }
    , function(t, e, n) {
        (t.exports = n(5)(!1)).push([t.i, 'wbm-core-status-area div.status-area-plc-switch{position:relative;background:#fefefe;border:1px solid #ccc;border-radius:11.5px;width:53px;min-width:53px;height:23px;font-size:9px}wbm-core-status-area div.status-area-plc-switch:before,wbm-core-status-area div.status-area-plc-switch:after{display:none;position:absolute;width:50%;padding:3px;border:1px solid #ccc;border-radius:11.5px;background:#e4e4e4;text-align:center}wbm-core-status-area div.status-area-plc-switch:before{content:"RUN";left:0}wbm-core-status-area div.status-area-plc-switch:after{display:block;content:"STOP";right:0}wbm-core-status-area div.status-area-plc-switch.switch-state-toggler:before{display:block}wbm-core-status-area div.status-area-plc-switch.switch-state-toggler:after{display:none}', ""])
    }
    , function(t, e, n) {
        "use strict";
        t.exports = function(t) {
            var e = [];
            return e.toString = function() {
                return this.map((function(e) {
                    var n = function(t, e) {
                        var n = t[1] || ""
                          , r = t[3];
                        if (!r)
                            return n;
                        if (e && "function" == typeof btoa) {
                            var o = (a = r,
                            s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                            c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),
                            "/*# ".concat(c, " */"))
                              , i = r.sources.map((function(t) {
                                return "/*# sourceURL=".concat(r.sourceRoot).concat(t, " */")
                            }
                            ));
                            return [n].concat(i).concat([o]).join("\n")
                        }
                        var a, s, c;
                        return [n].join("\n")
                    }(e, t);
                    return e[2] ? "@media ".concat(e[2], "{").concat(n, "}") : n
                }
                )).join("")
            }
            ,
            e.i = function(t, n) {
                "string" == typeof t && (t = [[null, t, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    null != i && (r[i] = !0)
                }
                for (var a = 0; a < t.length; a++) {
                    var s = t[a];
                    null != s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(".concat(s[2], ") and (").concat(n, ")")),
                    e.push(s))
                }
            }
            ,
            e
        }
    }
    , function(t, e, n) {
        "use strict";
        var r, o = {}, i = function() {
            return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)),
            r
        }, a = function() {
            var t = {};
            return function(e) {
                if (void 0 === t[e]) {
                    var n = document.querySelector(e);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                        try {
                            n = n.contentDocument.head
                        } catch (t) {
                            n = null
                        }
                    t[e] = n
                }
                return t[e]
            }
        }();
        function s(t, e) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o]
                  , a = e.base ? i[0] + e.base : i[0]
                  , s = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                };
                r[a] ? r[a].parts.push(s) : n.push(r[a] = {
                    id: a,
                    parts: [s]
                })
            }
            return n
        }
        function c(t, e) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n]
                  , i = o[r.id]
                  , a = 0;
                if (i) {
                    for (i.refs++; a < i.parts.length; a++)
                        i.parts[a](r.parts[a]);
                    for (; a < r.parts.length; a++)
                        i.parts.push(v(r.parts[a], e))
                } else {
                    for (var s = []; a < r.parts.length; a++)
                        s.push(v(r.parts[a], e));
                    o[r.id] = {
                        id: r.id,
                        refs: 1,
                        parts: s
                    }
                }
            }
        }
        function u(t) {
            var e = document.createElement("style");
            if (void 0 === t.attributes.nonce) {
                var r = n.nc;
                r && (t.attributes.nonce = r)
            }
            if (Object.keys(t.attributes).forEach((function(n) {
                e.setAttribute(n, t.attributes[n])
            }
            )),
            "function" == typeof t.insert)
                t.insert(e);
            else {
                var o = a(t.insert || "head");
                if (!o)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                o.appendChild(e)
            }
            return e
        }
        var l, f = (l = [],
        function(t, e) {
            return l[t] = e,
            l.filter(Boolean).join("\n")
        }
        );
        function p(t, e, n, r) {
            var o = n ? "" : r.css;
            if (t.styleSheet)
                t.styleSheet.cssText = f(e, o);
            else {
                var i = document.createTextNode(o)
                  , a = t.childNodes;
                a[e] && t.removeChild(a[e]),
                a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
            }
        }
        function d(t, e, n) {
            var r = n.css
              , o = n.media
              , i = n.sourceMap;
            if (o && t.setAttribute("media", o),
            i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")),
            t.styleSheet)
                t.styleSheet.cssText = r;
            else {
                for (; t.firstChild; )
                    t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(r))
            }
        }
        var h = null
          , b = 0;
        function v(t, e) {
            var n, r, o;
            if (e.singleton) {
                var i = b++;
                n = h || (h = u(e)),
                r = p.bind(null, n, i, !1),
                o = p.bind(null, n, i, !0)
            } else
                n = u(e),
                r = d.bind(null, n, e),
                o = function() {
                    !function(t) {
                        if (null === t.parentNode)
                            return !1;
                        t.parentNode.removeChild(t)
                    }(n)
                }
                ;
            return r(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                        return;
                    r(t = e)
                } else
                    o()
            }
        }
        t.exports = function(t, e) {
            (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {},
            e.singleton || "boolean" == typeof e.singleton || (e.singleton = i());
            var n = s(t, e);
            return c(n, e),
            function(t) {
                for (var r = [], i = 0; i < n.length; i++) {
                    var a = n[i]
                      , u = o[a.id];
                    u && (u.refs--,
                    r.push(u))
                }
                t && c(s(t, e), e);
                for (var l = 0; l < r.length; l++) {
                    var f = r[l];
                    if (0 === f.refs) {
                        for (var p = 0; p < f.parts.length; p++)
                            f.parts[p]();
                        delete o[f.id]
                    }
                }
            }
        }
    }
    ])
}
));
//# sourceMappingURL=statusplcswitch.js.map
