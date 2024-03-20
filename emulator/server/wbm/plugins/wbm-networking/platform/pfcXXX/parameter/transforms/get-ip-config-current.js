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
this["/get-ip-config-current"] = function(e) {
    var t = {};
    function r(n) {
        if (t[n])
            return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r),
        i.l = !0,
        i.exports
    }
    return r.m = e,
    r.c = t,
    r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    r.t = function(e, t) {
        if (1 & t && (e = r(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (r.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var i in e)
                r.d(n, i, function(t) {
                    return e[t]
                }
                .bind(null, i));
        return n
    }
    ,
    r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return r.d(t, "a", t),
        t
    }
    ,
    r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    r.p = "",
    r(r.s = 12)
}({
    0: function(e, t, r) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, r, n) {
            return new (r || (r = Promise))((function(i, u) {
                function o(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        u(e)
                    }
                }
                function a(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        u(e)
                    }
                }
                function c(e) {
                    e.done ? i(e.value) : new r((function(t) {
                        t(e.value)
                    }
                    )).then(o, a)
                }
                c((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var r, n, i, u, o = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
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
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (r = 1,
                                n && (i = 2 & u[0] ? n.return : u[0] ? n.throw || ((i = n.return) && i.call(n),
                                0) : n.next) && !(i = i.call(n, u[1])).done)
                                    return i;
                                switch (n = 0,
                                i && (u = [2 & u[0], i.value]),
                                u[0]) {
                                case 0:
                                case 1:
                                    i = u;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: u[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    n = u[1],
                                    u = [0];
                                    continue;
                                case 7:
                                    u = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === u[0] || 2 === u[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === u[0] && (!i || u[1] > i[0] && u[1] < i[3])) {
                                        o.label = u[1];
                                        break
                                    }
                                    if (6 === u[0] && o.label < i[1]) {
                                        o.label = i[1],
                                        i = u;
                                        break
                                    }
                                    if (i && o.label < i[2]) {
                                        o.label = i[2],
                                        o.ops.push(u);
                                        break
                                    }
                                    i[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                u = t.call(e, o)
                            } catch (e) {
                                u = [6, e],
                                n = 0
                            } finally {
                                r = i = 0
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
            for (var r = []; e.length; )
                r.push(e.splice(0, t));
            return r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.capitalizeFirstLetter = function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }
        ,
        t.getParameterValues = function(e, t) {
            return n(this, void 0, void 0, (function() {
                var r;
                return i(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, e.parameter.read(t)];
                    case 1:
                        return [2, u((r = n.sent()).map((function(e) {
                            return e.value
                        }
                        )), r.length / t.length)]
                    }
                }
                ))
            }
            ))
        }
        ,
        t.chunk = u
    },
    12: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(2);
        t.default = function(e) {
            var t, r = "networking.tcpip.interfaces";
            if (e instanceof Error)
                return (t = {})[r + ".0.current.ipaddress"] = e,
                t[r + ".0.current.subnetmask"] = e,
                t;
            var i = {}
              , u = JSON.parse(e);
            return Object.keys(u).sort(n.sortWithPriority).forEach((function(e, t) {
                var n = u[e];
                i[r + "." + t + ".current.ipaddress"] = n.ipaddr,
                i[r + "." + t + ".current.subnetmask"] = n.netmask
            }
            )),
            i
        }
    },
    2: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(0);
        t.DefaultBridgeName = /^(br|wwan)[\d]+$/,
        t.sortWithPriority = function(e, r, n) {
            void 0 === n && (n = t.DefaultBridgeName);
            var i = n.test(e)
              , u = n.test(r);
            return i && !u ? -1 : !i && u ? 1 : e.localeCompare(r, void 0, {
                numeric: !0,
                sensitivity: "base"
            })
        }
        ,
        t.createBridgeLabel = function(e) {
            var t = i.exec(e);
            if (t) {
                var r = t[1]
                  , o = t[2];
                if (r in u) {
                    var a = parseInt(o);
                    return u[r] + " " + (a + 1)
                }
            }
            return "Bridge " + n.capitalizeFirstLetter(e)
        }
        ,
        t.getBridgeIndex = function(e) {
            var t = i.exec(e);
            if (t)
                return parseInt(t[2], 10)
        }
        ;
        var i = /^([a-zA-Z]+)([0-9]+)$/
          , u = {
            br: "Bridge",
            wwan: "WWAN"
        }
    }
}).default;
//# sourceMappingURL=get-ip-config-current.js.map
