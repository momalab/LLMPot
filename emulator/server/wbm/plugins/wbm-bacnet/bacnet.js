/*!
 * @wago/wbm-bacnet@1.4.1
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
 *     BACnet Configuration
 *
 *
 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.bacnet = t() : e.bacnet = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(a) {
            if (t[a]) return t[a].exports;
            var o = t[a] = {i: a, l: !1, exports: {}};
            return e[a].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: a})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var a = Object.create(null);
            if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var o in e) n.d(a, o, function (t) {
                return e[t]
            }.bind(null, o));
            return a
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 2)
    }([function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e.admin = "admin", e.user = "user", e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = function () {
            function e(e) {
                this.base = e
            }

            return e.prototype.onRouteChange = function (e) {
            }, e.prototype.unload = function () {
            }, e
        }();
        t.ViewController = a
    }, function (e, t, n) {
        "use strict";
        var a = this && this.__assign || function () {
            return (a = Object.assign || function (e) {
                for (var t, n = 1, a = arguments.length; n < a; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }).apply(this, arguments)
        }, o = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))((function (o, i) {
                function r(e) {
                    try {
                        s(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function l(e) {
                    try {
                        s(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(r, l)
                }

                s((a = a.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, a, o, i, r = {
                label: 0, sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                }, trys: [], ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                return this
            }), i;

            function l(i) {
                return function (l) {
                    return function (i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; r;) try {
                            if (n = 1, a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a), 0) : a.next) && !(o = o.call(a, i[1])).done) return o;
                            switch (a = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++, {value: i[1], done: !1};
                                case 5:
                                    r.label++, a = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(), r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = r.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1], o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2], r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(), r.trys.pop();
                                    continue
                            }
                            i = t.call(e, r)
                        } catch (e) {
                            i = [6, e], a = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {value: i[0] ? i[1] : void 0, done: !0}
                    }([i, l])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), l = n(3), s = n(5), c = n(9), u = n(11);
        base.plugin.register("wbm-bacnet", (function (e) {
            return o(this, void 0, void 0, (function () {
                var t, n, o, d, f, p;
                return i(this, (function (i) {
                    return t = {
                        id: "bacnet",
                        title: {fallback: "BACnet", key: "title-bacnet"},
                        description: {fallback: "Configuration of BACnet", key: "description-bacnet"},
                        priority: 80,
                        userRoles: [r.UserRoles.admin]
                    }, n = e.subframeGenerator.createSubFrame(t.id, e, []), o = l.initializeBacnetStatus(e), n.registerSubMenuItem(o.item, o.controller), d = s.initializeBacnetConfig(e), n.registerSubMenuItem(d.item, d.controller), f = c.initializeBacnetStorage(e), n.registerSubMenuItem(f.item, f.controller), p = u.initializeBacnetFile(e), n.registerSubMenuItem(p.item, p.controller), [2, a(a({}, t), {controller: n})]
                }))
            }))
        }))
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0);
        t.initializeBacnetStatus = function (e) {
            var t = {
                id: "bacnet-status",
                title: e.localization.localized({fallback: "Status", key: "title-bacnet-status"}),
                tooltip: e.localization.localized({fallback: "Status of BACnet", key: "description-bacnet-status"}),
                priority: 700,
                userRoles: [a.UserRoles.admin]
            }, o = n(4);
            return {item: t, controller: e.viewGenerator.generate(e, o)}
        }
    }, function (e) {
        e.exports = JSON.parse('{"title":{"default":"BACnet Status","localized":"page-title-bacnet-status"},"note":{"default":"BACnet is only available when e!RUNTIME is activated.","localized":"page-note-bacnet-status"},"content":[{"title":{"default":"BACnet Information","localized":"title-bacnet-info"},"sections":[{"fields":[{"title":{"default":"State","localized":"bacnet-current-state-label"},"control":{"type":"checkbox"},"parameter":"bacnet.current.state","options":{"readonly":true}},{"title":{"default":"Version","localized":"bacnet-version-label"},"control":{"type":"textfield"},"parameter":"bacnet.version","options":{"readonly":true}},{"title":{"default":"Status Info","localized":"bacnet-status-info-label"},"control":{"type":"textfield"},"parameter":"bacnet.status.info","options":{"readonly":true}},{"title":{"default":"Device ID","localized":"bacnet-device-id-label"},"control":{"type":"textfield"},"parameter":"bacnet.device.id","options":{"readonly":true}}]}]},{"title":{"default":"BACnet License","localized":"title-bacnet-license"},"sections":[{"fields":[{"title":{"default":"Type","localized":"bacnet-license-name-label"},"control":{"type":"textfield"},"parameter":"bacnet.license.name","options":{"readonly":true}},{"title":{"default":"User Objects","localized":"bacnet-license-info-label"},"control":{"type":"textfield"},"parameter":"bacnet.license.info","options":{"readonly":true}}]}]}]}')
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0), o = n(6);
        t.initializeBacnetConfig = function (e) {
            return {
                item: {
                    id: "bacnet-config",
                    title: e.localization.localized({fallback: "Configuration", key: "title-bacnet-config"}),
                    tooltip: e.localization.localized({
                        fallback: "Configuration of BACnet Service",
                        key: "description-bacnet-config"
                    }),
                    priority: 600,
                    userRoles: [a.UserRoles.admin]
                }, controller: e.viewGenerator.generate(e, o.default(e))
            }
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(7);
        t.default = function (e) {
            return {
                title: {default: "BACnet Configuration", localized: "page-title-bacnet-configuration"},
                note: {
                    default: "Changes will take effect after next controller reboot or runtime restart.",
                    localized: "page-note-bacnet-configuration"
                },
                content: [{
                    title: {default: "BACnet Service", localized: "title-bacnet-service"},
                    sections: [{
                        fields: [{
                            title: {default: "Service active", localized: "bacnet-config-state-label"},
                            control: {type: "checkbox"},
                            parameter: "bacnet.config.state"
                        }]
                    }, new a.RestartForm(e)]
                }, {
                    title: {default: "BACnet Settings", localized: "title-bacnet-settings"},
                    sections: [{
                        fields: [{
                            title: {default: "Port number", localized: "bacnet-udp-port-label"},
                            control: {type: "textfield"},
                            parameter: "bacnet.udp.port"
                        }, {
                            title: {
                                default: "Who Is online interval time (sec)",
                                localized: "bacnet-who-is-online-interval-label"
                            }, control: {type: "textfield"}, parameter: "bacnet.who.is.online.interval"
                        }]
                    }]
                }, {
                    title: {default: "BACnet Data Reset", localized: "title-bacnet-reset"},
                    sections: [{
                        fields: [{
                            title: {
                                default: "Delete Persistence Data",
                                localized: "bacnet-reset-persistence-delete-label"
                            }, control: {type: "checkbox"}, parameter: "bacnet.persistence.delete"
                        }, {
                            title: {
                                default: "Reset all BACnet Data and Settings to Default",
                                localized: "bacnet-reset-delete-all-label"
                            }, control: {type: "checkbox"}, parameter: "bacnet.delete.all"
                        }]
                    }]
                }]
            }
        }
    }, function (e, t, n) {
        "use strict";
        var a, o = this && this.__extends || (a = function (e, t) {
            return (a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), i = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))((function (o, i) {
                function r(e) {
                    try {
                        s(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function l(e) {
                    try {
                        s(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(r, l)
                }

                s((a = a.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, a, o, i, r = {
                label: 0, sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                }, trys: [], ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                return this
            }), i;

            function l(i) {
                return function (l) {
                    return function (i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; r;) try {
                            if (n = 1, a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a), 0) : a.next) && !(o = o.call(a, i[1])).done) return o;
                            switch (a = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++, {value: i[1], done: !1};
                                case 5:
                                    r.label++, a = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(), r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = r.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1], o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2], r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(), r.trys.pop();
                                    continue
                            }
                            i = t.call(e, r)
                        } catch (e) {
                            i = [6, e], a = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {value: i[0] ? i[1] : void 0, done: !0}
                    }([i, l])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var l = n(1), s = n(8), c = function (e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.view = document.createElement("wbm-bacnet-restart-form"), n
            }

            return o(t, e), t.prototype.load = function () {
                return i(this, void 0, void 0, (function () {
                    var e = this;
                    return r(this, (function (t) {
                        return this.view.innerHTML = '\n            <div class="section titled-section">\n                <span class="title" taid="section-title-restart">Runtime restart</span>\n                <div class="field" taid="field-restart-label" >\n                    <div class="control">\n                    </div>\n                    <button taid="action-restart" class="action">Restart</button>\n                </div>\n            </div>\n        ', this.view.querySelector("button").addEventListener("click", (function () {
                            return e.restartButtonPressed()
                        })), [2]
                    }))
                }))
            }, t.prototype.restartButtonPressed = function () {
                return i(this, void 0, void 0, (function () {
                    return r(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.base.modalPresenter.showDialog(this.base, {
                                    title: this.base.localization.localized({
                                        fallback: "Restart",
                                        key: "restart-prompt-modal-title"
                                    }),
                                    message: this.base.localization.localized({
                                        fallback: "Do you really want to restart the runtime?",
                                        key: "restart-prompt-modal-message"
                                    }),
                                    primaryButton: {title: "Restart", style: s.DialogButtonStyle.action},
                                    secondaryButton: s.DialogButton.cancel
                                })];
                            case 1:
                                return e.sent() != s.DialogButtonType.primary ? [3, 3] : [4, this.base.modalPresenter.showLoadingDialog(this.base, {title: "Restarting runtime..."}, this.doRestartRuntime())];
                            case 2:
                                e.sent(), e.label = 3;
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.doRestartRuntime = function () {
                return i(this, void 0, void 0, (function () {
                    var e, t;
                    return r(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return n.trys.push([0, 2, , 3]), [4, this.base.parameter.execute("bacnet.config.restart")];
                            case 1:
                                if ((e = n.sent()).error) throw e.error;
                                return [3, 3];
                            case 2:
                                return t = n.sent(), [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: "config-restart-error-title",
                                        fallback: "Restart runtime failed"
                                    }),
                                    message: this.base.localization.localized({
                                        key: "config-restart-error-message",
                                        fallback: "Could not restart the runtime"
                                    }),
                                    detailMessage: t.message
                                })];
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, t
        }(l.ViewController);
        t.RestartForm = c
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e.primary = "primary", e.secondary = "secondary"
        }(t.DialogButtonType || (t.DialogButtonType = {})), function (e) {
            e.default = "default", e.action = "action"
        }(t.DialogButtonStyle || (t.DialogButtonStyle = {})), function (e) {
            e.okay = "okay", e.cancel = "cancel"
        }(t.DialogButton || (t.DialogButton = {})), function (e) {
            e.default = "default", e.info = "info", e.warning = "warning", e.error = "error"
        }(t.DialogStyle || (t.DialogStyle = {}))
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0);
        t.initializeBacnetStorage = function (e) {
            var t = {
                id: "bacnet-storage",
                title: e.localization.localized({fallback: "Storage Location", key: "title-bacnet-storage"}),
                tooltip: e.localization.localized({
                    fallback: "Configuration of Storage BACnet",
                    key: "description-bacnet-storage"
                }),
                priority: 500,
                userRoles: [a.UserRoles.admin]
            }, o = n(10);
            return {item: t, controller: e.viewGenerator.generate(e, o)}
        }
    }, function (e) {
        e.exports = JSON.parse('{"title":{"default":"BACnet Storage Location","localized":"page-title-bacnet-storage"},"note":{"default":"Changes will take effect immediately.","localized":"page-note-bacnet-storage"},"content":[{"title":{"default":"BACnet Persistence","localized":"title-bacnet-storage-persistence"},"sections":[{"fields":[{"title":{"default":"Storage location:","localized":"bacnet-storage-persistence-label"},"parameter":"bacnet.storage.persistence","control":{"type":"dropdown","items":[{"title":{"default":"Internal Flash","localized":"default-persistence-dropdown-item-internal-flash"},"value":"internal-flash"},{"title":{"default":"SD Card","localized":"default-persistence-dropdown-item-sd-card"},"value":"sd-card","hidden":"bacnet.storage.options is 0"}]}}],"confirm":{"title":{"default":"Attention","key":"bacnet-storage-persistence-confirm-title"},"message":{"default":"Really want to change persistence storage location? Important note: Please do not turn off or restart the controller after changing the storage location within the following 30s. Otherwise data will be lost.","key":"bacnet-storage-persistence-confirm-message"}}}]},{"title":{"default":"BACnet Trendlog","localized":"title-bacnet-storage-trendlog"},"sections":[{"fields":[{"title":{"default":"Storage location:","localized":"bacnet-storage-trendlog-label"},"parameter":"bacnet.storage.trendlog","control":{"type":"dropdown","items":[{"title":{"default":"Internal Flash","localized":"default-trendlog-dropdown-item-internal-flash"},"value":"internal-flash"},{"title":{"default":"SD Card","localized":"default-trendlog-dropdown-item-sd-card"},"value":"sd-card","hidden":"bacnet.storage.options is 0"}]}}],"confirm":{"title":{"default":"Attention","key":"bacnet-storage-trendlog-confirm-title"},"message":{"default":"Really want to change trendlog storage location? Important note: Data will be lost","key":"bacnet-storage-trendlog-confirm-message"}}}]},{"title":{"default":"BACnet Eventlog","localized":"title-bacnet-storage-eventlog"},"sections":[{"fields":[{"title":{"default":"Storage location:","localized":"bacnet-storage-eventlog-label"},"parameter":"bacnet.storage.eventlog","control":{"type":"dropdown","items":[{"title":{"default":"Internal Flash","localized":"default-eventlog-dropdown-item-internal-flash"},"value":"internal-flash"},{"title":{"default":"SD Card","localized":"default-eventlog-dropdown-item-sd-card"},"value":"sd-card","hidden":"bacnet.storage.options is 0"}]}}],"confirm":{"title":{"default":"Attention","key":"bacnet-storage-eventlog-confirm-title"},"message":{"default":"Really want to change eventlog storage location? Important note: Data will be lost","key":"bacnet-storage-eventlog-confirm-message"}}}]}]}')
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0), o = n(12);
        t.initializeBacnetFile = function (e) {
            return {
                item: {
                    id: "bacnet-file",
                    title: e.localization.localized({fallback: "Files", key: "title-bacnet-file"}),
                    tooltip: e.localization.localized({fallback: "Files of BACnet", key: "description-bacnet-file"}),
                    priority: 400,
                    userRoles: [a.UserRoles.admin]
                }, controller: e.viewGenerator.generate(e, o.default(e))
            }
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(13);
        t.default = function (e) {
            return {
                title: {default: "BACnet Files", localized: "configuration-file-page-title"},
                note: {default: "Changes will take effect after the next controller reboot or runtime restart."},
                content: [{
                    title: {default: "BACnet override.xml", localized: "title-file-override-xml"},
                    sections: [new a.UploadForm(e, "overridexml")]
                }]
            }
        }
    }, function (e, t, n) {
        "use strict";
        var a, o = this && this.__extends || (a = function (e, t) {
            return (a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), i = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))((function (o, i) {
                function r(e) {
                    try {
                        s(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function l(e) {
                    try {
                        s(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(r, l)
                }

                s((a = a.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, a, o, i, r = {
                label: 0, sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                }, trys: [], ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                return this
            }), i;

            function l(i) {
                return function (l) {
                    return function (i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; r;) try {
                            if (n = 1, a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a), 0) : a.next) && !(o = o.call(a, i[1])).done) return o;
                            switch (a = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++, {value: i[1], done: !1};
                                case 5:
                                    r.label++, a = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(), r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = r.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1], o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2], r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(), r.trys.pop();
                                    continue
                            }
                            i = t.call(e, r)
                        } catch (e) {
                            i = [6, e], a = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {value: i[0] ? i[1] : void 0, done: !0}
                    }([i, l])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var l = function (e) {
            function t(t, n) {
                var a = e.call(this, t) || this;
                return a.view = document.createElement("wbm-bacnet-upload-form"), a.name = n, a
            }

            return o(t, e), t.prototype.load = function () {
                return i(this, void 0, void 0, (function () {
                    var e, t, n, a = this;
                    return r(this, (function (o) {
                        return {
                            overridexml: "override.xml",
                            bacconfigini: "bacconfig.ini"
                        }, this.view.innerHTML = '\n            <div class="section">\n                <div class="field" taid="field-' + this.name + '-upload-label" >\n                    <div class="control">\n                        <label class="file-input" data-placeholder="Choose file..." data-filename=""><input type="file" taid="field-control"></label>\n                    </div>\n                    <button taid="action-' + this.name + '-upload" class="action" disabled="disabled">Upload</button>\n                </div>\n            </div>\n        ', (e = this.view.querySelector("button")).addEventListener("click", (function () {
                            return a.uploadButtonPressed()
                        })), t = this.view.querySelector("input"), n = this.view.querySelector("label.file-input"), t.addEventListener("change", (function () {
                            var a = t.files && t.files.length && t.files[0].name || "";
                            n.setAttribute("data-filename", a), e.disabled = !a
                        })), [2]
                    }))
                }))
            }, t.prototype.uploadButtonPressed = function () {
                return i(this, void 0, void 0, (function () {
                    var e, t, n, a, o, i;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                (e = this.view.querySelector("div.section")).classList.add("submitting"), t = this.view.querySelector("input"), n = t.files[0], r.label = 1;
                            case 1:
                                return r.trys.push([1, 3, , 4]), [4, this.base.transfer.upload([n], "/tmp/bacnet_upload")];
                            case 2:
                                return r.sent(), [3, 4];
                            case 3:
                                return a = r.sent(), e.classList.remove("submitting"), [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: this.name + "-upload-failed-error-modal-title",
                                        fallback: "Upload failed"
                                    }),
                                    message: this.base.localization.localized({
                                        key: this.name + "-upload-failed-error-modal-message",
                                        fallback: "Could not upload the file"
                                    }),
                                    detailMessage: a.message
                                })];
                            case 4:
                                return r.trys.push([4, 6, , 7]), [4, this.base.parameter.execute("bacnet.file.upload.copy", {filename: n.name})];
                            case 5:
                                if ((o = r.sent()).error) throw o.error;
                                return [3, 7];
                            case 6:
                                return i = r.sent(), this.base.transfer.cleanUp(), e.classList.remove("submitting"), [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: this.name + "-upload-failed-error-modal-title",
                                        fallback: "Installation failed"
                                    }),
                                    message: this.base.localization.localized({
                                        key: this.name + "-copy-failed-error-modal-message",
                                        fallback: "Could not copy the uploaded file"
                                    }),
                                    detailMessage: i.message
                                })];
                            case 7:
                                return t.value = "", t.dispatchEvent(new Event("change")), e.classList.remove("submitting"), [2]
                        }
                    }))
                }))
            }, t
        }(n(1).ViewController);
        t.UploadForm = l
    }])
}));
//# sourceMappingURL=bacnet.js.map