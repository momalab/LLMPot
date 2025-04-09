/*!
 * @wago/wbm-security@1.2.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *     Johann Dück <johann.dueck@wago.com>
 *   Marius Hellmeier <marius.hellmeier@wago.com>
 *   Stefanie Meihöfer <stefanie.meihoefer@wago.com>
 *
 *   Description:
 *     This is the security anchor Project
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.security = t() : e.security = t()
}(window, (function() {
    return function(e) {
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
        r(r.s = 0)
    }([function(e, t, r) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, r, n) {
            return new (r || (r = Promise))((function(i, o) {
                function u(e) {
                    try {
                        a(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    try {
                        a(n.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(e) {
                    e.done ? i(e.value) : new r((function(t) {
                        t(e.value)
                    }
                    )).then(u, l)
                }
                a((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var r, n, i, o, u = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function l(o) {
                return function(l) {
                    return function(o) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; u; )
                            try {
                                if (r = 1,
                                n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                0) : n.next) && !(i = i.call(n, o[1])).done)
                                    return i;
                                switch (n = 0,
                                i && (o = [2 & o[0], i.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return u.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++,
                                    n = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = u.ops.pop(),
                                    u.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        u.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && u.label < i[1]) {
                                        u.label = i[1],
                                        i = o;
                                        break
                                    }
                                    if (i && u.label < i[2]) {
                                        u.label = i[2],
                                        u.ops.push(o);
                                        break
                                    }
                                    i[2] && u.ops.pop(),
                                    u.trys.pop();
                                    continue
                                }
                                o = t.call(e, u)
                            } catch (e) {
                                o = [6, e],
                                n = 0
                            } finally {
                                r = i = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1);
        base.plugin.register("wbm-security", (function(e) {
            return n(this, void 0, void 0, (function() {
                var t, u;
                return i(this, (function(l) {
                    return t = r(2),
                    function(e) {
                        var t = this;
                        e.parameter.observe("security.tls", {
                            kind: "change",
                            maxHistoryLength: 0,
                            throttleTime: 0
                        }, (function(r, o, u) {
                            return n(t, void 0, void 0, (function() {
                                return i(this, (function(t) {
                                    return e.parameter.execute("security.restart.webserver"),
                                    [2]
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }(e),
                    (u = e.subframeGenerator.createSubFrame("security", e, ["security-area"])).registerSubMenuItem({
                        id: "tls",
                        title: e.localization.localized({
                            key: "tls-menu-item-title",
                            fallback: "TLS"
                        }),
                        priority: 0
                    }, e.viewGenerator.generate(e, t)),
                    [2, {
                        id: "security",
                        title: {
                            fallback: "Security",
                            key: "security-title"
                        },
                        description: {
                            fallback: "A plugin for all security sites",
                            key: "security-plugin-description"
                        },
                        priority: 800,
                        userRoles: [o.UserRoles.admin],
                        controller: u
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, r) {
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
        e.exports = JSON.parse('{"title":{"default":"Security Settings","localized":"security-tls-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-security-tls-configuration"},"content":[{"title":{"default":"TLS Configuration","localized":"title-security-telnet-configuration"},"sections":[{"fields":[{"title":{"default":"TLS Configuration","localized":"security-tls-state-label"},"parameter":"security.tls","control":{"type":"dropdown","items":[{"title":{"default":"Standard","localized":"security-tls-standard"},"value":"standard"},{"title":{"default":"Strong","localized":"security-tls-strong"},"value":"strong"}]}}]}]}]}')
    }
    ])
}
));
//# sourceMappingURL=security.js.map
