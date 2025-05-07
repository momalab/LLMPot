/*!
 * @wago/wbm-massstorage@1.2.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     UNLICENSED
 *
 *   Contributors:
 *
 *
 *   Description:
 *     Mass storage configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.massstorage = t() : e.massstorage = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function a(i) {
            if (t[i])
                return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, a),
            r.l = !0,
            r.exports
        }
        return a.m = e,
        a.c = t,
        a.d = function(e, t, i) {
            a.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        a.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        a.t = function(e, t) {
            if (1 & t && (e = a(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (a.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    a.d(i, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return i
        }
        ,
        a.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return a.d(t, "a", t),
            t
        }
        ,
        a.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        a.p = "",
        a(a.s = 2)
    }([function(e, t, a) {
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
    , function(e, t, a) {
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
    , function(e, t, a) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, a, i) {
            return new (a || (a = Promise))((function(r, o) {
                function n(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof a ? t : new a((function(e) {
                        e(t)
                    }
                    ))).then(n, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var a, i, r, o, n = {
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
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (a = 1,
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
                                    return n.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        n.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(o);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                o = t.call(e, n)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                a = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = a(3)
          , n = a(5)
          , s = a(8);
        base.plugin.register("wbm-massstorage", (function(e) {
            return i(this, void 0, void 0, (function() {
                var t;
                return r(this, (function(a) {
                    return t = {
                        title: {
                            default: "Mass Storage",
                            localized: "mass-storage-page-title"
                        },
                        content: [{
                            title: {
                                default: "Devices",
                                localized: "massstorage-device-list"
                            },
                            sections: [new n.DeviceList(e)]
                        }, {
                            title: {
                                default: "Create new Filesystem on Memory Card",
                                localized: "memory-card-format-content-title"
                            },
                            sections: [new o.MemoryCardFormat(e)]
                        }]
                    },
                    [2, {
                        id: "massstorage",
                        title: {
                            fallback: "Mass Storage",
                            key: "mass-storage-plugin-title"
                        },
                        description: {
                            fallback: "Mass storage information and format memory card",
                            key: "mass-storage-page-description"
                        },
                        priority: 815,
                        controller: e.viewGenerator.generate(e, t),
                        userRoles: [s.UserRoles.admin]
                    }]
                }
                ))
            }
            ))
        }
        ))
    }
    , function(e, t, a) {
        "use strict";
        var i, r = this && this.__extends || (i = function(e, t) {
            return (i = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var a in t)
                    t.hasOwnProperty(a) && (e[a] = t[a])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function a() {
                this.constructor = e
            }
            i(e, t),
            e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype,
            new a)
        }
        ), o = this && this.__awaiter || function(e, t, a, i) {
            return new (a || (a = Promise))((function(r, o) {
                function n(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof a ? t : new a((function(e) {
                        e(t)
                    }
                    ))).then(n, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            ))
        }
        , n = this && this.__generator || function(e, t) {
            var a, i, r, o, n = {
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
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (a = 1,
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
                                    return n.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        n.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(o);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                o = t.call(e, n)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                a = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(0)
          , l = a(1)
          , c = a(1)
          , d = function(e) {
            function t(t) {
                var i = e.call(this, t) || this;
                return i.view = document.createElement("memory-card-format"),
                i.view.innerHTML = a(4),
                i.filesystemTypeInput = i.view.querySelector("select#mass-storage-format-filesystem-type"),
                i.labelInput = i.view.querySelector("input#mass-storage-fat-format-volume-name-input"),
                i.submitButton = i.view.querySelector("button"),
                i.submitButton.disabled = !0,
                i.submitButton.addEventListener("click", (function() {
                    return i.onFormatCardSubmit()
                }
                )),
                i.filesystemTypeInput.addEventListener("click", (function() {
                    i.submitButton.disabled = !1
                }
                )),
                i.labelInput.addEventListener("click", (function() {
                    i.submitButton.disabled = !1
                }
                )),
                i
            }
            return r(t, e),
            t.prototype.load = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, a, i, r, s, l, c, d = this;
                    return n(this, (function(u) {
                        switch (u.label) {
                        case 0:
                            return e = "",
                            t = "",
                            a = !1,
                            i = !1,
                            this.sdCardDeviceName = "",
                            this.sdCardDeviceIndex = -1,
                            $("div#mass-storage-format-card-available").hide(),
                            $("div#mass-storage-format-no-card-available").html(""),
                            [4, this.base.parameter.read(["filesystem.activedevice", "filesystem.devices.*.medium"])];
                        case 1:
                            if (r = u.sent(),
                            s = r[0],
                            l = r.slice(1),
                            s.error)
                                this.base.modalPresenter.showErrorDialog(this.base, {
                                    title: this.base.localization.localized({
                                        fallback: "Read failed",
                                        key: "mass-storage-format-read-failed-error-title"
                                    }),
                                    message: this.base.localization.localized({
                                        fallback: "Error while reading boot device.",
                                        key: "mass-storage-format-read-active-device-failed-error-title"
                                    }),
                                    detailMessage: s.error && s.error.message
                                }),
                                i = !0;
                            else
                                for (c in 0,
                                t = s.value,
                                l)
                                    if ("sd-card" === l[c].value) {
                                        a = !0,
                                        this.sdCardDeviceIndex = 0;
                                        break
                                    }
                            return a ? [4, this.base.parameter.transaction((function() {
                                return o(d, void 0, void 0, (function() {
                                    var e;
                                    return n(this, (function(t) {
                                        switch (t.label) {
                                        case 0:
                                            return [4, this.base.parameter.read("filesystem.devices.*.name")];
                                        case 1:
                                            return null == (e = t.sent())[this.sdCardDeviceIndex] || e[this.sdCardDeviceIndex].error ? (this.base.modalPresenter.showErrorDialog(this.base, {
                                                title: this.base.localization.localized({
                                                    fallback: "Read failed",
                                                    key: "mass-storage-format-read-failed-error-title"
                                                }),
                                                message: this.base.localization.localized({
                                                    fallback: "Error while reading device list.",
                                                    key: "mass-storage-format-read-device-list-failed-error-title"
                                                }),
                                                detailMessage: s.error && s.error.message
                                            }),
                                            i = !0) : this.sdCardDeviceName = e[this.sdCardDeviceIndex].value,
                                            [2]
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ))] : [3, 3];
                        case 2:
                            u.sent(),
                            u.label = 3;
                        case 3:
                            return !1 === a || i ? (e = this.base.localization.localized({
                                fallback: "No memory card available.",
                                key: "mass-storage-format-no-card-available-text"
                            }),
                            $("div#mass-storage-format-no-card-available").html("<p>" + e + "</p>")) : "sd-card" === t ? (e = this.base.localization.localized({
                                fallback: "Not available: memory card is boot device.",
                                key: "mass-storage-format-card-is-boot-device-text"
                            }),
                            $("div#mass-storage-format-no-card-available").html("<p>" + e + "</p>")) : $("div#mass-storage-format-card-available").show(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return o(this, void 0, void 0, (function() {
                    return n(this, (function(e) {
                        return this.observation && this.observation.cancel(),
                        this.observation = void 0,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onFormatCardSubmit = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, a;
                    return n(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            return e = this.labelInput.value,
                            t = this.filesystemTypeInput.value,
                            a = c.DialogButtonType.primary,
                            [4, this.base.modalPresenter.showWarningDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Formatting memory card",
                                    key: "mass-storage-format-warning-dialog-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "All data will be deleted. Do you want to continue?",
                                    key: "mass-storage-format-warning-dialog-message"
                                }),
                                primaryButton: {
                                    style: l.DialogButtonStyle.action,
                                    title: "Continue"
                                }
                            })];
                        case 1:
                            return a === i.sent() && this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Formatting memory card...",
                                    key: "format-memorycard-loading-dialog"
                                })
                            }, this.formatCard(e, t)),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.formatCard = function(e, t) {
                return o(this, void 0, void 0, (function() {
                    var a;
                    return n(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            return [4, this.base.parameter.execute("filesystem.formatmedium", {
                                devicename: this.sdCardDeviceName,
                                volumename: e,
                                fstype: t
                            })];
                        case 1:
                            return (a = i.sent()).error ? (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Formatting failed",
                                    key: "format-memorycard-formatting-failed-dialog-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Error while formatting device.",
                                    key: "format-memorycard-formatting-failed-dialog-message"
                                }),
                                detailMessage: a.error && a.error.message
                            }),
                            [2]) : (this.submitButton.disabled = !0,
                            this.labelInput.value = "",
                            [2])
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(s.ViewController);
        t.MemoryCardFormat = d
    }
    , function(e, t) {
        e.exports = '<div class=section> <div id=mass-storage-format-no-card-available> </div> <div id=mass-storage-format-card-available> <div class=section-body> <div taid=filesystem-type class=field> <label taid=filesystem-type-field-label>Filesystem type</label> <div class="control dropdown"> <div class=select-wrapper> <select taid=mass-storage-format-filesystem-type id=mass-storage-format-filesystem-type> <option value=ext4>Ext4</option> <option value=fat>FAT</option> </select> </div> </div> </div> <div taid=volume-name class=field> <label taid=volume-name-field-label>Label</label> <div class="control textfield"> <input type=text taid=volume-name-field-control id=mass-storage-fat-format-volume-name-input> </div> </div> </div> <div class=actions> <button class="submit-button action" taid=section-submit-button>Start</button> </div> </div> </div> '
    }
    , function(e, t, a) {
        "use strict";
        var i, r = this && this.__extends || (i = function(e, t) {
            return (i = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var a in t)
                    t.hasOwnProperty(a) && (e[a] = t[a])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function a() {
                this.constructor = e
            }
            i(e, t),
            e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype,
            new a)
        }
        ), o = this && this.__awaiter || function(e, t, a, i) {
            return new (a || (a = Promise))((function(r, o) {
                function n(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function l(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof a ? t : new a((function(e) {
                        e(t)
                    }
                    ))).then(n, s)
                }
                l((i = i.apply(e, t || [])).next())
            }
            ))
        }
        , n = this && this.__generator || function(e, t) {
            var a, i, r, o, n = {
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
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; n; )
                            try {
                                if (a = 1,
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
                                    return n.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        n.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(o);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                o = t.call(e, n)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                a = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(0)
          , l = a(6)
          , c = function(e) {
            function t(t) {
                var a = e.call(this, t) || this;
                return a.view = document.createElement("device-list"),
                a.bootDeviceFlagLabel = a.base.localization.localized({
                    fallback: "Boot device",
                    key: "mass-storage-device-list-boot-device-flag-label"
                }),
                a.volumeNameLabel = a.base.localization.localized({
                    fallback: "Volume name",
                    key: "mass-storage-device-list-volume-name-label"
                }),
                a
            }
            return r(t, e),
            t.prototype.load = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t = this;
                    return n(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return this.loadDeviceList(),
                            e = this,
                            [4, this.base.parameter.observe("filesystem.formatmedium", {
                                kind: "called"
                            }, (function(e, a) {
                                return o(t, void 0, void 0, (function() {
                                    return n(this, (function(e) {
                                        switch (e.label) {
                                        case 0:
                                            return $("div[taid=section-massstorage-device-title]").addClass("submitting"),
                                            [4, this.loadDeviceList()];
                                        case 1:
                                            return e.sent(),
                                            $("div[taid=section-massstorage-device-title]").removeClass("submitting"),
                                            [2]
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ))];
                        case 1:
                            return e.observation = a.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return o(this, void 0, void 0, (function() {
                    return n(this, (function(e) {
                        return this.observation && this.observation.cancel(),
                        this.observation = void 0,
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.loadDeviceList = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, i, r, o, s, c, d, u, f, m;
                    return n(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return e = !1,
                            [4, this.base.parameter.read(["filesystem.activedevice", "filesystem.devices.*.medium"])];
                        case 1:
                            return t = n.sent(),
                            i = t[0],
                            r = t.slice(1),
                            i.error && (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Read failed",
                                    key: "mass-storage-format-read-failed-error-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Error while reading active device.",
                                    key: "mass-storage-format-read-active-device-failed-error-title"
                                }),
                                detailMessage: i.error && i.error.message
                            }),
                            e = !0),
                            [4, this.base.parameter.read(["filesystem.devices.*.label"])];
                        case 2:
                            if ((o = n.sent().slice(0)).error && (this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    fallback: "Read failed",
                                    key: "mass-storage-format-read-failed-error-title"
                                }),
                                message: this.base.localization.localized({
                                    fallback: "Error while reading device labels.",
                                    key: "mass-storage-read-labels-failed-error-title"
                                }),
                                detailMessage: o.error && o.error.message
                            }),
                            e = !0),
                            !e)
                                for ($("device-list").html(""),
                                s = i.value,
                                c = 0; c < r.length; c++)
                                    d = r[c].value,
                                    u = l.getMediumDescriptionForDeviceMedium(d),
                                    f = o[c].value,
                                    m = (m = (m = (m = (m = a(7)).replace(/\${medium-name}/g, d)).replace(/\${device-description}/g, u)).replace("${boot-device-flag-label}", this.bootDeviceFlagLabel)).replace("${volume-name-label}", this.volumeNameLabel),
                                    $("device-list").append(m),
                                    d === s && $("div#mass-storage-device-list-bootdevice-flag-" + d + " input").attr("checked", "checked"),
                                    $("div#mass-storage-device-list-volume-name-" + d + " input").val(f);
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(s.ViewController);
        t.DeviceList = c
    }
    , function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getMediumDescriptionForDeviceMedium = function(e) {
            return "sd-card" === e ? "Memory Card" : /^internal-flash.*$/.test(e) ? "Internal Flash" : e
        }
    }
    , function(e, t) {
        e.exports = '<div taid=section-massstorage-device-title class="section titled-section"> <span class=title taid=section-title>${device-description}</span> <div class=section-body> <div taid=field-device-info-bootdevice id=mass-storage-device-list-bootdevice-flag-${medium-name} class=field> <label taid=field-title>${boot-device-flag-label}</label> <div class="control checkbox"> <input type=checkbox taid=field-control class=no-validation readonly=readonly> <span class=checkbox></span> </div> </div> <div taid=field-device-info-volumename id=mass-storage-device-list-volume-name-${medium-name} class=field> <label taid=field-title>${volume-name-label}</label> <div class="control textfield"> <input type=text taid=field-control class=no-validation readonly=readonly> </div> </div> </div> </div> '
    }
    , function(e, t, a) {
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
//# sourceMappingURL=massstorage.js.map
