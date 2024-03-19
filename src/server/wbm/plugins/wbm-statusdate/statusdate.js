/*!
 * @wago/wbm-statusdate@1.1.0
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
 *     WBM-Plugin for show Date and Time in status area
 *
 *
 */
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.statusdate = e() : t.statusdate = e()
}(window, (function() {
    return function(t) {
        var e = {};
        function n(r) {
            if (e[r])
                return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = t,
        n.c = e,
        n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(t, e) {
            if (1 & e && (t = n(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var o in t)
                    n.d(r, o, function(e) {
                        return t[e]
                    }
                    .bind(null, o));
            return r
        }
        ,
        n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return n.d(e, "a", e),
            e
        }
        ,
        n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(t, e, n) {
        "use strict";
        var r = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(t) {
                    try {
                        s(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function u(t) {
                    try {
                        s(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    var e;
                    t.done ? o(t.value) : (e = t.value,
                    e instanceof n ? e : new n((function(t) {
                        t(e)
                    }
                    ))).then(a, u)
                }
                s((r = r.apply(t, e || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(t, e) {
            var n, r, o, i, a = {
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
                next: u(0),
                throw: u(1),
                return: u(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function u(i) {
                return function(u) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
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
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = e.call(t, a)
                            } catch (t) {
                                i = [6, t],
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
                    }([i, u])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(1);
        base.plugin.register("wbm-statusdate", (function(t) {
            return r(this, void 0, void 0, (function() {
                return o(this, (function(e) {
                    return [2, {
                        id: "statusdate",
                        priority: 0,
                        controller: new i.DateController(t)
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(t, e, n) {
        "use strict";
        var r, o = this && this.__extends || (r = function(t, e) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n])
            }
            )(t, e)
        }
        ,
        function(t, e) {
            function n() {
                this.constructor = t
            }
            r(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(t, e, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(t) {
                    try {
                        s(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function u(t) {
                    try {
                        s(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }
                function s(t) {
                    var e;
                    t.done ? o(t.value) : (e = t.value,
                    e instanceof n ? e : new n((function(t) {
                        t(e)
                    }
                    ))).then(a, u)
                }
                s((r = r.apply(t, e || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(t, e) {
            var n, r, o, i, a = {
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
                next: u(0),
                throw: u(1),
                return: u(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function u(i) {
                return function(u) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
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
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = e.call(t, a)
                            } catch (t) {
                                i = [6, t],
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
                    }([i, u])
                }
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var u = function(t) {
            function e(e) {
                var n = t.call(this, e) || this;
                return n.interpolationTimer = 0,
                n.view = document.createElement("div"),
                n.view.classList.add("status-area-child"),
                n
            }
            return o(e, t),
            e.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var t, e, n, r, o, u, s, c = this;
                    return a(this, (function(l) {
                        switch (l.label) {
                        case 0:
                            return this.date = new Date,
                            [4, this.base.parameter.read(["clock.time.local", "clock.date.local", "clock.time.format"])];
                        case 1:
                            return t = l.sent(),
                            e = t[0],
                            n = t[1],
                            r = t[2],
                            [e, n, r].some((function(t) {
                                return t.error
                            }
                            )) ? (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "failed-to-read-status-clock-modal-title",
                                    fallback: "Error"
                                }),
                                message: this.base.localization.localized({
                                    key: "failed-to-read-status-clock-modal-message",
                                    fallback: "Failed to read clock data."
                                })
                            }),
                            [2]) : (this.setTime(e.value),
                            this.setDate(n.value),
                            this.set12HourClockFormat("12-hour-format" == r.value),
                            o = this,
                            [4, this.base.parameter.observe("clock.time.local", {
                                kind: "sample",
                                interval: 30
                            }, (function(t, e) {
                                return i(c, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.setTime(e["clock.time.local"]),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))]);
                        case 2:
                            return o.timeObserver = l.sent(),
                            u = this,
                            [4, this.base.parameter.observe("clock.date.local", {
                                kind: "sample",
                                interval: 30
                            }, (function(t, e) {
                                return i(c, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.setDate(e["clock.date.local"]),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 3:
                            return u.dateObserver = l.sent(),
                            s = this,
                            [4, this.base.parameter.observe("clock.time.format", {
                                kind: "change",
                                throttleTime: 0
                            }, (function(t, e) {
                                return i(c, void 0, void 0, (function() {
                                    return a(this, (function(t) {
                                        return this.set12HourClockFormat("12-hour-format" === e),
                                        [2]
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 4:
                            return s.formatObserver = l.sent(),
                            this.updateDateDisplay(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.setTime = function(t) {
                var e = t.split(":").map((function(t) {
                    return parseInt(t, 10)
                }
                ))
                  , n = e[0]
                  , r = e[1]
                  , o = e[2];
                t.indexOf("PM") >= 0 && (n = (n + 12) % 24),
                this.date.setHours(n, r, o)
            }
            ,
            e.prototype.setDate = function(t) {
                var e = t.split(".").map((function(t) {
                    return parseInt(t, 10)
                }
                ))
                  , n = e[0]
                  , r = e[1]
                  , o = e[2];
                this.date.setFullYear(o, r - 1, n)
            }
            ,
            e.prototype.set12HourClockFormat = function(t) {
                this.useAmPm = t
            }
            ,
            e.prototype.updateDateDisplay = function() {
                var t = this;
                this.interpolationTimer && window.clearTimeout(this.interpolationTimer),
                null != this.date && (this.view.innerHTML = '<div taid="status-area-date">' + this.generateDateString() + '</div><div taid="status-area-time">' + this.generateTimeString() + "</div>",
                this.date = new Date(this.date.getTime() + 1e3),
                this.interpolationTimer = window.setTimeout((function() {
                    return t.updateDateDisplay()
                }
                ), 1e3))
            }
            ,
            e.prototype.generateDateString = function() {
                var t = this.date.getDate()
                  , e = this.date.getMonth() + 1;
                return (t < 10 ? "0" : "") + t + "." + (e < 10 ? "0" : "") + e + "." + this.date.getFullYear()
            }
            ,
            e.prototype.generateTimeString = function() {
                var t = this.date.getHours()
                  , e = this.date.getMinutes()
                  , n = this.date.getSeconds()
                  , r = "";
                return this.useAmPm && (0 === t ? (t = 12,
                r = " am") : 12 === t ? r = " pm" : t > 12 ? (t -= 12,
                r = " pm") : r = " am"),
                (t < 10 ? "0" + t : t) + ":" + (e < 10 ? "0" + e : e) + ":" + (n < 10 ? "0" + n : n) + r.toUpperCase()
            }
            ,
            e
        }(n(2).ViewController);
        e.DateController = u
    }
    , function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            function t(t) {
                this.base = t
            }
            return t.prototype.onRouteChange = function(t) {}
            ,
            t.prototype.unload = function() {}
            ,
            t
        }();
        e.ViewController = r
    }
    ])
}
));
//# sourceMappingURL=statusdate.js.map
