/*!
 * @wago/wbm-openvpn-ipsec@1.1.0
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
 *     OpenVPN and IPsec configuration
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["openvpn-ipsec"] = t() : e["openvpn-ipsec"] = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(o) {
            if (t[o])
                return t[o].exports;
            var r = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(r.exports, r, r.exports, n),
            r.l = !0,
            r.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
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
            var o = Object.create(null);
            if (n.r(o),
            Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    n.d(o, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return o
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
    , function(e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function(e, t, n, o) {
            return new (n || (n = Promise))((function(r, i) {
                function a(e) {
                    try {
                        l(o.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(o.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((o = o.apply(e, t || [])).next())
            }
            ))
        }
          , r = this && this.__generator || function(e, t) {
            var n, o, r, i, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                                o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o),
                                0) : o.next) && !(r = r.call(o, i[1])).done)
                                    return r;
                                switch (o = 0,
                                r && (i = [2 & i[0], r.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    r = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    o = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = i;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                o = 0
                            } finally {
                                n = r = 0
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
        var i = n(2);
        n(3);
        var a = n(7);
        base.plugin.register("wbm-openvpn-ipsec", (function(e) {
            return o(this, void 0, void 0, (function() {
                return r(this, (function(t) {
                    return [2, {
                        id: "openvpn-ipsec",
                        title: {
                            fallback: "OpenVPN / IPsec",
                            key: "openvpn-ipsec-menu-title"
                        },
                        description: {
                            fallback: "OpenVPN and IPsec settings",
                            key: "openvpn-ipsec-settings-area-description"
                        },
                        priority: 0,
                        controller: e.viewGenerator.generate(e, a.default(e)),
                        userRoles: [i.UserRoles.admin]
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
        var o = n(4);
        "string" == typeof o && (o = [[e.i, o, ""]]);
        var r = {
            insert: "head",
            singleton: !1
        };
        n(6)(o, r);
        o.locals && (e.exports = o.locals)
    }
    , function(e, t, n) {
        (e.exports = n(5)(!1)).push([e.i, "div.body>wbm-certificates-download-form>div.section{border-top:none}", ""])
    }
    , function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var n = function(e, t) {
                        var n = e[1] || ""
                          , o = e[3];
                        if (!o)
                            return n;
                        if (t && "function" == typeof btoa) {
                            var r = (a = o,
                            s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                            l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),
                            "/*# ".concat(l, " */"))
                              , i = o.sources.map((function(e) {
                                return "/*# sourceURL=".concat(o.sourceRoot).concat(e, " */")
                            }
                            ));
                            return [n].concat(i).concat([r]).join("\n")
                        }
                        var a, s, l;
                        return [n].join("\n")
                    }(t, e);
                    return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
                }
                )).join("")
            }
            ,
            t.i = function(e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var o = {}, r = 0; r < this.length; r++) {
                    var i = this[r][0];
                    null != i && (o[i] = !0)
                }
                for (var a = 0; a < e.length; a++) {
                    var s = e[a];
                    null != s[0] && o[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(".concat(s[2], ") and (").concat(n, ")")),
                    t.push(s))
                }
            }
            ,
            t
        }
    }
    , function(e, t, n) {
        "use strict";
        var o, r = {}, i = function() {
            return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)),
            o
        }, a = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var n = document.querySelector(t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                        try {
                            n = n.contentDocument.head
                        } catch (e) {
                            n = null
                        }
                    e[t] = n
                }
                return e[t]
            }
        }();
        function s(e, t) {
            for (var n = [], o = {}, r = 0; r < e.length; r++) {
                var i = e[r]
                  , a = t.base ? i[0] + t.base : i[0]
                  , s = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                };
                o[a] ? o[a].parts.push(s) : n.push(o[a] = {
                    id: a,
                    parts: [s]
                })
            }
            return n
        }
        function l(e, t) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n]
                  , i = r[o.id]
                  , a = 0;
                if (i) {
                    for (i.refs++; a < i.parts.length; a++)
                        i.parts[a](o.parts[a]);
                    for (; a < o.parts.length; a++)
                        i.parts.push(v(o.parts[a], t))
                } else {
                    for (var s = []; a < o.parts.length; a++)
                        s.push(v(o.parts[a], t));
                    r[o.id] = {
                        id: o.id,
                        refs: 1,
                        parts: s
                    }
                }
            }
        }
        function c(e) {
            var t = document.createElement("style");
            if (void 0 === e.attributes.nonce) {
                var o = n.nc;
                o && (e.attributes.nonce = o)
            }
            if (Object.keys(e.attributes).forEach((function(n) {
                t.setAttribute(n, e.attributes[n])
            }
            )),
            "function" == typeof e.insert)
                e.insert(t);
            else {
                var r = a(e.insert || "head");
                if (!r)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                r.appendChild(t)
            }
            return t
        }
        var u, f = (u = [],
        function(e, t) {
            return u[e] = t,
            u.filter(Boolean).join("\n")
        }
        );
        function d(e, t, n, o) {
            var r = n ? "" : o.css;
            if (e.styleSheet)
                e.styleSheet.cssText = f(t, r);
            else {
                var i = document.createTextNode(r)
                  , a = e.childNodes;
                a[t] && e.removeChild(a[t]),
                a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }
        function p(e, t, n) {
            var o = n.css
              , r = n.media
              , i = n.sourceMap;
            if (r && e.setAttribute("media", r),
            i && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")),
            e.styleSheet)
                e.styleSheet.cssText = o;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }
        var h = null
          , b = 0;
        function v(e, t) {
            var n, o, r;
            if (t.singleton) {
                var i = b++;
                n = h || (h = c(t)),
                o = d.bind(null, n, i, !1),
                r = d.bind(null, n, i, !0)
            } else
                n = c(t),
                o = p.bind(null, n, t),
                r = function() {
                    !function(e) {
                        if (null === e.parentNode)
                            return !1;
                        e.parentNode.removeChild(e)
                    }(n)
                }
                ;
            return o(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                        return;
                    o(e = t)
                } else
                    r()
            }
        }
        e.exports = function(e, t) {
            (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {},
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = i());
            var n = s(e, t);
            return l(n, t),
            function(e) {
                for (var o = [], i = 0; i < n.length; i++) {
                    var a = n[i]
                      , c = r[a.id];
                    c && (c.refs--,
                    o.push(c))
                }
                e && l(s(e, t), t);
                for (var u = 0; u < o.length; u++) {
                    var f = o[u];
                    if (0 === f.refs) {
                        for (var d = 0; d < f.parts.length; d++)
                            f.parts[d]();
                        delete r[f.id]
                    }
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(8)
          , r = n(9);
        t.default = function(e) {
            return {
                title: {
                    default: "OpenVPN / IPsec Configuration",
                    localized: "openvpn-ipsec-page-title"
                },
                note: {
                    default: 'Changes will take effect after the next controller reboot.\n\nThe certificate handling is performed via the "Certificates" page.',
                    localized: "openvpn-ipsec-note-text"
                },
                content: [{
                    title: {
                        default: "OpenVPN",
                        localized: "title-openvpn-configuration"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Current State",
                                localized: "openvpn-runtime-state-label"
                            },
                            control: {
                                type: "textfield"
                            },
                            parameter: "openvpn.runtimestate"
                        }, {
                            title: {
                                default: "OpenVPN enabled",
                                localized: "openvpn-state-label"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "openvpn.state"
                        }]
                    }, new o.UploadForm(e,"openvpnconf"), new r.DownloadForm(e,"openvpnconf")]
                }, {
                    title: {
                        default: "IPsec",
                        localized: "title-ipsec-configuration"
                    },
                    sections: [{
                        fields: [{
                            title: {
                                default: "Current State",
                                localized: "ipsec-runtime-state-label"
                            },
                            control: {
                                type: "textfield"
                            },
                            parameter: "ipsec.runtimestate"
                        }, {
                            title: {
                                default: "IPsec enabled",
                                localized: "ipsec-state-label"
                            },
                            control: {
                                type: "checkbox"
                            },
                            parameter: "ipsec.state"
                        }]
                    }, new o.UploadForm(e,"ipsecconf"), new r.DownloadForm(e,"ipsecconf"), new o.UploadForm(e,"ipsecsecrets")]
                }]
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var o, r = this && this.__extends || (o = Object.setPrototypeOf || {
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
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, o) {
            return new (n || (n = Promise))((function(r, i) {
                function a(e) {
                    try {
                        l(o.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(o.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var n, o, r, i, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                                o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o),
                                0) : o.next) && !(r = r.call(o, i[1])).done)
                                    return r;
                                switch (o = 0,
                                r && (i = [2 & i[0], r.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    r = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    o = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = i;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                o = 0
                            } finally {
                                n = r = 0
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
        var s = function(e) {
            function t(t, n) {
                var o = e.call(this, t) || this;
                return o.view = document.createElement("wbm-certificates-upload-form"),
                o.name = n,
                o
            }
            return r(t, e),
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n, o, r = this;
                    return a(this, (function(i) {
                        return e = {
                            openvpnconf: "openvpn.conf",
                            ipsecconf: "ipsec.conf",
                            ipsecsecrets: "ipsec.secrets"
                        },
                        this.view.innerHTML = '        \n            <div class="section titled-section" >\n                <span class="title" taid="section-title-' + this.name + '-upload">' + e[this.name] + '</span>\n                <div class="section-body">\n                    <div class="field" taid="field-' + this.name + '-upload-label" >\n                        <div class="control">\n                            <label class="file-input" data-placeholder="Choose file..." data-filename=""><input type="file" taid="field-control"></label>\n                        </div>\n                        <button taid="action-' + this.name + '-upload" class="action" disabled="disabled">Upload</button>\n                    </div>\n                </div>\n            </div>\n        ',
                        (t = this.view.querySelector("button")).addEventListener("click", (function() {
                            return r.uploadButtonPressed()
                        }
                        )),
                        n = this.view.querySelector("input"),
                        o = this.view.querySelector("label.file-input"),
                        n.addEventListener("change", (function() {
                            var e = n.files && n.files.length && n.files[0].name || "";
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
                return i(this, void 0, void 0, (function() {
                    var e, t, n, o, r, i;
                    return a(this, (function(a) {
                        switch (a.label) {
                        case 0:
                            (e = this.view.querySelector("div.section")).classList.add("submitting"),
                            t = this.view.querySelector("input"),
                            n = t.files[0],
                            a.label = 1;
                        case 1:
                            return a.trys.push([1, 3, , 4]),
                            [4, this.base.transfer.upload([n], "/tmp/vpncfg")];
                        case 2:
                            return a.sent(),
                            [3, 4];
                        case 3:
                            return o = a.sent(),
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
                            return a.trys.push([4, 6, , 7]),
                            [4, this.base.parameter.execute("certificates.store" + this.name, {
                                filename: n.name
                            })];
                        case 5:
                            if ((r = a.sent()).error)
                                throw r.error;
                            return [3, 7];
                        case 6:
                            return i = a.sent(),
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
                                detailMessage: i.message
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
        }(n(0).ViewController);
        t.UploadForm = s
    }
    , function(e, t, n) {
        "use strict";
        var o, r = this && this.__extends || (o = Object.setPrototypeOf || {
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
            o(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), i = this && this.__awaiter || function(e, t, n, o) {
            return new (n || (n = Promise))((function(r, i) {
                function a(e) {
                    try {
                        l(o.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        l(o.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    e.done ? r(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, s)
                }
                l((o = o.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var n, o, r, i, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
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
                                o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o),
                                0) : o.next) && !(r = r.call(o, i[1])).done)
                                    return r;
                                switch (o = 0,
                                r && (i = [2 & i[0], r.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    r = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    o = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = i;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                o = 0
                            } finally {
                                n = r = 0
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
        var s = function(e) {
            function t(t, n) {
                var o = e.call(this, t) || this;
                return o.uploadDirectory = "/tmp/vpncfg-out/",
                o.uploadFilepath = {
                    openvpnconf: o.uploadDirectory + "openvpn.conf",
                    ipsecconf: o.uploadDirectory + "ipsec.conf"
                },
                o.view = document.createElement("wbm-certificates-download-form"),
                o.name = n,
                o
            }
            return r(t, e),
            t.prototype.load = function() {
                return i(this, void 0, void 0, (function() {
                    var e = this;
                    return a(this, (function(t) {
                        return this.view.innerHTML = '        \n            <div class="section">\n                <div class="section-body">\n                    <div class="field" taid="field-' + this.name + '-download-label" >\n                        <label taid="field-title"></label>\n                        <div class="control"></div>\n                        <button taid="action-' + this.name + '-upload" class="action" >Download</button>\n                    </div>\n                </div>\n            </div>\n        ',
                        this.view.querySelector("button").addEventListener("click", (function() {
                            return e.downloadButtonPressed()
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.downloadButtonPressed = function() {
                return i(this, void 0, void 0, (function() {
                    var e, t, n, o;
                    return a(this, (function(r) {
                        switch (r.label) {
                        case 0:
                            (e = this.view.querySelector("div.section")).classList.add("submitting"),
                            r.label = 1;
                        case 1:
                            return r.trys.push([1, 3, , 4]),
                            [4, this.base.parameter.execute("certificates.copy" + this.name, {})];
                        case 2:
                            if ((t = r.sent()).error)
                                throw t.error;
                            return [3, 4];
                        case 3:
                            return n = r.sent(),
                            e.classList.remove("submitting"),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-copy-failed-error-modal-title",
                                    fallback: "Error while download"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-copy-failed-error-modal-message",
                                    fallback: "Could not copy file"
                                }),
                                detailMessage: n.message
                            })];
                        case 4:
                            return r.trys.push([4, 6, , 7]),
                            [4, this.base.transfer.download(this.uploadFilepath[this.name])];
                        case 5:
                            return r.sent(),
                            [3, 7];
                        case 6:
                            return o = r.sent(),
                            e.classList.remove("submitting"),
                            [2, this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: this.name + "-download-failed-error-modal-title",
                                    fallback: "Download failed"
                                }),
                                message: this.base.localization.localized({
                                    key: this.name + "-download-failed-error-modal-message",
                                    fallback: "Could not download file"
                                }),
                                detailMessage: o.message
                            })];
                        case 7:
                            return e.classList.remove("submitting"),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t
        }(n(0).ViewController);
        t.DownloadForm = s
    }
    ])
}
));
//# sourceMappingURL=openvpn-ipsec.js.map
