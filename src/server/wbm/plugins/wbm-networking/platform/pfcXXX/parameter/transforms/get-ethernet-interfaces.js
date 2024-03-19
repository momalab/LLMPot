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
this["/get-ethernet-interfaces"] = function(e) {
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
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function u(e) {
                try {
                    f(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    f(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function f(e) {
                e.done ? o(e.value) : new n((function(t) {
                    t(e.value)
                }
                )).then(u, a)
            }
            f((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, u = {
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
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; u; )
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
                                return u.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                u.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = u.ops.pop(),
                                u.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    u = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    u.label = i[1];
                                    break
                                }
                                if (6 === i[0] && u.label < o[1]) {
                                    u.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && u.label < o[2]) {
                                    u.label = o[2],
                                    u.ops.push(i);
                                    break
                                }
                                o[2] && u.ops.pop(),
                                u.trys.pop();
                                continue
                            }
                            i = t.call(e, u)
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
                }([i, a])
            }
        }
    }
    ;
    function i(e, t) {
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
                    return [2, i((n = r.sent()).map((function(e) {
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
    t.chunk = i
}
, function(e, t, n) {
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
    var i = function() {
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
    t.LinkMode = i,
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
}
, , function(e, t) {
    e.exports = function e(t, n) {
        "use strict";
        var r, o, i = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, u = /(^[ ]*|[ ]*$)/g, a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, f = /^0x[0-9a-f]+$/i, l = /^0/, c = function(t) {
            return e.insensitive && ("" + t).toLowerCase() || "" + t
        }, s = c(t).replace(u, "") || "", p = c(n).replace(u, "") || "", d = s.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), h = p.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), v = parseInt(s.match(f), 16) || 1 !== d.length && s.match(a) && Date.parse(s), g = parseInt(p.match(f), 16) || v && p.match(a) && Date.parse(p) || null;
        if (g) {
            if (v < g)
                return -1;
            if (v > g)
                return 1
        }
        for (var w = 0, b = Math.max(d.length, h.length); w < b; w++) {
            if (r = !(d[w] || "").match(l) && parseFloat(d[w]) || d[w] || 0,
            o = !(h[w] || "").match(l) && parseFloat(h[w]) || h[w] || 0,
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
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(1);
    t.default = function(e) {
        var t = n(3)
          , o = "networking.ethernet.interfaces";
        if (e instanceof Error)
            return {
                "networking.ethernet.interfaces.0.label": e,
                "networking.ethernet.interfaces.0.state": e,
                "networking.ethernet.interfaces.0.speedduplex": e
            };
        var i = JSON.parse(e).sort((function(e, n) {
            return t(e.device, n.device)
        }
        ))
          , u = {};
        return i.forEach((function(e, t) {
            u[o + "." + t + ".label"] = e.device,
            u[o + "." + t + ".state"] = "up" === e.state,
            u[o + "." + t + ".speedduplex"] = "on" === e.autonegotiation ? "autonegotiation" : r.LinkMode.toString({
                speed: e.speed,
                duplex: e.duplex
            })
        }
        )),
        u
    }
}
]).default;
//# sourceMappingURL=get-ethernet-interfaces.js.map
