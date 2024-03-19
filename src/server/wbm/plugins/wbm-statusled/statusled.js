/*!
 * @wago/wbm-statusled@1.1.0
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
 *     Shows the LED state in status area
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.statusled = t() : e.statusled = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function r(o) {
            if (t[o])
                return t[o].exports;
            var n = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(n.exports, n, n.exports, r),
            n.l = !0,
            n.exports
        }
        return r.m = e,
        r.c = t,
        r.d = function(e, t, o) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
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
            var o = Object.create(null);
            if (r.r(o),
            Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var n in e)
                    r.d(o, n, function(t) {
                        return e[t]
                    }
                    .bind(null, n));
            return o
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
        var o = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, l) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function a(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, a)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
          , n = this && this.__generator || function(e, t) {
            var r, o, n, l, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
                },
                trys: [],
                ops: []
            };
            return l = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (l[Symbol.iterator] = function() {
                return this
            }
            ),
            l;
            function a(l) {
                return function(a) {
                    return function(l) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & l[0] ? o.return : l[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, l[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (l = [2 & l[0], n.value]),
                                l[0]) {
                                case 0:
                                case 1:
                                    n = l;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: l[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = l[1],
                                    l = [0];
                                    continue;
                                case 7:
                                    l = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === l[0] || 2 === l[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === l[0] && (!n || l[1] > n[0] && l[1] < n[3])) {
                                        i.label = l[1];
                                        break
                                    }
                                    if (6 === l[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = l;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(l);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                l = t.call(e, i)
                            } catch (e) {
                                l = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
                            }
                        if (5 & l[0])
                            throw l[1];
                        return {
                            value: l[0] ? l[1] : void 0,
                            done: !0
                        }
                    }([l, a])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = r(1);
        base.plugin.register("wbm-statusled", (function(e) {
            return o(this, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return [2, {
                        id: "statusled",
                        priority: 3,
                        controller: new l.PFCLEDController(e)
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
        var o, n = this && this.__extends || (o = function(e, t) {
            return (o = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var r in t)
                    t.hasOwnProperty(r) && (e[r] = t[r])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function r() {
                this.constructor = e
            }
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
            new r)
        }
        ), l = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, l) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function a(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, a)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , i = this && this.__generator || function(e, t) {
            var r, o, n, l, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
                },
                trys: [],
                ops: []
            };
            return l = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (l[Symbol.iterator] = function() {
                return this
            }
            ),
            l;
            function a(l) {
                return function(a) {
                    return function(l) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & l[0] ? o.return : l[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, l[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (l = [2 & l[0], n.value]),
                                l[0]) {
                                case 0:
                                case 1:
                                    n = l;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: l[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = l[1],
                                    l = [0];
                                    continue;
                                case 7:
                                    l = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === l[0] || 2 === l[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === l[0] && (!n || l[1] > n[0] && l[1] < n[3])) {
                                        i.label = l[1];
                                        break
                                    }
                                    if (6 === l[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = l;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(l);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                l = t.call(e, i)
                            } catch (e) {
                                l = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
                            }
                        if (5 & l[0])
                            throw l[1];
                        return {
                            value: l[0] ? l[1] : void 0,
                            done: !0
                        }
                    }([l, a])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = r(2)
          , s = {
            OFF: a.LEDColor.off,
            GRN: a.LEDColor.green,
            RED: a.LEDColor.red,
            YLW: a.LEDColor.yellow,
            BLINK_GRN: [a.LEDColor.green, a.LEDColor.off],
            BLINK_RED: [a.LEDColor.red, a.LEDColor.off],
            BLINK_YLW: [a.LEDColor.yellow, a.LEDColor.off],
            BLINK_GRN_RED: [a.LEDColor.green, a.LEDColor.red],
            BLINK_GRN_YLW: [a.LEDColor.green, a.LEDColor.yellow],
            BLINK_RED_YLW: [a.LEDColor.red, a.LEDColor.yellow],
            BLINK_OFF_GRN: [a.LEDColor.green, a.LEDColor.off],
            BLINK_OFF_RED: [a.LEDColor.red, a.LEDColor.off],
            BLINK_OFF_YLW: [a.LEDColor.yellow, a.LEDColor.off],
            BLINK_RED_GRN: [a.LEDColor.red, a.LEDColor.green],
            BLINK_YLW_GRN: [a.LEDColor.yellow, a.LEDColor.green],
            BLINK_YLW_RED: [a.LEDColor.yellow, a.LEDColor.red],
            ERR_SEQ_750: [a.LEDColor.red, a.LEDColor.off],
            FLASH_GRN_OFF: [a.LEDColor.green, a.LEDColor.off],
            FLASH_RED_OFF: [a.LEDColor.red, a.LEDColor.off],
            FLASH_YLW_OFF: [a.LEDColor.yellow, a.LEDColor.off],
            FLASH_GRN_RED: [a.LEDColor.green, a.LEDColor.red],
            FLASH_GRN_YLW: [a.LEDColor.green, a.LEDColor.yellow],
            FLASH_RED_GRN: [a.LEDColor.red, a.LEDColor.green],
            FLASH_RED_YLW: [a.LEDColor.red, a.LEDColor.yellow],
            FLASH_YLW_GRN: [a.LEDColor.yellow, a.LEDColor.green],
            FLASH_YLW_RED: [a.LEDColor.yellow, a.LEDColor.red],
            FLASH_OFF_GRN: [a.LEDColor.green, a.LEDColor.off],
            FLASH_OFF_RED: [a.LEDColor.red, a.LEDColor.off],
            FLASH_OFF_YLW: [a.LEDColor.yellow, a.LEDColor.off],
            SPECIAL_BLINK: [a.LEDColor.green, a.LEDColor.red],
            NOT_SET_LED: a.LEDColor.off,
            LED_ERROR: a.LEDColor.off
        }
          , d = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n(t, e),
            t.prototype.readAndUpdateLEDStates = function() {
                return l(this, void 0, void 0, (function() {
                    return i(this, (function(e) {
                        return this.base.parameter.read(["hardware.leds.*.color", "hardware.leds.*.message", "hardware.leds.*.date"]),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return l(this, void 0, void 0, (function() {
                    var t, r, o, n, l, d, u, c, f, p = this;
                    return i(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            return [4, e.prototype.load.call(this)];
                        case 1:
                            return i.sent(),
                            [4, this.base.parameter.read(["hardware.leds.*.name", "hardware.leds.*.color", "hardware.leds.*.message"])];
                        case 2:
                            if ((t = i.sent()).some((function(e) {
                                return !!e.error
                            }
                            )))
                                return this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: "failed-to-load-led-config-modal-title",
                                        fallback: "Error"
                                    }),
                                    message: this.base.localization.localized({
                                        key: "failed-to-load-led-config-modal-message",
                                        fallback: "Failed to load LED configuration"
                                    })
                                }),
                                [2];
                            for (r = t.filter((function(e) {
                                return /.*\.name$/.test(e.parameterId)
                            }
                            )).map((function(e) {
                                return e.value
                            }
                            )),
                            o = t.filter((function(e) {
                                return /.*\.color$/.test(e.parameterId)
                            }
                            )).map((function(e) {
                                return e.value
                            }
                            )),
                            n = t.filter((function(e) {
                                return /.*\.message$/.test(e.parameterId)
                            }
                            )).map((function(e) {
                                return e.value
                            }
                            )),
                            l = {
                                leds: r.map((function(e) {
                                    return {
                                        name: e
                                    }
                                }
                                ))
                            },
                            this.setLEDConfig(l),
                            d = {},
                            u = 0; u < r.length; u++)
                                d[r[u]] = {
                                    color: s[o[u]],
                                    tooltip: n[u]
                                };
                            return this.updateLEDColors(d),
                            c = this,
                            [4, this.base.parameter.observe("hardware.leds.*.color", {
                                kind: "sample",
                                interval: 30
                            }, (function(e, t) {
                                var r = {};
                                for (var o in t) {
                                    var n = parseInt(o.match(/[0-9]+/)[0], 10);
                                    r[l.leds[n].name] = {
                                        color: s[t[o]] || a.LEDColor.off
                                    }
                                }
                                p.updateLEDColors(r)
                            }
                            ))];
                        case 3:
                            return c.colorsObservation = i.sent(),
                            f = this,
                            [4, this.base.parameter.observe("hardware.leds.*.message", {
                                kind: "sample",
                                interval: 30
                            }, (function(e, t) {
                                var r = {};
                                for (var o in t) {
                                    var n = parseInt(o.match(/[0-9]+/)[0], 10);
                                    r[l.leds[n].name] = {
                                        tooltip: t[o]
                                    }
                                }
                                p.updateLEDColors(r)
                            }
                            ))];
                        case 4:
                            return f.messagesObservation = i.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return l(this, void 0, void 0, (function() {
                    return i(this, (function(e) {
                        return this.colorsObservation.cancel(),
                        this.messagesObservation.cancel(),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(a.LEDController);
        t.PFCLEDController = d
    }
    , function(e, t, r) {
        "use strict";
        var o, n = this && this.__extends || (o = function(e, t) {
            return (o = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var r in t)
                    t.hasOwnProperty(r) && (e[r] = t[r])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function r() {
                this.constructor = e
            }
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
            new r)
        }
        ), l = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, l) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function a(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        l(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, a)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , i = this && this.__generator || function(e, t) {
            var r, o, n, l, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
                },
                trys: [],
                ops: []
            };
            return l = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (l[Symbol.iterator] = function() {
                return this
            }
            ),
            l;
            function a(l) {
                return function(a) {
                    return function(l) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & l[0] ? o.return : l[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, l[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (l = [2 & l[0], n.value]),
                                l[0]) {
                                case 0:
                                case 1:
                                    n = l;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: l[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = l[1],
                                    l = [0];
                                    continue;
                                case 7:
                                    l = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === l[0] || 2 === l[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === l[0] && (!n || l[1] > n[0] && l[1] < n[3])) {
                                        i.label = l[1];
                                        break
                                    }
                                    if (6 === l[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = l;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(l);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                l = t.call(e, i)
                            } catch (e) {
                                l = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
                            }
                        if (5 & l[0])
                            throw l[1];
                        return {
                            value: l[0] ? l[1] : void 0,
                            done: !0
                        }
                    }([l, a])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = r(3);
        r(4),
        function(e) {
            e.off = "off",
            e.green = "green",
            e.red = "red",
            e.yellow = "yellow"
        }(t.LEDColor || (t.LEDColor = {}));
        var s = function(e) {
            function t(t) {
                var r = e.call(this, t) || this;
                return r.view = document.createElement("wbm-statusled"),
                r.view.classList.add("status-area-child"),
                r.ledTable = document.createElement("div"),
                r.ledTable.classList.add("led-table"),
                r.view.appendChild(r.ledTable),
                r
            }
            return n(t, e),
            t.prototype.load = function() {
                return l(this, void 0, void 0, (function() {
                    return i(this, (function(e) {
                        return [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.setLEDConfig = function(e) {
                for (var t = 0, r = e.leds; t < r.length; t++) {
                    var o = r[t];
                    this.ledTable.appendChild(this.buildLEDItem(o.name))
                }
            }
            ,
            t.prototype.buildLEDItem = function(e) {
                var t = document.createElement("div");
                return t.classList.add("led-item"),
                t.innerHTML = '<div id="led-item-' + e.toLowerCase() + '" taid="status-area-led-' + e.toLowerCase() + '" class="led"><div class="tooltip"></div></div><div>' + e + "</div>",
                t
            }
            ,
            t.prototype.updateLEDColors = function(e) {
                for (var t in e) {
                    var r = this.view.querySelector("#led-item-" + t.toLowerCase())
                      , o = void 0
                      , n = void 0
                      , l = e[t].color;
                    l instanceof Array ? (o = l[0],
                    n = l[1]) : l && (o = l),
                    o && (r.className = "led",
                    r.classList.add("led-" + o),
                    n && r.classList.add("led-and-" + n));
                    var i = e[t].tooltip;
                    if (i)
                        r.querySelector(".tooltip").innerHTML = i
                }
            }
            ,
            t
        }(a.ViewController);
        t.LEDController = s
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = o
    }
    , function(e, t, r) {
        var o = r(5);
        "string" == typeof o && (o = [[e.i, o, ""]]);
        var n = {
            insert: "head",
            singleton: !1
        };
        r(7)(o, n);
        o.locals && (e.exports = o.locals)
    }
    , function(e, t, r) {
        (e.exports = r(6)(!1)).push([e.i, 'wbm-statusled div.led-table{display:flex}wbm-statusled div.led-table>div.led-item{text-align:center;text-transform:uppercase;font-size:11px}wbm-statusled div.led-table>div.led-item>div.led{margin:0 9px;border-radius:50%;border:1px solid #787878;background:#e6e6e6;width:13px;height:13px;position:relative}wbm-statusled div.led-table>div.led-item>div.led:before,wbm-statusled div.led-table>div.led-item>div.led:after{display:block;position:absolute;content:" ";width:100%;height:100%;border-radius:50%}wbm-statusled div.led-table>div.led-item>div.led:after{height:50%;bottom:0}wbm-statusled div.led-table>div.led-item>div.led.led-off:before,wbm-statusled div.led-table>div.led-item>div.led.led-and-off:after{background:#e6e6e6}wbm-statusled div.led-table>div.led-item>div.led.led-green:before,wbm-statusled div.led-table>div.led-item>div.led.led-and-green:after{background:#b9d681}wbm-statusled div.led-table>div.led-item>div.led.led-red:before,wbm-statusled div.led-table>div.led-item>div.led.led-and-red:after{background:#e87f6c}wbm-statusled div.led-table>div.led-item>div.led.led-yellow:before,wbm-statusled div.led-table>div.led-item>div.led.led-and-yellow:after{background:#eec43a}wbm-statusled div.led-table>div.led-item>div.led.led-blue:before,wbm-statusled div.led-table>div.led-item>div.led.led-and-blue:after{background:#74a5d0}wbm-statusled div.led-table>div.led-item>div.led>div.tooltip{display:none;position:absolute;top:-56px;left:-23px;text-transform:none;border:1px solid #ccc;background:#fcfcfc;border-radius:2px;height:40px;padding:3px;white-space:pre;text-align:left}wbm-statusled div.led-table>div.led-item>div.led>div.tooltip:before{content:" ";width:12px;height:12px;display:block;position:absolute;left:21px;top:32px;transform:rotate(45deg);background:#fcfcfc;border-right:1px solid #ccc;border-bottom:1px solid #ccc;border-radius:2px}wbm-statusled div.led-table>div.led-item:hover>div.led>div.tooltip{display:block}', ""])
    }
    , function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var r = function(e, t) {
                        var r = e[1] || ""
                          , o = e[3];
                        if (!o)
                            return r;
                        if (t && "function" == typeof btoa) {
                            var n = (i = o,
                            a = btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                            s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),
                            "/*# ".concat(s, " */"))
                              , l = o.sources.map((function(e) {
                                return "/*# sourceURL=".concat(o.sourceRoot).concat(e, " */")
                            }
                            ));
                            return [r].concat(l).concat([n]).join("\n")
                        }
                        var i, a, s;
                        return [r].join("\n")
                    }(t, e);
                    return t[2] ? "@media ".concat(t[2], "{").concat(r, "}") : r
                }
                )).join("")
            }
            ,
            t.i = function(e, r) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var o = {}, n = 0; n < this.length; n++) {
                    var l = this[n][0];
                    null != l && (o[l] = !0)
                }
                for (var i = 0; i < e.length; i++) {
                    var a = e[i];
                    null != a[0] && o[a[0]] || (r && !a[2] ? a[2] = r : r && (a[2] = "(".concat(a[2], ") and (").concat(r, ")")),
                    t.push(a))
                }
            }
            ,
            t
        }
    }
    , function(e, t, r) {
        "use strict";
        var o, n = {}, l = function() {
            return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)),
            o
        }, i = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var r = document.querySelector(t);
                    if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement)
                        try {
                            r = r.contentDocument.head
                        } catch (e) {
                            r = null
                        }
                    e[t] = r
                }
                return e[t]
            }
        }();
        function a(e, t) {
            for (var r = [], o = {}, n = 0; n < e.length; n++) {
                var l = e[n]
                  , i = t.base ? l[0] + t.base : l[0]
                  , a = {
                    css: l[1],
                    media: l[2],
                    sourceMap: l[3]
                };
                o[i] ? o[i].parts.push(a) : r.push(o[i] = {
                    id: i,
                    parts: [a]
                })
            }
            return r
        }
        function s(e, t) {
            for (var r = 0; r < e.length; r++) {
                var o = e[r]
                  , l = n[o.id]
                  , i = 0;
                if (l) {
                    for (l.refs++; i < l.parts.length; i++)
                        l.parts[i](o.parts[i]);
                    for (; i < o.parts.length; i++)
                        l.parts.push(h(o.parts[i], t))
                } else {
                    for (var a = []; i < o.parts.length; i++)
                        a.push(h(o.parts[i], t));
                    n[o.id] = {
                        id: o.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }
        function d(e) {
            var t = document.createElement("style");
            if (void 0 === e.attributes.nonce) {
                var o = r.nc;
                o && (e.attributes.nonce = o)
            }
            if (Object.keys(e.attributes).forEach((function(r) {
                t.setAttribute(r, e.attributes[r])
            }
            )),
            "function" == typeof e.insert)
                e.insert(t);
            else {
                var n = i(e.insert || "head");
                if (!n)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                n.appendChild(t)
            }
            return t
        }
        var u, c = (u = [],
        function(e, t) {
            return u[e] = t,
            u.filter(Boolean).join("\n")
        }
        );
        function f(e, t, r, o) {
            var n = r ? "" : o.css;
            if (e.styleSheet)
                e.styleSheet.cssText = c(t, n);
            else {
                var l = document.createTextNode(n)
                  , i = e.childNodes;
                i[t] && e.removeChild(i[t]),
                i.length ? e.insertBefore(l, i[t]) : e.appendChild(l)
            }
        }
        function p(e, t, r) {
            var o = r.css
              , n = r.media
              , l = r.sourceMap;
            if (n && e.setAttribute("media", n),
            l && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(l)))), " */")),
            e.styleSheet)
                e.styleSheet.cssText = o;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }
        var v = null
          , b = 0;
        function h(e, t) {
            var r, o, n;
            if (t.singleton) {
                var l = b++;
                r = v || (v = d(t)),
                o = f.bind(null, r, l, !1),
                n = f.bind(null, r, l, !0)
            } else
                r = d(t),
                o = p.bind(null, r, t),
                n = function() {
                    !function(e) {
                        if (null === e.parentNode)
                            return !1;
                        e.parentNode.removeChild(e)
                    }(r)
                }
                ;
            return o(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                        return;
                    o(e = t)
                } else
                    n()
            }
        }
        e.exports = function(e, t) {
            (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {},
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = l());
            var r = a(e, t);
            return s(r, t),
            function(e) {
                for (var o = [], l = 0; l < r.length; l++) {
                    var i = r[l]
                      , d = n[i.id];
                    d && (d.refs--,
                    o.push(d))
                }
                e && s(a(e, t), t);
                for (var u = 0; u < o.length; u++) {
                    var c = o[u];
                    if (0 === c.refs) {
                        for (var f = 0; f < c.parts.length; f++)
                            c.parts[f]();
                        delete n[c.id]
                    }
                }
            }
        }
    }
    ])
}
));
//# sourceMappingURL=statusled.js.map
