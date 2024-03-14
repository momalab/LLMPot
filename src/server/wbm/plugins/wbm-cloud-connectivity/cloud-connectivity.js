/*!
 * @wago/wbm-cloud-connectivity@1.9.8
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
 *     Plugin for WBM-NG to configure and monitor Cloud Connectivity
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["cloud-connectivity"] = t() : e["cloud-connectivity"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function i(o) {
            if (t[o])
                return t[o].exports;
            var l = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(l.exports, l, l.exports, i),
            l.l = !0,
            l.exports
        }
        return i.m = e,
        i.c = t,
        i.d = function(e, t, o) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            })
        }
        ,
        i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(e, t) {
            if (1 & t && (e = i(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var o = Object.create(null);
            if (i.r(o),
            Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var l in e)
                    i.d(o, l, function(t) {
                        return e[t]
                    }
                    .bind(null, l));
            return o
        }
        ,
        i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return i.d(t, "a", t),
            t
        }
        ,
        i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        i.p = "",
        i(i.s = 1)
    }([function(e, t, i) {
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
    , function(e, t, i) {
        "use strict";
        var o = this && this.__awaiter || function(e, t, i, o) {
            return new (i || (i = Promise))((function(l, a) {
                function n(e) {
                    try {
                        d(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function c(e) {
                    try {
                        d(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function d(e) {
                    e.done ? l(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(n, c)
                }
                d((o = o.apply(e, t || [])).next())
            }
            ))
        }
          , l = this && this.__generator || function(e, t) {
            var i, o, l, a, n = {
                label: 0,
                sent: function() {
                    if (1 & l[0])
                        throw l[1];
                    return l[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: c(0),
                throw: c(1),
                return: c(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function c(a) {
                return function(c) {
                    return function(a) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (i = 1,
                                o && (l = 2 & a[0] ? o.return : a[0] ? o.throw || ((l = o.return) && l.call(o),
                                0) : o.next) && !(l = l.call(o, a[1])).done)
                                    return l;
                                switch (o = 0,
                                l && (a = [2 & a[0], l.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    l = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(l = (l = n.trys).length > 0 && l[l.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!l || a[1] > l[0] && a[1] < l[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < l[1]) {
                                        n.label = l[1],
                                        l = a;
                                        break
                                    }
                                    if (l && n.label < l[2]) {
                                        n.label = l[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    l[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                i = l = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, c])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i(2)
          , n = i(5)
          , c = i(7);
        base.plugin.register("wbm-cloud-connectivity", (function(e) {
            return o(this, void 0, void 0, (function() {
                var t;
                return l(this, (function(i) {
                    return "cloud-connectivity",
                    (t = e.subframeGenerator.createSubFrame("cloud-connectivity", e, ["special-area"])).registerSubMenuItem({
                        id: "ccstatus",
                        title: "Status",
                        priority: 1001
                    }, new a.StatusController(e)),
                    t.registerSubMenuItem({
                        id: "ccconnection1",
                        title: "Connection 1",
                        priority: 1e3
                    }, new n.ConfigurationsController(e,1)),
                    t.registerSubMenuItem({
                        id: "ccconnection2",
                        title: "Connection 2",
                        priority: 999
                    }, new n.ConfigurationsController(e,2)),
                    [2, {
                        id: "cloud-connectivity",
                        title: {
                            fallback: "Cloud Connectivity",
                            key: "transalation-key-title-cloudconnectivity"
                        },
                        description: {
                            fallback: "WBM-NG plugin for Cloud Connectivity",
                            key: "transalation-key-description-cloudconnectivity"
                        },
                        priority: 775,
                        userRoles: [c.UserRoles.admin],
                        controller: t
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, i) {
        "use strict";
        var o, l = this && this.__extends || (o = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i])
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, o) {
            return new (i || (i = Promise))((function(l, a) {
                function n(e) {
                    try {
                        d(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function c(e) {
                    try {
                        d(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function d(e) {
                    e.done ? l(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(n, c)
                }
                d((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , n = this && this.__generator || function(e, t) {
            var i, o, l, a, n = {
                label: 0,
                sent: function() {
                    if (1 & l[0])
                        throw l[1];
                    return l[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: c(0),
                throw: c(1),
                return: c(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function c(a) {
                return function(c) {
                    return function(a) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (i = 1,
                                o && (l = 2 & a[0] ? o.return : a[0] ? o.throw || ((l = o.return) && l.call(o),
                                0) : o.next) && !(l = l.call(o, a[1])).done)
                                    return l;
                                switch (o = 0,
                                l && (a = [2 & a[0], l.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    l = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(l = (l = n.trys).length > 0 && l[l.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!l || a[1] > l[0] && a[1] < l[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < l[1]) {
                                        n.label = l[1],
                                        l = a;
                                        break
                                    }
                                    if (l && n.label < l[2]) {
                                        n.label = l[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    l[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                i = l = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, c])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = i(0)
          , d = i(3)
          , r = i(4)
          , s = function(e) {
            function t(t) {
                var i = e.call(this, t) || this;
                return i.isLoaded = !1,
                i.view = document.createElement("div"),
                i
            }
            return l(t, e),
            t.prototype.RefreshStatusView = function() {
                $('[taid="field-cc-status-softwareversion"] input').val("1.9"),
                this.base.parameter.read("cc.operationstatus").then((function(e) {
                    var t = e[0]
                      , i = ["Connection1", "Connection2"]
                      , o = JSON.parse("{}");
                    try {
                        o = JSON.parse(t.value)
                    } catch (e) {
                        for (var l = 0; l < i.length; l++) {
                            var a = '[taid="form-cc-status-' + i[l] + '"] ';
                            r.default(void 0, a)
                        }
                        return
                    }
                    for (l = 0; l < i.length; l++) {
                        var n = i[l]
                          , c = '[taid="form-cc-status-' + n + '"] '
                          , d = o[n];
                        if (d) {
                            var s = "#theSignOfLifeHidden" + n
                              , u = $(s).val()
                              , f = d.ErrorInformation[0]
                              , p = d.WarningInformation[0];
                            if (u == d.SignOfLife || f && (7 == f.Id || 8 == f.Id))
                                r.default(d, c);
                            else {
                                $(s).val(d.SignOfLife);
                                var h = "samples"
                                  , v = "running";
                                f && 9 == f.Id && (v += " (" + f.Description + ")"),
                                $(c + '[taid="field-cc-serviceoperationstatus"] input').val(v);
                                var y = $(c + '[taid="field-cc-telemetrystatus"]')
                                  , w = $(c + '[taid="field-cc-plcdatastatus"] input');
                                if (w.val(""),
                                "NativeMQTT" == d.DataProtocolLive)
                                    h = "messages",
                                    y.hide(),
                                    f && 2 == f.Id ? w.val(f.Description) : w.val(d.CountOfMessages + " " + h);
                                else {
                                    !f || 1 != f.Id && 3 != f.Id ? !f || 4 != f.Id && 6 != f.Id ? w.val(d.CollectionsCountFromPlc + " collections") : w.val(f.Description) : w.val(d.CollectionsCountFromPlc + " collections (" + f.Description + ")"),
                                    y.show();
                                    var b = y.find("input");
                                    b.val(""),
                                    d.TelemetryDataTransmission ? b.val("enabled") : b.val("disabled")
                                }
                                f && 5 == f.Id && w.val(f.Description),
                                $(c + '[taid="field-cc-heartbeatstatus"] input').val(d.Heartbeat + " seconds");
                                var m = $(c + '[taid="field-cc-cloudconnectionstatus"] input');
                                if (m.val(""),
                                d.Connected) {
                                    var g = "connected";
                                    0 === d.DataProtocolLive.lastIndexOf("WagoProtocol", 0) && "0" != d.WagoProtocolVersion && (g = p && 1 == p.Id ? g.concat(" (" + p.Description + ")") : g.concat(" (protocol ", d.WagoProtocolVersion, ")")),
                                    m.val(g)
                                } else
                                    m.val("disconnected");
                                var k = parseFloat(d.FillLevel)
                                  , x = Number(k).toFixed(2);
                                $(c + '[taid="field-cc-cachelevelstatus"] input').val(x + " % (" + d.OutgoingDataBlocks + " " + h + ")"),
                                $(c + '[taid="field-cc-sparkpluglicensestatus"]').hide()
                            }
                        } else
                            r.default(void 0, c)
                    }
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return a(this, void 0, void 0, (function() {
                    return n(this, (function(e) {
                        return window.clearInterval(this.myIntervalTimerId),
                        this.view.innerHTML = "",
                        this.isLoaded = !1,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, i, o, l;
                    return n(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return this.isLoaded ? [2] : (this.isLoaded = !0,
                            e = this.base.viewGenerator.generate(this.base, d.default),
                            this.view.appendChild(e.view),
                            [4, e.load()]);
                        case 1:
                            for (a.sent(),
                            "#sub-menu-item-cloud-connectivity",
                            t = ["Connection1", "Connection2"],
                            i = 0; i < t.length; i++)
                                o = "theSignOfLifeHidden" + t[i],
                                0 == $("#sub-menu-item-cloud-connectivity #" + o).length && ((l = $('<input type="hidden" />')).attr("id", o),
                                $("#sub-menu-item-cloud-connectivity").append(l));
                            return this.RefreshStatusView(),
                            this.myIntervalTimerId = window.setInterval(this.RefreshStatusView, 31e3),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(c.ViewController);
        t.StatusController = s
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {
            title: {
                default: "Status overview",
                localized: "unique-translation-key-for-the-page-title-cloud-connectivity"
            },
            content: [{
                title: {
                    default: "Service",
                    localized: "cc-status-service"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Version",
                            localized: "cc-status-softwareversion"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }]
                }]
            }, {
                title: {
                    default: "Connection 1",
                    localized: "cc-status-Connection1"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Operation",
                            localized: "cc-serviceoperationstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Data from PLC runtime",
                            localized: "cc-plcdatastatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Cloud connection",
                            localized: "cc-cloudconnectionstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Heartbeat",
                            localized: "cc-heartbeatstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Telemetry data transmission",
                            localized: "cc-telemetrystatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Cache fill level (QoS 1 and 2)",
                            localized: "cc-cachelevelstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Sparkplug license",
                            localized: "cc-sparkpluglicensestatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }]
                }]
            }, {
                title: {
                    default: "Connection 2",
                    localized: "cc-status-Connection2"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Operation",
                            localized: "cc-serviceoperationstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Data from PLC runtime",
                            localized: "cc-plcdatastatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Cloud connection",
                            localized: "cc-cloudconnectionstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Heartbeat",
                            localized: "cc-heartbeatstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Telemetry data transmission",
                            localized: "cc-telemetrystatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Cache fill level (QoS 1 and 2)",
                            localized: "cc-cachelevelstatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }, {
                        title: {
                            default: "Sparkplug license",
                            localized: "cc-sparkpluglicensestatus"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        }
                    }]
                }]
            }]
        }
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e, t) {
            if ($(t + '[taid="field-cc-serviceoperationstatus"] input').val("stopped"),
            $(t + '[taid="field-cc-plcdatastatus"] input').val(""),
            $(t + '[taid="field-cc-cloudconnectionstatus"] input').val(""),
            $(t + '[taid="field-cc-heartbeatstatus"] input').val(""),
            $(t + '[taid="field-cc-telemetrystatus"] input').val(""),
            $(t + '[taid="field-cc-cachelevelstatus"] input').val(""),
            $(t + '[taid="field-cc-sparkpluglicensestatus"]').hide(),
            e) {
                var i = e.ErrorInformation[0];
                !i || 7 != i.Id && 8 != i.Id || $(t + '[taid="field-cc-serviceoperationstatus"] input').val("stopped (" + i.Description + ")")
            }
        }
    }
    , function(e, t, i) {
        "use strict";
        var o, l = this && this.__extends || (o = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i])
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, o) {
            return new (i || (i = Promise))((function(l, a) {
                function n(e) {
                    try {
                        d(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function c(e) {
                    try {
                        d(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function d(e) {
                    e.done ? l(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(n, c)
                }
                d((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , n = this && this.__generator || function(e, t) {
            var i, o, l, a, n = {
                label: 0,
                sent: function() {
                    if (1 & l[0])
                        throw l[1];
                    return l[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: c(0),
                throw: c(1),
                return: c(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function c(a) {
                return function(c) {
                    return function(a) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (i = 1,
                                o && (l = 2 & a[0] ? o.return : a[0] ? o.throw || ((l = o.return) && l.call(o),
                                0) : o.next) && !(l = l.call(o, a[1])).done)
                                    return l;
                                switch (o = 0,
                                l && (a = [2 & a[0], l.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    l = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(l = (l = n.trys).length > 0 && l[l.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!l || a[1] > l[0] && a[1] < l[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < l[1]) {
                                        n.label = l[1],
                                        l = a;
                                        break
                                    }
                                    if (l && n.label < l[2]) {
                                        n.label = l[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    l[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                i = l = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, c])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = i(0)
          , d = i(6)
          , r = function(e) {
            function t(t, i) {
                var o = e.call(this, t) || this;
                return o.isLoaded = !1,
                o.ConnectionId = 0,
                o.view = document.createElement("div"),
                o.ConnectionId = i,
                o
            }
            return l(t, e),
            t.prototype.GetMassStorageInfoSelector = function() {
                return "#sub-menu-item-ccconnection" + this.ConnectionId + " #theMassStorageIsReady"
            }
            ,
            t.prototype.AddTooltips = function() {
                $('[taid="field-cc-messageproperty"] div.control.textfield').attr("title", "Example: myProperty=myPlaceholders|<d>|<p>|<m>")
            }
            ,
            t.prototype.RefreshVisibilityMqttLastWill = function() {
                var e = $('[taid="field-cc-lastwill"]')
                  , t = $('[taid="field-cc-lastwilltopic"]')
                  , i = $('[taid="field-cc-lastwillpayload"]')
                  , o = $('[taid="field-cc-lastwillqos"]')
                  , l = $('[taid="field-cc-lastwillretain"]');
                e.is(":visible") && e.find("input").is(":checked") ? (t.show(),
                i.show(),
                o.show(),
                l.show(),
                "AWS" == $('[taid="field-cc-title-cloud-platform"] select').val() ? ("2" == o.find("select").val() && o.find("select").prop("value", "1"),
                o.find("select option[value='2']").attr("disabled", "disabled"),
                l.find("input").prop("checked", !1).attr("disabled", "disabled")) : (o.find("select option[value='2']").removeAttr("disabled"),
                l.find("input").removeAttr("disabled"))) : (t.hide(),
                i.hide(),
                o.hide(),
                l.hide())
            }
            ,
            t.prototype.SelectedCloudChanched = function(e) {
                "AWS" != e && "SAP" != e || $('[taid="field-cc-user"]').find("input").val("")
            }
            ,
            t.prototype.SelectedDataProtocolChanched = function() {
                this.RefreshVisibility(),
                "SparkplugB" == $('[taid="field-cc-title-data-protocol"]').find("select").val() && this.base.modalPresenter.showDialog(this.base, {
                    title: this.base.localization.localized({
                        fallback: "Attention",
                        key: "hint-cc-attention"
                    }),
                    message: this.base.localization.localized({
                        fallback: "The data protocol Sparkplug payload B is only available on 750-821x, Touch Panel 600 and PFC200 ADV devices. Please also ensure the Sparkplug license is added to the device.",
                        key: "hint-cc-license-required-message"
                    })
                })
            }
            ,
            t.prototype.RefreshVisibility = function() {
                $('[taid="field-cc-connectionID"]').hide();
                var e = $('[taid="field-cc-title-cloud-platform"] select').val()
                  , t = $('[taid="field-cc-hostname"]').find("input")
                  , i = $('[taid="field-cc-client-id"]')
                  , o = $('[taid="field-cc-authentication"]')
                  , l = o.find("select")
                  , a = i.find("label")
                  , n = $('[taid="field-cc-group-id"]')
                  , c = $('[taid="field-cc-clean-session"]')
                  , d = c.find("input")
                  , r = $('[taid="field-cc-tls"]')
                  , s = r.find("input")
                  , u = $('[taid="field-cc-user"]')
                  , f = $('[taid="field-cc-password"]')
                  , p = f.find("label")
                  , h = $('[taid="field-cc-title-use-websockets"]')
                  , v = $('[taid="field-cc-title-use-compression"]')
                  , y = $('[taid="field-cc-title-data-protocol"]')
                  , w = y.find("select")
                  , b = $('[taid="field-cc-title-cache-mode"]')
                  , m = b.find("select")
                  , g = $('[taid="field-cc-port-number"]')
                  , k = g.find("input")
                  , x = $('[taid="field-cc-cafile"]')
                  , C = $('[taid="field-cc-certfile"]')
                  , S = $('[taid="field-cc-keyfile"]')
                  , z = $('[taid="field-cc-deviceinfo"]')
                  , _ = $('[taid="field-cc-devicestatus"]')
                  , P = $('[taid="field-cc-standardcommands"]')
                  , A = $('[taid="field-cc-messageproperty"]')
                  , I = $('[taid="field-cc-lastwill"]')
                  , M = $('[taid="field-cc-lastwilltopic"]')
                  , T = $('[taid="field-cc-lastwillpayload"]')
                  , D = $('[taid="field-cc-lastwillqos"]')
                  , W = $('[taid="field-cc-lastwillretain"]');
                switch ("RAM" == m.val() ? v.show() : v.hide(),
                e) {
                case "WagoCloud":
                    i.show(),
                    a.text("Device ID"),
                    o.hide(),
                    l.prop("value", "SAK"),
                    t.val() || t.val("wagocloud.azure-devices.net"),
                    n.hide(),
                    c.hide(),
                    r.hide(),
                    u.hide(),
                    f.show(),
                    p.text("Activation Key"),
                    h.show(),
                    w.prop("value", "WagoProtocol"),
                    y.hide(),
                    b.show(),
                    g.hide(),
                    x.hide(),
                    C.hide(),
                    S.hide(),
                    z.find("input").prop("checked", !0),
                    z.hide(),
                    _.find("input").prop("checked", !0),
                    _.hide(),
                    P.find("input").prop("checked", !0),
                    P.hide(),
                    A.hide(),
                    I.hide(),
                    M.hide(),
                    T.hide(),
                    D.hide(),
                    W.hide();
                    break;
                case "Azure":
                    i.show(),
                    a.text("Device ID"),
                    o.show(),
                    n.hide(),
                    c.hide(),
                    r.hide(),
                    u.hide(),
                    h.show(),
                    y.show(),
                    "SparkplugB" != w.val() && "NativeMQTT" != w.val() || w.prop("value", "WagoProtocol"),
                    w.find("option[value='WagoProtocol_1_5']").removeAttr("disabled"),
                    w.find("option[value='SparkplugB']").attr("disabled", "disabled"),
                    w.find("option[value='NativeMQTT']").attr("disabled", "disabled"),
                    b.show(),
                    g.hide(),
                    p.text("Activation Key"),
                    x.hide(),
                    "SAK" == l.val() ? (f.show(),
                    C.hide(),
                    S.hide()) : (f.hide(),
                    C.show(),
                    S.show()),
                    z.show(),
                    _.show(),
                    P.show(),
                    A.show(),
                    I.hide(),
                    M.hide(),
                    T.hide(),
                    D.hide(),
                    W.hide();
                    break;
                case "AnyMQTT":
                    i.show(),
                    a.text("Client ID"),
                    o.hide(),
                    n.hide(),
                    c.show(),
                    d.removeAttr("disabled"),
                    r.show(),
                    s.removeAttr("disabled"),
                    u.show(),
                    f.show(),
                    p.text("Password"),
                    h.hide(),
                    v.show(),
                    b.show(),
                    g.show(),
                    k.removeAttr("disabled"),
                    x.show(),
                    C.show(),
                    S.show(),
                    z.hide(),
                    _.hide(),
                    P.hide(),
                    A.hide(),
                    I.show(),
                    M.show(),
                    T.show(),
                    D.show(),
                    W.show(),
                    y.show(),
                    w.find("option[value='WagoProtocol']").removeAttr("disabled"),
                    w.find("option[value='WagoProtocol_1_5']").removeAttr("disabled"),
                    w.find("option[value='NativeMQTT']").removeAttr("disabled"),
                    w.find("option[value='SparkplugB']").removeAttr("disabled"),
                    "WagoProtocol" != w.val() && "WagoProtocol_1_5" != w.val() || (z.show(),
                    _.show(),
                    P.show()),
                    "SparkplugB" == w.val() && (a.text("Edge node ID"),
                    n.show(),
                    v.hide(),
                    I.hide(),
                    M.hide(),
                    T.hide(),
                    D.hide(),
                    W.hide()),
                    this.RefreshVisibilityMqttLastWill();
                    break;
                case "AWS":
                    i.show(),
                    a.text("Client ID"),
                    o.hide(),
                    n.hide(),
                    c.show(),
                    d.prop("checked", !0).attr("disabled", "disabled"),
                    r.show(),
                    s.prop("checked", !0).attr("disabled", "disabled"),
                    u.hide(),
                    f.hide(),
                    p.text("Password"),
                    h.hide(),
                    v.hide(),
                    b.show(),
                    g.show(),
                    k.val("8883").attr("disabled", "disabled"),
                    x.show(),
                    C.show(),
                    S.show(),
                    z.hide(),
                    _.hide(),
                    P.hide(),
                    A.hide(),
                    y.show(),
                    w.find("option[value='WagoProtocol']").removeAttr("disabled"),
                    w.find("option[value='NativeMQTT']").removeAttr("disabled"),
                    w.find("option[value='SparkplugB']").removeAttr("disabled"),
                    I.show(),
                    M.show(),
                    T.show(),
                    D.show(),
                    W.show(),
                    "WagoProtocol" != w.val() && "WagoProtocol_1_5" != w.val() || (z.show(),
                    _.show(),
                    P.show()),
                    "SparkplugB" == w.val() && (a.text("Edge node ID"),
                    n.show(),
                    I.hide(),
                    M.hide(),
                    T.hide(),
                    D.hide(),
                    W.hide()),
                    this.RefreshVisibilityMqttLastWill();
                    break;
                case "IBM":
                    i.show(),
                    a.text("Client ID"),
                    o.hide(),
                    n.hide(),
                    c.show(),
                    d.removeAttr("disabled"),
                    r.show(),
                    s.removeAttr("disabled"),
                    u.show(),
                    f.show(),
                    p.text("Password"),
                    h.hide(),
                    v.hide(),
                    v.find("input").prop("checked", !1),
                    b.show(),
                    g.show(),
                    k.removeAttr("disabled"),
                    x.show(),
                    C.find("input").val(""),
                    C.hide(),
                    S.find("input").val(""),
                    S.hide(),
                    z.hide(),
                    _.hide(),
                    P.find("input").prop("checked", !1),
                    P.hide(),
                    A.hide(),
                    y.show(),
                    "SparkplugB" == w.val() && w.prop("value", "WagoProtocol"),
                    w.find("option[value='SparkplugB']").attr("disabled", "disabled"),
                    I.show(),
                    M.show(),
                    T.show(),
                    D.show(),
                    W.show(),
                    "WagoProtocol" != w.val() && "WagoProtocol_1_5" != w.val() || (z.show(),
                    _.show()),
                    this.RefreshVisibilityMqttLastWill();
                    break;
                case "SAP":
                    i.show(),
                    a.text("Client ID"),
                    o.hide(),
                    n.hide(),
                    c.show(),
                    d.removeAttr("disabled"),
                    r.show(),
                    s.removeAttr("disabled"),
                    u.hide(),
                    f.hide(),
                    p.text("Password"),
                    h.hide(),
                    v.hide(),
                    v.find("input").prop("checked", !1),
                    b.show(),
                    g.show(),
                    k.removeAttr("disabled"),
                    x.show(),
                    C.show(),
                    S.show(),
                    z.hide(),
                    _.hide(),
                    P.hide(),
                    A.hide(),
                    I.show(),
                    M.show(),
                    T.show(),
                    D.show(),
                    W.show(),
                    y.show(),
                    w.prop("value", "NativeMQTT"),
                    w.find("option[value='WagoProtocol']").attr("disabled", "disabled"),
                    w.find("option[value='WagoProtocol_1_5']").attr("disabled", "disabled"),
                    w.find("option[value='SparkplugB']").attr("disabled", "disabled"),
                    this.RefreshVisibilityMqttLastWill();
                    break;
                default:
                    i.hide(),
                    o.hide(),
                    c.hide(),
                    r.hide(),
                    u.hide(),
                    f.hide(),
                    h.hide(),
                    y.hide(),
                    b.hide(),
                    g.hide(),
                    x.hide(),
                    C.hide(),
                    S.hide(),
                    z.hide(),
                    _.hide(),
                    P.hide(),
                    A.hide(),
                    I.hide(),
                    M.hide(),
                    T.hide(),
                    D.hide(),
                    W.hide(),
                    this.RefreshVisibilityMqttLastWill()
                }
                "false" == $(this.GetMassStorageInfoSelector).val() || "SparkplugB" == w.val() ? (m.find("option[value='SDCard']").attr("disabled", "disabled"),
                m.prop("value", "RAM")) : m.find("option[value='SDCard']").removeAttr("disabled")
            }
            ,
            t.prototype.unload = function() {
                return a(this, void 0, void 0, (function() {
                    return n(this, (function(e) {
                        return this.view.innerHTML = "",
                        this.isLoaded = !1,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, i, o, l = this;
                    return n(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return this.isLoaded ? [2] : (this.isLoaded = !0,
                            e = "#sub-menu-item-cloud-connectivity",
                            "idOfTheSelectedConnection",
                            0 == $(e + " #idOfTheSelectedConnection").length && ((t = $('<input type="hidden" value="Unknown" />')).attr("id", "idOfTheSelectedConnection"),
                            $(e).append(t)),
                            $(e + " #idOfTheSelectedConnection").val("" + this.ConnectionId),
                            d.default.title.localized = "page-unique-translation-key-for-the-page-title-cloud-connectivity-connection" + this.ConnectionId,
                            d.default.title.default = "Configuration of Connection " + this.ConnectionId,
                            i = this.base.viewGenerator.generate(this.base, d.default),
                            this.view.appendChild(i.view),
                            [4, i.load()]);
                        case 1:
                            return a.sent(),
                            this.AddTooltips(),
                            (o = this.view.querySelector('[taid="field-cc-title-cloud-platform"] select')).addEventListener("change", (function(e) {
                                l.SelectedCloudChanched(o.value),
                                l.RefreshVisibility()
                            }
                            )),
                            this.view.querySelector('[taid="field-cc-title-data-protocol"] select').addEventListener("change", (function(e) {
                                l.SelectedDataProtocolChanched()
                            }
                            )),
                            this.view.querySelector('[taid="field-cc-title-cache-mode"] select').addEventListener("change", (function(e) {
                                l.RefreshVisibility()
                            }
                            )),
                            this.view.querySelector('[taid="field-cc-lastwill"] input').addEventListener("change", (function(e) {
                                l.RefreshVisibility()
                            }
                            )),
                            this.view.querySelector('[taid="field-cc-authentication"] select').addEventListener("change", (function(e) {
                                l.RefreshVisibility()
                            }
                            )),
                            this.RefreshVisibility(),
                            $('[taid="page-page-unique-translation-key-for-the-page-title-cloud-connectivity-connection2"]').find("p").text("Changes will take effect after reboot.\nNote: Only for 750-821x, Touch Panel 600 and PFC200 ADV devices. Please also ensure the Multi Cloud Connectivity license is added to the device."),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(c.ViewController);
        t.ConfigurationsController = r
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {
            title: {
                default: "Configuration",
                localized: "unique-translation-key-for-the-page-title-cloud-connectivity"
            },
            note: {
                default: "Changes will take effect after reboot.",
                localized: "unique-translation-key-for-the-note-text"
            },
            content: [{
                title: {
                    default: "Configuration",
                    localized: "de_DE"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Connection ID",
                            localized: "cc-connectionID"
                        },
                        control: {
                            type: "textfield"
                        },
                        options: {
                            readonly: !0
                        },
                        parameter: "cc.cloudconnectionid"
                    }, {
                        title: {
                            default: "Enabled",
                            localized: "cc-title-service-enabled"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.connectionenabled"
                    }, {
                        title: {
                            default: "Cloud platform",
                            localized: "cc-title-cloud-platform"
                        },
                        parameter: "cc.cloud",
                        control: {
                            type: "dropdown",
                            items: [{
                                title: {
                                    default: "WAGO Cloud",
                                    localized: "cc-title-wagocloud"
                                },
                                value: "WagoCloud"
                            }, {
                                title: {
                                    default: "Azure",
                                    localized: "cc-title-azurecloud"
                                },
                                value: "Azure"
                            }, {
                                title: {
                                    default: "MQTT AnyCloud",
                                    localized: "cc-title-mqttanycloud"
                                },
                                value: "AnyMQTT"
                            }, {
                                title: {
                                    default: "IBM Cloud",
                                    localized: "cc-title-ibmcloud"
                                },
                                value: "IBM"
                            }, {
                                title: {
                                    default: "Amazon Web Services (AWS)",
                                    localized: "cc-title-awscloud"
                                },
                                value: "AWS"
                            }, {
                                title: {
                                    default: "SAP IoT Services",
                                    localized: "cc-title-sapcloud"
                                },
                                value: "SAP"
                            }]
                        }
                    }, {
                        title: {
                            default: "Hostname",
                            localized: "cc-hostname"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.hostname"
                    }, {
                        title: {
                            default: "Port number",
                            localized: "cc-port-number"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.portnumber"
                    }, {
                        title: {
                            default: "Client ID",
                            localized: "cc-client-id"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.clientid"
                    }, {
                        title: {
                            default: "Authentication",
                            localized: "cc-authentication"
                        },
                        parameter: "cc.authentication",
                        control: {
                            type: "dropdown",
                            items: [{
                                title: {
                                    default: "Shared Access Key",
                                    localized: "de_DE"
                                },
                                value: "SAK"
                            }, {
                                title: {
                                    default: "X.509 Certificate",
                                    localized: "de_DE"
                                },
                                value: "x509Certificate"
                            }]
                        }
                    }, {
                        title: {
                            default: "Clean session",
                            localized: "cc-clean-session"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.cleansession"
                    }, {
                        title: {
                            default: "TLS",
                            localized: "cc-tls"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.enabletls"
                    }, {
                        title: {
                            default: "Last Will",
                            localized: "cc-lastwill"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.lastwill"
                    }, {
                        title: {
                            default: "Last Will Topic",
                            localized: "cc-lastwilltopic"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.lastwilltopic"
                    }, {
                        title: {
                            default: "Last Will Message",
                            localized: "cc-lastwillpayload"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.lastwillpayload"
                    }, {
                        title: {
                            default: "Last Will QoS",
                            localized: "cc-lastwillqos"
                        },
                        parameter: "cc.lastwillqos",
                        control: {
                            type: "dropdown",
                            items: [{
                                title: {
                                    default: "0 - At most once",
                                    localized: "de_DE"
                                },
                                value: "0"
                            }, {
                                title: {
                                    default: "1 - At least once",
                                    localized: "de_DE"
                                },
                                value: "1"
                            }, {
                                title: {
                                    default: "2 - Exactly once",
                                    localized: "de_DE"
                                },
                                value: "2"
                            }]
                        }
                    }, {
                        title: {
                            default: "Last Will Retain",
                            localized: "cc-lastwillretain"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.lastwillretain"
                    }, {
                        title: {
                            default: "User",
                            localized: "cc-user"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.username"
                    }, {
                        title: {
                            default: "Password",
                            localized: "cc-password"
                        },
                        control: {
                            type: "textfield",
                            options: {
                                masked: !0
                            }
                        },
                        parameter: "cc.password"
                    }, {
                        title: {
                            default: "CA file",
                            localized: "cc-cafile"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.rootcafile"
                    }, {
                        title: {
                            default: "Certification file",
                            localized: "cc-certfile"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.certfile"
                    }, {
                        title: {
                            default: "Key file",
                            localized: "cc-keyfile"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.keyfile"
                    }, {
                        title: {
                            default: "Data protocol",
                            localized: "cc-title-data-protocol"
                        },
                        parameter: "cc.dataprotocol",
                        control: {
                            type: "dropdown",
                            items: [{
                                title: {
                                    default: "WAGO Protocol (Handshake)",
                                    localized: "cc-title-wagoprotocol"
                                },
                                value: "WagoProtocol"
                            }, {
                                title: {
                                    default: "WAGO Protocol 1.5",
                                    localized: "cc-title-wagoprotocol_1_5"
                                },
                                value: "WagoProtocol_1_5"
                            }, {
                                title: {
                                    default: "Native MQTT",
                                    localized: "cc-title-nativemqtt"
                                },
                                value: "NativeMQTT"
                            }, {
                                title: {
                                    default: "Sparkplug payload B",
                                    localized: "cc-title-sparkplugB"
                                },
                                value: "SparkplugB"
                            }]
                        }
                    }, {
                        title: {
                            default: "Group ID",
                            localized: "cc-group-id"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.groupid"
                    }, {
                        title: {
                            default: "Use websockets",
                            localized: "cc-title-use-websockets"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.enablewebsockets"
                    }, {
                        title: {
                            default: "Use compression",
                            localized: "cc-title-use-compression"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.enablecompression"
                    }, {
                        title: {
                            default: "Cache mode",
                            localized: "cc-title-cache-mode"
                        },
                        parameter: "cc.cachemode",
                        control: {
                            type: "dropdown",
                            items: [{
                                title: {
                                    default: "RAM (volatile)",
                                    localized: "cc-title-cachemode-ram"
                                },
                                value: "RAM"
                            }, {
                                title: {
                                    default: "SD Card (non-volatile)",
                                    localized: "cc-title-cachemode-sdcard"
                                },
                                value: "SDCard"
                            }]
                        }
                    }, {
                        title: {
                            default: "Device info",
                            localized: "cc-deviceinfo"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.deviceinfo"
                    }, {
                        title: {
                            default: "Device status",
                            localized: "cc-devicestatus"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.devicestatus"
                    }, {
                        title: {
                            default: "Standard commands",
                            localized: "cc-standardcommands"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "cc.standardcommands"
                    }, {
                        title: {
                            default: "Application property template",
                            localized: "cc-messageproperty"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "cc.messageproperty"
                    }]
                }]
            }]
        }
    }
    , function(e, t, i) {
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
    ])
}
));
//# sourceMappingURL=cloud-connectivity.js.map
