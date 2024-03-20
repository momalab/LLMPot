/*!
 * @wago/wbm-legal-information@1.4.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *     Marius Hellmeier <marius.hellmeier@wago.com>
 *   Johann Dück <johann.dueck@wago.com>
 *   Stefanie Meihöfer <stefanie.meihoefer@wago.com>
 *
 *   Description:
 *     Displays a legal information menu with wago and open source license pages
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["legal-information"] = t() : e["legal-information"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(r, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return r
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 4)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = r
    }
    , function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var n = function(e, t) {
                        var n = e[1] || ""
                          , r = e[3];
                        if (!r)
                            return n;
                        if (t && "function" == typeof btoa) {
                            var o = (a = r,
                            s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                            l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),
                            "/*# ".concat(l, " */"))
                              , i = r.sources.map((function(e) {
                                return "/*# sourceURL=".concat(r.sourceRoot).concat(e, " */")
                            }
                            ));
                            return [n].concat(i).concat([o]).join("\n")
                        }
                        var a, s, l;
                        return [n].join("\n")
                    }(t, e);
                    return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
                }
                )).join("")
            }
            ,
            t.i = function(e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    null != i && (r[i] = !0)
                }
                for (var a = 0; a < e.length; a++) {
                    var s = e[a];
                    null != s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(".concat(s[2], ") and (").concat(n, ")")),
                    t.push(s))
                }
            }
            ,
            t
        }
    }
    , function(e, t, n) {
        "use strict";
        var r, o = {}, i = function() {
            return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)),
            r
        }, a = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var n = document.querySelector(t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                        try {
                            n = n.contentDocument.head
                        } catch (e) {
                            n = null
                        }
                    e[t] = n
                }
                return e[t]
            }
        }();
        function s(e, t) {
            for (var n = [], r = {}, o = 0; o < e.length; o++) {
                var i = e[o]
                  , a = t.base ? i[0] + t.base : i[0]
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
        function l(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n]
                  , i = o[r.id]
                  , a = 0;
                if (i) {
                    for (i.refs++; a < i.parts.length; a++)
                        i.parts[a](r.parts[a]);
                    for (; a < r.parts.length; a++)
                        i.parts.push(v(r.parts[a], t))
                } else {
                    for (var s = []; a < r.parts.length; a++)
                        s.push(v(r.parts[a], t));
                    o[r.id] = {
                        id: r.id,
                        refs: 1,
                        parts: s
                    }
                }
            }
        }
        function c(e) {
            var t = document.createElement("style");
            if (void 0 === e.attributes.nonce) {
                var r = n.nc;
                r && (e.attributes.nonce = r)
            }
            if (Object.keys(e.attributes).forEach((function(n) {
                t.setAttribute(n, e.attributes[n])
            }
            )),
            "function" == typeof e.insert)
                e.insert(t);
            else {
                var o = a(e.insert || "head");
                if (!o)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                o.appendChild(t)
            }
            return t
        }
        var u, f = (u = [],
        function(e, t) {
            return u[e] = t,
            u.filter(Boolean).join("\n")
        }
        );
        function p(e, t, n, r) {
            var o = n ? "" : r.css;
            if (e.styleSheet)
                e.styleSheet.cssText = f(t, o);
            else {
                var i = document.createTextNode(o)
                  , a = e.childNodes;
                a[t] && e.removeChild(a[t]),
                a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }
        function d(e, t, n) {
            var r = n.css
              , o = n.media
              , i = n.sourceMap;
            if (o && e.setAttribute("media", o),
            i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")),
            e.styleSheet)
                e.styleSheet.cssText = r;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(r))
            }
        }
        var h = null
          , b = 0;
        function v(e, t) {
            var n, r, o;
            if (t.singleton) {
                var i = b++;
                n = h || (h = c(t)),
                r = p.bind(null, n, i, !1),
                o = p.bind(null, n, i, !0)
            } else
                n = c(t),
                r = d.bind(null, n, t),
                o = function() {
                    !function(e) {
                        if (null === e.parentNode)
                            return !1;
                        e.parentNode.removeChild(e)
                    }(n)
                }
                ;
            return r(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                        return;
                    r(e = t)
                } else
                    o()
            }
        }
        e.exports = function(e, t) {
            (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {},
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = i());
            var n = s(e, t);
            return l(n, t),
            function(e) {
                for (var r = [], i = 0; i < n.length; i++) {
                    var a = n[i]
                      , c = o[a.id];
                    c && (c.refs--,
                    r.push(c))
                }
                e && l(s(e, t), t);
                for (var u = 0; u < r.length; u++) {
                    var f = r[u];
                    if (0 === f.refs) {
                        for (var p = 0; p < f.parts.length; p++)
                            f.parts[p]();
                        delete o[f.id]
                    }
                }
            }
        }
    }
    , function(e, t, n) {
        var r = n(10);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var o = {
            insert: "head",
            singleton: !1
        };
        n(2)(r, o);
        r.locals && (e.exports = r.locals)
    }
    , function(e, t, n) {
        "use strict";
        var r = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
          , o = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(5)
          , s = n(11)
          , l = n(12)
          , c = n(13)
          , u = n(14);
        base.plugin.register("wbm-legal-information", (function(e) {
            return o(this, void 0, void 0, (function() {
                var t, n, o, f, p, d, h, b, v, y;
                return i(this, (function(i) {
                    return t = e.plugin.getResourceUrl("wbm-legal-information"),
                    n = new c.LicenseLoader(t + "/platform/pfcXXX/licenses.php"),
                    o = {
                        id: "legal-information",
                        title: {
                            fallback: "Legal Information",
                            key: "legal-information-menu-title"
                        },
                        priority: 10
                    },
                    f = e.subframeGenerator.createSubFrame(o.id, e, ["legal-information"]),
                    p = {
                        id: "open-source-licenses",
                        title: {
                            fallback: "Open Source Licenses",
                            key: "open-source-licenses-menu-title"
                        },
                        priority: 100,
                        userRoles: [u.UserRoles.admin, u.UserRoles.user]
                    },
                    d = {
                        title: {
                            default: "Open Source Licenses",
                            localized: "open-source-licenses"
                        },
                        content: [new a.OSSLicenses(e,n)]
                    },
                    f.registerSubMenuItem(r({}, p, {
                        title: e.localization.localized(p.title)
                    }), e.viewGenerator.generate(e, d)),
                    h = {
                        id: "wago-licenses",
                        title: {
                            fallback: "WAGO Licenses",
                            key: "wago-licenses-menu-title"
                        },
                        priority: 150
                    },
                    b = {
                        title: {
                            default: "WAGO Software License Agreement",
                            localized: "wago-software-license-agreement"
                        },
                        content: [new s.WAGOLicenses(e,n)]
                    },
                    f.registerSubMenuItem(r({}, h, {
                        title: e.localization.localized(h.title)
                    }), e.viewGenerator.generate(e, b)),
                    v = {
                        id: "wbm-licenses",
                        title: {
                            fallback: "WBM Licenses",
                            key: "wbm-licenses-menu-title"
                        },
                        priority: 50,
                        userRoles: [u.UserRoles.admin, u.UserRoles.user]
                    },
                    y = {
                        title: {
                            default: "WBM Third Party License Information",
                            localized: "wbm-licenses-page-title"
                        },
                        content: [new l.WBMLicenses(e)]
                    },
                    f.registerSubMenuItem(r({}, v, {
                        title: e.localization.localized(v.title)
                    }), e.viewGenerator.generate(e, y)),
                    [2, r({}, o, {
                        controller: f
                    })]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, n) {
        "use strict";
        var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0)
          , l = n(6);
        n(3);
        var c = function(e) {
            function t(t, n) {
                var r = e.call(this, t) || this;
                return r.view = document.createElement("wbm-legal-information-oss-licenses"),
                r.licenseLoader = n,
                r
            }
            return o(t, e),
            Object.defineProperty(t.prototype, "paragraph", {
                get: function() {
                    var e = this.view.querySelector("p");
                    return e && e.textContent || ""
                },
                set: function(e) {
                    var t = this.view.querySelector("p");
                    e ? (t || ((t = document.createElement("p")).classList.add("license-page-text"),
                    this.view.insertBefore(t, this.view.firstElementChild)),
                    t.textContent = e) : t && t.remove()
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.appendPackage = function(e, t) {
                var n = this.view.querySelector(".license-packages-list");
                n || ((n = document.createElement("div")).classList.add("license-packages-list"),
                this.view.appendChild(n));
                var r = new l.LicenseBox(this.base,t,this.licenseLoader);
                r.title = e,
                n.appendChild(r.view)
            }
            ,
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n, r, o, i;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            this.view.innerHTML = "",
                            a.label = 1;
                        case 1:
                            return a.trys.push([1, 4, , 5]),
                            e = this,
                            [4, this.licenseLoader.getOSSDisclaimer()];
                        case 2:
                            return e.paragraph = a.sent(),
                            [4, this.licenseLoader.getOSSPackageList()];
                        case 3:
                            for (t = a.sent(),
                            n = 0,
                            r = t; n < r.length; n++)
                                o = r[n],
                                this.appendPackage(o.name + " " + o.version, o.id);
                            return [3, 5];
                        case 4:
                            return i = a.sent(),
                            this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "error-while-loading-oss-list-modal-title",
                                    fallback: "Error"
                                }),
                                message: this.base.localization.localized({
                                    key: "error-while-loading-oss-list-modal-message",
                                    fallback: "Failed to load open source package list."
                                }),
                                detailMessage: i.message
                            }),
                            [3, 5];
                        case 5:
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
        t.OSSLicenses = c
    }
    , function(e, t, n) {
        "use strict";
        var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0);
        n(7);
        var l = function(e) {
            function t(t, r, o) {
                var i = e.call(this, t) || this;
                return i.loadingOrLoaded = !1,
                i.packageId = r,
                i.licenseLoader = o,
                i.view = document.createElement("wbm-legal-information-license-box"),
                i.view.innerHTML = n(9),
                i.view.querySelector("h4.title").addEventListener("click", (function() {
                    var e = i.view.querySelector("div.collapsible");
                    e.classList.toggle("collapsed"),
                    e.classList.contains("collapsed") || i.loadingOrLoaded || i.load()
                }
                )),
                i
            }
            return o(t, e),
            Object.defineProperty(t.prototype, "title", {
                get: function() {
                    return this.view.querySelector("h4.title").textContent || ""
                },
                set: function(e) {
                    this.view.querySelector("h4.title").textContent = e
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this.view.querySelector("p.text").textContent || ""
                },
                set: function(e) {
                    this.view.querySelector("p.text").textContent = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            this.loadingOrLoaded = !0,
                            n.label = 1;
                        case 1:
                            return n.trys.push([1, 3, , 4]),
                            e = this,
                            [4, this.licenseLoader.getOSSPackageLicense(this.packageId)];
                        case 2:
                            return e.text = n.sent(),
                            [3, 4];
                        case 3:
                            return t = n.sent(),
                            this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "error-while-loading-oss-license-modal-title",
                                    fallback: "Error"
                                }),
                                message: this.base.localization.localized({
                                    key: "error-while-loading-oss-license-modal-message",
                                    fallback: "Failed to load open source license text resource for package " + this.packageId + "."
                                }),
                                detailMessage: t.message
                            }),
                            [3, 4];
                        case 4:
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
        t.LicenseBox = l
    }
    , function(e, t, n) {
        var r = n(8);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var o = {
            insert: "head",
            singleton: !1
        };
        n(2)(r, o);
        r.locals && (e.exports = r.locals)
    }
    , function(e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, 'div.collapsible{border:1px solid #ccc;margin:17px 0}div.collapsible>h4.title{margin:0;height:34px;cursor:pointer;background:#f0f0f0;position:relative;line-height:34px;padding:0 9px}div.collapsible>h4.title:after{font-family:Material Icons;font-weight:400;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px;content:"expand_more";top:10px;right:9px;position:absolute}div.collapsible>p.text{padding:17px 9px;white-space:pre-wrap;overflow-wrap:break-word}div.collapsible.collapsed>p.text{display:none}div.collapsible.collapsed>h4.title:after{content:"expand_less"}', ""])
    }
    , function(e, t) {
        e.exports = '<div class="collapsible collapsed"> <h4 class=title></h4> <p class=text></p> </div>'
    }
    , function(e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".license-page-text{white-space:pre-wrap}", ""])
    }
    , function(e, t, n) {
        "use strict";
        var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0);
        n(3);
        var l = function(e) {
            function t(t, n) {
                var r = e.call(this, t) || this;
                return r.view = document.createElement("wbm-legal-information-wago-licenses"),
                r.licenseLoader = n,
                r
            }
            return o(t, e),
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            this.view.innerHTML = "",
                            (e = document.createElement("p")).classList.add("license-page-text"),
                            this.view.appendChild(e),
                            r.label = 1;
                        case 1:
                            return r.trys.push([1, 3, , 4]),
                            t = e,
                            [4, this.licenseLoader.getWagoSoftwareLicenseAgreement()];
                        case 2:
                            return t.textContent = r.sent(),
                            [3, 4];
                        case 3:
                            return n = r.sent(),
                            this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "error-while-loading-wago-license-modal-title",
                                    fallback: "Error"
                                }),
                                message: this.base.localization.localized({
                                    key: "error-while-loading-wago-license-modal-message",
                                    fallback: "Failed to load WAGO license text resource."
                                }),
                                detailMessage: n.message
                            }),
                            [3, 4];
                        case 4:
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
        t.WAGOLicenses = l
    }
    , function(e, t, n) {
        "use strict";
        var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.didLoad = !1,
                n.view = document.createElement("wbm-legal-information-wbm-licenses"),
                n
            }
            return o(t, e),
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n, r, o, i, s, l, c = this;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            if (this.didLoad)
                                return [3, 9];
                            this.didLoad = !0,
                            (e = this.view.querySelector("div") || document.createElement("div")).classList.add("license-page-text"),
                            t = ["LICENSES"].concat(this.base.plugin.getLoaded().map((function(e) {
                                return c.base.plugin.getResourceUrl(e.name) + "/LICENSES"
                            }
                            ))),
                            n = "",
                            r = 0,
                            o = t,
                            a.label = 1;
                        case 1:
                            if (!(r < o.length))
                                return [3, 8];
                            i = o[r],
                            a.label = 2;
                        case 2:
                            return a.trys.push([2, 6, , 7]),
                            [4, fetch(i)];
                        case 3:
                            return (s = a.sent()).ok ? (l = n,
                            [4, s.text()]) : [3, 5];
                        case 4:
                            n = l + a.sent(),
                            a.label = 5;
                        case 5:
                            return [3, 7];
                        case 6:
                            return a.sent(),
                            [3, 7];
                        case 7:
                            return r++,
                            [3, 1];
                        case 8:
                            e.textContent = n,
                            this.view.appendChild(e),
                            a.label = 9;
                        case 9:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(n(0).ViewController);
        t.WBMLicenses = s
    }
    , function(e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
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
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e) {
                this.phpResourceUrl = e
            }
            return e.prototype.loadData = function() {
                return r(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return this.loadingData ? [2, this.loadingData] : (this.loadingData = fetch(this.phpResourceUrl, {
                            method: "POST"
                        }).then((function(e) {
                            return e.json()
                        }
                        )),
                        [2, this.loadingData])
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.loadOSSPackageLicense = function(e) {
                return r(this, void 0, void 0, (function() {
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return [4, fetch(this.phpResourceUrl, {
                                method: "POST",
                                body: JSON.stringify({
                                    package: e
                                })
                            })];
                        case 1:
                            return [4, t.sent().json()];
                        case 2:
                            return [2, t.sent().license]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getWagoSoftwareLicenseAgreement = function() {
                return r(this, void 0, void 0, (function() {
                    var e;
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.data ? [3, 2] : (e = this,
                            [4, this.loadData()]);
                        case 1:
                            e.data = t.sent(),
                            t.label = 2;
                        case 2:
                            return [2, this.data.wagoSoftwareLicenseAgreement]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getOSSDisclaimer = function() {
                return r(this, void 0, void 0, (function() {
                    var e;
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.data ? [3, 2] : (e = this,
                            [4, this.loadData()]);
                        case 1:
                            e.data = t.sent(),
                            t.label = 2;
                        case 2:
                            return [2, this.data.ossDisclaimer]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getOSSPackageList = function() {
                return r(this, void 0, void 0, (function() {
                    var e;
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.data ? [3, 2] : (e = this,
                            [4, this.loadData()]);
                        case 1:
                            e.data = t.sent(),
                            t.label = 2;
                        case 2:
                            return [2, this.data.ossPackages.map((function(e) {
                                return {
                                    id: e.id,
                                    name: e.name,
                                    version: e.version
                                }
                            }
                            ))]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getOSSPackageLicense = function(e) {
                return r(this, void 0, void 0, (function() {
                    var t, n, r;
                    return o(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return this.data ? [3, 2] : (t = this,
                            [4, this.loadData()]);
                        case 1:
                            t.data = o.sent(),
                            o.label = 2;
                        case 2:
                            return (n = this.data.ossPackages.filter((function(t) {
                                return t.id === e
                            }
                            ))[0]) ? n.license ? [3, 4] : (r = n,
                            [4, this.loadOSSPackageLicense(e)]) : [3, 5];
                        case 3:
                            r.license = o.sent(),
                            o.label = 4;
                        case 4:
                            return [2, n.license];
                        case 5:
                            throw new Error("unknown package")
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e
        }();
        t.LicenseLoader = i
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.admin = "admin",
            e.user = "user",
            e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }
    ])
}
));
//# sourceMappingURL=legal-information.js.map
