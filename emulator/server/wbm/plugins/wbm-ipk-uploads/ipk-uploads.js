/*!
 * @wago/wbm-ipk-uploads@1.1.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *     Marius Hellmeier <marius.hellmeier@wago.com>
 *
 *   Description:
 *     Provides a feature to upload and install IPK files for PFC based devices.
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["ipk-uploads"] = t() : e["ipk-uploads"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
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
            var r = Object.create(null);
            if (n.r(r),
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(r, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return r
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
    , function(e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(2)
          , a = n(3)
          , s = n(6);
        base.plugin.register("wbm-ipk-uploads", (function(e) {
            return r(this, void 0, void 0, (function() {
                var t;
                return o(this, (function(n) {
                    if (e.browser.browserType === s.BrowserType.eDisplay)
                        throw new Error("Unsupported browser e!Display");
                    return t = {
                        title: {
                            default: "Software Uploads",
                            localized: "software-uploads-page-title"
                        },
                        note: {
                            default: "Software packages can be uploaded as ipk files and installed. Uploaded files will be deleted automatically after installation.",
                            localized: "software-uploads-page-note"
                        },
                        content: [{
                            title: {
                                default: "Upload new Software",
                                localized: "upload-new-software-form-title"
                            },
                            sections: [new a.SoftwareUpload(e)]
                        }]
                    },
                    [2, {
                        id: "software-uploads",
                        title: {
                            fallback: "Software Uploads",
                            key: "software-uploads"
                        },
                        description: {
                            fallback: "Upload and install software packages (IPK)",
                            key: "another-unique-translation-key"
                        },
                        priority: 815,
                        userRoles: [i.UserRoles.admin],
                        controller: e.viewGenerator.generate(e, t)
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
        function(e) {
            e.admin = "admin",
            e.user = "user",
            e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }
    , function(e, t, n) {
        "use strict";
        var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
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
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((r = r.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(4)
          , l = n(0)
          , u = n(0)
          , c = function(e) {
            function t(t) {
                var r = e.call(this, t) || this;
                r.view = document.createElement("wbm-ipk-uploads"),
                r.view.innerHTML = n(5);
                var o = r.view.querySelector("label.file-input")
                  , i = r.fileInput;
                return i.addEventListener("change", (function() {
                    var e = i.files[0];
                    e ? (o.setAttribute("data-filename", e.name),
                    r.installButton.disabled = !1) : (o.setAttribute("data-filename", ""),
                    r.installButton.disabled = !0)
                }
                )),
                r.installButton.disabled = !0,
                r.installButton.addEventListener("click", (function() {
                    return r.onInstallButtonPressed()
                }
                )),
                r
            }
            return o(t, e),
            Object.defineProperty(t.prototype, "installButton", {
                get: function() {
                    return this.view.querySelector("button")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "fileInput", {
                get: function() {
                    return this.view.querySelector("input[type=file]")
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "selectedFile", {
                get: function() {
                    var e = this.view.querySelector("input[type=file]");
                    return e.files && e.files[0] || void 0
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.uploadIPKFile = function(e) {
                return i(this, void 0, void 0, (function() {
                    var t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            [4, this.removeIPK()];
                        case 1:
                            return n.sent(),
                            [3, 3];
                        case 2:
                            return n.sent(),
                            [3, 3];
                        case 3:
                            return n.trys.push([3, 5, , 6]),
                            [4, this.base.transfer.upload([e], "/var/downloads/update-script")];
                        case 4:
                            return n.sent(),
                            this.base.transfer.cleanUp(),
                            [3, 6];
                        case 5:
                            throw t = n.sent(),
                            this.base.transfer.cleanUp(),
                            t;
                        case 6:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.installIPK = function(e) {
                return void 0 === e && (e = !1),
                i(this, void 0, void 0, (function() {
                    var t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return [4, this.base.parameter.execute("softwareupload.install", {
                                force: e
                            })];
                        case 1:
                            if ((t = n.sent()).error)
                                throw t.error;
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.removeIPK = function() {
                return i(this, void 0, void 0, (function() {
                    var e;
                    return a(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return [4, this.base.parameter.execute("softwareupload.delete")];
                        case 1:
                            if ((e = t.sent()).error)
                                throw e.error;
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.getExistingIPK = function() {
                return i(this, void 0, void 0, (function() {
                    var e;
                    return a(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return [4, this.base.parameter.execute("softwareupload.get")];
                        case 1:
                            if ((e = t.sent()).error)
                                throw e.error;
                            return [2, e.value]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.onInstallButtonPressed = function() {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            this.installButton.disabled = !0,
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 4, , 5]),
                            [4, this.uploadSelectedIPKFile()];
                        case 2:
                            return e.sent(),
                            [4, this.installUploadedIPKFile()];
                        case 3:
                            return e.sent(),
                            this.fileInput.value = "",
                            this.fileInput.dispatchEvent(new CustomEvent("change")),
                            [3, 5];
                        case 4:
                            return e.sent(),
                            [3, 5];
                        case 5:
                            return this.installButton.disabled = !1,
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.uploadSelectedIPKFile = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            e = this.selectedFile,
                            t = this.uploadIPKFile(e),
                            r.label = 1;
                        case 1:
                            return r.trys.push([1, 3, , 5]),
                            [4, this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: "Uploading software ..."
                            }, t)];
                        case 2:
                            return r.sent(),
                            [3, 5];
                        case 3:
                            return n = r.sent(),
                            [4, this.showUploadHasFailed(n)];
                        case 4:
                            throw r.sent(),
                            n;
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.askToForceInstallAfterFailedInstallation = function(e) {
                return i(this, void 0, void 0, (function() {
                    var t, n;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return t = this.getExistingIPK(),
                            n = u.DialogButtonType.primary,
                            [4, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: "Installation failed",
                                message: "You may want to try a force install. You must restart the device manually in order to complete the installation.",
                                detailMessage: e && e.message,
                                primaryButton: {
                                    style: l.DialogButtonStyle.action,
                                    title: "Force install"
                                }
                            })];
                        case 1:
                            return n !== r.sent() ? [3, 6] : [4, t];
                        case 2:
                            return r.sent() ? [3, 4] : [4, this.uploadSelectedIPKFile()];
                        case 3:
                            r.sent(),
                            r.label = 4;
                        case 4:
                            return [4, this.installUploadedIPKFileUsingForceMode()];
                        case 5:
                            return r.sent(),
                            [3, 9];
                        case 6:
                            return [4, t];
                        case 7:
                            return r.sent() ? [4, this.removeIPKAfterFailedInstallation()] : [3, 9];
                        case 8:
                            r.sent(),
                            r.label = 9;
                        case 9:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.showUploadHasFailed = function(e) {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return [2, this.base.modalPresenter.showErrorDialog(this.base, {
                            title: "Upload failed",
                            message: "An error occured while uploading the file; installation could not be performed.",
                            detailMessage: e && e.message
                        })]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.showInstallationHasFailed = function(e) {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return [2, this.base.modalPresenter.showErrorDialog(this.base, {
                            title: "Installation failed",
                            message: "The installation has failed.",
                            detailMessage: e && e.message
                        })]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.showCleanupHasFailed = function(e) {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return [2, this.base.modalPresenter.showErrorDialog(this.base, {
                            title: "Cleanup failed",
                            message: "The uploaded file could not be deleted. However, it will be removed automatically on next device reboot.",
                            detailMessage: e && e.message
                        })]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.showInstallationSuccess = function(e) {
                return void 0 === e && (e = !1),
                i(this, void 0, void 0, (function() {
                    return a(this, (function(t) {
                        return [2, this.base.modalPresenter.showDialog(this.base, {
                            title: "Installation has been completed",
                            message: "The software has been installed successfully." + (e ? "\n\nPlease reboot your device to complete the installation." : "")
                        })]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.canTryToForce = function(e) {
                return !0
            }
            ,
            t.prototype.installUploadedIPKFile = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            return r.trys.push([0, 3, , 10]),
                            e = this.installIPK(),
                            [4, this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: "Installing software ..."
                            }, e)];
                        case 1:
                            return r.sent(),
                            [4, this.showInstallationSuccess()];
                        case 2:
                            return r.sent(),
                            [3, 10];
                        case 3:
                            return t = r.sent(),
                            this.canTryToForce(t) ? [4, this.askToForceInstallAfterFailedInstallation(t)] : [3, 5];
                        case 4:
                            return r.sent(),
                            [3, 9];
                        case 5:
                            return n = this.getExistingIPK(),
                            [4, this.showInstallationHasFailed(t)];
                        case 6:
                            return r.sent(),
                            [4, n];
                        case 7:
                            return r.sent() ? [4, this.removeIPKAfterFailedInstallation()] : [3, 9];
                        case 8:
                            r.sent(),
                            r.label = 9;
                        case 9:
                            return [3, 10];
                        case 10:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.installUploadedIPKFileUsingForceMode = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 3, , 5]),
                            e = this.installIPK(!0),
                            [4, this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: "Installing software ..."
                            }, e)];
                        case 1:
                            return n.sent(),
                            [4, this.showInstallationSuccess(!0)];
                        case 2:
                            return n.sent(),
                            [3, 5];
                        case 3:
                            return t = n.sent(),
                            [4, this.showInstallationHasFailed(t)];
                        case 4:
                            return n.sent(),
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
            t.prototype.removeIPKAfterFailedInstallation = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 4]),
                            e = this.removeIPK(),
                            [4, this.base.modalPresenter.showLoadingDialog(this.base, {
                                title: "Removing uploaded file..."
                            }, e)];
                        case 1:
                            return n.sent(),
                            [3, 4];
                        case 2:
                            return t = n.sent(),
                            [4, this.showCleanupHasFailed(t)];
                        case 3:
                            return n.sent(),
                            [3, 4];
                        case 4:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        return [2]
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(s.ViewController);
        t.SoftwareUpload = c
    }
    , function(e, t, n) {
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
    , function(e, t) {
        e.exports = '<div class=section> <div class=field taid=field-software-file> <label taid=field-title>Software file</label> <div class=control> <label class=file-input data-placeholder="Choose ipk file..." data-filename=""><input type=file name=ipk-file taid=field-control></label> </div> </div> <div class=actions> <button taid=action-install-software class=action>Install</button> </div> </div>'
    }
    , function(e, t, n) {
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
    ])
}
));
//# sourceMappingURL=ipk-uploads.js.map
