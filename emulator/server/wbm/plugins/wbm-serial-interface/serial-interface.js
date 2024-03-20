/*!
 * @wago/wbm-serial-interface@1.1.0
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
 *
 *
 *
 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["serial-interface"] = t() : e["serial-interface"] = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                return e[t]
            }.bind(null, i));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 0)
    }([function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, l)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, r, i, o, a = {
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
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
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
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, l])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0}), base.plugin.register("wbm-serial-interface", (function (e) {
            return r(this, void 0, void 0, (function () {
                var t;
                return i(this, (function (r) {
                    return t = n(1), [2, {
                        id: "serial-interface",
                        title: {fallback: "Serial Interface", key: "serial-interface-title"},
                        description: {fallback: "Assigns owner of serial interface", key: "serial-interface-key"},
                        priority: 300,
                        controller: e.viewGenerator.generate(e, t)
                    }]
                }))
            }))
        }))
    }, function (e) {
        e.exports = JSON.parse('{"title":{"default":"Configuration of Serial Interface RS232/RS485","localized":"serial-interface-page-title"},"note":{"default":"Changes will take effect after next device reboot.\\n\\nCaution! Switching the owner of the serial Interface can harm the RS485 devices connected to the interface.","localized":"serial-interface-page-note"},"content":[{"title":{"default":"Serial Interface assigned to","localized":"title-assigned-serial-interface"},"sections":[{"fields":[{"title":{"default":"","localized":"no-serial-interface-title"},"parameter":"rs232.owner.current","control":{"type":"textfield"}}]}]},{"note":{"default":"Active after next reboot","localized":"serial-interface-assign-owner-note"},"title":{"default":"Assign Owner of Serial Interface","localized":"serial-interface-assign-owner-title"},"sections":[{"fields":[{"parameter":"rs232.owner.configured","control":{"type":"dropdown","items":[{"title":{"default":"Unassigned (usage by Applications, Libraries, PLC Runtime)","localized":"serial-interface-assign-item1"},"value":"None"},{"title":{"default":"Linux Console","localized":"serial-interface-assign-item2"},"value":"Linux"}]}}]}]}]}')
    }])
}));
//# sourceMappingURL=serial-interface.js.map