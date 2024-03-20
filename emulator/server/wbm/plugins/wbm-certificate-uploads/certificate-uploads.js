/*!
 * @wago/wbm-certificate-uploads@1.1.0
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
 *     Plugin which adds certificate upload functionality as need e.g. to upload certificates used by OpenVPN
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["certificate-uploads"] = t() : e["certificate-uploads"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function i(n) {
            if (t[n])
                return t[n].exports;
            var r = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(r.exports, r, r.exports, i),
            r.l = !0,
            r.exports
        }
        return i.m = e,
        i.c = t,
        i.d = function(e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
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
            var n = Object.create(null);
            if (i.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    i.d(n, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return n
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
        i(i.s = 0)
    }([function(e, t, i) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, i, n) {
            return new (i || (i = Promise))((function(r, a) {
                function o(e) {
                    try {
                        s(n.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(n.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(o, l)
                }
                s((n = n.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var i, n, r, a, o = {
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
                                n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n),
                                0) : n.next) && !(r = r.call(n, a[1])).done)
                                    return r;
                                switch (n = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    n = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < r[1]) {
                                        o.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && o.label < r[2]) {
                                        o.label = r[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    r[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                n = 0
                            } finally {
                                i = r = 0
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
        var a = i(1)
          , o = i(2);
        base.plugin.register("wbm-certificate-uploads", (function(e) {
            return n(this, void 0, void 0, (function() {
                return r(this, (function(t) {
                    return [2, {
                        id: "certificates",
                        title: {
                            fallback: "Certificates",
                            key: "certificates-title"
                        },
                        description: {
                            fallback: "Upload certificates and keys",
                            key: "certificates-description"
                        },
                        priority: 0,
                        controller: e.viewGenerator.generate(e, o.default(e)),
                        userRoles: [a.UserRoles.admin]
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = i(3);
        t.default = function(e) {
            return {
                title: {
                    default: "Certificates",
                    localized: "certificates-page-title"
                },
                content: [{
                    title: {
                        default: "Installed Certificates",
                        localized: "installed-certificates-form-title"
                    },
                    sections: [{
                        fields: [{
                            empty: {
                                localized: "no-certificates-existing",
                                default: "No certificates existing."
                            },
                            repeat: "certificates.list.*.name",
                            parameter: "certificates.list.*.name",
                            control: {
                                type: "textfield"
                            },
                            delete: "certificates.list.*.delete",
                            add: "certificates.storecertificate",
                            confirmdeletion: {
                                title: {
                                    default: "Attention",
                                    key: "certificate-delete-confirm-title"
                                },
                                message: {
                                    default: "Do you really want to delete certificate file?",
                                    key: "certificate-delete-confirm-message"
                                }
                            }
                        }]
                    }, new n.UploadForm(e,"certificate")]
                }, {
                    title: {
                        default: "Installed Private Keys",
                        localized: "installed-certificates-form-title"
                    },
                    sections: [{
                        fields: [{
                            empty: {
                                localized: "no-private-keys-existing",
                                default: "No private keys existing."
                            },
                            repeat: "certificates.privatekeys.*.name",
                            parameter: "certificates.privatekeys.*.name",
                            control: {
                                type: "textfield"
                            },
                            delete: "certificates.privatekeys.*.delete",
                            add: "certificates.storeprivatekey",
                            confirmdeletion: {
                                title: {
                                    default: "Attention",
                                    key: "private-key-delete-confirm-title"
                                },
                                message: {
                                    default: "Do you really want to delete private key file?",
                                    key: "private-key-delete-confirm-message"
                                }
                            }
                        }]
                    }, new n.UploadForm(e,"privatekey")]
                }]
            }
        }
    }
    , function(e, t, i) {
        "use strict";
        var n, r = this && this.__extends || (n = Object.setPrototypeOf || {
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
            n(e, t),
            e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
            new i)
        }
        ), a = this && this.__awaiter || function(e, t, i, n) {
            return new (i || (i = Promise))((function(r, a) {
                function o(e) {
                    try {
                        s(n.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function l(e) {
                    try {
                        s(n.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    e.done ? r(e.value) : new i((function(t) {
                        t(e.value)
                    }
                    )).then(o, l)
                }
                s((n = n.apply(e, t || [])).next())
            }
            ))
        }
        , o = this && this.__generator || function(e, t) {
            var i, n, r, a, o = {
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
                                n && (r = 2 & a[0] ? n.return : a[0] ? n.throw || ((r = n.return) && r.call(n),
                                0) : n.next) && !(r = r.call(n, a[1])).done)
                                    return r;
                                switch (n = 0,
                                r && (a = [2 & a[0], r.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    r = a;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    n = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
                                        o.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && o.label < r[1]) {
                                        o.label = r[1],
                                        r = a;
                                        break
                                    }
                                    if (r && o.label < r[2]) {
                                        o.label = r[2],
                                        o.ops.push(a);
                                        break
                                    }
                                    r[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                a = t.call(e, o)
                            } catch (e) {
                                a = [6, e],
                                n = 0
                            } finally {
                                i = r = 0
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
            function t(t, i) {
                var n = e.call(this, t) || this;
                return n.view = document.createElement("wbm-certificates-upload-form"),
                n.name = i,
                n
            }
            return r(t, e),
            t.prototype.load = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, i, n = this;
                    return o(this, (function(r) {
                        return this.view.innerHTML = '        \n            <div class="section">\n                <div class="field" taid="field-' + name + '-file">\n                    <div class="control">\n                        <label class="file-input" data-placeholder="Choose file..." data-filename=""><input type="file" taid="field-control"></label>\n                    </div>\n                    <button taid="action-' + name + '-upload" class="action" disabled="disabled">Upload</button>\n                </div>\n            </div>\n        ',
                        (e = this.view.querySelector("button")).addEventListener("click", (function() {
                            return n.uploadButtonPressed()
                        }
                        )),
                        t = this.view.querySelector("input"),
                        i = this.view.querySelector("label.file-input"),
                        t.addEventListener("change", (function() {
                            var n = t.files && t.files.length && t.files[0].name || "";
                            i.setAttribute("data-filename", n),
                            e.disabled = !n
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
                    var e, t, i, n, r, a;
                    return o(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            (e = this.view.querySelector("div.section")).classList.add("submitting"),
                            t = this.view.querySelector("input"),
                            i = t.files[0],
                            o.label = 1;
                        case 1:
                            return o.trys.push([1, 3, , 4]),
                            [4, this.base.transfer.upload([i], "/tmp/vpncfg")];
                        case 2:
                            return o.sent(),
                            [3, 4];
                        case 3:
                            return n = o.sent(),
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
                                detailMessage: n.message
                            })];
                        case 4:
                            return o.trys.push([4, 6, , 7]),
                            [4, this.base.parameter.execute("certificates.store" + this.name, {
                                filename: i.name
                            })];
                        case 5:
                            if ((r = o.sent()).error)
                                throw r.error;
                            return [3, 7];
                        case 6:
                            return a = o.sent(),
                            this.base.transfer.cleanUp(),
                            e.classList.remove("submitting"),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-upload-failed-error-modal-title",
                                    fallback: "Installation failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-installation-failed-error-modal-message",
                                    fallback: "Could not install the uploaded file"
                                }),
                                detailMessage: a.message
                            })];
                        case 7:
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
        }(i(4).ViewController);
        t.UploadForm = l
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e) {
                this.base = e
            }
            return e.prototype.onRouteChange = function(e) {}
            ,
            e.prototype.unload = function() {}
            ,
            e
        }();
        t.ViewController = n
    }
    ])
}
));
//# sourceMappingURL=certificate-uploads.js.map
