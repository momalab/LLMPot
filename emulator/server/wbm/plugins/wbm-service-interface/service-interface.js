/*!
 * @wago/wbm-service-interface@1.1.0
 *
 *   Copyright Â© 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *
 *
 *   Description:
 *     This is the service interface plugin
 *
 *
 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["service-interface"] = t() : e["service-interface"] = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {i: n, l: !1, exports: {}};
            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
        }

        return r.m = e, r.c = t, r.d = function (e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
        }, r.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, r.t = function (e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) r.d(n, i, function (t) {
                return e[t]
            }.bind(null, i));
            return n
        }, r.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 0)
    }([function (e, t, r) {
        "use strict";
        var n = this && this.__awaiter || function (e, t, r, n) {
            return new (r || (r = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) {
                        e(t)
                    }))).then(a, l)
                }

                c((n = n.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var r, n, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function l(o) {
                return function (l) {
                    return function (o) {
                        if (r) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                            switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, n = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], n = 0
                        } finally {
                            r = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, l])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = r(1);
        base.plugin.register("wbm-service-interface", (function (e) {
            return n(this, void 0, void 0, (function () {
                var t;
                return i(this, (function (n) {
                    return t = r(2), [2, {
                        id: "service-interface",
                        title: {fallback: "Service Interface", key: "service-interface-title"},
                        description: {fallback: "Assigns owner of service interface", key: "service-interface-key"},
                        priority: 290,
                        controller: e.viewGenerator.generate(e, t),
                        userRoles: [o.UserRoles.admin]
                    }]
                }))
            }))
        }))
    }, function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e.admin = "admin", e.user = "user", e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }, function (e) {
        e.exports = JSON.parse('{"title":{"default":"Configuration of Service Interface","localized":"serial-service-interface-page-title"},"note":{"default":"Changes will take effect after next device reboot.","localized":"serial-service-interface-page-note"},"content":[{"title":{"default":"Service Interface assigned to","localized":"title-assigned-serial-service-interface"},"sections":[{"fields":[{"title":{"default":"","localized":"no-serial-service-interface-title"},"parameter":"serviceinterface.serial.owner.current","control":{"type":"dropdown","items":[{"title":{"default":"WAGO Service Communication","localized":"serial-service-interface-enum-item1"},"value":"service"},{"title":{"default":"Linux Console","localized":"serial-service-interface-enum-item2"},"value":"linux"},{"title":{"default":"Unassigned (usage by applications, libraries, PLC Runtime)","localized":"serial-service-interface-enum-item3"},"value":"free"}]}}]}]},{"note":{"default":"Active after next reboot","localized":"serial-service-interface-assign-owner-note"},"title":{"default":"Assign Owner of Service Interface","localized":"serial-service-interface-assign-owner-title"},"sections":[{"fields":[{"parameter":"serviceinterface.serial.owner.configured","control":{"type":"dropdown","items":[{"title":{"default":"WAGO Service Communication","localized":"serial-service-interface-enum-item1"},"value":"service"},{"title":{"default":"Linux Console","localized":"serial-service-interface-enum-item2"},"value":"linux"},{"title":{"default":"Unassigned (usage by applications, libraries, PLC Runtime)","localized":"serial-service-interface-enum-item3"},"value":"free"}]}}]}]}]}')
    }])
}));
//# sourceMappingURL=service-interface.js.map