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
this["/get-supported-link-modes"] = function(e) {
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
    n(n.s = 14)
}({
    0: function(e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, u) {
                function i(e) {
                    try {
                        f(r.next(e))
                    } catch (e) {
                        u(e)
                    }
                }
                function a(e) {
                    try {
                        f(r.throw(e))
                    } catch (e) {
                        u(e)
                    }
                }
                function f(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(i, a)
                }
                f((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, r, o, u, i = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return u = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (u[Symbol.iterator] = function() {
                return this
            }
            ),
            u;
            function a(u) {
                return function(a) {
                    return function(u) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (n = 1,
                                r && (o = 2 & u[0] ? r.return : u[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, u[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (u = [2 & u[0], o.value]),
                                u[0]) {
                                case 0:
                                case 1:
                                    o = u;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: u[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    r = u[1],
                                    u = [0];
                                    continue;
                                case 7:
                                    u = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === u[0] || 2 === u[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === u[0] && (!o || u[1] > o[0] && u[1] < o[3])) {
                                        i.label = u[1];
                                        break
                                    }
                                    if (6 === u[0] && i.label < o[1]) {
                                        i.label = o[1],
                                        o = u;
                                        break
                                    }
                                    if (o && i.label < o[2]) {
                                        i.label = o[2],
                                        i.ops.push(u);
                                        break
                                    }
                                    o[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                u = t.call(e, i)
                            } catch (e) {
                                u = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & u[0])
                            throw u[1];
                        return {
                            value: u[0] ? u[1] : void 0,
                            done: !0
                        }
                    }([u, a])
                }
            }
        }
        ;
        function u(e, t) {
            for (var n = []; e.length; )
                n.push(e.splice(0, t));
            return n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.capitalizeFirstLetter = function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }
        ,
        t.getParameterValues = function(e, t) {
            return r(this, void 0, void 0, (function() {
                var n;
                return o(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(t)];
                    case 1:
                        return [2, u((n = r.sent()).map((function(e) {
                            return e.value
                        }
                        )), n.length / t.length)]
                    }
                }
                ))
            }
            ))
        }
        ,
        t.chunk = u
    },
    1: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r, o = n(0);
        !function(e) {
            e.on = "on",
            e.off = "off",
            e.unknown = "unknown"
        }(t.Autonegotiation || (t.Autonegotiation = {})),
        function(e) {
            e.half = "half",
            e.full = "full",
            e.unknown = "unknown"
        }(r = t.Duplex || (t.Duplex = {})),
        function(e) {
            e.up = "up",
            e.down = "down",
            e.unknown = "unknown"
        }(t.LinkState || (t.LinkState = {}));
        var u = function() {
            function e() {}
            return e.fromString = function(t) {
                var n = e.pattern.exec(t);
                return n ? {
                    speed: parseInt(n[1]),
                    duplex: r.fromString(n[2])
                } : {
                    speed: 0,
                    duplex: r.unknown
                }
            }
            ,
            e.toString = function(e) {
                var t = e.speed
                  , n = e.duplex;
                return void 0 === t && (t = 100),
                void 0 === n && (n = r.full),
                t.toString() + " Mbit/s " + o.capitalizeFirstLetter(n) + " Duplex"
            }
            ,
            e.pattern = /^(\d+) Mbit\/s (Full|Half) Duplex$/,
            e
        }();
        t.LinkMode = u,
        function(e) {
            e.fromString = function(t) {
                for (var n in t = t.toLowerCase(),
                e)
                    if (n.toString() === t)
                        return n;
                return e.unknown
            }
        }(t.Autonegotiation || (t.Autonegotiation = {})),
        function(e) {
            e.fromString = function(t) {
                for (var n in t = t.toLowerCase(),
                e)
                    if (n.toString() === t)
                        return n;
                return e.unknown
            }
        }(r = t.Duplex || (t.Duplex = {})),
        function(e) {
            e.fromString = function(t) {
                for (var n in t = t.toLowerCase(),
                e)
                    if (n.toString() === t)
                        return n;
                return e.unknown
            }
        }(t.LinkState || (t.LinkState = {}))
    },
    14: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(1);
        t.default = function(e) {
            var t = n(3);
            if (e instanceof Error)
                return {
                    "networking.ethernet.interfaces.0.supportedlinkmodes": e,
                    "networking.ethernet.interfaces.0.autonegsupported": e
                };
            var o = JSON.parse(e).sort((function(e, n) {
                return t(e.name, n.name)
            }
            ))
              , u = {};
            return o.forEach((function(e, t) {
                var n = e.supportedlinkmodes.map((function(e) {
                    return r.LinkMode.toString({
                        speed: e.speed,
                        duplex: e.duplex.toLowerCase()
                    })
                }
                ));
                u["networking.ethernet.interfaces." + t + ".supportedlinkmodes"] = n,
                u["networking.ethernet.interfaces." + t + ".autonegsupported"] = e.autonegsupported
            }
            )),
            u
        }
    },
    3: function(e, t) {
        e.exports = function e(t, n) {
            "use strict";
            var r, o, u = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, i = /(^[ ]*|[ ]*$)/g, a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, f = /^0x[0-9a-f]+$/i, l = /^0/, c = function(t) {
                return e.insensitive && ("" + t).toLowerCase() || "" + t
            }, s = c(t).replace(i, "") || "", p = c(n).replace(i, "") || "", d = s.replace(u, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), h = p.replace(u, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), g = parseInt(s.match(f), 16) || 1 !== d.length && s.match(a) && Date.parse(s), w = parseInt(p.match(f), 16) || g && p.match(a) && Date.parse(p) || null;
            if (w) {
                if (g < w)
                    return -1;
                if (g > w)
                    return 1
            }
            for (var v = 0, b = Math.max(d.length, h.length); v < b; v++) {
                if (r = !(d[v] || "").match(l) && parseFloat(d[v]) || d[v] || 0,
                o = !(h[v] || "").match(l) && parseFloat(h[v]) || h[v] || 0,
                isNaN(r) !== isNaN(o))
                    return isNaN(r) ? 1 : -1;
                if (typeof r != typeof o && (r += "",
                o += ""),
                r < o)
                    return -1;
                if (r > o)
                    return 1
            }
            return 0
        }
    }
}).default;
//# sourceMappingURL=get-supported-link-modes.js.map
