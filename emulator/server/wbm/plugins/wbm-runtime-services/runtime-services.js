/*!
 * @wago/wbm-runtime-services@1.1.0
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
 *     CoDeSys and e!RUNTIME network service configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["runtime-services"] = t() : e["runtime-services"] = t()
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
                function l(e) {
                    try {
                        s(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(e) {
                    try {
                        s(n.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    e.done ? i(e.value) : new r((function(t) {
                        t(e.value)
                    }
                    )).then(l, a)
                }
                s((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var r, n, i, o, l = {
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
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function a(o) {
                return function(a) {
                    return function(o) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
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
                                    return l.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    n = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = l.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        l.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = o;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(o);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                o = t.call(e, l)
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
                    }([o, a])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1);
        base.plugin.register("wbm-runtime-services", (function(e) {
            return n(this, void 0, void 0, (function() {
                var t;
                return i(this, (function(n) {
                    return t = r(2),
                    [2, {
                        id: "runtime-services",
                        title: {
                            fallback: "PLC Runtime Services",
                            key: "runtime-services-menu-item-title"
                        },
                        priority: 600,
                        controller: e.viewGenerator.generate(e, t),
                        userRoles: [o.UserRoles.admin]
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
        e.exports = JSON.parse('{"title":{"default":"PLC Runtime Services","localized":"runtime-services-page-title"},"note":{"default":"Changes of e!Runtime port authentication or e!Runtime webserver state will take effect after the next controller reboot.\\nAll other changes will take effect immediately.","localized":"runtime-services-page-note"},"content":[{"title":{"default":"General Configuration","localized":"runtime-services-general-configuration-form-title"},"sections":[{"fields":[{"title":{"default":"Port Authentication Password","localized":"runtime-services-port-authentication-password-field-title"},"control":{"type":"textfield","options":{"masked":true}},"argument":"password"},{"title":{"default":"Confirm Password","localized":"runtime-services-port-authentication-confirm-password-field-title"},"control":{"type":"textfield","options":{"masked":true}},"argument":"confirm"}],"action":{"title":{"default":"Set Password","localized":"runtime-services-set-password-action-title"},"type":"action","method":"networking.ports.runtime.setpassword"}}]},{"title":{"default":"CODESYS 2","localized":"runtime-services-codesys2-form-title"},"hidden":"networking.ports.runtime.codesys2.available is false","sections":[{"fields":[{"title":{"default":"CODESYS 2 State","localized":"runtime-services-codesys2-state-field-title"},"control":{"type":"checkbox"},"options":{"readonly":true},"parameter":"networking.ports.runtime.codesys2.state"},{"title":{"default":"Webserver enabled","localized":"runtime-services-codesys2-webserver-field-title"},"control":{"type":"checkbox"},"parameter":"networking.ports.runtime.codesys2.webserverstate"},{"title":{"default":"Communication enabled","localized":"runtime-services-codesys2-communication-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.ports.runtime.codesys2.communication.state"},{"title":{"default":"Communication port number","localized":"runtime-services-codesys2-communication-port-field-title"},"control":{"type":"textfield"},"parameter":"networking.ports.runtime.codesys2.communication.port"},{"title":{"default":"Port Authentication enabled","localized":"runtime-services-codesys2-port-authentication-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.ports.runtime.codesys2.portauthentication"}]}]},{"title":{"default":"e!RUNTIME","localized":"runtime-services-eruntime-form-title"},"hidden":"networking.ports.runtime.eruntime.available is false","sections":[{"fields":[{"title":{"default":"e!RUNTIME","localized":"runtime-services-eruntime-state-field-title"},"control":{"type":"checkbox"},"options":{"readonly":true},"parameter":"networking.ports.runtime.eruntime.state"},{"title":{"default":"Webserver enabled","localized":"runtime-services-eruntime-webserver-field-title"},"control":{"type":"checkbox"},"parameter":"networking.ports.runtime.eruntime.webserverstate"},{"title":{"default":"Port Authentication enabled","localized":"runtime-services-eruntime-port-authentication-enabled-field-title"},"control":{"type":"checkbox"},"parameter":"networking.ports.runtime.eruntime.portauthentication"}]}]}]}')
    }
    ])
}
));
//# sourceMappingURL=runtime-services.js.map
