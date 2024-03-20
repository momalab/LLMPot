/*!
 * @wago/wbm-opcua@2.2.0
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
 *     OPCUA configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.opcua = t() : e.opcua = t()
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
        r(r.s = 2)
    }([function(e, t, r) {
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
    , function(e, t, r) {
        "use strict";
        var o = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, a) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, l)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
          , n = this && this.__generator || function(e, t) {
            var r, o, n, a, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
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
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, a[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        i.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(a);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                a = t.call(e, i)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
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
        var a = r(3);
        r(4);
        var i = r(8)
          , l = r(9)
          , s = r(10)
          , c = r(13);
        base.plugin.register("wbm-opcua", (function(e) {
            return o(this, void 0, void 0, (function() {
                var t, r, o, u, d, f, p;
                return n(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, e.parameter.read("features.*.name")];
                    case 1:
                        return r = n.sent(),
                        o = r.some((function(e) {
                            return "opcua-server" == e.value
                        }
                        )) ? "wago" : "codesys",
                        u = !!r.some((function(e) {
                            return "feature_drm" == e.value
                        }
                        )),
                        "codesys" == o ? t = e.viewGenerator.generate(e, c.default(e)) : (t = e.subframeGenerator.createSubFrame("opcua", e, []),
                        d = e.viewGenerator.generate(e, i.default(e)),
                        t.registerSubMenuItem({
                            id: "status",
                            title: e.localization.localized({
                                key: "opcua-status",
                                fallback: "Status"
                            }),
                            priority: 900
                        }, d),
                        f = e.viewGenerator.generate(e, l.default(e)),
                        t.registerSubMenuItem({
                            id: "config",
                            title: e.localization.localized({
                                key: "opcua-config",
                                fallback: "Configuration"
                            }),
                            priority: 800
                        }, f),
                        u && (p = e.viewGenerator.generate(e, s.default(e)),
                        t.registerSubMenuItem({
                            id: "informationmodel",
                            title: e.localization.localized({
                                key: "opcua-information-model",
                                fallback: "Information Model"
                            }),
                            priority: 400
                        }, p))),
                        [2, {
                            id: "opcua",
                            title: {
                                fallback: "OPC UA",
                                key: "opcua-title"
                            },
                            description: {
                                fallback: "OPC UA Configuration",
                                key: "opcua-description"
                            },
                            priority: 200,
                            controller: t,
                            userRoles: [a.UserRoles.admin]
                        }]
                    }
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
        (e.exports = r(6)(!1)).push([e.i, "div.body>wbm-opcua-server-delete-form>div.section{border-top:none}", ""])
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
                            l = btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                            s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),
                            "/*# ".concat(s, " */"))
                              , a = o.sources.map((function(e) {
                                return "/*# sourceURL=".concat(o.sourceRoot).concat(e, " */")
                            }
                            ));
                            return [r].concat(a).concat([n]).join("\n")
                        }
                        var i, l, s;
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
                    var a = this[n][0];
                    null != a && (o[a] = !0)
                }
                for (var i = 0; i < e.length; i++) {
                    var l = e[i];
                    null != l[0] && o[l[0]] || (r && !l[2] ? l[2] = r : r && (l[2] = "(".concat(l[2], ") and (").concat(r, ")")),
                    t.push(l))
                }
            }
            ,
            t
        }
    }
    , function(e, t, r) {
        "use strict";
        var o, n = {}, a = function() {
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
        function l(e, t) {
            for (var r = [], o = {}, n = 0; n < e.length; n++) {
                var a = e[n]
                  , i = t.base ? a[0] + t.base : a[0]
                  , l = {
                    css: a[1],
                    media: a[2],
                    sourceMap: a[3]
                };
                o[i] ? o[i].parts.push(l) : r.push(o[i] = {
                    id: i,
                    parts: [l]
                })
            }
            return r
        }
        function s(e, t) {
            for (var r = 0; r < e.length; r++) {
                var o = e[r]
                  , a = n[o.id]
                  , i = 0;
                if (a) {
                    for (a.refs++; i < a.parts.length; i++)
                        a.parts[i](o.parts[i]);
                    for (; i < o.parts.length; i++)
                        a.parts.push(v(o.parts[i], t))
                } else {
                    for (var l = []; i < o.parts.length; i++)
                        l.push(v(o.parts[i], t));
                    n[o.id] = {
                        id: o.id,
                        refs: 1,
                        parts: l
                    }
                }
            }
        }
        function c(e) {
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
        var u, d = (u = [],
        function(e, t) {
            return u[e] = t,
            u.filter(Boolean).join("\n")
        }
        );
        function f(e, t, r, o) {
            var n = r ? "" : o.css;
            if (e.styleSheet)
                e.styleSheet.cssText = d(t, n);
            else {
                var a = document.createTextNode(n)
                  , i = e.childNodes;
                i[t] && e.removeChild(i[t]),
                i.length ? e.insertBefore(a, i[t]) : e.appendChild(a)
            }
        }
        function p(e, t, r) {
            var o = r.css
              , n = r.media
              , a = r.sourceMap;
            if (n && e.setAttribute("media", n),
            a && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")),
            e.styleSheet)
                e.styleSheet.cssText = o;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }
        var h = null
          , m = 0;
        function v(e, t) {
            var r, o, n;
            if (t.singleton) {
                var a = m++;
                r = h || (h = c(t)),
                o = f.bind(null, r, a, !1),
                n = f.bind(null, r, a, !0)
            } else
                r = c(t),
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
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = a());
            var r = l(e, t);
            return s(r, t),
            function(e) {
                for (var o = [], a = 0; a < r.length; a++) {
                    var i = r[a]
                      , c = n[i.id];
                    c && (c.refs--,
                    o.push(c))
                }
                e && s(l(e, t), t);
                for (var u = 0; u < o.length; u++) {
                    var d = o[u];
                    if (0 === d.refs) {
                        for (var f = 0; f < d.parts.length; f++)
                            d.parts[f]();
                        delete n[d.id]
                    }
                }
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            return {
                title: {
                    default: "OPC UA Status",
                    localized: "opcua-status-page-title"
                },
                content: [{
                    title: {
                        default: "OPC UA Server",
                        localized: "opcua-server-status-form-title"
                    },
                    note: {
                        default: "Note: Without a license only the OPC UA standard functions are available.",
                        localized: "wago-opcua-status-page-note"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "State",
                                localized: "opcua-server-state-form-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.enabled",
                            options: {
                                readonly: !0
                            }
                        }, {
                            title: {
                                default: "Version",
                                localized: "opcua-server-version-form-title"
                            },
                            control: {
                                type: "textfield"
                            },
                            parameter: "opcuaserver.version",
                            options: {
                                readonly: !0
                            }
                        }, {
                            title: {
                                default: "License",
                                localized: "opcua-server-license-form-title"
                            },
                            control: {
                                type: "textfield"
                            },
                            parameter: "opcuaserver.license",
                            options: {
                                readonly: !0
                            }
                        }]
                    }]
                }]
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            return {
                title: {
                    default: "OPC UA Configuration",
                    localized: "opcua-page-title"
                },
                note: {
                    default: "Changes will take effect immediately.\n\nNote: If changes are made, the OPC UA server is restarted after pressing any of the Submit buttons. Existing connections will be lost.",
                    localized: "wago-opcua-config-page-note"
                },
                content: [{
                    title: {
                        default: "OPC UA Server Configuration",
                        localized: "opcua-server-general-configuration-form-title"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Service enabled",
                                localized: "opcua-server-enabled-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.enabled"
                        }, {
                            title: {
                                default: "Ctrl Configuration name",
                                localized: "opcua-server-name-field-title"
                            },
                            control: {
                                type: "textfield"
                            },
                            parameter: "opcuaserver.ctrlconfigurationname"
                        }, {
                            title: {
                                default: "Log level",
                                localized: "opcua-server-log-level-field-title"
                            },
                            control: {
                                type: "dropdown",
                                items: [{
                                    value: "info",
                                    title: {
                                        default: "Info",
                                        localized: "opcua-server-log-level-info-item-title"
                                    }
                                }, {
                                    value: "debug",
                                    title: {
                                        default: "Debug",
                                        localized: "opcua-server-log-level-debug-item-title"
                                    }
                                }, {
                                    value: "warning",
                                    title: {
                                        default: "Warning",
                                        localized: "opcua-server-log-level-warning-item-title"
                                    }
                                }, {
                                    value: "error",
                                    title: {
                                        default: "Error",
                                        localized: "opcua-server-log-level-error-item-title"
                                    }
                                }]
                            },
                            parameter: "opcuaserver.loglevel"
                        }, {
                            title: {
                                default: "Unlimited anonymous access",
                                localized: "opcua-server-unlimited-anonymous-access-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.unlimitedanonymousaccess"
                        }]
                    }]
                }, {
                    title: {
                        default: "OPC UA Endpoint URL",
                        localized: "opcua-server-endpoint-url-form-title"
                    },
                    note: {
                        default: "Changes from Networking Configuration (Hostname, Bridge, IP Address, etc.) will take effect after next Controller reboot or OPC UA Server restart",
                        localized: "wago-opcua-server-endpoint-url-page-note"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Interface",
                                localized: "opcua-server-endpoint-url-interface-field-title"
                            },
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "Hostname",
                                        localized: "opcua-server-interface-hostname-item-title"
                                    },
                                    value: "hostname"
                                }, {
                                    repeat: "networking.ethernet.bridge.*.label",
                                    title: {
                                        default: "${networking.ethernet.bridge.*.label} (${networking.tcpip.interfaces.*.current.ipaddress})",
                                        localized: "opcua-server-interface-${networking.ethernet.bridge.*.name}-item-title"
                                    },
                                    value: "${networking.ethernet.bridge.*.name}"
                                }]
                            },
                            parameter: "opcuaserver.endpoint.url.interface"
                        }]
                    }]
                }, {
                    title: {
                        default: "OPC UA Endpoints",
                        localized: "opcua-server-endpoints-form-title"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Security Policy - None",
                                localized: "opcua-server-security-policy-none-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.endpoints.securitypolicynone"
                        }, {
                            title: {
                                default: "Security Policy - Basic128Rsa15",
                                localized: "opcua-server-security-policy-basic128rsa15-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.endpoints.securitypolicybasic128rsa15"
                        }, {
                            title: {
                                default: "Security Policy - Basic256Sha256",
                                localized: "opcua-server-security-policy-basic256sha256-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.endpoints.securitypolicybasic256sha256"
                        }]
                    }]
                }, {
                    title: {
                        default: "OPC UA Security Settings",
                        localized: "opcua-server-security-settings-form-title"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Trust all clients",
                                localized: "opcua-server-trust-all-clients-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.trustallclients"
                        }]
                    }, {
                        taid: "opcua-server-security-settings-sub-form-title",
                        fields: [{
                            title: {
                                default: "Application URI Check",
                                localized: "opcua-server-application-uri-check-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.applicationuricheck"
                        }, {
                            title: {
                                default: "Error Certificate Time",
                                localized: "opcua-server-error-certificate-time-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.errorcertificatetime"
                        }, {
                            title: {
                                default: "Certificate Issuer Time Invalid",
                                localized: "opcua-server-certificate-issuer-time-invalid-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.certificateissuertimeinvalid"
                        }, {
                            title: {
                                default: "Certificate Revocation Unknown",
                                localized: "opcua-server-certificate-revocation-unknown-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.certificaterevocationunknown"
                        }, {
                            title: {
                                default: "Certificate Issuer Revocation Unknown",
                                localized: "opcua-server-certificate-issuer-revocation-unknown-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.security.certificateissuerrevocationunknown"
                        }]
                    }]
                }]
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(11)
          , n = r(12);
        t.default = function(e) {
            return {
                title: {
                    default: "OPC UA Information Model",
                    localized: "opcua-informationmodel-page-title"
                },
                note: {
                    default: "Changes will take effect immediately.\n\nNote: If changes are made, the OPC UA server is restarted after pressing any of the Submit, Upload and Delete buttons. Existing connections will be lost.",
                    localized: "wago-opcua-config-page-note"
                },
                content: [{
                    title: {
                        default: "OPC UA Server Information Model",
                        localized: "opcua-server-informationmodel-form-title"
                    },
                    note: {
                        default: "Note: A License is required to use this feature.",
                        localized: "opcua-server-informationmodelxml-note"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Feature enabled",
                                localized: "opcua-server-informationmodel-field-title"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "opcuaserver.feature.informationmodel"
                        }]
                    }, new o.UploadForm(e,"informationmodelxml"), new n.DeleteForm(e,"informationmodelxml")]
                }]
            }
        }
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
        ), a = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, a) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, l)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , i = this && this.__generator || function(e, t) {
            var r, o, n, a, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
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
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, a[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        i.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(a);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                a = t.call(e, i)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
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
        var l = r(0)
          , s = r(1)
          , c = function(e) {
            function t(t, r) {
                var o = e.call(this, t) || this;
                return o.view = document.createElement("wbm-opcua-server-upload-form"),
                o.name = r,
                o.path = "/tmp/opcua_upload",
                o
            }
            return n(t, e),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, r, o, n = this;
                    return i(this, (function(a) {
                        return e = {
                            informationmodelxml: "informationmodel.xml"
                        },
                        this.view.innerHTML = '        \n                <div class="section titled-section">\n                    <span class="title" taid="section-title-' + this.name + '-upload">' + e[this.name] + '</span>\n                    <div class="section-body">\n                        <div class="field" taid="field-' + this.name + '-upload-label" >\n                            <div class="control">\n                                <label class="file-input" data-placeholder="Choose file..." data-filename=""><input type="file" taid="field-control"></label>\n                            </div>\n                            <button taid="action-' + this.name + '-upload" class="action" disabled="disabled">Upload</button>\n                        </div>\n                    </div>\n                </div>\n        ',
                        (t = this.view.querySelector("button")).addEventListener("click", (function() {
                            return n.uploadButtonPressed()
                        }
                        )),
                        r = this.view.querySelector("input"),
                        o = this.view.querySelector("label.file-input"),
                        r.addEventListener("change", (function() {
                            var e = r.files && r.files.length && r.files[0].name || "";
                            o.setAttribute("data-filename", e),
                            t.disabled = !e
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.uploadButtonPressed = function() {
                return a(this, void 0, void 0, (function() {
                    return i(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, this.base.modalPresenter.showDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Upload",
                                    key: "upload-prompt-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Do you really want to upload this file?   Warning: You may override an existing file!   Note: You need a OPC UA Extended License!",
                                    key: "upload-prompt-modal-message"
                                }),
                                primaryButton: {
                                    title: "Upload",
                                    style: s.DialogButtonStyle.action
                                },
                                secondaryButton: s.DialogButton.cancel
                            })];
                        case 1:
                            return e.sent() != s.DialogButtonType.primary ? [3, 3] : [4, this.doUpload()];
                        case 2:
                            e.sent(),
                            e.label = 3;
                        case 3:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.doUpload = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, r, o, n, a, l, s;
                    return i(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            (e = this.view.querySelector("div.section")).classList.add("submitting"),
                            t = this.view.querySelector("input"),
                            r = t.files[0],
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 3, , 4]),
                            [4, this.base.transfer.upload([r], this.path)];
                        case 2:
                            return i.sent(),
                            [3, 4];
                        case 3:
                            return o = i.sent(),
                            e.classList.remove("submitting"),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-upload-failed-error-modal-title",
                                    fallback: "Upload failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-upload-failed-error-modal-message",
                                    fallback: "Could not upload the file"
                                }),
                                detailMessage: o.message
                            })];
                        case 4:
                            return i.trys.push([4, 6, , 7]),
                            [4, this.base.parameter.execute("opcuaserver.upload." + this.name, {
                                path: this.path,
                                filename: r.name
                            })];
                        case 5:
                            if ((n = i.sent()).error)
                                throw n.error;
                            return [3, 7];
                        case 6:
                            return a = i.sent(),
                            this.base.transfer.cleanUp(),
                            e.classList.remove("submitting"),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-upload-failed-error-modal-title",
                                    fallback: "Copy failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-copy-failed-error-modal-message",
                                    fallback: "Could not copy the uploaded file"
                                }),
                                detailMessage: a.message
                            })];
                        case 7:
                            return i.trys.push([7, 9, , 10]),
                            [4, this.base.parameter.execute("opcuaserver.restart")];
                        case 8:
                            if ((l = i.sent()).error)
                                throw l.error;
                            return [3, 10];
                        case 9:
                            return s = i.sent(),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-upload-failed-error-modal-title",
                                    fallback: "Restart failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-restart-failed-error-modal-message",
                                    fallback: "Could not restart the OPC UA Server"
                                }),
                                detailMessage: s.message
                            })];
                        case 10:
                            return t.value = "",
                            t.dispatchEvent(new CustomEvent("change")),
                            e.classList.remove("submitting"),
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
        t.UploadForm = c
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
        ), a = this && this.__awaiter || function(e, t, r, o) {
            return new (r || (r = Promise))((function(n, a) {
                function i(e) {
                    try {
                        s(o.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(o.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof r ? t : new r((function(e) {
                        e(t)
                    }
                    ))).then(i, l)
                }
                s((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , i = this && this.__generator || function(e, t) {
            var r, o, n, a, i = {
                label: 0,
                sent: function() {
                    if (1 & n[0])
                        throw n[1];
                    return n[1]
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
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i; )
                            try {
                                if (r = 1,
                                o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o),
                                0) : o.next) && !(n = n.call(o, a[1])).done)
                                    return n;
                                switch (o = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    o = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        i.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && i.label < n[1]) {
                                        i.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && i.label < n[2]) {
                                        i.label = n[2],
                                        i.ops.push(a);
                                        break
                                    }
                                    n[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                a = t.call(e, i)
                            } catch (e) {
                                a = [6, e],
                                o = 0
                            } finally {
                                r = n = 0
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
        var l = r(0)
          , s = r(1)
          , c = function(e) {
            function t(t, r) {
                var o = e.call(this, t) || this;
                return o.view = document.createElement("wbm-opcua-server-delete-form"),
                o.name = r,
                o
            }
            return n(t, e),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e = this;
                    return i(this, (function(t) {
                        return {
                            informationmodelxml: "informationmodel.xml"
                        },
                        this.view.innerHTML = '        \n                <div class="section">                    \n                    <div class="section-body">\n                        <div class="field" taid="field-' + this.name + '-delete-label" >\n                            <div class="control"></div>\n                            <button taid="action-' + this.name + '-delete" class="action" >Delete</button>\n                        </div>\n                    </div>\n                </div>\n        ',
                        this.view.querySelector("button").addEventListener("click", (function() {
                            return e.deleteButtonPressed()
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.deleteButtonPressed = function() {
                return a(this, void 0, void 0, (function() {
                    var e;
                    return i(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return (e = this.view.querySelector("button")).disabled = !0,
                            [4, this.base.modalPresenter.showDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Delete",
                                    key: "delete-prompt-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Do you really want to delete an existing informationmodel.xml?",
                                    key: "delete-prompt-modal-message"
                                }),
                                primaryButton: {
                                    title: "Delete",
                                    style: s.DialogButtonStyle.action
                                },
                                secondaryButton: s.DialogButton.cancel
                            })];
                        case 1:
                            return t.sent() != s.DialogButtonType.primary ? [3, 3] : [4, this.doDelete()];
                        case 2:
                            t.sent(),
                            t.label = 3;
                        case 3:
                            return e.disabled = !1,
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.doDelete = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, r, o;
                    return i(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            [4, this.base.parameter.execute("opcuaserver.delete." + this.name, {})];
                        case 1:
                            if ((e = n.sent()).error)
                                throw e.error;
                            return [3, 3];
                        case 2:
                            return t = n.sent(),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-delete-failed-error-modal-title",
                                    fallback: "Delete failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-delete-failed-error-modal-message",
                                    fallback: "Could not delete the informationmodel.xml"
                                }),
                                detailMessage: t.message
                            })];
                        case 3:
                            return n.trys.push([3, 5, , 6]),
                            [4, this.base.parameter.execute("opcuaserver.restart")];
                        case 4:
                            if ((r = n.sent()).error)
                                throw r.error;
                            return [3, 6];
                        case 5:
                            return o = n.sent(),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-delete-failed-error-modal-title",
                                    fallback: "Restart failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-restart-failed-error-modal-message",
                                    fallback: "Could not restart the OPC UA Server"
                                }),
                                detailMessage: o.message
                            })];
                        case 6:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(l.ViewController);
        t.DeleteForm = c
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e) {
            return {
                title: {
                    default: "OPC UA Configuration",
                    localized: "opcua-page-title"
                },
                note: {
                    default: "Changes will take effect after next device reboot.",
                    localized: "codesys-opcua-page-note"
                },
                content: [{
                    title: {
                        default: "OPC UA",
                        localized: "codesys-opcua-configuration-title"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Service active",
                                localized: "codesys-opcua-port-state-label"
                            },
                            parameter: "codesys.opcua.state",
                            control: {
                                type: "checkbox"
                            }
                        }]
                    }]
                }]
            }
        }
    }
    ])
}
));
//# sourceMappingURL=opcua.js.map
