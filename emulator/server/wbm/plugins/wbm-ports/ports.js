/*!
 * @wago/wbm-ports@1.9.0
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
 *     Configuration of ports and services
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ports = t() : e.ports = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function i(o) {
            if (t[o])
                return t[o].exports;
            var r = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(r.exports, r, r.exports, i),
            r.l = !0,
            r.exports
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
                for (var r in e)
                    i.d(o, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
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
        }),
        function(e) {
            e.admin = "admin",
            e.user = "user",
            e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }
    , function(e, t, i) {
        "use strict";
        var o = this && this.__assign || Object.assign || function(e) {
            for (var t, i = 1, o = arguments.length; i < o; i++)
                for (var r in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
          , r = this && this.__awaiter || function(e, t, i, o) {
            return new (i || (i = Promise))((function(r, n) {
                function a(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        n(e)
                    }
                }
                function l(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        n(e)
                    }
                }
                function s(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
          , n = this && this.__generator || function(e, t) {
            var i, o, r, n, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return n = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (n[Symbol.iterator] = function() {
                return this
            }
            ),
            n;
            function l(n) {
                return function(l) {
                    return function(n) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                o && (r = 2 & n[0] ? o.return : n[0] ? o.throw || ((r = o.return) && r.call(o),
                                0) : o.next) && !(r = r.call(o, n[1])).done)
                                    return r;
                                switch (o = 0,
                                r && (n = [2 & n[0], r.value]),
                                n[0]) {
                                case 0:
                                case 1:
                                    r = n;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    o = n[1],
                                    n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!r || n[1] > r[0] && n[1] < r[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = n;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(n);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                n = t.call(e, a)
                            } catch (e) {
                                n = [6, e],
                                o = 0
                            } finally {
                                i = r = 0
                            }
                        if (5 & n[0])
                            throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }([n, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i(0)
          , l = i(2)
          , s = i(8)
          , c = i(10)
          , d = i(12)
          , u = i(14)
          , f = i(17)
          , p = i(19);
        function h() {
            return r(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return [4, base.parameter.read(["networking.tcpip.interfaces.*.label", "networking.tcpip.interfaces.*.name"])];
                    case 1:
                        return e = t.sent().slice(0),
                        [2, p.chunk(e.map((function(e) {
                            return e.value
                        }
                        )), e.length / 2)]
                    }
                }
                ))
            }
            ))
        }
        base.plugin.register("wbm-ports", (function(e) {
            return r(this, void 0, void 0, (function() {
                var t, i, r, p, b, g, v, m, y, w, k, z, S, P;
                return n(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t = {
                            id: "ports-and-services",
                            title: {
                                fallback: "Ports and Services",
                                key: "title-ports"
                            },
                            description: {
                                fallback: "Configuration of ports and services",
                                key: "description-ports"
                            },
                            priority: 800,
                            userRoles: [a.UserRoles.admin, a.UserRoles.user]
                        },
                        i = !1,
                        r = !1,
                        p = !1,
                        [4, e.parameter.read("features.*.name").then((function(e) {
                            for (var t = 0; t < e.length; t++) {
                                var o = e[t].value;
                                "tftp" === o && (i = !0),
                                "telnet" === o && (r = !0),
                                "iocheck" === o && (p = !0)
                            }
                        }
                        ))];
                    case 1:
                        return n.sent(),
                        b = e.subframeGenerator.createSubFrame(t.id, e, ["ports"]),
                        g = l.initializeNetworkServices(e, r, p),
                        b.registerSubMenuItem(g.item, g.controller),
                        i && (v = s.initializeTftp(e),
                        b.registerSubMenuItem(v.item, v.controller)),
                        m = d.initializeSsh(e),
                        b.registerSubMenuItem(m.item, m.controller),
                        y = c.initializeNtp(e),
                        b.registerSubMenuItem(y.item, y.controller),
                        [4, h()];
                    case 2:
                        return w = n.sent(),
                        k = w[0],
                        z = w[1],
                        S = u.initializeDhcp(e, k, z),
                        b.registerSubMenuItem(S.item, S.controller),
                        P = f.initializeDns(e),
                        b.registerSubMenuItem(P.item, P.controller),
                        [2, o({}, t, {
                            controller: b
                        })]
                    }
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0)
          , r = i(3);
        t.initializeNetworkServices = function(e, t, i) {
            var n = {
                id: "network-services",
                title: e.localization.localized({
                    fallback: "Network Services",
                    key: "title-network-services-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "Configuration of Network Services",
                    key: "description-network-services-configuration"
                }),
                priority: 1e3,
                userRoles: [o.UserRoles.admin]
            }
              , a = r.createNetworkServicesPageViewDescription(e, t, i);
            return {
                item: n,
                controller: e.viewGenerator.generate(e, a)
            }
        }
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(4);
        t.createNetworkServicesPageViewDescription = function(e, t, i) {
            var r = {
                title: {
                    default: "Configuration of Network Services",
                    localized: "page-title-network-services-configuration"
                },
                note: {
                    default: "Changes will take effect immediately.\n\nNote: After disabling HTTP or HTTPS service, Web-based Management will possibly lose connection to the device.",
                    localized: "page-note-network-services-configuration"
                },
                content: [{
                    title: {
                        default: "FTP",
                        localized: "title-ftp-port-configuration"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Service active",
                                localized: "ftp-port-state-label"
                            },
                            parameter: "networking.ports.ftp.state",
                            control: {
                                type: "checkbox"
                            }
                        }]
                    }]
                }, {
                    title: {
                        default: "FTPS",
                        localized: "title-ftps-port-configuration"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Service active",
                                localized: "ftps-port-state-label"
                            },
                            parameter: "networking.ports.ftps.state",
                            control: {
                                type: "checkbox"
                            }
                        }]
                    }]
                }, {
                    title: {
                        default: "HTTP",
                        localized: "title-http-port-configuration"
                    },
                    sections: [new o.HttpsConfig(e,"http","https")]
                }, {
                    title: {
                        default: "HTTPS",
                        localized: "title-https-port-configuration"
                    },
                    sections: [new o.HttpsConfig(e,"https","http")]
                }]
            };
            return t && r.content.unshift({
                title: {
                    default: "Telnet",
                    localized: "title-telnet-port-configuration"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Service active",
                            localized: "telnet-port-state-label"
                        },
                        parameter: "networking.ports.telnet.state",
                        control: {
                            type: "checkbox"
                        }
                    }]
                }]
            }),
            i && r.content.push({
                title: {
                    default: "I/O-Check",
                    localized: "title-iocheck-port-configuration"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Service active",
                            localized: "iocheck-port-state-label"
                        },
                        parameter: "networking.ports.iocheck.state",
                        control: {
                            type: "checkbox"
                        }
                    }]
                }]
            }),
            r
        }
    }
    , function(e, t, i) {
        "use strict";
        var o, r = this && this.__extends || (o = Object.setPrototypeOf || {
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
        ), n = this && this.__awaiter || function(e, t, i, o) {
            return new (i || (i = Promise))((function(r, n) {
                function a(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        n(e)
                    }
                }
                function l(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        n(e)
                    }
                }
                function s(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var i, o, r, n, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return n = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (n[Symbol.iterator] = function() {
                return this
            }
            ),
            n;
            function l(n) {
                return function(l) {
                    return function(n) {
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (i = 1,
                                o && (r = 2 & n[0] ? o.return : n[0] ? o.throw || ((r = o.return) && r.call(o),
                                0) : o.next) && !(r = r.call(o, n[1])).done)
                                    return r;
                                switch (o = 0,
                                r && (n = [2 & n[0], r.value]),
                                n[0]) {
                                case 0:
                                case 1:
                                    r = n;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    o = n[1],
                                    n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!r || n[1] > r[0] && n[1] < r[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = n;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(n);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                n = t.call(e, a)
                            } catch (e) {
                                n = [6, e],
                                o = 0
                            } finally {
                                i = r = 0
                            }
                        if (5 & n[0])
                            throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }([n, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = i(5)
          , s = i(6)
          , c = function(e) {
            function t(t, o, r) {
                var n = e.call(this, t) || this;
                return n.didLoad = !1,
                n.configurablePortName = o,
                n.toBeCheckedPortName = r,
                n.configurableId = "networking.ports." + o.toLowerCase() + ".state",
                n.toBeCheckedId = "networking.ports." + r.toLowerCase() + ".state",
                n.view = document.createElement("wbm-" + o.toLowerCase() + "-port-configuration"),
                n.view.innerHTML = i(7),
                n.field = t.viewGenerator.generate(t, {
                    title: {
                        default: "Service active",
                        localized: n.configurablePortName.toLowerCase() + "-port-state-label"
                    },
                    parameter: n.configurableId,
                    control: {
                        type: "checkbox"
                    }
                }),
                n.view.querySelector("div.section-body").appendChild(n.field.view),
                n
            }
            return r(t, e),
            Object.defineProperty(t.prototype, "checkbox", {
                get: function() {
                    return this.field.view.querySelector("input")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "submitButton", {
                get: function() {
                    return this.view.querySelector("button")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "sectionDiv", {
                get: function() {
                    return this.view.querySelector("div.section")
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.write = function() {
                return n(this, void 0, void 0, (function() {
                    var e, t, i, o, r, n, l = this;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return e = this.checkbox.checked,
                            t = !0,
                            i = !1,
                            [4, this.base.parameter.read(this.toBeCheckedId)];
                        case 1:
                            return (o = a.sent()[0]).error ? this.base.logger.log("error while reading " + this.toBeCheckedPortName + " port state") : i = o.value,
                            e || i ? [3, 3] : [4, this.base.modalPresenter.showDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Disable HTTP and HTTPS Port",
                                    key: "network-services-disable-all-http-ports-prompt-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Web-based Management will lose connection to the device. Do you really want to disable HTTP and HTTPS at the same time?",
                                    key: "network-services-disable-all-http-ports-prompt-message"
                                }),
                                primaryButton: {
                                    title: "Continue",
                                    style: s.DialogButtonStyle.action
                                },
                                secondaryButton: s.DialogButton.cancel
                            })];
                        case 2:
                            a.sent() != s.DialogButtonType.primary && (t = !1,
                            this.checkbox.checked = !0),
                            a.label = 3;
                        case 3:
                            return t ? (this.sectionDiv.classList.add("submitting"),
                            [4, this.base.parameter.write(this.configurableId, e)]) : [3, 9];
                        case 4:
                            return r = a.sent(),
                            n = void 0,
                            r.error ? [3, 6] : [4, this.base.parameter.commit(this.configurableId)];
                        case 5:
                            return n = a.sent()[0],
                            [3, 7];
                        case 6:
                            n = r,
                            a.label = 7;
                        case 7:
                            return n.error ? (862 === n.error.statusCode && this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Failed to write values",
                                    key: "error-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Errors occured while trying to write " + this.configurablePortName.toUpperCase() + " port state",
                                    key: "read-for-page-failed-modal-message-" + this.configurablePortName.toLowerCase() + "-state"
                                }),
                                detailMessage: n.error.message
                            }),
                            setTimeout((function() {
                                l.sectionDiv.classList.remove("submitting"),
                                l.submitButton.disabled = !0,
                                l.load()
                            }
                            ), 2e3)) : (this.sectionDiv.classList.remove("submitting"),
                            this.submitButton.disabled = !0),
                            e || !i || location.protocol !== this.configurablePortName.toLowerCase() + ":" ? [3, 9] : [4, this.base.modalPresenter.showDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Changing protocol to " + this.toBeCheckedPortName.toUpperCase(),
                                    key: "redirect-to-" + this.configurablePortName.toLowerCase() + "-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "The WBM has to be reloaded in order to change protocol to " + this.toBeCheckedPortName.toUpperCase() + ".",
                                    key: "read-for-page-failed-modal-message-" + this.toBeCheckedPortName.toLowerCase() + "-state"
                                }),
                                primaryButton: {
                                    title: "Reload",
                                    style: s.DialogButtonStyle.action
                                }
                            })];
                        case 8:
                            a.sent() === s.DialogButtonType.primary && (location.href = this.toBeCheckedPortName + location.href.substr(this.configurablePortName.length)),
                            a.label = 9;
                        case 9:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return n(this, void 0, void 0, (function() {
                    var e = this;
                    return a(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.submitButton.disabled = !0,
                            [4, this.field.load()];
                        case 1:
                            return t.sent(),
                            this.didLoad || (this.submitButton.addEventListener("click", (function() {
                                return e.write()
                            }
                            )),
                            this.checkbox.addEventListener("change", (function() {
                                return e.submitButton.disabled = !1
                            }
                            )),
                            this.didLoad = !0),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(l.ViewController);
        t.HttpsConfig = c
    }
    , function(e, t, i) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.primary = "primary",
            e.secondary = "secondary"
        }(t.DialogButtonType || (t.DialogButtonType = {})),
        function(e) {
            e.default = "default",
            e.action = "action"
        }(t.DialogButtonStyle || (t.DialogButtonStyle = {})),
        function(e) {
            e.okay = "okay",
            e.cancel = "cancel"
        }(t.DialogButton || (t.DialogButton = {})),
        function(e) {
            e.default = "default",
            e.info = "info",
            e.warning = "warning",
            e.error = "error"
        }(t.DialogStyle || (t.DialogStyle = {}))
    }
    , function(e, t) {
        e.exports = '<div class=section> <div class=section-body> </div> <div class=actions> <button class="submit-button action" taid=section-submit-button>Submit</button> </div> </div> '
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0);
        t.initializeTftp = function(e) {
            var t = {
                id: "tftp",
                title: e.localization.localized({
                    fallback: "TFTP",
                    key: "title-tftp-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "TFTP Server",
                    key: "description-tftp-server-configuration"
                }),
                priority: 500,
                userRoles: [o.UserRoles.admin]
            }
              , r = i(9);
            return {
                item: t,
                controller: e.viewGenerator.generate(e, r)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"TFTP Server","localized":"page-title-tftp-server-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-tftp-server-configuration"},"content":[{"title":{"default":"TFTP Server","localized":"title-tftp-server-configuration"},"sections":[{"fields":[{"title":{"default":"Service active","localized":"tftp-server-state-label"},"control":{"type":"checkbox"},"parameter":"tftp.server.state"},{"title":{"default":"Download directory","localized":"tftp-server-download-dir-label"},"control":{"type":"textfield"},"parameter":"tftp.server.download.dir"}]}]}]}')
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0);
        t.initializeNtp = function(e) {
            var t = {
                id: "ntp-client",
                title: e.localization.localized({
                    fallback: "NTP Client",
                    key: "title-ntp-client-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "Configuration of NTP Client",
                    key: "description-ntp-client-configuration"
                }),
                priority: 900,
                userRoles: [o.UserRoles.admin]
            }
              , r = i(11);
            return {
                item: t,
                controller: e.viewGenerator.generate(e, r)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Configuration of NTP Client","localized":"page-title-ntp-client-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-ntp-client-configuration"},"content":[{"title":{"default":"NTP Client Configuration","localized":"title-ntp-client-configuration"},"sections":[{"fields":[{"title":{"default":"Service enabled","localized":"ntp-client-state-label"},"control":{"type":"checkbox"},"parameter":"ntp.client.state"},{"hidden":"ntp.client.state is false","title":{"default":"Service Result","localized":"ntp-client-result-label"},"control":{"type":"textfield"},"parameter":"ntp.client.result"},{"title":{"default":"Update Interval (sec)","localized":"ntp-client-update-interval-label"},"control":{"type":"textfield"},"parameter":"ntp.client.update.interval"},{"repeat":"ntp.client.timeserver.*.label","title":{"default":"Time Server ${ntp.client.timeserver.*.label}","localized":"ntp-client-time-server-label"},"control":{"type":"textfield"},"parameter":"ntp.client.timeserver.*.address"}],"action":{"title":{"default":"Update Time","localized":"update-time-now-button-label"},"method":"ntp.client.updatetime","type":"default"}},{"title":{"default":"Additionally assigned (DHCP)","localized":"ntp-client-additionally-assigned"},"fields":[{"empty":{"default":"(no additional servers assigned)","key":"ntp-client-no-additional-servers-assigned"},"repeat":"ntp.client.dhcp.timeserver.*.label","title":{"default":"Time Server ${ntp.client.timeserver.*.label}","localized":"ntp-client-time-server-label"},"control":{"type":"textfield"},"parameter":"ntp.client.dhcp.timeserver.*.address"}]}]}]}')
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0);
        t.initializeSsh = function(e) {
            var t = {
                id: "ssh",
                title: e.localization.localized({
                    fallback: "SSH",
                    key: "title-ssh-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "SSH Server Settings",
                    key: "description-ssh-server-configuration"
                }),
                priority: 500,
                userRoles: [o.UserRoles.admin]
            }
              , r = i(13);
            return {
                item: t,
                controller: e.viewGenerator.generate(e, r)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"SSH Server Settings","localized":"page-title-ssf-server-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-ssh-server-configuration"},"content":[{"title":{"default":"SSH Server","localized":"title-ssh-server-configuration"},"sections":[{"fields":[{"title":{"default":"Service active","localized":"ssh-server-state-label"},"control":{"type":"checkbox"},"parameter":"networking.ports.ssh.state"},{"title":{"default":"Port number","localized":"ssh-server-port-label"},"control":{"type":"textfield"},"parameter":"networking.ports.ssh.port"},{"title":{"default":"Allow root login","localized":"ssh-server-allow-root-login-label"},"control":{"type":"checkbox"},"parameter":"networking.ports.ssh.allowrootlogin"},{"title":{"default":"Allow password login","localized":"ssh-server-allo-password-login-label"},"control":{"type":"checkbox"},"parameter":"networking.ports.ssh.allowpasswordlogin"}]}]}]}')
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0)
          , r = i(15);
        t.initializeDhcp = function(e, t, n) {
            var a = {
                id: "dhcp",
                title: e.localization.localized({
                    fallback: "DHCP Server",
                    key: "title-dhcp-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "DHCP Server",
                    key: "description-dhcp-service-configuration"
                }),
                priority: 499,
                userRoles: [o.UserRoles.admin]
            }
              , l = i(16);
            return t.forEach((function(e, t) {
                var i = n[t]
                  , o = r.createDhcpInterfaceFormViewDescription(t, e, i);
                l.content.push(o)
            }
            )),
            {
                item: a,
                controller: e.viewGenerator.generate(e, l)
            }
        }
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createDhcpInterfaceFormViewDescription = function(e, t, i) {
            return {
                repeat: "networking.tcpip.interfaces." + e + ".label",
                title: {
                    default: "DHCP Server Configuration " + t + " (" + i + ")",
                    localized: "section-title-dhcp-configuration"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Service active",
                            localized: "dhcp-service-active"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "ports.dhcp.interface." + e + ".state"
                    }, {
                        title: {
                            default: "Start IP for Range:",
                            localized: "dhcp-ip-range-firstip-title"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "ports.dhcp.interface." + e + ".iprange.first"
                    }, {
                        title: {
                            default: "End IP for Range:",
                            localized: "dhcp-ip-range-lastip-title"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "ports.dhcp.interface." + e + ".iprange.last"
                    }, {
                        title: {
                            default: "Lease time (min): ",
                            localized: "dhcp-lease-time-title"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "ports.dhcp.interface." + e + ".leasetime"
                    }]
                }, {
                    title: {
                        default: "Static Hosts",
                        localized: "dhcp-static-hosts-section"
                    },
                    fields: [{
                        empty: {
                            default: "No static hosts configured",
                            localized: "dhcp-no-static-hosts-configured-note"
                        },
                        hidden: "ports.dhcp.statichost.*.interface.index is not " + e,
                        repeat: "ports.dhcp.statichost.*.name",
                        delete: "ports.dhcp.statichost.*.delete",
                        add: "ports.dhcp.interface.*.addstatichost",
                        title: {
                            default: "${ports.dhcp.statichost.*.name}",
                            localized: "dhcp-static-host-list-field-label"
                        },
                        parameter: "ports.dhcp.statichost.*.ip",
                        options: {
                            readonly: !0
                        },
                        control: {
                            type: "textfield"
                        }
                    }]
                }, {
                    title: {
                        default: "Add Static Host",
                        localized: "dhcp-add-static-host-section"
                    },
                    action: {
                        title: {
                            default: "Add",
                            localized: "add"
                        },
                        method: "ports.dhcp.interface." + e + ".addstatichost",
                        type: "action"
                    },
                    fields: [{
                        title: {
                            default: "MAC Address or Hostname",
                            localized: "dhcp-add-static-host-mac-hostname-field"
                        },
                        argument: "host",
                        control: {
                            type: "textfield"
                        }
                    }, {
                        title: {
                            default: "Ip Address",
                            localized: "dhcp-add-static-host-ip-address-field"
                        },
                        argument: "ipAddress",
                        control: {
                            type: "textfield"
                        }
                    }]
                }]
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"DHCP Server Configuration","localized":"page-title-dhcp-configuration"},"note":{"default":"Changes will take effect immediately","localized":"notificatien-dhcp-configuration"},"content":[]}')
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(0);
        t.initializeDns = function(e) {
            var t = {
                id: "dns",
                title: e.localization.localized({
                    fallback: "DNS",
                    key: "title-dns-configuration"
                }),
                tooltip: e.localization.localized({
                    fallback: "DNS Service",
                    key: "description-dns-service-configuration"
                }),
                priority: 498,
                userRoles: [o.UserRoles.admin, o.UserRoles.user]
            }
              , r = i(18);
            return {
                item: t,
                controller: e.viewGenerator.generate(e, r)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Configuration of DNS Server","localized":"page-title-dns-service-configuration"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-dns-service-configuration"},"content":[{"title":{"default":"DNS Server","localized":"title-dns-service-configuration"},"sections":[{"fields":[{"title":{"default":"Service active","localized":"dns-service-state-label"},"control":{"type":"checkbox"},"parameter":"networking.ports.dns.state"},{"title":{"default":"Mode","localized":"dns-service-mode-label"},"control":{"type":"dropdown","items":[{"title":{"default":"Proxy","localized":"dns-service-mode-proxy-dropdown-label"},"value":"proxy"},{"title":{"default":"Relay","localized":"dns-service-mode-proxy-dropdown-label"},"value":"relay"}]},"parameter":"networking.ports.dns.mode"}]},{"title":{"default":"Static Hosts","localized":"dns-static-hosts-section"},"fields":[{"empty":{"default":"No static hosts configured","localized":"dns-no-static-hosts-configured-note"},"repeat":"networking.ports.dns.statichost.*.ipaddress","delete":"networking.ports.dns.statichost.*.delete","add":"networking.ports.dns.addstatichost","title":{"default":"${networking.ports.dns.statichost.*.ipaddress}","localized":"dns-static-host-list-field-label"},"parameter":"networking.ports.dns.statichost.*.hostname","options":{"readonly":true},"control":{"type":"textfield"}}]},{"title":{"default":"Add Static Host","localized":"dns-add-static-host-section"},"action":{"title":{"default":"Add","localized":"add"},"method":"networking.ports.dns.addstatichost","type":"action"},"fields":[{"title":{"default":"IP Address","localized":"dns-add-static-host-ip-address-field"},"argument":"ipAddress","control":{"type":"textfield"}},{"title":{"default":"Hostname","localized":"dns-add-static-host-mac-hostname-field"},"argument":"hostname","control":{"type":"textfield"}}]}]}]}')
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chunk = function(e, t) {
            for (var i = []; e.length; )
                i.push(e.splice(0, t));
            return i
        }
    }
    ])
}
));
//# sourceMappingURL=ports.js.map
