/*!
 * @wago/wbm-firewall@1.5.0
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
 *     Firewall Settings
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.firewall = t() : e.firewall = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function l(i) {
            if (t[i])
                return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, l),
            r.l = !0,
            r.exports
        }
        return l.m = e,
        l.c = t,
        l.d = function(e, t, i) {
            l.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        l.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        l.t = function(e, t) {
            if (1 & t && (e = l(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (l.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    l.d(i, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return i
        }
        ,
        l.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return l.d(t, "a", t),
            t
        }
        ,
        l.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        l.p = "",
        l(l.s = 1)
    }([function(e, t, l) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.chunk = function(e, t) {
            for (var l = []; e.length; )
                l.push(e.splice(0, t));
            return l
        }
    }
    , function(e, t, l) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, l, i) {
            return new (l || (l = Promise))((function(r, a) {
                function n(e) {
                    try {
                        f(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function o(e) {
                    try {
                        f(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function f(e) {
                    e.done ? r(e.value) : new l((function(t) {
                        t(e.value)
                    }
                    )).then(n, o)
                }
                f((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var l, i, r, a, n = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function o(a) {
                return function(o) {
                    return function(a) {
                        if (l)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (l = 1,
                                i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, a[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                i = 0
                            } finally {
                                l = r = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = l(2)
          , n = l(4)
          , o = l(6)
          , f = l(7);
        base.plugin.register("wbm-firewall", (function(e) {
            return i(this, void 0, void 0, (function() {
                var t, i, c, s, d, u;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return t = e.subframeGenerator.createSubFrame("firewall", e, []),
                        i = l(9),
                        c = e.viewGenerator.generate(e, i),
                        t.registerSubMenuItem({
                            id: "global",
                            title: e.localization.localized({
                                key: "firewall-global-options",
                                fallback: "General Configuration"
                            }),
                            priority: 101
                        }, c),
                        s = !1,
                        d = !1,
                        u = !1,
                        [4, e.parameter.read("features.*.name").then((function(e) {
                            for (var t = 0; t < e.length; t++) {
                                var l = e[t].value;
                                "tftp" === l && (s = !0),
                                "telnet" === l && (d = !0),
                                "iocheck" === l && (u = !0)
                            }
                        }
                        ))];
                    case 1:
                        return r.sent(),
                        [4, e.parameter.transaction((function() {
                            a.initializeUserFilterPage(e, t),
                            n.initializeInterfacePages(e, t, s, d, u),
                            f.initializeMacFilterPage(e, t)
                        }
                        ))];
                    case 2:
                        return r.sent(),
                        [2, {
                            id: "firewall",
                            title: {
                                fallback: "Firewall",
                                key: "firewall"
                            },
                            description: {
                                fallback: "Firewall Configuration",
                                key: "firewall-description"
                            },
                            priority: 0,
                            controller: t,
                            userRoles: [o.UserRoles.admin]
                        }]
                    }
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, l) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, l, i) {
            return new (l || (l = Promise))((function(r, a) {
                function n(e) {
                    try {
                        f(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function o(e) {
                    try {
                        f(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function f(e) {
                    e.done ? r(e.value) : new l((function(t) {
                        t(e.value)
                    }
                    )).then(n, o)
                }
                f((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var l, i, r, a, n = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function o(a) {
                return function(o) {
                    return function(a) {
                        if (l)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (l = 1,
                                i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, a[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                i = 0
                            } finally {
                                l = r = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = l(3)
          , n = l(0);
        t.initializeUserFilterPage = function(e, t) {
            return i(this, void 0, void 0, (function() {
                var l, i, o, f, c, s, d, u, p;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(["networking.capabilities.wan", "firewall.interfaces.*.label", "firewall.interfaces.*.name"])];
                    case 1:
                        return l = r.sent(),
                        i = l[0],
                        o = l.slice(1),
                        f = i.value,
                        c = n.chunk(o.map((function(e) {
                            return e.value
                        }
                        )), o.length / 2),
                        s = c[0],
                        d = c[1],
                        u = d.filter((function(e) {
                            return f || "WAN" !== e
                        }
                        )).map((function(e, t) {
                            return {
                                label: s[t],
                                name: e
                            }
                        }
                        )),
                        p = a.generateUserFilterPage(e, u),
                        t.registerSubMenuItem({
                            id: "user-filter-configuration",
                            priority: 1,
                            title: e.localization.localized({
                                key: "firewall-user-filter-configuration-menu-title",
                                fallback: "User Filter"
                            })
                        }, p),
                        [2]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e, t, l) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.generateUserFilterPage = function(e, t) {
            return e.viewGenerator.generate(e, {
                title: {
                    default: "Configuration of User Filter",
                    localized: "firewall-user-filter-page-title"
                },
                content: [{
                    title: {
                        default: "User filter",
                        localized: "firewall-user-filter-form-title"
                    },
                    sections: [{
                        repeat: "firewall.userfilter.*.policy",
                        delete: "firewall.userfilter.*.delete",
                        add: "firewall.adduserfilter",
                        empty: {
                            default: "(no user filters)",
                            localized: "firewall-user-filter-empty-note"
                        },
                        fields: [{
                            title: {
                                default: "Policy",
                                localized: "firewall-user-filter-policy-field-title"
                            },
                            parameter: "firewall.userfilter.*.policy",
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "Accept",
                                        localized: "firewall-user-filter-policy-accept-item-title"
                                    },
                                    value: "accept"
                                }, {
                                    title: {
                                        default: "Drop",
                                        localized: "firewall-user-filter-policy-drop-item-title"
                                    },
                                    value: "drop"
                                }]
                            }
                        }, {
                            hidden: "firewall.userfilter.*.source.address is -",
                            title: {
                                default: "Source IP address",
                                localized: "firewall-user-filter-source-address-field-title"
                            },
                            parameter: "firewall.userfilter.*.source.address",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            hidden: "firewall.userfilter.*.source.mask is -",
                            title: {
                                default: "Source Netmask",
                                localized: "firewall-user-filter-source-mask-field-title"
                            },
                            parameter: "firewall.userfilter.*.source.mask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            hidden: "firewall.userfilter.*.source.port is -",
                            title: {
                                default: "Source Port",
                                localized: "firewall-user-filter-source-port-field-title"
                            },
                            parameter: "firewall.userfilter.*.source.port",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            hidden: "firewall.userfilter.*.destination.address is -",
                            title: {
                                default: "Destination IP address",
                                localized: "firewall-user-filter-destination-address-field-title"
                            },
                            parameter: "firewall.userfilter.*.destination.address",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            hidden: "firewall.userfilter.*.destination.mask is -",
                            title: {
                                default: "Destination Netmask",
                                localized: "firewall-user-filter-destination-mask-field-title"
                            },
                            parameter: "firewall.userfilter.*.destination.mask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            hidden: "firewall.userfilter.*.destination.port is -",
                            title: {
                                default: "Destination Port",
                                localized: "firewall-user-filter-destination-port-field-title"
                            },
                            parameter: "firewall.userfilter.*.destination.port",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Protocol",
                                localized: "firewall-user-filter-protocol-field-title"
                            },
                            parameter: "firewall.userfilter.*.protocol",
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "TCP/UDP",
                                        localized: "firewall-user-filter-protocol-tcpudp-item-title"
                                    },
                                    value: "tcpudp"
                                }, {
                                    title: {
                                        default: "TCP",
                                        localized: "firewall-user-filter-protocol-tcp-item-title"
                                    },
                                    value: "tcp"
                                }, {
                                    title: {
                                        default: "UDP",
                                        localized: "firewall-user-filter-protocol-udp-item-title"
                                    },
                                    value: "udp"
                                }]
                            }
                        }, {
                            title: {
                                default: "Input Interface",
                                localized: "firewall-user-filter-interface-field-title"
                            },
                            parameter: "firewall.userfilter.*.interfacelabel",
                            control: {
                                type: "textfield"
                            }
                        }]
                    }, {
                        title: {
                            default: "Add new user filter",
                            localized: "firewall-user-filter-add-form-title"
                        },
                        action: {
                            title: {
                                default: "Add",
                                localized: "firewall-user-filter-add-button-title"
                            },
                            method: "firewall.adduserfilter",
                            type: "add"
                        },
                        fields: [{
                            title: {
                                default: "Policy",
                                localized: "firewall-user-filter-policy-field-title"
                            },
                            argument: "policy",
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "Accept",
                                        localized: "firewall-user-filter-policy-accept-item-title"
                                    },
                                    value: "accept"
                                }, {
                                    title: {
                                        default: "Drop",
                                        localized: "firewall-user-filter-policy-drop-item-title"
                                    },
                                    value: "drop"
                                }]
                            }
                        }, {
                            title: {
                                default: "Source IP address",
                                localized: "firewall-user-filter-source-address-field-title"
                            },
                            argument: "sourceIp",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Source Netmask",
                                localized: "firewall-user-filter-source-mask-field-title"
                            },
                            argument: "sourceMask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Source Port",
                                localized: "firewall-user-filter-source-port-field-title"
                            },
                            argument: "sourcePort",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Destination IP address",
                                localized: "firewall-user-filter-destination-address-field-title"
                            },
                            argument: "destIp",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Destination Netmask",
                                localized: "firewall-user-filter-destination-mask-field-title"
                            },
                            argument: "destMask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Destination Port",
                                localized: "firewall-user-filter-destination-port-field-title"
                            },
                            argument: "destPort",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Protocol",
                                localized: "firewall-user-filter-protocol-field-title"
                            },
                            argument: "protocol",
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "TCP/UDP",
                                        localized: "firewall-user-filter-protocol-tcpudp-item-title"
                                    },
                                    value: "tcpudp"
                                }, {
                                    title: {
                                        default: "TCP",
                                        localized: "firewall-user-filter-protocol-tcp-item-title"
                                    },
                                    value: "tcp"
                                }, {
                                    title: {
                                        default: "UDP",
                                        localized: "firewall-user-filter-protocol-udp-item-title"
                                    },
                                    value: "udp"
                                }]
                            }
                        }, {
                            title: {
                                default: "Input Interface",
                                localized: "firewall-user-filter-interface-field-title"
                            },
                            argument: "iface",
                            control: {
                                type: "dropdown",
                                items: [{
                                    title: {
                                        default: "Any",
                                        localized: "firewall-input-interface-any"
                                    },
                                    value: "Any"
                                }].concat(Object.keys(t).map((function(e) {
                                    return {
                                        title: {
                                            default: t[parseInt(e)].label,
                                            localized: "firewall-input-interface"
                                        },
                                        value: t[parseInt(e)].name
                                    }
                                }
                                )))
                            }
                        }]
                    }]
                }]
            })
        }
    }
    , function(e, t, l) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, l, i) {
            return new (l || (l = Promise))((function(r, a) {
                function n(e) {
                    try {
                        f(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function o(e) {
                    try {
                        f(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function f(e) {
                    e.done ? r(e.value) : new l((function(t) {
                        t(e.value)
                    }
                    )).then(n, o)
                }
                f((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var l, i, r, a, n = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function o(a) {
                return function(o) {
                    return function(a) {
                        if (l)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (l = 1,
                                i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, a[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                i = 0
                            } finally {
                                l = r = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = l(5)
          , n = ["WAN", "VPN"];
        function o(e) {
            return n.indexOf(e) >= 0
        }
        function f(e, t) {
            var l = o(e.name)
              , i = o(t.name);
            return l && !i ? 1 : !l && i ? -1 : 0
        }
        function c(e, t) {
            return e.name < t.name ? -1 : 1
        }
        t.initializeInterfacePages = function(e, t, l, n, s) {
            return i(this, void 0, void 0, (function() {
                var i, d, u, p, m, w, b;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(["networking.capabilities.wan", "firewall.interfaces.*.name"])];
                    case 1:
                        return i = r.sent(),
                        d = i[0],
                        u = i.slice(1),
                        p = d.value,
                        m = u.map((function(e, t) {
                            return {
                                name: e.value,
                                index: t
                            }
                        }
                        )),
                        w = m.sort(c).sort(f).filter((function(e) {
                            return p || "WAN" !== e.name
                        }
                        )).map((function(t) {
                            var i = o(t.name);
                            return a.generateInterfaceForm(e, t.index, t.name, l, n, s, !i)
                        }
                        )),
                        b = e.viewGenerator.generate(e, {
                            title: {
                                localized: "firewall-interface-configuration-page-title",
                                default: "Interface Configuration"
                            },
                            content: w
                        }),
                        t.registerSubMenuItem({
                            id: "interface-configuration",
                            priority: 100,
                            title: e.localization.localized({
                                key: "firewall-interface-configuration-menu-title",
                                fallback: "Interface Configuration"
                            })
                        }, b),
                        [2]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e, t, l) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.generateInterfaceForm = function(e, t, l, i, r, a, n) {
            void 0 === n && (n = !1);
            var o = ["telnet", "ftp", "ftps", "http", "https", "iocheck", "codesysr", "codesysw", "ssh", "tftp", "dhcpd", "dns", "modbustcp", "modbusudp", "snmp", "opcua", "bacnet", "profinet", "dnp3", "iec608705104", "iec61850mms"];
            r || o.splice(o.indexOf("telnet"), 1),
            i || o.splice(o.indexOf("tftp"), 1),
            a || o.splice(o.indexOf("iocheck"), 1);
            var f = {
                hidden: n ? "networking.tcpip.interfaces.*.name contains not " + l : void 0,
                title: {
                    default: "Firewall Configuration ${firewall.interfaces." + t + ".label}",
                    localized: "firewall-interface-configuration-general-configuration-form-title"
                },
                sections: [{
                    fields: [{
                        title: {
                            default: "Firewall Enabled for Interface",
                            localized: "firewall-interface-configuration-enabled-field-title"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "firewall.interfaces." + t + ".enabled"
                    }]
                }, {
                    fields: [{
                        title: {
                            default: "ICMP Echo Protection",
                            localized: "firewall-interface-configuration-icmp-protection-enabled-field-title"
                        },
                        control: {
                            type: "checkbox"
                        },
                        parameter: "firewall.interfaces." + t + ".icmpbroadcastprotection.enabled"
                    }, {
                        title: {
                            default: "ICMP Echo Limit per ${firewall.interfaces." + t + ".icmpbroadcastprotection.echolimit.unit}",
                            localized: "firewall-interface-configuration-icmp-limit-field-title"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "firewall.interfaces." + t + ".icmpbroadcastprotection.echolimit.value"
                    }, {
                        title: {
                            default: "ICMP Burst Limit (0=disabled)",
                            localized: "firewall-interface-configuration-burst-limit-field-title"
                        },
                        control: {
                            type: "textfield"
                        },
                        parameter: "firewall.interfaces." + t + ".icmpbroadcastprotection.burstlimit.value"
                    }]
                }, {
                    title: {
                        default: "Service Configuration",
                        localized: "firewall-interface-configuration-service-form-title"
                    },
                    fields: o.map((function(e) {
                        return {
                            title: {
                                default: "${firewall.interfaces." + t + ".services." + e + ".label}",
                                localized: "firewall-interface-configuration-service-" + e + "-state-field-title"
                            },
                            parameter: "firewall.interfaces." + t + ".services." + e + ".enabled",
                            control: {
                                type: "checkbox"
                            }
                        }
                    }
                    )).slice()
                }]
            };
            return e.viewGenerator.generate(e, f)
        }
    }
    , function(e, t, l) {
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
    , function(e, t, l) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, l, i) {
            return new (l || (l = Promise))((function(r, a) {
                function n(e) {
                    try {
                        f(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function o(e) {
                    try {
                        f(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function f(e) {
                    e.done ? r(e.value) : new l((function(t) {
                        t(e.value)
                    }
                    )).then(n, o)
                }
                f((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var l, i, r, a, n = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return a = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function o(a) {
                return function(o) {
                    return function(a) {
                        if (l)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (l = 1,
                                i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, a[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        n.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(a);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                a = t.call(e, n)
                            } catch (e) {
                                a = [6, e],
                                i = 0
                            } finally {
                                l = r = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = l(0)
          , n = l(8);
        t.initializeMacFilterPage = function(e, t) {
            return i(this, void 0, void 0, (function() {
                var l, i, o, f, c, s;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(["firewall.macaddressfilter.interfaces.*.label", "firewall.macaddressfilter.interfaces.*.name"])];
                    case 1:
                        return l = r.sent().slice(0),
                        i = a.chunk(l.map((function(e) {
                            return e.value
                        }
                        )), l.length / 2),
                        o = i[0],
                        f = i[1],
                        c = f.reduce((function(e, t, l) {
                            return e[l] = {
                                label: o[l],
                                name: t
                            },
                            e
                        }
                        ), {}),
                        s = n.generateMacFilterPage(e, c),
                        t.registerSubMenuItem({
                            id: "mac-filter-configuration",
                            priority: 2,
                            title: e.localization.localized({
                                key: "firewall-mac-filter-configuration-menu-title",
                                fallback: "MAC Address Filter"
                            })
                        }, s),
                        [2]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e, t, l) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.generateMacFilterPage = function(e, t) {
            return e.viewGenerator.generate(e, {
                title: {
                    default: "Configuration of MAC address filter",
                    localized: "firewall-mac-address-filter-page-title"
                },
                content: [{
                    title: {
                        default: "Global MAC address filter state",
                        localized: "firewall-mac-address-global-state-form-title"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Filter enabled",
                                localized: "firewall-mac-address-filter-field-title"
                            },
                            parameter: "firewall.macaddressfilter.enabled",
                            control: {
                                type: "checkbox"
                            }
                        }],
                        confirm: {
                            title: {
                                default: "Attention",
                                key: "mac-address-filter-state-confirm-title"
                            },
                            message: {
                                default: "Have you checked whether your own MAC address is given and enabled in the whitelist?\nIf not, you will have no access from your system once it has been activated.\nDo you want to continue?",
                                key: "mac-address-filter-state-confirm-message"
                            },
                            hidden: "firewall.macaddressfilter.enabled is true"
                        }
                    }]
                }].concat(Object.keys(t).map((function(e) {
                    return {
                        hidden: "networking.tcpip.interfaces.*.name contains not " + t[parseInt(e)].name,
                        title: {
                            default: "MAC address filter state " + t[parseInt(e)].label,
                            localized: "firewall-mac-address-filter-interface-state-form-title"
                        },
                        sections: [{
                            fields: [{
                                title: {
                                    default: "Filter enabled",
                                    localized: "firewall-mac-address-filter-field-title"
                                },
                                parameter: "firewall.macaddressfilter.interfaces." + e + ".enabled",
                                control: {
                                    type: "checkbox"
                                }
                            }],
                            confirm: {
                                title: {
                                    default: "Attention",
                                    key: "mac-address-filter-state-confirm-title"
                                },
                                message: {
                                    default: "Have you checked whether your own MAC address is given and enabled in the whitelist?\nIf not, you will have no access from your system once it has been activated.\nDo you want to continue?",
                                    key: "mac-address-filter-state-confirm-message"
                                },
                                hidden: "firewall.macaddressfilter.interfaces." + e + ".enabled is true"
                            }
                        }]
                    }
                }
                )), [{
                    title: {
                        default: "MAC address filter whitelist",
                        localized: "firewall-mac-address-filter-whitelist-form-title"
                    },
                    sections: [{
                        repeat: "firewall.macaddressfilter.whitelist.*.enabled",
                        delete: "firewall.macaddressfilter.whitelist.*.delete",
                        add: "firewall.macaddressfilter.addwhitelist",
                        empty: {
                            default: "(no MAC address filters)",
                            localized: "firewall-mac-address-filter-whitelist-empty-note"
                        },
                        fields: [{
                            title: {
                                default: "MAC address",
                                localized: "firewall-mac-address-filter-whitelist-mac-address-field-title"
                            },
                            parameter: "firewall.macaddressfilter.whitelist.*.address",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "MAC mask",
                                localized: "firewall-mac-address-filter-whitelist-mac-mask-field-title"
                            },
                            parameter: "firewall.macaddressfilter.whitelist.*.mask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Filter enabled",
                                localized: "firewall-mac-address-filter-whitelist-enabled-field-title"
                            },
                            parameter: "firewall.macaddressfilter.whitelist.*.enabled",
                            control: {
                                type: "checkbox"
                            }
                        }],
                        confirm: {
                            title: {
                                default: "Attention",
                                key: "mac-address-filter-deactivate-confirm-title"
                            },
                            message: {
                                default: "Connection to the device may be lost by disabling this whitelist entry. Consider to disable the MAC address filter first.",
                                key: "mac-address-filter-delete-confirm-message"
                            },
                            hidden: "firewall.macaddressfilter.whitelist.*.enabled is false"
                        },
                        confirmdeletion: {
                            title: {
                                default: "Attention",
                                key: "mac-address-filter-delete-confirm-title"
                            },
                            message: {
                                default: "Connection to the device may be lost by deleting this whitelist entry. Consider to disable the MAC address filter first.",
                                key: "mac-address-filter-delete-confirm-message"
                            }
                        }
                    }, {
                        title: {
                            default: "Add filter to whitelist",
                            localized: "firewall-mac-address-filter-whitelist-add-form-title"
                        },
                        action: {
                            title: {
                                default: "Add",
                                localized: "firewall-mac-address-filter-whitelist-add-button-title"
                            },
                            method: "firewall.macaddressfilter.addwhitelist",
                            type: "add"
                        },
                        fields: [{
                            title: {
                                default: "MAC address",
                                localized: "firewall-mac-address-filter-whitelist-mac-address-field-title"
                            },
                            argument: "address",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "MAC mask",
                                localized: "firewall-mac-address-filter-whitelist-mac-mask-field-title"
                            },
                            argument: "mask",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Filter enabled",
                                localized: "firewall-mac-address-filter-whitelist-enabled-field-title"
                            },
                            argument: "enabled",
                            control: {
                                type: "checkbox"
                            }
                        }]
                    }]
                }])
            })
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"General Firewall Configuration","localized":"firewall-page-title"},"content":[{"title":{"default":"Global Firewall Configuration","localized":"firewall-global-form-title"},"sections":[{"fields":[{"title":{"default":"Firewall enabled entirely","localized":"firewall-global-enabled-field-title"},"parameter":"firewall.enabled","control":{"type":"checkbox"}},{"title":{"default":"ICMP echo broadcast protection","localized":"firewall-global-icmp-echo-broadcast-protection-field-title"},"parameter":"firewall.icmpbroadcastprotection.enabled","control":{"type":"checkbox"}}]},{"fields":[{"title":{"default":"Max. UDP connections per ${firewall.connectionlimit.udp.unit}","localized":"firewall-global-max-udp-connections-field-title"},"parameter":"firewall.connectionlimit.udp.value","control":{"type":"textfield"}},{"title":{"default":"Max. TCP connections per ${firewall.connectionlimit.tcp.unit}","localized":"firewall-global-max-tcp-connections-field-title"},"parameter":"firewall.connectionlimit.tcp.value","control":{"type":"textfield"}}]}]}]}')
    }
    ])
}
));
//# sourceMappingURL=firewall.js.map
