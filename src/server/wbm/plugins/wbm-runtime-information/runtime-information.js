/*!
 * wbm-runtime-information@1.0.0
 *
 *   Copyright © 2019 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *
 *
 *   Description:
 *     CODESYS and e!RUNTIME information.
 *
 *
 */
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports["runtime-information"] = e() : t["runtime-information"] = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e),
            o.l = !0,
            o.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }
        ,
        e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return e.d(n, "a", n),
            n
        }
        ,
        e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        e.p = "",
        e(e.s = 0)
    }([function(t, e, n) {
        "use strict";
        function r(t) {
            return o(this, void 0, void 0, function() {
                var e;
                return i(this, function(r) {
                    return e = n(9),
                    e.content[1].sections.push(new a.WebVisu(t)),
                    [2, {
                        id: "runtime-information",
                        title: {
                            fallback: "PLC Runtime",
                            key: "plc-runtime-information-menu-title"
                        },
                        priority: 17,
                        controller: t.viewGenerator.generate(t, e)
                    }]
                })
            })
        }
        var o = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))(function(o, i) {
                function a(t) {
                    try {
                        s(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function u(t) {
                    try {
                        s(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new n(function(e) {
                        e(t.value)
                    }
                    ).then(a, u)
                }
                s((r = r.apply(t, e || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(t, e) {
            function n(t) {
                return function(e) {
                    return r([t, e])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = e.call(t, s)
                    } catch (t) {
                        n = [6, t],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, u, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return u = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (u[Symbol.iterator] = function() {
                return this
            }
            ),
            u
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(1);
        base.plugin.register("wbm-runtime-information", r)
    }
    , function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function() {
            var t = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n])
            }
            ;
            return function(e, n) {
                function r() {
                    this.constructor = e
                }
                t(e, n),
                e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                new r)
            }
        }()
          , o = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))(function(o, i) {
                function a(t) {
                    try {
                        s(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function u(t) {
                    try {
                        s(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new n(function(e) {
                        e(t.value)
                    }
                    ).then(a, u)
                }
                s((r = r.apply(t, e || [])).next())
            }
            )
        }
          , i = this && this.__generator || function(t, e) {
            function n(t) {
                return function(e) {
                    return r([t, e])
                }
            }
            function r(n) {
                if (o)
                    throw new TypeError("Generator is already executing.");
                for (; s; )
                    try {
                        if (o = 1,
                        i && (a = 2 & n[0] ? i.return : n[0] ? i.throw || ((a = i.return) && a.call(i),
                        0) : i.next) && !(a = a.call(i, n[1])).done)
                            return a;
                        switch (i = 0,
                        a && (n = [2 & n[0], a.value]),
                        n[0]) {
                        case 0:
                        case 1:
                            a = n;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: n[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            i = n[1],
                            n = [0];
                            continue;
                        case 7:
                            n = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (a = s.trys,
                            !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
                                s.label = n[1];
                                break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                                s.label = a[1],
                                a = n;
                                break
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2],
                                s.ops.push(n);
                                break
                            }
                            a[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        n = e.call(t, s)
                    } catch (t) {
                        n = [6, t],
                        i = 0
                    } finally {
                        o = a = 0
                    }
                if (5 & n[0])
                    throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                }
            }
            var o, i, a, u, s = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return u = {
                next: n(0),
                throw: n(1),
                return: n(2)
            },
            "function" == typeof Symbol && (u[Symbol.iterator] = function() {
                return this
            }
            ),
            u
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(2);
        n(3);
        var u = n(8)
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.view = document.createElement("wbm-runtime-information-webvisu"),
                e
            }
            return r(e, t),
            e.prototype.load = function() {
                return o(this, void 0, void 0, function() {
                    var t;
                    return i(this, function(e) {
                        return t = this.base.browser.browserType === u.BrowserType.eDisplay ? "" : 'target="_blank"',
                        this.view.innerHTML = "<a " + t + ' href="/webvisu/webvisu.htm">Open WebVisu</a>',
                        [2]
                    })
                })
            }
            ,
            e
        }(a.ViewController);
        e.WebVisu = s
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
            hmr: !0
        };
        o.transform = void 0,
        n(6)(r, o),
        r.locals && (t.exports = r.locals)
    }
    , function(t, e, n) {
        e = t.exports = n(5)(void 0),
        e.push([t.i, "wbm-runtime-information-webvisu a{margin:9px;display:block}", ""])
    }
    , function(t, e) {
        function n(t, e) {
            var n = t[1] || ""
              , o = t[3];
            if (!o)
                return n;
            if (e && "function" == typeof btoa) {
                var i = r(o);
                return [n].concat(o.sources.map(function(t) {
                    return "/*# sourceURL=" + o.sourceRoot + t + " */"
                })).concat([i]).join("\n")
            }
            return [n].join("\n")
        }
        function r(t) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t)))) + " */"
        }
        t.exports = function(t) {
            var e = [];
            return e.toString = function() {
                return this.map(function(e) {
                    var r = n(e, t);
                    return e[2] ? "@media " + e[2] + "{" + r + "}" : r
                }).join("")
            }
            ,
            e.i = function(t, n) {
                "string" == typeof t && (t = [[null, t, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < t.length; o++) {
                    var a = t[o];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"),
                    e.push(a))
                }
            }
            ,
            e
        }
    }
    , function(t, e, n) {
        function r(t, e) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n]
                  , o = h[r.id];
                if (o) {
                    o.refs++;
                    for (var i = 0; i < o.parts.length; i++)
                        o.parts[i](r.parts[i]);
                    for (; i < r.parts.length; i++)
                        o.parts.push(l(r.parts[i], e))
                } else {
                    for (var a = [], i = 0; i < r.parts.length; i++)
                        a.push(l(r.parts[i], e));
                    h[r.id] = {
                        id: r.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }
        function o(t, e) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o]
                  , a = e.base ? i[0] + e.base : i[0]
                  , u = i[1]
                  , s = i[2]
                  , c = i[3]
                  , l = {
                    css: u,
                    media: s,
                    sourceMap: c
                };
                r[a] ? r[a].parts.push(l) : n.push(r[a] = {
                    id: a,
                    parts: [l]
                })
            }
            return n
        }
        function i(t, e) {
            var n = b(t.insertInto);
            if (!n)
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r = w[w.length - 1];
            if ("top" === t.insertAt)
                r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild),
                w.push(e);
            else if ("bottom" === t.insertAt)
                n.appendChild(e);
            else {
                if ("object" != typeof t.insertAt || !t.insertAt.before)
                    throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var o = b(t.insertInto + " " + t.insertAt.before);
                n.insertBefore(e, o)
            }
        }
        function a(t) {
            if (null === t.parentNode)
                return !1;
            t.parentNode.removeChild(t);
            var e = w.indexOf(t);
            e >= 0 && w.splice(e, 1)
        }
        function u(t) {
            var e = document.createElement("style");
            return t.attrs.type = "text/css",
            c(e, t.attrs),
            i(t, e),
            e
        }
        function s(t) {
            var e = document.createElement("link");
            return t.attrs.type = "text/css",
            t.attrs.rel = "stylesheet",
            c(e, t.attrs),
            i(t, e),
            e
        }
        function c(t, e) {
            Object.keys(e).forEach(function(n) {
                t.setAttribute(n, e[n])
            })
        }
        function l(t, e) {
            var n, r, o, i;
            if (e.transform && t.css) {
                if (!(i = e.transform(t.css)))
                    return function() {}
                    ;
                t.css = i
            }
            if (e.singleton) {
                var c = m++;
                n = y || (y = u(e)),
                r = f.bind(null, n, c, !1),
                o = f.bind(null, n, c, !0)
            } else
                t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = s(e),
                r = d.bind(null, n, e),
                o = function() {
                    a(n),
                    n.href && URL.revokeObjectURL(n.href)
                }
                ) : (n = u(e),
                r = p.bind(null, n),
                o = function() {
                    a(n)
                }
                );
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
        function f(t, e, n, r) {
            var o = n ? "" : r.css;
            if (t.styleSheet)
                t.styleSheet.cssText = x(e, o);
            else {
                var i = document.createTextNode(o)
                  , a = t.childNodes;
                a[e] && t.removeChild(a[e]),
                a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
            }
        }
        function p(t, e) {
            var n = e.css
              , r = e.media;
            if (r && t.setAttribute("media", r),
            t.styleSheet)
                t.styleSheet.cssText = n;
            else {
                for (; t.firstChild; )
                    t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }
        function d(t, e, n) {
            var r = n.css
              , o = n.sourceMap
              , i = void 0 === e.convertToAbsoluteUrls && o;
            (e.convertToAbsoluteUrls || i) && (r = g(r)),
            o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
            var a = new Blob([r],{
                type: "text/css"
            })
              , u = t.href;
            t.href = URL.createObjectURL(a),
            u && URL.revokeObjectURL(u)
        }
        var h = {}
          , v = function(t) {
            var e;
            return function() {
                return void 0 === e && (e = t.apply(this, arguments)),
                e
            }
        }(function() {
            return window && document && document.all && !window.atob
        })
          , b = function(t) {
            var e = {};
            return function(n) {
                if (void 0 === e[n]) {
                    var r = t.call(this, n);
                    if (r instanceof window.HTMLIFrameElement)
                        try {
                            r = r.contentDocument.head
                        } catch (t) {
                            r = null
                        }
                    e[n] = r
                }
                return e[n]
            }
        }(function(t) {
            return document.querySelector(t)
        })
          , y = null
          , m = 0
          , w = []
          , g = n(7);
        t.exports = function(t, e) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
                throw new Error("The style-loader cannot be used in a non-browser environment");
            e = e || {},
            e.attrs = "object" == typeof e.attrs ? e.attrs : {},
            e.singleton || (e.singleton = v()),
            e.insertInto || (e.insertInto = "head"),
            e.insertAt || (e.insertAt = "bottom");
            var n = o(t, e);
            return r(n, e),
            function(t) {
                for (var i = [], a = 0; a < n.length; a++) {
                    var u = n[a]
                      , s = h[u.id];
                    s.refs--,
                    i.push(s)
                }
                t && r(o(t, e), e);
                for (var a = 0; a < i.length; a++) {
                    var s = i[a];
                    if (0 === s.refs) {
                        for (var c = 0; c < s.parts.length; c++)
                            s.parts[c]();
                        delete h[s.id]
                    }
                }
            }
        }
        ;
        var x = function() {
            var t = [];
            return function(e, n) {
                return t[e] = n,
                t.filter(Boolean).join("\n")
            }
        }()
    }
    , function(t, e) {
        t.exports = function(t) {
            var e = "undefined" != typeof window && window.location;
            if (!e)
                throw new Error("fixUrls requires window.location");
            if (!t || "string" != typeof t)
                return t;
            var n = e.protocol + "//" + e.host
              , r = n + e.pathname.replace(/\/[^\/]*$/, "/");
            return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(t, e) {
                var o = e.trim().replace(/^"(.*)"$/, function(t, e) {
                    return e
                }).replace(/^'(.*)'$/, function(t, e) {
                    return e
                });
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))
                    return t;
                var i;
                return i = 0 === o.indexOf("//") ? o : 0 === o.indexOf("/") ? n + o : r + o.replace(/^\.\//, ""),
                "url(" + JSON.stringify(i) + ")"
            })
        }
    }
    , function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        function(t) {
            t.desktop = "desktop",
            t.touch = "touch",
            t.eDisplay = "eDisplay"
        }(e.BrowserType || (e.BrowserType = {}))
    }
    , function(t, e) {
        t.exports = {
            title: {
                default: "PLC Runtime Information",
                localized: "unique-translation-key-for-the-page-title"
            },
            content: [{
                title: {
                    default: "Runtime",
                    localized: "runtime-information-runtime-form-title"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Version",
                            localized: "runtime-information-runtime-version-field-title"
                        },
                        parameter: "codesyscontrol.version",
                        options: {
                            readonly: !0
                        },
                        control: {
                            type: "textfield",
                            argument: "${codesyscontrol.version}"
                        }
                    }]
                }]
            }, {
                title: {
                    default: "WebVisu",
                    localized: "runtime-information-webvisu-form-title"
                },
                sections: []
            }]
        }
    }
    ])
});
//# sourceMappingURL=runtime-information.js.map
