/*!
 * @wago/wbm-package-server@1.3.0
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
 *     Provides Backup and Restore functionality
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["package-server"] = t() : e["package-server"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function i(r) {
            if (t[r])
                return t[r].exports;
            var n = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(n.exports, n, n.exports, i),
            n.l = !0,
            n.exports
        }
        return i.m = e,
        i.c = t,
        i.d = function(e, t, r) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
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
            var r = Object.create(null);
            if (i.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var n in e)
                    i.d(r, n, function(t) {
                        return e[t]
                    }
                    .bind(null, n));
            return r
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
        i(i.s = 2)
    }([function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            e.desktop = "desktop",
            e.touch = "touch",
            e.eDisplay = "eDisplay"
        }(t.BrowserType || (t.BrowserType = {}))
    }
    , function(e, t, i) {
        "use strict";
        var r, n = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, r) {
            return new (i || (i = Promise))((function(n, a) {
                function o(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof i ? t : new i((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , o = this && this.__generator || function(e, t) {
            var i, r, n, a, o = {
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
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (i = 1,
                                r && (n = 2 & a[0] ? r.return : a[0] ? r.throw || ((n = r.return) && n.call(r),
                                0) : r.next) && !(n = n.call(r, a[1])).done)
                                    return n;
                                switch (r = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < n[1]) {
                                        o.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && o.label < n[2]) {
                                        o.label = n[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    n[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                i = n = 0
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
        var l = function(e) {
            function t(t, i, r) {
                var n = e.call(this, t) || this;
                return n.view = document.createElement(i),
                n.page = n.base.viewGenerator.generate(n.base, r),
                n.view.appendChild(n.page.view),
                n
            }
            return n(t, e),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t = this;
                    return o(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            return [4, this.page.load()];
                        case 1:
                            return i.sent(),
                            null == this.submitButton && (this.submitButton = document.createElement("button"),
                            e = this.view.querySelector("button"),
                            this.submitButton.setAttribute("taid", e.getAttribute("taid")),
                            this.submitButton.id = "override-button",
                            this.submitButton.disabled = !0,
                            this.submitButton.className = e.className,
                            this.submitButton.textContent = e.textContent,
                            this.submitButton.onclick = function() {
                                return a(t, void 0, void 0, (function() {
                                    return o(this, (function(t) {
                                        switch (t.label) {
                                        case 0:
                                            return [4, this.beforeSubmit()];
                                        case 1:
                                            return t.sent(),
                                            e.dispatchEvent(new CustomEvent("click")),
                                            [2]
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ,
                            e.parentElement.insertBefore(this.submitButton, e)),
                            this.submitButton.nextElementSibling.style.display = "none",
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(i(5).ViewController);
        t.SubmitOverrideForm = l
    }
    , function(e, t, i) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, i, r) {
            return new (i || (i = Promise))((function(n, a) {
                function o(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof i ? t : new i((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , n = this && this.__generator || function(e, t) {
            var i, r, n, a, o = {
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
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (i = 1,
                                r && (n = 2 & a[0] ? r.return : a[0] ? r.throw || ((n = r.return) && n.call(r),
                                0) : r.next) && !(n = n.call(r, a[1])).done)
                                    return n;
                                switch (r = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < n[1]) {
                                        o.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && o.label < n[2]) {
                                        o.label = n[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    n[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                i = n = 0
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
        var a = i(3)
          , o = i(4)
          , l = i(7);
        base.plugin.register("wbm-package-server", (function(e) {
            return r(this, void 0, void 0, (function() {
                var t, r, s, c;
                return n(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return (t = e.subframeGenerator.createSubFrame("package-server", e, [])).registerSubMenuItem({
                            id: "firmware-backup",
                            title: e.localization.localized({
                                fallback: "Firmware Backup",
                                key: "firmware-backup-menu-item-title"
                            }),
                            priority: 900
                        }, new o.Backup(e)),
                        t.registerSubMenuItem({
                            id: "firmware-restore",
                            title: e.localization.localized({
                                fallback: "Firmware Restore",
                                key: "firmware-restore-menu-item-title"
                            }),
                            priority: 800
                        }, new l.Restore(e)),
                        r = i(12),
                        s = e.viewGenerator.generate(e, r),
                        t.registerSubMenuItem({
                            id: "active-system",
                            title: e.localization.localized({
                                fallback: "Active System",
                                key: "active-system-menu-item-title"
                            }),
                            priority: 700
                        }, s),
                        c = {
                            kind: "called",
                            maxHistoryLength: 0
                        },
                        [4, e.parameter.observe("packageserver.system1.activate", c, (function() {
                            s.load()
                        }
                        ))];
                    case 1:
                        return n.sent(),
                        [4, e.parameter.observe("packageserver.system2.activate", c, (function() {
                            s.load()
                        }
                        ))];
                    case 2:
                        return n.sent(),
                        [2, {
                            id: "package-server",
                            title: {
                                fallback: "Package Server",
                                key: "package-server-menu-item-title"
                            },
                            priority: 845,
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
    , function(e, t, i) {
        "use strict";
        var r, n = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, r) {
            return new (i || (i = Promise))((function(n, a) {
                function o(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof i ? t : new i((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , o = this && this.__generator || function(e, t) {
            var i, r, n, a, o = {
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
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (i = 1,
                                r && (n = 2 & a[0] ? r.return : a[0] ? r.throw || ((n = r.return) && n.call(r),
                                0) : r.next) && !(n = n.call(r, a[1])).done)
                                    return n;
                                switch (r = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < n[1]) {
                                        o.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && o.label < n[2]) {
                                        o.label = n[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    n[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                i = n = 0
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
        var l = i(0)
          , s = function(e) {
            function t(t) {
                var r = e.call(this, t, "wbm-packageserver-backup", i(6)) || this;
                return r.isPrepared = !1,
                r.isBackupRunning = !1,
                r.isNetworkDestination = !0,
                r.packageCheckboxSelectionMode = "single",
                r
            }
            return n(t, e),
            Object.defineProperty(t.prototype, "backupButton", {
                get: function() {
                    return this.submitButton
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "directoryField", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-directory-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "sourceFieldInputElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-boot-device-field-title"] select')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "destinationFieldSelectElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-destination-field-title"] select')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "autoUpdateFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-auto-update-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "autoUpdateCheckboxElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-auto-update-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-encryption-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionCheckboxElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-encryption-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionPassphraseFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-encryption-passphrase-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionPassphraseInputElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-encryption-passphrase-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionConfirmFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-confirm-passphrase-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "encryptionConfirmInputElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-backup-confirm-passphrase-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "packageCheckboxes", {
                get: function() {
                    return [this.page.view.querySelector('[taid="field-firmware-backup-plc-runtime-project-field-title"] input'), this.page.view.querySelector('[taid="field-firmware-backup-settings-field-title"] input'), this.page.view.querySelector('[taid="field-firmware-backup-system-field-title"] input')]
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var t, i, r, n, a = this;
                    return o(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return [4, e.prototype.load.call(this)];
                        case 1:
                            for (o.sent(),
                            this.directoryField.style.display = "none",
                            t = this.destinationFieldSelectElement.childNodes,
                            i = 0; i < t.length; i++)
                                (r = t.item(i)).value === this.sourceFieldInputElement.value && (r.remove(),
                                i--),
                                "network" === r.value && this.base.browser.browserType === l.BrowserType.eDisplay && (r.remove(),
                                i--),
                                "none" === r.style.display && (r.remove(),
                                i--);
                            return 0 === this.destinationFieldSelectElement.childNodes.length ? (this.destinationFieldSelectElement.innerHTML = "<option>---</option>",
                            this.disableAll(),
                            [2]) : (this.addPackageCheckboxEvents(),
                            this.addDestinationChangeEvents(),
                            this.addAutoupdateAndEncryptionChangeEvents(),
                            n = this,
                            [4, this.base.parameter.observe("packageserver.createbackup", {
                                kind: "called"
                            }, (function(e, t) {
                                t instanceof Error ? a.onBackupFailed() : a.onBackupDone()
                            }
                            ))]);
                        case 2:
                            return n.backupObservation = o.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.disableAll = function() {
                this.destinationFieldSelectElement.disabled = !0,
                this.backupButton.disabled = !0,
                this.packageCheckboxes.forEach((function(e) {
                    return e.disabled = !0
                }
                )),
                this.encryptionCheckboxElement.disabled = !0,
                this.encryptionPassphraseInputElement.disabled = !0,
                this.encryptionConfirmInputElement.disabled = !0
            }
            ,
            t.prototype.unload = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return this.backupObservation && this.backupObservation.cancel(),
                        this.backupObservation = void 0,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.beforeSubmit = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, i;
                    return o(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return this.isPrepared ? [3, 3] : (this.isBackupRunning = !0,
                            this.isNetworkDestination = "network" === this.destinationFieldSelectElement.value,
                            this.isNetworkDestination ? [4, this.base.transfer.prepareTransfer()] : [3, 2]);
                        case 1:
                            e = r.sent(),
                            t = e.transferToken,
                            i = e.transferPath,
                            this.reservedTransfer = {
                                path: i,
                                token: t
                            },
                            this.directoryField.querySelector("input").value = i,
                            r.label = 2;
                        case 2:
                            this.isPrepared = !0,
                            r.label = 3;
                        case 3:
                            return this.encryptionConfirmInputElement.value = "",
                            this.onBackupStillRunning(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onBackupStillRunning = function(e) {
                var t = this;
                this.backupButton.disabled = !0,
                this.base.modalPresenter.showLoadingDialog(this.base, {
                    title: this.base.localization.localized({
                        fallback: e ? "Backup in progress..." : "Backup starting...",
                        key: "firmware-backup-starting-backup-running-modal-title"
                    }),
                    message: e
                }, a(t, void 0, void 0, (function() {
                    var t, i;
                    return o(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return [4, new Promise((function(e) {
                                return setTimeout(e, 1200)
                            }
                            ))];
                        case 1:
                            return r.sent(),
                            this.isBackupRunning ? [4, window.fetch("/wbm/firmware_backup_status")] : [3, 5];
                        case 2:
                            return (t = r.sent()).ok ? (i = this.onBackupStillRunning,
                            [4, t.text()]) : [3, 4];
                        case 3:
                            return i.apply(this, [r.sent()]),
                            [3, 5];
                        case 4:
                            this.onBackupStillRunning(e),
                            r.label = 5;
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                )))
            }
            ,
            t.prototype.onBackupFailed = function() {
                this.isBackupRunning = !1,
                this.isPrepared = !1,
                this.updateBackupButtonState()
            }
            ,
            t.prototype.onBackupDone = function() {
                var e;
                (this.isBackupRunning = !1,
                this.isPrepared = !1,
                this.updateBackupButtonState(),
                this.isNetworkDestination) ? (this.base.transfer.download({
                    token: this.reservedTransfer.token
                }),
                e = this.base.localization.localized({
                    key: "firmware-backup-download-successfully-modal-dialog-message",
                    fallback: "Backup was successfully created and will be downloaded automatically"
                })) : e = this.base.localization.localized({
                    key: "firmware-backup-saved-successfully-modal-dialog-message",
                    fallback: "Backup was successfully created and has been saved to the selected destination"
                });
                this.base.modalPresenter.showDialog(this.base, {
                    title: this.base.localization.localized({
                        key: "firmware-backup-done-successfully-modal-dialog-title",
                        fallback: "Backup done"
                    }),
                    message: e
                })
            }
            ,
            t.prototype.addDestinationChangeEvents = function() {
                var e = this
                  , t = this.destinationFieldSelectElement;
                t.addEventListener("change", (function() {
                    "network" === t.value ? (e.autoUpdateCheckboxElement.checked = !1,
                    e.autoUpdateFieldElement.style.display = "none",
                    e.packageCheckboxSelectionMode = "single") : (e.autoUpdateFieldElement.style.display = "",
                    e.packageCheckboxSelectionMode = "multi"),
                    "single" === e.packageCheckboxSelectionMode && e.packageCheckboxes.forEach((function(e) {
                        return e.dispatchEvent(new CustomEvent("change"))
                    }
                    ))
                }
                )),
                t.dispatchEvent(new CustomEvent("change"))
            }
            ,
            t.prototype.addPackageCheckboxEvents = function() {
                var e = this
                  , t = this.packageCheckboxes;
                t.forEach((function(i) {
                    var r = t.filter((function(e) {
                        return i != e
                    }
                    ));
                    i.addEventListener("change", (function() {
                        i.checked && "single" === e.packageCheckboxSelectionMode && r.forEach((function(e) {
                            return e.checked = !1
                        }
                        )),
                        e.updateBackupButtonState()
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.updateBackupButtonState = function() {
                this.backupButton.disabled = this.packageCheckboxes.every((function(e) {
                    return !1 === e.checked
                }
                )) || !1 === this.encryptionConfirmInputElement.validity.valid
            }
            ,
            t.prototype.addAutoupdateAndEncryptionChangeEvents = function() {
                var e = this
                  , t = this.autoUpdateCheckboxElement
                  , i = this.encryptionCheckboxElement
                  , r = this.encryptionPassphraseInputElement
                  , n = this.encryptionConfirmInputElement;
                t.addEventListener("change", (function() {
                    t.checked ? (i.checked = !1,
                    e.encryptionFieldElement.style.display = "none") : e.encryptionFieldElement.style.display = "",
                    i.dispatchEvent(new CustomEvent("change"))
                }
                ));
                var a = function() {
                    n.value != r.value ? n.setCustomValidity("Values are not identical") : n.setCustomValidity(""),
                    e.updateBackupButtonState()
                };
                i.addEventListener("change", (function() {
                    i.checked ? (e.encryptionPassphraseFieldElement.style.display = "",
                    e.encryptionConfirmFieldElement.style.display = "") : (r.value = n.value = "",
                    e.encryptionPassphraseFieldElement.style.display = "none",
                    e.encryptionConfirmFieldElement.style.display = "none"),
                    a(),
                    e.updateBackupButtonState()
                }
                )),
                i.dispatchEvent(new CustomEvent("change")),
                r.addEventListener("input", a),
                n.addEventListener("input", a)
            }
            ,
            t
        }(i(1).SubmitOverrideForm);
        t.Backup = s
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = r
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Firmware Backup","localized":"backup-page-title"},"content":[{"title":{"default":"Firmware Backup","localized":"firmware-backup-form-title"},"note":{"default":"Save packages from active device to selected destination.\\n\\nNote: Only one package at a time can be saved via network.\\n\\nThe Auto Update feature is only available if:\\n- Encryption is not enabled.\\n- The firmware was launched from flash memory.\\n- A memory card has been inserted and is selected as the destination.\\n\\nBackup and restore must be done on the same firmware version. The functionality of the package server is not suitable for general firmware updates.","localized":"firmware-backup-form-note"},"sections":[{"fields":[{"title":{"default":"Boot Device","localized":"firmware-backup-boot-device-field-title"},"control":{"type":"dropdown","items":[{"repeat":"filesystem.devices.*.medium","title":{"default":"${filesystem.devices.*.description}","localized":"firmware-backup-source-device-dropdown-item"},"value":"${filesystem.devices.*.medium}"}]},"options":{"readonly":true},"parameter":"filesystem.activedevice"},{"title":{"default":"Destination","localized":"firmware-backup-destination-field-title"},"control":{"type":"dropdown","items":[{"title":{"default":"Network","localized":"firmware-backup-destination-network-title"},"value":"network"},{"repeat":"filesystem.devices.*.medium","title":{"default":"${filesystem.devices.*.description}","localized":"firmware-backup-destination-device-dropdown-item"},"value":"${filesystem.devices.*.medium}","hidden":"filesystem.devices.*.type is not memory-card"}]},"argument":"destinationMedium"},{"title":{"default":"PLC Runtime Project","localized":"firmware-backup-plc-runtime-project-field-title"},"control":{"type":"checkbox"},"argument":"includePlcRuntimeProject"},{"title":{"default":"Settings","localized":"firmware-backup-settings-field-title"},"control":{"type":"checkbox"},"argument":"includeSettings"},{"title":{"default":"System","localized":"firmware-backup-system-field-title"},"control":{"type":"checkbox"},"argument":"includeSystem"},{"title":{"default":"Auto update","localized":"firmware-backup-auto-update-field-title"},"control":{"type":"checkbox"},"argument":"autoUpdate"},{"title":{"default":"Encryption","localized":"firmware-backup-encryption-field-title"},"control":{"type":"checkbox"}},{"title":{"default":"Encryption passphrase","localized":"firmware-backup-encryption-passphrase-field-title"},"control":{"type":"textfield","options":{"masked":true}},"argument":"passphrase"},{"title":{"default":"Confirm passphrase","localized":"firmware-backup-confirm-passphrase-field-title"},"control":{"type":"textfield","options":{"masked":true},"validation":{"hint":{"default":"Must match passphrase above","localized":"firmware-backup-confirm-passphrase-mismatch-invalid-hint"}}}},{"title":{"default":"Directory","localized":"firmware-backup-directory-field-title"},"control":{"type":"textfield"},"options":{"readonly":true},"argument":"downloadDir"}],"action":{"title":{"default":"Create Backup","localized":"firmware-backup-create-backup-button-title"},"method":"packageserver.createbackup","type":"action"}}]}]}')
    }
    , function(e, t, i) {
        "use strict";
        var r, n = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function i() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, r) {
            return new (i || (i = Promise))((function(n, a) {
                function o(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof i ? t : new i((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , o = this && this.__generator || function(e, t) {
            var i, r, n, a, o = {
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
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (i = 1,
                                r && (n = 2 & a[0] ? r.return : a[0] ? r.throw || ((n = r.return) && n.call(r),
                                0) : r.next) && !(n = n.call(r, a[1])).done)
                                    return n;
                                switch (r = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < n[1]) {
                                        o.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && o.label < n[2]) {
                                        o.label = n[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    n[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                i = n = 0
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
        var l = i(0)
          , s = i(8)
          , c = i(1)
          , u = i(9)
          , d = i(10)
          , p = function(e) {
            function t(t) {
                var r = e.call(this, t, "wbm-packageserver-restore", i(11)) || this;
                return r.hasBeenLoggedOut = !1,
                r.isPrepared = !1,
                r.isRestoreRunning = !1,
                r.isNetworkSource = !0,
                r.isDecryptionEnabled = !1,
                r
            }
            return n(t, e),
            Object.defineProperty(t.prototype, "restoreButton", {
                get: function() {
                    return this.page.view.querySelector("button")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "directoryField", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-directory-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "destinationFieldInputElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-boot-device-field-title"] select')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "sourceFieldSelectElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-source-field-title"] select')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "decryptionFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-decryption-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "decryptionCheckboxElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-decryption-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "decryptionPassphraseFieldElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-decryption-passphrase-field-title"]')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "decryptionPassphraseInputElement", {
                get: function() {
                    return this.page.view.querySelector('[taid="field-firmware-restore-decryption-passphrase-field-title"] input')
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "packageCheckboxes", {
                get: function() {
                    return [this.page.view.querySelector('[taid="field-firmware-restore-plc-runtime-project-field-title"] input'), this.page.view.querySelector('[taid="field-firmware-restore-settings-field-title"] input'), this.page.view.querySelector('[taid="field-firmware-restore-system-field-title"] input')]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "packageFileInputs", {
                get: function() {
                    return [this.page.view.querySelector('[taid="field-firmware-restore-plc-runtime-project-field-title"] input[type=file]'), this.page.view.querySelector('[taid="field-firmware-restore-settings-field-title"] input[type=file]'), this.page.view.querySelector('[taid="field-firmware-restore-system-field-title"] input[type=file]')]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "packageFields", {
                get: function() {
                    return [this.page.view.querySelector('[taid="field-firmware-restore-plc-runtime-project-field-title"]'), this.page.view.querySelector('[taid="field-firmware-restore-settings-field-title"]'), this.page.view.querySelector('[taid="field-firmware-restore-system-field-title"]')]
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var t, i, r, n, s = this;
                    return o(this, (function(c) {
                        switch (c.label) {
                        case 0:
                            return [4, e.prototype.load.call(this)];
                        case 1:
                            for (c.sent(),
                            this.directoryField.style.display = "none",
                            t = this.sourceFieldSelectElement.childNodes,
                            i = 0; i < t.length; i++)
                                (r = t.item(i)).value === this.destinationFieldInputElement.value && (r.remove(),
                                i--),
                                "network" === r.value && this.base.browser.browserType === l.BrowserType.eDisplay && (r.remove(),
                                i--),
                                "none" === r.style.display && (r.remove(),
                                i--);
                            return 0 === this.sourceFieldSelectElement.childNodes.length ? (this.sourceFieldSelectElement.innerHTML = "<option>---</option>",
                            this.disableAll(),
                            [2]) : (this.packageFields.forEach((function(e) {
                                e.querySelectorAll("div.control").length < 2 && s.insertUploadControl(e)
                            }
                            )),
                            this.addPackageCheckboxEvents(),
                            this.addPackageFileSelectionEvents(),
                            this.addSourceChangeEvents(),
                            this.addDencryptionChangeEvents(),
                            n = this,
                            [4, this.base.parameter.observe("packageserver.restore", {
                                kind: "called"
                            }, (function(e, t) {
                                return a(s, void 0, void 0, (function() {
                                    var e;
                                    return o(this, (function(i) {
                                        switch (i.label) {
                                        case 0:
                                            return t instanceof Error ? (this.onRestoreFailed(!1),
                                            [3, 4]) : [3, 1];
                                        case 1:
                                            return "started" === t ? [3, 2] : (this.onRestoreFailed(!1),
                                            [3, 4]);
                                        case 2:
                                            return e = this.base.authentication,
                                            this.hasBeenLoggedOut = !0,
                                            [4, e.logout(e.getActiveUser())];
                                        case 3:
                                            i.sent(),
                                            this.onRestoreStillRunning(),
                                            i.label = 4;
                                        case 4:
                                            return [2]
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ))]);
                        case 2:
                            return n.restoreObservation = c.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.insertUploadControl = function(e) {
                var t = document.createElement("div");
                t.className = "control",
                t.innerHTML = '<label class="file-input" data-placeholder="Choose file..." data-filename=""><input type="file" taid="field-control"></label>',
                e.appendChild(t)
            }
            ,
            t.prototype.disableAll = function() {
                this.sourceFieldSelectElement.disabled = !0,
                this.restoreButton.disabled = !0,
                this.packageCheckboxes.forEach((function(e) {
                    return e.disabled = !0
                }
                )),
                this.decryptionCheckboxElement.disabled = !0,
                this.decryptionPassphraseInputElement.disabled = !0
            }
            ,
            t.prototype.unload = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return this.restoreObservation && this.restoreObservation.cancel(),
                        this.restoreObservation = void 0,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.beforeSubmit = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, i, r, n, a = this;
                    return o(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return this.isPrepared ? [3, 3] : (this.isRestoreRunning = !0,
                            this.isNetworkSource = "network" === this.sourceFieldSelectElement.value,
                            this.isNetworkSource ? (e = [],
                            this.packageFileInputs.forEach((function(t, i) {
                                if (t.files && t.files.length > 0) {
                                    var r = ["firmware_backup_codesys.tgz", "firmware_backup_settings", "firmware_backup_rootfs.tgz"][i];
                                    a.isDecryptionEnabled && (r += ".enc"),
                                    e.push({
                                        file: t.files[0],
                                        name: r
                                    })
                                }
                            }
                            )),
                            t = this.base.transfer,
                            i = t.upload(e),
                            this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: "Uploading files..."
                            }, i),
                            [4, i]) : [3, 2]);
                        case 1:
                            r = o.sent(),
                            n = r[0].replace(/\/[^\/]*$/, ""),
                            this.directoryField.querySelector("input").value = n,
                            o.label = 2;
                        case 2:
                            this.isPrepared = !0,
                            o.label = 3;
                        case 3:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onRestoreStillRunning = function() {
                return a(this, void 0, void 0, (function() {
                    var e = this;
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.restoreButton.disabled = !0,
                            [4, this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Restore in progress...",
                                    key: "firmware-restore-starting-modal-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "This may take several minutes to complete and the device may reboot multiple times.",
                                    key: "firmware-restore-starting-modal-message"
                                })
                            }, a(e, void 0, void 0, (function() {
                                var e, t;
                                return o(this, (function(i) {
                                    switch (i.label) {
                                    case 0:
                                        return [4, new Promise((function(e) {
                                            return setTimeout(e, 1200)
                                        }
                                        ))];
                                    case 1:
                                        return i.sent(),
                                        this.isRestoreRunning ? [4, this.base.parameter.execute("packageserver.getrestorestatus")] : [3, 3];
                                    case 2:
                                        e = i.sent(),
                                        "finished" == (t = e.returnValue) ? (this.isRestoreRunning = !1,
                                        this.onRestoreDone()) : "failed" == t ? this.onRestoreFailed(!0) : this.onRestoreStillRunning(),
                                        i.label = 3;
                                    case 3:
                                        return [2]
                                    }
                                }
                                ))
                            }
                            )))];
                        case 1:
                            return t.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onRestoreFailed = function(e) {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return this.isRestoreRunning = !1,
                            this.isPrepared = !1,
                            this.restoreButton.disabled = !1,
                            e ? [4, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Restore failed",
                                    key: "firmware-restore-failed-modal-dialog-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "\n\nReload the page to continue.",
                                    key: "firmware-restore-failed-modal-dialog-message"
                                }),
                                button: this.hasBeenLoggedOut ? {
                                    title: this.base.localization.localized({
                                        key: "firmware-restore-failed-reload-button-modal-dialog-title",
                                        fallback: "Reload"
                                    }),
                                    style: s.DialogButtonStyle.action
                                } : void 0
                            })] : [3, 2];
                        case 1:
                            t.sent(),
                            this.hasBeenLoggedOut && document.location.reload(),
                            t.label = 2;
                        case 2:
                            return this.hasBeenLoggedOut = !1,
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onRestoreDone = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return this.isRestoreRunning = !1,
                            this.isPrepared = !1,
                            this.restoreButton.disabled = !1,
                            [4, this.base.modalPresenter.showDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "firmware-backup-done-successfully-modal-dialog-title",
                                    fallback: "Restore done"
                                }),
                                message: this.base.localization.localized({
                                    key: "firmware-restore-done-successfully-modal-dialog-message",
                                    fallback: "\n\nReload the page to continue."
                                }),
                                button: this.hasBeenLoggedOut ? {
                                    title: this.base.localization.localized({
                                        key: "firmware-restore-done-reload-button-modal-dialog-title",
                                        fallback: "Reload"
                                    }),
                                    style: s.DialogButtonStyle.action
                                } : void 0
                            })];
                        case 1:
                            return e.sent(),
                            this.hasBeenLoggedOut && document.location.reload(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.addPackageCheckboxEvents = function() {
                var e = this;
                this.packageCheckboxes.forEach((function(t) {
                    t.addEventListener("change", (function() {
                        e.updateRestoreButtonState()
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.addPackageFileSelectionEvents = function() {
                var e = this
                  , t = this.packageFileInputs
                  , i = this.packageCheckboxes;
                t.forEach((function(t, r) {
                    t.addEventListener("change", (function() {
                        if (t.files && t.files.length > 0) {
                            var n = t.files[0].name;
                            t.parentElement.setAttribute("data-filename", n),
                            i[r].checked = !0;
                            var a = u.getWarningDialogIfFilenameSeemsWrong(e.base, r, e.isDecryptionEnabled, n);
                            a && e.base.modalPresenter.showWarningDialog(e.base, a)
                        } else
                            t.parentElement.setAttribute("data-filename", ""),
                            i[r].checked = !1;
                        e.updateRestoreButtonState()
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.addSourceChangeEvents = function() {
                var e = this
                  , t = this.sourceFieldSelectElement;
                t.addEventListener("change", (function() {
                    return a(e, void 0, void 0, (function() {
                        var e, i, r;
                        return o(this, (function(n) {
                            switch (n.label) {
                            case 0:
                                return "network" !== t.value ? [3, 1] : (this.setPackagesInputMode("upload"),
                                [3, 6]);
                            case 1:
                                this.setPackagesInputMode("checkbox"),
                                n.label = 2;
                            case 2:
                                return n.trys.push([2, 4, , 5]),
                                i = d.default(this.base, t.value),
                                this.base.modalPresenter.showLoadingDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: "firmware-restore-reading-avaialble-packages-modal-title",
                                        fallback: "Reading available packages"
                                    })
                                }, i),
                                [4, i];
                            case 3:
                                return e = n.sent(),
                                [3, 5];
                            case 4:
                                return n.sent(),
                                e = {
                                    packages: [],
                                    encryped: !1
                                },
                                this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        key: "firmware-restore-failes-to-get-avaialble-packages-modal-title",
                                        fallback: "Failed to read available packages"
                                    }),
                                    message: this.base.localization.localized({
                                        key: "firmware-restore-failes-to-get-avaialble-packages-modal-title",
                                        fallback: "An error occured while trying to read available packages on the selected source device."
                                    })
                                }),
                                [3, 5];
                            case 5:
                                r = ["codesys", "settings", "system"],
                                this.packageCheckboxes.forEach((function(t, i) {
                                    e.packages.indexOf(r[i]) < 0 ? (t.readOnly = !0,
                                    t.checked = !1) : (t.readOnly = !1,
                                    t.checked = !0)
                                }
                                )),
                                this.decryptionCheckboxElement.checked = e.encryped,
                                this.decryptionCheckboxElement.dispatchEvent(new CustomEvent("change")),
                                this.updateRestoreButtonState(),
                                n.label = 6;
                            case 6:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                )),
                t.dispatchEvent(new CustomEvent("change"))
            }
            ,
            t.prototype.setPackagesInputMode = function(e) {
                this.packageFields.forEach((function(t) {
                    var i = t.querySelectorAll("div.control");
                    if ("upload" == e) {
                        i[1].style.display = "",
                        i[0].style.display = "none";
                        for (var r = i[0].querySelectorAll("input"), n = 0; n < r.length; n++)
                            r[n].checked = !1
                    } else
                        i[0].style.display = "",
                        i[1].style.display = "none"
                }
                ))
            }
            ,
            t.prototype.updateRestoreButtonState = function() {
                this.restoreButton.disabled = this.packageCheckboxes.every((function(e) {
                    return !1 === e.checked
                }
                ))
            }
            ,
            t.prototype.addDencryptionChangeEvents = function() {
                var e = this
                  , t = this.decryptionCheckboxElement
                  , i = this.decryptionPassphraseInputElement;
                t.addEventListener("change", (function() {
                    t.checked ? (e.decryptionPassphraseFieldElement.style.display = "",
                    e.isDecryptionEnabled = !0) : (i.value = "",
                    e.decryptionPassphraseFieldElement.style.display = "none",
                    e.isDecryptionEnabled = !1)
                }
                )),
                t.dispatchEvent(new CustomEvent("change"))
            }
            ,
            t
        }(c.SubmitOverrideForm);
        t.Restore = p
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
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getWarningDialogIfFilenameSeemsWrong = function(e, t, i, r) {
            var n = /\.enc$/;
            return [/^firmware_backup_codesys.*\.tgz(.*\.enc)?$/, /^firmware_backup_settings.*(\.enc)?$/, /^firmware_backup_rootfs.*\.tgz(.*\.enc)?$/]["number" == typeof t ? t : ["codesys", "settings", "system"].indexOf(t)].test(r) ? (i ? n.test(r) : !n.test(r)) ? void 0 : {
                title: e.localization.localized({
                    key: "firmware-restore-filename-ending-seems-wrong-modal-title",
                    fallback: "Correct file selected?"
                }),
                message: i ? e.localization.localized({
                    key: "firmware-restore-encryped-filename-ending-seems-wrong-modal-message",
                    fallback: "The file name looks like an unencrypted file, but decryption is activated. Please check whether the correct file has been selected.\n\nYou may proceed, if you are sure to have selected the corrent file."
                }) : e.localization.localized({
                    key: "firmware-restore-not-encryped-filename-ending-seems-wrong-modal-message",
                    fallback: "The file name looks like an encrypted file, but decryption is not activated. Please check whether the correct file has been selected.\n\nYou may proceed, if you are sure to have selected the corrent file."
                })
            } : {
                title: e.localization.localized({
                    key: "firmware-restore-filename-seems-wrong-modal-title",
                    fallback: "Correct file selected?"
                }),
                message: e.localization.localized({
                    key: "firmware-restore-filename-seems-wrong-modal-message",
                    fallback: "Please check whether the correct file has been selected. You may proceed, if you are sure to have selected the corrent file."
                })
            }
        }
    }
    , function(e, t, i) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, i, r) {
            return new (i || (i = Promise))((function(n, a) {
                function o(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value,
                    t instanceof i ? t : new i((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , n = this && this.__generator || function(e, t) {
            var i, r, n, a, o = {
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
                        if (i)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (i = 1,
                                r && (n = 2 & a[0] ? r.return : a[0] ? r.throw || ((n = r.return) && n.call(r),
                                0) : r.next) && !(n = n.call(r, a[1])).done)
                                    return n;
                                switch (r = 0,
                                n && (a = [2 & a[0], n.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    n = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    r = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < n[1]) {
                                        o.label = n[1],
                                        n = a;
                                        break
                                    }
                                    if (n && o.label < n[2]) {
                                        o.label = n[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    n[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                r = 0
                            } finally {
                                i = n = 0
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
        }),
        t.default = function(e, t) {
            return r(this, void 0, void 0, (function() {
                var i, r, a, o;
                return n(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, e.parameter.execute("packageserver.getrestorepackages")];
                    case 1:
                        if (i = n.sent(),
                        r = {
                            packages: [],
                            encryped: !1
                        },
                        i.error)
                            throw i.error;
                        return a = JSON.parse(i.returnValue),
                        (o = a[t] || {}).packageCodesys && r.packages.push("codesys"),
                        o.packageSettings && r.packages.push("settings"),
                        o.packageSystem && r.packages.push("system"),
                        o.encryption_active_state && (r.encryped = !0),
                        [2, r]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Firmware Restore","localized":"firmware-restore-page-title"},"content":[{"title":{"default":"Firmware Restore","localized":"firmware-backup-form-title"},"note":{"default":"Restore packages from selected source to active device.\\n\\nNote: restoring system, settings or PLC runtime project will reset the controller.\\nFirmware restore is not allowed, if active device is \\"Memory Card\\".\\nThe decryption passphrase is used for all selected and encrypted backup files.\\nFor multiple encrypted backup files with different passphrases select files separately.","localized":"firmware-restore-form-note"},"sections":[{"fields":[{"title":{"default":"Source","localized":"firmware-restore-source-field-title"},"control":{"type":"dropdown","items":[{"title":{"default":"Network","localized":"firmware-restore-source-network-title"},"value":"network"},{"repeat":"filesystem.devices.*.medium","title":{"default":"${filesystem.devices.*.description}","localized":"firmware-restore-source-device-dropdown-item"},"value":"${filesystem.devices.*.medium}","hidden":"filesystem.devices.*.type is not memory-card"}]},"argument":"sourceMedium"},{"title":{"default":"Boot Device","localized":"firmware-restore-boot-device-field-title"},"control":{"type":"dropdown","items":[{"repeat":"filesystem.devices.*.medium","title":{"default":"${filesystem.devices.*.description}","localized":"firmware-restore-destination-device-dropdown-item"},"value":"${filesystem.devices.*.medium}"}]},"options":{"readonly":true},"parameter":"filesystem.activedevice"},{"title":{"default":"PLC Runtime Project","localized":"firmware-restore-plc-runtime-project-field-title"},"control":{"type":"checkbox"},"argument":"includePlcRuntimeProject"},{"title":{"default":"Settings","localized":"firmware-restore-settings-field-title"},"control":{"type":"checkbox"},"argument":"includeSettings"},{"title":{"default":"System","localized":"firmware-restore-system-field-title"},"control":{"type":"checkbox"},"argument":"includeSystem"},{"title":{"default":"Decryption","localized":"firmware-restore-decryption-field-title"},"control":{"type":"checkbox"}},{"title":{"default":"Decryption passphrase","localized":"firmware-restore-decryption-passphrase-field-title"},"control":{"type":"textfield","options":{"masked":true}},"argument":"passphrase"},{"title":{"default":"Directory","localized":"firmware-restore-directory-field-title"},"control":{"type":"textfield"},"options":{"readonly":true},"argument":"uploadDir"}],"action":{"title":{"default":"Restore","localized":"firmware-restore-restore-button-title"},"method":"packageserver.restore","type":"action","progress":{"title":{"default":"Restore starting...","localized":"firmware-restore-starting-modal-title"}}}}]}]}')
    }
    , function(e) {
        e.exports = JSON.parse('{"title":{"default":"Active System","localized":"active-system-page-title"},"note":{"default":"Changes will take effect when controller boots from Internal Flash next time.\\nAt next reboot, the Controller will boot the \\"configured\\" system.\\nNote: the inactive system should only be activated, if state is \\"good\\".","localized":"active-system-page-note"},"content":[{"title":{"default":"Boot Device","localized":"active-system-boot-device-title"},"sections":[{"fields":[{"title":{"default":"Booted from","localized":"active-system-boot-device-field-title"},"control":{"type":"dropdown","items":[{"repeat":"filesystem.devices.*.medium","title":{"default":"${filesystem.devices.*.description}","localized":"active-system-boot-device-dropdown-item"},"value":"${filesystem.devices.*.medium}"}]},"options":{"readonly":true},"parameter":"filesystem.activedevice"}]}]},{"title":{"default":"System 1 (Internal Flash)","localized":"system1-title"},"sections":[{"fields":[{"hidden":"filesystem.activedevice is sd-card","title":{"default":"Active","localized":"active-system1-flash-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system1-active-label"},"disabledText":{"default":"","localized":"active-system1-inactive-label"}},"options":{"readonly":true},"parameter":"packageserver.system1.active"},{"hidden":"filesystem.activedevice is not sd-card","title":{"default":"Active","localized":"active-system1-sdcard-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system1-active-label"},"disabledText":{"default":"","localized":"active-system1-inactive-label"}},"options":{"readonly":true},"parameter":"packageserver.system.nonactive"},{"title":{"default":"Configured","localized":"configured-system1-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system1-configured-label"},"disabledText":{"default":"","localized":"active-system1-unconfigured-label"}},"options":{"readonly":true},"parameter":"packageserver.system1.configured"},{"title":{"default":"State","localized":"state-system1-title"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"packageserver.system1.state"}],"action":{"disabled":"packageserver.system1.configured is true","title":{"default":"Activate","localized":"state-system1-activate-button-label"},"method":"packageserver.system1.activate","confirm":{"title":{"default":"Confirm activation","localized":"confirm-activation-system1-title"},"message":{"default":"Really want to switch active system?","localized":"confirm-activation-system1-message"}},"type":"action"}}]},{"title":{"default":"System 2 (Internal Flash)","localized":"system2-title"},"sections":[{"fields":[{"hidden":"filesystem.activedevice is sd-card","title":{"default":"Active","localized":"active-system2-flash-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system2-active-label"},"disabledText":{"default":"","localized":"active-system2-inactive-label"}},"options":{"readonly":true},"parameter":"packageserver.system2.active"},{"hidden":"filesystem.activedevice is not sd-card","title":{"default":"Active","localized":"active-system2-sdcard-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system2-active-label"},"disabledText":{"default":"","localized":"active-system2-inactive-label"}},"options":{"readonly":true},"parameter":"packageserver.system.nonactive"},{"title":{"default":"Configured","localized":"configured-system2-title"},"control":{"type":"checkbox","enabledText":{"default":"","localized":"active-system2-configured-label"},"disabledText":{"default":"","localized":"active-system2-unconfigured-label"}},"options":{"readonly":true},"parameter":"packageserver.system2.configured"},{"title":{"default":"State","localized":"state-system2-title"},"control":{"type":"textfield"},"options":{"readonly":true},"parameter":"packageserver.system2.state"}],"action":{"disabled":"packageserver.system2.configured is true","title":{"default":"Activate","localized":"state-system2-activate-button-label"},"method":"packageserver.system2.activate","confirm":{"title":{"default":"Confirm activation","localized":"confirm-activation-system2-title"},"message":{"default":"Really want to switch active system?","localized":"confirm-activation-system2-message"}},"type":"action"}}]}]}')
    }
    ])
}
));
//# sourceMappingURL=package-server.js.map
