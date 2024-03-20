/*!
 * @wago/wbm-user@1.2.2
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
 *
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.user = t() : e.user = t()
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
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(i, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, r, o, a, i = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function l(a) {
                return function(l) {
                    return function(a) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (n = 1,
                                r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, a[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (a = [2 & a[0], o.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    o = a;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                        i.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && i.label < o[1]) {
                                        i.label = o[1],
                                        o = a;
                                        break
                                    }
                                    if (o && i.label < o[2]) {
                                        i.label = o[2],
                                        i.ops.push(a);
                                        break
                                    }
                                    o[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                a = t.call(e, i)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , i = n(2);
        base.plugin.register("wbm-user", (function(e) {
            return r(this, void 0, void 0, (function() {
                var t, n, l = this;
                return o(this, (function(s) {
                    switch (s.label) {
                    case 0:
                        return (t = e.authentication.getActiveUser()).hasDefaultPassword ? [4, e.parameter.observe("changeuserpassword", {
                            kind: "called"
                        }, (function(a, i) {
                            return r(l, void 0, void 0, (function() {
                                return o(this, (function(r) {
                                    switch (r.label) {
                                    case 0:
                                        return [4, e.parameter.execute("hasdefaultpassword", {
                                            username: t.name
                                        })];
                                    case 1:
                                        return "0" === r.sent().returnValue && (e.authentication.updateActiveUser({
                                            hasDefaultPassword: !1
                                        }),
                                        n.cancel()),
                                        [2]
                                    }
                                }
                                ))
                            }
                            ))
                        }
                        ))] : [3, 2];
                    case 1:
                        n = s.sent(),
                        s.label = 2;
                    case 2:
                        return [2, {
                            id: "users",
                            title: {
                                fallback: "Users",
                                key: "users-label"
                            },
                            description: {
                                fallback: "WBM User Settings",
                                key: "wbm-user-settings"
                            },
                            priority: 0,
                            userRoles: [a.UserRoles.admin],
                            controller: e.viewGenerator.generate(e, i)
                        }]
                    }
                }
                ))
            }
            ))
        }
        ))
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
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"WBM User Configuration","localized":"user-configuration-page-title"},"note":{"default":"Changes will take effect immediately.\\n\\nFor reasons of security, we strongly recommend that you change all passwords including those of Linux ® users. For details, please refer to the manual.","localized":"user-configuration-page-note"},"content":[{"title":{"default":"Change Passwords","localized":"change-passwords-form-title"},"sections":[{"fields":[{"title":{"default":"Select User","localized":"select-user-label"},"control":{"type":"dropdown","items":[{"title":{"default":"admin","localized":"admin"},"value":"admin"},{"title":{"default":"user","localized":"user"},"value":"user"}]},"argument":"username"},{"title":{"default":"Old Password","localized":"old-password-label"},"control":{"type":"textfield","options":{"masked":true},"validation":{"pattern":"^.+$","hint":{"default":"Cannot be empty","localized":"validation-hint-cannot-be-empty"}}},"argument":"old"},{"title":{"default":"New Password","localized":"new-password-label"},"control":{"type":"textfield","options":{"masked":true},"validation":{"pattern":"^[a-zA-Z0-9!\\"#$%&\'()*+,./:;<=>?@\\\\[\\\\^_`\\\\{|\\\\}~\\\\-]{1,100}$","hint":{"default":"1 to 100 of: a-zA-Z0-9!\\"#$%&\'()*+,./:;<=>?@[^_`{|}~-","localized":"validation-hint-new-password"}}},"argument":"new"},{"title":{"default":"Confirm Password","localized":"confirm-password-label"},"control":{"type":"textfield","options":{"masked":true},"validation":{"pattern":"^[a-zA-Z0-9!\\"#$%&\'()*+,./:;<=>?@\\\\[\\\\^_`\\\\{|\\\\}~\\\\-]{1,100}$","hint":{"default":"1 to 100 of: a-zA-Z0-9!\\"#$%&\'()*+,./:;<=>?@[^_`{|}~-","localized":"validation-hint-new-password"}}},"argument":"confirm"}],"action":{"title":{"default":"Set Password","localized":"set-password-button-label"},"method":"changeuserpassword","type":"action"}}]}]}')
    }
    ])
}
));
//# sourceMappingURL=user.js.map
