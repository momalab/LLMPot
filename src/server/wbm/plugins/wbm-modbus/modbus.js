/*!
 * @wago/wbm-modbus@1.1.0
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
 *     Modbus configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.modbus = t() : e.modbus = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function o(n) {
            if (t[n])
                return t[n].exports;
            var r = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(r.exports, r, r.exports, o),
            r.l = !0,
            r.exports
        }
        return o.m = e,
        o.c = t,
        o.d = function(e, t, n) {
            o.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }
        ,
        o.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        o.t = function(e, t) {
            if (1 & t && (e = o(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var n = Object.create(null);
            if (o.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    o.d(n, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return n
        }
        ,
        o.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return o.d(t, "a", t),
            t
        }
        ,
        o.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        o.p = "",
        o(o.s = 0)
    }([function(e, t, o) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, o, n) {
            return new (o || (o = Promise))((function(r, i) {
                function u(e) {
                    try {
                        a(n.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        a(n.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function a(e) {
                    e.done ? r(e.value) : new o((function(t) {
                        t(e.value)
                    }
                    )).then(u, l)
                }
                a((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var o, n, r, i, u = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; u; )
                            try {
                                if (o = 1,
                                n && (r = 2 & i[0] ? n.return : i[0] ? n.throw || ((r = n.return) && r.call(n),
                                0) : n.next) && !(r = r.call(n, i[1])).done)
                                    return r;
                                switch (n = 0,
                                r && (i = [2 & i[0], r.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    r = i;
                                    break;
                                case 4:
                                    return u.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++,
                                    n = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = u.ops.pop(),
                                    u.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = u.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                        u.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && u.label < r[1]) {
                                        u.label = r[1],
                                        r = i;
                                        break
                                    }
                                    if (r && u.label < r[2]) {
                                        u.label = r[2],
                                        u.ops.push(i);
                                        break
                                    }
                                    r[2] && u.ops.pop(),
                                    u.trys.pop();
                                    continue
                                }
                                i = t.call(e, u)
                            } catch (e) {
                                i = [6, e],
                                n = 0
                            } finally {
                                o = r = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = o(1);
        base.plugin.register("wbm-modbus", (function(e) {
            return n(this, void 0, void 0, (function() {
                var t;
                return r(this, (function(n) {
                    return t = o(2),
                    [2, {
                        id: "modbus",
                        title: {
                            fallback: "Modbus®",
                            key: "modbus-menu-entry"
                        },
                        priority: 100,
                        controller: e.viewGenerator.generate(e, t),
                        userRoles: [i.UserRoles.admin, i.UserRoles.user]
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, o) {
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
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Modbus® Services Configuration","localized":"modbus-service-configuration-page-title"},"note":{"default":"Changes will take effect immediately.","localized":"modbus-service-configuration-page-note"},"content":[{"title":{"default":"Modbus®","localized":"modbus-not-available-form-title"},"hidden":"networking.ports.modbus.available is true","note":{"default":"Not available as long as e!RUNTIME is not being used.","localized":"modbus-not-available-note"},"sections":[]},{"hidden":"networking.ports.modbus.available is false","title":{"default":"Modbus® TCP Slave","localized":"modbus-tcp-form-title"},"sections":[{"fields":[{"title":{"default":"Service Active","localized":"modbus-tcp-field-title"},"parameter":"networking.ports.modbus.tcp","control":{"type":"checkbox"}}]}]},{"hidden":"networking.ports.modbus.available is false","title":{"default":"Modbus® UDP Slave","localized":"modbus-udp-form-title"},"sections":[{"fields":[{"title":{"default":"Service Active","localized":"modbus-udp-field-title"},"parameter":"networking.ports.modbus.udp","control":{"type":"checkbox"}}]}]}]}')
    }
    ])
}
));
//# sourceMappingURL=modbus.js.map
