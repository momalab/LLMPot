/*!
 * @wago/wbm-information@2.2.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *     Marius Hellmeier <marius.hellmeier@wago.com>
 *   Johann Dück <johann.dueck@wago.com>
 *   Stefanie Meihöfer <stefanie.meihoefer@wago.com>
 *
 *   Description:
 *     This is the information site for PFC's
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.information = t() : e.information = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, n),
            r.l = !0,
            r.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
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
            var i = Object.create(null);
            if (n.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    n.d(i, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return i
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
        n(n.s = 1)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = i
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function c(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
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
        var o = n(2)
          , a = n(4)
          , l = n(7);
        base.plugin.register("wbm-information", (function(e) {
            return i(this, void 0, void 0, (function() {
                var t, n, i, c;
                return r(this, (function(r) {
                    return "information",
                    t = e.subframeGenerator.createSubFrame("information", e, ["information-area"]),
                    n = o.initializeControllerStatus(e),
                    t.registerSubMenuItem(n.item, n.controller),
                    i = a.initializeVendor(e),
                    t.registerSubMenuItem(i.item, i.controller),
                    c = l.initializeAbout(e),
                    t.registerSubMenuItem(c.item, c.controller),
                    [2, {
                        id: "information",
                        title: {
                            fallback: "Information",
                            key: "information-title"
                        },
                        description: {
                            fallback: "A plugin for all Information Sites",
                            key: "information-description"
                        },
                        priority: 1e3,
                        controller: t
                    }]
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
        t.initializeControllerStatus = function(e) {
            var t = n(3);
            return {
                item: {
                    id: "device-status",
                    title: "Device Status",
                    description: {
                        fallback: "no description exists",
                        key: "de_DE"
                    },
                    priority: 1e3
                },
                controller: e.viewGenerator.generate(e, t)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Device Status","localized":"device-status"},"content":[{"title":{"default":"Device Details","localized":"device-details"},"sections":[{"fields":[{"title":{"default":"Product Description","localized":"product-description"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"device.productdescription"},{"title":{"default":"Ordernumber","localized":"ordernumber"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"device.ordernumber"},{"title":{"default":"Serial","localized":"serial"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"device.serialnumber"},{"hidden":"device.series is SRC","title":{"default":"License Information","localized":"license-information"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"device.licenseinformation"},{"title":{"default":"Firmware Revision","localized":"firmware-revision"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"device.firmwarerevision"}]}]},{"title":{"default":"Network TCP/IP Details","localized":"network-details"},"sections":[{"note":{"default":"As soon as the DIP switch is activated or has a value not equal to 0 respectively, the IP configuration of the first bridge is overwritten accordingly.","localized":"note-dip-switch-status"},"hidden":"networking.tcpip.dipswitch.mode is hw-not-available","title":{"default":"DIP Switch Status","localized":"dip-switch-status-label"},"fields":[{"title":{"default":"DIP Switch Mode","localized":"dipswitchmode"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.dipswitch.mode"},{"title":{"default":"DIP Switch Value","localized":"dipswitchvalue"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.dipswitch.value"}]},{"repeat":"networking.tcpip.interfaces.*.label","title":{"default":"${networking.tcpip.interfaces.*.label}","localized":"network-details-ip-label"},"fields":[{"title":{"default":"MAC Address","localized":"macaddress"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.macaddress"},{"title":{"default":"IP Source","localized":"ipsource"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.source"},{"title":{"default":"IP Address","localized":"ipaddress"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.current.ipaddress"},{"title":{"default":"Subnet Mask","localized":"subnetmask"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"networking.tcpip.interfaces.*.current.subnetmask"}]}]}]}')
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(5);
        t.initializeVendor = function(e) {
            var t = {
                id: "vendor-information",
                title: e.localization.localized({
                    fallback: "Vendor Information",
                    key: "vendor-information-menu-title"
                }),
                priority: 25
            }
              , n = {
                title: {
                    default: "Vendor Information",
                    localized: "vendor-information-page-title"
                },
                content: [new i.VendorInfo(e)]
            };
            return {
                item: t,
                controller: e.viewGenerator.generate(e, n)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i, r = this && this.__extends || (i = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            i(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), o = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function c(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
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
        var l = function(e) {
            function t(t) {
                var i = e.call(this, t) || this;
                return i.view = document.createElement("wbm-legal-information-vendor-info"),
                i.view.innerHTML = n(6),
                i
            }
            return r(t, e),
            t.prototype.load = function() {
                return o(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        return [2]
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(n(0).ViewController);
        t.VendorInfo = l
    }
    , function(e, t) {
        e.exports = "<style>#vendor-and-trademark-information{white-space:pre-line}</style> <p id=vendor-and-trademark-information><b>3S-Smart Software Solutions GmbH</b><br><b>A member of the CODESYS Group</b><br>Memminger Straße 151<br>87439 Kempten, Germany</p>"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(8);
        t.initializeAbout = function(e) {
            return {
                item: {
                    id: "wbm-version",
                    title: e.localization.localized({
                        fallback: "WBM Version",
                        key: "wbm-version-menu-title"
                    }),
                    priority: 0
                },
                controller: new i.About(e)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i, r = this && this.__extends || (i = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            i(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        , a = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function c(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
        , l = this && this.__generator || function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
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
        var c = n(0)
          , s = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.view = document.createElement("wbm-about-view"),
                n
            }
            return r(t, e),
            t.prototype.createPage = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, n, i, r = this;
                    return l(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return [4, this.base.manifest.getInfo()];
                        case 1:
                            return e = a.sent(),
                            t = this.getFormViewDescriptionForPackage({
                                name: "wbm-web-based-management",
                                version: e.version + " (core " + e.core + " / base " + e.base + ")",
                                description: e.description,
                                license: e.license
                            }),
                            n = this.base.plugin.getLoaded(),
                            i = n.map((function(e) {
                                return o({}, r.getFormViewDescriptionForPackage({
                                    name: e.name,
                                    version: e.version,
                                    description: e.description,
                                    license: e.license
                                }, "Plugin"), {
                                    collapsible: "collapsed"
                                })
                            }
                            )),
                            [2, this.base.viewGenerator.generate(this.base, {
                                title: {
                                    default: "WBM Version Info",
                                    localized: "wbm-version-nfo"
                                },
                                content: [t].concat(i)
                            })]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e;
                    return l(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.page ? [3, 2] : (e = this,
                            [4, this.createPage()]);
                        case 1:
                            e.page = t.sent(),
                            this.view.appendChild(this.page.view),
                            t.label = 2;
                        case 2:
                            return this.page.load(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return a(this, void 0, void 0, (function() {
                    return l(this, (function(e) {
                        return this.page && this.page.unload(),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.getFormViewDescriptionForPackage = function(e, t) {
                var i = this.getPackageTitle(e.name);
                return {
                    title: {
                        localized: e.name + "-form-title",
                        default: (t ? t + ": " : "") + i
                    },
                    sections: [new (function(e) {
                        function t(t, i, r, o) {
                            var a = e.call(this, t) || this;
                            return a.version = i,
                            a.description = r,
                            a.license = o,
                            a.didLoad = !1,
                            a.view = document.createElement("div"),
                            a.view.classList.add("section"),
                            a.view.innerHTML = n(9),
                            a
                        }
                        return r(t, e),
                        t.prototype.load = function() {
                            return a(this, void 0, void 0, (function() {
                                var e, t, n;
                                return l(this, (function(i) {
                                    return this.didLoad || (this.didLoad = !0,
                                    e = this.view.querySelector(".package-version"),
                                    this.version ? e.querySelector("p").innerHTML = this.version : e.remove(),
                                    t = this.view.querySelector(".package-description"),
                                    this.description ? t.querySelector("p").textContent = this.description : t.remove(),
                                    n = this.view.querySelector(".package-license"),
                                    this.license ? n.querySelector("p").textContent = this.license : n.remove()),
                                    [2]
                                }
                                ))
                            }
                            ))
                        }
                        ,
                        t
                    }(c.ViewController))(this.base,e.version,e.description || "",e.license || "")]
                }
            }
            ,
            t.prototype.getPackageTitle = function(e) {
                return e.split("-").filter((function(e) {
                    return "wbm" !== e
                }
                )).map((function(e) {
                    return e.substr(0, 1).toUpperCase() + e.substr(1)
                }
                )).join(" ")
            }
            ,
            t
        }(c.ViewController);
        t.About = s
    }
    , function(e, t) {
        e.exports = '<div class="field package-info package-version"> <label>Version</label> <p>package version goes here</p> </div> <div class="field package-info package-license"> <label>License</label> <p>package license goes here</p> </div> <div class="field package-info package-description"> <label>Description</label> <p>package description goes here</p> </div>'
    }
    ])
}
));
//# sourceMappingURL=information.js.map
