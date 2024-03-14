/*!
 * @wago/wbm-create-image@1.2.0
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
 *     Create bootable image
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["create-image"] = t() : e["create-image"] = t()
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
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        var i = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
          , r = this && this.__awaiter || function(e, t, n, i) {
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
          , o = this && this.__generator || function(e, t) {
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
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
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
        var a = n(1)
          , l = n(5);
        base.plugin.register("wbm-create-image", (function(e) {
            return r(this, void 0, void 0, (function() {
                var t, n, r;
                return o(this, (function(o) {
                    return t = {
                        id: "administration",
                        title: {
                            fallback: "Administration",
                            key: "administration-title"
                        },
                        description: {
                            fallback: "Administration services",
                            key: "administration-description"
                        },
                        priority: 860,
                        userRoles: [l.UserRoles.admin]
                    },
                    n = e.subframeGenerator.createSubFrame(t.id, e, ["administration-area"]),
                    r = a.initializeCreateImagePage(e),
                    n.registerSubMenuItem(r.item, r.controller),
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
        });
        var i = n(2);
        t.initializeCreateImagePage = function(e) {
            var t = {
                id: "create-image",
                priority: 100,
                title: e.localization.localized({
                    fallback: "Create Image",
                    key: "title-create-image"
                })
            }
              , n = {
                title: {
                    default: "Create bootable Image",
                    localized: "create-bootable-image-page-title"
                },
                note: {
                    default: "Create a bootable image from boot device and copy it to selected destination. Process will start immediately.",
                    localized: "create-bootable-image-page-note"
                },
                content: [new i.CreateImageController(e)]
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
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
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
        var l = n(3)
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.view = document.createElement("wbm-create-image-form"),
                t.submitButtonEnabled = !0,
                t
            }
            return r(t, e),
            t.prototype.load = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, n;
                    return a(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            this.view.innerHTML = "",
                            e = this.generateFormViewDescription(),
                            this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "loading-image-info",
                                    fallback: "Checking destination device..."
                                })
                            }, e),
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 4, , 5]),
                            [4, e];
                        case 2:
                            return t = i.sent(),
                            n = this.base.viewGenerator.generate(this.base, t),
                            this.view.appendChild(n.view),
                            [4, n.load()];
                        case 3:
                            return i.sent(),
                            !1 === this.submitButtonEnabled && (n.view.querySelector("button").disabled = !0),
                            [3, 5];
                        case 4:
                            return i.sent(),
                            this.base.logger.error("failed to get filesystem information"),
                            [3, 5];
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.getNoteForPrelfightCheckResult = function(e) {
                var t = void 0;
                return e.noSpace ? t = {
                    default: "Not enough memory available on destination device.\nWrite access not allowed.",
                    localized: "not-enough-space-available"
                } : e.lowSpace && (t = {
                    default: "Possibly not enough memory available on destination device.\nReason: the space requirement for this operation can only be approximately estimated.",
                    localized: "low-space-available"
                }),
                e.inUseByRuntime && (t ? (t.default += "\nDevice is in use by CoDeSys.",
                t.localized += "and-in-use-by-runtime") : t = {
                    default: "Device is in use by CoDeSys.",
                    localized: "in-use-by-runtime"
                }),
                t || (t = {
                    default: "Enough memory is available on destination device.\nDevice is not in use by CODESYS",
                    localized: "enough-memory-and-not-in-use-by-runtime"
                }),
                t.localized += "-note",
                t
            }
            ,
            t.prototype.generateFormViewDescription = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, n, i, r, o, c;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            return [4, l.getSourceAndDestinationDeviceInfos(this.base)];
                        case 1:
                            return (e = a.sent()).destination ? [4, l.getSizeInfos(this.base, e.destination)] : [3, 3];
                        case 2:
                            return n = a.sent(),
                            [3, 4];
                        case 3:
                            n = void 0,
                            a.label = 4;
                        case 4:
                            return t = n,
                            e.destination && t ? [4, l.getPreflightCheckResult(this.base, e.source, e.destination, t.min)] : [3, 6];
                        case 5:
                            return r = a.sent(),
                            [3, 7];
                        case 6:
                            r = void 0,
                            a.label = 7;
                        case 7:
                            return o = (i = r) ? this.getNoteForPrelfightCheckResult(i) : {
                                default: "No destination device available",
                                localized: "no-destination-device-available-note"
                            },
                            c = i && i.lowSpace,
                            !i || i.noSpace || i.inUseByRuntime ? this.submitButtonEnabled = !1 : this.submitButtonEnabled = !0,
                            [2, {
                                title: {
                                    default: "Create bootable image from boot device",
                                    localized: "create-bootable-image-form-title"
                                },
                                sections: [{
                                    note: o,
                                    fields: [{
                                        title: {
                                            default: "Boot device",
                                            localized: "create-bootable-image-active-partition-field-title"
                                        },
                                        argument: "source",
                                        options: {
                                            readonly: !0
                                        },
                                        control: {
                                            type: "dropdown",
                                            items: [{
                                                title: {
                                                    default: e.source.label,
                                                    localized: "create-bootable-image-active-partition-dropdown-item-label"
                                                },
                                                value: e.source.name
                                            }]
                                        }
                                    }, {
                                        title: {
                                            default: "Destination",
                                            localized: "create-bootable-image-destination-field-title"
                                        },
                                        argument: "destination",
                                        options: {
                                            readonly: !0
                                        },
                                        control: {
                                            type: "dropdown",
                                            items: [e.destination ? {
                                                title: {
                                                    default: e.destination.label,
                                                    localized: "create-bootable-image-destination-dropdown-item-label"
                                                },
                                                value: e.destination.name
                                            } : {
                                                title: {
                                                    default: "---",
                                                    localized: "create-bootable-image-no-destination-dropdown-item-label"
                                                },
                                                value: "-"
                                            }]
                                        }
                                    }].concat(e.destination && !1 === e.destination.internal ? [{
                                        title: {
                                            default: "Size of created image",
                                            localized: "create-bootable-image-size-of-created-image-field-title"
                                        },
                                        argument: "size",
                                        control: {
                                            type: "dropdown",
                                            items: t ? [{
                                                title: {
                                                    default: "Reduced to content",
                                                    localized: "create-bootable-image-reduced-to-content--card-size-dropdown-item-label"
                                                },
                                                value: "" + t.min.megabytes
                                            }, {
                                                title: {
                                                    default: "Full card size",
                                                    localized: "create-bootable-image-full-card-size-dropdown-item-label"
                                                },
                                                value: "" + t.max.megabytes
                                            }] : [{
                                                title: {
                                                    default: "---",
                                                    localized: "create-bootable-image-no-size-dropdown-item-label"
                                                },
                                                value: "-"
                                            }]
                                        }
                                    }] : []),
                                    action: {
                                        type: "action",
                                        title: {
                                            default: "Start Copy",
                                            localized: "copy-bootable-image-start-copy-action-title"
                                        },
                                        method: "createimage.copyimage",
                                        confirm: c ? {
                                            message: {
                                                default: (o && o.default) + "\nDo you want to continue?",
                                                localized: (o && o.localized) + "-confirmation-message"
                                            },
                                            title: {
                                                default: "Do you want to continue?",
                                                localized: "create-bootable-image-confirm-message"
                                            }
                                        } : void 0,
                                        progress: {
                                            title: {
                                                default: "Copy process is active",
                                                localized: "create-bootable-image-copy-in-progress-modal-title"
                                            }
                                        }
                                    }
                                }]
                            }]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(n(4).ViewController);
        t.CreateImageController = c
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
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
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
        var o = ["sd-card"];
        t.getSourceAndDestinationDeviceInfos = function(e) {
            return i(this, void 0, void 0, (function() {
                var t, n, i, a, l, c, s, u, d, f, b, p, m, h, y, v, g, w, z;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(["filesystem.activedevice", "filesystem.devices.*.medium"])];
                    case 1:
                        if (t = r.sent(),
                        n = t[0],
                        i = t.slice(1),
                        n.error)
                            throw n.error;
                        return a = n.value,
                        l = i.map((function(e) {
                            if (e.error)
                                throw e.error;
                            return e.value
                        }
                        )),
                        c = 0,
                        s = l.filter((function(e, t) {
                            return !!/^internal/.test(e) && (c = t,
                            !0)
                        }
                        ))[0],
                        u = [],
                        d = l.filter((function(e, t) {
                            return o.indexOf(e) >= 0 && (u.push(t),
                            !0)
                        }
                        )),
                        b = (f = s === a) ? s : d[0],
                        p = f ? c : u[0],
                        m = f ? d[0] : s,
                        h = f ? u[0] : c,
                        [4, e.parameter.read(["filesystem.devices." + p + ".description"].concat(m ? ["filesystem.devices." + h + ".description"] : []))];
                    case 2:
                        if (y = r.sent(),
                        v = y[0],
                        g = y[1],
                        v.error)
                            throw v.error;
                        if (w = v.value,
                        g && g.error)
                            throw g.error;
                        return z = g && (g || {}).value,
                        [2, {
                            source: {
                                internal: f,
                                index: p,
                                name: b,
                                label: w
                            },
                            destination: m ? {
                                internal: !1 === f,
                                index: h,
                                name: m,
                                label: z
                            } : void 0
                        }]
                    }
                }
                ))
            }
            ))
        }
        ,
        t.getSizeInfos = function(e, t) {
            return i(this, void 0, void 0, (function() {
                var n, i, o, a, l;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, e.parameter.read(["createimage.imagesize", "filesystem.devices." + t.index + ".capacity"])];
                    case 1:
                        if (n = r.sent(),
                        i = n[0],
                        o = n[1],
                        i.error)
                            throw i.error;
                        if (a = parseInt(i.value, 10),
                        o.error)
                            throw o.error;
                        return l = Math.floor(parseInt(o.value, 10) / 1024),
                        [2, {
                            min: {
                                megabytes: a
                            },
                            max: {
                                megabytes: l
                            }
                        }]
                    }
                }
                ))
            }
            ))
        }
        ,
        t.getPreflightCheckResult = function(e, t, n, o) {
            return i(this, void 0, void 0, (function() {
                var i, a, l, c, s, u;
                return r(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return i = !1,
                        a = !1,
                        l = !1,
                        [4, e.parameter.execute("createimage.checkspace", {
                            source: t.name,
                            destination: n.name,
                            size: o.megabytes
                        })];
                    case 1:
                        if ((c = r.sent()).error) {
                            if (u = c.error,
                            862 !== u.statusCode)
                                throw u;
                            u.message.indexOf("14") >= 0 ? i = !0 : u.message.indexOf("13") >= 0 && (a = !0)
                        }
                        return [4, e.parameter.execute("createimage.checkruntimeuse", {
                            source: t.name,
                            destination: n.name,
                            size: o.megabytes
                        })];
                    case 2:
                        if ((s = r.sent()).error) {
                            if (u = s.error,
                            862 !== u.statusCode)
                                throw u;
                            u.message.indexOf("1") >= 0 && (l = !0)
                        }
                        return [2, {
                            noSpace: i,
                            lowSpace: a,
                            inUseByRuntime: l
                        }]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e, t, n) {
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
//# sourceMappingURL=create-image.js.map
