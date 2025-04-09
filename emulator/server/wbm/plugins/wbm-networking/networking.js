/*!
 * @wago/wbm-networking@1.14.3
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
 *     Network Configuration
 *
 *
 */
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.networking = e() : t.networking = e()
}(window, (function() {
    return function(t) {
        var e = {};
        function i(n) {
            if (e[n])
                return e[n].exports;
            var o = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(o.exports, o, o.exports, i),
            o.l = !0,
            o.exports
        }
        return i.m = t,
        i.c = e,
        i.d = function(t, e, n) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        i.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(t, e) {
            if (1 & e && (t = i(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (i.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var o in t)
                    i.d(n, o, function(e) {
                        return t[e]
                    }
                    .bind(null, o));
            return n
        }
        ,
        i.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return i.d(e, "a", e),
            e
        }
        ,
        i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        i.p = "",
        i(i.s = 4)
    }([function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        function(t) {
            t.admin = "admin",
            t.user = "user",
            t.guest = "guest"
        }(e.UserRoles || (e.UserRoles = {}))
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        function r(t, e) {
            for (var i = []; t.length; )
                i.push(t.splice(0, e));
            return i
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.capitalizeFirstLetter = function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }
        ,
        e.getParameterValues = function(t, e) {
            return n(this, void 0, void 0, (function() {
                var i;
                return o(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, t.parameter.read(e)];
                    case 1:
                        return [2, r((i = n.sent()).map((function(t) {
                            return t.value
                        }
                        )), i.length / e.length)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.chunk = r
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t) {
                this.base = t
            }
            return t.prototype.onRouteChange = function(t) {}
            ,
            t.prototype.unload = function() {}
            ,
            t
        }();
        e.ViewController = n
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        function(t) {
            t.primary = "primary",
            t.secondary = "secondary"
        }(e.DialogButtonType || (e.DialogButtonType = {})),
        function(t) {
            t.default = "default",
            t.action = "action"
        }(e.DialogButtonStyle || (e.DialogButtonStyle = {})),
        function(t) {
            t.okay = "okay",
            t.cancel = "cancel"
        }(e.DialogButton || (e.DialogButton = {})),
        function(t) {
            t.default = "default",
            t.info = "info",
            t.warning = "warning",
            t.error = "error"
        }(e.DialogStyle || (e.DialogStyle = {}))
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(5)
          , a = i(0);
        base.plugin.register("wbm-networking", (function(t) {
            return n(this, void 0, void 0, (function() {
                var e, i, n, l;
                return o(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return e = "configuration",
                        i = t.subframeGenerator.createSubFrame(e, t, ["config-area"]),
                        n = !1,
                        [4, t.parameter.read("features.*.name").then((function(t) {
                            for (var e = 0; e < t.length; e++) {
                                "bootp" === t[e].value && (n = !0)
                            }
                        }
                        ))];
                    case 1:
                        return o.sent(),
                        [4, r.initializeNetworking(t, n)];
                    case 2:
                        return l = o.sent(),
                        i.registerSubMenuItem(l.item, l.controller),
                        [2, {
                            id: e,
                            title: {
                                fallback: "Configuration",
                                key: "configuration-title"
                            },
                            description: {
                                fallback: "A plugin for all Configuration Sites",
                                key: "configuration-description"
                            },
                            priority: 900,
                            userRoles: [a.UserRoles.admin, a.UserRoles.user],
                            controller: i
                        }]
                    }
                }
                ))
            }
            ))
        }
        ))
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(0)
          , a = i(6)
          , l = i(9)
          , s = i(20)
          , c = i(22);
        e.initializeNetworking = function(t, e) {
            return n(this, void 0, void 0, (function() {
                var i, n, d, u, p, f;
                return o(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return i = {
                            id: "networking",
                            title: "Networking",
                            priority: 950,
                            userRoles: [r.UserRoles.admin, r.UserRoles.user]
                        },
                        n = t.subframeGenerator.createSubFrame(i.id, t, []),
                        d = a.initializeTcpIp(t, e),
                        n.registerSubMenuItem(d.item, d.controller),
                        [4, l.initializeEthernet(t)];
                    case 1:
                        return u = o.sent(),
                        n.registerSubMenuItem(u.item, u.controller),
                        p = s.initializeHostDomain(t),
                        n.registerSubMenuItem(p.item, p.controller),
                        f = c.initializeRouting(t),
                        n.registerSubMenuItem(f.item, f.controller),
                        [2, {
                            item: i,
                            controller: n
                        }]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(0)
          , o = i(7);
        e.initializeTcpIp = function(t, e) {
            var r = i(8);
            if (!e) {
                var a = function t(e, i) {
                    var n;
                    return Object.keys(e).some((function(o) {
                        return o === i ? (n = e[o],
                        !0) : !(!e[o] || "object" != typeof e[o]) && void 0 !== (n = t(e[o], i))
                    }
                    )),
                    n
                }(r.content[0].sections, "items");
                if (Array.isArray(a)) {
                    var l = function t(e, i, n) {
                        var o = [];
                        if (!e)
                            return o;
                        if (e instanceof Array) {
                            for (var r in e)
                                o = o.concat(t(e[r], i, n));
                            return o
                        }
                        e[i] === n && o.push(e);
                        if ("object" == typeof e && null !== e) {
                            var a = Object.keys(e);
                            if (a.length > 0)
                                for (var l = 0; l < a.length; l++)
                                    o = o.concat(t(e[a[l]], i, n))
                        }
                        return o
                    }(a, "value", "bootp");
                    l.forEach((function(t) {
                        var e = a.indexOf(l[0], 0);
                        e > -1 && a.splice(e, 1)
                    }
                    ))
                }
            }
            return {
                item: {
                    id: "tcpip",
                    title: t.localization.localized({
                        fallback: "TCP/IP Configuration",
                        key: "title-tcpip-configuration"
                    }),
                    tooltip: t.localization.localized({
                        fallback: "Configuration of TCP/IP parameter",
                        key: "description-tcpip-configuration"
                    }),
                    priority: 950,
                    userRoles: [n.UserRoles.admin, n.UserRoles.user]
                },
                controller: new o.TCPIPConfig(t,r)
            }
        }
    }
    , function(t, e, i) {
        "use strict";
        var n, o = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        ,
        function(t, e) {
            function i() {
                this.constructor = t
            }
            n(t, e),
            t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
        }
        ), r = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var l = i(2)
          , s = i(3)
          , c = function(t) {
            function e(e, i) {
                var n = t.call(this, e) || this;
                return n.realoading = !1,
                n.changeDisplayed = !1,
                n.child = e.viewGenerator.generate(e, i),
                n.view = n.child.view,
                n
            }
            return o(e, t),
            e.prototype.load = function() {
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return [4, this.child.load()];
                        case 1:
                            return t.sent(),
                            [4, this.observeIPAddressToReloadOnChange()];
                        case 2:
                            return t.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.unload = function() {
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return this.sourceObserver.cancel(),
                        this.ipObserver.cancel(),
                        this.gatewayObserver.cancel(),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.displayDialogOnChange = function(t, e, i) {
                for (var n = [], o = 3; o < arguments.length; o++)
                    n[o - 3] = arguments[o];
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return i && e !== i ? n && n.indexOf(e) >= 0 ? [2] : !1 !== this.changeDisplayed ? [3, 2] : (this.changeDisplayed = !0,
                            [4, t.modalPresenter.showWarningDialog(t, {
                                title: t.localization.localized({
                                    fallback: "The interface configuration has changed",
                                    key: "ip-configuration-changed-modal-title"
                                }),
                                message: t.localization.localized({
                                    fallback: "Connection may be lost. If necessary, reload page with the correct address",
                                    key: "ip-configuration-changed-modal-message"
                                }),
                                primaryButton: {
                                    title: t.localization.localized({
                                        fallback: "OK",
                                        key: "ip-configuration-changed-ok-button-title"
                                    }),
                                    style: s.DialogButtonStyle.action
                                }
                            })]) : [2];
                        case 1:
                            o.sent(),
                            this.changeDisplayed = !1,
                            o.label = 2;
                        case 2:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.realoadView = function() {
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return !1 !== this.realoading ? [3, 2] : (this.realoading = !0,
                            [4, this.child.load()]);
                        case 1:
                            t.sent(),
                            this.realoading = !1,
                            t.label = 2;
                        case 2:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.observeIPAddressToReloadOnChange = function() {
                return r(this, void 0, void 0, (function() {
                    var t, e, i, n, o = this;
                    return a(this, (function(l) {
                        switch (l.label) {
                        case 0:
                            return t = {
                                kind: "change",
                                maxHistoryLength: 0,
                                throttleTime: 0
                            },
                            e = this,
                            [4, this.base.parameter.observe("networking.tcpip.interfaces.*.source", t, (function(t, e, i) {
                                return r(o, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.displayDialogOnChange(this.base, e, i),
                                        this.realoadView(),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 1:
                            return e.sourceObserver = l.sent(),
                            i = this,
                            [4, this.base.parameter.observe("networking.tcpip.interfaces.*.static.ipaddress", t, (function(t, e, i) {
                                return r(o, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.displayDialogOnChange(this.base, e, i, "0.0.0.0"),
                                        this.realoadView(),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 2:
                            return i.ipObserver = l.sent(),
                            n = this,
                            [4, this.base.parameter.observe("networking.tcpip.interfaces.*.static.gateway", t, (function(t, e, i) {
                                return r(o, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.realoadView(),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 3:
                            return n.gatewayObserver = l.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e
        }(l.ViewController);
        e.TCPIPConfig = c
    }
    , function(t) {
        t.exports = JSON.parse('{"title":{"default":"TCP/IP Configuration","localized":"page-title-tcpip-configuration"},"note":{"default":"Changes will take effect immediately.\\nNote: connection may be lost while changing interface configuration.","localized":"page-note-tcpip-configuration"},"content":[{"title":{"default":"TCP/IP Configuration","localized":"title-tcpip-configuration"},"note":{"default":"If the IP source of a network interface is \'external\', it is likely that an application active in the system has adopted the IP configuration for this interface. Changing the source would probably affect the functionality of this application.","localized":"ip-source-external-note"},"sections":[{"repeat":"networking.tcpip.interfaces.*.label","title":{"default":"Network Details ${networking.tcpip.interfaces.*.label} (${networking.tcpip.interfaces.*.name})","localized":"title-tcpip-configuration-interface"},"fields":[{"title":{"default":"Current IP Address","localized":"ip-address-current-field-label"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.current.ipaddress"},{"title":{"default":"Current Subnet Mask","localized":"subnetmask-current-field-label"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.current.subnetmask"},{"title":{"default":"Current Default Gateway","localized":"gateway-current-field-label"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.current.gateway"},{"title":{"default":"IP Source","localized":"ip-source-field-label"},"control":{"type":"dropdown","items":[{"title":{"default":"Static IP","localized":"dropdown-option-tcpip-source-static"},"value":"static"},{"title":{"default":"DHCP","localized":"dropdown-option-tcpip-source-dhcp"},"value":"dhcp"},{"title":{"default":"BootP","localized":"dropdown-option-tcpip-source-bootp"},"value":"bootp"},{"title":{"default":"None","localized":"dropdown-option-tcpip-source-none"},"value":"none"}]},"parameter":"networking.tcpip.interfaces.*.source"},{"title":{"default":"Static IP Address","localized":"ip-address-field-label"},"control":{"type":"textfield"},"parameter":"networking.tcpip.interfaces.*.static.ipaddress"},{"title":{"default":"Subnet Mask","localized":"subnet-mask-field-label"},"control":{"type":"textfield"},"parameter":"networking.tcpip.interfaces.*.static.subnetmask"},{"title":{"default":"Default Gateway","localized":"default-gateway-field-label"},"control":{"type":"textfield"},"parameter":"networking.tcpip.interfaces.*.static.gateway"}]}]},{"title":{"default":"DNS Server","localized":"dns-server-form-title"},"sections":[{"fields":[{"title":{"default":"New Server IP","localized":"new-dns-server-ip"},"control":{"type":"textfield"},"argument":"ipaddress"}],"action":{"method":"networking.tcpip.creatednsserver","title":{"default":"Add","localized":"create-new-dns-server-button-title"},"type":"add"}},{"title":{"default":"Manually Assigned","localized":"dns-server-ip-address-title"},"fields":[{"title":{"default":"#${networking.tcpip.dnsserver.*.index}","localized":"dns-server-ip-address-field-label"},"parameter":"networking.tcpip.dnsserver.*.ipaddress","control":{"type":"textfield"},"repeat":"networking.tcpip.dnsserver.*.index","delete":"networking.tcpip.dnsserver.*.delete","add":"networking.tcpip.creatednsserver","empty":{"default":"(no DNS Serves configured)","key":"dns-server-no-servers-configured"}}]},{"title":{"default":"Assigned by DHCP:","localized":"dhcp-dns-server-ip-address-field-label"},"fields":[{"repeat":"networking.tcpip.dhcp.dnsserver.*.index","title":{"default":"#${networking.tcpip.dhcp.dnsserver.*.index}","localized":"dhcp-dns-server-ip-address-field-label"},"parameter":"networking.tcpip.dhcp.dnsserver.*.ipaddress","control":{"type":"textfield"},"empty":{"default":"(no DNS Serves assigned by DHCP)","key":"dns-server-no-servers-configured"}}]}]},{"hidden":"networking.tcpip.dipswitch.mode is hw-not-available","title":{"default":"DIP Switch","localized":"dip-switch-title"},"sections":[{"note":{"default":"As soon as the DIP switch is activated or has a value not equal to 0, the IP configuration of the first network interface br0 is overwritten accordingly.\\n\\nThere are three modes, depending on the set value:\\nMode 1: Off (value 0)\\nMode 2: Static (value 1-254)\\nMode 3: DHCP (value 255)\\n\\nThe parameters \'IP address base\' and \'Network mask\', which can be configured below, are used in \'static\' mode. The IP address is calculated from the first three octets of the IP address base and the DIP switch value as the fourth octet. The last octet of the IP address base is therefore irrelevant and should be 0.","localized":"section-note-dip-configuration"},"fields":[{"title":{"default":"Assignment Mode","localized":"dip-switch-ip-mode"},"parameter":"networking.tcpip.dipswitch.mode","control":{"type":"textfield"}},{"title":{"default":"Current IP Address","localized":"dip-switch-ip-address"},"parameter":"networking.tcpip.interfaces.0.current.ipaddress","options":{"readonly":true},"control":{"type":"textfield"}},{"title":{"default":"IP Address Base","localized":"dip-switch-base-ip-address"},"parameter":"networking.tcpip.dipswitch.address","control":{"type":"textfield","validation":{"pattern":"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(0)$","hint":{"default":"Expect dotted decimal notation with last octet 0","localized":"ip-address-base-validation-hint"}}}},{"title":{"default":"Subnet Mask","localized":"dip-switch-ip-netmask"},"parameter":"networking.tcpip.dipswitch.netmask","control":{"type":"textfield","validation":{"pattern":"^(((255\\\\.){3}(255|254|252|248|240|224|192|128|0+))|((255\\\\.){2}(255|254|252|248|240|224|192|128|0+)\\\\.0)|((255\\\\.)(255|254|252|248|240|224|192|128|0+)(\\\\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\\\\.0+){3}))$","hint":{"default":"Expect dotted decimal notation","localized":"ip-address-base-validation-hint"}}}}]}]}]}')
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(0)
          , a = i(10)
          , l = i(1);
        function s(t) {
            for (var e = [], i = 1; i < arguments.length; i++)
                e[i - 1] = arguments[i];
            return t ? e : []
        }
        function c(t) {
            return n(this, void 0, void 0, (function() {
                var e, i;
                return o(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return e = {
                            title: {
                                default: "Ethernet Interface Configuration",
                                localized: "ethernet-interface-configuration"
                            },
                            sections: []
                        },
                        [4, d(t)];
                    case 1:
                        return i = n.sent(),
                        e.sections = i.map((function(t, e) {
                            return {
                                title: {
                                    default: "Interface " + t.label,
                                    localized: "ethernet-interface-label"
                                },
                                fields: [{
                                    title: {
                                        default: "Enabled",
                                        localized: "ethernet-interface-enabled-label"
                                    },
                                    parameter: "networking.ethernet.interfaces." + e + ".state",
                                    control: {
                                        type: "checkbox"
                                    }
                                }, {
                                    title: {
                                        default: "Speed/Duplex",
                                        localized: "ethernet-interface-speed-duplex-label"
                                    },
                                    parameter: "networking.ethernet.interfaces." + e + ".speedduplex",
                                    control: {
                                        type: "dropdown",
                                        items: s(t.autonegSupported, {
                                            title: {
                                                default: "Auto Negotiation",
                                                localized: "ethernet-interface-link-mode-autonegotiation-label"
                                            },
                                            value: "autonegotiation"
                                        }).concat(t.supportedLinkModes.map((function(t) {
                                            return {
                                                title: {
                                                    default: "" + t,
                                                    localized: "ethernet-interface-link-mode-" + t + "-label"
                                                },
                                                value: "" + t
                                            }
                                        }
                                        )))
                                    }
                                }]
                            }
                        }
                        )),
                        [2, e]
                    }
                }
                ))
            }
            ))
        }
        function d(t) {
            return n(this, void 0, void 0, (function() {
                var e, i, n, r, a, s, c;
                return o(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return [4, t.parameter.read(["networking.ethernet.interfaces.*.label", "networking.ethernet.interfaces.*.state", "networking.ethernet.interfaces.*.speedduplex", "networking.ethernet.interfaces.*.autonegsupported", "networking.ethernet.interfaces.*.supportedlinkmodes"])];
                    case 1:
                        return e = o.sent(),
                        i = l.chunk(e.map((function(t) {
                            return t.value
                        }
                        )), e.length / 5),
                        n = i[0],
                        r = i[1],
                        a = i[2],
                        s = i[3],
                        c = i[4],
                        [2, n.map((function(t, e) {
                            return {
                                label: t,
                                state: r[e],
                                linkMode: a[e],
                                autonegSupported: s[e],
                                supportedLinkModes: c[e]
                            }
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        i(15),
        e.initializeEthernet = function(t) {
            return n(this, void 0, void 0, (function() {
                var e, l, s, d, u;
                return o(this, (function(p) {
                    switch (p.label) {
                    case 0:
                        return e = i(19),
                        l = {
                            id: "ethernet",
                            title: t.localization.localized({
                                fallback: "Ethernet Configuration",
                                key: "title-ethernet-configuration"
                            }),
                            tooltip: t.localization.localized({
                                fallback: "Configuration of Ethernet Interfaces",
                                key: "description-ethernet-configuration"
                            }),
                            priority: 900,
                            userRoles: [r.UserRoles.admin, r.UserRoles.user]
                        },
                        s = new a.BridgeConfigurationController(t),
                        e.content.unshift(s),
                        [4, c(t)];
                    case 1:
                        return d = p.sent(),
                        e.content.push(d),
                        u = t.viewGenerator.generate(t, e),
                        function(t, e) {
                            var i, r = this;
                            t.parameter.observe("networking.ethernet.switch.mode", {
                                kind: "change",
                                maxHistoryLength: 0,
                                throttleTime: 0
                            }, (function(e, a, l) {
                                return n(r, void 0, void 0, (function() {
                                    return o(this, (function(e) {
                                        return void 0 === a || a === l ? [2] : (t.parameter.read("networking.ethernet.switch.fastaging").then((function(t) {
                                            i = t[0].value;
                                            var e = $('div[taid="field-switch-fast-aging-label"] input');
                                            e.prop("checked", !1),
                                            !0 === i && e.prop("checked", !0)
                                        }
                                        )),
                                        [2])
                                    }
                                    ))
                                }
                                ))
                            }
                            ))
                        }(t),
                        [2, {
                            item: l,
                            controller: u
                        }]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(t, e, i) {
        "use strict";
        var n, o = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        ,
        function(t, e) {
            function i() {
                this.constructor = t
            }
            n(t, e),
            t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
        }
        ), r = this && this.__assign || Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var o in e = arguments[i])
                    Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }
        , a = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
        , l = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(2)
          , c = i(11)
          , d = i(1)
          , u = i(12)
          , p = i(14)
          , f = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i.bridgeParameterId = "networking.ethernet.bridge.*.name",
                i.portsParameterId = "networking.ethernet.bridge.*.ports",
                i.parameterMapping = {},
                i.controlView = new u.BridgeConfigurationView(e),
                i.view = i.controlView.view,
                i
            }
            return o(e, t),
            Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this.configuration
                },
                set: function(t) {
                    this.configuration = t
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var t, e, i, n = this;
                    return l(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return this.view.classList.add("loading"),
                            this.controlView.rebuildView(),
                            [4, Promise.all([this.getDevicePorts(), this.updateBridgeConfiguration(), this.getProfinetNoteText()])];
                        case 1:
                            return t = o.sent(),
                            e = t[0],
                            this.configuration = t[1],
                            i = t[2],
                            this.controlView.addNote("connection-may-interrupts-note", "Any change to the bridge configuration can interrupt the IP connection to the device."),
                            this.controlView.addNote("profinet-ports-note", i),
                            this.controlView.ports = e,
                            this.controlView.config = this.configuration,
                            this.controlView.onChange = function() {
                                return n.writeConfig()
                            }
                            ,
                            this.controlView.onSubmit = function() {
                                return n.submitConfig()
                            }
                            ,
                            this.view.classList.remove("loading"),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getProfinetNoteText = function() {
                return a(this, void 0, void 0, (function() {
                    var t;
                    return l(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, this.base.parameter.read("device.ordernumber")];
                        case 1:
                            return t = e.sent(),
                            [2, t[0].value.indexOf("8215") >= 0 ? this.base.localization.localized({
                                key: "profinet-ports-note",
                                fallback: "In case of activated PROFINET Device the Ports X11 and X12 should not be changed!"
                            }) : ""]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getDevicePorts = function() {
                return a(this, void 0, void 0, (function() {
                    var t;
                    return l(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, this.base.parameter.read("networking.ethernet.interfaces.*.label")];
                        case 1:
                            return (t = e.sent()).some((function(t) {
                                return c.ReadResult.isErrorResult(t)
                            }
                            )) ? [2, []] : [2, t.map((function(t) {
                                return t.value
                            }
                            ))]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.updateBridgeConfiguration = function() {
                return a(this, void 0, void 0, (function() {
                    var t, e, i, n;
                    return l(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return [4, d.getParameterValues(this.base, [this.bridgeParameterId, this.portsParameterId])];
                        case 1:
                            return t = o.sent(),
                            e = t[0],
                            i = t[1],
                            n = {},
                            e.forEach((function(t, e) {
                                n[t] = i[e]
                            }
                            )),
                            [2, n]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.asyncForEach = function(t, e) {
                return a(this, void 0, void 0, (function() {
                    var i;
                    return l(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            i = 0,
                            n.label = 1;
                        case 1:
                            return i < t.length ? [4, e(t[i], i, t)] : [3, 4];
                        case 2:
                            n.sent(),
                            n.label = 3;
                        case 3:
                            return i++,
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
            e.prototype.writeConfig = function() {
                return a(this, void 0, void 0, (function() {
                    var t, e, i = this;
                    return l(this, (function(n) {
                        return this.parameterMapping = {},
                        Object.keys(this.controlView.config).forEach((function(t, e) {
                            var n, o = i.controlView.config[t];
                            i.parameterMapping = r({}, i.parameterMapping, ((n = {})["networking.ethernet.bridge." + e + ".name"] = t,
                            n["networking.ethernet.bridge." + e + ".ports"] = o,
                            n))
                        }
                        )),
                        t = Object.keys(this.parameterMapping),
                        e = !1,
                        function() {
                            return a(i, void 0, void 0, (function() {
                                var i = this;
                                return l(this, (function(n) {
                                    switch (n.label) {
                                    case 0:
                                        return [4, this.asyncForEach(t, (function(t) {
                                            return a(i, void 0, void 0, (function() {
                                                var i, n;
                                                return l(this, (function(o) {
                                                    switch (o.label) {
                                                    case 0:
                                                        return [4, this.base.parameter.write(t, this.parameterMapping[t])];
                                                    case 1:
                                                        return i = o.sent(),
                                                        [4, p.checkForErrorResultAndDisplay(i, this.base)];
                                                    case 2:
                                                        return (n = o.sent()).hasError && (e = n.shallReload),
                                                        [2]
                                                    }
                                                }
                                                ))
                                            }
                                            ))
                                        }
                                        ))];
                                    case 1:
                                        return n.sent(),
                                        [2]
                                    }
                                }
                                ))
                            }
                            ))
                        }(),
                        e && this.load(),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.submitConfig = function() {
                return a(this, void 0, void 0, (function() {
                    var t;
                    return l(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return this.controlView.loading = !0,
                            [4, this.base.parameter.commit(Object.keys(this.parameterMapping))];
                        case 1:
                            return t = e.sent(),
                            [4, p.checkForErrorResultAndDisplay(t, this.base)];
                        case 2:
                            return e.sent().shallReload && this.load(),
                            this.controlView.loading = !1,
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e
        }(s.ViewController);
        e.BridgeConfigurationController = f
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        function(t) {
            t.isErrorResult = function(t) {
                return void 0 !== t.error
            }
        }(e.ReadResult || (e.ReadResult = {}))
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(13)
          , o = function() {
            function t(t) {
                this._ports = [],
                this._loading = !1,
                this.base = t,
                this.view = document.createElement("div"),
                this.view.id = "bridge-configuration",
                this.view.classList.add("form", "collapsible"),
                this._table = document.createElement("table"),
                this.view.appendChild(this._table)
            }
            return Object.defineProperty(t.prototype, "config", {
                get: function() {
                    return this._config
                },
                set: function(t) {
                    this._config = t,
                    this._config && this.rebuildTableBody()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "ports", {
                get: function() {
                    return this._ports
                },
                set: function(t) {
                    this._ports = t,
                    this.rebuildTableHead()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "loading", {
                get: function() {
                    return this._loading
                },
                set: function(t) {
                    t && !this._loading ? this._section.classList.add("submitting") : (this._submitButton.disabled = !0,
                    this._section.classList.remove("submitting")),
                    this._loading = t
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.rebuildView = function() {
                this.rebuildTitle(this.base.localization.localized({
                    key: "bridge-configuration-title",
                    fallback: "Bridge Configuration"
                }), "network-ethernet-bridgeconfiguration"),
                this.rebuildSectionBody()
            }
            ,
            t.prototype.addNote = function(t, e) {
                var i = this.view.querySelector('p[taid="' + t + '"]');
                if (i && e)
                    i.textContent = e;
                else if (i && !e)
                    i.remove();
                else if (!i && e) {
                    (i = document.createElement("p")).classList.add("note"),
                    i.setAttribute("taid", t),
                    i.textContent = e;
                    var n = this.view.querySelector("div.section-body")
                      , o = n.parentNode;
                    o && o.insertBefore(i, n)
                }
            }
            ,
            t.prototype.rebuildTableHead = function() {
                this._tHead && this._tHead.remove(),
                this._tHead = this._table.createTHead();
                var t = this._tHead.insertRow()
                  , e = document.createElement("th");
                e.appendChild(document.createTextNode("Bridge")),
                t.appendChild(e),
                (e = document.createElement("th")).colSpan = this._ports.length,
                e.appendChild(document.createTextNode("Port")),
                t.appendChild(e);
                var i = this._tHead.insertRow();
                e = document.createElement("th"),
                i.appendChild(e),
                this._ports.forEach((function(t) {
                    (e = document.createElement("th")).appendChild(document.createTextNode(t)),
                    i.appendChild(e)
                }
                ))
            }
            ,
            t.prototype.rebuildTableBody = function() {
                this._tBody && this._table.removeChild(this._tBody),
                this._tBody = this._table.createTBody(),
                this.identifyPossibleBridges().forEach(this.addTableRow.bind(this))
            }
            ,
            t.prototype.identifyPossibleBridges = function() {
                var t = [];
                return this._ports.forEach((function(e, i) {
                    t.push("br" + i)
                }
                )),
                Object.keys(this._config).forEach((function(e) {
                    -1 === t.indexOf(e) && t.push(e)
                }
                )),
                t
            }
            ,
            t.prototype.addTableRow = function(t, e) {
                var i = this
                  , o = this._tBody.insertRow()
                  , r = n.DefaultBridgeName.test(t) ? n.createBridgeLabel(t).split(" ")[1] : t;
                o.insertCell().appendChild(document.createTextNode(r)),
                this._ports.forEach((function(n, r) {
                    var a = o.insertCell()
                      , l = document.createElement("input")
                      , s = t + "-port" + n;
                    l.setAttribute("name", n),
                    l.setAttribute("type", "radio"),
                    l.setAttribute("value", t),
                    l.setAttribute("id", s),
                    e > r && l.classList.add("disabled"),
                    i._config.hasOwnProperty(t) && (l.checked = i._config[t].indexOf(n) >= 0),
                    l.onchange = function(t) {
                        i.buttonValueChanged(t)
                    }
                    ;
                    var c = document.createElement("label");
                    c.setAttribute("for", s),
                    a.appendChild(l),
                    a.appendChild(c)
                }
                ))
            }
            ,
            t.prototype.buttonValueChanged = function(t) {
                var e = this
                  , i = t.target
                  , n = i.name
                  , o = i.value;
                Object.keys(this._config).forEach((function(t) {
                    var i = e._config[t]
                      , o = i.indexOf(n);
                    o >= 0 && i.splice(o, 1)
                }
                ));
                var r = this._config[o];
                r ? r.push(n) : this._config[o] = [n],
                this.onChange && this.onChange(),
                this._submitButton.disabled = !1
            }
            ,
            t.prototype.findOrCreateChildElement = function(t, e) {
                var i = this.view.querySelector(t);
                if (i)
                    return i;
                var n = t.split(".")
                  , o = n[0]
                  , r = n.slice(1);
                return i = document.createElement(o),
                r.forEach((function(t) {
                    i.classList.add(t)
                }
                )),
                e ? this.view.insertBefore(i, e) : this.view.appendChild(i),
                i
            }
            ,
            t.prototype.rebuildTitle = function(t, e, i) {
                void 0 === i && (i = "span.title");
                var n = this.findOrCreateChildElement(i, this.view.firstChild);
                n.setAttribute("taid", e),
                n.textContent = t,
                this.addCollapsibility()
            }
            ,
            t.prototype.rebuildSectionBody = function() {
                var t = this.findOrCreateChildElement("div.body");
                t.children.length > 0 || t.appendChild(this.rebuildSection())
            }
            ,
            t.prototype.rebuildSection = function() {
                return this._section = this.findOrCreateChildElement("div.section.titled-section"),
                this._section.children.length > 0 ? this._section : (this._section.setAttribute("taid", "section-switch-configuration"),
                this._section.appendChild(this.buildSectionTitle()),
                this._section.appendChild(this.buildSectionBody()),
                this._section.appendChild(this.rebuildSectionSubmit()),
                this._section)
            }
            ,
            t.prototype.buildSectionTitle = function() {
                var t = document.createElement("span");
                return t.classList.add("title"),
                t.setAttribute("taid", "section-title"),
                t.innerText = this.base.localization.localized({
                    key: "port-mapping-section-title",
                    fallback: "Port Mapping"
                }),
                t
            }
            ,
            t.prototype.buildSectionBody = function() {
                var t = document.createElement("div");
                t.classList.add("section-body");
                var e = document.createElement("div");
                e.classList.add("field"),
                e.setAttribute("taid", "field-port-mapping");
                var i = document.createElement("div");
                return i.classList.add("control", "matrix"),
                i.appendChild(this._table),
                e.appendChild(i),
                t.appendChild(e),
                t
            }
            ,
            t.prototype.rebuildSectionSubmit = function() {
                var t = this
                  , e = this.view.querySelector("button.submit-button");
                return e || ((e = document.createElement("button")).classList.add("submit-button", "action"),
                e.textContent = "Submit",
                e.setAttribute("taid", "section-bridge-config-submit-button"),
                e.addEventListener("click", (function() {
                    t.onSubmit && t.onSubmit()
                }
                ))),
                this._submitButton = e,
                e.disabled = !0,
                this.rebuildBody([e], "div.actions")
            }
            ,
            t.prototype.rebuildBody = function(t, e) {
                void 0 === e && (e = "div.body");
                var i = this.findOrCreateChildElement(e);
                if (!i.children.length)
                    for (var n = 0, o = t; n < o.length; n++) {
                        var r = o[n];
                        i.appendChild(r)
                    }
                return i
            }
            ,
            t.prototype.addCollapsibility = function() {
                var t = this;
                this.collapsibilityHasBeenAdded || (this.view.querySelector("span.title").addEventListener("click", (function() {
                    return t.view.classList.toggle("collapsed")
                }
                )),
                this.collapsibilityHasBeenAdded = !0)
            }
            ,
            t
        }();
        e.BridgeConfigurationView = o
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(1);
        e.DefaultBridgeName = /^(br|wwan)[\d]+$/,
        e.sortWithPriority = function(t, i, n) {
            void 0 === n && (n = e.DefaultBridgeName);
            var o = n.test(t)
              , r = n.test(i);
            return o && !r ? -1 : !o && r ? 1 : t.localeCompare(i, void 0, {
                numeric: !0,
                sensitivity: "base"
            })
        }
        ,
        e.createBridgeLabel = function(t) {
            var e = o.exec(t);
            if (e) {
                var i = e[1]
                  , a = e[2];
                if (i in r) {
                    var l = parseInt(a);
                    return r[i] + " " + (l + 1)
                }
            }
            return "Bridge " + n.capitalizeFirstLetter(t)
        }
        ,
        e.getBridgeIndex = function(t) {
            var e = o.exec(t);
            if (e)
                return parseInt(e[2], 10)
        }
        ;
        var o = /^([a-zA-Z]+)([0-9]+)$/
          , r = {
            br: "Bridge",
            wwan: "WWAN"
        }
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(3);
        e.checkForErrorResultAndDisplay = function(t, e) {
            return n(this, void 0, void 0, (function() {
                var i, n, a;
                return o(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return i = [],
                        n = !1,
                        Array.isArray(t) || (t = [t]),
                        t.map((function(t) {
                            var e = function(t) {
                                var e = t.error;
                                if (void 0 !== e)
                                    return "Parameter: " + t.parameterId + "\nMessage : " + e.message;
                                return
                            }(t);
                            void 0 !== e && i.push(e)
                        }
                        )),
                        0 !== i.length ? void 0 === e ? [3, 2] : [4, e.modalPresenter.showErrorDialog(e, {
                            title: e.localization.localized({
                                fallback: "Failed to write values",
                                key: "write-for-section-failed-modal-title"
                            }),
                            message: e.localization.localized({
                                fallback: "Errors occured while trying to write parameters. However, some changes may have been applied though.",
                                key: "write-for-section-failed-for-all-modal-message"
                            }),
                            detailMessage: i.join("\n"),
                            secondaryButton: {
                                title: "Reload Values",
                                style: r.DialogButtonStyle.default
                            }
                        })] : [3, 2];
                    case 1:
                        a = o.sent(),
                        n = a === r.DialogButtonType.secondary,
                        o.label = 2;
                    case 2:
                        return [2, {
                            hasError: 0 !== i.length,
                            shallReload: n
                        }]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(t, e, i) {
        var n = i(16);
        "string" == typeof n && (n = [[t.i, n, ""]]);
        var o = {
            insert: "head",
            singleton: !1
        };
        i(18)(n, o);
        n.locals && (t.exports = n.locals)
    }
    , function(t, e, i) {
        (t.exports = i(17)(!1)).push([t.i, "#bridge-configuration table{border-collapse:collapse;border-spacing:0;margin:0 auto 20px;width:100%;max-width:100%}#bridge-configuration table th,#bridge-configuration table td{padding:8px}#bridge-configuration table th:first-child,#bridge-configuration table td:first-child{text-align:left}#bridge-configuration table th:not(:first-child),#bridge-configuration table td:not(:first-child){text-align:center}#bridge-configuration table tbody tr{border-top:solid 1px #ccc}#bridge-configuration table td input[type=radio]{display:none}#bridge-configuration table td label{border:solid 1px #ccc;border-radius:50%;display:inline-block;cursor:pointer;position:relative;height:17px;width:17px}#bridge-configuration table td input[type=radio]:checked+label{background:#8bb63b;border-color:transparent}#bridge-configuration table td input[type=radio].disabled,#bridge-configuration table td input[type=radio].disabled+label{pointer-events:none}#bridge-configuration table td input[type=radio].disabled+label{border-color:transparent;cursor:default}#bridge-configuration table td input[type=radio].disabled:checked+label{background:#ccc}", ""])
    }
    , function(t, e, i) {
        "use strict";
        t.exports = function(t) {
            var e = [];
            return e.toString = function() {
                return this.map((function(e) {
                    var i = function(t, e) {
                        var i = t[1] || ""
                          , n = t[3];
                        if (!n)
                            return i;
                        if (e && "function" == typeof btoa) {
                            var o = (a = n,
                            l = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                            s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),
                            "/*# ".concat(s, " */"))
                              , r = n.sources.map((function(t) {
                                return "/*# sourceURL=".concat(n.sourceRoot).concat(t, " */")
                            }
                            ));
                            return [i].concat(r).concat([o]).join("\n")
                        }
                        var a, l, s;
                        return [i].join("\n")
                    }(e, t);
                    return e[2] ? "@media ".concat(e[2], "{").concat(i, "}") : i
                }
                )).join("")
            }
            ,
            e.i = function(t, i) {
                "string" == typeof t && (t = [[null, t, ""]]);
                for (var n = {}, o = 0; o < this.length; o++) {
                    var r = this[o][0];
                    null != r && (n[r] = !0)
                }
                for (var a = 0; a < t.length; a++) {
                    var l = t[a];
                    null != l[0] && n[l[0]] || (i && !l[2] ? l[2] = i : i && (l[2] = "(".concat(l[2], ") and (").concat(i, ")")),
                    e.push(l))
                }
            }
            ,
            e
        }
    }
    , function(t, e, i) {
        "use strict";
        var n, o = {}, r = function() {
            return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)),
            n
        }, a = function() {
            var t = {};
            return function(e) {
                if (void 0 === t[e]) {
                    var i = document.querySelector(e);
                    if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement)
                        try {
                            i = i.contentDocument.head
                        } catch (t) {
                            i = null
                        }
                    t[e] = i
                }
                return t[e]
            }
        }();
        function l(t, e) {
            for (var i = [], n = {}, o = 0; o < t.length; o++) {
                var r = t[o]
                  , a = e.base ? r[0] + e.base : r[0]
                  , l = {
                    css: r[1],
                    media: r[2],
                    sourceMap: r[3]
                };
                n[a] ? n[a].parts.push(l) : i.push(n[a] = {
                    id: a,
                    parts: [l]
                })
            }
            return i
        }
        function s(t, e) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i]
                  , r = o[n.id]
                  , a = 0;
                if (r) {
                    for (r.refs++; a < r.parts.length; a++)
                        r.parts[a](n.parts[a]);
                    for (; a < n.parts.length; a++)
                        r.parts.push(h(n.parts[a], e))
                } else {
                    for (var l = []; a < n.parts.length; a++)
                        l.push(h(n.parts[a], e));
                    o[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: l
                    }
                }
            }
        }
        function c(t) {
            var e = document.createElement("style");
            if (void 0 === t.attributes.nonce) {
                var n = i.nc;
                n && (t.attributes.nonce = n)
            }
            if (Object.keys(t.attributes).forEach((function(i) {
                e.setAttribute(i, t.attributes[i])
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
        var d, u = (d = [],
        function(t, e) {
            return d[t] = e,
            d.filter(Boolean).join("\n")
        }
        );
        function p(t, e, i, n) {
            var o = i ? "" : n.css;
            if (t.styleSheet)
                t.styleSheet.cssText = u(e, o);
            else {
                var r = document.createTextNode(o)
                  , a = t.childNodes;
                a[e] && t.removeChild(a[e]),
                a.length ? t.insertBefore(r, a[e]) : t.appendChild(r)
            }
        }
        function f(t, e, i) {
            var n = i.css
              , o = i.media
              , r = i.sourceMap;
            if (o && t.setAttribute("media", o),
            r && btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")),
            t.styleSheet)
                t.styleSheet.cssText = n;
            else {
                for (; t.firstChild; )
                    t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }
        var b = null
          , m = 0;
        function h(t, e) {
            var i, n, o;
            if (e.singleton) {
                var r = m++;
                i = b || (b = c(e)),
                n = p.bind(null, i, r, !1),
                o = p.bind(null, i, r, !0)
            } else
                i = c(e),
                n = f.bind(null, i, e),
                o = function() {
                    !function(t) {
                        if (null === t.parentNode)
                            return !1;
                        t.parentNode.removeChild(t)
                    }(i)
                }
                ;
            return n(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                        return;
                    n(t = e)
                } else
                    o()
            }
        }
        t.exports = function(t, e) {
            (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {},
            e.singleton || "boolean" == typeof e.singleton || (e.singleton = r());
            var i = l(t, e);
            return s(i, e),
            function(t) {
                for (var n = [], r = 0; r < i.length; r++) {
                    var a = i[r]
                      , c = o[a.id];
                    c && (c.refs--,
                    n.push(c))
                }
                t && s(l(t, e), e);
                for (var d = 0; d < n.length; d++) {
                    var u = n[d];
                    if (0 === u.refs) {
                        for (var p = 0; p < u.parts.length; p++)
                            u.parts[p]();
                        delete o[u.id]
                    }
                }
            }
        }
    }
    , function(t) {
        t.exports = JSON.parse('{"hidden":"networking.ethernet.interfaces.configurable is false","title":{"default":"Ethernet Configuration","localized":"page-title-ethernet-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-ethernet-configuration"},"content":[{"title":{"default":"Switch Configuration","localized":"title-ethernet-switch-configuration"},"hidden":"features.*.name contains not switch-port-mirroring","sections":[{"note":{"default":"Fast aging only affects bridges with multiple connected ethernet ports.","localized":"switch-fast-aging-note"},"fields":[{"title":{"default":"Port Mirror","localized":"switch-port-mirror-label"},"control":{"type":"dropdown","items":[{"title":{"default":"None","localized":"ethernet-port-mirror-none"},"value":"none"},{"repeat":"networking.ethernet.interfaces.*.label","value":"${networking.ethernet.interfaces.*.label}","title":{"default":"${networking.ethernet.interfaces.*.label}","localized":"ethernet-port-mirror-port"}}]},"parameter":"networking.ethernet.switch.portmirror"},{"hidden":"features.*.name contains not switch-fast-aging","title":{"default":"Fast Aging","localized":"switch-fast-aging-label"},"control":{"type":"checkbox"},"parameter":"networking.ethernet.switch.fastaging"},{"hidden":"features.*.name contains not switch-broadcast-protection","title":{"default":"Broadcast Protection","localized":"switch-broadcast-protection-label"},"control":{"type":"dropdown","items":[{"title":{"default":"Disabled","localized":"ethernet-broadcast-protection-disabled-label"},"value":"0"},{"title":{"default":"1 %","localized":"ethernet-broadcast-protection-1-percent-label"},"value":"1"},{"title":{"default":"2 %","localized":"ethernet-broadcast-protection-2-percent-label"},"value":"2"},{"title":{"default":"3 %","localized":"ethernet-broadcast-protection-3-percent-label"},"value":"3"},{"title":{"default":"4 %","localized":"ethernet-broadcast-protection-4-percent-label"},"value":"4"},{"title":{"default":"5 %","localized":"ethernet-broadcast-protection-5-percent-label"},"value":"5"}]},"parameter":"networking.ethernet.switch.broadcastprotection"},{"hidden":"features.*.name contains not switch-rate-limiting","title":{"default":"Rate Limit","localized":"switch-rate-limit-label"},"control":{"type":"dropdown","items":[{"title":{"default":"Disabled","localized":"ethernet-rate-limit-disabled-label"},"value":"disabled"},{"value":"64.kbps","title":{"default":"64 kbps","localized":"rate-limit-option-64-kbps"}},{"value":"128.kbps","title":{"default":"128 kbps","localized":"rate-limit-option-128-kbps"}},{"value":"192.kbps","title":{"default":"192 kbps","localized":"rate-limit-option-192-kbps"}},{"value":"256.kbps","title":{"default":"256 kbps","localized":"rate-limit-option-256-kbps"}},{"value":"320.kbps","title":{"default":"320 kbps","localized":"rate-limit-option-320-kbps"}},{"value":"384.kbps","title":{"default":"384 kbps","localized":"rate-limit-option-384-kbps"}},{"value":"448.kbps","title":{"default":"448 kbps","localized":"rate-limit-option-448-kbps"}},{"value":"512.kbps","title":{"default":"512 kbps","localized":"rate-limit-option-512-kbps"}},{"value":"576.kbps","title":{"default":"576 kbps","localized":"rate-limit-option-576-kbps"}},{"value":"640.kbps","title":{"default":"640 kbps","localized":"rate-limit-option-640-kbps"}},{"value":"704.kbps","title":{"default":"704 kbps","localized":"rate-limit-option-704-kbps"}},{"value":"768.kbps","title":{"default":"768 kbps","localized":"rate-limit-option-768-kbps"}},{"value":"832.kbps","title":{"default":"832 kbps","localized":"rate-limit-option-832-kbps"}},{"value":"896.kbps","title":{"default":"896 kbps","localized":"rate-limit-option-896-kbps"}},{"value":"960.kbps","title":{"default":"960 kbps","localized":"rate-limit-option-960-kbps"}},{"value":"1.mbps","title":{"default":"1 mbps","localized":"rate-limit-option-1-mbps"}},{"value":"2.mbps","title":{"default":"2 mbps","localized":"rate-limit-option-2-mbps"}},{"value":"3.mbps","title":{"default":"3 mbps","localized":"rate-limit-option-3-mbps"}},{"value":"4.mbps","title":{"default":"4 mbps","localized":"rate-limit-option-4-mbps"}},{"value":"5.mbps","title":{"default":"5 mbps","localized":"rate-limit-option-5-mbps"}},{"value":"6.mbps","title":{"default":"6 mbps","localized":"rate-limit-option-6-mbps"}},{"value":"7.mbps","title":{"default":"7 mbps","localized":"rate-limit-option-7-mbps"}},{"value":"8.mbps","title":{"default":"8 mbps","localized":"rate-limit-option-8-mbps"}},{"value":"9.mbps","title":{"default":"9 mbps","localized":"rate-limit-option-9-mbps"}},{"value":"10.mbps","title":{"default":"10 mbps","localized":"rate-limit-option-10-mbps"}},{"value":"11.mbps","title":{"default":"11 mbps","localized":"rate-limit-option-11-mbps"}},{"value":"12.mbps","title":{"default":"12 mbps","localized":"rate-limit-option-12-mbps"}},{"value":"13.mbps","title":{"default":"13 mbps","localized":"rate-limit-option-13-mbps"}},{"value":"14.mbps","title":{"default":"14 mbps","localized":"rate-limit-option-14-mbps"}},{"value":"15.mbps","title":{"default":"15 mbps","localized":"rate-limit-option-15-mbps"}},{"value":"16.mbps","title":{"default":"16 mbps","localized":"rate-limit-option-16-mbps"}},{"value":"17.mbps","title":{"default":"17 mbps","localized":"rate-limit-option-17-mbps"}},{"value":"18.mbps","title":{"default":"18 mbps","localized":"rate-limit-option-18-mbps"}},{"value":"19.mbps","title":{"default":"19 mbps","localized":"rate-limit-option-19-mbps"}},{"value":"20.mbps","title":{"default":"20 mbps","localized":"rate-limit-option-20-mbps"}},{"value":"21.mbps","title":{"default":"21 mbps","localized":"rate-limit-option-21-mbps"}},{"value":"22.mbps","title":{"default":"22 mbps","localized":"rate-limit-option-22-mbps"}},{"value":"23.mbps","title":{"default":"23 mbps","localized":"rate-limit-option-23-mbps"}},{"value":"24.mbps","title":{"default":"24 mbps","localized":"rate-limit-option-24-mbps"}},{"value":"25.mbps","title":{"default":"25 mbps","localized":"rate-limit-option-25-mbps"}},{"value":"26.mbps","title":{"default":"26 mbps","localized":"rate-limit-option-26-mbps"}},{"value":"27.mbps","title":{"default":"27 mbps","localized":"rate-limit-option-27-mbps"}},{"value":"28.mbps","title":{"default":"28 mbps","localized":"rate-limit-option-28-mbps"}},{"value":"29.mbps","title":{"default":"29 mbps","localized":"rate-limit-option-29-mbps"}},{"value":"30.mbps","title":{"default":"30 mbps","localized":"rate-limit-option-30-mbps"}},{"value":"31.mbps","title":{"default":"31 mbps","localized":"rate-limit-option-31-mbps"}},{"value":"32.mbps","title":{"default":"32 mbps","localized":"rate-limit-option-32-mbps"}},{"value":"33.mbps","title":{"default":"33 mbps","localized":"rate-limit-option-33-mbps"}},{"value":"34.mbps","title":{"default":"34 mbps","localized":"rate-limit-option-34-mbps"}},{"value":"35.mbps","title":{"default":"35 mbps","localized":"rate-limit-option-35-mbps"}},{"value":"36.mbps","title":{"default":"36 mbps","localized":"rate-limit-option-36-mbps"}},{"value":"37.mbps","title":{"default":"37 mbps","localized":"rate-limit-option-37-mbps"}},{"value":"38.mbps","title":{"default":"38 mbps","localized":"rate-limit-option-38-mbps"}},{"value":"39.mbps","title":{"default":"39 mbps","localized":"rate-limit-option-39-mbps"}},{"value":"40.mbps","title":{"default":"40 mbps","localized":"rate-limit-option-40-mbps"}},{"value":"41.mbps","title":{"default":"41 mbps","localized":"rate-limit-option-41-mbps"}},{"value":"42.mbps","title":{"default":"42 mbps","localized":"rate-limit-option-42-mbps"}},{"value":"43.mbps","title":{"default":"43 mbps","localized":"rate-limit-option-43-mbps"}},{"value":"44.mbps","title":{"default":"44 mbps","localized":"rate-limit-option-44-mbps"}},{"value":"45.mbps","title":{"default":"45 mbps","localized":"rate-limit-option-45-mbps"}},{"value":"46.mbps","title":{"default":"46 mbps","localized":"rate-limit-option-46-mbps"}},{"value":"47.mbps","title":{"default":"47 mbps","localized":"rate-limit-option-47-mbps"}},{"value":"48.mbps","title":{"default":"48 mbps","localized":"rate-limit-option-48-mbps"}},{"value":"49.mbps","title":{"default":"49 mbps","localized":"rate-limit-option-49-mbps"}},{"value":"50.mbps","title":{"default":"50 mbps","localized":"rate-limit-option-50-mbps"}},{"value":"51.mbps","title":{"default":"51 mbps","localized":"rate-limit-option-51-mbps"}},{"value":"52.mbps","title":{"default":"52 mbps","localized":"rate-limit-option-52-mbps"}},{"value":"53.mbps","title":{"default":"53 mbps","localized":"rate-limit-option-53-mbps"}},{"value":"54.mbps","title":{"default":"54 mbps","localized":"rate-limit-option-54-mbps"}},{"value":"55.mbps","title":{"default":"55 mbps","localized":"rate-limit-option-55-mbps"}},{"value":"56.mbps","title":{"default":"56 mbps","localized":"rate-limit-option-56-mbps"}},{"value":"57.mbps","title":{"default":"57 mbps","localized":"rate-limit-option-57-mbps"}},{"value":"58.mbps","title":{"default":"58 mbps","localized":"rate-limit-option-58-mbps"}},{"value":"59.mbps","title":{"default":"59 mbps","localized":"rate-limit-option-59-mbps"}},{"value":"60.mbps","title":{"default":"60 mbps","localized":"rate-limit-option-60-mbps"}},{"value":"61.mbps","title":{"default":"61 mbps","localized":"rate-limit-option-61-mbps"}},{"value":"62.mbps","title":{"default":"62 mbps","localized":"rate-limit-option-62-mbps"}},{"value":"63.mbps","title":{"default":"63 mbps","localized":"rate-limit-option-63-mbps"}},{"value":"64.mbps","title":{"default":"64 mbps","localized":"rate-limit-option-64-mbps"}},{"value":"65.mbps","title":{"default":"65 mbps","localized":"rate-limit-option-65-mbps"}},{"value":"66.mbps","title":{"default":"66 mbps","localized":"rate-limit-option-66-mbps"}},{"value":"67.mbps","title":{"default":"67 mbps","localized":"rate-limit-option-67-mbps"}},{"value":"68.mbps","title":{"default":"68 mbps","localized":"rate-limit-option-68-mbps"}},{"value":"69.mbps","title":{"default":"69 mbps","localized":"rate-limit-option-69-mbps"}},{"value":"70.mbps","title":{"default":"70 mbps","localized":"rate-limit-option-70-mbps"}},{"value":"71.mbps","title":{"default":"71 mbps","localized":"rate-limit-option-71-mbps"}},{"value":"72.mbps","title":{"default":"72 mbps","localized":"rate-limit-option-72-mbps"}},{"value":"73.mbps","title":{"default":"73 mbps","localized":"rate-limit-option-73-mbps"}},{"value":"74.mbps","title":{"default":"74 mbps","localized":"rate-limit-option-74-mbps"}},{"value":"75.mbps","title":{"default":"75 mbps","localized":"rate-limit-option-75-mbps"}},{"value":"76.mbps","title":{"default":"76 mbps","localized":"rate-limit-option-76-mbps"}},{"value":"77.mbps","title":{"default":"77 mbps","localized":"rate-limit-option-77-mbps"}},{"value":"78.mbps","title":{"default":"78 mbps","localized":"rate-limit-option-78-mbps"}},{"value":"79.mbps","title":{"default":"79 mbps","localized":"rate-limit-option-79-mbps"}},{"value":"80.mbps","title":{"default":"80 mbps","localized":"rate-limit-option-80-mbps"}},{"value":"81.mbps","title":{"default":"81 mbps","localized":"rate-limit-option-81-mbps"}},{"value":"82.mbps","title":{"default":"82 mbps","localized":"rate-limit-option-82-mbps"}},{"value":"83.mbps","title":{"default":"83 mbps","localized":"rate-limit-option-83-mbps"}},{"value":"84.mbps","title":{"default":"84 mbps","localized":"rate-limit-option-84-mbps"}},{"value":"85.mbps","title":{"default":"85 mbps","localized":"rate-limit-option-85-mbps"}},{"value":"86.mbps","title":{"default":"86 mbps","localized":"rate-limit-option-86-mbps"}},{"value":"87.mbps","title":{"default":"87 mbps","localized":"rate-limit-option-87-mbps"}},{"value":"88.mbps","title":{"default":"88 mbps","localized":"rate-limit-option-88-mbps"}},{"value":"89.mbps","title":{"default":"89 mbps","localized":"rate-limit-option-89-mbps"}},{"value":"90.mbps","title":{"default":"90 mbps","localized":"rate-limit-option-90-mbps"}},{"value":"91.mbps","title":{"default":"91 mbps","localized":"rate-limit-option-91-mbps"}},{"value":"92.mbps","title":{"default":"92 mbps","localized":"rate-limit-option-92-mbps"}},{"value":"93.mbps","title":{"default":"93 mbps","localized":"rate-limit-option-93-mbps"}},{"value":"94.mbps","title":{"default":"94 mbps","localized":"rate-limit-option-94-mbps"}},{"value":"95.mbps","title":{"default":"95 mbps","localized":"rate-limit-option-95-mbps"}},{"value":"96.mbps","title":{"default":"96 mbps","localized":"rate-limit-option-96-mbps"}},{"value":"97.mbps","title":{"default":"97 mbps","localized":"rate-limit-option-97-mbps"}},{"value":"98.mbps","title":{"default":"98 mbps","localized":"rate-limit-option-98-mbps"}},{"value":"99.mbps","title":{"default":"99 mbps","localized":"rate-limit-option-99-mbps"}}]},"parameter":"networking.ethernet.switch.ratelimit"}]}]}]}')
    }
    , function(t, e, i) {
        "use strict";
        var n = this && this.__awaiter || function(t, e, i, n) {
            return new (i || (i = Promise))((function(o, r) {
                function a(t) {
                    try {
                        s(n.next(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function l(t) {
                    try {
                        s(n.throw(t))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(t) {
                    t.done ? o(t.value) : new i((function(e) {
                        e(t.value)
                    }
                    )).then(a, l)
                }
                s((n = n.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var i, n, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                n && (o = 2 & r[0] ? n.return : r[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, r[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    n = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = e.call(t, a)
                            } catch (t) {
                                r = [6, t],
                                n = 0
                            } finally {
                                i = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(0);
        e.initializeHostDomain = function(t) {
            var e = i(21);
            t.parameter.read("networking.tcpip.interfaces.*.source").then((function(t) {
                "dhcp" === t[0].value
            }
            ));
            var a = {
                id: "host-domain-name",
                title: t.localization.localized({
                    fallback: "Host-/Domain Name",
                    key: "title-hostdomain-configuration"
                }),
                tooltip: t.localization.localized({
                    fallback: "Configuration of Host-/Domain name",
                    key: "description-hostdomain-configuration"
                }),
                priority: 850,
                userRoles: [r.UserRoles.admin, r.UserRoles.user]
            }
              , l = t.viewGenerator.generate(t, e);
            return function(t, e, i) {
                var r = this;
                t.parameter.observe("device.configurable.hostname", {
                    kind: "change",
                    maxHistoryLength: 0,
                    throttleTime: 0
                }, (function(t, i, a) {
                    return n(r, void 0, void 0, (function() {
                        return o(this, (function(t) {
                            return void 0 === a || a === i ? [2] : (e.load(),
                            [2])
                        }
                        ))
                    }
                    ))
                }
                ))
            }(t, l),
            function(t, e) {
                var i = this;
                t.parameter.observe("device.configurable.reset.hostname", {
                    kind: "called",
                    maxHistoryLength: 0
                }, (function() {
                    return n(i, void 0, void 0, (function() {
                        return o(this, (function(i) {
                            return t.parameter.read("device.hostname").then((function(t) {
                                var i = t[0].value;
                                e.view.querySelector('[taid="field-hostname-control-title"] input').value = i,
                                e.view.querySelector('[taid="field-hostname-control-configured-title"] input').value = ""
                            }
                            )),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ))
            }(t, l),
            function(t, e) {
                var i = this;
                t.parameter.observe("device.configurable.domainname", {
                    kind: "change",
                    maxHistoryLength: 0,
                    throttleTime: 0
                }, (function(t, r, a) {
                    return n(i, void 0, void 0, (function() {
                        return o(this, (function(t) {
                            return void 0 === a || a === r ? [2] : (e.view.querySelector('[taid="field-domainname-control-title"] input').value = r,
                            [2])
                        }
                        ))
                    }
                    ))
                }
                ))
            }(t, l),
            function(t, e) {
                var i = this;
                t.parameter.observe("device.configurable.reset.domainname", {
                    kind: "called",
                    maxHistoryLength: 0
                }, (function() {
                    return n(i, void 0, void 0, (function() {
                        return o(this, (function(t) {
                            return e.load(),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ))
            }(t, l),
            {
                item: a,
                controller: l
            }
        }
    }
    , function(t) {
        t.exports = JSON.parse('{"title":{"default":"Configuration of Host- and Domainname","localized":"page-title-host-domain-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-host-domain-name-configuration"},"content":[{"title":{"default":"Hostname","localized":"title-hostname-configuration"},"sections":[{"fields":[{"title":{"default":"Currently used","localized":"hostname-control-title"},"control":{"type":"textfield","options":{"readonly":true}},"parameter":"device.hostname"},{"title":{"default":"Configured","localized":"hostname-control-configured-title"},"control":{"type":"textfield"},"parameter":"device.configurable.hostname"}],"action":{"title":{"default":"Clear","localized":"clear-hostname-control"},"method":"device.configurable.reset.hostname"}}]},{"title":{"default":"Domain Name","localized":"title-domainname-configuration"},"sections":[{"fields":[{"title":{"default":"Currently used","localized":"domainname-control-title"},"control":{"type":"textfield","options":{"readonly":true}},"parameter":"device.domainname"},{"title":{"default":"Configured","localized":"domain-control-configured-title"},"control":{"type":"textfield"},"parameter":"device.configurable.domainname"}],"action":{"title":{"default":"Clear","localized":"clear-domainname-control"},"method":"device.configurable.reset.domainname"}}]}]}')
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(0);
        e.initializeRouting = function(t) {
            var e = i(23);
            return {
                item: {
                    id: "routing",
                    title: t.localization.localized({
                        fallback: "Routing",
                        key: "title-routing"
                    }),
                    tooltip: t.localization.localized({
                        fallback: "Configuration of Routing",
                        key: "description-routing"
                    }),
                    priority: 100,
                    userRoles: [n.UserRoles.admin, n.UserRoles.user]
                },
                controller: t.viewGenerator.generate(t, e)
            }
        }
    }
    , function(t) {
        t.exports = JSON.parse('{"title":{"default":"Routing","localized":"routing-page-title"},"note":{"default":"Changes will take effect immediately.\\n\\nNotice: Switched network interfaces do not provide routing in the sense of forwarding IP packets.","localized":"routing-page-note"},"content":[{"title":{"default":"IP Forwarding through multiple interfaces","localized":"routing-general-settings-form-title"},"sections":[{"fields":[{"title":{"default":"Enabled","localized":"routing-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.routing.enabled"}]}]},{"title":{"default":"Custom Routes","localized":"routing-custom-routes-form-title"},"sections":[{"repeat":"networking.routing.routes.static.*.enabled","hidden":"networking.routing.routes.static.*.default is true","empty":{"default":"(no custom routes)","localized":"routing-no-custom-routes-assigned-note"},"delete":"networking.routing.routes.static.*.delete","add":"networking.routing.routes.addstatic","fields":[{"title":{"default":"Enabled","localized":"route-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.routing.routes.static.*.enabled"},{"title":{"default":"Destination Address","localized":"route-destination-address-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.static.*.destination.address"},{"title":{"default":"Destination Mask","localized":"route-destination-mask-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.static.*.destination.mask"},{"title":{"default":"Gateway Address","localized":"route-gateway-address-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.static.*.gateway.address"},{"title":{"default":"Gateway Metric","localized":"route-gateway-metric-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.static.*.gateway.metric"},{"title":{"default":"Interface","localized":"route-interface-field-title"},"control":{"type":"textfield","validation":{"pattern":"^[^\\\\s\\\\/]{0,15}$","hint":{"default":"Max 15 characters without whitespace and slash","localized":"route-interface-field-validation-hint"}}},"parameter":"networking.routing.routes.static.*.interface"}]},{"title":{"default":"Add Route","localized":"routing-add-static-route-form-title"},"action":{"title":{"default":"Add","localized":"routing-add-static-route-button-title"},"method":"networking.routing.routes.addstatic","type":"add"},"note":{"default":"To add a route, entries in the Destination Address, Destination Netmask and Gateway Metric fields are required. The Gateway Address and Interface (e.g. br0, wwan0) fields are optional, but at least one must be specified.","localized":"routing-static-add-route-note"},"fields":[{"title":{"default":"Enabled","localized":"route-enabled-field-title"},"control":{"type":"checkbox"},"argument":"enabled"},{"title":{"default":"Destination Address","localized":"route-destination-address-field-title"},"control":{"type":"textfield"},"argument":"destinationAddress"},{"title":{"default":"Destination Mask","localized":"route-destination-mask-field-title"},"control":{"type":"textfield"},"argument":"destinationMask"},{"title":{"default":"Gateway Address","localized":"route-gateway-address-field-title"},"control":{"type":"textfield"},"argument":"gatewayAddress"},{"title":{"default":"Gateway Metric","localized":"route-gateway-metric-field-title"},"control":{"type":"textfield"},"argument":"gatewayMetric"},{"title":{"default":"Interface","localized":"route-interface-field-title"},"control":{"type":"textfield","validation":{"pattern":"^[^\\\\s\\\\/]{0,15}$","hint":{"default":"Max 15 characters without whitespace and slash","localized":"route-interface-field-validation-hint"}}},"argument":"interface"}]}]},{"title":{"default":"Dynamic Routes (assigned by DHCP)","localized":"routing-dynamic-routes-form-title"},"sections":[{"repeat":"networking.routing.routes.dynamic.*.destination.address","empty":{"default":"(no dynamic routes)","localized":"routing-no-dynamic-routes-assigned-note"},"fields":[{"title":{"default":"Destination Address","localized":"routing-dynamic-routes-destination-address-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.dynamic.*.destination.address"},{"title":{"default":"Destination Mask","localized":"routing-dynamic-routes-destination-mask-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.dynamic.*.destination.mask"},{"title":{"default":"Gateway Address","localized":"routing-dynamic-routes-gateway-address-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.dynamic.*.gateway.address"},{"title":{"default":"Gateway Metric","localized":"routing-dynamic-routes-gateway-metric-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.dynamic.*.gateway.metric"},{"title":{"default":"Source","localized":"routing-dynamic-routes-source-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.routes.dynamic.*.source"}]}]},{"title":{"default":"IP Masquerading","localized":"routing-masquerading-form-title"},"sections":[{"repeat":"networking.routing.masquerading.*.enabled","empty":{"default":"(no masquerading configured)","localized":"routing-no-masquerading-configured-note"},"delete":"networking.routing.masquerading.*.delete","add":"networking.routing.addmasquerading","fields":[{"title":{"default":"Enabled","localized":"routing-masquerading-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.routing.masquerading.*.enabled"},{"title":{"default":"Interface","localized":"routing-masquerading-interface-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.masquerading.*.interface"}]},{"title":{"default":"Add Masquerading","localized":"routing-add-masquerading-section-title"},"action":{"title":{"default":"Add","localized":"routing-add-static-route-button-title"},"method":"networking.routing.addmasquerading","type":"add"},"fields":[{"title":{"default":"Enabled","localized":"routing-masquerading-enabled-field-title"},"control":{"type":"checkbox"},"argument":"enabled"},{"title":{"default":"Interface","localized":"routing-masquerading-interface-field-title"},"control":{"type":"textfield"},"argument":"interface"}]}]},{"title":{"default":"Port Forwarding","localized":"routing-portforwarding-form-title"},"sections":[{"repeat":"networking.routing.portforwarding.*.enabled","empty":{"default":"(no Port Forwarding configured)","localized":"routing-no-portforwarding-configured-note"},"delete":"networking.routing.portforwarding.*.delete","add":"networking.routing.addportforwarding","fields":[{"title":{"default":"Enabled","localized":"routing-portforwarding-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.routing.portforwarding.*.enabled"},{"title":{"default":"Interface","localized":"routing-portforwarding-interface-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.portforwarding.*.interface"},{"title":{"default":"Port","localized":"routing-portforwarding-port-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.portforwarding.*.port"},{"title":{"default":"Protocol","localized":"routing-portforwarding-protocol-field-title"},"control":{"type":"dropdown","items":[{"title":{"default":"TCP/UDP","localized":"routing-portforwarding-protocol-tcpudp"},"value":"tcpudp"},{"title":{"default":"TCP","localized":"routing-portforwarding-protocol-tcp"},"value":"tcp"},{"title":{"default":"UDP","localized":"routing-portforwarding-protocol-udp"},"value":"udp"}]},"parameter":"networking.routing.portforwarding.*.protocol"},{"title":{"default":"Destination Address","localized":"routing-portforwarding-destination-address-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.portforwarding.*.destination.address"},{"title":{"default":"Destination Port","localized":"routing-portforwarding-destination-port-field-title"},"control":{"type":"textfield"},"parameter":"networking.routing.portforwarding.*.destination.port"}]},{"title":{"default":"Add Port Forwarding","localized":"routing-add-portforwarding-section-title"},"action":{"title":{"default":"Add","localized":"routing-add-static-route-button-title"},"method":"networking.routing.addportforwarding","type":"add"},"fields":[{"title":{"default":"Enabled","localized":"routing-portforwarding-enabled-field-title"},"control":{"type":"checkbox"},"argument":"enabled"},{"title":{"default":"Interface","localized":"routing-portforwarding-interface-field-title"},"control":{"type":"textfield"},"argument":"interface"},{"title":{"default":"Port","localized":"routing-portforwarding-port-field-title"},"control":{"type":"textfield"},"argument":"port"},{"title":{"default":"Protocol","localized":"routing-portforwarding-protocol-field-title"},"control":{"type":"dropdown","items":[{"title":{"default":"TCP/UDP","localized":"routing-portforwarding-protocol-tcpudp"},"value":"tcpudp"},{"title":{"default":"TCP","localized":"routing-portforwarding-protocol-tcp"},"value":"tcp"},{"title":{"default":"UDP","localized":"routing-portforwarding-protocol-udp"},"value":"udp"}]},"argument":"protocol"},{"title":{"default":"Destination Address","localized":"routing-portforwarding-destination-address-field-title"},"control":{"type":"textfield"},"argument":"destinationAddress"},{"title":{"default":"Destination Port","localized":"routing-portforwarding-destination-port-field-title"},"control":{"type":"textfield"},"argument":"destinationPort"}]}]}]}')
    }
    ])
}
));
//# sourceMappingURL=networking.js.map
