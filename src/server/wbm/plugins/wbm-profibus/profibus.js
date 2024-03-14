/*!
 * @wago/wbm-profibus@1.1.0
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
 *     Configuration of PROFIBUS fieldbus
 *
 *
 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.profibus = t() : e.profibus = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function r(s) {
            if (t[s]) return t[s].exports;
            var o = t[s] = {i: s, l: !1, exports: {}};
            return e[s].call(o.exports, o, o.exports, r), o.l = !0, o.exports
        }

        return r.m = e, r.c = t, r.d = function (e, t, s) {
            r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: s})
        }, r.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, r.t = function (e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var s = Object.create(null);
            if (r.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var o in e) r.d(s, o, function (t) {
                return e[t]
            }.bind(null, o));
            return s
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
        var s = this && this.__awaiter || function (e, t, r, s) {
            return new (r || (r = Promise))((function (o, n) {
                function a(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        n(e)
                    }
                }

                function i(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        n(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) {
                        e(t)
                    }))).then(a, i)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        }, o = this && this.__generator || function (e, t) {
            var r, s, o, n, a = {
                label: 0, sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                }, trys: [], ops: []
            };
            return n = {
                next: i(0),
                throw: i(1),
                return: i(2)
            }, "function" == typeof Symbol && (n[Symbol.iterator] = function () {
                return this
            }), n;

            function i(n) {
                return function (i) {
                    return function (n) {
                        if (r) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (r = 1, s && (o = 2 & n[0] ? s.return : n[0] ? s.throw || ((o = s.return) && o.call(s), 0) : s.next) && !(o = o.call(s, n[1])).done) return o;
                            switch (s = 0, o && (n = [2 & n[0], o.value]), n[0]) {
                                case 0:
                                case 1:
                                    o = n;
                                    break;
                                case 4:
                                    return a.label++, {value: n[1], done: !1};
                                case 5:
                                    a.label++, s = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!o || n[1] > o[0] && n[1] < o[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < o[1]) {
                                        a.label = o[1], o = n;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(n);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], s = 0
                        } finally {
                            r = o = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {value: n[0] ? n[1] : void 0, done: !0}
                    }([n, i])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = r(1);
        base.plugin.register("wbm-profibus", (function (e) {
            return s(this, void 0, void 0, (function () {
                var t, s, a;
                return o(this, (function (o) {
                    switch (o.label) {
                        case 0:
                            return t = r(2), s = e.viewGenerator.generate(e, t), a = {
                                kind: "called",
                                maxHistoryLength: 0
                            }, [4, e.parameter.observe("profibus.dp.slave.ssa.resetfactory", a, (function () {
                                s.load()
                            }))];
                        case 1:
                            return o.sent(), [2, {
                                id: "profibus",
                                title: {fallback: "PROFIBUS DP", key: "profibus-dp-title"},
                                description: {fallback: "PROFIBUS DP Configuration", key: "profibus-dp-description"},
                                priority: 80,
                                controller: s,
                                userRoles: [n.UserRoles.admin, n.UserRoles.user]
                            }]
                    }
                }))
            }))
        }))
    }, function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e.admin = "admin", e.user = "user", e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }, function (e) {
        e.exports = JSON.parse('{"title":{"default":"Configuration of PROFIBUS DP Slave","localized":"profibus-dp-slave-config-page-title"},"note":{"default":"Changes will take effect after next device reboot.","localized":"profibus-dp-slave-config-page-note"},"content":[{"title":{"default":"PROFIBUS Slave Address","localized":"profibus-slave-address-title"},"sections":[{"fields":[{"hidden":"profibus.dp.slave.ssa.user.address.assignment is true","title":{"default":"Stored slave address","localized":"profibus-dp-slave-stored-address-label"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"profibus.dp.slave.plc.user.address"},{"hidden":"profibus.dp.slave.ssa.user.address.assignment is false","title":{"default":"Stored slave address","localized":"profibus-dp-slave-stored-address-label"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"profibus.dp.slave.ssa.user.address"},{"title":{"default":"Slave address assigned by","localized":"profibus-dp-slave-address-assigned-by-label"},"control":{"type":"dropdown","items":[{"title":{"default":"Set-Slave-Address Service (SSA)","localized":"profibus-dp-slave-address-assigned-by-ssa"},"value":"true"},{"title":{"default":"PLC","localized":"profibus-dp-slave-address-assigned-by-plc"},"value":"false"}]},"options":{"readonly":true},"parameter":"profibus.dp.slave.ssa.user.address.assignment"},{"title":{"default":"Permission to change slave station address","localized":"profibus-dp-slave-address-change-permission-label"},"control":{"type":"checkbox"},"options":{"readonly":true},"parameter":"profibus.dp.slave.ssa.user.release"}],"action":{"title":{"default":"Reset SSA Values","localized":"profibus-dp-slave-ssa-reset-button-label"},"method":"profibus.dp.slave.ssa.resetfactory","type":"action"}}]}]}')
    }])
}));
//# sourceMappingURL=profibus.js.map