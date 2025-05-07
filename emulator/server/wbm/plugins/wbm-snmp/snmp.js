/*!
 * @wago/wbm-snmp@1.1.0
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
 *     SNMP Configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.snmp = t() : e.snmp = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var a = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(a.exports, a, a.exports, n),
            a.l = !0,
            a.exports
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
                for (var a in e)
                    n.d(i, a, function(t) {
                        return e[t]
                    }
                    .bind(null, a));
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
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        var i = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var a in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }
          , a = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(a, r) {
                function l(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function o(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function c(e) {
                    e.done ? a(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(l, o)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var n, i, a, r, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function o(r) {
                return function(o) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (n = 1,
                                i && (a = 2 & r[0] ? i.return : r[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, r[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (r = [2 & r[0], a.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    a = r;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = l.trys,
                                    (a = a.length > 0 && a[a.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                        l.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = r;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(r);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                r = t.call(e, l)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = n(1)
          , o = n(2)
          , c = n(4)
          , d = n(7);
        base.plugin.register("wbm-snmp", (function(e) {
            return a(this, void 0, void 0, (function() {
                var t, n, a, u, s;
                return r(this, (function(r) {
                    return t = {
                        id: "snmp",
                        title: {
                            fallback: "SNMP",
                            key: "title-snmp"
                        },
                        description: {
                            fallback: "SNMP Configuration",
                            key: "description-snmp"
                        },
                        priority: 750,
                        userRoles: [l.UserRoles.admin]
                    },
                    n = e.subframeGenerator.createSubFrame(t.id, e, ["snmp-area"]),
                    a = o.initializeSNMPGeneral(e),
                    n.registerSubMenuItem(a.item, a.controller),
                    u = c.initializeSNMPv1_2c(e),
                    n.registerSubMenuItem(u.item, u.controller),
                    s = d.initializeSNMPv3(e),
                    n.registerSubMenuItem(s.item, s.controller),
                    [2, i({}, t, {
                        controller: n
                    })]
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
        function(e) {
            e.admin = "admin",
            e.user = "user",
            e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(3);
        t.initializeSNMPGeneral = function(e) {
            var t = {
                id: "general-snmp-configuration",
                priority: 1e3,
                title: e.localization.localized({
                    fallback: "General Configuration",
                    key: "title-snmp-general"
                })
            }
              , n = i.createGeneralConfigurationPage();
            return {
                item: t,
                controller: e.viewGenerator.generate(e, n)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createGeneralConfigurationPage = function() {
            return {
                title: {
                    default: "Configuration of general SNMP parameters",
                    localized: "page-title-general-snmp"
                },
                note: {
                    default: "Changes of Description and ObjectID will take effect after the next software or hardware reset.\n All other changes will take effect immediately.",
                    localized: "page-note-snmp-general-configuration"
                },
                content: [{
                    title: {
                        default: "General SNMP Configuration",
                        localized: "title-general-snmp-configuration"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Service active",
                                localized: "snmp-state-label"
                            },
                            parameter: "snmp.state",
                            control: {
                                type: "checkbox"
                            }
                        }, {
                            title: {
                                default: "Name of device",
                                localized: "snmp-device-name"
                            },
                            parameter: "snmp.devicename",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Description",
                                localized: "snmp-device-description"
                            },
                            parameter: "snmp.devicedescription",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Physical Location",
                                localized: "snmp-physical-location"
                            },
                            parameter: "snmp.physicallocation",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "Contact",
                                localized: "snmp-contact"
                            },
                            parameter: "snmp.contact",
                            control: {
                                type: "textfield"
                            }
                        }, {
                            title: {
                                default: "ObjectID",
                                localized: "snmp-objectid"
                            },
                            parameter: "snmp.objectid",
                            control: {
                                type: "textfield"
                            }
                        }]
                    }]
                }]
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(a, r) {
                function l(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function o(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function c(e) {
                    e.done ? a(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(l, o)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , a = this && this.__generator || function(e, t) {
            var n, i, a, r, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function o(r) {
                return function(o) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (n = 1,
                                i && (a = 2 & r[0] ? i.return : r[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, r[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (r = [2 & r[0], a.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    a = r;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = l.trys,
                                    (a = a.length > 0 && a[a.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                        l.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = r;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(r);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                r = t.call(e, l)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, o])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.initializeSNMPv1_2c = function(e) {
            var t = {
                id: "v1_2c-snmp-configuration",
                priority: 950,
                title: e.localization.localized({
                    fallback: "SNMP v1/v2c",
                    key: "title-snmp-v1_2c"
                })
            }
              , r = {
                title: {
                    default: "Configuration of SNMP v1/v2c parameters",
                    localized: "page-title-snmpv1_2c-snmp"
                },
                note: {
                    default: "Changes will take effect after the next controller reboot.",
                    localized: "page-note-snmpv1_2c-configuration"
                },
                content: [n(5), n(6)]
            }
              , l = e.viewGenerator.generate(e, r);
            return function(e, t) {
                var n = this;
                e.parameter.observe("snmp.v1v2c.state", {
                    kind: "change",
                    maxHistoryLength: 0,
                    throttleTime: 0
                }, (function(t, r, l) {
                    return i(n, void 0, void 0, (function() {
                        return a(this, (function(t) {
                            return !1 === r && e.parameter.read("snmp.v1v2c.communityname").then((function(e) {
                                var t = $("div[taid=field-snmpv1_2c-community-name] input")
                                  , n = e[0].value;
                                void 0 === n && (n = ""),
                                t.val(n)
                            }
                            )),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ))
            }(e),
            {
                item: t,
                controller: l
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"SNMP v1/v2c Manager Configuration","localized":"snmpv1_2c-manager-title"},"sections":[{"note":{"default":"Disabling the protocol will also delete the configured community name.","localized":"snmpv1_2c-section-note"},"fields":[{"title":{"default":"Protocol enabled","localized":"snmpv1_2c-protocol-enabled"},"parameter":"snmp.v1v2c.state","control":{"type":"checkbox"}},{"title":{"default":"Community name","localized":"snmpv1_2c-community-name"},"parameter":"snmp.v1v2c.communityname","control":{"type":"textfield"}}]}]}')
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Actually configured Trap Receivers","localized":"snmpv1_2c-trap-receiver-title"},"sections":[{"repeat":"snmp.v1v2c.trapreceiver.*.communityname","empty":{"default":"(no trap receivers configured)","localized":"snmp-v1-v2c-no-trap-receiver-note"},"delete":"snmp.v1v2c.trapreceiver.*.delete","add":"snmp.v1v2c.trapreceiver.add","fields":[{"title":{"default":"IP Address","localized":"snmp-v1-v2c-trap-receiver-address-label"},"parameter":"snmp.v1v2c.trapreceiver.*.address","control":{"type":"textfield"}},{"title":{"default":"Community Name","localized":"snmp-v1-v2c-trap-receiver-community-name-label"},"parameter":"snmp.v1v2c.trapreceiver.*.communityname","control":{"type":"textfield"}},{"title":{"default":"Version","localized":"snmp-v1-v2c-trap-receiver-version-label"},"parameter":"snmp.v1v2c.trapreceiver.*.version","control":{"type":"textfield"}}]},{"title":{"default":"Add new Trap Receiver","localized":"snmpv1_2c-trap-receiver-add-title"},"fields":[{"title":{"default":"IP Address","localized":"snmpv1_2c-trap-receiver-add-ip-address"},"control":{"type":"textfield","validation":{"pattern":"^$|^(?:(?:\\\\d|[1-9]\\\\d|1\\\\d\\\\d|2[0-4]\\\\d|25[0-5])\\\\.){3}(?:\\\\d|[1-9]\\\\d|1\\\\d\\\\d|2[0-4]\\\\d|25[0-5])$","hint":{"default":"Must be a valid IP adress (e.g. 192.168.1.17)","localized":"snmp-v1-v2c-add-trap-receiver-validation-hint-ip-v4-address"}}},"argument":"ipaddress"},{"title":{"default":"Community name","localized":"snmpv1_2c-trap-receiver-add-community-name"},"control":{"type":"textfield"},"argument":"communityname"},{"title":{"default":"Version","localized":"snmpv1_2c-trap-receiver-add-version"},"control":{"type":"dropdown","items":[{"title":{"default":"V1","localized":"snmpv1_2c-trap-receiver-add-version-v1"},"value":"v1"},{"title":{"default":"V2c","localized":"snmpv1_2c-trap-receiver-add-version-v2c"},"value":"v2c"}]},"argument":"version"}],"action":{"method":"snmp.v1v2c.trapreceiver.add","title":{"default":"Add","localized":"snmp-v1-v2c-trap-receiver-add-button-title"},"type":"add"}}]}')
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.initializeSNMPv3 = function(e) {
            var t = {
                id: "v3-configuration",
                priority: 900,
                title: e.localization.localized({
                    fallback: "SNMP v3",
                    key: "title-snmp-v3"
                })
            }
              , i = {
                title: {
                    default: "Configuration of SNMP v3 Users",
                    localized: "page-title-snmp-v3"
                },
                note: {
                    default: "Changes will take effect after the next controller reboot.",
                    localized: "page-note-snmpv3-configuration"
                },
                content: [n(8)]
            };
            return {
                item: t,
                controller: e.viewGenerator.generate(e, i)
            }
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Actually configured v3 Users","localized":"snmp-v3-user-count-section-title"},"sections":[{"repeat":"snmp.v3.user.*.authenticationname","empty":{"default":"(no users configured)","localized":"snmp-v3-no-users-note"},"delete":"snmp.v3.user.*.delete","add":"snmp.v3.add.user","title":{"default":"User ${snmp.v3.user.*.index}","localized":"snmp-v3-user-index-title"},"fields":[{"title":{"default":"Security Authentication Name","localized":"snmp-v3-user-authentication-name-label"},"parameter":"snmp.v3.user.*.authenticationname","control":{"type":"textfield"}},{"title":{"default":"Authentication Type","localized":"snmp-v3-user-authentication-type-label"},"parameter":"snmp.v3.user.*.authenticationtype","control":{"type":"textfield"}},{"title":{"default":"Authentication Key","localized":"snmp-v3-user-authentication-key-label"},"parameter":"snmp.v3.user.*.authenticationkey","control":{"type":"textfield"}},{"title":{"default":"Privacy","localized":"snmp-v3-user-privacy-label"},"parameter":"snmp.v3.user.*.privacy","control":{"type":"textfield"}},{"title":{"default":"Privacy Key","localized":"snmp-v3-user-privacy-key-label"},"parameter":"snmp.v3.user.*.privacykey","control":{"type":"textfield"}},{"title":{"default":"Notification Receiver IP","localized":"snmp-v3-user-notification-receiver-ip-label"},"parameter":"snmp.v3.user.*.notificationreceiverip","control":{"type":"textfield"}}]},{"title":{"default":"Add new v3 User","localized":"snmpv3-user-add-title"},"fields":[{"title":{"default":"Security Authentication Name","localized":"snmpv3-user-authentication-name"},"control":{"type":"textfield"},"argument":"auth-name"},{"title":{"default":"Authentication Type","localized":"snmpv3-user-authentication-type"},"control":{"type":"dropdown","items":[{"title":{"default":"None","localized":"snmpv3-user-add-athentication-type-none"},"value":"none"},{"title":{"default":"MD5","localized":"snmpv3-user-add-athentication-type-md5"},"value":"MD5"},{"title":{"default":"SHA","localized":"snmpv3-user-add-athentication-type-sha"},"value":"SHA"}]},"argument":"auth-type"},{"title":{"default":"Authentication Key","localized":"snmpv3-user-add-athentication-key"},"control":{"type":"textfield","validation":{"pattern":"^$|^.{8,}$","hint":{"default":"Min. 8 char","localized":"validation-hint-minimum-characters"}}},"argument":"auth-key"},{"title":{"default":"Privacy","localized":"snmpv3-user-add-privacy"},"control":{"type":"dropdown","items":[{"title":{"default":"None","localized":"snmpv3-user-add-privacy-none"},"value":"none"},{"title":{"default":"DES","localized":"snmpv3-user-add-privacy-des"},"value":"DES"},{"title":{"default":"AES","localized":"snmpv3-user-add-privacy-aes"},"value":"AES"}]},"argument":"privacy"},{"title":{"default":"Privacy Key","localized":"snmpv3-user-add-privacy-key"},"control":{"type":"textfield","validation":{"pattern":"^$|^.{8,}$","hint":{"default":"Min. 8 char","localized":"validation-hint-minimum-characters"}}},"argument":"privacy-key"},{"title":{"default":"Notification Receiver IP","localized":"snmpv3-user-add-notification-receiver-ip"},"control":{"type":"textfield","validation":{"pattern":"^$|^(?:(?:\\\\d|[1-9]\\\\d|1\\\\d\\\\d|2[0-4]\\\\d|25[0-5])\\\\.){3}(?:\\\\d|[1-9]\\\\d|1\\\\d\\\\d|2[0-4]\\\\d|25[0-5])$","hint":{"default":"Must be a valid IP adress (e.g. 192.168.1.17)","localized":"validation-hint-ip-v4-address"}}},"argument":"notification-receiver-ip"}],"action":{"method":"snmp.v3.add.user","title":{"default":"Add","localized":"snmpv3-user-add-button-title"},"type":"add"}}]}')
    }
    ])
}
));
//# sourceMappingURL=snmp.js.map
