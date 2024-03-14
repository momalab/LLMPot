/*!
 * @wago/wbm-pfc@2.11.0
 *
 * Copyright Â© 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 * License:
 *   WAGO Software License Agreement
 *
 * Contributors:
 *   Johann DÃ¼ck <johann.dueck@wago.com>
 *   Marius Hellmeier <marius.hellmeier@wago.com>
 *   Stefanie MeihÃ¶fer <stefanie.meihoefer@wago.com>
 *
 * Description:
 *   This is the platform specific WBM implementation for Linux-based devices with a PHP/Configtool backend
 *
 *
 */
!function (e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var n = t();
        for (var o in n) ("object" == typeof exports ? exports : e)[o] = n[o]
    }
}(window, (function () {
    return function (e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var i = t[o] = {i: o, l: !1, exports: {}};
            return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) {
                return e[t]
            }.bind(null, i));
            return o
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 11)
    }([function (e, t, n) {
        "use strict";
        var o,
            i = this && this.__extends || (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            });
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function (e) {
            function t(t, n) {
                // var o = e.call(this, n) || this;
                var o = this;
                return o.statusCode = t, o
            }

            return i(t, e), t
        }(Error);
        t.StatusError = r
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function () {
            function e() {
                this.cache = {}, this.subscriptions = {}
            }

            return Object.defineProperty(e.prototype, "keys", {
                get: function () {
                    return Object.keys(this.cache)
                }, enumerable: !0, configurable: !0
            }), e.prototype.set = function (e, t) {
                var n = this, o = JSON.stringify(t);
                this.subscriptions.change && this.subscriptions.change.length > 0 && this.cache[e] !== o && this.subscriptions.change.forEach((function (o) {
                    return o(e, t, n.get(e))
                })), this.cache[e] = o
            }, e.prototype.unset = function (e) {
                delete this.cache[e]
            }, e.prototype.get = function (e) {
                if (this.has(e)) return JSON.parse(this.cache[e])
            }, e.prototype.has = function (e) {
                return void 0 !== this.cache[e]
            }, e.prototype.subscribe = function (e, t) {
                (this.subscriptions[e] || (this.subscriptions[e] = [])).push(t)
            }, e.prototype.clear = function () {
                for (var e in this.cache) this.unset(e)
            }, e.prototype.merged = function (t) {
                for (var n = new e, o = 0, i = this.keys; o < i.length; o++) {
                    var r = i[o];
                    n.cache[r] = this.cache[r]
                }
                for (var a = 0, s = t.keys; a < s.length; a++) {
                    r = s[a];
                    n.cache[r] = t.cache[r]
                }
                return n
            }, e
        }();
        t.Cache = o
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o, i, r = n(0);
        !function (e) {
            e.bestPossible = 1e4, e.invalid = -1
        }(o = t.Score || (t.Score = {})), function (e) {
            e[e.load = 0] = "load", e[e.save = 1] = "save", e[e.method = 2] = "method"
        }(i = t.MappingType || (t.MappingType = {}));
        var a = function () {
            function e() {
            }

            return e.getLoadMappingForIds = function (e, t, n) {
                var o = this.getAllMappingsFromCache(e, t, i.load);
                return this.getResolvedMapping(e, o, n, i.load)
            }, e.getSaveMappingForIds = function (e, t, n) {
                var o = this.getAllMappingsFromCache(e, t, i.save);
                return this.getResolvedMapping(e, o, n, i.save)
            }, e.getCallMappingForIds = function (e, t, n) {
                var o = this.getAllMappingsFromCache(e, t, i.method);
                return this.getResolvedMapping(e, o, n, i.method)
            }, e.getNumericComponentFromIds = function (e) {
                return e.reduce((function (e, t) {
                    var n = t.match(/\.[0-9]+/);
                    return null !== n && void 0 !== n.index && n.index >= 0 && (e[t] = parseInt(t.substr(n.index + 1), 10)), e
                }), {})
            }, e.replacePlaceholdersInMappingWithIndex = function (e, t) {
                if (e.reads && (e.reads = e.reads.map((function (e) {
                    return e.replace(/\*/, "" + t)
                }))), e.writes && (e.writes = e.writes.map((function (e) {
                    return e.replace(/\*/, "" + t)
                })), e.mapping)) for (var n in e.mapping) {
                    var o = n.replace(/\*/, "" + t);
                    e.mapping[o] = e.mapping[n], delete e.mapping[n]
                }
                if (e.constants) for (var i in e.constants) {
                    var r = e.constants[i];
                    e.constants[i] = r.replace(/\*/, "" + t)
                }
            }, e.resolvePlaceholderInMapping = function (e, t) {
                var n = this, o = this.getNumericComponentFromIds(e);
                return e.reduce((function (e, i) {
                    var r = t[i];
                    if (r instanceof Error) e[i] = r; else {
                        for (var a = JSON.parse(JSON.stringify(r)), s = 0, c = a; s < c.length; s++) {
                            var l = c[s];
                            void 0 !== o[i] && n.replacePlaceholdersInMappingWithIndex(l, o[i])
                        }
                        e[i] = a
                    }
                    return e
                }), {})
            }, e.getAllMappingsFromCache = function (e, t, n) {
                var o = this.getCacheKeysForIds(e);
                return e.reduce((function (e, a) {
                    var s = o[a];
                    if (t.has(s)) {
                        var c = t.get(s);
                        e[a] = c.filter((function (e) {
                            return n === i.load ? void 0 !== e.reads : n === i.save ? void 0 !== e.writes : n === i.method && void 0 !== e.executes
                        }))
                    } else n === i.load && (e[a] = new r.StatusError(821, a)), n === i.save && (e[a] = new r.StatusError(823, a)), n === i.method && (e[a] = new r.StatusError(825, a));
                    return e
                }), {})
            }, e.getCacheKeysForIds = function (e) {
                return e.reduce((function (e, t) {
                    var n = t.replace(/\.[0-9]+/, ".*");
                    return e[t] = n, e
                }), {})
            }, e.getResolvedMapping = function (e, t, n, o) {
                var i = this.resolvePlaceholderInMapping(e, t);
                return this.findBestMapping(e, i, n, o)
            }, e.findBestMapping = function (e, t, n, a) {
                var s = this.getMappingScores(e, t, n, a);
                return e.reduce((function (e, n) {
                    var c = t[n], l = s[n];
                    if (c instanceof Error) e[n] = c; else if (l instanceof Error) e[n] = l; else if (c.length > 0) {
                        var u = 0, f = o.invalid;
                        l.some((function (e, t) {
                            return e > f && (f = e, u = t, e === o.bestPossible)
                        })), f === o.invalid && (a === i.load && (e[n] = new r.StatusError(822, n)), a === i.save && (e[n] = new r.StatusError(824, n)), a === i.method && (e[n] = new r.StatusError(826, n))), e[n] = c[u]
                    }
                    return e
                }), {})
            }, e.getMappingScores = function (e, t, n, o) {
                var i = this.getNumberOfConstantsNotInCache(e, t, n);
                return this.calculateScoreForMappings(e, t, i, o)
            }, e.getNumberOfConstantsNotInCache = function (e, t, n) {
                return e.reduce((function (e, o) {
                    var i = t[o];
                    if (i instanceof Error) e[o] = i; else if (i.length > 0) {
                        for (var r = [], a = function (e) {
                            if (e.constants) {
                                var t = Object.keys(e.constants).reduce((function (t, o) {
                                    var i = e.constants[o].replace(/\*/, "0");
                                    return n.has(i) || (t += 1), t
                                }), 0);
                                r.push(t)
                            } else r.push(0)
                        }, s = 0, c = i; s < c.length; s++) {
                            a(c[s])
                        }
                        e[o] = r
                    }
                    return e
                }), {})
            }, e.getLoadMappingScore = function (e, t, n) {
                var i = o.bestPossible - e.length;
                return t.reads.forEach((function (t) {
                    e.indexOf(t) >= 0 ? i += 1 : i -= 1
                })), i /= n + 1
            }, e.getSaveMappingScore = function (e, t, n) {
                return o.bestPossible
            }, e.getMethodMappingScore = function (e, t, n) {
                return o.bestPossible
            }, e.calculateScoreForMappings = function (e, t, n, o) {
                var r = this;
                return e.reduce((function (a, s) {
                    var c = t[s], l = n[s];
                    return c instanceof Error ? a[s] = c : l instanceof Error ? a[s] = l : c.length > 0 && (o === i.load ? a[s] = c.map((function (t, n) {
                        return r.getLoadMappingScore(e, t, l[n])
                    })) : o === i.method ? a[s] = c.map((function (t, n) {
                        return r.getMethodMappingScore(e, t, l[n])
                    })) : a[s] = c.map((function (t, n) {
                        return r.getSaveMappingScore(e, t, l[n])
                    }))), a
                }), {})
            }, e
        }();
        t.PfcMappingLoader = a
    }, function (e, t, n) {
        /*!
 * @wago/wbm-core@3.0.0
 *
 * Copyright Â© 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 * License:
 *   WAGO Software License Agreement
 *
 * Contributors:
 *   Johann DÃ¼ck <johann.dueck@wago.com>
 *   Marius Hellmeier <marius.hellmeier@wago.com>
 *   Stefanie MeihÃ¶fer <stefanie.meihoefer@wago.com>
 *
 * Description:
 *   This is the Core component of WBM
 *
 *
 */
        window, e.exports = function (e) {
            var t = {};

            function n(o) {
                if (t[o]) return t[o].exports;
                var i = t[o] = {i: o, l: !1, exports: {}};
                return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
            }

            return n.m = e, n.c = t, n.d = function (e, t, o) {
                n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
            }, n.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
            }, n.t = function (e, t) {
                if (1 & t && (e = n(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var o = Object.create(null);
                if (n.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) {
                    return e[t]
                }.bind(null, i));
                return o
            }, n.n = function (e) {
                var t = e && e.__esModule ? function () {
                    return e.default
                } : function () {
                    return e
                };
                return n.d(t, "a", t), t
            }, n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, n.p = "", n(n.s = 25)
        }([function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = function () {
                function e(e) {
                    this.base = e
                }

                return e.prototype.onRouteChange = function (e) {
                }, e.prototype.unload = function () {
                }, e
            }();
            t.ViewController = o
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(0), c = n(60), l = n(5), u = function (e) {
                function t(t, n, o, i) {
                    void 0 === o && (o = void 0), void 0 === i && (i = "div");
                    var r = e.call(this, t) || this;
                    return r.isHidden = !1, r.isDisabled = !1, r.parameterService = t.parameter, r.localizationService = t.localization, r.view = document.createElement(i), o && r.view.setAttribute("taid", o), r.hidden = n.hidden, c.isDisableableViewDescription(n) && (r.disabled = n.disabled), r
                }

                return i(t, e), t.prototype.shouldLoad = function () {
                    var e = this;
                    return this.hidden ? l.evaluateBoolExpression(this.base, this.hidden).then((function (t) {
                        return e.view.style.display = t ? "none" : "", e.isHidden = t, !t
                    })) : (this.view.style.display = "", this.isHidden = !1, !0)
                }, t.prototype.shouldEnable = function () {
                    var e = this;
                    return this.disabled ? l.evaluateBoolExpression(this.base, this.disabled).then((function (t) {
                        return e.isDisabled = t, !t
                    })) : (this.isDisabled = !1, !0)
                }, t.prototype.findOrCreateChildElement = function (e, t) {
                    var n = this.view.querySelector(e);
                    if (!n) {
                        var o = e.split("."), i = o[0], r = o.slice(1);
                        n = document.createElement(i), r.forEach((function (e) {
                            n.classList.add(e)
                        })), t ? this.view.insertBefore(n, t) : this.view.appendChild(n)
                    }
                    return n
                }, t.prototype.isTemplateString = function (e) {
                    return /\${[^{}]*}/.test(e)
                }, t.prototype.resolveTemplateString = function (e) {
                    return r(this, void 0, void 0, (function () {
                        var t, n, o, i = this;
                        return a(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return t = /\${[^{}]*}/g, null === (n = e.match(t)) ? [3, 2] : (o = e, [4, Promise.all(n.map((function (e) {
                                        return r(i, void 0, void 0, (function () {
                                            var t, n;
                                            return a(this, (function (i) {
                                                switch (i.label) {
                                                    case 0:
                                                        t = e.substr(2, e.length - 3), i.label = 1;
                                                    case 1:
                                                        return i.trys.push([1, 3, , 4]), [4, this.parameterService.read(t)];
                                                    case 2:
                                                        return (n = i.sent()[0]).error || (o = o.replace(e, "" + n.value)), [3, 4];
                                                    case 3:
                                                        return i.sent(), [3, 4];
                                                    case 4:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    })))]);
                                case 1:
                                    return s.sent(), [2, o];
                                case 2:
                                    return [2, e]
                            }
                        }))
                    }))
                }, t.prototype.resolveTextContent = function (e, t) {
                    return this.isTemplateString(t) ? this.resolveTemplateString(t).then((function (t) {
                        return e.textContent = t, e
                    })) : (e.textContent = t, e)
                }, t.prototype.rebuildTitle = function (e, t, n) {
                    void 0 === n && (n = "span.title");
                    var o = this.findOrCreateChildElement(n, this.view.firstChild);
                    return o.setAttribute("taid", t), this.resolveTextContent(o, e)
                }, t.prototype.rebuildNote = function (e, t, n, o) {
                    void 0 === n && (n = "p.note"), void 0 === o && (o = "span.title");
                    var i = this.view.querySelector(o), r = this.findOrCreateChildElement(n, i && i.nextSibling);
                    return r.setAttribute("taid", t), this.resolveTextContent(r, e)
                }, t.prototype.rebuildBody = function (e, t) {
                    void 0 === t && (t = "div.body");
                    var n = this.findOrCreateChildElement(t);
                    if (!n.children.length) for (var o = 0, i = e; o < i.length; o++) {
                        var r = i[o];
                        n.appendChild(r)
                    }
                    return n
                }, t
            }(s.ViewController);
            t.GenericViewController = u
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e) {
                var t = [];
                return t.toString = function () {
                    return this.map((function (t) {
                        var n = function (e, t) {
                            var n, o, i, r = e[1] || "", a = e[3];
                            if (!a) return r;
                            if (t && "function" == typeof btoa) {
                                var s = (n = a, o = btoa(unescape(encodeURIComponent(JSON.stringify(n)))), i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o), "/*# ".concat(i, " */")),
                                    c = a.sources.map((function (e) {
                                        return "/*# sourceURL=".concat(a.sourceRoot).concat(e, " */")
                                    }));
                                return [r].concat(c).concat([s]).join("\n")
                            }
                            return [r].join("\n")
                        }(t, e);
                        return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
                    })).join("")
                }, t.i = function (e, n) {
                    "string" == typeof e && (e = [[null, e, ""]]);
                    for (var o = {}, i = 0; i < this.length; i++) {
                        var r = this[i][0];
                        null != r && (o[r] = !0)
                    }
                    for (var a = 0; a < e.length; a++) {
                        var s = e[a];
                        null != s[0] && o[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(".concat(s[2], ") and (").concat(n, ")")), t.push(s))
                    }
                }, t
            }
        }, function (e, t, n) {
            "use strict";
            var o, i = {}, r = function () {
                var e = {};
                return function (t) {
                    if (void 0 === e[t]) {
                        var n = document.querySelector(t);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                            n = n.contentDocument.head
                        } catch (e) {
                            n = null
                        }
                        e[t] = n
                    }
                    return e[t]
                }
            }();

            function a(e, t) {
                for (var n = [], o = {}, i = 0; i < e.length; i++) {
                    var r = e[i], a = t.base ? r[0] + t.base : r[0], s = {css: r[1], media: r[2], sourceMap: r[3]};
                    o[a] ? o[a].parts.push(s) : n.push(o[a] = {id: a, parts: [s]})
                }
                return n
            }

            function s(e, t) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n], r = i[o.id], a = 0;
                    if (r) {
                        for (r.refs++; a < r.parts.length; a++) r.parts[a](o.parts[a]);
                        for (; a < o.parts.length; a++) r.parts.push(v(o.parts[a], t))
                    } else {
                        for (var s = []; a < o.parts.length; a++) s.push(v(o.parts[a], t));
                        i[o.id] = {id: o.id, refs: 1, parts: s}
                    }
                }
            }

            function c(e) {
                var t = document.createElement("style");
                if (void 0 === e.attributes.nonce) {
                    var o = n.nc;
                    o && (e.attributes.nonce = o)
                }
                if (Object.keys(e.attributes).forEach((function (n) {
                    t.setAttribute(n, e.attributes[n])
                })), "function" == typeof e.insert) e.insert(t); else {
                    var i = r(e.insert || "head");
                    if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    i.appendChild(t)
                }
                return t
            }

            var l, u = (l = [], function (e, t) {
                return l[e] = t, l.filter(Boolean).join("\n")
            });

            function f(e, t, n, o) {
                var i = n ? "" : o.css;
                if (e.styleSheet) e.styleSheet.cssText = u(t, i); else {
                    var r = document.createTextNode(i), a = e.childNodes;
                    a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r)
                }
            }

            function d(e, t, n) {
                var o = n.css, i = n.media, r = n.sourceMap;
                if (i && e.setAttribute("media", i), r && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), e.styleSheet) e.styleSheet.cssText = o; else {
                    for (; e.firstChild;) e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(o))
                }
            }

            var p = null, h = 0;

            function v(e, t) {
                var n, o, i;
                if (t.singleton) {
                    var r = h++;
                    n = p || (p = c(t)), o = f.bind(null, n, r, !1), i = f.bind(null, n, r, !0)
                } else n = c(t), o = d.bind(null, n, t), i = function () {
                    !function (e) {
                        if (null === e.parentNode) return !1;
                        e.parentNode.removeChild(e)
                    }(n)
                };
                return o(e), function (t) {
                    if (t) {
                        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                        o(e = t)
                    } else i()
                }
            }

            e.exports = function (e, t) {
                (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = (void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o));
                var n = a(e, t);
                return s(n, t), function (e) {
                    for (var o = [], r = 0; r < n.length; r++) {
                        var c = n[r], l = i[c.id];
                        l && (l.refs--, o.push(l))
                    }
                    e && s(a(e, t), t);
                    for (var u = 0; u < o.length; u++) {
                        var f = o[u];
                        if (0 === f.refs) {
                            for (var d = 0; d < f.parts.length; d++) f.parts[d]();
                            delete i[f.id]
                        }
                    }
                }
            }
        }, function (e, t, n) {
            "use strict";
            var o = this && this.__assign || function () {
                return (o = Object.assign || function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }).apply(this, arguments)
            }, i = this && this.__spreadArrays || function () {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                var o = Array(e), i = 0;
                for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                return o
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var r = n(69), a = function e(t) {
                var n = this;
                for (var a in this.wrappedStoredLog = function (e, t, o) {
                    for (var r, a, s = [], c = 3; c < arguments.length; c++) s[c - 3] = arguments[c];
                    t && (console[e] ? (r = console)[e].apply(r, i([o], s)) : console.log.apply(console, i([o], s))), (a = n.database).addEntry.apply(a, i([new Date, e, o], s))
                }, t = t || {}, this.config = Object.freeze(o(o(o({}, e.defaultConfig), t), {
                    console: Object.freeze(o(o({}, e.defaultConfig.console), t.console)),
                    persistent: Object.freeze(o(o({}, e.defaultConfig.persistent), t.persistent))
                })), Object.defineProperty(this, "config", {writable: !1}), this.config.console) this.config.persistent[a] ? this[a] = this.wrappedStoredLog.bind(this, a, this.config.console[a]) : this.config.console[a] ? console[a] ? this[a] = console[a].bind(console) : this[a] = console.log.bind(console) : this[a] = function () {
                };
                this.database = new r.LogDatabase("WBM Log")
            };
            t.Logger = a, function (e) {
                e.defaultConfig = {
                    console: {log: !0, info: !0, debug: !0, warn: !0, error: !0},
                    persistent: {log: !1, info: !1, debug: !1, warn: !1, error: !1}
                }
            }(a = t.Logger || (t.Logger = {})), t.Logger = a, t.default = new a
        }, function (e, t, n) {
            "use strict";
            var o = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, i = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.resolveDynamicsInTemplate = function (e, t) {
                var n = e.match(/\${[^{}]*}/g);
                if (null !== n) {
                    for (var o = e, i = 0, r = n; i < r.length; i++) {
                        var a = r[i], s = this.resolveDynamicsInString(a, t);
                        o = o.replace(a, s)
                    }
                    return o
                }
                return e
            }, t.resolveDynamicsInString = function (e, t) {
                return e.replace(/\*/g, "" + t)
            }, t.evaluateBoolExpression = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n, o, r, a;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return n = function (e) {
                                    if (/ is not /.test(e)) {
                                        var t = e.split(" is not ");
                                        return {
                                            parameter: t[0], value: t[1], operation: function (e, t) {
                                                return e !== t
                                            }
                                        }
                                    }
                                    if (/ is /.test(e)) {
                                        var n = e.split(" is ");
                                        return {
                                            parameter: n[0], value: n[1], operation: function (e, t) {
                                                return e === t
                                            }
                                        }
                                    }
                                    if (/ contains not /.test(e)) {
                                        var o = e.split(" contains not ");
                                        return {
                                            parameter: o[0], value: o[1], operation: function (e, t) {
                                                return e.indexOf(t) < 0
                                            }
                                        }
                                    }
                                    if (/ contains /.test(e)) {
                                        var i = e.split(" contains ");
                                        return {
                                            parameter: i[0], value: i[1], operation: function (e, t) {
                                                return e.indexOf(t) >= 0
                                            }
                                        }
                                    }
                                    throw new Error("invalid boolean expression")
                                }(t), [4, e.parameter.read(n.parameter)];
                            case 1:
                                if (r = i.sent(), /\*/.test(n.parameter)) o = r.filter((function (e) {
                                    return void 0 === e.error
                                })).map((function (e) {
                                    return "" + e.value
                                })); else {
                                    if ((a = r[0]).error) throw a.error;
                                    o = "" + a.value
                                }
                                return [2, n.operation(o, n.value)]
                        }
                    }))
                }))
            }
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            });
            Object.defineProperty(t, "__esModule", {value: !0});
            var r, a = n(1);
            !function (e) {
                e.textfield = "textfield", e.checkbox = "checkbox", e.dropdown = "dropdown"
            }(r = t.ControlType || (t.ControlType = {}));
            var s = function (e) {
                function t(t, n) {
                    var o = e.call(this, t, n) || this;
                    if ("string" != typeof n.type) throw new Error("title is required");
                    return o.view.classList.add("control"), o.type = n.type && r[n.type], o
                }

                return i(t, e), t.prototype.onChange = function (e) {
                    this.onValueChangeHandler = e
                }, t.prototype.onValidationChange = function (e) {
                    this.onValidationChangeHandler = e
                }, t
            }(a.GenericViewController);
            t.GenericControlViewController = s
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e, t) {
                return "string" != typeof (e = e.__esModule ? e.default : e) ? e : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)), /["'() \t\n]/.test(e) || t ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : e)
            }
        }, function (e, t, n) {
            var o;
            /*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
            !function (t, n) {
                "use strict";
                "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function (e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return n(e)
                } : n(t)
            }("undefined" != typeof window ? window : this, (function (n, i) {
                "use strict";
                var r = [], a = n.document, s = Object.getPrototypeOf, c = r.slice, l = r.concat, u = r.push,
                    f = r.indexOf, d = {}, p = d.toString, h = d.hasOwnProperty, v = h.toString, b = v.call(Object),
                    m = {}, y = function (e) {
                        return "function" == typeof e && "number" != typeof e.nodeType
                    }, g = function (e) {
                        return null != e && e === e.window
                    }, w = {type: !0, src: !0, noModule: !0};

                function x(e, t, n) {
                    var o, i = (t = t || a).createElement("script");
                    if (i.text = e, n) for (o in w) n[o] && (i[o] = n[o]);
                    t.head.appendChild(i).parentNode.removeChild(i)
                }

                function k(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[p.call(e)] || "object" : typeof e
                }

                var _ = function (e, t) {
                    return new _.fn.init(e, t)
                }, S = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

                function C(e) {
                    var t = !!e && "length" in e && e.length, n = k(e);
                    return !y(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                }

                _.fn = _.prototype = {
                    jquery: "3.3.1", constructor: _, length: 0, toArray: function () {
                        return c.call(this)
                    }, get: function (e) {
                        return null == e ? c.call(this) : e < 0 ? this[e + this.length] : this[e]
                    }, pushStack: function (e) {
                        var t = _.merge(this.constructor(), e);
                        return t.prevObject = this, t
                    }, each: function (e) {
                        return _.each(this, e)
                    }, map: function (e) {
                        return this.pushStack(_.map(this, (function (t, n) {
                            return e.call(t, n, t)
                        })))
                    }, slice: function () {
                        return this.pushStack(c.apply(this, arguments))
                    }, first: function () {
                        return this.eq(0)
                    }, last: function () {
                        return this.eq(-1)
                    }, eq: function (e) {
                        var t = this.length, n = +e + (e < 0 ? t : 0);
                        return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                    }, end: function () {
                        return this.prevObject || this.constructor()
                    }, push: u, sort: r.sort, splice: r.splice
                }, _.extend = _.fn.extend = function () {
                    var e, t, n, o, i, r, a = arguments[0] || {}, s = 1, c = arguments.length, l = !1;
                    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || y(a) || (a = {}), s === c && (a = this, s--); s < c; s++) if (null != (e = arguments[s])) for (t in e) n = a[t], a !== (o = e[t]) && (l && o && (_.isPlainObject(o) || (i = Array.isArray(o))) ? (i ? (i = !1, r = n && Array.isArray(n) ? n : []) : r = n && _.isPlainObject(n) ? n : {}, a[t] = _.extend(l, r, o)) : void 0 !== o && (a[t] = o));
                    return a
                }, _.extend({
                    expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                        throw new Error(e)
                    }, noop: function () {
                    }, isPlainObject: function (e) {
                        var t, n;
                        return !(!e || "[object Object]" !== p.call(e) || (t = s(e)) && ("function" != typeof (n = h.call(t, "constructor") && t.constructor) || v.call(n) !== b))
                    }, isEmptyObject: function (e) {
                        var t;
                        for (t in e) return !1;
                        return !0
                    }, globalEval: function (e) {
                        x(e)
                    }, each: function (e, t) {
                        var n, o = 0;
                        if (C(e)) for (n = e.length; o < n && !1 !== t.call(e[o], o, e[o]); o++) ; else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
                        return e
                    }, trim: function (e) {
                        return null == e ? "" : (e + "").replace(S, "")
                    }, makeArray: function (e, t) {
                        var n = t || [];
                        return null != e && (C(Object(e)) ? _.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n
                    }, inArray: function (e, t, n) {
                        return null == t ? -1 : f.call(t, e, n)
                    }, merge: function (e, t) {
                        for (var n = +t.length, o = 0, i = e.length; o < n; o++) e[i++] = t[o];
                        return e.length = i, e
                    }, grep: function (e, t, n) {
                        for (var o = [], i = 0, r = e.length, a = !n; i < r; i++) !t(e[i], i) !== a && o.push(e[i]);
                        return o
                    }, map: function (e, t, n) {
                        var o, i, r = 0, a = [];
                        if (C(e)) for (o = e.length; r < o; r++) null != (i = t(e[r], r, n)) && a.push(i); else for (r in e) null != (i = t(e[r], r, n)) && a.push(i);
                        return l.apply([], a)
                    }, guid: 1, support: m
                }), "function" == typeof Symbol && (_.fn[Symbol.iterator] = r[Symbol.iterator]), _.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function (e, t) {
                    d["[object " + t + "]"] = t.toLowerCase()
                }));
                var E =
                    /*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
                    function (e) {
                        var t, n, o, i, r, a, s, c, l, u, f, d, p, h, v, b, m, y, g, w = "sizzle" + 1 * new Date,
                            x = e.document, k = 0, _ = 0, S = ae(), C = ae(), E = ae(), P = function (e, t) {
                                return e === t && (f = !0), 0
                            }, T = {}.hasOwnProperty, O = [], j = O.pop, L = O.push, A = O.push, D = O.slice,
                            M = function (e, t) {
                                for (var n = 0, o = e.length; n < o; n++) if (e[n] === t) return n;
                                return -1
                            },
                            I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            z = "[\\x20\\t\\r\\n\\f]", B = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                            R = "\\[" + z + "*(" + B + ")(?:" + z + "*([*^$|!~]?=)" + z + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + z + "*\\]",
                            q = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
                            V = new RegExp(z + "+", "g"),
                            N = new RegExp("^" + z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + z + "+$", "g"),
                            F = new RegExp("^" + z + "*," + z + "*"),
                            H = new RegExp("^" + z + "*([>+~]|" + z + ")" + z + "*"),
                            U = new RegExp("=" + z + "*([^\\]'\"]*?)" + z + "*\\]", "g"), G = new RegExp(q),
                            W = new RegExp("^" + B + "$"), $ = {
                                ID: new RegExp("^#(" + B + ")"),
                                CLASS: new RegExp("^\\.(" + B + ")"),
                                TAG: new RegExp("^(" + B + "|[*])"),
                                ATTR: new RegExp("^" + R),
                                PSEUDO: new RegExp("^" + q),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + z + "*(even|odd|(([+-]|)(\\d*)n|)" + z + "*(?:([+-]|)" + z + "*(\\d+)|))" + z + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + I + ")$", "i"),
                                needsContext: new RegExp("^" + z + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + z + "*((?:-\\d)?\\d*)" + z + "*\\)|)(?=[^-]|$)", "i")
                            }, J = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/,
                            Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Q = /[+~]/,
                            Z = new RegExp("\\\\([\\da-f]{1,6}" + z + "?|(" + z + ")|.)", "ig"),
                            ee = function (e, t, n) {
                                var o = "0x" + t - 65536;
                                return o != o || n ? t : o < 0 ? String.fromCharCode(o + 65536) : String.fromCharCode(o >> 10 | 55296, 1023 & o | 56320)
                            }, te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ne = function (e, t) {
                                return t ? "\0" === e ? "ï¿½" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                            }, oe = function () {
                                d()
                            }, ie = ye((function (e) {
                                return !0 === e.disabled && ("form" in e || "label" in e)
                            }), {dir: "parentNode", next: "legend"});
                        try {
                            A.apply(O = D.call(x.childNodes), x.childNodes), O[x.childNodes.length].nodeType
                        } catch (e) {
                            A = {
                                apply: O.length ? function (e, t) {
                                    L.apply(e, D.call(t))
                                } : function (e, t) {
                                    for (var n = e.length, o = 0; e[n++] = t[o++];) ;
                                    e.length = n - 1
                                }
                            }
                        }

                        function re(e, t, o, i) {
                            var r, s, l, u, f, h, m, y = t && t.ownerDocument, k = t ? t.nodeType : 9;
                            if (o = o || [], "string" != typeof e || !e || 1 !== k && 9 !== k && 11 !== k) return o;
                            if (!i && ((t ? t.ownerDocument || t : x) !== p && d(t), t = t || p, v)) {
                                if (11 !== k && (f = Y.exec(e))) if (r = f[1]) {
                                    if (9 === k) {
                                        if (!(l = t.getElementById(r))) return o;
                                        if (l.id === r) return o.push(l), o
                                    } else if (y && (l = y.getElementById(r)) && g(t, l) && l.id === r) return o.push(l), o
                                } else {
                                    if (f[2]) return A.apply(o, t.getElementsByTagName(e)), o;
                                    if ((r = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return A.apply(o, t.getElementsByClassName(r)), o
                                }
                                if (n.qsa && !E[e + " "] && (!b || !b.test(e))) {
                                    if (1 !== k) y = t, m = e; else if ("object" !== t.nodeName.toLowerCase()) {
                                        for ((u = t.getAttribute("id")) ? u = u.replace(te, ne) : t.setAttribute("id", u = w), s = (h = a(e)).length; s--;) h[s] = "#" + u + " " + me(h[s]);
                                        m = h.join(","), y = Q.test(e) && ve(t.parentNode) || t
                                    }
                                    if (m) try {
                                        return A.apply(o, y.querySelectorAll(m)), o
                                    } catch (e) {
                                    } finally {
                                        u === w && t.removeAttribute("id")
                                    }
                                }
                            }
                            return c(e.replace(N, "$1"), t, o, i)
                        }

                        function ae() {
                            var e = [];
                            return function t(n, i) {
                                return e.push(n + " ") > o.cacheLength && delete t[e.shift()], t[n + " "] = i
                            }
                        }

                        function se(e) {
                            return e[w] = !0, e
                        }

                        function ce(e) {
                            var t = p.createElement("fieldset");
                            try {
                                return !!e(t)
                            } catch (e) {
                                return !1
                            } finally {
                                t.parentNode && t.parentNode.removeChild(t), t = null
                            }
                        }

                        function le(e, t) {
                            for (var n = e.split("|"), i = n.length; i--;) o.attrHandle[n[i]] = t
                        }

                        function ue(e, t) {
                            var n = t && e,
                                o = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                            if (o) return o;
                            if (n) for (; n = n.nextSibling;) if (n === t) return -1;
                            return e ? 1 : -1
                        }

                        function fe(e) {
                            return function (t) {
                                return "input" === t.nodeName.toLowerCase() && t.type === e
                            }
                        }

                        function de(e) {
                            return function (t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e
                            }
                        }

                        function pe(e) {
                            return function (t) {
                                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e
                            }
                        }

                        function he(e) {
                            return se((function (t) {
                                return t = +t, se((function (n, o) {
                                    for (var i, r = e([], n.length, t), a = r.length; a--;) n[i = r[a]] && (n[i] = !(o[i] = n[i]))
                                }))
                            }))
                        }

                        function ve(e) {
                            return e && void 0 !== e.getElementsByTagName && e
                        }

                        for (t in n = re.support = {}, r = re.isXML = function (e) {
                            var t = e && (e.ownerDocument || e).documentElement;
                            return !!t && "HTML" !== t.nodeName
                        }, d = re.setDocument = function (e) {
                            var t, i, a = e ? e.ownerDocument || e : x;
                            return a !== p && 9 === a.nodeType && a.documentElement ? (h = (p = a).documentElement, v = !r(p), x !== p && (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)), n.attributes = ce((function (e) {
                                return e.className = "i", !e.getAttribute("className")
                            })), n.getElementsByTagName = ce((function (e) {
                                return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                            })), n.getElementsByClassName = K.test(p.getElementsByClassName), n.getById = ce((function (e) {
                                return h.appendChild(e).id = w, !p.getElementsByName || !p.getElementsByName(w).length
                            })), n.getById ? (o.filter.ID = function (e) {
                                var t = e.replace(Z, ee);
                                return function (e) {
                                    return e.getAttribute("id") === t
                                }
                            }, o.find.ID = function (e, t) {
                                if (void 0 !== t.getElementById && v) {
                                    var n = t.getElementById(e);
                                    return n ? [n] : []
                                }
                            }) : (o.filter.ID = function (e) {
                                var t = e.replace(Z, ee);
                                return function (e) {
                                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                    return n && n.value === t
                                }
                            }, o.find.ID = function (e, t) {
                                if (void 0 !== t.getElementById && v) {
                                    var n, o, i, r = t.getElementById(e);
                                    if (r) {
                                        if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
                                        for (i = t.getElementsByName(e), o = 0; r = i[o++];) if ((n = r.getAttributeNode("id")) && n.value === e) return [r]
                                    }
                                    return []
                                }
                            }), o.find.TAG = n.getElementsByTagName ? function (e, t) {
                                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                            } : function (e, t) {
                                var n, o = [], i = 0, r = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; n = r[i++];) 1 === n.nodeType && o.push(n);
                                    return o
                                }
                                return r
                            }, o.find.CLASS = n.getElementsByClassName && function (e, t) {
                                if (void 0 !== t.getElementsByClassName && v) return t.getElementsByClassName(e)
                            }, m = [], b = [], (n.qsa = K.test(p.querySelectorAll)) && (ce((function (e) {
                                h.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && b.push("[*^$]=" + z + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || b.push("\\[" + z + "*(?:value|" + I + ")"), e.querySelectorAll("[id~=" + w + "-]").length || b.push("~="), e.querySelectorAll(":checked").length || b.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || b.push(".#.+[+~]")
                            })), ce((function (e) {
                                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var t = p.createElement("input");
                                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && b.push("name" + z + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && b.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && b.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), b.push(",.*:")
                            }))), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ce((function (e) {
                                n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), m.push("!=", q)
                            })), b = b.length && new RegExp(b.join("|")), m = m.length && new RegExp(m.join("|")), t = K.test(h.compareDocumentPosition), g = t || K.test(h.contains) ? function (e, t) {
                                var n = 9 === e.nodeType ? e.documentElement : e, o = t && t.parentNode;
                                return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)))
                            } : function (e, t) {
                                if (t) for (; t = t.parentNode;) if (t === e) return !0;
                                return !1
                            }, P = t ? function (e, t) {
                                if (e === t) return f = !0, 0;
                                var o = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                return o || (1 & (o = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === o ? e === p || e.ownerDocument === x && g(x, e) ? -1 : t === p || t.ownerDocument === x && g(x, t) ? 1 : u ? M(u, e) - M(u, t) : 0 : 4 & o ? -1 : 1)
                            } : function (e, t) {
                                if (e === t) return f = !0, 0;
                                var n, o = 0, i = e.parentNode, r = t.parentNode, a = [e], s = [t];
                                if (!i || !r) return e === p ? -1 : t === p ? 1 : i ? -1 : r ? 1 : u ? M(u, e) - M(u, t) : 0;
                                if (i === r) return ue(e, t);
                                for (n = e; n = n.parentNode;) a.unshift(n);
                                for (n = t; n = n.parentNode;) s.unshift(n);
                                for (; a[o] === s[o];) o++;
                                return o ? ue(a[o], s[o]) : a[o] === x ? -1 : s[o] === x ? 1 : 0
                            }, p) : p
                        }, re.matches = function (e, t) {
                            return re(e, null, null, t)
                        }, re.matchesSelector = function (e, t) {
                            if ((e.ownerDocument || e) !== p && d(e), t = t.replace(U, "='$1']"), n.matchesSelector && v && !E[t + " "] && (!m || !m.test(t)) && (!b || !b.test(t))) try {
                                var o = y.call(e, t);
                                if (o || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o
                            } catch (e) {
                            }
                            return re(t, p, null, [e]).length > 0
                        }, re.contains = function (e, t) {
                            return (e.ownerDocument || e) !== p && d(e), g(e, t)
                        }, re.attr = function (e, t) {
                            (e.ownerDocument || e) !== p && d(e);
                            var i = o.attrHandle[t.toLowerCase()],
                                r = i && T.call(o.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
                            return void 0 !== r ? r : n.attributes || !v ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                        }, re.escape = function (e) {
                            return (e + "").replace(te, ne)
                        }, re.error = function (e) {
                            throw new Error("Syntax error, unrecognized expression: " + e)
                        }, re.uniqueSort = function (e) {
                            var t, o = [], i = 0, r = 0;
                            if (f = !n.detectDuplicates, u = !n.sortStable && e.slice(0), e.sort(P), f) {
                                for (; t = e[r++];) t === e[r] && (i = o.push(r));
                                for (; i--;) e.splice(o[i], 1)
                            }
                            return u = null, e
                        }, i = re.getText = function (e) {
                            var t, n = "", o = 0, r = e.nodeType;
                            if (r) {
                                if (1 === r || 9 === r || 11 === r) {
                                    if ("string" == typeof e.textContent) return e.textContent;
                                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                                } else if (3 === r || 4 === r) return e.nodeValue
                            } else for (; t = e[o++];) n += i(t);
                            return n
                        }, (o = re.selectors = {
                            cacheLength: 50,
                            createPseudo: se,
                            match: $,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {dir: "parentNode", first: !0},
                                " ": {dir: "parentNode"},
                                "+": {dir: "previousSibling", first: !0},
                                "~": {dir: "previousSibling"}
                            },
                            preFilter: {
                                ATTR: function (e) {
                                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                }, CHILD: function (e) {
                                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || re.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && re.error(e[0]), e
                                }, PSEUDO: function (e) {
                                    var t, n = !e[6] && e[2];
                                    return $.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && G.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function (e) {
                                    var t = e.replace(Z, ee).toLowerCase();
                                    return "*" === e ? function () {
                                        return !0
                                    } : function (e) {
                                        return e.nodeName && e.nodeName.toLowerCase() === t
                                    }
                                }, CLASS: function (e) {
                                    var t = S[e + " "];
                                    return t || (t = new RegExp("(^|" + z + ")" + e + "(" + z + "|$)")) && S(e, (function (e) {
                                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                    }))
                                }, ATTR: function (e, t, n) {
                                    return function (o) {
                                        var i = re.attr(o, e);
                                        return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(V, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                                    }
                                }, CHILD: function (e, t, n, o, i) {
                                    var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                                    return 1 === o && 0 === i ? function (e) {
                                        return !!e.parentNode
                                    } : function (t, n, c) {
                                        var l, u, f, d, p, h, v = r !== a ? "nextSibling" : "previousSibling",
                                            b = t.parentNode, m = s && t.nodeName.toLowerCase(), y = !c && !s, g = !1;
                                        if (b) {
                                            if (r) {
                                                for (; v;) {
                                                    for (d = t; d = d[v];) if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                                    h = v = "only" === e && !h && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (h = [a ? b.firstChild : b.lastChild], a && y) {
                                                for (g = (p = (l = (u = (f = (d = b)[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === k && l[1]) && l[2], d = p && b.childNodes[p]; d = ++p && d && d[v] || (g = p = 0) || h.pop();) if (1 === d.nodeType && ++g && d === t) {
                                                    u[e] = [k, p, g];
                                                    break
                                                }
                                            } else if (y && (g = p = (l = (u = (f = (d = t)[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === k && l[1]), !1 === g) for (; (d = ++p && d && d[v] || (g = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++g || (y && ((u = (f = d[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [k, g]), d !== t));) ;
                                            return (g -= i) === o || g % o == 0 && g / o >= 0
                                        }
                                    }
                                }, PSEUDO: function (e, t) {
                                    var n,
                                        i = o.pseudos[e] || o.setFilters[e.toLowerCase()] || re.error("unsupported pseudo: " + e);
                                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? se((function (e, n) {
                                        for (var o, r = i(e, t), a = r.length; a--;) e[o = M(e, r[a])] = !(n[o] = r[a])
                                    })) : function (e) {
                                        return i(e, 0, n)
                                    }) : i
                                }
                            },
                            pseudos: {
                                not: se((function (e) {
                                    var t = [], n = [], o = s(e.replace(N, "$1"));
                                    return o[w] ? se((function (e, t, n, i) {
                                        for (var r, a = o(e, null, i, []), s = e.length; s--;) (r = a[s]) && (e[s] = !(t[s] = r))
                                    })) : function (e, i, r) {
                                        return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                                    }
                                })), has: se((function (e) {
                                    return function (t) {
                                        return re(e, t).length > 0
                                    }
                                })), contains: se((function (e) {
                                    return e = e.replace(Z, ee), function (t) {
                                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                                    }
                                })), lang: se((function (e) {
                                    return W.test(e || "") || re.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) {
                                        var n;
                                        do {
                                            if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                        } while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1
                                    }
                                })), target: function (t) {
                                    var n = e.location && e.location.hash;
                                    return n && n.slice(1) === t.id
                                }, root: function (e) {
                                    return e === h
                                }, focus: function (e) {
                                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                }, enabled: pe(!1), disabled: pe(!0), checked: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                                }, selected: function (e) {
                                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                }, empty: function (e) {
                                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                    return !0
                                }, parent: function (e) {
                                    return !o.pseudos.empty(e)
                                }, header: function (e) {
                                    return X.test(e.nodeName)
                                }, input: function (e) {
                                    return J.test(e.nodeName)
                                }, button: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && "button" === e.type || "button" === t
                                }, text: function (e) {
                                    var t;
                                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                }, first: he((function () {
                                    return [0]
                                })), last: he((function (e, t) {
                                    return [t - 1]
                                })), eq: he((function (e, t, n) {
                                    return [n < 0 ? n + t : n]
                                })), even: he((function (e, t) {
                                    for (var n = 0; n < t; n += 2) e.push(n);
                                    return e
                                })), odd: he((function (e, t) {
                                    for (var n = 1; n < t; n += 2) e.push(n);
                                    return e
                                })), lt: he((function (e, t, n) {
                                    for (var o = n < 0 ? n + t : n; --o >= 0;) e.push(o);
                                    return e
                                })), gt: he((function (e, t, n) {
                                    for (var o = n < 0 ? n + t : n; ++o < t;) e.push(o);
                                    return e
                                }))
                            }
                        }).pseudos.nth = o.pseudos.eq, {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) o.pseudos[t] = fe(t);
                        for (t in {submit: !0, reset: !0}) o.pseudos[t] = de(t);

                        function be() {
                        }

                        function me(e) {
                            for (var t = 0, n = e.length, o = ""; t < n; t++) o += e[t].value;
                            return o
                        }

                        function ye(e, t, n) {
                            var o = t.dir, i = t.next, r = i || o, a = n && "parentNode" === r, s = _++;
                            return t.first ? function (t, n, i) {
                                for (; t = t[o];) if (1 === t.nodeType || a) return e(t, n, i);
                                return !1
                            } : function (t, n, c) {
                                var l, u, f, d = [k, s];
                                if (c) {
                                    for (; t = t[o];) if ((1 === t.nodeType || a) && e(t, n, c)) return !0
                                } else for (; t = t[o];) if (1 === t.nodeType || a) if (u = (f = t[w] || (t[w] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[o] || t; else {
                                    if ((l = u[r]) && l[0] === k && l[1] === s) return d[2] = l[2];
                                    if (u[r] = d, d[2] = e(t, n, c)) return !0
                                }
                                return !1
                            }
                        }

                        function ge(e) {
                            return e.length > 1 ? function (t, n, o) {
                                for (var i = e.length; i--;) if (!e[i](t, n, o)) return !1;
                                return !0
                            } : e[0]
                        }

                        function we(e, t, n, o, i) {
                            for (var r, a = [], s = 0, c = e.length, l = null != t; s < c; s++) (r = e[s]) && (n && !n(r, o, i) || (a.push(r), l && t.push(s)));
                            return a
                        }

                        function xe(e, t, n, o, i, r) {
                            return o && !o[w] && (o = xe(o)), i && !i[w] && (i = xe(i, r)), se((function (r, a, s, c) {
                                var l, u, f, d = [], p = [], h = a.length, v = r || function (e, t, n) {
                                        for (var o = 0, i = t.length; o < i; o++) re(e, t[o], n);
                                        return n
                                    }(t || "*", s.nodeType ? [s] : s, []), b = !e || !r && t ? v : we(v, d, e, s, c),
                                    m = n ? i || (r ? e : h || o) ? [] : a : b;
                                if (n && n(b, m, s, c), o) for (l = we(m, p), o(l, [], s, c), u = l.length; u--;) (f = l[u]) && (m[p[u]] = !(b[p[u]] = f));
                                if (r) {
                                    if (i || e) {
                                        if (i) {
                                            for (l = [], u = m.length; u--;) (f = m[u]) && l.push(b[u] = f);
                                            i(null, m = [], l, c)
                                        }
                                        for (u = m.length; u--;) (f = m[u]) && (l = i ? M(r, f) : d[u]) > -1 && (r[l] = !(a[l] = f))
                                    }
                                } else m = we(m === a ? m.splice(h, m.length) : m), i ? i(null, a, m, c) : A.apply(a, m)
                            }))
                        }

                        function ke(e) {
                            for (var t, n, i, r = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], c = a ? 1 : 0, u = ye((function (e) {
                                return e === t
                            }), s, !0), f = ye((function (e) {
                                return M(t, e) > -1
                            }), s, !0), d = [function (e, n, o) {
                                var i = !a && (o || n !== l) || ((t = n).nodeType ? u(e, n, o) : f(e, n, o));
                                return t = null, i
                            }]; c < r; c++) if (n = o.relative[e[c].type]) d = [ye(ge(d), n)]; else {
                                if ((n = o.filter[e[c].type].apply(null, e[c].matches))[w]) {
                                    for (i = ++c; i < r && !o.relative[e[i].type]; i++) ;
                                    return xe(c > 1 && ge(d), c > 1 && me(e.slice(0, c - 1).concat({value: " " === e[c - 2].type ? "*" : ""})).replace(N, "$1"), n, c < i && ke(e.slice(c, i)), i < r && ke(e = e.slice(i)), i < r && me(e))
                                }
                                d.push(n)
                            }
                            return ge(d)
                        }

                        return be.prototype = o.filters = o.pseudos, o.setFilters = new be, a = re.tokenize = function (e, t) {
                            var n, i, r, a, s, c, l, u = C[e + " "];
                            if (u) return t ? 0 : u.slice(0);
                            for (s = e, c = [], l = o.preFilter; s;) {
                                for (a in n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), c.push(r = [])), n = !1, (i = H.exec(s)) && (n = i.shift(), r.push({
                                    value: n,
                                    type: i[0].replace(N, " ")
                                }), s = s.slice(n.length)), o.filter) !(i = $[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), r.push({
                                    value: n,
                                    type: a,
                                    matches: i
                                }), s = s.slice(n.length));
                                if (!n) break
                            }
                            return t ? s.length : s ? re.error(e) : C(e, c).slice(0)
                        }, s = re.compile = function (e, t) {
                            var n, i = [], r = [], s = E[e + " "];
                            if (!s) {
                                for (t || (t = a(e)), n = t.length; n--;) (s = ke(t[n]))[w] ? i.push(s) : r.push(s);
                                (s = E(e, function (e, t) {
                                    var n = t.length > 0, i = e.length > 0, r = function (r, a, s, c, u) {
                                        var f, h, b, m = 0, y = "0", g = r && [], w = [], x = l,
                                            _ = r || i && o.find.TAG("*", u),
                                            S = k += null == x ? 1 : Math.random() || .1, C = _.length;
                                        for (u && (l = a === p || a || u); y !== C && null != (f = _[y]); y++) {
                                            if (i && f) {
                                                for (h = 0, a || f.ownerDocument === p || (d(f), s = !v); b = e[h++];) if (b(f, a || p, s)) {
                                                    c.push(f);
                                                    break
                                                }
                                                u && (k = S)
                                            }
                                            n && ((f = !b && f) && m--, r && g.push(f))
                                        }
                                        if (m += y, n && y !== m) {
                                            for (h = 0; b = t[h++];) b(g, w, a, s);
                                            if (r) {
                                                if (m > 0) for (; y--;) g[y] || w[y] || (w[y] = j.call(c));
                                                w = we(w)
                                            }
                                            A.apply(c, w), u && !r && w.length > 0 && m + t.length > 1 && re.uniqueSort(c)
                                        }
                                        return u && (k = S, l = x), g
                                    };
                                    return n ? se(r) : r
                                }(r, i))).selector = e
                            }
                            return s
                        }, c = re.select = function (e, t, n, i) {
                            var r, c, l, u, f, d = "function" == typeof e && e, p = !i && a(e = d.selector || e);
                            if (n = n || [], 1 === p.length) {
                                if ((c = p[0] = p[0].slice(0)).length > 2 && "ID" === (l = c[0]).type && 9 === t.nodeType && v && o.relative[c[1].type]) {
                                    if (!(t = (o.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;
                                    d && (t = t.parentNode), e = e.slice(c.shift().value.length)
                                }
                                for (r = $.needsContext.test(e) ? 0 : c.length; r-- && (l = c[r], !o.relative[u = l.type]);) if ((f = o.find[u]) && (i = f(l.matches[0].replace(Z, ee), Q.test(c[0].type) && ve(t.parentNode) || t))) {
                                    if (c.splice(r, 1), !(e = i.length && me(c))) return A.apply(n, i), n;
                                    break
                                }
                            }
                            return (d || s(e, p))(i, t, !v, n, !t || Q.test(e) && ve(t.parentNode) || t), n
                        }, n.sortStable = w.split("").sort(P).join("") === w, n.detectDuplicates = !!f, d(), n.sortDetached = ce((function (e) {
                            return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
                        })), ce((function (e) {
                            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                        })) || le("type|href|height|width", (function (e, t, n) {
                            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                        })), n.attributes && ce((function (e) {
                            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                        })) || le("value", (function (e, t, n) {
                            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                        })), ce((function (e) {
                            return null == e.getAttribute("disabled")
                        })) || le(I, (function (e, t, n) {
                            var o;
                            if (!n) return !0 === e[t] ? t.toLowerCase() : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                        })), re
                    }(n);
                _.find = E, _.expr = E.selectors, _.expr[":"] = _.expr.pseudos, _.uniqueSort = _.unique = E.uniqueSort, _.text = E.getText, _.isXMLDoc = E.isXML, _.contains = E.contains, _.escapeSelector = E.escape;
                var P = function (e, t, n) {
                    for (var o = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
                        if (i && _(e).is(n)) break;
                        o.push(e)
                    }
                    return o
                }, T = function (e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                }, O = _.expr.match.needsContext;

                function j(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                }

                var L = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                function A(e, t, n) {
                    return y(t) ? _.grep(e, (function (e, o) {
                        return !!t.call(e, o, e) !== n
                    })) : t.nodeType ? _.grep(e, (function (e) {
                        return e === t !== n
                    })) : "string" != typeof t ? _.grep(e, (function (e) {
                        return f.call(t, e) > -1 !== n
                    })) : _.filter(t, e, n)
                }

                _.filter = function (e, t, n) {
                    var o = t[0];
                    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === o.nodeType ? _.find.matchesSelector(o, e) ? [o] : [] : _.find.matches(e, _.grep(t, (function (e) {
                        return 1 === e.nodeType
                    })))
                }, _.fn.extend({
                    find: function (e) {
                        var t, n, o = this.length, i = this;
                        if ("string" != typeof e) return this.pushStack(_(e).filter((function () {
                            for (t = 0; t < o; t++) if (_.contains(i[t], this)) return !0
                        })));
                        for (n = this.pushStack([]), t = 0; t < o; t++) _.find(e, i[t], n);
                        return o > 1 ? _.uniqueSort(n) : n
                    }, filter: function (e) {
                        return this.pushStack(A(this, e || [], !1))
                    }, not: function (e) {
                        return this.pushStack(A(this, e || [], !0))
                    }, is: function (e) {
                        return !!A(this, "string" == typeof e && O.test(e) ? _(e) : e || [], !1).length
                    }
                });
                var D, M = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                (_.fn.init = function (e, t, n) {
                    var o, i;
                    if (!e) return this;
                    if (n = n || D, "string" == typeof e) {
                        if (!(o = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : M.exec(e)) || !o[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (o[1]) {
                            if (t = t instanceof _ ? t[0] : t, _.merge(this, _.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : a, !0)), L.test(o[1]) && _.isPlainObject(t)) for (o in t) y(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                            return this
                        }
                        return (i = a.getElementById(o[2])) && (this[0] = i, this.length = 1), this
                    }
                    return e.nodeType ? (this[0] = e, this.length = 1, this) : y(e) ? void 0 !== n.ready ? n.ready(e) : e(_) : _.makeArray(e, this)
                }).prototype = _.fn, D = _(a);
                var I = /^(?:parents|prev(?:Until|All))/, z = {children: !0, contents: !0, next: !0, prev: !0};

                function B(e, t) {
                    for (; (e = e[t]) && 1 !== e.nodeType;) ;
                    return e
                }

                _.fn.extend({
                    has: function (e) {
                        var t = _(e, this), n = t.length;
                        return this.filter((function () {
                            for (var e = 0; e < n; e++) if (_.contains(this, t[e])) return !0
                        }))
                    }, closest: function (e, t) {
                        var n, o = 0, i = this.length, r = [], a = "string" != typeof e && _(e);
                        if (!O.test(e)) for (; o < i; o++) for (n = this[o]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && _.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        }
                        return this.pushStack(r.length > 1 ? _.uniqueSort(r) : r)
                    }, index: function (e) {
                        return e ? "string" == typeof e ? f.call(_(e), this[0]) : f.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    }, add: function (e, t) {
                        return this.pushStack(_.uniqueSort(_.merge(this.get(), _(e, t))))
                    }, addBack: function (e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }), _.each({
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null
                    }, parents: function (e) {
                        return P(e, "parentNode")
                    }, parentsUntil: function (e, t, n) {
                        return P(e, "parentNode", n)
                    }, next: function (e) {
                        return B(e, "nextSibling")
                    }, prev: function (e) {
                        return B(e, "previousSibling")
                    }, nextAll: function (e) {
                        return P(e, "nextSibling")
                    }, prevAll: function (e) {
                        return P(e, "previousSibling")
                    }, nextUntil: function (e, t, n) {
                        return P(e, "nextSibling", n)
                    }, prevUntil: function (e, t, n) {
                        return P(e, "previousSibling", n)
                    }, siblings: function (e) {
                        return T((e.parentNode || {}).firstChild, e)
                    }, children: function (e) {
                        return T(e.firstChild)
                    }, contents: function (e) {
                        return j(e, "iframe") ? e.contentDocument : (j(e, "template") && (e = e.content || e), _.merge([], e.childNodes))
                    }
                }, (function (e, t) {
                    _.fn[e] = function (n, o) {
                        var i = _.map(this, t, n);
                        return "Until" !== e.slice(-5) && (o = n), o && "string" == typeof o && (i = _.filter(o, i)), this.length > 1 && (z[e] || _.uniqueSort(i), I.test(e) && i.reverse()), this.pushStack(i)
                    }
                }));
                var R = /[^\x20\t\r\n\f]+/g;

                function q(e) {
                    return e
                }

                function V(e) {
                    throw e
                }

                function N(e, t, n, o) {
                    var i;
                    try {
                        e && y(i = e.promise) ? i.call(e).done(t).fail(n) : e && y(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(o))
                    } catch (e) {
                        n.apply(void 0, [e])
                    }
                }

                _.Callbacks = function (e) {
                    e = "string" == typeof e ? function (e) {
                        var t = {};
                        return _.each(e.match(R) || [], (function (e, n) {
                            t[n] = !0
                        })), t
                    }(e) : _.extend({}, e);
                    var t, n, o, i, r = [], a = [], s = -1, c = function () {
                        for (i = i || e.once, o = t = !0; a.length; s = -1) for (n = a.shift(); ++s < r.length;) !1 === r[s].apply(n[0], n[1]) && e.stopOnFalse && (s = r.length, n = !1);
                        e.memory || (n = !1), t = !1, i && (r = n ? [] : "")
                    }, l = {
                        add: function () {
                            return r && (n && !t && (s = r.length - 1, a.push(n)), function t(n) {
                                _.each(n, (function (n, o) {
                                    y(o) ? e.unique && l.has(o) || r.push(o) : o && o.length && "string" !== k(o) && t(o)
                                }))
                            }(arguments), n && !t && c()), this
                        }, remove: function () {
                            return _.each(arguments, (function (e, t) {
                                for (var n; (n = _.inArray(t, r, n)) > -1;) r.splice(n, 1), n <= s && s--
                            })), this
                        }, has: function (e) {
                            return e ? _.inArray(e, r) > -1 : r.length > 0
                        }, empty: function () {
                            return r && (r = []), this
                        }, disable: function () {
                            return i = a = [], r = n = "", this
                        }, disabled: function () {
                            return !r
                        }, lock: function () {
                            return i = a = [], n || t || (r = n = ""), this
                        }, locked: function () {
                            return !!i
                        }, fireWith: function (e, n) {
                            return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || c()), this
                        }, fire: function () {
                            return l.fireWith(this, arguments), this
                        }, fired: function () {
                            return !!o
                        }
                    };
                    return l
                }, _.extend({
                    Deferred: function (e) {
                        var t = [["notify", "progress", _.Callbacks("memory"), _.Callbacks("memory"), 2], ["resolve", "done", _.Callbacks("once memory"), _.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", _.Callbacks("once memory"), _.Callbacks("once memory"), 1, "rejected"]],
                            o = "pending", i = {
                                state: function () {
                                    return o
                                }, always: function () {
                                    return r.done(arguments).fail(arguments), this
                                }, catch: function (e) {
                                    return i.then(null, e)
                                }, pipe: function () {
                                    var e = arguments;
                                    return _.Deferred((function (n) {
                                        _.each(t, (function (t, o) {
                                            var i = y(e[o[4]]) && e[o[4]];
                                            r[o[1]]((function () {
                                                var e = i && i.apply(this, arguments);
                                                e && y(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this, i ? [e] : arguments)
                                            }))
                                        })), e = null
                                    })).promise()
                                }, then: function (e, o, i) {
                                    var r = 0;

                                    function a(e, t, o, i) {
                                        return function () {
                                            var s = this, c = arguments, l = function () {
                                                var n, l;
                                                if (!(e < r)) {
                                                    if ((n = o.apply(s, c)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                    l = n && ("object" == typeof n || "function" == typeof n) && n.then, y(l) ? i ? l.call(n, a(r, t, q, i), a(r, t, V, i)) : (r++, l.call(n, a(r, t, q, i), a(r, t, V, i), a(r, t, q, t.notifyWith))) : (o !== q && (s = void 0, c = [n]), (i || t.resolveWith)(s, c))
                                                }
                                            }, u = i ? l : function () {
                                                try {
                                                    l()
                                                } catch (n) {
                                                    _.Deferred.exceptionHook && _.Deferred.exceptionHook(n, u.stackTrace), e + 1 >= r && (o !== V && (s = void 0, c = [n]), t.rejectWith(s, c))
                                                }
                                            };
                                            e ? u() : (_.Deferred.getStackHook && (u.stackTrace = _.Deferred.getStackHook()), n.setTimeout(u))
                                        }
                                    }

                                    return _.Deferred((function (n) {
                                        t[0][3].add(a(0, n, y(i) ? i : q, n.notifyWith)), t[1][3].add(a(0, n, y(e) ? e : q)), t[2][3].add(a(0, n, y(o) ? o : V))
                                    })).promise()
                                }, promise: function (e) {
                                    return null != e ? _.extend(e, i) : i
                                }
                            }, r = {};
                        return _.each(t, (function (e, n) {
                            var a = n[2], s = n[5];
                            i[n[1]] = a.add, s && a.add((function () {
                                o = s
                            }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(n[3].fire), r[n[0]] = function () {
                                return r[n[0] + "With"](this === r ? void 0 : this, arguments), this
                            }, r[n[0] + "With"] = a.fireWith
                        })), i.promise(r), e && e.call(r, r), r
                    }, when: function (e) {
                        var t = arguments.length, n = t, o = Array(n), i = c.call(arguments), r = _.Deferred(),
                            a = function (e) {
                                return function (n) {
                                    o[e] = this, i[e] = arguments.length > 1 ? c.call(arguments) : n, --t || r.resolveWith(o, i)
                                }
                            };
                        if (t <= 1 && (N(e, r.done(a(n)).resolve, r.reject, !t), "pending" === r.state() || y(i[n] && i[n].then))) return r.then();
                        for (; n--;) N(i[n], a(n), r.reject);
                        return r.promise()
                    }
                });
                var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                _.Deferred.exceptionHook = function (e, t) {
                    n.console && n.console.warn && e && F.test(e.name) && n.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
                }, _.readyException = function (e) {
                    n.setTimeout((function () {
                        throw e
                    }))
                };
                var H = _.Deferred();

                function U() {
                    a.removeEventListener("DOMContentLoaded", U), n.removeEventListener("load", U), _.ready()
                }

                _.fn.ready = function (e) {
                    return H.then(e).catch((function (e) {
                        _.readyException(e)
                    })), this
                }, _.extend({
                    isReady: !1, readyWait: 1, ready: function (e) {
                        (!0 === e ? --_.readyWait : _.isReady) || (_.isReady = !0, !0 !== e && --_.readyWait > 0 || H.resolveWith(a, [_]))
                    }
                }), _.ready.then = H.then, "complete" === a.readyState || "loading" !== a.readyState && !a.documentElement.doScroll ? n.setTimeout(_.ready) : (a.addEventListener("DOMContentLoaded", U), n.addEventListener("load", U));
                var G = function (e, t, n, o, i, r, a) {
                    var s = 0, c = e.length, l = null == n;
                    if ("object" === k(n)) for (s in i = !0, n) G(e, t, s, n[s], !0, r, a); else if (void 0 !== o && (i = !0, y(o) || (a = !0), l && (a ? (t.call(e, o), t = null) : (l = t, t = function (e, t, n) {
                        return l.call(_(e), n)
                    })), t)) for (; s < c; s++) t(e[s], n, a ? o : o.call(e[s], s, t(e[s], n)));
                    return i ? e : l ? t.call(e) : c ? t(e[0], n) : r
                }, W = /^-ms-/, $ = /-([a-z])/g;

                function J(e, t) {
                    return t.toUpperCase()
                }

                function X(e) {
                    return e.replace(W, "ms-").replace($, J)
                }

                var K = function (e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };

                function Y() {
                    this.expando = _.expando + Y.uid++
                }

                Y.uid = 1, Y.prototype = {
                    cache: function (e) {
                        var t = e[this.expando];
                        return t || (t = {}, K(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0
                        }))), t
                    }, set: function (e, t, n) {
                        var o, i = this.cache(e);
                        if ("string" == typeof t) i[X(t)] = n; else for (o in t) i[X(o)] = t[o];
                        return i
                    }, get: function (e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
                    }, access: function (e, t, n) {
                        return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                    }, remove: function (e, t) {
                        var n, o = e[this.expando];
                        if (void 0 !== o) {
                            if (void 0 !== t) {
                                n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in o ? [t] : t.match(R) || []).length;
                                for (; n--;) delete o[t[n]]
                            }
                            (void 0 === t || _.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                        }
                    }, hasData: function (e) {
                        var t = e[this.expando];
                        return void 0 !== t && !_.isEmptyObject(t)
                    }
                };
                var Q = new Y, Z = new Y, ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, te = /[A-Z]/g;

                function ne(e, t, n) {
                    var o;
                    if (void 0 === n && 1 === e.nodeType) if (o = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(o))) {
                        try {
                            n = function (e) {
                                return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
                            }(n)
                        } catch (e) {
                        }
                        Z.set(e, t, n)
                    } else n = void 0;
                    return n
                }

                _.extend({
                    hasData: function (e) {
                        return Z.hasData(e) || Q.hasData(e)
                    }, data: function (e, t, n) {
                        return Z.access(e, t, n)
                    }, removeData: function (e, t) {
                        Z.remove(e, t)
                    }, _data: function (e, t, n) {
                        return Q.access(e, t, n)
                    }, _removeData: function (e, t) {
                        Q.remove(e, t)
                    }
                }), _.fn.extend({
                    data: function (e, t) {
                        var n, o, i, r = this[0], a = r && r.attributes;
                        if (void 0 === e) {
                            if (this.length && (i = Z.get(r), 1 === r.nodeType && !Q.get(r, "hasDataAttrs"))) {
                                for (n = a.length; n--;) a[n] && 0 === (o = a[n].name).indexOf("data-") && (o = X(o.slice(5)), ne(r, o, i[o]));
                                Q.set(r, "hasDataAttrs", !0)
                            }
                            return i
                        }
                        return "object" == typeof e ? this.each((function () {
                            Z.set(this, e)
                        })) : G(this, (function (t) {
                            var n;
                            if (r && void 0 === t) return void 0 !== (n = Z.get(r, e)) ? n : void 0 !== (n = ne(r, e)) ? n : void 0;
                            this.each((function () {
                                Z.set(this, e, t)
                            }))
                        }), null, t, arguments.length > 1, null, !0)
                    }, removeData: function (e) {
                        return this.each((function () {
                            Z.remove(this, e)
                        }))
                    }
                }), _.extend({
                    queue: function (e, t, n) {
                        var o;
                        if (e) return t = (t || "fx") + "queue", o = Q.get(e, t), n && (!o || Array.isArray(n) ? o = Q.access(e, t, _.makeArray(n)) : o.push(n)), o || []
                    }, dequeue: function (e, t) {
                        t = t || "fx";
                        var n = _.queue(e, t), o = n.length, i = n.shift(), r = _._queueHooks(e, t);
                        "inprogress" === i && (i = n.shift(), o--), i && ("fx" === t && n.unshift("inprogress"), delete r.stop, i.call(e, (function () {
                            _.dequeue(e, t)
                        }), r)), !o && r && r.empty.fire()
                    }, _queueHooks: function (e, t) {
                        var n = t + "queueHooks";
                        return Q.get(e, n) || Q.access(e, n, {
                            empty: _.Callbacks("once memory").add((function () {
                                Q.remove(e, [t + "queue", n])
                            }))
                        })
                    }
                }), _.fn.extend({
                    queue: function (e, t) {
                        var n = 2;
                        return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? _.queue(this[0], e) : void 0 === t ? this : this.each((function () {
                            var n = _.queue(this, e, t);
                            _._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && _.dequeue(this, e)
                        }))
                    }, dequeue: function (e) {
                        return this.each((function () {
                            _.dequeue(this, e)
                        }))
                    }, clearQueue: function (e) {
                        return this.queue(e || "fx", [])
                    }, promise: function (e, t) {
                        var n, o = 1, i = _.Deferred(), r = this, a = this.length, s = function () {
                            --o || i.resolveWith(r, [r])
                        };
                        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) (n = Q.get(r[a], e + "queueHooks")) && n.empty && (o++, n.empty.add(s));
                        return s(), i.promise(t)
                    }
                });
                var oe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    ie = new RegExp("^(?:([+-])=|)(" + oe + ")([a-z%]*)$", "i"),
                    re = ["Top", "Right", "Bottom", "Left"], ae = function (e, t) {
                        return "none" === (e = t || e).style.display || "" === e.style.display && _.contains(e.ownerDocument, e) && "none" === _.css(e, "display")
                    }, se = function (e, t, n, o) {
                        var i, r, a = {};
                        for (r in t) a[r] = e.style[r], e.style[r] = t[r];
                        for (r in i = n.apply(e, o || []), t) e.style[r] = a[r];
                        return i
                    };

                function ce(e, t, n, o) {
                    var i, r, a = 20, s = o ? function () {
                            return o.cur()
                        } : function () {
                            return _.css(e, t, "")
                        }, c = s(), l = n && n[3] || (_.cssNumber[t] ? "" : "px"),
                        u = (_.cssNumber[t] || "px" !== l && +c) && ie.exec(_.css(e, t));
                    if (u && u[3] !== l) {
                        for (c /= 2, l = l || u[3], u = +c || 1; a--;) _.style(e, t, u + l), (1 - r) * (1 - (r = s() / c || .5)) <= 0 && (a = 0), u /= r;
                        u *= 2, _.style(e, t, u + l), n = n || []
                    }
                    return n && (u = +u || +c || 0, i = n[1] ? u + (n[1] + 1) * n[2] : +n[2], o && (o.unit = l, o.start = u, o.end = i)), i
                }

                var le = {};

                function ue(e) {
                    var t, n = e.ownerDocument, o = e.nodeName, i = le[o];
                    return i || (t = n.body.appendChild(n.createElement(o)), i = _.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[o] = i, i)
                }

                function fe(e, t) {
                    for (var n, o, i = [], r = 0, a = e.length; r < a; r++) (o = e[r]).style && (n = o.style.display, t ? ("none" === n && (i[r] = Q.get(o, "display") || null, i[r] || (o.style.display = "")), "" === o.style.display && ae(o) && (i[r] = ue(o))) : "none" !== n && (i[r] = "none", Q.set(o, "display", n)));
                    for (r = 0; r < a; r++) null != i[r] && (e[r].style.display = i[r]);
                    return e
                }

                _.fn.extend({
                    show: function () {
                        return fe(this, !0)
                    }, hide: function () {
                        return fe(this)
                    }, toggle: function (e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function () {
                            ae(this) ? _(this).show() : _(this).hide()
                        }))
                    }
                });
                var de = /^(?:checkbox|radio)$/i, pe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                    he = /^$|^module$|\/(?:java|ecma)script/i, ve = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: [0, "", ""]
                    };

                function be(e, t) {
                    var n;
                    return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && j(e, t) ? _.merge([e], n) : n
                }

                function me(e, t) {
                    for (var n = 0, o = e.length; n < o; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
                }

                ve.optgroup = ve.option, ve.tbody = ve.tfoot = ve.colgroup = ve.caption = ve.thead, ve.th = ve.td;
                var ye, ge, we = /<|&#?\w+;/;

                function xe(e, t, n, o, i) {
                    for (var r, a, s, c, l, u, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++) if ((r = e[p]) || 0 === r) if ("object" === k(r)) _.merge(d, r.nodeType ? [r] : r); else if (we.test(r)) {
                        for (a = a || f.appendChild(t.createElement("div")), s = (pe.exec(r) || ["", ""])[1].toLowerCase(), c = ve[s] || ve._default, a.innerHTML = c[1] + _.htmlPrefilter(r) + c[2], u = c[0]; u--;) a = a.lastChild;
                        _.merge(d, a.childNodes), (a = f.firstChild).textContent = ""
                    } else d.push(t.createTextNode(r));
                    for (f.textContent = "", p = 0; r = d[p++];) if (o && _.inArray(r, o) > -1) i && i.push(r); else if (l = _.contains(r.ownerDocument, r), a = be(f.appendChild(r), "script"), l && me(a), n) for (u = 0; r = a[u++];) he.test(r.type || "") && n.push(r);
                    return f
                }

                ye = a.createDocumentFragment().appendChild(a.createElement("div")), (ge = a.createElement("input")).setAttribute("type", "radio"), ge.setAttribute("checked", "checked"), ge.setAttribute("name", "t"), ye.appendChild(ge), m.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked, ye.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue;
                var ke = a.documentElement, _e = /^key/, Se = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                    Ce = /^([^.]*)(?:\.(.+)|)/;

                function Ee() {
                    return !0
                }

                function Pe() {
                    return !1
                }

                function Te() {
                    try {
                        return a.activeElement
                    } catch (e) {
                    }
                }

                function Oe(e, t, n, o, i, r) {
                    var a, s;
                    if ("object" == typeof t) {
                        for (s in "string" != typeof n && (o = o || n, n = void 0), t) Oe(e, s, n, o, t[s], r);
                        return e
                    }
                    if (null == o && null == i ? (i = n, o = n = void 0) : null == i && ("string" == typeof n ? (i = o, o = void 0) : (i = o, o = n, n = void 0)), !1 === i) i = Pe; else if (!i) return e;
                    return 1 === r && (a = i, (i = function (e) {
                        return _().off(e), a.apply(this, arguments)
                    }).guid = a.guid || (a.guid = _.guid++)), e.each((function () {
                        _.event.add(this, t, i, o, n)
                    }))
                }

                _.event = {
                    global: {}, add: function (e, t, n, o, i) {
                        var r, a, s, c, l, u, f, d, p, h, v, b = Q.get(e);
                        if (b) for (n.handler && (n = (r = n).handler, i = r.selector), i && _.find.matchesSelector(ke, i), n.guid || (n.guid = _.guid++), (c = b.events) || (c = b.events = {}), (a = b.handle) || (a = b.handle = function (t) {
                            return void 0 !== _ && _.event.triggered !== t.type ? _.event.dispatch.apply(e, arguments) : void 0
                        }), l = (t = (t || "").match(R) || [""]).length; l--;) p = v = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = _.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = _.event.special[p] || {}, u = _.extend({
                            type: p,
                            origType: v,
                            data: o,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && _.expr.match.needsContext.test(i),
                            namespace: h.join(".")
                        }, r), (d = c[p]) || ((d = c[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, o, h, a) || e.addEventListener && e.addEventListener(p, a)), f.add && (f.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, u) : d.push(u), _.event.global[p] = !0)
                    }, remove: function (e, t, n, o, i) {
                        var r, a, s, c, l, u, f, d, p, h, v, b = Q.hasData(e) && Q.get(e);
                        if (b && (c = b.events)) {
                            for (l = (t = (t || "").match(R) || [""]).length; l--;) if (p = v = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                                for (f = _.event.special[p] || {}, d = c[p = (o ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = d.length; r--;) u = d[r], !i && v !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || o && o !== u.selector && ("**" !== o || !u.selector) || (d.splice(r, 1), u.selector && d.delegateCount--, f.remove && f.remove.call(e, u));
                                a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, b.handle) || _.removeEvent(e, p, b.handle), delete c[p])
                            } else for (p in c) _.event.remove(e, p + t[l], n, o, !0);
                            _.isEmptyObject(c) && Q.remove(e, "handle events")
                        }
                    }, dispatch: function (e) {
                        var t, n, o, i, r, a, s = _.event.fix(e), c = new Array(arguments.length),
                            l = (Q.get(this, "events") || {})[s.type] || [], u = _.event.special[s.type] || {};
                        for (c[0] = s, t = 1; t < arguments.length; t++) c[t] = arguments[t];
                        if (s.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, s)) {
                            for (a = _.event.handlers.call(this, s, l), t = 0; (i = a[t++]) && !s.isPropagationStopped();) for (s.currentTarget = i.elem, n = 0; (r = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(r.namespace) || (s.handleObj = r, s.data = r.data, void 0 !== (o = ((_.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, c)) && !1 === (s.result = o) && (s.preventDefault(), s.stopPropagation()));
                            return u.postDispatch && u.postDispatch.call(this, s), s.result
                        }
                    }, handlers: function (e, t) {
                        var n, o, i, r, a, s = [], c = t.delegateCount, l = e.target;
                        if (c && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                            for (r = [], a = {}, n = 0; n < c; n++) void 0 === a[i = (o = t[n]).selector + " "] && (a[i] = o.needsContext ? _(i, this).index(l) > -1 : _.find(i, this, null, [l]).length), a[i] && r.push(o);
                            r.length && s.push({elem: l, handlers: r})
                        }
                        return l = this, c < t.length && s.push({elem: l, handlers: t.slice(c)}), s
                    }, addProp: function (e, t) {
                        Object.defineProperty(_.Event.prototype, e, {
                            enumerable: !0,
                            configurable: !0,
                            get: y(t) ? function () {
                                if (this.originalEvent) return t(this.originalEvent)
                            } : function () {
                                if (this.originalEvent) return this.originalEvent[e]
                            },
                            set: function (t) {
                                Object.defineProperty(this, e, {
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                    value: t
                                })
                            }
                        })
                    }, fix: function (e) {
                        return e[_.expando] ? e : new _.Event(e)
                    }, special: {
                        load: {noBubble: !0}, focus: {
                            trigger: function () {
                                if (this !== Te() && this.focus) return this.focus(), !1
                            }, delegateType: "focusin"
                        }, blur: {
                            trigger: function () {
                                if (this === Te() && this.blur) return this.blur(), !1
                            }, delegateType: "focusout"
                        }, click: {
                            trigger: function () {
                                if ("checkbox" === this.type && this.click && j(this, "input")) return this.click(), !1
                            }, _default: function (e) {
                                return j(e.target, "a")
                            }
                        }, beforeunload: {
                            postDispatch: function (e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    }
                }, _.removeEvent = function (e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n)
                }, _.Event = function (e, t) {
                    if (!(this instanceof _.Event)) return new _.Event(e, t);
                    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : Pe, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && _.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[_.expando] = !0
                }, _.Event.prototype = {
                    constructor: _.Event,
                    isDefaultPrevented: Pe,
                    isPropagationStopped: Pe,
                    isImmediatePropagationStopped: Pe,
                    isSimulated: !1,
                    preventDefault: function () {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault()
                    },
                    stopPropagation: function () {
                        var e = this.originalEvent;
                        this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation()
                    },
                    stopImmediatePropagation: function () {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                    }
                }, _.each({
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: function (e) {
                        var t = e.button;
                        return null == e.which && _e.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Se.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
                    }
                }, _.event.addProp), _.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, (function (e, t) {
                    _.event.special[e] = {
                        delegateType: t, bindType: t, handle: function (e) {
                            var n, o = this, i = e.relatedTarget, r = e.handleObj;
                            return i && (i === o || _.contains(o, i)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                        }
                    }
                })), _.fn.extend({
                    on: function (e, t, n, o) {
                        return Oe(this, e, t, n, o)
                    }, one: function (e, t, n, o) {
                        return Oe(this, e, t, n, o, 1)
                    }, off: function (e, t, n) {
                        var o, i;
                        if (e && e.preventDefault && e.handleObj) return o = e.handleObj, _(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
                        if ("object" == typeof e) {
                            for (i in e) this.off(i, t, e[i]);
                            return this
                        }
                        return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Pe), this.each((function () {
                            _.event.remove(this, e, n, t)
                        }))
                    }
                });
                var je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                    Le = /<script|<style|<link/i, Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                function Me(e, t) {
                    return j(e, "table") && j(11 !== t.nodeType ? t : t.firstChild, "tr") && _(e).children("tbody")[0] || e
                }

                function Ie(e) {
                    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                }

                function ze(e) {
                    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
                }

                function Be(e, t) {
                    var n, o, i, r, a, s, c, l;
                    if (1 === t.nodeType) {
                        if (Q.hasData(e) && (r = Q.access(e), a = Q.set(t, r), l = r.events)) for (i in delete a.handle, a.events = {}, l) for (n = 0, o = l[i].length; n < o; n++) _.event.add(t, i, l[i][n]);
                        Z.hasData(e) && (s = Z.access(e), c = _.extend({}, s), Z.set(t, c))
                    }
                }

                function Re(e, t) {
                    var n = t.nodeName.toLowerCase();
                    "input" === n && de.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                }

                function qe(e, t, n, o) {
                    t = l.apply([], t);
                    var i, r, a, s, c, u, f = 0, d = e.length, p = d - 1, h = t[0], v = y(h);
                    if (v || d > 1 && "string" == typeof h && !m.checkClone && Ae.test(h)) return e.each((function (i) {
                        var r = e.eq(i);
                        v && (t[0] = h.call(this, i, r.html())), qe(r, t, n, o)
                    }));
                    if (d && (r = (i = xe(t, e[0].ownerDocument, !1, e, o)).firstChild, 1 === i.childNodes.length && (i = r), r || o)) {
                        for (s = (a = _.map(be(i, "script"), Ie)).length; f < d; f++) c = i, f !== p && (c = _.clone(c, !0, !0), s && _.merge(a, be(c, "script"))), n.call(e[f], c, f);
                        if (s) for (u = a[a.length - 1].ownerDocument, _.map(a, ze), f = 0; f < s; f++) c = a[f], he.test(c.type || "") && !Q.access(c, "globalEval") && _.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? _._evalUrl && _._evalUrl(c.src) : x(c.textContent.replace(De, ""), u, c))
                    }
                    return e
                }

                function Ve(e, t, n) {
                    for (var o, i = t ? _.filter(t, e) : e, r = 0; null != (o = i[r]); r++) n || 1 !== o.nodeType || _.cleanData(be(o)), o.parentNode && (n && _.contains(o.ownerDocument, o) && me(be(o, "script")), o.parentNode.removeChild(o));
                    return e
                }

                _.extend({
                    htmlPrefilter: function (e) {
                        return e.replace(je, "<$1></$2>")
                    }, clone: function (e, t, n) {
                        var o, i, r, a, s = e.cloneNode(!0), c = _.contains(e.ownerDocument, e);
                        if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || _.isXMLDoc(e))) for (a = be(s), o = 0, i = (r = be(e)).length; o < i; o++) Re(r[o], a[o]);
                        if (t) if (n) for (r = r || be(e), a = a || be(s), o = 0, i = r.length; o < i; o++) Be(r[o], a[o]); else Be(e, s);
                        return (a = be(s, "script")).length > 0 && me(a, !c && be(e, "script")), s
                    }, cleanData: function (e) {
                        for (var t, n, o, i = _.event.special, r = 0; void 0 !== (n = e[r]); r++) if (K(n)) {
                            if (t = n[Q.expando]) {
                                if (t.events) for (o in t.events) i[o] ? _.event.remove(n, o) : _.removeEvent(n, o, t.handle);
                                n[Q.expando] = void 0
                            }
                            n[Z.expando] && (n[Z.expando] = void 0)
                        }
                    }
                }), _.fn.extend({
                    detach: function (e) {
                        return Ve(this, e, !0)
                    }, remove: function (e) {
                        return Ve(this, e)
                    }, text: function (e) {
                        return G(this, (function (e) {
                            return void 0 === e ? _.text(this) : this.empty().each((function () {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                            }))
                        }), null, e, arguments.length)
                    }, append: function () {
                        return qe(this, arguments, (function (e) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Me(this, e).appendChild(e)
                        }))
                    }, prepend: function () {
                        return qe(this, arguments, (function (e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = Me(this, e);
                                t.insertBefore(e, t.firstChild)
                            }
                        }))
                    }, before: function () {
                        return qe(this, arguments, (function (e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        }))
                    }, after: function () {
                        return qe(this, arguments, (function (e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        }))
                    }, empty: function () {
                        for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (_.cleanData(be(e, !1)), e.textContent = "");
                        return this
                    }, clone: function (e, t) {
                        return e = null != e && e, t = null == t ? e : t, this.map((function () {
                            return _.clone(this, e, t)
                        }))
                    }, html: function (e) {
                        return G(this, (function (e) {
                            var t = this[0] || {}, n = 0, o = this.length;
                            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                            if ("string" == typeof e && !Le.test(e) && !ve[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = _.htmlPrefilter(e);
                                try {
                                    for (; n < o; n++) 1 === (t = this[n] || {}).nodeType && (_.cleanData(be(t, !1)), t.innerHTML = e);
                                    t = 0
                                } catch (e) {
                                }
                            }
                            t && this.empty().append(e)
                        }), null, e, arguments.length)
                    }, replaceWith: function () {
                        var e = [];
                        return qe(this, arguments, (function (t) {
                            var n = this.parentNode;
                            _.inArray(this, e) < 0 && (_.cleanData(be(this)), n && n.replaceChild(t, this))
                        }), e)
                    }
                }), _.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, (function (e, t) {
                    _.fn[e] = function (e) {
                        for (var n, o = [], i = _(e), r = i.length - 1, a = 0; a <= r; a++) n = a === r ? this : this.clone(!0), _(i[a])[t](n), u.apply(o, n.get());
                        return this.pushStack(o)
                    }
                }));
                var Ne = new RegExp("^(" + oe + ")(?!px)[a-z%]+$", "i"), Fe = function (e) {
                    var t = e.ownerDocument.defaultView;
                    return t && t.opener || (t = n), t.getComputedStyle(e)
                }, He = new RegExp(re.join("|"), "i");

                function Ue(e, t, n) {
                    var o, i, r, a, s = e.style;
                    return (n = n || Fe(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || _.contains(e.ownerDocument, e) || (a = _.style(e, t)), !m.pixelBoxStyles() && Ne.test(a) && He.test(t) && (o = s.width, i = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = o, s.minWidth = i, s.maxWidth = r)), void 0 !== a ? a + "" : a
                }

                function Ge(e, t) {
                    return {
                        get: function () {
                            if (!e()) return (this.get = t).apply(this, arguments);
                            delete this.get
                        }
                    }
                }

                !function () {
                    function e() {
                        if (u) {
                            l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ke.appendChild(l).appendChild(u);
                            var e = n.getComputedStyle(u);
                            o = "1%" !== e.top, c = 12 === t(e.marginLeft), u.style.right = "60%", s = 36 === t(e.right), i = 36 === t(e.width), u.style.position = "absolute", r = 36 === u.offsetWidth || "absolute", ke.removeChild(l), u = null
                        }
                    }

                    function t(e) {
                        return Math.round(parseFloat(e))
                    }

                    var o, i, r, s, c, l = a.createElement("div"), u = a.createElement("div");
                    u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === u.style.backgroundClip, _.extend(m, {
                        boxSizingReliable: function () {
                            return e(), i
                        }, pixelBoxStyles: function () {
                            return e(), s
                        }, pixelPosition: function () {
                            return e(), o
                        }, reliableMarginLeft: function () {
                            return e(), c
                        }, scrollboxSize: function () {
                            return e(), r
                        }
                    }))
                }();
                var We = /^(none|table(?!-c[ea]).+)/, $e = /^--/,
                    Je = {position: "absolute", visibility: "hidden", display: "block"},
                    Xe = {letterSpacing: "0", fontWeight: "400"}, Ke = ["Webkit", "Moz", "ms"],
                    Ye = a.createElement("div").style;

                function Qe(e) {
                    var t = _.cssProps[e];
                    return t || (t = _.cssProps[e] = function (e) {
                        if (e in Ye) return e;
                        for (var t = e[0].toUpperCase() + e.slice(1), n = Ke.length; n--;) if ((e = Ke[n] + t) in Ye) return e
                    }(e) || e), t
                }

                function Ze(e, t, n) {
                    var o = ie.exec(t);
                    return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || "px") : t
                }

                function et(e, t, n, o, i, r) {
                    var a = "width" === t ? 1 : 0, s = 0, c = 0;
                    if (n === (o ? "border" : "content")) return 0;
                    for (; a < 4; a += 2) "margin" === n && (c += _.css(e, n + re[a], !0, i)), o ? ("content" === n && (c -= _.css(e, "padding" + re[a], !0, i)), "margin" !== n && (c -= _.css(e, "border" + re[a] + "Width", !0, i))) : (c += _.css(e, "padding" + re[a], !0, i), "padding" !== n ? c += _.css(e, "border" + re[a] + "Width", !0, i) : s += _.css(e, "border" + re[a] + "Width", !0, i));
                    return !o && r >= 0 && (c += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - c - s - .5))), c
                }

                function tt(e, t, n) {
                    var o = Fe(e), i = Ue(e, t, o), r = "border-box" === _.css(e, "boxSizing", !1, o), a = r;
                    if (Ne.test(i)) {
                        if (!n) return i;
                        i = "auto"
                    }
                    return a = a && (m.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === _.css(e, "display", !1, o)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + et(e, t, n || (r ? "border" : "content"), a, o, i) + "px"
                }

                function nt(e, t, n, o, i) {
                    return new nt.prototype.init(e, t, n, o, i)
                }

                _.extend({
                    cssHooks: {
                        opacity: {
                            get: function (e, t) {
                                if (t) {
                                    var n = Ue(e, "opacity");
                                    return "" === n ? "1" : n
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {},
                    style: function (e, t, n, o) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var i, r, a, s = X(t), c = $e.test(t), l = e.style;
                            if (c || (t = Qe(s)), a = _.cssHooks[t] || _.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, o)) ? i : l[t];
                            "string" == (r = typeof n) && (i = ie.exec(n)) && i[1] && (n = ce(e, t, i), r = "number"), null != n && n == n && ("number" === r && (n += i && i[3] || (_.cssNumber[s] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, o)) || (c ? l.setProperty(t, n) : l[t] = n))
                        }
                    },
                    css: function (e, t, n, o) {
                        var i, r, a, s = X(t);
                        return $e.test(t) || (t = Qe(s)), (a = _.cssHooks[t] || _.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Ue(e, t, o)), "normal" === i && t in Xe && (i = Xe[t]), "" === n || n ? (r = parseFloat(i), !0 === n || isFinite(r) ? r || 0 : i) : i
                    }
                }), _.each(["height", "width"], (function (e, t) {
                    _.cssHooks[t] = {
                        get: function (e, n, o) {
                            if (n) return !We.test(_.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, t, o) : se(e, Je, (function () {
                                return tt(e, t, o)
                            }))
                        }, set: function (e, n, o) {
                            var i, r = Fe(e), a = "border-box" === _.css(e, "boxSizing", !1, r),
                                s = o && et(e, t, o, a, r);
                            return a && m.scrollboxSize() === r.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(r[t]) - et(e, t, "border", !1, r) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = _.css(e, t)), Ze(0, n, s)
                        }
                    }
                })), _.cssHooks.marginLeft = Ge(m.reliableMarginLeft, (function (e, t) {
                    if (t) return (parseFloat(Ue(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, {marginLeft: 0}, (function () {
                        return e.getBoundingClientRect().left
                    }))) + "px"
                })), _.each({margin: "", padding: "", border: "Width"}, (function (e, t) {
                    _.cssHooks[e + t] = {
                        expand: function (n) {
                            for (var o = 0, i = {}, r = "string" == typeof n ? n.split(" ") : [n]; o < 4; o++) i[e + re[o] + t] = r[o] || r[o - 2] || r[0];
                            return i
                        }
                    }, "margin" !== e && (_.cssHooks[e + t].set = Ze)
                })), _.fn.extend({
                    css: function (e, t) {
                        return G(this, (function (e, t, n) {
                            var o, i, r = {}, a = 0;
                            if (Array.isArray(t)) {
                                for (o = Fe(e), i = t.length; a < i; a++) r[t[a]] = _.css(e, t[a], !1, o);
                                return r
                            }
                            return void 0 !== n ? _.style(e, t, n) : _.css(e, t)
                        }), e, t, arguments.length > 1)
                    }
                }), _.Tween = nt, nt.prototype = {
                    constructor: nt, init: function (e, t, n, o, i, r) {
                        this.elem = e, this.prop = n, this.easing = i || _.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = o, this.unit = r || (_.cssNumber[n] ? "" : "px")
                    }, cur: function () {
                        var e = nt.propHooks[this.prop];
                        return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
                    }, run: function (e) {
                        var t, n = nt.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = _.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : nt.propHooks._default.set(this), this
                    }
                }, nt.prototype.init.prototype = nt.prototype, nt.propHooks = {
                    _default: {
                        get: function (e) {
                            var t;
                            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = _.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                        }, set: function (e) {
                            _.fx.step[e.prop] ? _.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[_.cssProps[e.prop]] && !_.cssHooks[e.prop] ? e.elem[e.prop] = e.now : _.style(e.elem, e.prop, e.now + e.unit)
                        }
                    }
                }, nt.propHooks.scrollTop = nt.propHooks.scrollLeft = {
                    set: function (e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                }, _.easing = {
                    linear: function (e) {
                        return e
                    }, swing: function (e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    }, _default: "swing"
                }, _.fx = nt.prototype.init, _.fx.step = {};
                var ot, it, rt = /^(?:toggle|show|hide)$/, at = /queueHooks$/;

                function st() {
                    it && (!1 === a.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(st) : n.setTimeout(st, _.fx.interval), _.fx.tick())
                }

                function ct() {
                    return n.setTimeout((function () {
                        ot = void 0
                    })), ot = Date.now()
                }

                function lt(e, t) {
                    var n, o = 0, i = {height: e};
                    for (t = t ? 1 : 0; o < 4; o += 2 - t) i["margin" + (n = re[o])] = i["padding" + n] = e;
                    return t && (i.opacity = i.width = e), i
                }

                function ut(e, t, n) {
                    for (var o, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), r = 0, a = i.length; r < a; r++) if (o = i[r].call(n, t, e)) return o
                }

                function ft(e, t, n) {
                    var o, i, r = 0, a = ft.prefilters.length, s = _.Deferred().always((function () {
                        delete c.elem
                    })), c = function () {
                        if (i) return !1;
                        for (var t = ot || ct(), n = Math.max(0, l.startTime + l.duration - t), o = 1 - (n / l.duration || 0), r = 0, a = l.tweens.length; r < a; r++) l.tweens[r].run(o);
                        return s.notifyWith(e, [l, o, n]), o < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
                    }, l = s.promise({
                        elem: e,
                        props: _.extend({}, t),
                        opts: _.extend(!0, {specialEasing: {}, easing: _.easing._default}, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: ot || ct(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function (t, n) {
                            var o = _.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                            return l.tweens.push(o), o
                        },
                        stop: function (t) {
                            var n = 0, o = t ? l.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; n < o; n++) l.tweens[n].run(1);
                            return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                        }
                    }), u = l.props;
                    for (function (e, t) {
                        var n, o, i, r, a;
                        for (n in e) if (i = t[o = X(n)], r = e[n], Array.isArray(r) && (i = r[1], r = e[n] = r[0]), n !== o && (e[o] = r, delete e[n]), (a = _.cssHooks[o]) && "expand" in a) for (n in r = a.expand(r), delete e[o], r) n in e || (e[n] = r[n], t[n] = i); else t[o] = i
                    }(u, l.opts.specialEasing); r < a; r++) if (o = ft.prefilters[r].call(l, e, u, l.opts)) return y(o.stop) && (_._queueHooks(l.elem, l.opts.queue).stop = o.stop.bind(o)), o;
                    return _.map(u, ut, l), y(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), _.fx.timer(_.extend(c, {
                        elem: e,
                        anim: l,
                        queue: l.opts.queue
                    })), l
                }

                _.Animation = _.extend(ft, {
                    tweeners: {
                        "*": [function (e, t) {
                            var n = this.createTween(e, t);
                            return ce(n.elem, e, ie.exec(t), n), n
                        }]
                    }, tweener: function (e, t) {
                        y(e) ? (t = e, e = ["*"]) : e = e.match(R);
                        for (var n, o = 0, i = e.length; o < i; o++) n = e[o], ft.tweeners[n] = ft.tweeners[n] || [], ft.tweeners[n].unshift(t)
                    }, prefilters: [function (e, t, n) {
                        var o, i, r, a, s, c, l, u, f = "width" in t || "height" in t, d = this, p = {}, h = e.style,
                            v = e.nodeType && ae(e), b = Q.get(e, "fxshow");
                        for (o in n.queue || (null == (a = _._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
                            a.unqueued || s()
                        }), a.unqueued++, d.always((function () {
                            d.always((function () {
                                a.unqueued--, _.queue(e, "fx").length || a.empty.fire()
                            }))
                        }))), t) if (i = t[o], rt.test(i)) {
                            if (delete t[o], r = r || "toggle" === i, i === (v ? "hide" : "show")) {
                                if ("show" !== i || !b || void 0 === b[o]) continue;
                                v = !0
                            }
                            p[o] = b && b[o] || _.style(e, o)
                        }
                        if ((c = !_.isEmptyObject(t)) || !_.isEmptyObject(p)) for (o in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = b && b.display) && (l = Q.get(e, "display")), "none" === (u = _.css(e, "display")) && (l ? u = l : (fe([e], !0), l = e.style.display || l, u = _.css(e, "display"), fe([e]))), ("inline" === u || "inline-block" === u && null != l) && "none" === _.css(e, "float") && (c || (d.done((function () {
                            h.display = l
                        })), null == l && (u = h.display, l = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always((function () {
                            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                        }))), c = !1, p) c || (b ? "hidden" in b && (v = b.hidden) : b = Q.access(e, "fxshow", {display: l}), r && (b.hidden = !v), v && fe([e], !0), d.done((function () {
                            for (o in v || fe([e]), Q.remove(e, "fxshow"), p) _.style(e, o, p[o])
                        }))), c = ut(v ? b[o] : 0, o, d), o in b || (b[o] = c.start, v && (c.end = c.start, c.start = 0))
                    }], prefilter: function (e, t) {
                        t ? ft.prefilters.unshift(e) : ft.prefilters.push(e)
                    }
                }), _.speed = function (e, t, n) {
                    var o = e && "object" == typeof e ? _.extend({}, e) : {
                        complete: n || !n && t || y(e) && e,
                        duration: e,
                        easing: n && t || t && !y(t) && t
                    };
                    return _.fx.off ? o.duration = 0 : "number" != typeof o.duration && (o.duration in _.fx.speeds ? o.duration = _.fx.speeds[o.duration] : o.duration = _.fx.speeds._default), null != o.queue && !0 !== o.queue || (o.queue = "fx"), o.old = o.complete, o.complete = function () {
                        y(o.old) && o.old.call(this), o.queue && _.dequeue(this, o.queue)
                    }, o
                }, _.fn.extend({
                    fadeTo: function (e, t, n, o) {
                        return this.filter(ae).css("opacity", 0).show().end().animate({opacity: t}, e, n, o)
                    }, animate: function (e, t, n, o) {
                        var i = _.isEmptyObject(e), r = _.speed(t, n, o), a = function () {
                            var t = ft(this, _.extend({}, e), r);
                            (i || Q.get(this, "finish")) && t.stop(!0)
                        };
                        return a.finish = a, i || !1 === r.queue ? this.each(a) : this.queue(r.queue, a)
                    }, stop: function (e, t, n) {
                        var o = function (e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each((function () {
                            var t = !0, i = null != e && e + "queueHooks", r = _.timers, a = Q.get(this);
                            if (i) a[i] && a[i].stop && o(a[i]); else for (i in a) a[i] && a[i].stop && at.test(i) && o(a[i]);
                            for (i = r.length; i--;) r[i].elem !== this || null != e && r[i].queue !== e || (r[i].anim.stop(n), t = !1, r.splice(i, 1));
                            !t && n || _.dequeue(this, e)
                        }))
                    }, finish: function (e) {
                        return !1 !== e && (e = e || "fx"), this.each((function () {
                            var t, n = Q.get(this), o = n[e + "queue"], i = n[e + "queueHooks"], r = _.timers,
                                a = o ? o.length : 0;
                            for (n.finish = !0, _.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                            for (t = 0; t < a; t++) o[t] && o[t].finish && o[t].finish.call(this);
                            delete n.finish
                        }))
                    }
                }), _.each(["toggle", "show", "hide"], (function (e, t) {
                    var n = _.fn[t];
                    _.fn[t] = function (e, o, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(lt(t, !0), e, o, i)
                    }
                })), _.each({
                    slideDown: lt("show"),
                    slideUp: lt("hide"),
                    slideToggle: lt("toggle"),
                    fadeIn: {opacity: "show"},
                    fadeOut: {opacity: "hide"},
                    fadeToggle: {opacity: "toggle"}
                }, (function (e, t) {
                    _.fn[e] = function (e, n, o) {
                        return this.animate(t, e, n, o)
                    }
                })), _.timers = [], _.fx.tick = function () {
                    var e, t = 0, n = _.timers;
                    for (ot = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || _.fx.stop(), ot = void 0
                }, _.fx.timer = function (e) {
                    _.timers.push(e), _.fx.start()
                }, _.fx.interval = 13, _.fx.start = function () {
                    it || (it = !0, st())
                }, _.fx.stop = function () {
                    it = null
                }, _.fx.speeds = {slow: 600, fast: 200, _default: 400}, _.fn.delay = function (e, t) {
                    return e = _.fx && _.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function (t, o) {
                        var i = n.setTimeout(t, e);
                        o.stop = function () {
                            n.clearTimeout(i)
                        }
                    }))
                }, function () {
                    var e = a.createElement("input"),
                        t = a.createElement("select").appendChild(a.createElement("option"));
                    e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = a.createElement("input")).value = "t", e.type = "radio", m.radioValue = "t" === e.value
                }();
                var dt, pt = _.expr.attrHandle;
                _.fn.extend({
                    attr: function (e, t) {
                        return G(this, _.attr, e, t, arguments.length > 1)
                    }, removeAttr: function (e) {
                        return this.each((function () {
                            _.removeAttr(this, e)
                        }))
                    }
                }), _.extend({
                    attr: function (e, t, n) {
                        var o, i, r = e.nodeType;
                        if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? _.prop(e, t, n) : (1 === r && _.isXMLDoc(e) || (i = _.attrHooks[t.toLowerCase()] || (_.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void _.removeAttr(e, t) : i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (o = i.get(e, t)) ? o : null == (o = _.find.attr(e, t)) ? void 0 : o)
                    }, attrHooks: {
                        type: {
                            set: function (e, t) {
                                if (!m.radioValue && "radio" === t && j(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t), n && (e.value = n), t
                                }
                            }
                        }
                    }, removeAttr: function (e, t) {
                        var n, o = 0, i = t && t.match(R);
                        if (i && 1 === e.nodeType) for (; n = i[o++];) e.removeAttribute(n)
                    }
                }), dt = {
                    set: function (e, t, n) {
                        return !1 === t ? _.removeAttr(e, n) : e.setAttribute(n, n), n
                    }
                }, _.each(_.expr.match.bool.source.match(/\w+/g), (function (e, t) {
                    var n = pt[t] || _.find.attr;
                    pt[t] = function (e, t, o) {
                        var i, r, a = t.toLowerCase();
                        return o || (r = pt[a], pt[a] = i, i = null != n(e, t, o) ? a : null, pt[a] = r), i
                    }
                }));
                var ht = /^(?:input|select|textarea|button)$/i, vt = /^(?:a|area)$/i;

                function bt(e) {
                    return (e.match(R) || []).join(" ")
                }

                function mt(e) {
                    return e.getAttribute && e.getAttribute("class") || ""
                }

                function yt(e) {
                    return Array.isArray(e) ? e : "string" == typeof e && e.match(R) || []
                }

                _.fn.extend({
                    prop: function (e, t) {
                        return G(this, _.prop, e, t, arguments.length > 1)
                    }, removeProp: function (e) {
                        return this.each((function () {
                            delete this[_.propFix[e] || e]
                        }))
                    }
                }), _.extend({
                    prop: function (e, t, n) {
                        var o, i, r = e.nodeType;
                        if (3 !== r && 8 !== r && 2 !== r) return 1 === r && _.isXMLDoc(e) || (t = _.propFix[t] || t, i = _.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : e[t] = n : i && "get" in i && null !== (o = i.get(e, t)) ? o : e[t]
                    }, propHooks: {
                        tabIndex: {
                            get: function (e) {
                                var t = _.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : ht.test(e.nodeName) || vt.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    }, propFix: {for: "htmlFor", class: "className"}
                }), m.optSelected || (_.propHooks.selected = {
                    get: function (e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex, null
                    }, set: function (e) {
                        var t = e.parentNode;
                        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                    }
                }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function () {
                    _.propFix[this.toLowerCase()] = this
                })), _.fn.extend({
                    addClass: function (e) {
                        var t, n, o, i, r, a, s, c = 0;
                        if (y(e)) return this.each((function (t) {
                            _(this).addClass(e.call(this, t, mt(this)))
                        }));
                        if ((t = yt(e)).length) for (; n = this[c++];) if (i = mt(n), o = 1 === n.nodeType && " " + bt(i) + " ") {
                            for (a = 0; r = t[a++];) o.indexOf(" " + r + " ") < 0 && (o += r + " ");
                            i !== (s = bt(o)) && n.setAttribute("class", s)
                        }
                        return this
                    }, removeClass: function (e) {
                        var t, n, o, i, r, a, s, c = 0;
                        if (y(e)) return this.each((function (t) {
                            _(this).removeClass(e.call(this, t, mt(this)))
                        }));
                        if (!arguments.length) return this.attr("class", "");
                        if ((t = yt(e)).length) for (; n = this[c++];) if (i = mt(n), o = 1 === n.nodeType && " " + bt(i) + " ") {
                            for (a = 0; r = t[a++];) for (; o.indexOf(" " + r + " ") > -1;) o = o.replace(" " + r + " ", " ");
                            i !== (s = bt(o)) && n.setAttribute("class", s)
                        }
                        return this
                    }, toggleClass: function (e, t) {
                        var n = typeof e, o = "string" === n || Array.isArray(e);
                        return "boolean" == typeof t && o ? t ? this.addClass(e) : this.removeClass(e) : y(e) ? this.each((function (n) {
                            _(this).toggleClass(e.call(this, n, mt(this), t), t)
                        })) : this.each((function () {
                            var t, i, r, a;
                            if (o) for (i = 0, r = _(this), a = yt(e); t = a[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else void 0 !== e && "boolean" !== n || ((t = mt(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Q.get(this, "__className__") || ""))
                        }))
                    }, hasClass: function (e) {
                        var t, n, o = 0;
                        for (t = " " + e + " "; n = this[o++];) if (1 === n.nodeType && (" " + bt(mt(n)) + " ").indexOf(t) > -1) return !0;
                        return !1
                    }
                });
                var gt = /\r/g;
                _.fn.extend({
                    val: function (e) {
                        var t, n, o, i = this[0];
                        return arguments.length ? (o = y(e), this.each((function (n) {
                            var i;
                            1 === this.nodeType && (null == (i = o ? e.call(this, n, _(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = _.map(i, (function (e) {
                                return null == e ? "" : e + ""
                            }))), (t = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                        }))) : i ? (t = _.valHooks[i.type] || _.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(gt, "") : null == n ? "" : n : void 0
                    }
                }), _.extend({
                    valHooks: {
                        option: {
                            get: function (e) {
                                var t = _.find.attr(e, "value");
                                return null != t ? t : bt(_.text(e))
                            }
                        }, select: {
                            get: function (e) {
                                var t, n, o, i = e.options, r = e.selectedIndex, a = "select-one" === e.type,
                                    s = a ? null : [], c = a ? r + 1 : i.length;
                                for (o = r < 0 ? c : a ? r : 0; o < c; o++) if (((n = i[o]).selected || o === r) && !n.disabled && (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))) {
                                    if (t = _(n).val(), a) return t;
                                    s.push(t)
                                }
                                return s
                            }, set: function (e, t) {
                                for (var n, o, i = e.options, r = _.makeArray(t), a = i.length; a--;) ((o = i[a]).selected = _.inArray(_.valHooks.option.get(o), r) > -1) && (n = !0);
                                return n || (e.selectedIndex = -1), r
                            }
                        }
                    }
                }), _.each(["radio", "checkbox"], (function () {
                    _.valHooks[this] = {
                        set: function (e, t) {
                            if (Array.isArray(t)) return e.checked = _.inArray(_(e).val(), t) > -1
                        }
                    }, m.checkOn || (_.valHooks[this].get = function (e) {
                        return null === e.getAttribute("value") ? "on" : e.value
                    })
                })), m.focusin = "onfocusin" in n;
                var wt = /^(?:focusinfocus|focusoutblur)$/, xt = function (e) {
                    e.stopPropagation()
                };
                _.extend(_.event, {
                    trigger: function (e, t, o, i) {
                        var r, s, c, l, u, f, d, p, v = [o || a], b = h.call(e, "type") ? e.type : e,
                            m = h.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (s = p = c = o = o || a, 3 !== o.nodeType && 8 !== o.nodeType && !wt.test(b + _.event.triggered) && (b.indexOf(".") > -1 && (m = b.split("."), b = m.shift(), m.sort()), u = b.indexOf(":") < 0 && "on" + b, (e = e[_.expando] ? e : new _.Event(b, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = o), t = null == t ? [e] : _.makeArray(t, [e]), d = _.event.special[b] || {}, i || !d.trigger || !1 !== d.trigger.apply(o, t))) {
                            if (!i && !d.noBubble && !g(o)) {
                                for (l = d.delegateType || b, wt.test(l + b) || (s = s.parentNode); s; s = s.parentNode) v.push(s), c = s;
                                c === (o.ownerDocument || a) && v.push(c.defaultView || c.parentWindow || n)
                            }
                            for (r = 0; (s = v[r++]) && !e.isPropagationStopped();) p = s, e.type = r > 1 ? l : d.bindType || b, (f = (Q.get(s, "events") || {})[e.type] && Q.get(s, "handle")) && f.apply(s, t), (f = u && s[u]) && f.apply && K(s) && (e.result = f.apply(s, t), !1 === e.result && e.preventDefault());
                            return e.type = b, i || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), t) || !K(o) || u && y(o[b]) && !g(o) && ((c = o[u]) && (o[u] = null), _.event.triggered = b, e.isPropagationStopped() && p.addEventListener(b, xt), o[b](), e.isPropagationStopped() && p.removeEventListener(b, xt), _.event.triggered = void 0, c && (o[u] = c)), e.result
                        }
                    }, simulate: function (e, t, n) {
                        var o = _.extend(new _.Event, n, {type: e, isSimulated: !0});
                        _.event.trigger(o, null, t)
                    }
                }), _.fn.extend({
                    trigger: function (e, t) {
                        return this.each((function () {
                            _.event.trigger(e, t, this)
                        }))
                    }, triggerHandler: function (e, t) {
                        var n = this[0];
                        if (n) return _.event.trigger(e, t, n, !0)
                    }
                }), m.focusin || _.each({focus: "focusin", blur: "focusout"}, (function (e, t) {
                    var n = function (e) {
                        _.event.simulate(t, e.target, _.event.fix(e))
                    };
                    _.event.special[t] = {
                        setup: function () {
                            var o = this.ownerDocument || this, i = Q.access(o, t);
                            i || o.addEventListener(e, n, !0), Q.access(o, t, (i || 0) + 1)
                        }, teardown: function () {
                            var o = this.ownerDocument || this, i = Q.access(o, t) - 1;
                            i ? Q.access(o, t, i) : (o.removeEventListener(e, n, !0), Q.remove(o, t))
                        }
                    }
                }));
                var kt = n.location, _t = Date.now(), St = /\?/;
                _.parseXML = function (e) {
                    var t;
                    if (!e || "string" != typeof e) return null;
                    try {
                        t = (new n.DOMParser).parseFromString(e, "text/xml")
                    } catch (e) {
                        t = void 0
                    }
                    return t && !t.getElementsByTagName("parsererror").length || _.error("Invalid XML: " + e), t
                };
                var Ct = /\[\]$/, Et = /\r?\n/g, Pt = /^(?:submit|button|image|reset|file)$/i,
                    Tt = /^(?:input|select|textarea|keygen)/i;

                function Ot(e, t, n, o) {
                    var i;
                    if (Array.isArray(t)) _.each(t, (function (t, i) {
                        n || Ct.test(e) ? o(e, i) : Ot(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, o)
                    })); else if (n || "object" !== k(t)) o(e, t); else for (i in t) Ot(e + "[" + i + "]", t[i], n, o)
                }

                _.param = function (e, t) {
                    var n, o = [], i = function (e, t) {
                        var n = y(t) ? t() : t;
                        o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                    };
                    if (Array.isArray(e) || e.jquery && !_.isPlainObject(e)) _.each(e, (function () {
                        i(this.name, this.value)
                    })); else for (n in e) Ot(n, e[n], t, i);
                    return o.join("&")
                }, _.fn.extend({
                    serialize: function () {
                        return _.param(this.serializeArray())
                    }, serializeArray: function () {
                        return this.map((function () {
                            var e = _.prop(this, "elements");
                            return e ? _.makeArray(e) : this
                        })).filter((function () {
                            var e = this.type;
                            return this.name && !_(this).is(":disabled") && Tt.test(this.nodeName) && !Pt.test(e) && (this.checked || !de.test(e))
                        })).map((function (e, t) {
                            var n = _(this).val();
                            return null == n ? null : Array.isArray(n) ? _.map(n, (function (e) {
                                return {name: t.name, value: e.replace(Et, "\r\n")}
                            })) : {name: t.name, value: n.replace(Et, "\r\n")}
                        })).get()
                    }
                });
                var jt = /%20/g, Lt = /#.*$/, At = /([?&])_=[^&]*/, Dt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    Mt = /^(?:GET|HEAD)$/, It = /^\/\//, zt = {}, Bt = {}, Rt = "*/".concat("*"),
                    qt = a.createElement("a");

                function Vt(e) {
                    return function (t, n) {
                        "string" != typeof t && (n = t, t = "*");
                        var o, i = 0, r = t.toLowerCase().match(R) || [];
                        if (y(n)) for (; o = r[i++];) "+" === o[0] ? (o = o.slice(1) || "*", (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n)
                    }
                }

                function Nt(e, t, n, o) {
                    var i = {}, r = e === Bt;

                    function a(s) {
                        var c;
                        return i[s] = !0, _.each(e[s] || [], (function (e, s) {
                            var l = s(t, n, o);
                            return "string" != typeof l || r || i[l] ? r ? !(c = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
                        })), c
                    }

                    return a(t.dataTypes[0]) || !i["*"] && a("*")
                }

                function Ft(e, t) {
                    var n, o, i = _.ajaxSettings.flatOptions || {};
                    for (n in t) void 0 !== t[n] && ((i[n] ? e : o || (o = {}))[n] = t[n]);
                    return o && _.extend(!0, e, o), e
                }

                qt.href = kt.href, _.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: kt.href,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(kt.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Rt,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/js"
                        },
                        contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                        responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": JSON.parse,
                            "text xml": _.parseXML
                        },
                        flatOptions: {url: !0, context: !0}
                    },
                    ajaxSetup: function (e, t) {
                        return t ? Ft(Ft(e, _.ajaxSettings), t) : Ft(_.ajaxSettings, e)
                    },
                    ajaxPrefilter: Vt(zt),
                    ajaxTransport: Vt(Bt),
                    ajax: function (e, t) {
                        "object" == typeof e && (t = e, e = void 0), t = t || {};
                        var o, i, r, s, c, l, u, f, d, p, h = _.ajaxSetup({}, t), v = h.context || h,
                            b = h.context && (v.nodeType || v.jquery) ? _(v) : _.event, m = _.Deferred(),
                            y = _.Callbacks("once memory"), g = h.statusCode || {}, w = {}, x = {}, k = "canceled",
                            S = {
                                readyState: 0, getResponseHeader: function (e) {
                                    var t;
                                    if (u) {
                                        if (!s) for (s = {}; t = Dt.exec(r);) s[t[1].toLowerCase()] = t[2];
                                        t = s[e.toLowerCase()]
                                    }
                                    return null == t ? null : t
                                }, getAllResponseHeaders: function () {
                                    return u ? r : null
                                }, setRequestHeader: function (e, t) {
                                    return null == u && (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, w[e] = t), this
                                }, overrideMimeType: function (e) {
                                    return null == u && (h.mimeType = e), this
                                }, statusCode: function (e) {
                                    var t;
                                    if (e) if (u) S.always(e[S.status]); else for (t in e) g[t] = [g[t], e[t]];
                                    return this
                                }, abort: function (e) {
                                    var t = e || k;
                                    return o && o.abort(t), C(0, t), this
                                }
                            };
                        if (m.promise(S), h.url = ((e || h.url || kt.href) + "").replace(It, kt.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(R) || [""], null == h.crossDomain) {
                            l = a.createElement("a");
                            try {
                                l.href = h.url, l.href = l.href, h.crossDomain = qt.protocol + "//" + qt.host != l.protocol + "//" + l.host
                            } catch (e) {
                                h.crossDomain = !0
                            }
                        }
                        if (h.data && h.processData && "string" != typeof h.data && (h.data = _.param(h.data, h.traditional)), Nt(zt, h, t, S), u) return S;
                        for (d in (f = _.event && h.global) && 0 == _.active++ && _.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), i = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(jt, "+")) : (p = h.url.slice(i.length), h.data && (h.processData || "string" == typeof h.data) && (i += (St.test(i) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (i = i.replace(At, "$1"), p = (St.test(i) ? "&" : "?") + "_=" + _t++ + p), h.url = i + p), h.ifModified && (_.lastModified[i] && S.setRequestHeader("If-Modified-Since", _.lastModified[i]), _.etag[i] && S.setRequestHeader("If-None-Match", _.etag[i])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && S.setRequestHeader("Content-Type", h.contentType), S.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : h.accepts["*"]), h.headers) S.setRequestHeader(d, h.headers[d]);
                        if (h.beforeSend && (!1 === h.beforeSend.call(v, S, h) || u)) return S.abort();
                        if (k = "abort", y.add(h.complete), S.done(h.success), S.fail(h.error), o = Nt(Bt, h, t, S)) {
                            if (S.readyState = 1, f && b.trigger("ajaxSend", [S, h]), u) return S;
                            h.async && h.timeout > 0 && (c = n.setTimeout((function () {
                                S.abort("timeout")
                            }), h.timeout));
                            try {
                                u = !1, o.send(w, C)
                            } catch (e) {
                                if (u) throw e;
                                C(-1, e)
                            }
                        } else C(-1, "No Transport");

                        function C(e, t, a, s) {
                            var l, d, p, w, x, k = t;
                            u || (u = !0, c && n.clearTimeout(c), o = void 0, r = s || "", S.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, a && (w = function (e, t, n) {
                                for (var o, i, r, a, s = e.contents, c = e.dataTypes; "*" === c[0];) c.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (o) for (i in s) if (s[i] && s[i].test(o)) {
                                    c.unshift(i);
                                    break
                                }
                                if (c[0] in n) r = c[0]; else {
                                    for (i in n) {
                                        if (!c[0] || e.converters[i + " " + c[0]]) {
                                            r = i;
                                            break
                                        }
                                        a || (a = i)
                                    }
                                    r = r || a
                                }
                                if (r) return r !== c[0] && c.unshift(r), n[r]
                            }(h, S, a)), w = function (e, t, n, o) {
                                var i, r, a, s, c, l = {}, u = e.dataTypes.slice();
                                if (u[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                                for (r = u.shift(); r;) if (e.responseFields[r] && (n[e.responseFields[r]] = t), !c && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = r, r = u.shift()) if ("*" === r) r = c; else if ("*" !== c && c !== r) {
                                    if (!(a = l[c + " " + r] || l["* " + r])) for (i in l) if ((s = i.split(" "))[1] === r && (a = l[c + " " + s[0]] || l["* " + s[0]])) {
                                        !0 === a ? a = l[i] : !0 !== l[i] && (r = s[0], u.unshift(s[1]));
                                        break
                                    }
                                    if (!0 !== a) if (a && e.throws) t = a(t); else try {
                                        t = a(t)
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: a ? e : "No conversion from " + c + " to " + r
                                        }
                                    }
                                }
                                return {state: "success", data: t}
                            }(h, w, S, l), l ? (h.ifModified && ((x = S.getResponseHeader("Last-Modified")) && (_.lastModified[i] = x), (x = S.getResponseHeader("etag")) && (_.etag[i] = x)), 204 === e || "HEAD" === h.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = w.state, d = w.data, l = !(p = w.error))) : (p = k, !e && k || (k = "error", e < 0 && (e = 0))), S.status = e, S.statusText = (t || k) + "", l ? m.resolveWith(v, [d, k, S]) : m.rejectWith(v, [S, k, p]), S.statusCode(g), g = void 0, f && b.trigger(l ? "ajaxSuccess" : "ajaxError", [S, h, l ? d : p]), y.fireWith(v, [S, k]), f && (b.trigger("ajaxComplete", [S, h]), --_.active || _.event.trigger("ajaxStop")))
                        }

                        return S
                    },
                    getJSON: function (e, t, n) {
                        return _.get(e, t, n, "json")
                    },
                    getScript: function (e, t) {
                        return _.get(e, void 0, t, "script")
                    }
                }), _.each(["get", "post"], (function (e, t) {
                    _[t] = function (e, n, o, i) {
                        return y(n) && (i = i || o, o = n, n = void 0), _.ajax(_.extend({
                            url: e,
                            type: t,
                            dataType: i,
                            data: n,
                            success: o
                        }, _.isPlainObject(e) && e))
                    }
                })), _._evalUrl = function (e) {
                    return _.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        cache: !0,
                        async: !1,
                        global: !1,
                        throws: !0
                    })
                }, _.fn.extend({
                    wrapAll: function (e) {
                        var t;
                        return this[0] && (y(e) && (e = e.call(this[0])), t = _(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function () {
                            for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                            return e
                        })).append(this)), this
                    }, wrapInner: function (e) {
                        return y(e) ? this.each((function (t) {
                            _(this).wrapInner(e.call(this, t))
                        })) : this.each((function () {
                            var t = _(this), n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e)
                        }))
                    }, wrap: function (e) {
                        var t = y(e);
                        return this.each((function (n) {
                            _(this).wrapAll(t ? e.call(this, n) : e)
                        }))
                    }, unwrap: function (e) {
                        return this.parent(e).not("body").each((function () {
                            _(this).replaceWith(this.childNodes)
                        })), this
                    }
                }), _.expr.pseudos.hidden = function (e) {
                    return !_.expr.pseudos.visible(e)
                }, _.expr.pseudos.visible = function (e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                }, _.ajaxSettings.xhr = function () {
                    try {
                        return new n.XMLHttpRequest
                    } catch (e) {
                    }
                };
                var Ht = {0: 200, 1223: 204}, Ut = _.ajaxSettings.xhr();
                m.cors = !!Ut && "withCredentials" in Ut, m.ajax = Ut = !!Ut, _.ajaxTransport((function (e) {
                    var t, o;
                    if (m.cors || Ut && !e.crossDomain) return {
                        send: function (i, r) {
                            var a, s = e.xhr();
                            if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (a in e.xhrFields) s[a] = e.xhrFields[a];
                            for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) s.setRequestHeader(a, i[a]);
                            t = function (e) {
                                return function () {
                                    t && (t = o = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? r(0, "error") : r(s.status, s.statusText) : r(Ht[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                                }
                            }, s.onload = t(), o = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = o : s.onreadystatechange = function () {
                                4 === s.readyState && n.setTimeout((function () {
                                    t && o()
                                }))
                            }, t = t("abort");
                            try {
                                s.send(e.hasContent && e.data || null)
                            } catch (e) {
                                if (t) throw e
                            }
                        }, abort: function () {
                            t && t()
                        }
                    }
                })), _.ajaxPrefilter((function (e) {
                    e.crossDomain && (e.contents.script = !1)
                })), _.ajaxSetup({
                    accepts: {script: "text/js, application/js, application/ecmascript, application/x-ecmascript"},
                    contents: {script: /\b(?:java|ecma)script\b/},
                    converters: {
                        "text script": function (e) {
                            return _.globalEval(e), e
                        }
                    }
                }), _.ajaxPrefilter("script", (function (e) {
                    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                })), _.ajaxTransport("script", (function (e) {
                    var t, n;
                    if (e.crossDomain) return {
                        send: function (o, i) {
                            t = _("<script>").prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function (e) {
                                t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                            }), a.head.appendChild(t[0])
                        }, abort: function () {
                            n && n()
                        }
                    }
                }));
                var Gt, Wt = [], $t = /(=)\?(?=&|$)|\?\?/;
                _.ajaxSetup({
                    jsonp: "callback", jsonpCallback: function () {
                        var e = Wt.pop() || _.expando + "_" + _t++;
                        return this[e] = !0, e
                    }
                }), _.ajaxPrefilter("json jsonp", (function (e, t, o) {
                    var i, r, a,
                        s = !1 !== e.jsonp && ($t.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && $t.test(e.data) && "data");
                    if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace($t, "$1" + i) : !1 !== e.jsonp && (e.url += (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
                        return a || _.error(i + " was not called"), a[0]
                    }, e.dataTypes[0] = "json", r = n[i], n[i] = function () {
                        a = arguments
                    }, o.always((function () {
                        void 0 === r ? _(n).removeProp(i) : n[i] = r, e[i] && (e.jsonpCallback = t.jsonpCallback, Wt.push(i)), a && y(r) && r(a[0]), a = r = void 0
                    })), "script"
                })), m.createHTMLDocument = ((Gt = a.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Gt.childNodes.length), _.parseHTML = function (e, t, n) {
                    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((o = (t = a.implementation.createHTMLDocument("")).createElement("base")).href = a.location.href, t.head.appendChild(o)) : t = a), r = !n && [], (i = L.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, r), r && r.length && _(r).remove(), _.merge([], i.childNodes)));
                    var o, i, r
                }, _.fn.load = function (e, t, n) {
                    var o, i, r, a = this, s = e.indexOf(" ");
                    return s > -1 && (o = bt(e.slice(s)), e = e.slice(0, s)), y(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && _.ajax({
                        url: e,
                        type: i || "GET",
                        dataType: "html",
                        data: t
                    }).done((function (e) {
                        r = arguments, a.html(o ? _("<div>").append(_.parseHTML(e)).find(o) : e)
                    })).always(n && function (e, t) {
                        a.each((function () {
                            n.apply(this, r || [e.responseText, t, e])
                        }))
                    }), this
                }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function (e, t) {
                    _.fn[t] = function (e) {
                        return this.on(t, e)
                    }
                })), _.expr.pseudos.animated = function (e) {
                    return _.grep(_.timers, (function (t) {
                        return e === t.elem
                    })).length
                }, _.offset = {
                    setOffset: function (e, t, n) {
                        var o, i, r, a, s, c, l = _.css(e, "position"), u = _(e), f = {};
                        "static" === l && (e.style.position = "relative"), s = u.offset(), r = _.css(e, "top"), c = _.css(e, "left"), ("absolute" === l || "fixed" === l) && (r + c).indexOf("auto") > -1 ? (a = (o = u.position()).top, i = o.left) : (a = parseFloat(r) || 0, i = parseFloat(c) || 0), y(t) && (t = t.call(e, n, _.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : u.css(f)
                    }
                }, _.fn.extend({
                    offset: function (e) {
                        if (arguments.length) return void 0 === e ? this : this.each((function (t) {
                            _.offset.setOffset(this, e, t)
                        }));
                        var t, n, o = this[0];
                        return o ? o.getClientRects().length ? (t = o.getBoundingClientRect(), n = o.ownerDocument.defaultView, {
                            top: t.top + n.pageYOffset,
                            left: t.left + n.pageXOffset
                        }) : {top: 0, left: 0} : void 0
                    }, position: function () {
                        if (this[0]) {
                            var e, t, n, o = this[0], i = {top: 0, left: 0};
                            if ("fixed" === _.css(o, "position")) t = o.getBoundingClientRect(); else {
                                for (t = this.offset(), n = o.ownerDocument, e = o.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === _.css(e, "position");) e = e.parentNode;
                                e && e !== o && 1 === e.nodeType && ((i = _(e).offset()).top += _.css(e, "borderTopWidth", !0), i.left += _.css(e, "borderLeftWidth", !0))
                            }
                            return {
                                top: t.top - i.top - _.css(o, "marginTop", !0),
                                left: t.left - i.left - _.css(o, "marginLeft", !0)
                            }
                        }
                    }, offsetParent: function () {
                        return this.map((function () {
                            for (var e = this.offsetParent; e && "static" === _.css(e, "position");) e = e.offsetParent;
                            return e || ke
                        }))
                    }
                }), _.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, (function (e, t) {
                    var n = "pageYOffset" === t;
                    _.fn[e] = function (o) {
                        return G(this, (function (e, o, i) {
                            var r;
                            if (g(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === i) return r ? r[t] : e[o];
                            r ? r.scrollTo(n ? r.pageXOffset : i, n ? i : r.pageYOffset) : e[o] = i
                        }), e, o, arguments.length)
                    }
                })), _.each(["top", "left"], (function (e, t) {
                    _.cssHooks[t] = Ge(m.pixelPosition, (function (e, n) {
                        if (n) return n = Ue(e, t), Ne.test(n) ? _(e).position()[t] + "px" : n
                    }))
                })), _.each({Height: "height", Width: "width"}, (function (e, t) {
                    _.each({padding: "inner" + e, content: t, "": "outer" + e}, (function (n, o) {
                        _.fn[o] = function (i, r) {
                            var a = arguments.length && (n || "boolean" != typeof i),
                                s = n || (!0 === i || !0 === r ? "margin" : "border");
                            return G(this, (function (t, n, i) {
                                var r;
                                return g(t) ? 0 === o.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? _.css(t, n, s) : _.style(t, n, i, s)
                            }), t, a ? i : void 0, a)
                        }
                    }))
                })), _.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function (e, t) {
                    _.fn[t] = function (e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }
                })), _.fn.extend({
                    hover: function (e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    }
                }), _.fn.extend({
                    bind: function (e, t, n) {
                        return this.on(e, null, t, n)
                    }, unbind: function (e, t) {
                        return this.off(e, null, t)
                    }, delegate: function (e, t, n, o) {
                        return this.on(t, e, n, o)
                    }, undelegate: function (e, t, n) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                    }
                }), _.proxy = function (e, t) {
                    var n, o, i;
                    if ("string" == typeof t && (n = e[t], t = e, e = n), y(e)) return o = c.call(arguments, 2), (i = function () {
                        return e.apply(t || this, o.concat(c.call(arguments)))
                    }).guid = e.guid = e.guid || _.guid++, i
                }, _.holdReady = function (e) {
                    e ? _.readyWait++ : _.ready(!0)
                }, _.isArray = Array.isArray, _.parseJSON = JSON.parse, _.nodeName = j, _.isFunction = y, _.isWindow = g, _.camelCase = X, _.type = k, _.now = Date.now, _.isNumeric = function (e) {
                    var t = _.type(e);
                    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                }, void 0 === (o = function () {
                    return _
                }.apply(t, [])) || (e.exports = o);
                var Jt = n.jQuery, Xt = n.$;
                return _.noConflict = function (e) {
                    return n.$ === _ && (n.$ = Xt), e && n.jQuery === _ && (n.jQuery = Jt), _
                }, i || (n.jQuery = n.$ = _), _
            }))
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
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(1), c = n(5), l = function (e) {
                function t(t, n, o) {
                    var i = e.call(this, t, n) || this;
                    if (i.createdViews = [], i.didRegisterObservationsOfAddAndDeleteMethods = !1, i.repeat = n.repeat, n.delete && !n.add) throw new Error("you must specify an add method aside a delete method on repeated views");
                    if (!n.delete && n.add) throw new Error("you must specify a delete method aside an add method on repeated views");
                    return n.delete && (i.delete = n.delete), n.add && (i.add = n.add), n.empty ? i.emptyNote = t.localization.localized({
                        key: n.empty.localized,
                        fallback: n.empty.default
                    }) : i.emptyNote = "", i.viewDescription = n, i.factory = o, i
                }

                return i(t, e), Object.defineProperty(t.prototype, "isDynamic", {
                    get: function () {
                        return !(!this.delete || !this.add)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "repeated", {
                    get: function () {
                        return this.createdViews.slice()
                    }, enumerable: !0, configurable: !0
                }), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t, n, o, i = this;
                        return a(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    e = 0, s.label = 1;
                                case 1:
                                    return s.trys.push([1, 3, , 4]), [4, this.repetitionLength(this.repeat)];
                                case 2:
                                    return e = s.sent(), [3, 4];
                                case 3:
                                    return s.sent(), [2];
                                case 4:
                                    return t = 0, [4, this.parameterService.transaction((function () {
                                        return r(i, void 0, void 0, (function () {
                                            var n, o, i, r, s, c, l;
                                            return a(this, (function (a) {
                                                switch (a.label) {
                                                    case 0:
                                                        if (n = [], e < this.createdViews.length) for (o = this.createdViews.length - e, i = this.createdViews.splice(e, o), r = 0, s = i; r < s.length; r++) (l = s[r]).view.remove();
                                                        for (; e > this.createdViews.length;) c = this.createdViews.length, l = this.factory(this.base, this.repeatViewDescription(this.repeat, this.viewDescription, c)), this.createdViews.push(l), this.view.appendChild(l.view);
                                                        return n.push.apply(n, this.createdViews.map((function (e) {
                                                            return e.load().then((function (n) {
                                                                e.isHidden || (t += 1)
                                                            }))
                                                        }))), [4, Promise.all(n)];
                                                    case 1:
                                                        return a.sent(), [2]
                                                }
                                            }))
                                        }))
                                    }))];
                                case 5:
                                    return s.sent(), n = function (e) {
                                        for (var t = 0; t < e.length; t++) {
                                            var n = e.item(t);
                                            if (n.classList.contains("empty-note")) return n
                                        }
                                    }(this.view.children), 0 === t && this.emptyNote ? n || ((o = document.createElement("p")).classList.add("empty-note"), o.textContent = this.emptyNote, this.view.appendChild(o)) : n && n.remove(), this.isDynamic && !this.didRegisterObservationsOfAddAndDeleteMethods && (this.didRegisterObservationsOfAddAndDeleteMethods = !0, this.base.parameter.observe(this.delete, {kind: "called"}, (function (e, t) {
                                        i.unload().then((function () {
                                            return i.load()
                                        }))
                                    })), this.base.parameter.observe(this.add, {kind: "called"}, (function (e, t) {
                                        i.unload().then((function () {
                                            return i.load()
                                        }))
                                    }))), [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all(this.createdViews.map((function (e) {
                                        return e.unload()
                                    })))];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }, t.prototype.repetitionLength = function (e) {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, this.parameterService.read(e)];
                                case 1:
                                    return [2, t.sent().length]
                            }
                        }))
                    }))
                }, t.prototype.repeatViewDescription = function (e, t, n) {
                    for (var o = this, i = JSON.parse(JSON.stringify(t)), r = 0, a = ["title", "note", "value"]; r < a.length; r++) if (i[h = a[r]]) if ("string" == typeof i[h]) i[h] = c.resolveDynamicsInTemplate(i[h], n); else {
                        var s = i[h], l = this.localizationService.localized({key: s.localized, fallback: s.default});
                        s.default = c.resolveDynamicsInTemplate(l, n)
                    }
                    for (var u = 0, f = ["parameter", "repeat", "delete", "hidden", "method"]; u < f.length; u++) i[h = f[u]] && (i[h] = c.resolveDynamicsInString(i[h], n));
                    for (var d = 0, p = ["sections", "fields", "action", "confirm", "confirmdeletion"]; d < p.length; d++) {
                        var h, v = i[h = p[d]];
                        v instanceof Array ? i[h] = v.map((function (t) {
                            return null == t.repeat ? o.repeatViewDescription(e, t, n) : t
                        })) : v && null == v.repeat && (i[h] = this.repeatViewDescription(e, v, n))
                    }
                    return i
                }, t
            }(s.GenericViewController);
            t.GenericRepetitionViewController = l
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s, c = n(1), l = n(9), u = n(5);
            !function (e) {
                e.default = "default", e.action = "action", e.add = "add", e.assertive = "assertive"
            }(s = t.ActionType || (t.ActionType = {}));
            var f = function (e) {
                function t(t, n) {
                    var o = this;
                    if (void 0 === n.title) throw new Error("title are required");
                    if ("string" != typeof n.method) throw new Error("method is required");
                    return (o = e.call(this, t, n, "action", "button") || this).view.setAttribute("taid", "action-" + n.title.localized), n.title && (o.title = o.localizationService.localized({
                        key: n.title.localized,
                        fallback: n.title.default
                    })), n.note && (o.note = o.localizationService.localized({
                        key: n.note.localized,
                        fallback: n.note.default
                    })), n.confirm && (o.confirm = {
                        title: o.localizationService.localized({
                            key: n.confirm.title.localized,
                            fallback: n.confirm.title.default
                        }),
                        message: n.confirm.message ? o.localizationService.localized({
                            key: n.confirm.message.localized,
                            fallback: n.confirm.message.default
                        }) : void 0,
                        hidden: n.confirm.hidden
                    }), n.progress && (o.progress = {
                        title: o.localizationService.localized({
                            key: n.progress.title.localized,
                            fallback: n.progress.title.default
                        })
                    }), o.type = n.type && s[n.type] || s.default, o.method = n.method, o.view.addEventListener("click", (function () {
                        return o.onClick()
                    })), o
                }

                return i(t, e), t.prototype.onClick = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t, n, o = this;
                        return a(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return this.confirm ? this.confirm.hidden ? [4, u.evaluateBoolExpression(this.base, this.confirm.hidden).then((function (e) {
                                        return !e
                                    }))] : [3, 2] : [3, 5];
                                case 1:
                                    return e = i.sent(), [3, 3];
                                case 2:
                                    e = !0, i.label = 3;
                                case 3:
                                    return e ? [4, this.base.modalPresenter.showDialog(this.base, {
                                        title: this.confirm.title,
                                        message: this.confirm.message || "",
                                        primaryButton: l.DialogButton.okay,
                                        secondaryButton: l.DialogButton.cancel
                                    })] : [3, 5];
                                case 4:
                                    if (i.sent() === l.DialogButtonType.secondary) return [2];
                                    i.label = 5;
                                case 5:
                                    return t = this.methodArgumentsProvider && this.methodArgumentsProvider() || void 0, this.onActionStarted && this.onActionStarted(), this.view.classList.add("executing"), n = this.base.parameter.execute(this.method, t).then((function (e) {
                                        if (e.error) throw e.error
                                    })).catch((function (e) {
                                        return o.base.modalPresenter.showErrorDialog(o.base, {
                                            title: o.base.localization.localized({
                                                fallback: "Failed to execute method",
                                                key: "method-for-section-failed-modal-title"
                                            }),
                                            message: o.base.localization.localized({
                                                fallback: "The execution failed due to an error.",
                                                key: "method-for-section-failed-modal-message"
                                            }),
                                            detailMessage: o.method + ": " + e.message
                                        }), e
                                    })).then((function (e) {
                                        o.view.classList.remove("executing"), o.onActionFinished && o.onActionFinished(e)
                                    })), this.progress && this.base.modalPresenter.showLoadingDialog(this.base, {title: this.progress.title}, n), [2]
                            }
                        }))
                    }))
                }, t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t;
                        return a(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return "boolean" == typeof (e = this.shouldLoad()) ? [3, 2] : [4, e];
                                case 1:
                                    e = n.sent(), n.label = 2;
                                case 2:
                                    return e ? (this.view.textContent = this.title, this.type === s.default ? (this.view.classList.remove("action"), this.view.classList.remove("assertive")) : this.type === s.action ? (this.view.classList.add("action"), this.view.classList.remove("assertive")) : this.type === s.add ? (this.view.classList.add("action"), this.view.classList.remove("assertive")) : this.type === s.assertive && (this.view.classList.remove("action"), this.view.classList.add("assertive")), t = this.view, [4, this.shouldEnable()]) : [3, 4];
                                case 3:
                                    t.disabled = !n.sent(), n.label = 4;
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }, t
            }(c.GenericViewController);
            t.GenericActionViewController = f
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = n(20), i = n(64), r = function () {
                function e() {
                }

                return e.prototype.getStatus = function (e) {
                    return i.StatusCode.forCode(e) || null
                }, e.prototype.addStatusGroup = function (e, t) {
                    try {
                        new o.StatusCodeGroup(e, t)
                    } catch (e) {
                        console.error(e)
                    }
                }, e.prototype.addStatus = function (e, t) {
                    try {
                        new i.StatusCode(e, t)
                    } catch (e) {
                        console.error(e)
                    }
                }, e
            }();
            t.StatusService = r
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                Object.defineProperty(t, "__esModule", {value: !0});
                var o = n(4), i = function () {
                    function t() {
                    }

                    return t.checkItemId = function (e, t) {
                        return t.filter((function (t) {
                            return t === e
                        })).length > 0 ? (o.default.error("[Menuhelper] This item id is already existing and cannot be reused for abother item: ", e), !1) : !(e.match(/[^0-9a-z\-]/) || e.match(/--/) || e.match(/(^-)|(-$)/)) || (o.default.warn("[Menuhelper] This item id does not meet all recommendations:", e), !0)
                    }, t.getInsertionIndexForPriority = function (e, t) {
                        var n = 0;
                        return t.forEach((function (t, o) {
                            e < t && (n = o + 1)
                        })), n
                    }, t.createMenuItemElement = function (e, t, n, o, i) {
                        var r = document.createElement("li");
                        r.innerHTML = n;
                        var a = r.querySelector("a");
                        return o && i ? (r.id = "sub-menu-item-" + e, a.href = "#/" + i + "/" + e, a.setAttribute("taid", "sub-menu-" + e)) : (r.id = "main-menu-item-" + e, a.href = "#/" + e, a.setAttribute("taid", "tab-menu-" + e)), r.querySelector("span.title").textContent = t, r
                    }, t.updateMenuItemElementIds = function (e, t, n) {
                        e.id = "sub-menu-item-" + t;
                        var o = e.querySelector("a");
                        o.href = "#/" + n + "/" + t, o.setAttribute("taid", "sub-menu-" + t)
                    }, t.insertListItemElement = function (t, n, o) {
                        0 == o ? e(n).prepend(t) : o >= n.childElementCount ? e(n).append(t) : e(n).children().eq(o).before(t)
                    }, t.insertSubmenuElement = function (e, t) {
                        t.appendChild(e)
                    }, t
                }();
                t.MenuHelper = i
            }).call(this, n(8))
        }, function (e, t, n) {
            var o, i, r;
            /*!!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.2.0 (2013/11/11 03:18 PM)
 * Released under the MIT License
 */
            i = [n(71)], void 0 === (r = "function" == typeof (o = function (e) {
                return function (t) {
                    var n, o, i, r, a, s, c = t.document, l = (t.history, e.Signal), u = /#(.*)$/, f = /(\?.*)|(\#.*)/,
                        d = /^\#/, p = !1, h = "onhashchange" in t && 7 !== c.documentMode, v = p && !h,
                        b = "file:" === location.protocol;

                    function m(e) {
                        return String(e || "").replace(/\W/g, "\\$&")
                    }

                    function y(e) {
                        if (!e) return "";
                        var t = new RegExp("^" + m(n.prependHash) + "|" + m(n.appendHash) + "$", "g");
                        return e.replace(t, "")
                    }

                    function g() {
                        var e = u.exec(n.getURL()), t = e && e[1] || "";
                        try {
                            return n.raw ? t : decodeURIComponent(t)
                        } catch (e) {
                            return t
                        }
                    }

                    function w() {
                        return a ? a.contentWindow.frameHash : null
                    }

                    function x() {
                        if (a && o !== w()) {
                            var e = a.contentWindow.document;
                            e.open(), e.write("<html><head><title>" + c.title + '</title><script type="text/js">var frameHash="' + o + '";<\/script></head><body>&nbsp;</body></html>'), e.close()
                        }
                    }

                    function k(e, t) {
                        if (o !== e) {
                            var i = o;
                            o = e, v && (t ? a.contentWindow.frameHash = e : x()), n.changed.dispatch(y(e), y(i))
                        }
                    }

                    function _(e) {
                        var t = (e = Array.prototype.slice.call(arguments)).join(n.separator);
                        return t ? n.prependHash + t.replace(d, "") + n.appendHash : t
                    }

                    function S(e) {
                        return e = encodeURI(e), p && b && (e = e.replace(/\?/, "%3F")), e
                    }

                    return s = v ? function () {
                        var e = g(), t = w();
                        t !== o && t !== e ? n.setHash(y(t)) : e !== o && k(e)
                    } : function () {
                        var e = g();
                        e !== o && k(e)
                    }, (n = {
                        VERSION: "1.2.0",
                        raw: !1,
                        appendHash: "",
                        prependHash: "/",
                        separator: "/",
                        changed: new l,
                        stopped: new l,
                        initialized: new l,
                        init: function () {
                            var e, l, u;
                            r || (o = g(), h ? (l = "hashchange", u = s, (e = t).addEventListener ? e.addEventListener(l, u, !1) : e.attachEvent && e.attachEvent("on" + l, u)) : (v && (a || ((a = c.createElement("iframe")).src = "about:blank", a.style.display = "none", c.body.appendChild(a)), x()), i = setInterval(s, 25)), r = !0, n.initialized.dispatch(y(o)))
                        },
                        stop: function () {
                            var e, a, c;
                            r && (h ? (a = "hashchange", c = s, (e = t).removeEventListener ? e.removeEventListener(a, c, !1) : e.detachEvent && e.detachEvent("on" + a, c)) : (clearInterval(i), i = null), r = !1, n.stopped.dispatch(y(o)))
                        },
                        isActive: function () {
                            return r
                        },
                        getURL: function () {
                            return t.location.href
                        },
                        getBaseURL: function () {
                            return n.getURL().replace(f, "")
                        },
                        setHash: function (e) {
                            (e = _.apply(null, arguments)) !== o && (k(e), e === o && (n.raw || (e = S(e)), t.location.hash = "#" + e))
                        },
                        replaceHash: function (e) {
                            (e = _.apply(null, arguments)) !== o && (k(e, !0), e === o && (n.raw || (e = S(e)), t.location.replace("#" + e)))
                        },
                        getHash: function () {
                            return y(o)
                        },
                        getHashAsArray: function () {
                            return n.getHash().split(n.separator)
                        },
                        dispose: function () {
                            n.stop(), n.initialized.dispose(), n.stopped.dispose(), n.changed.dispose(), a = n = t.hasher = null
                        },
                        toString: function () {
                            return '[hasher version="' + n.VERSION + '" hash="' + n.getHash() + '"]'
                        }
                    }).initialized.memorize = !0, n
                }(window)
            }) ? o.apply(t, i) : o) || (e.exports = r)
        }, function (e, t, n) {
            e.exports = n.p + "images/codesys-logo.svg"
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = n(17), i = n(19), r = n(65), a = n(18), s = n(11), c = n(66), l = n(10);
            t.generate = function (e, t) {
                var n = function (e) {
                    if (function (e) {
                        return function (e) {
                            return void 0 !== e.type
                        }(e) && "textfield" === e.type
                    }(e)) return function (e, t) {
                        return new a.GenericTextfieldControlViewController(e, t)
                    };
                    if (function (e) {
                        return void 0 !== e.control
                    }(e)) return function (e, t) {
                        return new o.GenericFieldViewController(e, t)
                    };
                    if (function (e) {
                        return void 0 !== e.fields
                    }(e)) return function (e, t) {
                        return new i.GenericSectionViewController(e, t)
                    };
                    if (function (e) {
                        return void 0 !== e.sections
                    }(e)) return function (e, t) {
                        return new r.GenericFormViewController(e, t)
                    };
                    if (function (e) {
                        return void 0 !== e.method
                    }(e)) return function (e, t) {
                        return new s.GenericActionViewController(e, t)
                    };
                    if (function (e) {
                        return void 0 !== e.content
                    }(e)) return function (e, t) {
                        return new c.GenericPageViewController(e, t)
                    };
                    throw new Error("could not determine generic controller class for view description")
                }(t);
                return function (e) {
                    return void 0 !== e.repeat
                }(t) ? new l.GenericRepetitionViewController(e, t, n) : n(e, t)
            }
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }).apply(this, arguments)
            }, a = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, s = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var c = n(11), l = n(6), u = n(1), f = n(61), d = n(18), p = n(62), h = {readonly: !1}, v = function (e) {
                function t(t, n) {
                    var o = this;
                    if ("object" != typeof n.control) throw new Error("control is required");
                    var i = "field" + (n.title && "-" + n.title.localized || "");
                    switch ((o = e.call(this, t, n, i) || this).view.classList.add("field"), n.title && (o.title = o.localizationService.localized({
                        key: n.title.localized,
                        fallback: n.title.default
                    })), n.control.type) {
                        case l.ControlType.textfield:
                            o.control = new d.GenericTextfieldControlViewController(t, n.control);
                            break;
                        case l.ControlType.checkbox:
                            o.control = new f.GenericCheckboxControlViewController(t, n.control);
                            break;
                        case l.ControlType.dropdown:
                            o.control = new p.GenericDropdownControlViewController(t, n.control);
                            break;
                        default:
                            throw new Error("unsupported control type")
                    }
                    if (o.options = r(r({}, h), n.options), o.parameter = n.parameter, n.delete) {
                        if (n.action) throw new Error("using action on a field is not allowed, when a delete method is supplied!");
                        o.action = new c.GenericActionViewController(t, {
                            title: {
                                default: "Delete",
                                localized: "delete"
                            }, method: n.delete, type: "assertive", confirm: n.confirmdeletion
                        })
                    } else o.action = n.action && new c.GenericActionViewController(t, n.action);
                    return o.argument = n.argument, o.action && o.argument && (o.action.methodArgumentsProvider = function () {
                        var e;
                        return (e = {})[o.argument] = o.control.value, e
                    }), o
                }

                return i(t, e), t.prototype.isReadonly = function () {
                    return !!this.options.readonly || !!this.parameter && this.parameterService.get(this.parameter).then((function (e) {
                        return !(e.writable && "readwrite" === e.accessRights)
                    })).catch((function (e) {
                        return !0
                    }))
                }, t.prototype.load = function () {
                    return a(this, void 0, void 0, (function () {
                        var e, t = this;
                        return s(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return "boolean" == typeof (e = this.shouldLoad()) ? [3, 2] : [4, e];
                                case 1:
                                    e = n.sent(), n.label = 2;
                                case 2:
                                    return e ? [4, this.parameterService.transaction((function () {
                                        return a(t, void 0, void 0, (function () {
                                            var e, t, n, o, i, r = this;
                                            return s(this, (function (a) {
                                                switch (a.label) {
                                                    case 0:
                                                        return e = [], this.title && e.push(this.rebuildTitle(this.title, "field-title", "label")), (t = this.view.querySelector("div.control")) || (t = this.control.view, this.view.appendChild(t)), "boolean" == typeof (o = this.isReadonly()) ? (this.control.readonly = o, n = this.control.load()) : n = o.then((function (e) {
                                                            return r.control.readonly = e, r.control.load()
                                                        })), this.action && ((i = this.view.querySelector("button.action")) || (i = this.action.view, this.view.appendChild(i)), e.push(this.action.load()), this.action.onActionStarted = function () {
                                                            r.view.classList.add("submitting")
                                                        }, this.action.onActionFinished = function () {
                                                            r.view.classList.remove("submitting")
                                                        }), this.parameter && e.push(n.then((function () {
                                                            return r.parameterService.read(r.parameter).then((function (e) {
                                                                var t = e[0];
                                                                t.error ? r.control.errorneous = !0 : r.control.value = t.value
                                                            }))
                                                        }))), this.view.classList.add("loading"), [4, Promise.all(e).then((function (e) {
                                                            r.view.classList.remove("loading")
                                                        }))];
                                                    case 1:
                                                        return a.sent(), [2]
                                                }
                                            }))
                                        }))
                                    }))] : (this.control.readonly = !0, [2]);
                                case 3:
                                    return n.sent(), [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function () {
                    return a(this, void 0, void 0, (function () {
                        return s(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all([this.control.unload, this.action && this.action.unload()])];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }, t
            }(u.GenericViewController);
            t.GenericFieldViewController = v
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }).apply(this, arguments)
            }, a = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, s = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            }, c = this && this.__spreadArrays || function () {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                var o = Array(e), i = 0;
                for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                return o
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var l = n(6), u = n(5), f = function (e) {
                function t(t, n) {
                    var o = e.call(this, t, n) || this;
                    if (o.validation = {}, o.items = [], o.view.classList.add("textfield"), o.multiline = n.options && n.options.multiline || !1, o.inputElement = o.multiline ? document.createElement("textarea") : document.createElement("input"), o.multiline) {
                        var i = function () {
                            o.inputElement.style.height = "", o.inputElement.style.height = o.inputElement.scrollHeight + "px"
                        };
                        o.inputElement.addEventListener("input", i), o.inputElement.addEventListener("change", i)
                    }
                    return o.validation.pattern = n.validation && n.validation.pattern, o.validation.hint = n.validation && n.validation.hint && t.localization.localized({
                        key: n.validation.hint.localized,
                        fallback: n.validation.hint.default
                    }), o.masksCharacters = n.options && n.options.masked || !1, n.items && n.items.forEach((function (e) {
                        o.items.push({
                            repeat: e.repeat,
                            value: e.value,
                            title: t.localization.localized({key: e.title.localized, fallback: e.title.default})
                        })
                    })), o
                }

                return i(t, e), Object.defineProperty(t.prototype, "value", {
                    get: function () {
                        return this.inputElement.value
                    }, set: function (e) {
                        this.inputElement.value = e, this.inputElement.dispatchEvent(new CustomEvent("change"))
                    }, enumerable: !0, configurable: !0
                }), t.prototype.setToInitialValue = function () {
                    this.value = ""
                }, Object.defineProperty(t.prototype, "placeholder", {
                    get: function () {
                        return this.inputElement.placeholder
                    }, set: function (e) {
                        this.inputElement.placeholder = e
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "readonly", {
                    get: function () {
                        return this.inputElement.readOnly
                    }, set: function (e) {
                        e ? this.inputElement.setAttribute("readonly", "") : this.inputElement.removeAttribute("readonly"), this.inputElement.readOnly = e
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "errorneous", {
                    get: function () {
                        return this.view.classList.contains("errorneous")
                    }, set: function (e) {
                        e ? this.view.classList.add("errorneous") : this.view.classList.remove("errorneous")
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "masksCharacters", {
                    get: function () {
                        return "password" === this.inputElement.getAttribute("type")
                    }, set: function (e) {
                        this.inputElement.setAttribute("type", e ? "password" : "text")
                    }, enumerable: !0, configurable: !0
                }), t.prototype.queryInputElement = function () {
                    return this.view.querySelector("input") || this.view.querySelector("textarea")
                }, Object.defineProperty(t.prototype, "isValid", {
                    get: function () {
                        return this.inputElement.validity.valid
                    }, enumerable: !0, configurable: !0
                }), t.prototype.load = function () {
                    return a(this, void 0, void 0, (function () {
                        var e, t, n, o = this;
                        return s(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return (e = this.queryInputElement()) ? [3, 2] : (this.view.appendChild(this.inputElement), (e = this.inputElement).setAttribute("taid", "field-control"), void 0 !== this.validation.pattern && (e.setAttribute("pattern", this.validation.pattern), !1 === new RegExp(this.validation.pattern).test("") && e.setAttribute("required", "required"), (t = document.createElement("i")).classList.add("on-invalid"), this.view.appendChild(t), this.validation.hint && ((n = document.createElement("span")).classList.add("on-invalid"), n.textContent = this.validation.hint, this.view.appendChild(n)), this.inputElement.classList.add("no-validation")), e.addEventListener("input", (function () {
                                        var e = !o.inputElement.classList.contains("invalid");
                                        o.onValueChangeHandler && o.onValueChangeHandler(o.value), o.inputElement.classList.remove("no-validation"), o.inputElement.validity.valid ? (o.inputElement.classList.remove("invalid"), !e && o.onValidationChangeHandler && o.onValidationChangeHandler(!0)) : (o.inputElement.classList.add("invalid"), e && o.onValidationChangeHandler && o.onValidationChangeHandler(!1))
                                    })), [4, this.appendItems()]);
                                case 1:
                                    i.sent(), i.label = 2;
                                case 2:
                                    return this.inputElement.classList.add("no-validation"), [2]
                            }
                        }))
                    }))
                }, t.prototype.appendItems = function () {
                    return a(this, void 0, void 0, (function () {
                        var e, t = this;
                        return s(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return (e = this.view.querySelector("datalist")) || ((e = document.createElement("datalist")).id = "" + Math.random(), this.inputElement.setAttribute("list", e.id), this.view.appendChild(e)), [4, Promise.all(this.items.map((function (e, n) {
                                        if (e.repeat) return t.base.parameter.read(e.repeat).then((function (n) {
                                            var o = n.map((function (n, o) {
                                                var i = r({}, e), a = [], s = u.resolveDynamicsInTemplate(i.title, o);
                                                if (t.isTemplateString(s) ? a.push(t.resolveTemplateString(s)) : a.push(s), i.value) {
                                                    var c = u.resolveDynamicsInTemplate(i.value, o);
                                                    t.isTemplateString(c) ? a.push(t.resolveTemplateString(c)) : a.push(c)
                                                }
                                                return Promise.all(a).then((function (e) {
                                                    var t = e[0], n = e[1];
                                                    return i.title = t, i.value = n, i
                                                }))
                                            }));
                                            return Promise.all(o)
                                        }));
                                        if (t.isTemplateString(e.title)) {
                                            var o = r({}, e);
                                            return t.resolveTemplateString(e.title).then((function (e) {
                                                return o.title = e, [o]
                                            }))
                                        }
                                        return [r({}, e)]
                                    }))).then((function (e) {
                                        return e.reduce((function (e, t) {
                                            return c(e, t)
                                        }), [])
                                    }))];
                                case 1:
                                    return n.sent().forEach((function (t, n) {
                                        var o = document.createElement("option");
                                        o.value = t.value || "" + n, o.textContent = t.title, e.appendChild(o)
                                    })), [2]
                            }
                        }))
                    }))
                }, t
            }(l.GenericControlViewController);
            t.GenericTextfieldControlViewController = f
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            }, s = this && this.__spreadArrays || function () {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                var o = Array(e), i = 0;
                for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                return o
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var c = n(10), l = n(11), u = n(17), f = n(1), d = n(12), p = n(21), h = n(6), v = n(9), b = n(5),
                m = function (e) {
                    function t(t, n) {
                        var o = this;
                        if (!Array.isArray(n.fields)) throw new Error("fields are required");
                        if ((o = e.call(this, t, n, n.title && "section-" + n.title.localized) || this).view.classList.add("section"), n.title && (o.title = o.localizationService.localized({
                            key: n.title.localized,
                            fallback: n.title.default
                        })), n.note && (o.note = o.localizationService.localized({
                            key: n.note.localized,
                            fallback: n.note.default
                        })), n.confirm && (o.confirm = {
                            title: o.localizationService.localized({
                                key: n.confirm.title.localized,
                                fallback: n.confirm.title.default
                            }),
                            message: n.confirm.message ? o.localizationService.localized({
                                key: n.confirm.message.localized,
                                fallback: n.confirm.message.default
                            }) : void 0,
                            hidden: n.confirm.hidden
                        }), n.progress && (o.progress = {
                            title: o.localizationService.localized({
                                key: n.progress.title.localized,
                                fallback: n.progress.title.default
                            })
                        }), n.delete) {
                            if (n.action) throw new Error("using action on a field is not allowed, when a delete method is supplied!");
                            o.action = new l.GenericActionViewController(t, {
                                title: {
                                    default: "Delete",
                                    localized: "delete"
                                }, method: n.delete, type: "assertive", confirm: n.confirmdeletion
                            })
                        } else o.action = n.action && new l.GenericActionViewController(t, n.action);
                        o.fields = [];
                        for (var i = 0, r = n.fields; i < r.length; i++) {
                            var a = r[i];
                            if (a instanceof u.GenericFieldViewController) o.fields.push(a); else if (void 0 !== a.repeat) {
                                var s = a, f = new c.GenericRepetitionViewController(t, s, (function (e, t) {
                                    return new u.GenericFieldViewController(e, t)
                                }));
                                o.fields.push(f)
                            } else o.fields.push(new u.GenericFieldViewController(t, a))
                        }
                        return o
                    }

                    return i(t, e), t.prototype.onSubmit = function () {
                        return r(this, void 0, void 0, (function () {
                            var e, t, n, o, i, s, c = this;
                            return a(this, (function (l) {
                                switch (l.label) {
                                    case 0:
                                        return this.submittables ? this.confirm ? this.confirm.hidden ? [4, b.evaluateBoolExpression(this.base, this.confirm.hidden).then((function (e) {
                                            return !e
                                        }))] : [3, 2] : [3, 5] : [3, 6];
                                    case 1:
                                        return e = l.sent(), [3, 3];
                                    case 2:
                                        e = !0, l.label = 3;
                                    case 3:
                                        return e ? [4, this.base.modalPresenter.showDialog(this.base, {
                                            title: this.confirm.title,
                                            message: this.confirm.message || "",
                                            primaryButton: v.DialogButton.okay,
                                            secondaryButton: v.DialogButton.cancel
                                        })] : [3, 5];
                                    case 4:
                                        if (l.sent() === v.DialogButtonType.secondary) return [2];
                                        l.label = 5;
                                    case 5:
                                        for (t = [], n = 0, o = this.submittables; n < o.length; n++) (i = o[n]) instanceof u.GenericFieldViewController ? t.push(i) : t.push.apply(t, i.repeated);
                                        s = this.parameterService.transaction((function () {
                                            return r(c, void 0, void 0, (function () {
                                                var e, n, o, i, r, s, c, l, u, f, h, b = this;
                                                return a(this, (function (a) {
                                                    switch (a.label) {
                                                        case 0:
                                                            return e = [], n = t.filter((function (e) {
                                                                return void 0 !== e.parameter
                                                            })).map((function (t) {
                                                                return e.push(b.parameterService.write(t.parameter, t.control.value)), t.parameter
                                                            })), 0 === e.length ? [2] : (o = new Promise((function (e) {
                                                                return setTimeout(e, 250)
                                                            })), this.view.classList.add("submitting"), [4, Promise.all(e)]);
                                                        case 1:
                                                            return i = a.sent(), (r = i.filter((function (e) {
                                                                return void 0 !== e.error
                                                            }))).length > 0 ? (l = p.groupResultsByErrorCode(r), u = new d.StatusService, f = p.buildDetailMessageString(u, l), [4, this.base.modalPresenter.showErrorDialog(this.base, {
                                                                title: this.base.localization.localized({
                                                                    fallback: "Failed to write values",
                                                                    key: "write-for-section-failed-modal-title"
                                                                }),
                                                                message: this.base.localization.localized({
                                                                    fallback: "Errors occured while trying to write parameters. No changes have been applied.",
                                                                    key: "write-for-section-failed-for-all-modal-message"
                                                                }),
                                                                detailMessage: f
                                                            })]) : [3, 3];
                                                        case 2:
                                                            return a.sent(), [3, 9];
                                                        case 3:
                                                            return [4, this.parameterService.commit(n)];
                                                        case 4:
                                                            return s = a.sent(), (c = s.filter((function (e) {
                                                                return void 0 !== e.error
                                                            }))).length > 0 ? (l = p.groupResultsByErrorCode(c), u = new d.StatusService, f = p.buildDetailMessageString(u, l), h = c.length === s.length ? this.base.localization.localized({
                                                                fallback: "Errors occured while trying to write parameters. However, some changes may have been applied though.",
                                                                key: "write-for-section-failed-for-all-modal-message"
                                                            }) : this.base.localization.localized({
                                                                fallback: "Errors occured while trying to write some parameters. However, changes may have been applied to the others.",
                                                                key: "write-for-section-failed-for-some-modal-message"
                                                            }), [4, this.base.modalPresenter.showErrorDialog(this.base, {
                                                                title: this.base.localization.localized({
                                                                    fallback: "Failed to write values",
                                                                    key: "write-for-section-failed-modal-title"
                                                                }),
                                                                message: h,
                                                                detailMessage: f,
                                                                secondaryButton: {
                                                                    title: "Reload Values",
                                                                    style: v.DialogButtonStyle.default
                                                                }
                                                            })]) : [3, 8];
                                                        case 5:
                                                            return a.sent() !== v.DialogButtonType.secondary ? [3, 7] : [4, this.load()];
                                                        case 6:
                                                            a.sent(), a.label = 7;
                                                        case 7:
                                                            return [3, 9];
                                                        case 8:
                                                            this.submitButton.disabled = !0, a.label = 9;
                                                        case 9:
                                                            return o.then((function () {
                                                                return b.view.classList.remove("submitting")
                                                            })), [2]
                                                    }
                                                }))
                                            }))
                                        })), this.progress && this.base.modalPresenter.showLoadingDialog(this.base, {title: this.progress.title}, s), l.label = 6;
                                    case 6:
                                        return [2]
                                }
                            }))
                        }))
                    }, t.prototype.rebuildActionsBody = function () {
                        for (var e = this, t = [], n = [], o = 0, i = this.fields; o < i.length; o++) {
                            var r = i[o];
                            if (r instanceof u.GenericFieldViewController) r.parameter && !r.control.readonly && t.push(r), r.argument && n.push(r); else {
                                var a = r.repeated[0];
                                a && !a.control.readonly && t.push(r)
                            }
                        }
                        var s = [];
                        if (this.action && (s.push(this.action.view), this.action.methodArgumentsProvider = function () {
                            return n.reduce((function (e, t) {
                                return e[t.argument] = t.control.value, t.control.type === h.ControlType.textfield && t.control.masksCharacters && (t.control.value = "", t.control.load()), e
                            }), {})
                        }, this.methodButton.disabled = this.action.isDisabled || n.some((function (e) {
                            return !e.control.isValid
                        })), this.action.onActionStarted = function () {
                            e.view.classList.add("submitting")
                        }, this.action.onActionFinished = function (t) {
                            if (e.view.classList.remove("submitting"), e.action.type === l.ActionType.add && !t) for (var o = 0, i = n; o < i.length; o++) i[o].control.setToInitialValue()
                        }), t.length > 0) {
                            var c = this.view.querySelector("button.submit-button");
                            c || ((c = document.createElement("button")).classList.add("submit-button"), c.classList.add("action"), c.textContent = "Submit", c.setAttribute("taid", "section-submit-button"), c.addEventListener("click", (function () {
                                return e.onSubmit()
                            }))), s.push(c), c.disabled = !0, this.submittables = t
                        }
                        return this.rebuildBody(s, "div.actions")
                    }, Object.defineProperty(t.prototype, "submitButton", {
                        get: function () {
                            return this.view.querySelector("button.submit-button")
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "methodButton", {
                        get: function () {
                            return this.action && this.action.view
                        }, enumerable: !0, configurable: !0
                    }), t.prototype.load = function () {
                        return r(this, void 0, void 0, (function () {
                            var e, t = this;
                            return a(this, (function (n) {
                                switch (n.label) {
                                    case 0:
                                        return n.trys.push([0, 3, , 4]), "boolean" == typeof (e = this.shouldLoad()) ? [3, 2] : [4, e];
                                    case 1:
                                        if (!(e = n.sent())) return [2];
                                        n.label = 2;
                                    case 2:
                                        return [3, 4];
                                    case 3:
                                        return n.sent(), [2];
                                    case 4:
                                        return [4, this.parameterService.transaction((function () {
                                            return r(t, void 0, void 0, (function () {
                                                var e, t = this;
                                                return a(this, (function (n) {
                                                    switch (n.label) {
                                                        case 0:
                                                            return e = [], this.title ? (e.push(this.rebuildTitle(this.title, "section-title")), this.view.classList.add("titled-section")) : this.view.classList.remove("titled-section"), this.note && e.push(this.rebuildNote(this.note, "section-note")), e.push(this.rebuildBody(this.fields.map((function (e) {
                                                                return e.view
                                                            })), "div.section-body")), e.push(Promise.all(s(this.fields.map((function (e) {
                                                                return e.load()
                                                            })), [this.action && this.action.load()])).then((function () {
                                                                return t.rebuildActionsBody()
                                                            }))), this.view.classList.add("loading"), [4, Promise.all(e)];
                                                        case 1:
                                                            return n.sent(), this.view.classList.remove("loading"), [2]
                                                    }
                                                }))
                                            }))
                                        }))];
                                    case 5:
                                        return n.sent(), this.registerForFieldChanges(), [2]
                                }
                            }))
                        }))
                    }, t.prototype.unload = function () {
                        return r(this, void 0, void 0, (function () {
                            return a(this, (function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Promise.all(this.fields.map((function (e) {
                                            return e.unload()
                                        })))];
                                    case 1:
                                        return e.sent(), [2]
                                }
                            }))
                        }))
                    }, t.prototype.registerForFieldChanges = function () {
                        var e = this, t = this.fields.reduce((function (e, t) {
                            return t instanceof c.GenericRepetitionViewController ? e.push.apply(e, t.repeated) : e.push(t), e
                        }), []), n = t.filter((function (e) {
                            return void 0 !== e.parameter
                        })), o = t.filter((function (e) {
                            return void 0 !== e.argument
                        }));
                        n.forEach((function (t) {
                            t.control.onChange((function () {
                                var t = e.submitButton;
                                t && (t.disabled = n.some((function (e) {
                                    return !e.control.isValid
                                })))
                            })), t.control.onValidationChange((function (t) {
                                var o = e.submitButton;
                                o && (o.disabled = !t || n.some((function (e) {
                                    return !e.control.isValid
                                })))
                            }))
                        })), o.forEach((function (t) {
                            t.control.onChange((function () {
                                var t = e.methodButton;
                                t && (t.disabled = o.some((function (e) {
                                    return !e.control.isValid
                                })))
                            })), t.control.onValidationChange((function (t) {
                                var n = e.methodButton;
                                n && (n.disabled = !t || o.some((function (e) {
                                    return !e.control.isValid
                                })))
                            }))
                        }))
                    }, t
                }(f.GenericViewController);
            t.GenericSectionViewController = m
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = function () {
                function e(t, n) {
                    if (e.forCode(t)) throw new Error("status group code is already taken");
                    this.code = t, this.description = n, e.codes[t] = this
                }

                return e.forCode = function (e) {
                    return this.codes[e] || null
                }, e.codes = {}, e
            }();
            t.StatusCodeGroup = o
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), t.groupResultsByErrorCode = function (e) {
                return e.reduce((function (e, t) {
                    if (t.error) {
                        var n = t.error.statusCode || "unknownError";
                        (e[n] || (e[n] = [])).push(t)
                    } else (e.noError || (e.noError = [])).push(t);
                    return e
                }), {})
            }, t.buildDetailMessageString = function (e, t) {
                var n = "";
                for (var o in t) if ("noError" !== o) {
                    var i = parseInt(o, 10), r = i && e.getStatus(i), a = t[o].reduce((function (e, t) {
                        return e.some((function (e) {
                            return e.error.message === t.error.message
                        })) || e.push(t), e
                    }), []);
                    a && (n += r ? (n ? "\n" : "") + "Error " + r.code + ": " + r.description + ":\n" : (n ? "\n" : "") + "Unexpected Errors:\n", n += "  " + a.map((function (e) {
                        return e.error.message
                    })).join("\n  "))
                }
                return n
            }
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = function (e) {
                function t(t) {
                    var o = e.call(this, t) || this;
                    o.view = document.createElement("wbm-core-page-not-found"), o.view.innerHTML = n(72);
                    var i = o.view.querySelector("h2"), r = o.view.querySelector("p");
                    return i.textContent = t.localization.localized({
                        key: "page-not-found-title",
                        fallback: "The requested page is not accessible"
                    }), r.textContent = t.localization.localized({
                        key: "page-not-found-message",
                        fallback: "There is no content available for this URL. Either you are missing previleges or there is no content available at all."
                    }), o
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t
            }(n(0).ViewController);
            t.PageNotFoundController = s
        }, function (e, t) {
            e.exports = "<a href=# draggable=false> <span class=title> </span> </a>"
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = function () {
                function e() {
                    this.userAgent = navigator.userAgent
                }

                return Object.defineProperty(e.prototype, "runsInTouchMode", {
                    get: function () {
                        return "ontouchstart" in window || navigator.maxTouchPoints > 0 || this.isWAGOPanelBrowser
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e.prototype, "isWAGOPanelBrowser", {
                    get: function () {
                        return /QtWebEngine/.test(this.userAgent)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e.prototype, "isGPUPerformanceCritical", {
                    get: function () {
                        return this.isWAGOPanelBrowser
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e.prototype, "needsContentUpscaling", {
                    get: function () {
                        return this.isWAGOPanelBrowser
                    }, enumerable: !0, configurable: !0
                }), e
            }();
            t.Browser = o
        }, function (e, t, n) {
            "use strict";

            function o(e) {
                for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
            }

            Object.defineProperty(t, "__esModule", {value: !0});
            var i = n(26);
            t.ui = i;
            var r = n(56);
            t.Login = r.Login;
            var a = n(16);
            t.viewGenerator = a;
            var s = n(67);
            t.subframeGenerator = s;
            var c = n(76);
            o(n(81)), o(n(82)), o(n(83));
            var l = n(86), u = document.querySelector("body");
            if (!u) throw new Error("WBM Core requires an html body element in the current document");
            var f = l.default(u), d = new c.ModalPresenter(f.frame);
            t.modalPresenter = d;
            var p = n(4);
            t.logger = p.default;
            var h = new (n(12).StatusService);
            t.status = h, t.default = f;
            var v = n(24), b = n(105), m = new v.Browser, y = Object.freeze({
                userAgent: m.userAgent,
                browserType: m.isWAGOPanelBrowser ? b.BrowserType.eDisplay : m.runsInTouchMode ? b.BrowserType.touch : b.BrowserType.desktop
            });
            t.browser = y
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), n(27), function (e) {
                for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
            }(n(54))
        }, function (e, t, n) {
            var o = n(28);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            (t = e.exports = n(2)(!1)).i(n(29), "");
            var o = n(7), i = o(n(34)), r = o(n(35)), a = o(n(36)), s = o(n(37)), c = o(n(38)), l = o(n(39)),
                u = o(n(40)), f = o(n(41)), d = o(n(42)), p = o(n(43)), h = o(n(44)), v = o(n(45)), b = o(n(46)),
                m = o(n(47)), y = o(n(48)), g = o(n(49)), w = o(n(50)), x = o(n(51)), k = o(n(52)), _ = o(n(53));
            t.push([e.i, '@font-face{font-family:"Open Sans";font-style:normal;font-display:swap;font-weight:300;src:local("Open Sans Light "),local("Open Sans-Light"),url(' + i + ') format("woff2"),url(' + r + ') format("woff")}@font-face{font-family:"Open Sans";font-style:italic;font-display:swap;font-weight:300;src:local("Open Sans Light italic"),local("Open Sans-Lightitalic"),url(' + a + ') format("woff2"),url(' + s + ') format("woff")}@font-face{font-family:"Open Sans";font-style:normal;font-display:swap;font-weight:400;src:local("Open Sans Regular "),local("Open Sans-Regular"),url(' + c + ') format("woff2"),url(' + l + ') format("woff")}@font-face{font-family:"Open Sans";font-style:italic;font-display:swap;font-weight:400;src:local("Open Sans Regular italic"),local("Open Sans-Regularitalic"),url(' + u + ') format("woff2"),url(' + f + ') format("woff")}@font-face{font-family:"Open Sans";font-style:normal;font-display:swap;font-weight:600;src:local("Open Sans SemiBold "),local("Open Sans-SemiBold"),url(' + d + ') format("woff2"),url(' + p + ') format("woff")}@font-face{font-family:"Open Sans";font-style:italic;font-display:swap;font-weight:600;src:local("Open Sans SemiBold italic"),local("Open Sans-SemiBolditalic"),url(' + h + ') format("woff2"),url(' + v + ') format("woff")}@font-face{font-family:"Open Sans";font-style:normal;font-display:swap;font-weight:700;src:local("Open Sans Bold "),local("Open Sans-Bold"),url(' + b + ') format("woff2"),url(' + m + ') format("woff")}@font-face{font-family:"Open Sans";font-style:italic;font-display:swap;font-weight:700;src:local("Open Sans Bold italic"),local("Open Sans-Bolditalic"),url(' + y + ') format("woff2"),url(' + g + ') format("woff")}@font-face{font-family:"Open Sans";font-style:normal;font-display:swap;font-weight:800;src:local("Open Sans ExtraBold "),local("Open Sans-ExtraBold"),url(' + w + ') format("woff2"),url(' + x + ') format("woff")}@font-face{font-family:"Open Sans";font-style:italic;font-display:swap;font-weight:800;src:local("Open Sans ExtraBold italic"),local("Open Sans-ExtraBolditalic"),url(' + k + ') format("woff2"),url(' + _ + ') format("woff")}*{box-sizing:border-box}html,body,ul{padding:0;margin:0}body{box-sizing:border-box;color:#212121}body,input,button{font-family:"Open Sans",sans-serif;font-size:13px;font-weight:400}p,div.form p.note{margin:0}ul{list-style:none}h1,h2{font-weight:100;font-size:23px;margin:17px 0}h3{font-weight:400;font-size:17px}h4{font-weight:400;font-size:14px}::selection{background-color:#395e74;color:#fff}:focus{outline:none}::-moz-focus-inner{border:0}.icon,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=checkbox][readonly]+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,div.form.collapsible>span.icon-warning.title:after,div.modal.error>span.icon-warning.title:before,div.modal.warning>span.title:before,div.modal.info>span.icon-warning.title:before,p.icon-warning.note:before,div.form p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before,input[type=checkbox][readonly]+span.icon-warning.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=checkbox][readonly]+span.icon-info.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,div.form.collapsible>span.icon-error.title:after,div.modal.error>span.title:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,p.icon-error.note:before,div.form p.icon-error.note:before,p.icon-error.info:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=checkbox][readonly]+span.icon-error.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,div.form.collapsible>span.icon-error-outline.title:after,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,p.icon-error-outline.note:before,div.form p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=checkbox][readonly]+span.icon-info.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,div.form.collapsible>span.icon-checkmark.title:after,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,p.icon-checkmark.note:before,div.form p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,div.form.collapsible>span.icon-crossmark.title:after,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,p.icon-crossmark.note:before,div.form p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before,p.icon-arrow-down.note:before,div.form p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,div.form.collapsible>span.icon-exit.title:after,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,p.icon-exit.note:before,div.form p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,.icon.icon-exit:before{content:"exit_to_app"}.icon,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=checkbox][readonly]+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,div.form.collapsible>span.icon-warning.title:after,div.modal.error>span.icon-warning.title:before,div.modal.warning>span.title:before,div.modal.info>span.icon-warning.title:before,p.icon-warning.note:before,div.form p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before,input[type=checkbox][readonly]+span.icon-warning.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=checkbox][readonly]+span.icon-info.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,div.form.collapsible>span.icon-error.title:after,div.modal.error>span.title:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,p.icon-error.note:before,div.form p.icon-error.note:before,p.icon-error.info:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=checkbox][readonly]+span.icon-error.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,div.form.collapsible>span.icon-error-outline.title:after,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,p.icon-error-outline.note:before,div.form p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=checkbox][readonly]+span.icon-info.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,div.form.collapsible>span.icon-checkmark.title:after,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,p.icon-checkmark.note:before,div.form p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,div.form.collapsible>span.icon-crossmark.title:after,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,p.icon-crossmark.note:before,div.form p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before,p.icon-arrow-down.note:before,div.form p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,div.form.collapsible>span.icon-exit.title:after,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,p.icon-exit.note:before,div.form p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,.icon.icon-exit:before{content:"exit_to_app"}input[type=text],input[type=password],textarea{position:relative;height:34px;padding:0 8.5px;border:1px solid #ccc;border-radius:2px;background:#fff;outline:none;box-shadow:none}input[type=text]:focus,input[type=password]:focus,textarea:focus{box-shadow:0 0 0 3px rgba(33,33,33,.15)}input[type=text]~.on-invalid,input[type=password]~.on-invalid,textarea~.on-invalid{display:none}input[type=text]:invalid:not(.no-validation),input[type=password]:invalid:not(.no-validation),textarea:invalid:not(.no-validation){color:#bd3821;border-color:#e15940}input[type=text]:invalid:not(.no-validation)~i.on-invalid,input[type=password]:invalid:not(.no-validation)~i.on-invalid,textarea:invalid:not(.no-validation)~i.on-invalid{display:inline-block;vertical-align:middle}input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before{position:relative;display:inline-block;width:25.5px;vertical-align:top;margin-left:-25.5px;border-top-right-radius:2px;border-bottom-right-radius:2px;color:#e15940;text-align:center}input[type=text]:invalid:not(.no-validation)~span.on-invalid,input[type=password]:invalid:not(.no-validation)~span.on-invalid,textarea:invalid:not(.no-validation)~span.on-invalid{position:relative;height:0;display:block;font-size:11px;color:#bd3821;font-weight:600}input[type=text][readonly],input[readonly][type=password],textarea[readonly]{background:transparent;border:none;padding-left:0;cursor:default;outline:none;box-shadow:none;overflow:hidden;text-overflow:ellipsis}textarea{font:inherit;min-height:34px;overflow:hidden;resize:none;padding:8.5px 8.5px;width:100%}.larger input[type=text],.larger input[type=password]{height:51px}.larger textarea{min-height:51px}input[type=checkbox]{position:relative;display:inline-block;height:17px;width:17px;opacity:0;margin:0;cursor:pointer;vertical-align:middle}input[type=checkbox]+span.checkbox{pointer-events:none;position:relative;display:inline-block;left:-17px;height:17px;width:17px;background:#fff;border:1px solid #b60909;border-radius:2px;vertical-align:middle;margin:8.5px 0}input[type=checkbox]:not([readonly]):focus+span.checkbox{box-shadow:0 0 0 3px rgba(33,33,33,.15)}input[type=checkbox]:not([readonly]):hover+span.checkbox{background:rgba(227,0,15,.1)}input[type=checkbox]:not([readonly]):active+span.checkbox{background:rgba(227,0,15,.2)}input[type=checkbox]:not([readonly]):disabled{cursor:default}input[type=checkbox]:not([readonly]):disabled+span.checkbox{background:#fff;border-color:#adadad}input[type=checkbox]:not([readonly]):checked+span.checkbox{background:#e3000f}input[type=checkbox]:not([readonly]):checked+span.checkbox:after{position:absolute;color:#fff;vertical-align:top}input[type=checkbox]:not([readonly]):checked:hover+span.checkbox{background:#d1050c}input[type=checkbox]:not([readonly]):checked:active+span.checkbox{background:#a50b02}input[type=checkbox]:not([readonly]):checked:disabled+span.checkbox{background:#adadad;border-color:#818181}input[type=checkbox][readonly]{cursor:default;pointer-events:none}input[type=checkbox][readonly]+span.checkbox{pointer-events:none;border-color:transparent;cursor:default;outline:none;box-shadow:none;border:none;background:none;padding-left:21px}input[type=checkbox][readonly]+span.checkbox:after{position:absolute;vertical-align:top;left:0;top:1px;font-weight:bold}input[type=checkbox][readonly]:not(:checked)+span.checkbox:after{color:#e15940}input[type=checkbox][readonly]:checked+span.checkbox:after{color:#e3000f}.larger input[type=checkbox]{height:25px;width:25px}.larger input[type=checkbox]+span.checkbox{left:-25px;height:25px;width:25px}.larger input[type=checkbox]+span.checkbox:after{font-size:20px !important;left:1px;top:2px}.icon,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]+span.checkbox:after{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,div.form.collapsible>span.icon-warning.title:after,div.modal.error>span.icon-warning.title:before,div.modal.warning>span.title:before,div.modal.info>span.icon-warning.title:before,p.icon-warning.note:before,div.form p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=checkbox][readonly]+span.icon-warning.checkbox:after{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,div.form.collapsible>span.icon-error.title:after,div.modal.error>span.title:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,p.icon-error.note:before,div.form p.icon-error.note:before,p.icon-error.info:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=checkbox][readonly]+span.icon-error.checkbox:after{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,div.form.collapsible>span.icon-error-outline.title:after,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,p.icon-error-outline.note:before,div.form p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,div.form.collapsible>span.icon-checkmark.title:after,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,p.icon-checkmark.note:before,div.form p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,div.form.collapsible>span.icon-crossmark.title:after,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,p.icon-crossmark.note:before,div.form p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before,p.icon-arrow-down.note:before,div.form p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,div.form.collapsible>span.icon-exit.title:after,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,p.icon-exit.note:before,div.form p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,.icon.icon-exit:before{content:"exit_to_app"}p,div.form p.note{border-radius:2px;padding:8.5px;font-size:12px;font-style:italic;display:block}p.note,div.form p.note,p.info,div.form p.note,div.form p.info.note,div.form p.note,p.error,div.form p.error.note,p.warning,div.form p.warning.note{padding-left:28px;border:1px solid}p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before{position:relative;top:3px;margin-left:-20px;margin-right:5px}p.note,div.form p.note,p.info,div.form p.note,div.form p.info.note,div.form p.note{border-color:#69addb;background:rgba(105,173,219,.05)}p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before{color:#69addb}p.error,div.form p.error.note{border-color:#e15940;background:rgba(225,89,64,.05)}p.error:before,div.form p.error.note:before{color:#e15940}p.warning,div.form p.warning.note{border-color:#eec211;background:rgba(238,194,17,.05)}p.warning:before,div.form p.warning.note:before{color:#eec211}button{display:inline-block;width:102px;height:34px;background:#fff;border:1px solid #b60909;border-radius:2px;color:#b60909;cursor:pointer;outline:none}button:focus{box-shadow:0 0 0 3px rgba(33,33,33,.15)}button:hover{background:rgba(227,0,15,.1)}button:active{background:rgba(227,0,15,.2)}button.action{background:#e3000f;color:#fff;border:1px solid #b60909}button.action:hover{background:#d1050c}button.action:active{background:#a50b02}button.assertive,div.modal.error button{border:1px solid #bd3821;background:#fff;color:#bd3821}button.assertive:hover,div.modal.error button:hover{background:rgba(225,89,64,.1)}button.assertive:active,div.modal.error button:active{background:rgba(225,89,64,.2)}button.assertive.action,div.modal.error button.action{background:#e15940;color:#fff;border:1px solid #bd3821}button.assertive.action:hover,div.modal.error button.action:hover{background:#db3f22}button.assertive.action:active,div.modal.error button.action:active{background:#bc361e}button.warning,div.modal.warning button{border:1px solid #e1b214;background:#fff;color:#e1b214}button.warning:hover,div.modal.warning button:hover{background:rgba(238,194,17,.1)}button.warning:active,div.modal.warning button:active{background:rgba(238,194,17,.2)}button.warning.action,div.modal.warning button.action{background:#eec211;color:#fff;border:1px solid #e1b214}button.warning.action:hover,div.modal.warning button.action:hover{background:#cda70f}button.warning.action:active,div.modal.warning button.action:active{background:#ab8c0c}button.info,div.modal.info button{border:1px solid #395e74;background:#fff;color:#395e74}button.info:hover,div.modal.info button:hover{background:rgba(105,173,219,.1)}button.info:active,div.modal.info button:active{background:rgba(105,173,219,.2)}button.info.action,div.modal.info button.action{background:#69addb;color:#fff;border:1px solid #395e74}button.info.action:hover,div.modal.info button.action:hover{background:#4c9dd4}button.info.action:active,div.modal.info button.action:active{background:#318dcc}button:disabled{cursor:default;border:1px solid #a4a4a4;color:#a4a4a4}button:disabled.action{background:#c4c4c4;color:#fff}.larger button{width:102px;height:51px}.overlay{top:0;left:0;position:absolute;display:block;z-index:100;width:100%;height:100%;background:rgba(255,255,255,.5)}.overlay>:not(:last-child){display:none}.indicator{position:relative;display:block;background:#e2edce;border:1px solid #dce5cc;border-radius:2px;width:17px;height:17px;margin-left:20px;animation:keyframes-indicator 1.2s infinite;animation-delay:.4s;margin-bottom:34px}.indicator:after,.indicator:before{content:" ";background:#e2edce;border:1px solid #dce5cc;box-sizing:inherit;display:block;position:relative;border-radius:inherit;width:inherit;height:inherit;top:-1px}.indicator:before{left:-20px}.indicator:after{top:-18px;right:-18px}.indicator:before{animation:inherit;animation-delay:0s}.indicator:after{animation:inherit;animation-delay:.8s}.indicator>span{position:absolute;display:inline-block;top:17px;left:-34px;width:85px;text-align:center}@keyframes keyframes-indicator{0%{background:#e2edce;border-color:#dce5cc}25%{background:#e2edce;border-color:#dce5cc}35%{background:#e3000f;border-color:#b60909}65%{background:#e3000f;border-color:#b60909}75%{background:#e2edce;border-color:#dce5cc}100%{background:#e2edce;border-color:#dce5cc}}div.modal{position:absolute;display:block;margin:auto;left:0;right:0;top:0;bottom:0;background-color:#fff;border-radius:2px;border:1px solid #ccc;box-shadow:0 0 34px 0 rgba(0,0,0,.15)}.icon,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]+span.checkbox:after,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,div.form.collapsible>span.icon-warning.title:after,div.modal.error>span.icon-warning.title:before,div.modal.warning>span.title:before,div.modal.info>span.icon-warning.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=checkbox][readonly]+span.icon-warning.checkbox:after,p.icon-warning.note:before,div.form p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,div.form.collapsible>span.icon-error.title:after,div.modal.error>span.title:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=checkbox][readonly]+span.icon-error.checkbox:after,p.icon-error.note:before,div.form p.icon-error.note:before,p.icon-error.info:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,div.form.collapsible>span.icon-error-outline.title:after,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,p.icon-error-outline.note:before,div.form p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.modal.info>span.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,div.form.collapsible>span.icon-checkmark.title:after,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,p.icon-checkmark.note:before,div.form p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,div.form.collapsible>span.icon-crossmark.title:after,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,p.icon-crossmark.note:before,div.form p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,div.form.collapsible>span.title:after,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after,p.icon-arrow-down.note:before,div.form p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,div.form.collapsible>span.icon-exit.title:after,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,p.icon-exit.note:before,div.form p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,.icon.icon-exit:before{content:"exit_to_app"}div.modal{max-height:260px;max-width:310px;height:377px;width:449.5px;transition:max-height .25s ease-in-out,max-width .25s ease-in-out}div.modal.enlarge{max-height:377px;max-width:449.5px}div.modal>span.title{text-align:initial;font-size:17px;display:block;padding:0 17px;height:51px;line-height:51px;color:#b60909;background-color:rgba(227,0,15,.1)}div.modal>span.sub-title{text-align:initial;display:block;padding:0 17px;height:51px;line-height:51px;color:#212121}div.modal>span.sub-title+div.message{padding-top:0px}div.modal>div.message{text-align:initial;padding:0 17px;padding-top:17px;overflow:hidden;text-overflow:ellipsis}div.modal>.message+.indicator{margin-top:34px}div.modal>.detail-message{padding:9px 17px;margin-top:9px;background:#f5f2f1;height:137px;overflow:auto;white-space:pre}div.modal>.show-details{cursor:pointer;width:100%;display:block;margin-top:17px;color:#aaa;text-align:left;padding-left:17px}div.modal>.show-details:hover{color:#212121}div.modal .buttons{text-align:right;position:absolute;padding-bottom:17px;padding-top:17px;bottom:0;width:100%;background:inherit}div.modal>button,div.modal>.buttons>button{margin-right:9px}div.modal>button:last-child,div.modal>.buttons>button:last-child{margin-right:17px}div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before{margin-right:5px;font-size:20px;line-height:inherit;vertical-align:middle}div.modal.error>span.sub-title,div.modal.warning>span.sub-title,div.modal.info>span.sub-title{font-weight:bold}div.modal.error>span.title{color:#bd3821;background-color:rgba(225,89,64,.1)}div.modal.warning>span.title{color:#e1b214;background-color:rgba(238,194,17,.1)}div.modal.info>span.title{color:#395e74;background-color:rgba(105,173,219,.1)}div.modal>.indicator{margin:auto;margin-top:70px}.larger div.modal{max-height:277px;max-width:344px;height:401.65px;width:498.8px}.larger div.modal.enlarge{max-height:401.65px;max-width:498.8px}.icon,.select-wrapper:after,div.form.collapsible>span.title:after,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]+span.checkbox:after,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,div.form.collapsible>span.icon-warning.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=checkbox][readonly]+span.icon-warning.checkbox:after,p.icon-warning.note:before,div.form p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before,div.modal.error>span.icon-warning.title:before,div.modal.info>span.icon-warning.title:before,div.modal.warning>span.title:before{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,div.modal.info>span.title:before{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,div.form.collapsible>span.icon-error.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=checkbox][readonly]+span.icon-error.checkbox:after,p.icon-error.note:before,div.form p.icon-error.note:before,p.icon-error.info:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,p.error:before,div.form p.error.note:before,p.warning:before,div.form p.warning.note:before,div.modal.error>span.title:before{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,div.form.collapsible>span.icon-error-outline.title:after,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,p.icon-error-outline.note:before,div.form p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,div.form.collapsible>span.icon-info.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,div.form p.icon-info.error.note:before,p.icon-info.warning:before,div.form p.icon-info.warning.note:before,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,p.note:before,div.form p.note:before,p.info:before,div.form p.note:before,div.form p.info.note:before,div.form p.note:before,div.modal.info>span.title:before{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,div.form.collapsible>span.icon-info-outline.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,div.form p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,div.form.collapsible>span.icon-checkmark.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,p.icon-checkmark.note:before,div.form p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,div.form.collapsible>span.icon-crossmark.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,p.icon-crossmark.note:before,div.form p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,div.form.collapsible>span.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after,p.icon-arrow-down.note:before,div.form p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,div.form.collapsible>span.icon-exit.title:after,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,p.icon-exit.note:before,div.form p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,.icon.icon-exit:before{content:"exit_to_app"}div.form{min-width:340px;max-width:480px;border:1px solid #ccc;border-radius:2px;margin:17px 0;overflow:hidden;max-height:10000px;transition:max-height 2s ease-in-out}div.form>span.title{position:relative;display:block;padding:0 9px;height:34px;line-height:34px;font-size:15px;background:#f6f6f6}div.form.collapsible>span.title{cursor:pointer}div.form.collapsible>span.title:after{transform:rotate(180deg);display:block;position:absolute;right:9px;top:9px;transition:transform .2s ease-out}div.form.collapsed>span.title:after{transform:rotate(0deg)}div.form.collapsed>div.body{display:none}div.form p.note,div.form p.note{margin:17px 9px;white-space:pre-wrap}div.form>p.note,div.form>p.note{margin-bottom:17px}div.form div.section.titled-section{margin-top:24px;padding-top:10px;border-top:1px solid #ccc !important}div.form div.section:not(:last-child){padding-bottom:9px;margin-bottom:9px}div.form div.section>span.title{background:#fefefe;position:relative;margin-left:7px;top:-19px;padding:2px 2px;height:13px;line-height:13px;font-weight:600}div.form div.section{border-top:1px solid #ccc}div.form div.body>div.section:first-child{border-top:none}div.form div.body>*:first-child>div.section:first-child{border-top:none}div.form div.field{display:table;width:100%;height:34px;min-height:34px;padding:9px 9px}div.form div.field>label{display:table-cell;width:153px;min-width:153px;padding-right:17px;vertical-align:middle;font-weight:600}div.form div.field>div.control{display:table-cell;left:0;right:0;width:100%;vertical-align:middle}div.form div.field>div.control>input[type=text],div.form div.field>div.control>input[type=password],div.form div.field>div.control>input[type=number],div.form div.field>div.control select{width:100%}div.form div.field>div.control+button{margin-left:9px}div.form div.actions{padding:9px;text-align:right}div.form div.actions>button{margin-left:9px;min-width:102px;width:auto}div.form>*{opacity:1;transition:opacity .15s ease-in}div.form.loading{height:120px;max-height:120px}div.form.loading>p.note,div.form.loading>div.body{opacity:0}div.form div.section>p.note,div.form div.section>div.section-body{transition:opacity .15s ease-in}div.form div.section.loading>p.note,div.form div.section.loading>div.section-body{opacity:.5}div.form div.section.submitting div.field,div.form div.section.submitting div.actions>button,div.form div.section div.field.submitting,div.form div.section div.actions>button.executing{pointer-events:none;cursor:default;opacity:.25}.larger div.form>span.title{height:51px;line-height:51px}.larger div.form div.field{min-height:51px}@media only screen and (max-width: 639px){div.form{min-width:272px}div.form div.field{display:block;height:auto}div.form div.field>div.control{display:block}div.form div.field>label{width:auto}}.larger div.form.collapsible>span.title:after{top:15px}div.page{will-change:scroll-position}div.page>p,div.form div.page>p.note{margin:17px 0;margin-bottom:34px;white-space:pre-wrap}div.page div.page-body>*{margin:17px 0}.icon,.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,input[type=checkbox][readonly]+span.checkbox:after,p.note:before,p.info:before,p.error:before,p.warning:before,div.modal.error>span.title:before,div.modal.warning>span.title:before,div.modal.info>span.title:before,div.form.collapsible>span.title:after,div.form p.note:before,div.form p.info.note:before,div.form p.error.note:before,div.form p.warning.note:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,.icon-warning.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-warning.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-warning.checkbox:after,input[type=checkbox][readonly]+span.icon-warning.checkbox:after,p.icon-warning.note:before,p.icon-warning.info:before,p.icon-warning.error:before,p.icon-warning.warning:before,div.modal.error>span.icon-warning.title:before,div.modal.info>span.icon-warning.title:before,div.form.collapsible>span.icon-warning.title:after,div.form p.icon-warning.note:before,div.modal.warning>span.title:before{content:"warning"}.icon.icon-info,.icon-info.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,p.icon-info.warning:before,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.form.collapsible>span.icon-info.title:after,div.form p.icon-info.note:before,p.note:before,div.form p.note:before,div.form p.info.note:before,div.form p.error.note:before,div.form p.warning.note:before,p.info:before,div.modal.info>span.title:before,div.form p.icon.note:before,div.form p.note:before,div.form p.note:before{content:"info"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,div.form.collapsible>span.icon-info-outline.title:after,div.form p.icon-info-outline.note:before{content:"info-outline"}.icon.icon-error,.icon-error.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-error.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error.checkbox:after,input[type=checkbox][readonly]+span.icon-error.checkbox:after,p.icon-error.note:before,p.icon-error.info:before,div.modal.warning>span.icon-error.title:before,div.modal.info>span.icon-error.title:before,div.form.collapsible>span.icon-error.title:after,div.form p.icon-error.note:before,p.error:before,div.form p.note.error:before,p.warning:before,div.form p.note.warning:before,div.modal.error>span.title:before{content:"î€€"}.icon.icon-error-outline,.icon-error-outline.select-wrapper:after,textarea:invalid:not(.no-validation)~i.icon-error-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-error-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-error-outline.checkbox:after,p.icon-error-outline.note:before,p.icon-error-outline.info:before,p.icon-error-outline.error:before,p.icon-error-outline.warning:before,div.modal.error>span.icon-error-outline.title:before,div.modal.warning>span.icon-error-outline.title:before,div.modal.info>span.icon-error-outline.title:before,div.form.collapsible>span.icon-error-outline.title:after,div.form p.icon-error-outline.note:before,input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~input[type=text]:invalid:not(.no-validation)~i.on-invalid:before,input[type=text]:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon.on-invalid:before,textarea:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~textarea:invalid:not(.no-validation)~i.on-invalid:before,textarea:invalid:not(.no-validation)~input[type=password]:invalid:not(.no-validation)~i.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.on-invalid:before{content:"î€"}.icon.icon-info,.icon-info.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info.checkbox:after,input[type=checkbox][readonly]+span.icon-info.checkbox:after,p.icon-info.error:before,p.icon-info.warning:before,div.modal.error>span.icon-info.title:before,div.modal.warning>span.icon-info.title:before,div.form.collapsible>span.icon-info.title:after,div.form p.icon-info.note:before,p.note:before,div.form p.note:before,div.form p.info.note:before,div.form p.error.note:before,div.form p.warning.note:before,p.info:before,div.modal.info>span.title:before,div.form p.icon.note:before,div.form p.note:before,div.form p.note:before{content:"î¢Ž"}.icon.icon-info-outline,.icon-info-outline.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-info-outline.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-info-outline.checkbox:after,input[type=checkbox][readonly]+span.icon-info-outline.checkbox:after,p.icon-info-outline.note:before,p.icon-info-outline.info:before,p.icon-info-outline.error:before,p.icon-info-outline.warning:before,div.modal.error>span.icon-info-outline.title:before,div.modal.warning>span.icon-info-outline.title:before,div.modal.info>span.icon-info-outline.title:before,div.form.collapsible>span.icon-info-outline.title:after,div.form p.icon-info-outline.note:before{content:"î¢"}.icon.icon-checkmark,.icon-checkmark.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-checkmark.on-invalid:before,input[type=checkbox][readonly]+span.icon-checkmark.checkbox:after,p.icon-checkmark.note:before,p.icon-checkmark.info:before,p.icon-checkmark.error:before,p.icon-checkmark.warning:before,div.modal.error>span.icon-checkmark.title:before,div.modal.warning>span.icon-checkmark.title:before,div.modal.info>span.icon-checkmark.title:before,div.form.collapsible>span.icon-checkmark.title:after,div.form p.icon-checkmark.note:before,input[type=checkbox]:not([readonly]):checked+span.checkbox:after,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.title.checkbox:after,input[type=checkbox][readonly]:checked+span.checkbox:after,div.form.collapsible>input[type=checkbox][readonly]:checked+span.title.checkbox:after{content:"check"}.icon.icon-crossmark,.icon-crossmark.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-crossmark.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-crossmark.checkbox:after,input[type=checkbox][readonly]+span.icon-crossmark.checkbox:after,p.icon-crossmark.note:before,p.icon-crossmark.info:before,p.icon-crossmark.error:before,p.icon-crossmark.warning:before,div.modal.error>span.icon-crossmark.title:before,div.modal.warning>span.icon-crossmark.title:before,div.modal.info>span.icon-crossmark.title:before,div.form.collapsible>span.icon-crossmark.title:after,div.form p.icon-crossmark.note:before,input[type=checkbox][readonly]:not(:checked)+span.checkbox:after,div.form.collapsible>input[type=checkbox][readonly]:not(:checked)+span.title.checkbox:after{content:"close"}.icon.icon-arrow-down,.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-arrow-down.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-arrow-down.checkbox:after,input[type=checkbox]:not([readonly]):checked+span.checkbox.select-wrapper:after,input[type=checkbox][readonly]+span.icon-arrow-down.checkbox:after,input[type=checkbox][readonly]+span.checkbox.select-wrapper:after,p.icon-arrow-down.note:before,p.icon-arrow-down.info:before,p.icon-arrow-down.error:before,p.icon-arrow-down.warning:before,div.modal.error>span.icon-arrow-down.title:before,div.modal.warning>span.icon-arrow-down.title:before,div.modal.info>span.icon-arrow-down.title:before,div.form p.icon-arrow-down.note:before,div.form.collapsible>input[type=checkbox]:not([readonly]):checked+span.checkbox.title:after,div.form.collapsible>input[type=checkbox][readonly]+span.checkbox.title:after,div.form.collapsible>span.title:after{content:"keyboard_arrow_down"}.icon.icon-exit,.icon-exit.select-wrapper:after,input[type=text]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,textarea:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=password]:invalid:not(.no-validation)~i.icon-exit.on-invalid:before,input[type=checkbox]:not([readonly]):checked+span.icon-exit.checkbox:after,input[type=checkbox][readonly]+span.icon-exit.checkbox:after,p.icon-exit.note:before,p.icon-exit.info:before,p.icon-exit.error:before,p.icon-exit.warning:before,div.modal.error>span.icon-exit.title:before,div.modal.warning>span.icon-exit.title:before,div.modal.info>span.icon-exit.title:before,div.form.collapsible>span.icon-exit.title:after,div.form p.icon-exit.note:before,.icon.icon-exit:before{content:"exit_to_app"}.select-wrapper{white-space:nowrap}.select-wrapper:after{position:relative;right:18px;top:3px;pointer-events:none}.select-wrapper select{-moz-appearance:none;-webkit-appearance:none;appearance:none;position:relative;height:34px;padding:0 8.5px;padding-right:20px;border:1px solid #ccc;border-radius:2px;background:#fff;outline:none;cursor:pointer}.select-wrapper select:focus{box-shadow:0 0 0 3px rgba(33,33,33,.15)}.select-wrapper select::-ms-expand{display:none}.select-wrapper select:focus::-ms-value{background-color:transparent;color:#212121}.select-wrapper select>option{color:#212121}.select-wrapper select[readonly]{pointer-events:none;border:none;background:none;padding:0}.select-wrapper[readonly]:after{display:none}.larger select{height:51px}label.file-input{position:relative;border:1px solid #ccc;border-radius:2px;height:34px;width:100%;display:block;white-space:nowrap;background-color:#fff;cursor:pointer}label.file-input:before,label.file-input:after{display:block;position:absolute;line-height:32px;padding-left:8.5px;background-color:inherit;left:0;right:0;z-index:1}label.file-input:before{content:attr(data-placeholder);color:#ccc}label.file-input:after{content:attr(data-filename);overflow:hidden;text-overflow:ellipsis;padding-right:8.5px}label.file-input>input[type=file]{position:absolute;width:100%;padding-left:8.5px;height:32px;outline:none;border-radius:2px}label.file-input>input[type=file]:focus{outline:none;box-shadow:0 0 0 3px rgba(33,33,33,.15)}.larger label.file-input{height:51px}.larger label.file-input:before,.larger label.file-input:after{line-height:49px}.larger label.file-input>input[type=file]{height:49px}body.performance *{transition:none !important;filter:none !important;--webkit-filter: none !important;box-shadow:none !important}', ""])
        }, function (e, t, n) {
            t = e.exports = n(2)(!1);
            var o = n(7), i = o(n(30)), r = o(n(31)), a = o(n(32)), s = o(n(33));
            t.push([e.i, "@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + i + "); /* For IE6-8 */\n  src: local('Material Icons'),\n       local('MaterialIcons-Regular'),\n       url(" + r + ") format('woff2'),\n       url(" + a + ") format('woff'),\n       url(" + s + ") format('truetype');\n}\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Support for IE. */\n  font-feature-settings: 'liga';\n}\n", ""])
        }, function (e, t, n) {
            e.exports = n.p + "fonts/MaterialIcons-Regular.eot"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/MaterialIcons-Regular.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/MaterialIcons-Regular.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/MaterialIcons-Regular.ttf"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-300.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-300.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-300italic.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-300italic.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-400.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-400.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-400italic.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-400italic.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-600.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-600.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-600italic.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-600italic.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-700.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-700.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-700italic.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-700italic.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-800.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-800.woff"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-800italic.woff2"
        }, function (e, t, n) {
            e.exports = n.p + "fonts/open-sans-latin-800italic.woff"
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = function () {
                function e(t) {
                    if (t) this.element = t; else {
                        var n = document.createElement("div");
                        n.innerHTML = e.template, this.element = n.firstElementChild
                    }
                }

                return Object.defineProperty(e.prototype, "value", {
                    get: function () {
                        return this.element.value || ""
                    }, set: function (e) {
                        this.element.value = e || ""
                    }, enumerable: !0, configurable: !0
                }), e.template = n(55), e
            }();
            t.Textfield = o
        }, function (e, t) {
            e.exports = "<input type=text>"
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                var o, i = this && this.__extends || (o = function (e, t) {
                    return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
                }, function (e, t) {
                    function n() {
                        this.constructor = e
                    }

                    o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }), r = this && this.__awaiter || function (e, t, n, o) {
                    return new (n || (n = Promise))((function (i, r) {
                        function a(e) {
                            try {
                                c(o.next(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function s(e) {
                            try {
                                c(o.throw(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function c(e) {
                            var t;
                            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                e(t)
                            }))).then(a, s)
                        }

                        c((o = o.apply(e, t || [])).next())
                    }))
                }, a = this && this.__generator || function (e, t) {
                    var n, o, i, r, a = {
                        label: 0, sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1]
                        }, trys: [], ops: []
                    };
                    return r = {
                        next: s(0),
                        throw: s(1),
                        return: s(2)
                    }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                        return this
                    }), r;

                    function s(r) {
                        return function (s) {
                            return function (r) {
                                if (n) throw new TypeError("Generator is already executing.");
                                for (; a;) try {
                                    if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                    switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                        case 0:
                                        case 1:
                                            i = r;
                                            break;
                                        case 4:
                                            return a.label++, {value: r[1], done: !1};
                                        case 5:
                                            a.label++, o = r[1], r = [0];
                                            continue;
                                        case 7:
                                            r = a.ops.pop(), a.trys.pop();
                                            continue;
                                        default:
                                            if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                                a = 0;
                                                continue
                                            }
                                            if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                                a.label = r[1];
                                                break
                                            }
                                            if (6 === r[0] && a.label < i[1]) {
                                                a.label = i[1], i = r;
                                                break
                                            }
                                            if (i && a.label < i[2]) {
                                                a.label = i[2], a.ops.push(r);
                                                break
                                            }
                                            i[2] && a.ops.pop(), a.trys.pop();
                                            continue
                                    }
                                    r = t.call(e, a)
                                } catch (e) {
                                    r = [6, e], o = 0
                                } finally {
                                    n = i = 0
                                }
                                if (5 & r[0]) throw r[1];
                                return {value: r[0] ? r[1] : void 0, done: !0}
                            }([r, s])
                        }
                    }
                };
                Object.defineProperty(t, "__esModule", {value: !0});
                var s = n(0);
                n(57);
                var c = function (t) {
                    function o(e, o, i, r) {
                        var a = t.call(this, e) || this;
                        return a.view = document.createElement("wbm-core-login"), a.view.innerHTML = n(59), a.series = o, a.hostname = r, a.description = i, a
                    }

                    return i(o, t), o.prototype.load = function () {
                        return r(this, void 0, void 0, (function () {
                            var e, t, n, o = this;
                            return a(this, (function (i) {
                                return this.setSeriesText(), this.setHostname(), this.setDescription(), this.setLoginButtonText("Guest"), (e = this.view.querySelector("#login-username")) && e.addEventListener("input", (function () {
                                    o.updateLoginButtonStyleAndText(e)
                                })), (t = this.view.querySelector("#login-button")) && t.addEventListener("click", (function () {
                                    o.loginUser()
                                })), (n = this.view.querySelector("#login-password")) && n.addEventListener("keypress", (function (e) {
                                    13 != e.keyCode && 13 != e.which || o.loginUser()
                                })), [2]
                            }))
                        }))
                    }, o.prototype.setSeriesText = function () {
                        var e = this.view.querySelector("#login-productseries");
                        e && (e.textContent = this.series)
                    }, o.prototype.setHostname = function () {
                        var e = this.view.querySelector("#login-hostname");
                        if (e && "" !== this.hostname) e.textContent = this.hostname; else if (e) {
                            e.style.setProperty("display", "none");
                            var t = this.view.querySelector("#login-hostname-label");
                            t && t.style.setProperty("display", "none")
                        }
                    }, o.prototype.setDescription = function () {
                        var e = this.view.querySelector("#login-description");
                        if (e && "" !== this.description) e.textContent = this.description; else if (e) {
                            e.style.setProperty("display", "none");
                            var t = this.view.querySelector("#login-description-label");
                            t && t.style.setProperty("display", "none")
                        }
                        e && (e.textContent = this.description)
                    }, o.prototype.setLoginButtonText = function (e) {
                        var t = this.view.querySelector("#login-button");
                        t && (t.textContent = e)
                    }, o.prototype.updateLoginButtonStyleAndText = function (e) {
                        var t = this.view.querySelector("#login-button");
                        e && "" === e.value ? (this.setLoginButtonText("Guest"), t && t.classList.remove("action")) : (this.setLoginButtonText("Login"), t && t.classList.add("action"))
                    }, o.prototype.loginUser = function () {
                        var t = this, n = e("#login-username").val(), o = e("#login-password").val();
                        this.base.authentication.login(n, o).then((function () {
                            t.onLogin()
                        })).catch((function (e) {
                            t.base.modalPresenter.showErrorDialog(t.base, {
                                title: t.base.localization.localized({
                                    fallback: "Login failed",
                                    key: "login-failed-modal-title"
                                }),
                                message: t.base.localization.localized({
                                    fallback: "Could not login with the provided username and password",
                                    key: "login-failed-modal-message"
                                }),
                                detailMessage: e.message
                            })
                        }))
                    }, o
                }(s.ViewController);
                t.Login = c
            }).call(this, n(8))
        }, function (e, t, n) {
            var o = n(58);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            t = e.exports = n(2)(!1);
            var o = n(7)(n(15));
            t.push([e.i, "div.login{background-image:url(" + o + ");background-repeat:no-repeat;background-size:85px;background-position:34px 17px}.larger div.login{background-position-y:23px}.larger div.login,div.login{position:absolute;display:block;margin:auto;left:0;right:0;top:0;bottom:0;background-color:#fff;border-radius:2px;border:1px solid #ccc;box-shadow:0 0 34px 0 rgba(0,0,0,.15)}div.login{height:325px;width:500px;max-height:257px;max-width:310px;background-position:17px 17px;background-size:102px 34px}div.login>.title{padding-left:136px;height:34px;line-height:34px}div.login>div.head{display:table;width:100%;height:17px;padding:0 17px}div.login>div.head>*{display:table-cell;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}div.login>div.head>label{width:85px;min-width:85px}div.login>div.head>.bold{font-weight:bold}div.login>div.field{margin-top:9px;height:34px;padding:9px 9px}div.login>div.field>input{width:100%}div.login>div.actions{margin-top:9px;padding:9px;text-align:right}#logout{position:absolute;font-size:34px;z-index:1;right:5px;top:5px;cursor:pointer}.larger div.login{height:359px;width:534px;max-height:308px;max-width:344px}.larger div.login>div.field{height:51px}", ""])
        }, function (e, t) {
            e.exports = '<div class=login taid=login-dialog> <h2 id=login-productseries class=title></h2> <div class=head> <label class=bold id=login-hostname-label>Hostname:</label> <span class="" id=login-hostname taid=login-hostname></span> </div> <div class=head> <label class=bold id=login-description-label>Description:</label> <span class="" id=login-description taid=login-product-description></span><br/> </div> <p class=error id=login-error-message style=display:none></p> <div class=field> <input type=text placeholder=Username id=login-username taid=login-username> </div> <div class=field> <input type=password placeholder=Password id=login-password taid=login-password> </div> <div class=actions> <button id=login-button taid=login-button></button> </div> </div>'
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), t.isDisableableViewDescription = function (e) {
                return void 0 !== e.disabled
            }
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = function (e) {
                function t(t, n) {
                    var o = e.call(this, t, n) || this;
                    return o.isValid = !0, o.view.classList.add("checkbox"), n.enabledText ? o.enabledText = t.localization.localized({
                        key: n.enabledText.localized,
                        fallback: n.enabledText.default
                    }) : o.enabledText = t.localization.localized({
                        key: "enabled",
                        fallback: "enabled"
                    }), n.disabledText ? o.disabledText = t.localization.localized({
                        key: n.disabledText.localized,
                        fallback: n.disabledText.default
                    }) : o.disabledText = t.localization.localized({key: "disabled", fallback: "disabled"}), o
                }

                return i(t, e), Object.defineProperty(t.prototype, "value", {
                    get: function () {
                        return this.inputElement.checked
                    }, set: function (e) {
                        this.inputElement.checked = e, this.updateTextualValueDisplay(e)
                    }, enumerable: !0, configurable: !0
                }), t.prototype.setToInitialValue = function () {
                    this.value = !1
                }, Object.defineProperty(t.prototype, "readonly", {
                    get: function () {
                        return this.inputElement.readOnly
                    }, set: function (e) {
                        e ? this.inputElement.setAttribute("readonly", "") : this.inputElement.removeAttribute("readonly"), this.inputElement.readOnly = e, this.updateTextualValueDisplay(this.value)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "errorneous", {
                    get: function () {
                        return this.view.classList.contains("errorneous")
                    }, set: function (e) {
                        e ? this.view.classList.add("errorneous") : this.view.classList.remove("errorneous")
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "inputElement", {
                    get: function () {
                        var e = this._inputElement || this.view.querySelector("input[type=checkbox]");
                        return e || ((e = document.createElement("input")).setAttribute("type", "checkbox"), this._inputElement = e), e
                    }, enumerable: !0, configurable: !0
                }), t.prototype.updateTextualValueDisplay = function (e) {
                    var t = this.view.querySelector("input[type=checkbox] ~ span.checkbox");
                    t && (this.readonly ? t.textContent = e ? this.enabledText : this.disabledText : t.textContent = "")
                }, t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t, n = this;
                        return a(this, (function (o) {
                            return (e = this.view.querySelector("input[type=checkbox]")) || (this.view.appendChild(this.inputElement), (e = this.inputElement).addEventListener("change", (function () {
                                n.onValueChangeHandler && n.onValueChangeHandler(n.value)
                            }))), e.setAttribute("taid", "field-control"), (t = this.view.querySelector("input[type=checkbox] ~ span.checkbox")) || ((t = document.createElement("span")).classList.add("checkbox"), this.view.appendChild(t)), this.updateTextualValueDisplay(this.value), [2]
                        }))
                    }))
                }, t
            }(n(6).GenericControlViewController);
            t.GenericCheckboxControlViewController = s
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(6), c = n(10), l = n(63), u = function (e) {
                function t(t, n) {
                    var o = e.call(this, t, n) || this;
                    if (o.items = [], o.isValid = !0, !(n.items instanceof Array)) throw new Error("Dropdown items missing");
                    return n.items.forEach((function (e) {
                        if (!(e.title instanceof Object) || "string" != typeof e.title.default || "string" != typeof e.title.localized) throw new Error("Dropdown item incomplete")
                    })), o.view.classList.add("dropdown"), n.items.forEach((function (e) {
                        void 0 !== e.repeat ? o.items.push(new c.GenericRepetitionViewController(t, e, (function (e, t) {
                            return new l.GenericDropdownItemViewController(e, t)
                        }))) : o.items.push(new l.GenericDropdownItemViewController(t, e))
                    })), o
                }

                return i(t, e), Object.defineProperty(t.prototype, "value", {
                    get: function () {
                        return this.inputElement.value || "" + this.inputElement.selectedIndex
                    }, set: function (e) {
                        try {
                            if (!this.inputElement.querySelector('option[value="' + e + '"]')) {
                                var t = parseInt(e);
                                if ("" + t === e) return void (this.inputElement.selectedIndex = t)
                            }
                        } catch (e) {
                        }
                        this.inputElement.value = e
                    }, enumerable: !0, configurable: !0
                }), t.prototype.setToInitialValue = function () {
                    this.inputElement.selectedIndex = 0
                }, Object.defineProperty(t.prototype, "readonly", {
                    get: function () {
                        return this.inputElement.hasAttribute("readonly")
                    }, set: function (e) {
                        e ? (this.inputElement.setAttribute("readonly", ""), this.inputElement.parentElement.setAttribute("readonly", "")) : (this.inputElement.removeAttribute("readonly"), this.inputElement.parentElement.removeAttribute("readonly")), this.inputElement.readOnly = e
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "errorneous", {
                    get: function () {
                        return this.view.classList.contains("errorneous")
                    }, set: function (e) {
                        e ? this.view.classList.add("errorneous") : this.view.classList.remove("errorneous")
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "inputElement", {
                    get: function () {
                        var e = this._inputElement || this.view.querySelector("select");
                        if (!e) {
                            (e = document.createElement("select")).setAttribute("taid", "field-control"), this._inputElement = e;
                            var t = document.createElement("div");
                            t.classList.add("select-wrapper"), t.appendChild(e), this.view.appendChild(t)
                        }
                        return e
                    }, enumerable: !0, configurable: !0
                }), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e = this;
                        return a(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, Promise.all(this.items.map((function (e) {
                                        return e.load()
                                    })))];
                                case 1:
                                    return t.sent(), this.items.forEach((function (t) {
                                        if (t instanceof c.GenericRepetitionViewController) for (; t.view.childElementCount > 0;) e.inputElement.appendChild(t.view.firstElementChild); else e.inputElement.appendChild(t.view)
                                    })), this.inputElement.addEventListener("change", (function () {
                                        e.onValueChangeHandler && e.onValueChangeHandler(e.value)
                                    })), [2]
                            }
                        }))
                    }))
                }, t
            }(s.GenericControlViewController);
            t.GenericDropdownControlViewController = u
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = function (e) {
                function t(t, n) {
                    var o = e.call(this, t, n, void 0, "option") || this;
                    return o.value = n.value || "", o.title = t.localization.localized({
                        key: n.title.localized,
                        fallback: n.title.default
                    }), o
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t, n = this;
                        return a(this, (function (o) {
                            switch (o.label) {
                                case 0:
                                    return e = [], t = !1, [4, this.shouldLoad()];
                                case 1:
                                    return t === o.sent() ? [2] : (this.isTemplateString(this.title) ? e.push(this.resolveTemplateString(this.title).then((function (e) {
                                        return n.view.textContent = e
                                    }))) : this.view.textContent = this.title, this.isTemplateString(this.value) ? e.push(this.resolveTemplateString(this.value).then((function (e) {
                                        return n.view.setAttribute("value", e)
                                    }))) : this.view.setAttribute("value", this.value), [4, Promise.all(e)]);
                                case 2:
                                    return o.sent(), [2]
                            }
                        }))
                    }))
                }, t
            }(n(1).GenericViewController);
            t.GenericDropdownItemViewController = s
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = n(20), i = function () {
                function e(t, n) {
                    if (e.forCode(t)) throw new Error("status code is already taken");
                    var i = t - t % 100;
                    if (!o.StatusCodeGroup.forCode(i)) throw new Error("status code group does not exist");
                    this.group = o.StatusCodeGroup.forCode(i), this.code = t, this.ownDescription = n, e.codes[t] = this
                }

                return Object.defineProperty(e.prototype, "description", {
                    get: function () {
                        return this.group.description + ": " + this.ownDescription
                    }, enumerable: !0, configurable: !0
                }), e.forCode = function (e) {
                    return this.codes[e] || null
                }, e.codes = {}, e
            }();
            t.StatusCode = i
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(1), c = n(10), l = n(19), u = function (e) {
                function t(t, n) {
                    var o = this;
                    if (void 0 === n.title) throw new Error("title are required");
                    if (!Array.isArray(n.sections)) throw new Error("sections are required");
                    (o = e.call(this, t, n, "form-" + n.title.localized) || this).view.classList.add("form"), !1 !== n.collapsible && (o.view.classList.add("collapsible"), o.collapsibilityHasBeenAdded = !1, "collapsed" === n.collapsible && o.view.classList.add("collapsed")), n.title && (o.title = o.localizationService.localized({
                        key: n.title.localized,
                        fallback: n.title.default
                    })), n.note && (o.note = o.localizationService.localized({
                        key: n.note.localized,
                        fallback: n.note.default
                    })), o.sections = [];
                    for (var i = 0, r = n.sections; i < r.length; i++) {
                        var a = r[i];
                        if ("function" == typeof a.load) o.sections.push(a); else if (void 0 !== a.repeat) {
                            var s = a, u = new c.GenericRepetitionViewController(t, s, (function (e, t) {
                                return new l.GenericSectionViewController(e, t)
                            }));
                            o.sections.push(u)
                        } else o.sections.push(new l.GenericSectionViewController(t, a))
                    }
                    return o
                }

                return i(t, e), t.prototype.addCollapsibility = function () {
                    var e = this;
                    this.collapsibilityHasBeenAdded || (this.view.querySelector("span.title").addEventListener("click", (function () {
                        return e.view.classList.toggle("collapsed")
                    })), this.collapsibilityHasBeenAdded = !0)
                }, t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t = this;
                        return a(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return n.trys.push([0, 3, , 4]), "boolean" == typeof (e = this.shouldLoad()) ? [3, 2] : [4, e];
                                case 1:
                                    if (!(e = n.sent())) return [2];
                                    n.label = 2;
                                case 2:
                                    return [3, 4];
                                case 3:
                                    return n.sent(), [2];
                                case 4:
                                    return [4, this.parameterService.transaction((function () {
                                        return r(t, void 0, void 0, (function () {
                                            var e, t, n, o, i = this;
                                            return a(this, (function (r) {
                                                switch (r.label) {
                                                    case 0:
                                                        for ((e = []).push(this.rebuildTitle(this.title, "form-title")), this.note && e.push(this.rebuildNote(this.note, "form-note")), e.push(this.rebuildBody(this.sections.map((function (e) {
                                                            return e.view
                                                        })))), t = 0, n = this.sections; t < n.length; t++) o = n[t], e.push(o.load());
                                                        return this.view.classList.add("loading"), [4, Promise.all(e).then((function (e) {
                                                            i.addCollapsibility(), i.view.classList.remove("loading")
                                                        }))];
                                                    case 1:
                                                        return r.sent(), [2]
                                                }
                                            }))
                                        }))
                                    }))];
                                case 5:
                                    return n.sent(), [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all(this.sections.map((function (e) {
                                        return e.unload()
                                    })))];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }, t
            }(s.GenericViewController);
            t.GenericFormViewController = u
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(1), c = n(16), l = n(12), u = n(21), f = function (e) {
                function t(t, n) {
                    var o = this;
                    if (void 0 === n.title) throw new Error("title is required");
                    if (!Array.isArray(n.content)) throw new Error("content is required");
                    (o = e.call(this, t, n, "page-" + n.title.localized) || this).view.classList.add("page"), n.title && (o.title = o.localizationService.localized({
                        key: n.title.localized,
                        fallback: n.title.default
                    })), n.note && (o.note = o.localizationService.localized({
                        key: n.note.localized,
                        fallback: n.note.default
                    })), o.content = [];
                    for (var i = 0, r = n.content; i < r.length; i++) {
                        var a = r[i];
                        "function" == typeof a.load ? o.content.push(a) : o.content.push(c.generate(t, a))
                    }
                    return o
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        var e, t, n, o, i = this;
                        return a(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return [4, this.parameterService.transaction((function () {
                                        return r(i, void 0, void 0, (function () {
                                            var e, t, n, o, i = this;
                                            return a(this, (function (r) {
                                                switch (r.label) {
                                                    case 0:
                                                        for ((e = []).push(this.rebuildTitle(this.title, "page-title", "h2.page")), this.note && e.push(this.rebuildNote(this.note, "page-note", "p.note", "h2.page")), e.push(this.rebuildBody(this.content.map((function (e) {
                                                            return e.view
                                                        })), "div.page-body")), t = 0, n = this.content; t < n.length; t++) o = n[t], e.push(o.load());
                                                        return this.view.classList.add("loading"), [4, Promise.all(e).then((function (e) {
                                                            i.view.classList.remove("loading")
                                                        }))];
                                                    case 1:
                                                        return r.sent(), [2]
                                                }
                                            }))
                                        }))
                                    }))];
                                case 1:
                                    return e = s.sent(), (t = e.results.filter((function (e) {
                                        return e.error
                                    }))).length > 0 && (n = u.groupResultsByErrorCode(t), o = u.buildDetailMessageString(new l.StatusService, n), this.base.modalPresenter.showErrorDialog(this.base, {
                                        title: this.base.localization.localized({
                                            fallback: "Failed to read values",
                                            key: "error-modal-title"
                                        }),
                                        message: this.base.localization.localized({
                                            fallback: "Errors occured while trying to read the parameters for the current page",
                                            key: "read-for-page-failed-modal-message"
                                        }),
                                        detailMessage: o
                                    })), [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all(this.content.map((function (e) {
                                        return e.unload()
                                    })))];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }, t
            }(s.GenericViewController);
            t.GenericPageViewController = f
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = n(68);
            t.createSubFrame = function (e, t, n, i) {
                return new o.SubFrame(e, t, n, i)
            }
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                var o, i = this && this.__extends || (o = function (e, t) {
                    return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
                }, function (e, t) {
                    function n() {
                        this.constructor = e
                    }

                    o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }), r = this && this.__awaiter || function (e, t, n, o) {
                    return new (n || (n = Promise))((function (i, r) {
                        function a(e) {
                            try {
                                c(o.next(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function s(e) {
                            try {
                                c(o.throw(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function c(e) {
                            var t;
                            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                e(t)
                            }))).then(a, s)
                        }

                        c((o = o.apply(e, t || [])).next())
                    }))
                }, a = this && this.__generator || function (e, t) {
                    var n, o, i, r, a = {
                        label: 0, sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1]
                        }, trys: [], ops: []
                    };
                    return r = {
                        next: s(0),
                        throw: s(1),
                        return: s(2)
                    }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                        return this
                    }), r;

                    function s(r) {
                        return function (s) {
                            return function (r) {
                                if (n) throw new TypeError("Generator is already executing.");
                                for (; a;) try {
                                    if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                    switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                        case 0:
                                        case 1:
                                            i = r;
                                            break;
                                        case 4:
                                            return a.label++, {value: r[1], done: !1};
                                        case 5:
                                            a.label++, o = r[1], r = [0];
                                            continue;
                                        case 7:
                                            r = a.ops.pop(), a.trys.pop();
                                            continue;
                                        default:
                                            if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                                a = 0;
                                                continue
                                            }
                                            if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                                a.label = r[1];
                                                break
                                            }
                                            if (6 === r[0] && a.label < i[1]) {
                                                a.label = i[1], i = r;
                                                break
                                            }
                                            if (i && a.label < i[2]) {
                                                a.label = i[2], a.ops.push(r);
                                                break
                                            }
                                            i[2] && a.ops.pop(), a.trys.pop();
                                            continue
                                    }
                                    r = t.call(e, a)
                                } catch (e) {
                                    r = [6, e], o = 0
                                } finally {
                                    n = i = 0
                                }
                                if (5 & r[0]) throw r[1];
                                return {value: r[0] ? r[1] : void 0, done: !0}
                            }([r, s])
                        }
                    }
                }, s = this && this.__spreadArrays || function () {
                    for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                    var o = Array(e), i = 0;
                    for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                    return o
                };
                Object.defineProperty(t, "__esModule", {value: !0});
                var c = n(0), l = n(4), u = n(13), f = n(14), d = n(22);
                n(73);
                var p = function (t) {
                    function o(e, n, i, r) {
                        void 0 === r && (r = !0);
                        var a = t.call(this, n) || this;
                        return a.subMenu = [], a.provides = i, a.parentId = e, a.view = document.createElement("wbm-core-subframe"), a.view.innerHTML = o.template, a.navigationElement = a.view.querySelector("ul.sub-menu"), a.contentElement = a.view.querySelector("div.sub-content"), a.loadFirstElement = r, a
                    }

                    return i(o, t), o.prototype.load = function () {
                        return r(this, void 0, void 0, (function () {
                            var e = this;
                            return a(this, (function (t) {
                                return this.loading || (this.loading = r(e, void 0, void 0, (function () {
                                    var e, t, n, o = this;
                                    return a(this, (function (i) {
                                        switch (i.label) {
                                            case 0:
                                                return this.clearContent(), [4, this.base.plugin.getLoaded()];
                                            case 1:
                                                return null != (e = i.sent()) && null != e && 0 != e.length || (e = []), 0 === (t = this.loadSubPluginsRequiresProvide(e)).length ? (l.default.info("[Core] SubFrame: no Plugins with area key found"), [2]) : [4, Promise.all(t.map((function (e) {
                                                    return e.load(o.base).catch((function (t) {
                                                        return l.default.warn("[Core] SubFrame: sub-Plugin " + e.name + "@" + e.version + " has not been loaded due to an error ", t), null
                                                    }))
                                                })))];
                                            case 2:
                                                return (n = (n = i.sent()).filter((function (e) {
                                                    return null !== e
                                                }))).forEach((function (e, t) {
                                                    o.registerSubMenuItem({
                                                        id: e.id,
                                                        title: o.base.localization.localized(e.title),
                                                        tooltip: e.description && o.base.localization.localized(e.description),
                                                        priority: e.priority,
                                                        userRoles: e.userRoles
                                                    }, e.controller), l.default.info("[Core] SubFrame: (" + (t + 1) + "/" + n.length + " added " + e.id + " sub area to sub-frame")
                                                })), l.default.info("[Core] SubFrame: " + this.parentId + " sub area loaded"), [2]
                                        }
                                    }))
                                }))), [2, this.loading]
                            }))
                        }))
                    }, o.prototype.unload = function () {
                        return r(this, void 0, void 0, (function () {
                            return a(this, (function (e) {
                                switch (e.label) {
                                    case 0:
                                        return this.childController ? [4, this.childController.unload()] : [3, 2];
                                    case 1:
                                        e.sent(), e.label = 2;
                                    case 2:
                                        return [2]
                                }
                            }))
                        }))
                    }, o.prototype.clearContent = function () {
                        for (var e = 0; e < this.contentElement.childElementCount; e++) this.contentElement.children[e].remove()
                    }, o.prototype.loadSubPluginsRequiresProvide = function (e) {
                        var t = this;
                        return e.filter((function (e) {
                            return t.provides.indexOf(e.requires) > -1
                        }))
                    }, o.prototype.registerSubMenuItem = function (e, t) {
                        if (u.MenuHelper.checkItemId(e.id, this.subMenu.map((function (e) {
                            return e.item.id
                        })))) {
                            if (e.userRoles) {
                                var n = this.base.authentication.getActiveUser();
                                if (!n || !n.roles.some((function (t) {
                                    return e.userRoles.indexOf(t) >= 0
                                }))) return void l.default.info('[Core] SubFrame: ignoring menu item "' + e.id + '" due to insufficient user roles.')
                            }
                            var i = u.MenuHelper.createMenuItemElement(e.id, e.title, o.menuItemTemplate, !0, this.parentId),
                                r = u.MenuHelper.getInsertionIndexForPriority(e.priority, this.subMenu.map((function (e) {
                                    return e.item.priority
                                })));
                            if (u.MenuHelper.insertListItemElement(i, this.navigationElement, r), this.subMenu.splice(r, 0, {
                                item: e,
                                controller: t,
                                element: i
                            }), t instanceof o) {
                                i.classList.add("expandible");
                                var a = t.navigationElement;
                                a.remove(), u.MenuHelper.insertSubmenuElement(a, i), this.parentId && (t.parentId = this.parentId + "/" + t.parentId), t.subMenu.forEach((function (e) {
                                    u.MenuHelper.updateMenuItemElementIds(e.element, e.item.id, t.parentId)
                                }))
                            }
                        }
                    }, o.prototype.onRouteChange = function (t) {
                        var n = (t = s(t)).shift();
                        if (n || !0 !== this.loadFirstElement) {
                            var i = this.subMenu.filter((function (e) {
                                return e.item.id == n
                            }))[0];
                            if (i) e(this.navigationElement).find("li.active").removeClass("active"), e(this.navigationElement).find("li.expanded").removeClass("expanded"), i.controller instanceof o ? i.element.classList.add("expanded") : i.element.classList.add("active"), this.childController && this.childController.unload(), this.clearContent(), this.contentElement.appendChild(i.controller.view), this.childController = i.controller, i.controller.load().then((function () {
                                return i.controller.onRouteChange && i.controller.onRouteChange(t)
                            })); else {
                                l.default.warn("[Core] SubFrame: menu entry for id " + n + " not found.");
                                var r = new d.PageNotFoundController(this.base);
                                this.clearContent(), this.childController && this.childController.unload(), this.contentElement.appendChild(r.view), this.childController = r
                            }
                        } else this.loadFirstMenuEntry()
                    }, o.prototype.loadFirstMenuEntry = function () {
                        if (l.default.debug("[Core] SubFrame: loading first subelement"), 0 !== this.subMenu.length) {
                            var e = f.getHash().split("/"), t = this.subMenu[0].item.id;
                            f.setHash(e.concat([t]).join("/"))
                        } else l.default.error("could not find first child")
                    }, o.template = n(75), o.menuItemTemplate = n(23), o
                }(c.ViewController);
                t.SubFrame = p
            }).call(this, n(8))
        }, function (e, t, n) {
            "use strict";
            var o = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, i = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var r = n(70), a = function () {
                function e(e, t) {
                    void 0 === t && (t = 1), this.opening = void 0, this.name = e, this.version = t
                }

                return e.prototype.open = function () {
                    return o(this, void 0, void 0, (function () {
                        var e = this;
                        return i(this, (function (t) {
                            return [2, this.opening || (this.opening = r.default.open(this.name, this.version, (function (e) {
                                var t = e.createObjectStore("logs", {keyPath: "id", autoIncrement: !0});
                                t.createIndex("date", "date", {unique: !1}), t.createIndex("level", "level", {unique: !1}), t.createIndex("message", "message", {unique: !1}), t.createIndex("user_info", "user_info", {unique: !1})
                            })).then((function (t) {
                                e.db = t
                            })))]
                        }))
                    }))
                }, e.prototype.addEntry = function (e, t, n) {
                    for (var r = [], a = 3; a < arguments.length; a++) r[a - 3] = arguments[a];
                    return o(this, void 0, void 0, (function () {
                        var o;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return this.db ? [3, 2] : [4, this.open()];
                                case 1:
                                    i.sent(), i.label = 2;
                                case 2:
                                    return (o = this.db.transaction("logs", "readwrite")).objectStore("logs").put({
                                        date: e,
                                        level: t,
                                        message: n,
                                        user_info: r.map((function (e) {
                                            return e.toString()
                                        }))
                                    }), [2, o.complete]
                            }
                        }))
                    }))
                }, e.prototype.getEntries = function () {
                    return o(this, void 0, void 0, (function () {
                        return i(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return this.db ? [3, 2] : [4, this.open()];
                                case 1:
                                    e.sent(), e.label = 2;
                                case 2:
                                    return [2, this.db.transaction("logs", "readwrite").objectStore("logs").getAll().then((function (e) {
                                        return e.map((function (e) {
                                            return {
                                                date: e.date,
                                                level: e.level,
                                                message: e.message,
                                                userInfo: e.user_info
                                            }
                                        }))
                                    }))]
                            }
                        }))
                    }))
                }, e
            }();
            t.LogDatabase = a
        }, function (e, t, n) {
            "use strict";
            !function () {
                function t(e) {
                    return Array.prototype.slice.call(e)
                }

                function n(e) {
                    return new Promise((function (t, n) {
                        e.onsuccess = function () {
                            t(e.result)
                        }, e.onerror = function () {
                            n(e.error)
                        }
                    }))
                }

                function o(e, t, o) {
                    var i, r = new Promise((function (r, a) {
                        n(i = e[t].apply(e, o)).then(r, a)
                    }));
                    return r.request = i, r
                }

                function i(e, t, n) {
                    var i = o(e, t, n);
                    return i.then((function (e) {
                        if (e) return new u(e, i.request)
                    }))
                }

                function r(e, t, n) {
                    n.forEach((function (n) {
                        Object.defineProperty(e.prototype, n, {
                            get: function () {
                                return this[t][n]
                            }, set: function (e) {
                                this[t][n] = e
                            }
                        })
                    }))
                }

                function a(e, t, n, i) {
                    i.forEach((function (i) {
                        i in n.prototype && (e.prototype[i] = function () {
                            return o(this[t], i, arguments)
                        })
                    }))
                }

                function s(e, t, n, o) {
                    o.forEach((function (o) {
                        o in n.prototype && (e.prototype[o] = function () {
                            return this[t][o].apply(this[t], arguments)
                        })
                    }))
                }

                function c(e, t, n, o) {
                    o.forEach((function (o) {
                        o in n.prototype && (e.prototype[o] = function () {
                            return i(this[t], o, arguments)
                        })
                    }))
                }

                function l(e) {
                    this._index = e
                }

                function u(e, t) {
                    this._cursor = e, this._request = t
                }

                function f(e) {
                    this._store = e
                }

                function d(e) {
                    this._tx = e, this.complete = new Promise((function (t, n) {
                        e.oncomplete = function () {
                            t()
                        }, e.onerror = function () {
                            n(e.error)
                        }, e.onabort = function () {
                            n(e.error)
                        }
                    }))
                }

                function p(e, t, n) {
                    this._db = e, this.oldVersion = t, this.transaction = new d(n)
                }

                function h(e) {
                    this._db = e
                }

                r(l, "_index", ["name", "keyPath", "multiEntry", "unique"]), a(l, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]), c(l, "_index", IDBIndex, ["openCursor", "openKeyCursor"]), r(u, "_cursor", ["direction", "key", "primaryKey", "value"]), a(u, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach((function (e) {
                    e in IDBCursor.prototype && (u.prototype[e] = function () {
                        var t = this, o = arguments;
                        return Promise.resolve().then((function () {
                            return t._cursor[e].apply(t._cursor, o), n(t._request).then((function (e) {
                                if (e) return new u(e, t._request)
                            }))
                        }))
                    })
                })), f.prototype.createIndex = function () {
                    return new l(this._store.createIndex.apply(this._store, arguments))
                }, f.prototype.index = function () {
                    return new l(this._store.index.apply(this._store, arguments))
                }, r(f, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]), a(f, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getKey", "getAllKeys", "count"]), c(f, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]), s(f, "_store", IDBObjectStore, ["deleteIndex"]), d.prototype.objectStore = function () {
                    return new f(this._tx.objectStore.apply(this._tx, arguments))
                }, r(d, "_tx", ["objectStoreNames", "mode"]), s(d, "_tx", IDBTransaction, ["abort"]), p.prototype.createObjectStore = function () {
                    return new f(this._db.createObjectStore.apply(this._db, arguments))
                }, r(p, "_db", ["name", "version", "objectStoreNames"]), s(p, "_db", IDBDatabase, ["deleteObjectStore", "close"]), h.prototype.transaction = function () {
                    return new d(this._db.transaction.apply(this._db, arguments))
                }, r(h, "_db", ["name", "version", "objectStoreNames"]), s(h, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach((function (e) {
                    [f, l].forEach((function (n) {
                        n.prototype[e.replace("open", "iterate")] = function () {
                            var n = t(arguments), o = n[n.length - 1], i = this._store || this._index,
                                r = i[e].apply(i, n.slice(0, -1));
                            r.onsuccess = function () {
                                o(r.result)
                            }
                        }
                    }))
                })), [l, f].forEach((function (e) {
                    e.prototype.getAll || (e.prototype.getAll = function (e, t) {
                        var n = this, o = [];
                        return new Promise((function (i) {
                            n.iterateCursor(e, (function (e) {
                                e ? (o.push(e.value), void 0 === t || o.length != t ? e.continue() : i(o)) : i(o)
                            }))
                        }))
                    })
                }));
                var v = {
                    open: function (e, t, n) {
                        var i = o(indexedDB, "open", [e, t]), r = i.request;
                        return r.onupgradeneeded = function (e) {
                            n && n(new p(r.result, e.oldVersion, r.transaction))
                        }, i.then((function (e) {
                            return new h(e)
                        }))
                    }, delete: function (e) {
                        return o(indexedDB, "deleteDatabase", [e])
                    }
                };
                e.exports = v, e.exports.default = e.exports
            }()
        }, function (e, t, n) {
            var o;
            /** @license
             * JS Signals <http://millermedeiros.github.com/js-signals/>
             * Released under the MIT license
             * Author: Miller Medeiros
             * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
             */!function (i) {
                function r(e, t, n, o, i) {
                    this._listener = t, this._isOnce = n, this.context = o, this._signal = e, this._priority = i || 0
                }

                function a(e, t) {
                    if ("function" != typeof e) throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", t))
                }

                function s() {
                    this._bindings = [], this._prevParams = null;
                    var e = this;
                    this.dispatch = function () {
                        s.prototype.dispatch.apply(e, arguments)
                    }
                }

                r.prototype = {
                    active: !0, params: null, execute: function (e) {
                        var t, n;
                        return this.active && this._listener && (n = this.params ? this.params.concat(e) : e, t = this._listener.apply(this.context, n), this._isOnce && this.detach()), t
                    }, detach: function () {
                        return this.isBound() ? this._signal.remove(this._listener, this.context) : null
                    }, isBound: function () {
                        return !!this._signal && !!this._listener
                    }, isOnce: function () {
                        return this._isOnce
                    }, getListener: function () {
                        return this._listener
                    }, getSignal: function () {
                        return this._signal
                    }, _destroy: function () {
                        delete this._signal, delete this._listener, delete this.context
                    }, toString: function () {
                        return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
                    }
                }, s.prototype = {
                    VERSION: "1.0.0",
                    memorize: !1,
                    _shouldPropagate: !0,
                    active: !0,
                    _registerListener: function (e, t, n, o) {
                        var i, a = this._indexOfListener(e, n);
                        if (-1 !== a) {
                            if ((i = this._bindings[a]).isOnce() !== t) throw new Error("You cannot add" + (t ? "" : "Once") + "() then add" + (t ? "Once" : "") + "() the same listener without removing the relationship first.")
                        } else i = new r(this, e, t, n, o), this._addBinding(i);
                        return this.memorize && this._prevParams && i.execute(this._prevParams), i
                    },
                    _addBinding: function (e) {
                        var t = this._bindings.length;
                        do {
                            --t
                        } while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
                        this._bindings.splice(t + 1, 0, e)
                    },
                    _indexOfListener: function (e, t) {
                        for (var n, o = this._bindings.length; o--;) if ((n = this._bindings[o])._listener === e && n.context === t) return o;
                        return -1
                    },
                    has: function (e, t) {
                        return -1 !== this._indexOfListener(e, t)
                    },
                    add: function (e, t, n) {
                        return a(e, "add"), this._registerListener(e, !1, t, n)
                    },
                    addOnce: function (e, t, n) {
                        return a(e, "addOnce"), this._registerListener(e, !0, t, n)
                    },
                    remove: function (e, t) {
                        a(e, "remove");
                        var n = this._indexOfListener(e, t);
                        return -1 !== n && (this._bindings[n]._destroy(), this._bindings.splice(n, 1)), e
                    },
                    removeAll: function () {
                        for (var e = this._bindings.length; e--;) this._bindings[e]._destroy();
                        this._bindings.length = 0
                    },
                    getNumListeners: function () {
                        return this._bindings.length
                    },
                    halt: function () {
                        this._shouldPropagate = !1
                    },
                    dispatch: function (e) {
                        if (this.active) {
                            var t, n = Array.prototype.slice.call(arguments), o = this._bindings.length;
                            if (this.memorize && (this._prevParams = n), o) {
                                t = this._bindings.slice(), this._shouldPropagate = !0;
                                do {
                                    o--
                                } while (t[o] && this._shouldPropagate && !1 !== t[o].execute(n))
                            }
                        }
                    },
                    forget: function () {
                        this._prevParams = null
                    },
                    dispose: function () {
                        this.removeAll(), delete this._bindings, delete this._prevParams
                    },
                    toString: function () {
                        return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
                    }
                };
                var c = s;
                c.Signal = s, void 0 === (o = function () {
                    return c
                }.call(t, n, t, e)) || (e.exports = o)
            }()
        }, function (e, t) {
            e.exports = "<h2>404 - Page not found</h2> <p></p>"
        }, function (e, t, n) {
            var o = n(74);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            (e.exports = n(2)(!1)).push([e.i, 'wbm-core-subframe div.subframe{display:flex;position:absolute;left:0;bottom:0;top:0;right:0;overflow:hidden}wbm-core-subframe div.subframe>ul.sub-menu{overflow-y:auto;overflow-x:hidden}wbm-core-subframe ul.sub-menu{min-width:240px;flex-basis:240px;border-right:1px solid #ccc}wbm-core-subframe ul.sub-menu li{position:relative;padding:0 17px;border-top:1px solid transparent;border-bottom:1px solid transparent}wbm-core-subframe ul.sub-menu li:first-child{margin-top:17px}wbm-core-subframe ul.sub-menu li:not(:first-child){border-top-color:#ccc}wbm-core-subframe ul.sub-menu li>a{display:table;height:51px;text-decoration:none;color:#212121;width:100%}wbm-core-subframe ul.sub-menu li>a>*{display:table-cell;vertical-align:middle}wbm-core-subframe ul.sub-menu li:not(.expanded):active{background:#f6f6f6}wbm-core-subframe ul.sub-menu li.active,wbm-core-subframe ul.sub-menu li.expanded{background:#fefefe;box-shadow:0 0 51px 0px rgba(227,0,15,.05)}wbm-core-subframe ul.sub-menu li.active:first-child,wbm-core-subframe ul.sub-menu li.expanded:first-child{border-top-color:#ccc}wbm-core-subframe ul.sub-menu li.active:last-child,wbm-core-subframe ul.sub-menu li.expanded:last-child{border-bottom-color:#ccc}wbm-core-subframe ul.sub-menu li.active>a,wbm-core-subframe ul.sub-menu li.expanded>a{font-weight:600}wbm-core-subframe ul.sub-menu li.active:before,wbm-core-subframe ul.sub-menu li.expanded:before{content:" ";display:block;position:absolute;width:4px;left:0px;top:-1px;bottom:-1px}wbm-core-subframe ul.sub-menu li.expandible>ul{display:none;padding-bottom:17px;padding-left:17px}wbm-core-subframe ul.sub-menu li.expandible>ul>li{margin-top:0}wbm-core-subframe ul.sub-menu li.expanded{background-color:#ffffff}wbm-core-subframe ul.sub-menu li.expanded>ul{display:block}wbm-core-subframe ul.sub-menu li.expanded:before{background:#aaa}wbm-core-subframe ul.sub-menu li.active:before{background:#e3000f}wbm-core-subframe ul.sub-menu li.active:after{background:inherit;content:" ";display:block;position:absolute;height:52px;width:1px;right:-1px;top:-1px}wbm-core-subframe div.sub-content{background:#fefefe;position:relative;padding-left:34px;padding-right:17px;overflow-y:auto;width:100%}.larger wbm-core-subframe ul.sub-menu li>a{height:68px}.larger wbm-core-subframe ul.sub-menu li.active:after{height:69px}@media only screen and (max-width: 639px){wbm-core-subframe ul.sub-menu{min-width:175px;flex-basis:175px}wbm-core-subframe div.sub-content{padding-left:9px;padding-right:9px}}', ""])
        }, function (e, t) {
            e.exports = "<div class=subframe> <ul class=sub-menu> </ul> <div class=sub-content> </div> </div>"
        }, function (e, t, n) {
            "use strict";
            var o = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, i = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var r = n(77), a = n(79), s = n(9), c = function () {
                function e(e) {
                    this.currentPresentations = [], this.view = document.createElement("wbm-core-modal-presenter"), this.view.innerHTML = '<div class="overlay"></div>', this.overlay = this.view.querySelector("div.overlay"), this.view.style.display = "none", this.frame = e, document.body.appendChild(this.view)
                }

                return e.prototype.load = function () {
                    return o(this, void 0, void 0, (function () {
                        return i(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, e.prototype.showView = function (e) {
                    var t = this;
                    return new Promise((function (n, o) {
                        t.currentPresentations.push({view: e, onHide: n}), t.updatePresentationDisplay()
                    }))
                }, e.prototype.showErrorDialog = function (e, t) {
                    var n = e.localization.localized({fallback: "Error", key: "modal-dialog-title-error"});
                    return this.showDialog(e, t, s.DialogStyle.error, n)
                }, e.prototype.showWarningDialog = function (e, t) {
                    var n = e.localization.localized({fallback: "Warning", key: "modal-dialog-title-warning"});
                    return this.showDialog(e, t, s.DialogStyle.warning, n)
                }, e.prototype.showInfoDialog = function (e, t) {
                    var n = e.localization.localized({fallback: "Info", key: "modal-dialog-title-info"});
                    return this.showDialog(e, t, s.DialogStyle.info, n)
                }, e.prototype.showLoadingDialog = function (e, t, n) {
                    return o(this, void 0, void 0, (function () {
                        var o, r, s, c;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    (o = new a.LoadingDialog(e)).title = t.title, o.message = t.message || "", this.showView(o.view), r = !1, i.label = 1;
                                case 1:
                                    return i.trys.push([1, 3, , 4]), [4, n];
                                case 2:
                                    return i.sent(), [3, 4];
                                case 3:
                                    return c = i.sent(), r = !0, s = c, [3, 4];
                                case 4:
                                    if (this.hide(o.view), r) throw s;
                                    return [2]
                            }
                        }))
                    }))
                }, e.prototype.showDialog = function (e, t, n, o) {
                    var i, a, c, l = this, u = new r.ModalDialog(e, n);
                    return i = [o || t.title, o ? t.title : ""], u.title = i[0], u.subTitle = i[1], u.message = t.message, u.detailMessage = t.detailMessage || "", t.button ? a = t.button : t.primaryButton ? (a = t.primaryButton, c = t.secondaryButton || s.DialogButton.cancel) : (a = s.DialogButton.okay, c = t.secondaryButton), c && u.addButton(c), a && u.addButton(a), this.showView(u.view), new Promise((function (e) {
                        u.onButtonPressed = function (t) {
                            l.hide(u.view), e([s.DialogButtonType.secondary, s.DialogButtonType.primary][t])
                        }
                    }))
                }, e.prototype.hide = function (e) {
                    var t = this;
                    this.currentPresentations.forEach((function (n, o) {
                        if (n.view === e) {
                            var i = t.currentPresentations.splice(o, 1)[0];
                            e.remove(), i.onHide(), t.updatePresentationDisplay()
                        }
                    }))
                }, e.prototype.hideCurrent = function () {
                    var e = this.currentPresentations.shift();
                    e && (e.view.remove(), e.onHide(), this.updatePresentationDisplay())
                }, e.prototype.updatePresentationDisplay = function () {
                    if (this.currentPresentations.length > 0) {
                        this.view.style.display = "", this.frame.blurry = !0;
                        var e = this.currentPresentations[0].view;
                        this.overlay.appendChild(e)
                    } else this.view.style.display = "none", this.frame.blurry = !1
                }, e
            }();
            t.ModalPresenter = c
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(0), c = n(9), l = function (e) {
                function t(t, o) {
                    void 0 === o && (o = c.DialogStyle.default);
                    var i = e.call(this, t) || this;
                    if (i.view = document.createElement("wbm-core-modal-dialog"), i.view.innerHTML = n(78), i.view.querySelector(".modal").classList.add(o), "default" === o) {
                        var r = i.view.querySelector(".modal > .sub-title");
                        r && r.remove()
                    }
                    var a = i.view.querySelector(".show-details"), s = i.view.querySelector(".detail-message");
                    return s.style.opacity = "0.0", a.style.display = "none", a.addEventListener("click", (function () {
                        i.view.querySelector(".modal").classList.add("enlarge"), a.style.display = "none", s.style.opacity = "1.0"
                    })), i
                }

                return i(t, e), Object.defineProperty(t.prototype, "title", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .title");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .title");
                        t && (t.textContent = e)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "subTitle", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .sub-title");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .sub-title");
                        t && (t.textContent = e)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "message", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .message");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .message");
                        t && (t.textContent = e)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "detailMessage", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .detail-message");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .detail-message");
                        t && (t.textContent = e), this.view.querySelector(".show-details").style.display = e ? "" : "none"
                    }, enumerable: !0, configurable: !0
                }), t.prototype.addButton = function (e) {
                    var t = this;
                    switch (e) {
                        case c.DialogButton.okay:
                            e = {
                                title: this.base.localization.localized({fallback: "OK", key: "okay-modal-button"}),
                                style: c.DialogButtonStyle.default,
                                hidesDialog: !0
                            };
                            break;
                        case c.DialogButton.cancel:
                            e = {
                                title: this.base.localization.localized({
                                    fallback: "Cancel",
                                    key: "cancel-modal-button"
                                }), style: c.DialogButtonStyle.default, hidesDialog: !0
                            }
                    }
                    var n = e, o = this.view.querySelector("div.buttons"), i = document.createElement("button");
                    switch (i.textContent = n.title, n.style) {
                        case c.DialogButtonStyle.action:
                            i.classList.add("action")
                    }
                    var r = o.childElementCount;
                    o.appendChild(i), n.hidesDialog, i.addEventListener("click", (function () {
                        t.onButtonPressed && t.onButtonPressed(r)
                    })), i.setAttribute("taid", "modal-dialog-button-" + (r + 1))
                }, t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t
            }(s.ViewController);
            t.ModalDialog = l
        }, function (e, t) {
            e.exports = "<div taid=modal-dialog class=modal> <span taid=modal-dialog-title class=title></span> <span class=sub-title></span> <div taid=modal-message class=message></div> <span taid=modal-dialog-show-details class=show-details>show details</span> <div taid=modal-dialog-detail-message class=detail-message></div> <div class=buttons> </div> </div>"
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = function (e) {
                function t(t) {
                    var o = e.call(this, t) || this;
                    return o.view = document.createElement("wbm-core-loading-dialog"), o.view.innerHTML = n(80), o
                }

                return i(t, e), Object.defineProperty(t.prototype, "title", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .title");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .title");
                        t && (t.textContent = e)
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t.prototype, "message", {
                    get: function () {
                        var e = this.view.querySelector(".modal > .message");
                        return e && e.textContent || ""
                    }, set: function (e) {
                        var t = this.view.querySelector(".modal > .message");
                        t && (t.textContent = e)
                    }, enumerable: !0, configurable: !0
                }), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t
            }(n(0).ViewController);
            t.LoadingDialog = s
        }, function (e, t) {
            e.exports = "<div taid=loading-dialog class=modal> <span taid=modal-dialog-title class=title></span> <div taid=modal-message class=message></div> <div class=indicator></div> </div>"
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = function (e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.timer = 0, n.view = document.createElement("div"), n.view.classList.add("status-area-child"), n
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t.prototype.setDate = function (e) {
                    this.date = e, this.updateDateDisplay()
                }, t.prototype.updateDateDisplay = function () {
                    var e = this;
                    this.timer && window.clearTimeout(this.timer), null != this.date && (this.view.innerHTML = this.date.toLocaleDateString() + " " + this.date.toLocaleTimeString(), this.date = new Date(this.date.getTime() + 1e3), this.timer = window.setTimeout((function () {
                        return e.updateDateDisplay()
                    }), 1e3))
                }, t
            }(n(0).ViewController);
            t.DateController = s
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(0);
            !function (e) {
                e.off = "off", e.green = "green", e.red = "red", e.yellow = "yellow"
            }(t.LEDColor || (t.LEDColor = {}));
            var c = function (e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.view = document.createElement("div"), n.view.classList.add("status-area-child"), n.ledTable = document.createElement("div"), n.ledTable.classList.add("led-table"), n.view.appendChild(n.ledTable), n
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t.prototype.setLEDConfig = function (e) {
                    for (var t = 0, n = e.leds; t < n.length; t++) {
                        var o = n[t];
                        this.ledTable.appendChild(this.buildLEDItem(o.name))
                    }
                }, t.prototype.buildLEDItem = function (e) {
                    var t = document.createElement("div");
                    return t.classList.add("led-item"), t.innerHTML = '<div id="led-item-' + e + '" class="led"><div class="tooltip"></div></div><div>' + e + "</div>", t
                }, t.prototype.updateLEDColors = function (e) {
                    for (var t in e) {
                        var n = this.view.querySelector("#led-item-" + t);
                        n.className = "led";
                        var o = void 0, i = void 0, r = e[t].color;
                        r instanceof Array ? (o = r[0], i = r[1]) : o = r, n.classList.add("led-" + o), i && n.classList.add("led-and-" + i), n.querySelector(".tooltip").innerHTML = e[t].tooltip
                    }
                }, t
            }(s.ViewController);
            t.LEDController = c
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(0);
            n(84);
            var c = function (e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.view = document.createElement("div"), n.view.classList.add("status-area-plc-switch"), n
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t.prototype.updateSwitchState = function (e) {
                    this.view.classList.toggle("switch-state-toggler", e)
                }, t
            }(s.ViewController);
            t.PLCSwitchController = c
        }, function (e, t, n) {
            var o = n(85);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            (e.exports = n(2)(!1)).push([e.i, 'wbm-core-status-area div.status-area-plc-switch{position:relative;background:#fefefe;border:1px solid #ccc;border-radius:11.5px;width:53px;height:23px;font-size:9px}wbm-core-status-area div.status-area-plc-switch:before,wbm-core-status-area div.status-area-plc-switch:after{display:none;position:absolute;width:50%;padding:3px;border:1px solid #ccc;border-radius:11.5px;background:#e4e4e4;text-align:center}wbm-core-status-area div.status-area-plc-switch:before{content:"RUN";left:0}wbm-core-status-area div.status-area-plc-switch:after{display:block;content:"STOP";right:0}wbm-core-status-area div.status-area-plc-switch.switch-state-toggler:before{display:block}wbm-core-status-area div.status-area-plc-switch.switch-state-toggler:after{display:none}', ""])
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                Object.defineProperty(t, "__esModule", {value: !0}), n(87), window.$ = e, n(91), n(92);
                var o = n(93);
                t.default = function (e) {
                    return new o.Core(e)
                }
            }).call(this, n(8))
        }, function (e, t, n) {
            "use strict";
            e.exports = n(88).polyfill()
        }, function (e, t, n) {
            (function (t, n) {
                /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */
                var o;
                o = function () {
                    "use strict";

                    function e(e) {
                        return "function" == typeof e
                    }

                    var o = Array.isArray ? Array.isArray : function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }, i = 0, r = void 0, a = void 0, s = function (e, t) {
                            h[i] = e, h[i + 1] = t, 2 === (i += 2) && (a ? a(v) : w())
                        }, c = "undefined" != typeof window ? window : void 0, l = c || {},
                        u = l.MutationObserver || l.WebKitMutationObserver,
                        f = "undefined" == typeof self && void 0 !== t && "[object process]" === {}.toString.call(t),
                        d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                    function p() {
                        var e = setTimeout;
                        return function () {
                            return e(v, 1)
                        }
                    }

                    var h = new Array(1e3);

                    function v() {
                        for (var e = 0; e < i; e += 2) (0, h[e])(h[e + 1]), h[e] = void 0, h[e + 1] = void 0;
                        i = 0
                    }

                    var b, m, y, g, w = void 0;

                    function x(e, t) {
                        var n = this, o = new this.constructor(S);
                        void 0 === o[_] && q(o);
                        var i = n._state;
                        if (i) {
                            var r = arguments[i - 1];
                            s((function () {
                                return B(i, o, r, n._result)
                            }))
                        } else I(n, o, e, t);
                        return o
                    }

                    function k(e) {
                        if (e && "object" == typeof e && e.constructor === this) return e;
                        var t = new this(S);
                        return L(t, e), t
                    }

                    f ? w = function () {
                        return t.nextTick(v)
                    } : u ? (m = 0, y = new u(v), g = document.createTextNode(""), y.observe(g, {characterData: !0}), w = function () {
                        g.data = m = ++m % 2
                    }) : d ? ((b = new MessageChannel).port1.onmessage = v, w = function () {
                        return b.port2.postMessage(0)
                    }) : w = void 0 === c ? function () {
                        try {
                            var e = Function("return this")().require("vertx");
                            return void 0 !== (r = e.runOnLoop || e.runOnContext) ? function () {
                                r(v)
                            } : p()
                        } catch (e) {
                            return p()
                        }
                    }() : p();
                    var _ = Math.random().toString(36).substring(2);

                    function S() {
                    }

                    var C = void 0, E = 1, P = 2, T = {error: null};

                    function O(e) {
                        try {
                            return e.then
                        } catch (e) {
                            return T.error = e, T
                        }
                    }

                    function j(t, n, o) {
                        n.constructor === t.constructor && o === x && n.constructor.resolve === k ? function (e, t) {
                            t._state === E ? D(e, t._result) : t._state === P ? M(e, t._result) : I(t, void 0, (function (t) {
                                return L(e, t)
                            }), (function (t) {
                                return M(e, t)
                            }))
                        }(t, n) : o === T ? (M(t, T.error), T.error = null) : void 0 === o ? D(t, n) : e(o) ? function (e, t, n) {
                            s((function (e) {
                                var o = !1, i = function (e, t, n, o) {
                                    try {
                                        e.call(t, n, o)
                                    } catch (e) {
                                        return e
                                    }
                                }(n, t, (function (n) {
                                    o || (o = !0, t !== n ? L(e, n) : D(e, n))
                                }), (function (t) {
                                    o || (o = !0, M(e, t))
                                }), e._label);
                                !o && i && (o = !0, M(e, i))
                            }), e)
                        }(t, n, o) : D(t, n)
                    }

                    function L(e, t) {
                        var n, o;
                        e === t ? M(e, new TypeError("You cannot resolve a promise with itself")) : (o = typeof (n = t), null === n || "object" !== o && "function" !== o ? D(e, t) : j(e, t, O(t)))
                    }

                    function A(e) {
                        e._onerror && e._onerror(e._result), z(e)
                    }

                    function D(e, t) {
                        e._state === C && (e._result = t, e._state = E, 0 !== e._subscribers.length && s(z, e))
                    }

                    function M(e, t) {
                        e._state === C && (e._state = P, e._result = t, s(A, e))
                    }

                    function I(e, t, n, o) {
                        var i = e._subscribers, r = i.length;
                        e._onerror = null, i[r] = t, i[r + E] = n, i[r + P] = o, 0 === r && e._state && s(z, e)
                    }

                    function z(e) {
                        var t = e._subscribers, n = e._state;
                        if (0 !== t.length) {
                            for (var o = void 0, i = void 0, r = e._result, a = 0; a < t.length; a += 3) o = t[a], i = t[a + n], o ? B(n, o, i, r) : i(r);
                            e._subscribers.length = 0
                        }
                    }

                    function B(t, n, o, i) {
                        var r = e(o), a = void 0, s = void 0, c = void 0, l = void 0;
                        if (r) {
                            if ((a = function (e, t) {
                                try {
                                    return e(t)
                                } catch (e) {
                                    return T.error = e, T
                                }
                            }(o, i)) === T ? (l = !0, s = a.error, a.error = null) : c = !0, n === a) return void M(n, new TypeError("A promises callback cannot return that same promise."))
                        } else a = i, c = !0;
                        n._state !== C || (r && c ? L(n, a) : l ? M(n, s) : t === E ? D(n, a) : t === P && M(n, a))
                    }

                    var R = 0;

                    function q(e) {
                        e[_] = R++, e._state = void 0, e._result = void 0, e._subscribers = []
                    }

                    var V = function () {
                        function e(e, t) {
                            this._instanceConstructor = e, this.promise = new e(S), this.promise[_] || q(this.promise), o(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? D(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && D(this.promise, this._result))) : M(this.promise, new Error("Array Methods must be provided an Array"))
                        }

                        return e.prototype._enumerate = function (e) {
                            for (var t = 0; this._state === C && t < e.length; t++) this._eachEntry(e[t], t)
                        }, e.prototype._eachEntry = function (e, t) {
                            var n = this._instanceConstructor, o = n.resolve;
                            if (o === k) {
                                var i = O(e);
                                if (i === x && e._state !== C) this._settledAt(e._state, t, e._result); else if ("function" != typeof i) this._remaining--, this._result[t] = e; else if (n === N) {
                                    var r = new n(S);
                                    j(r, e, i), this._willSettleAt(r, t)
                                } else this._willSettleAt(new n((function (t) {
                                    return t(e)
                                })), t)
                            } else this._willSettleAt(o(e), t)
                        }, e.prototype._settledAt = function (e, t, n) {
                            var o = this.promise;
                            o._state === C && (this._remaining--, e === P ? M(o, n) : this._result[t] = n), 0 === this._remaining && D(o, this._result)
                        }, e.prototype._willSettleAt = function (e, t) {
                            var n = this;
                            I(e, void 0, (function (e) {
                                return n._settledAt(E, t, e)
                            }), (function (e) {
                                return n._settledAt(P, t, e)
                            }))
                        }, e
                    }(), N = function () {
                        function e(t) {
                            this[_] = R++, this._result = this._state = void 0, this._subscribers = [], S !== t && ("function" != typeof t && function () {
                                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                            }(), this instanceof e ? function (e, t) {
                                try {
                                    t((function (t) {
                                        L(e, t)
                                    }), (function (t) {
                                        M(e, t)
                                    }))
                                } catch (t) {
                                    M(e, t)
                                }
                            }(this, t) : function () {
                                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                            }())
                        }

                        return e.prototype.catch = function (e) {
                            return this.then(null, e)
                        }, e.prototype.finally = function (e) {
                            var t = this.constructor;
                            return this.then((function (n) {
                                return t.resolve(e()).then((function () {
                                    return n
                                }))
                            }), (function (n) {
                                return t.resolve(e()).then((function () {
                                    throw n
                                }))
                            }))
                        }, e
                    }();
                    return N.prototype.then = x, N.all = function (e) {
                        return new V(this, e).promise
                    }, N.race = function (e) {
                        var t = this;
                        return o(e) ? new t((function (n, o) {
                            for (var i = e.length, r = 0; r < i; r++) t.resolve(e[r]).then(n, o)
                        })) : new t((function (e, t) {
                            return t(new TypeError("You must pass an array to race."))
                        }))
                    }, N.resolve = k, N.reject = function (e) {
                        var t = new this(S);
                        return M(t, e), t
                    }, N._setScheduler = function (e) {
                        a = e
                    }, N._setAsap = function (e) {
                        s = e
                    }, N._asap = s, N.polyfill = function () {
                        var e = void 0;
                        if (void 0 !== n) e = n; else if ("undefined" != typeof self) e = self; else try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var t = e.Promise;
                        if (t) {
                            var o = null;
                            try {
                                o = Object.prototype.toString.call(t.resolve())
                            } catch (e) {
                            }
                            if ("[object Promise]" === o && !t.cast) return
                        }
                        e.Promise = N
                    }, N.Promise = N, N
                }, e.exports = o()
            }).call(this, n(89), n(90))
        }, function (e, t) {
            var n, o, i = e.exports = {};

            function r() {
                throw new Error("setTimeout has not been defined")
            }

            function a() {
                throw new Error("clearTimeout has not been defined")
            }

            function s(e) {
                if (n === setTimeout) return setTimeout(e, 0);
                if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
                try {
                    return n(e, 0)
                } catch (t) {
                    try {
                        return n.call(null, e, 0)
                    } catch (t) {
                        return n.call(this, e, 0)
                    }
                }
            }

            !function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : r
                } catch (e) {
                    n = r
                }
                try {
                    o = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    o = a
                }
            }();
            var c, l = [], u = !1, f = -1;

            function d() {
                u && c && (u = !1, c.length ? l = c.concat(l) : f = -1, l.length && p())
            }

            function p() {
                if (!u) {
                    var e = s(d);
                    u = !0;
                    for (var t = l.length; t;) {
                        for (c = l, l = []; ++f < t;) c && c[f].run();
                        f = -1, t = l.length
                    }
                    c = null, u = !1, function (e) {
                        if (o === clearTimeout) return clearTimeout(e);
                        if ((o === a || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
                        try {
                            o(e)
                        } catch (t) {
                            try {
                                return o.call(null, e)
                            } catch (t) {
                                return o.call(this, e)
                            }
                        }
                    }(e)
                }
            }

            function h(e, t) {
                this.fun = e, this.array = t
            }

            function v() {
            }

            i.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                l.push(new h(e, t)), 1 !== l.length || u || s(p)
            }, h.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = v, i.addListener = v, i.once = v, i.off = v, i.removeListener = v, i.removeAllListeners = v, i.emit = v, i.prependListener = v, i.prependOnceListener = v, i.listeners = function (e) {
                return []
            }, i.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, i.cwd = function () {
                return "/"
            }, i.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }, i.umask = function () {
                return 0
            }
        }, function (e, t) {
            var n;
            n = function () {
                return this
            }();
            try {
                n = n || new Function("return this")()
            } catch (e) {
                "object" == typeof window && (n = window)
            }
            e.exports = n
        }, function (e, t) {
            !function (e) {
                "use strict";
                if (!e.fetch) {
                    var t = {
                        searchParams: "URLSearchParams" in e,
                        iterable: "Symbol" in e && "iterator" in Symbol,
                        blob: "FileReader" in e && "Blob" in e && function () {
                            try {
                                return new Blob, !0
                            } catch (e) {
                                return !1
                            }
                        }(),
                        formData: "FormData" in e,
                        arrayBuffer: "ArrayBuffer" in e
                    };
                    if (t.arrayBuffer) var n = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                        o = function (e) {
                            return e && DataView.prototype.isPrototypeOf(e)
                        }, i = ArrayBuffer.isView || function (e) {
                            return e && n.indexOf(Object.prototype.toString.call(e)) > -1
                        };
                    u.prototype.append = function (e, t) {
                        e = s(e), t = c(t);
                        var n = this.map[e];
                        this.map[e] = n ? n + "," + t : t
                    }, u.prototype.delete = function (e) {
                        delete this.map[s(e)]
                    }, u.prototype.get = function (e) {
                        return e = s(e), this.has(e) ? this.map[e] : null
                    }, u.prototype.has = function (e) {
                        return this.map.hasOwnProperty(s(e))
                    }, u.prototype.set = function (e, t) {
                        this.map[s(e)] = c(t)
                    }, u.prototype.forEach = function (e, t) {
                        for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
                    }, u.prototype.keys = function () {
                        var e = [];
                        return this.forEach((function (t, n) {
                            e.push(n)
                        })), l(e)
                    }, u.prototype.values = function () {
                        var e = [];
                        return this.forEach((function (t) {
                            e.push(t)
                        })), l(e)
                    }, u.prototype.entries = function () {
                        var e = [];
                        return this.forEach((function (t, n) {
                            e.push([n, t])
                        })), l(e)
                    }, t.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
                    var r = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                    b.prototype.clone = function () {
                        return new b(this, {body: this._bodyInit})
                    }, v.call(b.prototype), v.call(y.prototype), y.prototype.clone = function () {
                        return new y(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new u(this.headers),
                            url: this.url
                        })
                    }, y.error = function () {
                        var e = new y(null, {status: 0, statusText: ""});
                        return e.type = "error", e
                    };
                    var a = [301, 302, 303, 307, 308];
                    y.redirect = function (e, t) {
                        if (-1 === a.indexOf(t)) throw new RangeError("Invalid status code");
                        return new y(null, {status: t, headers: {location: e}})
                    }, e.Headers = u, e.Request = b, e.Response = y, e.fetch = function (e, n) {
                        return new Promise((function (o, i) {
                            var r = new b(e, n), a = new XMLHttpRequest;
                            a.onload = function () {
                                var e, t, n = {
                                    status: a.status,
                                    statusText: a.statusText,
                                    headers: (e = a.getAllResponseHeaders() || "", t = new u, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function (e) {
                                        var n = e.split(":"), o = n.shift().trim();
                                        if (o) {
                                            var i = n.join(":").trim();
                                            t.append(o, i)
                                        }
                                    })), t)
                                };
                                n.url = "responseURL" in a ? a.responseURL : n.headers.get("X-Request-URL");
                                var i = "response" in a ? a.response : a.responseText;
                                o(new y(i, n))
                            }, a.onerror = function () {
                                i(new TypeError("Network request failed"))
                            }, a.ontimeout = function () {
                                i(new TypeError("Network request failed"))
                            }, a.open(r.method, r.url, !0), "include" === r.credentials ? a.withCredentials = !0 : "omit" === r.credentials && (a.withCredentials = !1), "responseType" in a && t.blob && (a.responseType = "blob"), r.headers.forEach((function (e, t) {
                                a.setRequestHeader(t, e)
                            })), a.send(void 0 === r._bodyInit ? null : r._bodyInit)
                        }))
                    }, e.fetch.polyfill = !0
                }

                function s(e) {
                    if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
                    return e.toLowerCase()
                }

                function c(e) {
                    return "string" != typeof e && (e = String(e)), e
                }

                function l(e) {
                    var n = {
                        next: function () {
                            var t = e.shift();
                            return {done: void 0 === t, value: t}
                        }
                    };
                    return t.iterable && (n[Symbol.iterator] = function () {
                        return n
                    }), n
                }

                function u(e) {
                    this.map = {}, e instanceof u ? e.forEach((function (e, t) {
                        this.append(t, e)
                    }), this) : Array.isArray(e) ? e.forEach((function (e) {
                        this.append(e[0], e[1])
                    }), this) : e && Object.getOwnPropertyNames(e).forEach((function (t) {
                        this.append(t, e[t])
                    }), this)
                }

                function f(e) {
                    if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
                    e.bodyUsed = !0
                }

                function d(e) {
                    return new Promise((function (t, n) {
                        e.onload = function () {
                            t(e.result)
                        }, e.onerror = function () {
                            n(e.error)
                        }
                    }))
                }

                function p(e) {
                    var t = new FileReader, n = d(t);
                    return t.readAsArrayBuffer(e), n
                }

                function h(e) {
                    if (e.slice) return e.slice(0);
                    var t = new Uint8Array(e.byteLength);
                    return t.set(new Uint8Array(e)), t.buffer
                }

                function v() {
                    return this.bodyUsed = !1, this._initBody = function (e) {
                        if (this._bodyInit = e, e) if ("string" == typeof e) this._bodyText = e; else if (t.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e; else if (t.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e; else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString(); else if (t.arrayBuffer && t.blob && o(e)) this._bodyArrayBuffer = h(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]); else {
                            if (!t.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !i(e)) throw new Error("unsupported BodyInit type");
                            this._bodyArrayBuffer = h(e)
                        } else this._bodyText = "";
                        this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                    }, t.blob && (this.blob = function () {
                        var e = f(this);
                        if (e) return e;
                        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([this._bodyText]))
                    }, this.arrayBuffer = function () {
                        return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(p)
                    }), this.text = function () {
                        var e, t, n, o = f(this);
                        if (o) return o;
                        if (this._bodyBlob) return e = this._bodyBlob, n = d(t = new FileReader), t.readAsText(e), n;
                        if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
                            for (var t = new Uint8Array(e), n = new Array(t.length), o = 0; o < t.length; o++) n[o] = String.fromCharCode(t[o]);
                            return n.join("")
                        }(this._bodyArrayBuffer));
                        if (this._bodyFormData) throw new Error("could not read FormData body as text");
                        return Promise.resolve(this._bodyText)
                    }, t.formData && (this.formData = function () {
                        return this.text().then(m)
                    }), this.json = function () {
                        return this.text().then(JSON.parse)
                    }, this
                }

                function b(e, t) {
                    var n, o, i = (t = t || {}).body;
                    if (e instanceof b) {
                        if (e.bodyUsed) throw new TypeError("Already read");
                        this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
                    } else this.url = String(e);
                    if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = (o = (n = t.method || this.method || "GET").toUpperCase(), r.indexOf(o) > -1 ? o : n), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
                    this._initBody(i)
                }

                function m(e) {
                    var t = new FormData;
                    return e.trim().split("&").forEach((function (e) {
                        if (e) {
                            var n = e.split("="), o = n.shift().replace(/\+/g, " "),
                                i = n.join("=").replace(/\+/g, " ");
                            t.append(decodeURIComponent(o), decodeURIComponent(i))
                        }
                    })), t
                }

                function y(e, t) {
                    t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e)
                }
            }("undefined" != typeof self ? self : this)
        }, function (e, t, n) {
            "use strict";
            [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach((function (e) {
                "remove" in e || Object.defineProperty(e, "remove", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function () {
                        null !== this.parentNode && this.parentNode.removeChild(this)
                    }
                })
            })), Promise._setScheduler && Promise._setScheduler((function (e) {
                setTimeout(e)
            })), "function" != typeof window.CustomEvent && (window.CustomEvent = function (e, t) {
                t = t || {bubbles: !1, cancelable: !1, detail: void 0};
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            }, window.CustomEvent.prototype = window.Event.prototype)
        }, function (e, t, n) {
            "use strict";
            var o = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, i = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var r = n(94), a = n(4), s = n(14), c = n(24), l = function () {
                function e(e) {
                    this.frame = new r.Frame, this.didSetupRoutes = !1, this.body = e, a.default.info("[Core] core wbm instanciated"), this.applyBrowserSpecifics()
                }

                return e.prototype.loadBase = function (e) {
                    return o(this, void 0, void 0, (function () {
                        var t, n, o, r;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return null == e.authentication.getActiveUser() ? (this.showLogin(), [2]) : [4, this.loadPlugins(e)];
                                case 1:
                                    return t = i.sent(), this.setupFrame(e), n = t.filter((function (e) {
                                        return "base-area" === e.requires
                                    })), [4, this.loadBaseAreas(n, e)];
                                case 2:
                                    return i.sent(), o = t.filter((function (e) {
                                        return "fieldbus-area" === e.requires
                                    })), [4, this.loadFieldbusAreas(o, e)];
                                case 3:
                                    return i.sent(), r = t.filter((function (e) {
                                        return "status-area" === e.requires
                                    })), [4, this.loadStatusAreas(e, r)];
                                case 4:
                                    return i.sent(), a.default.info("[Core] base wbm loaded"), this.setupRoutes(), [2]
                            }
                        }))
                    }))
                }, e.prototype.loadPlugins = function (e) {
                    return o(this, void 0, void 0, (function () {
                        var t, n, o;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return [4, e.plugin.load()];
                                case 1:
                                    return t = i.sent(), n = [], t = t.filter((function (e) {
                                        return !(e instanceof Error && (n.push(e), 1))
                                    })), n.length > 0 && (o = e.localization.localized({
                                        key: "some-plugins-not-loaded-modal-message",
                                        fallback: "Some Plugins were not loaded. See details for further information."
                                    }), e.modalPresenter.showErrorDialog(e, {
                                        title: e.localization.localized({
                                            key: "some-plugins-not-loaded-modal-title",
                                            fallback: "Some Plugins did not load"
                                        }), message: o, detailMessage: n.join("\n")
                                    })), [2, t]
                            }
                        }))
                    }))
                }, e.prototype.loadStatusAreas = function (e, t) {
                    return o(this, void 0, void 0, (function () {
                        var n = this;
                        return i(this, (function (o) {
                            switch (o.label) {
                                case 0:
                                    return [4, Promise.all(t.map((function (t) {
                                        return t.load(e).catch((function (e) {
                                            return a.default.warn("[Core] plugin " + t.name + "@" + t.version + " has not been loaded due to an error", e), null
                                        }))
                                    })))];
                                case 1:
                                    return o.sent().filter((function (e) {
                                        return null != e
                                    })).forEach((function (e) {
                                        n.frame.registerStatusItem({id: e.id, priority: e.priority}, e.controller)
                                    })), a.default.info("[Core] status is loaded"), [2]
                            }
                        }))
                    }))
                }, e.prototype.applyBrowserSpecifics = function () {
                    var e = new c.Browser;
                    a.default.info('[Core] Browser detected: "' + e.userAgent + '"'), e.runsInTouchMode && (a.default.info("[Core] Browser runs in touch mode"), this.body.classList.add("touch-device")), e.needsContentUpscaling && (a.default.info("[Core] Browser needs enlarged content"), this.body.classList.add("larger")), e.isGPUPerformanceCritical && (a.default.info("[Core] Browser runs on a performance critical device"), this.body.classList.add("performance"))
                }, e.prototype.loadBaseAreas = function (e, t) {
                    return o(this, void 0, void 0, (function () {
                        var n, o = this;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return [4, Promise.all(e.map((function (e) {
                                        return e.load(t).catch((function (t) {
                                            return a.default.warn("[Core] plugin " + e.name + "@" + e.version + " has not been loaded due to an error", t), null
                                        }))
                                    })))];
                                case 1:
                                    return (n = (n = i.sent()).filter((function (e) {
                                        return null != e
                                    }))).forEach((function (e, i) {
                                        o.frame.registerMainMenuItem({
                                            id: e.id,
                                            title: t.localization.localized(e.title),
                                            tooltip: e.description && t.localization.localized(e.description),
                                            priority: e.priority,
                                            userRoles: e.userRoles
                                        }, e.controller), a.default.info("[Core] (" + (i + 1) + "/" + n.length + ") added " + e.id + " base area to the frame")
                                    })), [2]
                            }
                        }))
                    }))
                }, e.prototype.loadFieldbusAreas = function (e, t) {
                    return o(this, void 0, void 0, (function () {
                        var n, o, r, s;
                        return i(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return 0 == e.length ? [2] : (n = [], [4, Promise.all(e.map((function (e) {
                                        return e.load(t).then((function (e) {
                                            if (e.userRoles) for (var t = 0, o = e.userRoles; t < o.length; t++) {
                                                var i = o[t];
                                                n.indexOf(i) < 0 && n.push(i)
                                            }
                                            return e
                                        })).catch((function (t) {
                                            return a.default.warn("[Core] plugin " + e.name + "@" + e.version + " has not been loaded due to an error", t), null
                                        }))
                                    })))]);
                                case 1:
                                    return o = (o = i.sent()).filter((function (e) {
                                        return null != e
                                    })), r = "fieldbus", s = t.subframeGenerator.createSubFrame(r, t, ["fieldbus-area"]), this.frame.registerMainMenuItem({
                                        id: r,
                                        title: t.localization.localized({
                                            key: "fieldbus-main-menu-title",
                                            fallback: "Fieldbus"
                                        }),
                                        tooltip: t.localization.localized({
                                            key: "fieldbus-main-menu-description",
                                            fallback: "Fieldbus configuration"
                                        }),
                                        priority: 850,
                                        userRoles: n
                                    }, s), a.default.info("[Core] added predefined " + r + " base area to the frame"), o.forEach((function (e, n) {
                                        s.registerSubMenuItem({
                                            id: e.id,
                                            title: t.localization.localized(e.title),
                                            tooltip: e.description && t.localization.localized(e.description),
                                            priority: e.priority,
                                            userRoles: e.userRoles
                                        }, e.controller), a.default.info("[Core] (" + (n + 1) + "/" + o.length + ") added " + e.id + " fieldbus area to the frame")
                                    })), [2]
                            }
                        }))
                    }))
                }, e.prototype.setupFrame = function (e) {
                    this.frame.initialize(e), this.body.appendChild(this.frame.element)
                }, e.prototype.setupRoutes = function () {
                    var e = this;
                    if (!this.didSetupRoutes) {
                        this.didSetupRoutes = !0;
                        var t = function (t, n) {
                            e.frame.onRouteChange(t.split("/"))
                        };
                        s.changed.add(t), s.initialized.add(t), setTimeout((function () {
                            return s.init()
                        }), 0)
                    }
                }, e
            }();
            t.Core = l
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0});
            var o = n(95), i = n(96), r = n(98), a = n(99);
            n(102);
            var s = function () {
                function e() {
                    this.warningDialogIsVisible = !1, this.element = document.createElement("wbm-core-frame"), this.element.innerHTML = e.template
                }

                return Object.defineProperty(e.prototype, "blurry", {
                    get: function () {
                        return this.element.querySelector("#frame").classList.contains("blurred")
                    }, set: function (e) {
                        e ? this.element.querySelector("#frame").classList.add("blurred") : this.element.querySelector("#frame").classList.remove("blurred")
                    }, enumerable: !0, configurable: !0
                }), e.prototype.registerMainMenuItem = function (e, t) {
                    this.tabMenu && this.tabMenu.addTabItem(e, t)
                }, e.prototype.registerActionItem = function (e, t) {
                    this.actionBar && this.actionBar.addActionItem(e, t)
                }, e.prototype.registerStatusItem = function (e, t) {
                    this.statusArea || (this.statusArea = new a.StatusArea(this.base, this.element.querySelector("div#frame")), this.statusArea.load()), this.statusArea.insertView(e, t)
                }, e.prototype.onRouteChange = function (e) {
                    var t = this;
                    if (!this.warningDialogIsVisible) {
                        var n = this.base.authentication.getActiveUser();
                        n && n.hasDefaultPassword && (this.warningDialogIsVisible = !0, n.roles.indexOf(o.UserRoles.admin) >= 0 ? this.base.modalPresenter.showWarningDialog(this.base, {
                            title: "Default Password",
                            message: "Security message: you are using the default password!"
                        }).then((function () {
                            return t.warningDialogIsVisible = !1
                        })) : this.base.modalPresenter.showWarningDialog(this.base, {
                            title: "Default Password",
                            message: 'Security message: you are using the default password! Please log in as "admin" and change the password.'
                        }).then((function () {
                            return t.warningDialogIsVisible = !1
                        })))
                    }
                    this.tabMenu && this.tabMenu.onRouteChange(e)
                }, e.prototype.initialize = function (e) {
                    this.base = e, this.actionBar = this.actionBar || new i.ActionBar(e, this.element.querySelector("ul#action-bar")), this.tabMenu = this.tabMenu || new r.TabMenu(e, this.element.querySelector("ul#main-menu"), this.element.querySelector("div#main-content"))
                }, e.template = n(104), e
            }();
            t.Frame = s
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
                e.admin = "admin", e.user = "user", e.guest = "guest"
            }(t.UserRoles || (t.UserRoles = {}))
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(13), c = n(0), l = n(4), u = function (e) {
                function t(t, n) {
                    var o = e.call(this, t) || this;
                    return o.entries = [], o.lastItemWidth = 0, o.view = n, window.addEventListener("resize", (function () {
                        return o.updateElementsVisibility(o.view.clientWidth)
                    })), window.addEventListener("load", (function () {
                        return o.updateElementsVisibility(o.view.clientWidth)
                    })), o.view.querySelector(".burger-menu > button").addEventListener("click", (function () {
                        o.toggleBurgerMenu()
                    })), o
                }

                return i(t, e), t.prototype.toggleBurgerMenu = function (e) {
                    var t = this.view.querySelector(".burger-menu");
                    void 0 === e ? t.classList.toggle("visible") : e ? t.classList.add("visible") : t.classList.remove("visible")
                }, t.prototype.updateElementsVisibility = function (e) {
                    for (var t = this.view.querySelectorAll("li:not(.burger-item):not(.burger-menu)"), n = this.view.querySelectorAll(".burger-menu li"), o = this.getNumberOfVisibleElements(t, e), i = 0; i < t.length; i++) {
                        var r = t[i], a = n[i];
                        i >= o && t.length ? (r.classList.add("burger"), a.classList.add("visible")) : (r.classList.remove("burger"), a.classList.remove("visible"))
                    }
                    o >= t.length && this.toggleBurgerMenu(!1)
                }, t.prototype.getNumberOfVisibleElements = function (e, t) {
                    for (var n = 0, o = this.lastItemWidth || (this.lastItemWidth = e[0] && e[0].offsetWidth + 5), i = 0, r = 0; r < e.length && i < t && !((i += o) > t); r++) n += 1;
                    return n < e.length ? n - 1 : e.length
                }, t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return this.updateElementsVisibility(this.view.clientWidth), [2]
                        }))
                    }))
                }, t.prototype.createActionItemElement = function (e, n, o, i) {
                    var r = document.createElement("li");
                    r.id = "action-bar-item-" + e, r.innerHTML = t.itemTemplate;
                    var a = r.querySelector("button");
                    return a.setAttribute("data-icon", n), a.setAttribute("taid", "action-bar-" + e), a.addEventListener("click", (function () {
                        return i(e)
                    })), r.querySelector("label").textContent = o, r
                }, t.prototype.addActionItem = function (e, t) {
                    if (s.MenuHelper.checkItemId(e.id, this.entries.map((function (e) {
                        return e.item.id
                    })))) {
                        if (e.userRoles) {
                            var n = this.base.authentication.getActiveUser();
                            if (!n || !n.roles.some((function (t) {
                                return e.userRoles.indexOf(t) >= 0
                            }))) return void l.default.info('[Core] Frame: ignoring action item "' + e.id + '" due to insufficient user roles.')
                        }
                        var o = this.createActionItemElement(e.id, e.icon, e.title, t),
                            i = s.MenuHelper.getInsertionIndexForPriority(e.priority, this.entries.map((function (e) {
                                return e.item.priority
                            })));
                        s.MenuHelper.insertListItemElement(o, this.view, i);
                        var r = this.view.querySelector(".burger-menu > ul"),
                            a = this.createActionItemElement(e.id + "-burger", e.icon, e.title, t);
                        a.classList.add("burger-item"), s.MenuHelper.insertListItemElement(a, r, i), this.entries.splice(i, 0, {
                            item: e,
                            action: t,
                            element: o
                        }), this.updateElementsVisibility(this.view.clientWidth)
                    }
                }, t.itemTemplate = n(97), t
            }(c.ViewController);
            t.ActionBar = u
        }, function (e, t) {
            e.exports = "<button class=action-bar-button> </button> <label>Action!</label>"
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            }, s = this && this.__spreadArrays || function () {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                var o = Array(e), i = 0;
                for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                return o
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var c = n(13), l = n(0), u = n(4), f = n(14), d = n(22), p = function (e) {
                function t(t, n, o) {
                    var i = e.call(this, t) || this;
                    return i.tabs = [], i.view = n, i.contentView = o, i.expandTab.addEventListener("click", (function () {
                        return i.toggleExpandableMenu()
                    })), window.addEventListener("resize", (function () {
                        return i.updateElementsVisibility(i.view.clientWidth)
                    })), window.addEventListener("load", (function () {
                        return i.updateElementsVisibility(i.view.clientWidth)
                    })), i
                }

                return i(t, e), Object.defineProperty(t.prototype, "alternativeView", {
                    get: function () {
                        return this.view.querySelector("li.expandable-menu > ul")
                    }, enumerable: !0, configurable: !0
                }), t.prototype.setShowExpandButton = function (e) {
                    this.expandTab.classList.contains("hidden") == e && this.expandTab.classList.toggle("hidden", !e)
                }, t.prototype.updateElementsVisibility = function (e) {
                    var t = this.view.querySelectorAll("li:not(.expandable-menu):not(.alt-item)"),
                        n = this.alternativeView.querySelectorAll("li.alt-item"),
                        o = this.getNumberOfVisibleElements(t, e),
                        i = this.selectedTab ? this.tabs.indexOf(this.selectedTab) : -1;
                    i >= o && (o -= 1);
                    for (var r = 0; r < t.length; r++) {
                        var a = t[r], s = n[r];
                        r === i ? (a.classList.remove("hidden"), s.classList.add("hidden")) : r < o ? (a.classList.remove("hidden"), s.classList.add("hidden")) : (a.classList.add("hidden"), s.classList.remove("hidden"))
                    }
                    o >= t.length ? (this.toggleExpandableMenu(!1), this.setShowExpandButton(!1)) : this.setShowExpandButton(!0)
                }, t.prototype.getNumberOfVisibleElements = function (e, t) {
                    for (var n = 0, o = 170, i = 0; i < e.length && o < t && !((o += 130) > t); i++) n += 1;
                    return n < e.length ? n : e.length
                }, Object.defineProperty(t.prototype, "expandTab", {
                    get: function () {
                        return this.view.querySelector("li.expandable-menu")
                    }, enumerable: !0, configurable: !0
                }), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t.prototype.toggleExpandableMenu = function (e) {
                    e ? this.alternativeView.classList.add("visible") : !1 === e ? this.alternativeView.classList.remove("visible") : this.alternativeView.classList.toggle("visible")
                }, t.prototype.addTabItem = function (e, n) {
                    if (c.MenuHelper.checkItemId(e.id, this.tabs.map((function (e) {
                        return e.item.id
                    })))) {
                        if (e.userRoles) {
                            var o = this.base.authentication.getActiveUser();
                            if (!o || !o.roles.some((function (t) {
                                return e.userRoles.indexOf(t) >= 0
                            }))) return void u.default.info('[Core] Frame: ignoring menu item "' + e.id + '" due to insufficient user roles.')
                        }
                        var i = c.MenuHelper.createMenuItemElement(e.id, e.title, t.menuItemTemplate, !1);
                        i.classList.add("tab-item");
                        var r = c.MenuHelper.createMenuItemElement(e.id, e.title, t.menuItemTemplate, !1);
                        r.classList.add("alt-item");
                        var a = c.MenuHelper.getInsertionIndexForPriority(e.priority, this.tabs.map((function (e) {
                            return e.item.priority
                        })));
                        c.MenuHelper.insertListItemElement(i, this.view, a), c.MenuHelper.insertListItemElement(r, this.alternativeView, a), this.tabs.splice(a, 0, {
                            item: e,
                            controller: n,
                            element: i,
                            alternativeElement: r
                        })
                    }
                }, t.prototype.selectTab = function (e) {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return e === this.selectedTab ? [3, 2] : (this.clearContent(), this.contentView.appendChild(e.controller.view), this.tabs.forEach((function (e) {
                                        e.element.classList.remove("active"), e.alternativeElement.classList.remove("active")
                                    })), e.element.classList.add("active"), e.alternativeElement.classList.add("active"), this.selectedTab && this.selectedTab.controller.unload(), this.selectedTab = e, this.updateElementsVisibility(this.view.clientWidth), [4, e.controller.load()]);
                                case 1:
                                    t.sent(), t.label = 2;
                                case 2:
                                    return [2]
                            }
                        }))
                    }))
                }, t.prototype.onRouteChange = function (e) {
                    var t = (e = s(e)).shift();
                    if (t) {
                        var n = this.tabs.filter((function (e) {
                            return e.item.id.match(new RegExp(t + "(/.*)?$"))
                        }))[0];
                        if (n) this.selectTab(n).then((function () {
                            return n.controller.onRouteChange && n.controller.onRouteChange(e)
                        })); else {
                            u.default.warn("[Frame] menu entry for id " + t + " not found"), this.selectedTab && this.selectedTab.controller.unload(), this.selectedTab = void 0;
                            var o = new d.PageNotFoundController(this.base);
                            this.clearContent(), this.contentView.appendChild(o.view)
                        }
                    } else this.navigateToFirstTab()
                }, t.prototype.navigateToFirstTab = function () {
                    if (u.default.debug("[Core] SubFrame: loading first subelement"), 0 !== this.tabs.length) {
                        var e = this.tabs[0].item.id;
                        f.setHash(e)
                    } else u.default.error("could not find first child")
                }, t.prototype.clearContent = function () {
                    for (var e = 0; e < this.contentView.childElementCount; e++) this.contentView.children[e].remove()
                }, t.menuItemTemplate = n(23), t
            }(l.ViewController);
            t.TabMenu = p
        }, function (e, t, n) {
            "use strict";
            var o, i = this && this.__extends || (o = function (e, t) {
                return (o = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
            }, function (e, t) {
                function n() {
                    this.constructor = e
                }

                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }), r = this && this.__awaiter || function (e, t, n, o) {
                return new (n || (n = Promise))((function (i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((o = o.apply(e, t || [])).next())
                }))
            }, a = this && this.__generator || function (e, t) {
                var n, o, i, r, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(r) {
                    return function (s) {
                        return function (r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {value: r[1], done: !1};
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {value: r[0] ? r[1] : void 0, done: !0}
                        }([r, s])
                    }
                }
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var s = n(0);
            n(100);
            var c = function (e) {
                function t(t, n) {
                    var o = e.call(this, t) || this;
                    return o.items = [], o.childControllers = [], o.view = document.createElement("wbm-core-status-area"), o.innerDiv = document.createElement("div"), o.view.appendChild(o.innerDiv), n.appendChild(o.view), o
                }

                return i(t, e), t.prototype.load = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            return [2]
                        }))
                    }))
                }, t.prototype.unload = function () {
                    return r(this, void 0, void 0, (function () {
                        return a(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all(this.childControllers.map((function (e) {
                                        return e.unload()
                                    })))];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }, t.prototype.insertView = function (e, t) {
                    return r(this, void 0, void 0, (function () {
                        var n, o, i, r, s;
                        return a(this, (function (a) {
                            for (n = 0, o = 0, i = this.items; o < i.length && (r = i[o], !(e.priority < r.priority)); o++) n += 1;
                            return n >= this.items.length ? (this.innerDiv.appendChild(t.view), this.items.push(e), this.childControllers.push(t)) : (s = this.innerDiv.children[n], this.innerDiv.insertBefore(t.view, s), this.items.splice(n, 0, e), this.childControllers.splice(n, 0, t)), t.load(), [2]
                        }))
                    }))
                }, t
            }(s.ViewController);
            t.StatusArea = c
        }, function (e, t, n) {
            var o = n(101);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            (e.exports = n(2)(!1)).push([e.i, "wbm-core-status-area>div{position:absolute;bottom:0;width:100%;height:50px;background:#fcfcfc;z-index:1;border-top:1px solid #ccc;display:flex;align-items:center;padding:0 17px}wbm-core-status-area>div>div{margin-right:17px}wbm-core-status-area>div>div:last-child{margin-right:0px}", ""])
        }, function (e, t, n) {
            var o = n(103);
            "string" == typeof o && (o = [[e.i, o, ""]]), n(3)(o, {
                insert: "head",
                singleton: !1
            }), o.locals && (e.exports = o.locals)
        }, function (e, t, n) {
            t = e.exports = n(2)(!1);
            var o = n(7)(n(15));
            t.push([e.i, "wbm-core-frame ul#main-menu{background-image:url(" + o + ');background-repeat:no-repeat;background-size:85px;background-position:34px 17px}.larger wbm-core-frame ul#main-menu,wbm-core-frame .larger ul#main-menu{background-position-y:23px}.icon,wbm-core-frame ul#action-bar li button.action-bar-button:before{font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga";font-size:14px}.icon.icon-warning,wbm-core-frame ul#action-bar li button.icon-warning.action-bar-button:before{content:"warning"}.icon.icon-info,wbm-core-frame ul#action-bar li button.icon-info.action-bar-button:before{content:"info"}.icon.icon-info-outline,wbm-core-frame ul#action-bar li button.icon-info-outline.action-bar-button:before{content:"info-outline"}.icon.icon-error,wbm-core-frame ul#action-bar li button.icon-error.action-bar-button:before{content:"î€€"}.icon.icon-error-outline,wbm-core-frame ul#action-bar li button.icon-error-outline.action-bar-button:before{content:"î€"}.icon.icon-info,wbm-core-frame ul#action-bar li button.icon-info.action-bar-button:before{content:"î¢Ž"}.icon.icon-info-outline,wbm-core-frame ul#action-bar li button.icon-info-outline.action-bar-button:before{content:"î¢"}.icon.icon-checkmark,wbm-core-frame ul#action-bar li button.icon-checkmark.action-bar-button:before{content:"check"}.icon.icon-crossmark,wbm-core-frame ul#action-bar li button.icon-crossmark.action-bar-button:before{content:"close"}.icon.icon-arrow-down,wbm-core-frame ul#action-bar li button.icon-arrow-down.action-bar-button:before{content:"keyboard_arrow_down"}.icon.icon-exit,wbm-core-frame ul#action-bar li button.icon-exit.action-bar-button:before,.icon.icon-exit:before{content:"exit_to_app"}wbm-core-frame{position:absolute;width:100%;height:100%}wbm-core-frame #frame{min-width:480px;height:100%;will-change:filter;will-change:-webkit-filter;transition:.05s filter ease-in-out;transition:.05s -webkit-filter ease-in-out}wbm-core-frame #frame.blurred{-webkit-filter:url(#svg-blur);filter:url(#svg-blur);-webkit-filter:blur(2px);filter:blur(2px)}wbm-core-frame div#main-header{display:flex;justify-content:stretch;align-items:flex-end;width:100%;border-bottom:1px solid #ccc;background-color:#fcfcfc}wbm-core-frame ul#main-menu{width:67%;min-width:400px;height:60px;background-color:#fcfcfc;padding-left:170px;background-size:85px 34px;background-position-y:center}wbm-core-frame ul#main-menu li.tab-item{position:relative;display:inline-block;width:120px;margin-top:26px;height:34px;background:#f6f6f6;border-top:1px solid #ccc;text-align:center;font-size:14px;font-weight:100;border-top-left-radius:17px;border-top-right-radius:17px;white-space:nowrap;transition:none .05s ease-in-out;transition-property:background-color,width,margin-left;margin-left:0px}wbm-core-frame ul#main-menu li.tab-item:before,wbm-core-frame ul#main-menu li.tab-item:after{content:" ";position:absolute;display:block;top:-1px;width:34px;height:33px;background:inherit;border:inherit}wbm-core-frame ul#main-menu li.tab-item:before{border-top-left-radius:inherit;left:-8.5px;transform:skewX(-23deg);border-left:1px solid #ccc}wbm-core-frame ul#main-menu li.tab-item:after{border-top-right-radius:inherit;right:-7.5px;transform:skewX(23deg);border-right:1px solid #ccc;z-index:1}wbm-core-frame ul#main-menu li.tab-item:hover{cursor:pointer;background:#fafafa}wbm-core-frame ul#main-menu li.tab-item.active{background-color:#fefefe;width:140px;height:35px;border-bottom:1px solid #fefefe;font-weight:normal;box-shadow:0 34px 85px 8px rgba(0,0,0,0.0);z-index:1}wbm-core-frame ul#main-menu li.tab-item.active:first-child{margin-left:-10px}wbm-core-frame ul#main-menu li.tab-item.active:before,wbm-core-frame ul#main-menu li.tab-item.active:after{z-index:1}wbm-core-frame ul#main-menu li.tab-item>a{position:relative;z-index:2;overflow:hidden;text-overflow:ellipsis;display:block;padding:0 10px;padding-top:11.3333333333px;height:34px;text-decoration:none;color:#212121}wbm-core-frame ul#main-menu li.tab-item.expandable-menu{position:absolute;width:53px;height:25px;top:9px;margin-left:-9px}wbm-core-frame ul#main-menu li.tab-item.expandable-menu:before,wbm-core-frame ul#main-menu li.tab-item.expandable-menu:after{height:24px}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>a{text-align:right;padding:9px;pointer-events:none}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul{display:none;position:absolute;border:1px solid #ccc;border-bottom:none;border-radius:2px;z-index:2;top:30px;box-shadow:0 0 16px 0px rgba(33,33,33,.15);left:-50%}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul.visible{display:block}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul:before{display:block;content:" ";z-index:-1;width:15px;height:15px;position:absolute;right:50px;top:-9px;border:1px solid #ccc;background:#fff;transform:rotate(45deg);border-bottom-width:0;border-right-width:0}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul>li{display:block;width:120px;margin:0;height:35px;border:none;border-bottom:1px solid #ccc;background:#fff;text-align:left;font-size:11px;font-weight:normal}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul>li:hover{background:#fafafa}wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul>li>a{padding:0 9px;display:block;width:100%;height:100%;color:#000;text-decoration:none;line-height:34px}wbm-core-frame ul#main-menu li.hidden{display:none !important}wbm-core-frame ul#action-bar{width:33%;position:relative;overflow:hidden;white-space:nowrap;vertical-align:bottom;text-align:right;height:52px;padding-top:5px;margin-bottom:3px;margin-right:9px}wbm-core-frame ul#action-bar li{width:53px;margin-left:5px;display:inline-block;text-align:center}wbm-core-frame ul#action-bar li button.action-bar-button{background:#fefefe;border:1px solid #ccc;border-radius:50%;height:30px;width:30px;vertical-align:bottom;color:#212121;padding:0}wbm-core-frame ul#action-bar li button.action-bar-button:hover{background-color:#f6f6f6}wbm-core-frame ul#action-bar li button.action-bar-button:before{content:attr(data-icon);line-height:28px;font-size:17px}wbm-core-frame ul#action-bar li>label{display:block;white-space:nowrap;font-size:11px}wbm-core-frame ul#action-bar li.burger:not(:last-child),wbm-core-frame ul#action-bar li:not(.burger)+:last-child{display:none}wbm-core-frame ul#action-bar li:last-child>ul{display:block;position:fixed;z-index:2;background:#fefefe;width:120px;right:17px;border:1px solid #ccc;box-shadow:0 0 16px 0px rgba(33,33,33,.15);border-radius:1px}wbm-core-frame ul#action-bar li:last-child>ul:before{display:block;content:" ";z-index:-1;width:15px;height:15px;position:absolute;right:9px;top:-9px;border:1px solid #ccc;background:#fff;transform:rotate(45deg);border-bottom-width:0;border-right-width:0}wbm-core-frame ul#action-bar li.burger-menu:not(.visible)>ul{display:none}wbm-core-frame ul#action-bar li.burger-item{display:none}wbm-core-frame ul#action-bar li.burger-item.visible{display:block;width:100%;text-align:left;margin:0;height:34px}wbm-core-frame ul#action-bar li.burger-item.visible>button{border:0;border-radius:0;display:inline-block;width:100%;height:100%;text-align:left;padding:3px 9px}wbm-core-frame ul#action-bar li.burger-item.visible:not(:last-child)>button{border-bottom:1px solid #ccc}wbm-core-frame ul#action-bar li.burger-item.visible>label{display:inline-block;margin-left:-83px;pointer-events:none;line-height:34px}wbm-core-frame div#main-content{position:absolute;width:100%;top:61px;bottom:0;z-index:1;background:#fefefe;padding:17px 34px;overflow:auto;will-change:scroll-position}wbm-core-frame div#main-content:not(:last-child){bottom:50px}.larger wbm-core-frame ul#main-menu{height:68px}.larger wbm-core-frame ul#main-menu li.tab-item{margin-top:17px;height:51px}.larger wbm-core-frame ul#main-menu li.tab-item:before{height:50px;width:51px;left:-13.5px}.larger wbm-core-frame ul#main-menu li.tab-item:after{height:50px;width:51px;right:-12.5px}.larger wbm-core-frame ul#main-menu li.tab-item.active{height:52px}.larger wbm-core-frame ul#main-menu li.tab-item>a{padding-top:17px;height:51px}.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu{width:57px;height:40px;top:11px;margin-left:-3px}.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu:after,.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu:before{height:39px}.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul{top:38px;left:-40%}.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul>li{height:54px}.larger wbm-core-frame ul#main-menu li.tab-item.expandable-menu>ul>li>a{line-height:51px}.larger wbm-core-frame ul#action-bar{height:51px;padding-right:17px;padding-top:0}.larger wbm-core-frame ul#action-bar li:not(.burger-item)>button.action-bar-button{height:36px;width:36px}.larger wbm-core-frame ul#action-bar li.burger-menu>ul:before{right:24px}.larger wbm-core-frame ul#action-bar li.burger-item{height:54px}.larger wbm-core-frame ul#action-bar li.burger-item label{line-height:54px}.larger wbm-core-frame div#main-content{top:69px}', ""])
        }, function (e, t) {
            e.exports = '<svg style=display:none xmlns=http://www.w3.org/2000/svg version=1.1> <defs> <filter id=svg-blur> <feGaussianBlur stdDeviation=2 /> </filter> </defs> </svg> <div id=frame> <div id=main-header> <ul id=main-menu taid=tab-menu> <li class="tab-item expandable-menu"> <a class=icon>more_horiz</a> <ul></ul> </li> </ul> <ul id=action-bar> <li class=burger-menu> <button data-icon=more_vert class=action-bar-button></button> <label>more</label> <ul></ul> </li> </ul> </div> <div id=main-content> </div> </div>'
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
                e.desktop = "desktop", e.touch = "touch", e.eDisplay = "eDisplay"
            }(t.BrowserType || (t.BrowserType = {}))
        }])
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__assign || function () {
            return (o = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, i = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a, s = n(1), c = n(0), l = n(14);
        !function (e) {
            e[e.never = 0] = "never", e[e.strict = 1] = "strict", e[e.always = 2] = "always"
        }(a = t.ValueCacheUsage || (t.ValueCacheUsage = {}));
        var u = function () {
            function e(t, n, o) {
                if (this.useTempValueCache = !1, e._singleton) throw new Error("pfc reader is intended to be used as a singleton. However, you tried to create a second instance, which is prohibited.");
                this.valueCache = t, this.parameterInfos = o, this.mappingCache = this.createMappingCache(n, this.parameterInfos), e._singleton = this
            }

            return Object.defineProperty(e, "singleton", {
                get: function () {
                    return this._singleton
                }, enumerable: !0, configurable: !0
            }), e.prototype.createMappingCache = function (e, t) {
                var n = new s.Cache;
                return t.forEach((function (t) {
                    e.forEach((function (e) {
                        if (e.reads && e.reads.indexOf(t.id) > -1) {
                            var o = n.get(t.id) || [];
                            o.push(e), n.set(t.id, o)
                        }
                    }))
                })), n
            }, e.prototype.read = function (e, t, n) {
                return void 0 === t && (t = a.strict), i(this, void 0, void 0, (function () {
                    var i, a, s, c, u, f, d, p, h, v;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return this.runningRequest ? [4, this.runningRequest] : [3, 2];
                            case 1:
                                r.sent(), r.label = 2;
                            case 2:
                                return (i = !this.useTempValueCache) && (this.useTempValueCache = !0, l.PfcValueLoader.createTemporaryCache()), a = [], s = this.checkParameterExistsInCache(e, a), c = this.valueCacheLookUp(a, t), a = this.removeIdsFoundInValueCache(a, c), u = {}, a.length > 0 ? (this.runningRequest = l.PfcValueLoader.loadValues(a, this.mappingCache, this.valueCache, n), [4, this.runningRequest]) : [3, 4];
                            case 3:
                                for (f = r.sent(), this.updateValueCache(f), d = function (e) {
                                    /\*/.test(e) ? Object.keys(f).filter((function (t) {
                                        return t.replace(/\.[0-9]+/, ".*") === e
                                    })).forEach((function (e) {
                                        u[e] = f[e]
                                    })) : u[e] = f[e]
                                }, p = 0, h = a; p < h.length; p++) v = h[p], d(v);
                                this.runningRequest = void 0, r.label = 4;
                            case 4:
                                return i && (this.useTempValueCache = !1, l.PfcValueLoader.deleteTemporaryCache()), [2, o(o(o({}, s), c), u)]
                        }
                    }))
                }))
            }, e.prototype.updateValueCache = function (e) {
                for (var t in e) if (!(e[t] instanceof Error)) {
                    var n = this.valueCache.get(t) || {};
                    n.originalValue = e[t], void 0 === n.value && (n.value = n.originalValue), this.valueCache.set(t, n)
                }
            }, e.prototype.checkParameterExistsInCache = function (e, t) {
                var n = this;
                return e.reduce((function (e, o) {
                    return n.parameterInfos.some((function (e) {
                        return e.id === o.replace(/\.[0-9]+/, ".*")
                    })) ? t.push(o) : e[o] = new c.StatusError(811, o), e
                }), {})
            }, e.prototype.valueCacheLookUp = function (e, t) {
                var n = this;
                return void 0 === t && (t = a.strict), e.reduce((function (e, o) {
                    if (t === a.always || t === a.strict && "never" === n.getParameterInfoFromCache(o).changeBehaviour) if (o.indexOf("*") > -1) for (var i = 0; n.valueCache.has(o.replace("*", "" + i));) {
                        var r = o.replace("*", "" + i), s = n.valueCache.get(r);
                        e[r] = s.originalValue || s.value, i += 1
                    } else if (n.valueCache.has(o)) {
                        s = n.valueCache.get(o);
                        e[o] = s.originalValue || s.value
                    }
                    return e
                }), {})
            }, e.prototype.getParameterInfoFromCache = function (e) {
                return e = e.replace(/\.[0-9]+/, ".*"), this.parameterInfos.filter((function (t) {
                    return t.id === e
                }))[0]
            }, e.prototype.removeIdsFoundInValueCache = function (e, t) {
                var n = [];
                return e.forEach((function (e) {
                    if (e.indexOf("*") > -1) {
                        var o = e.replace("*", "0");
                        t[o] || n.push(e)
                    } else t[e] || n.push(e)
                })), n
            }, e.prototype.checkIdExistsInParameter = function (e) {
                return e = e.replace(/\.[0-9]+/, ".*"), function (t) {
                    return t.id === e
                }
            }, e
        }();
        t.PfcReader = u
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__assign || function () {
            return (o = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, i = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0), s = n(4), c = n(15), l = n(2), u = function () {
            function e() {
            }

            return e.resolveCommand = function (e, t) {
                t = t || {};
                try {
                    return e.replace(/\$\$[a-z]+/gi, (function (n) {
                        var o = n.substr(2), i = t[o];
                        if (i instanceof Error) throw i;
                        if (void 0 !== i) return ("" + i).replace(/'/g, "\\'") || "";
                        throw new a.StatusError(833, '"' + o + '" is missing to resolve "' + e + '"')
                    }))
                } catch (e) {
                    return e
                }
            }, e.getConstantIds = function (e, t) {
                return e.reduce((function (e, n) {
                    var o = t[n];
                    if (o instanceof Error) e[n] = o; else if (void 0 === o || void 0 === o.constants) e[n] = []; else {
                        var i = Object.keys(o.constants).filter((function (e) {
                            return o.constants.hasOwnProperty(e)
                        })).map((function (e) {
                            return o.constants[e]
                        }));
                        e[n] = i
                    }
                    return e
                }), {})
            }, e.resolveConstants = function (e, t) {
                return i(this, void 0, void 0, (function () {
                    var n, o, i, a, c, l, u, f, d = this;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return n = this.getConstantIds(e, t), o = [], a = new Promise((function (e) {
                                    return i = e
                                })), c = [], l = e.reduce((function (e, i) {
                                    var r = t[i], s = n[i];
                                    return s instanceof Error ? e[i] = s : void 0 === s || 0 === s.length || (r instanceof Error ? e[i] = r : void 0 === r || void 0 === r.constants || (o.push.apply(o, s), c.push(a.then((function (t) {
                                        var n = s[0];
                                        if (/\*/.test(i)) {
                                            var o = 0;
                                            Object.keys(t).forEach((function (e) {
                                                if (e.replace(/\.[0-9]+/, ".*") === n) {
                                                    var t = e.match(/\.[0-9]+/);
                                                    t && (o = Math.max(o, 1 + parseInt(t[0].substr(1), 10)))
                                                }
                                            }));
                                            for (var a = 0; a < o; a += 1) {
                                                var c = i.replace(/\*/, "" + a),
                                                    l = d.resolveConstantIds(r.constants, a);
                                                e[c] = d.generateConstKeyValues(l, t)
                                            }
                                        } else e[i] = d.generateConstKeyValues(r.constants, t)
                                    }))))), e
                                }), {}), u = i, (f = c.length > 0) ? [4, s.PfcReader.singleton.read(o)] : [3, 2];
                            case 1:
                                f = r.sent(), r.label = 2;
                            case 2:
                                return u.apply(void 0, [f || {}]), [4, Promise.all(c)];
                            case 3:
                                return r.sent(), [2, l]
                        }
                    }))
                }))
            }, e.resolveConstantIds = function (e, t) {
                var n = {};
                for (var o in e) n[o] = e[o].replace(/\*/, "" + t);
                return n
            }, e.generateConstKeyValues = function (e, t) {
                var n = {};
                return Object.keys(e).filter((function (t) {
                    return e.hasOwnProperty(t)
                })).forEach((function (o) {
                    var i = e[o], r = t[i];
                    n[o] = "" + r
                })), n
            }, e.replaceAsteriskWithNumberInCommand = function (e, t) {
                return e.replace(/\*/g, "" + t)
            }, e.createCommand = function (e, t, n, o) {
                var i = this;
                return e.reduce((function (e, o) {
                    var r = t[o], s = n[o];
                    if (r instanceof Error) e[o] = r; else if (void 0 === r || void 0 === r.command) e[o] = new a.StatusError(824, "cannot create command: no raw command for id " + o + " provided"); else if (s instanceof Error) e[o] = s; else {
                        var c = o.match(/\.[0-9]+/),
                            l = c ? i.replaceAsteriskWithNumberInCommand(r.command, parseInt(c[0].substr(1), 10)) : r.command;
                        l = l.replace(/([^ ]+)/g, "'$1'"), (l = i.resolveCommand(l, s)) instanceof Error ? e[o] = l : e[o] = {
                            command: l,
                            multiline: r.options && !!r.options.multiline || !1,
                            noReturn: r.noReturn || !1
                        }
                    }
                    return e
                }), {})
            }, e.mergeToLoadTool = function (e, t, n) {
                return e.reduce((function (e, o) {
                    var i = t[o], r = n[o];
                    return i instanceof Error ? e[o] = i : r instanceof Error ? e[o] = r : e[o] = {
                        command: i.command,
                        postProcess: r,
                        multiline: i.multiline,
                        noReturn: i.noReturn
                    }, e
                }), {})
            }, e.mergeToSaveTool = function (e, t, n) {
                return e.reduce((function (e, o) {
                    var i = t[o], r = n[o];
                    return i instanceof Error ? e[o] = i : r instanceof Error ? e[o] = r : e[o] = {
                        command: i.command,
                        multiline: i.multiline,
                        noReturn: i.noReturn,
                        preProcess: r
                    }, e
                }), {})
            }, e.mergeToCallTool = function (e, t, n) {
                return e.reduce((function (e, o) {
                    var i = t[o], r = n[o];
                    return i instanceof Error ? e[o] = i : r instanceof Error ? e[o] = r : e[o] = {
                        command: i.command,
                        multiline: i.multiline,
                        noReturn: i.noReturn,
                        preProcess: r
                    }, e
                }), {})
            }, e.resolveIdsForConstKeyValues = function (e, t) {
                return e.filter((function (e) {
                    return /\*/.test(e)
                })).reduce((function (e, n) {
                    var o = new RegExp(n.replace(/\*/, "[0-9]+")), i = Object.keys(t).filter((function (e) {
                        return o.test(e)
                    }));
                    return i.length > 0 && e.push.apply(e, i), e
                }), [])
            }, e.resolveMappingsForIds = function (e, t) {
                return e.reduce((function (e, n) {
                    var o = n.replace(/\.[0-9]+/, ".*"), i = t[o];
                    if (i instanceof a.StatusError) e[n] = i; else if (i) {
                        var r = /\.[0-9]+/.exec(n);
                        if (r && r[0]) {
                            var s = parseInt(r[0].substr(1), 10), c = JSON.parse(JSON.stringify(i));
                            l.PfcMappingLoader.replacePlaceholdersInMappingWithIndex(c, s), e[n] = c
                        } else e[n] = i
                    }
                    return e
                }), {})
            }, e.mergeIdsAndResolvedIds = function (e, t) {
                var n = [];
                if (0 === t.length) n.push.apply(n, e); else {
                    n.push.apply(n, t);
                    for (var o = function (e) {
                        /\*/.test(e) && t.some((function (t) {
                            return t.replace(/\.[0-9]+/, ".*") === e
                        })) || n.push(e)
                    }, i = 0, r = e; i < r.length; i++) {
                        o(r[i])
                    }
                }
                return n
            }, e.createLoadTool = function (e, t) {
                return i(this, void 0, void 0, (function () {
                    var n, i, a, s, l, u, f, d;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.resolveConstants(e, t)];
                            case 1:
                                return n = r.sent(), i = this.resolveIdsForConstKeyValues(e, n), a = this.resolveMappingsForIds(i, t), s = this.mergeIdsAndResolvedIds(e, i), l = o(o({}, t), a), u = this.createCommand(s, l, n), [4, c.PfcProcessorLoader.createPostProcessor(s, l)];
                            case 2:
                                return f = r.sent(), d = this.mergeToLoadTool(s, u, f), e.splice(0, e.length), e.push.apply(e, s), [2, d]
                        }
                    }))
                }))
            }, e.createSaveTool = function (e, t) {
                return i(this, void 0, void 0, (function () {
                    var n, o, i;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, c.PfcProcessorLoader.createPreProcessor(e, t)];
                            case 1:
                                return n = r.sent(), [4, this.resolveConstants(e, t)];
                            case 2:
                                return o = r.sent(), i = this.createCommand(e, t, o), [2, this.mergeToSaveTool(e, i, n)]
                        }
                    }))
                }))
            }, e.createCallTool = function (e, t) {
                return i(this, void 0, void 0, (function () {
                    var n, o, i;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, c.PfcProcessorLoader.createPreProcessor(e, t)];
                            case 1:
                                return n = r.sent(), [4, this.resolveConstants(e, t)];
                            case 2:
                                return o = r.sent(), i = this.createCommand(e, t, o), [2, this.mergeToCallTool(e, i, n)]
                        }
                    }))
                }))
            }, e
        }();
        t.PfcToolCreator = u
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__assign || function () {
            return (o = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, i = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        }, a = this && this.__spreadArrays || function () {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var o = Array(e), i = 0;
            for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
            return o
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var s = n(7), c = n(0), l = function () {
            function e() {
            }

            return e.buildRequestBody = function (e, t) {
                return e.reduce((function (e, n) {
                    var o = t[n];
                    if (o instanceof Error) throw new Error("building of request body failed " + n + " has no tool");
                    for (var i = o.command.match(/(?:^)?('([^']*(\\')*[^']*)*')(?:\s|$)/g).filter((function (e) {
                        return e && /[^ ]/.test(e)
                    })).map((function (e) {
                        return e.replace(/\\'/g, "'")
                    })).map((function (e) {
                        return e.replace(/(^ *)|( *$)/g, "")
                    })).map((function (e) {
                        return e.replace(/(^')|('$)/g, "")
                    })), r = i.shift(), a = i; a.length > 0 && "" === a[a.length - 1];) a.pop();
                    var s = o.multiline || !1;
                    return e.aDeviceParams.push({name: r, parameter: a, multiline: s}), e
                }), {aDeviceParams: []})
            }, e.optimizeRequestBody = function (e) {
                var t = [], n = {};
                return e.aDeviceParams.forEach((function (e, o) {
                    if (!t.some((function (t, i) {
                        return !(t.name !== e.name || t.multiline !== e.multiline || t.parameter.length !== e.parameter.length || !t.parameter.every((function (t, n) {
                            return t === e.parameter[n]
                        }))) && (n[i].push(o), !0)
                    }))) {
                        var i = t.length;
                        n[i] = [o], t.push(e)
                    }
                })), e.aDeviceParams = t, n
            }, e.deoptimizeResponseBody = function (e, t) {
                var n = [], o = function (o) {
                    t[o].forEach((function (t) {
                        n[t] = e.aDeviceResponse[o]
                    }))
                };
                for (var i in t) o(i);
                return e.aDeviceResponse = n, e
            }, e.sendRequestWithBody = function (e, t, n) {
                return i(this, void 0, void 0, (function () {
                    var o, i = this;
                    return r(this, (function (r) {
                        return "php/parameter/configtools.php", e = JSON.parse(JSON.stringify(e)), o = this.optimizeRequestBody(e), [2, new Promise((function (r, a) {
                            var c = !1;
                            void 0 !== n && setTimeout((function () {
                                c || a()
                            }), n), s.PhpAuthenticationService.singleton.csrfFetch("php/parameter/configtools.php", e, t).then((function (t) {
                                return c = !0, t.ok ? t.json() : {
                                    aDeviceResponse: e.aDeviceParams.map((function (e) {
                                        return {status: NaN, errorText: "Server Error " + t.status}
                                    }))
                                }
                            })).catch((function (t) {
                                return {
                                    aDeviceResponse: e.aDeviceParams.map((function (e) {
                                        return {status: NaN, errorText: "Error " + t.message}
                                    }))
                                }
                            })).then((function (e) {
                                return i.deoptimizeResponseBody(e, o)
                            })).then((function (e) {
                                return r(e)
                            }))
                        }))]
                    }))
                }))
            }, e.filterIdsByExistingTool = function (e, t) {
                return e.filter((function (e) {
                    return !(t[e] instanceof Error)
                }))
            }, e.getExecutionResultsFromResponseBody = function (e, t, n) {
                return e.reduce((function (e, o, i) {
                    var r = t.aDeviceParams[i], a = n.aDeviceResponse[i];
                    if (0 === a.status) e[o] = {status: 0, resultString: a.resultString}; else if (isNaN(a.status)) {
                        var s = r.name + (a.errorText ? ": " + a.errorText : "");
                        e[o] = new c.StatusError(861, s)
                    } else {
                        s = r.name + ": " + a.status + (a.errorText ? " " + a.errorText : "");
                        e[o] = new c.StatusError(862, s)
                    }
                    return e
                }), {})
            }, e.executeTools = function (e, t, n, s) {
                return i(this, void 0, void 0, (function () {
                    var i, c, l, u, f, d, p;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return i = s ? this.replaceVariablesInCommand(e, t, s) : t, c = this.filterIdsByExistingTool(e, i), l = a(c).filter((function (e, t) {
                                    return !!i[e].noReturn && (c.splice(c.indexOf(e), 1), !0)
                                })), u = {}, c.length > 0 ? (d = this.buildRequestBody(c, i), [4, this.sendRequestWithBody(d, n)]) : [3, 2];
                            case 1:
                                p = r.sent(), u = this.getExecutionResultsFromResponseBody(c, d, p), r.label = 2;
                            case 2:
                                if (f = {}, !(l.length > 0)) return [3, 7];
                                d = this.buildRequestBody(l, i), p = void 0, r.label = 3;
                            case 3:
                                return r.trys.push([3, 5, , 6]), [4, this.sendRequestWithBody(d, n, 5e3)];
                            case 4:
                                return p = r.sent(), [3, 6];
                            case 5:
                                return r.sent(), p = {
                                    aDeviceResponse: e.map((function () {
                                        return {status: 0, resultString: ""}
                                    }))
                                }, [3, 6];
                            case 6:
                                f = this.getExecutionResultsFromResponseBody(l, d, p), r.label = 7;
                            case 7:
                                return [2, o(o(o({}, i), u), f)]
                        }
                    }))
                }))
            }, e.replaceVariablesInCommand = function (e, t, n) {
                return e.reduce((function (e, i) {
                    var r = t[i], a = n[i];
                    if (r instanceof Error) e[i] = r; else if (a instanceof Error) e[i] = a; else if (void 0 === a) e[i] = r; else {
                        r = o({}, r);
                        try {
                            var s = r.command;
                            r.command = s.replace(/\$[a-z]+/gi, (function (e) {
                                var t = e.substr(1), n = a[t];
                                if (void 0 !== n) return ("" + n).replace(/'/g, "\\'") || "";
                                throw new c.StatusError(834, '"' + t + '" is missing to resolve "' + s + '"')
                            })), e[i] = r
                        } catch (t) {
                            e[i] = t
                        }
                    }
                    return e
                }), {})
            }, e
        }();
        t.PfcCommandExecutor = l
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        }, r = this && this.__spreadArrays || function () {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var o = Array(e), i = 0;
            for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
            return o
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(8), s = n(9), c = n(0), l = function () {
            function e(t, n) {
                if (this.expireTime = 9e5, e._singleton) throw new Error("authentication service is intended to be used as a singleton. However, you tried to create a second instance, which is prohibited.");
                this.loggerService = t, this.statusService = n, this.setupStatusService(), e._singleton = this
            }

            return Object.defineProperty(e, "singleton", {
                get: function () {
                    return this._singleton
                }, enumerable: !0, configurable: !0
            }), e.prototype.csrfFetch = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    var o, r, s, c = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = t || {}, o = this.getActiveUser(), t.csrfToken = void 0 !== o && o.csrf, t.renewSession = void 0 === n || n, r = {
                                    method: "POST",
                                    credentials: "include",
                                    body: JSON.stringify(t)
                                }, [4, fetch(e, r)];
                            case 1:
                                return s = i.sent(), o && (s.clone().json().then((function (e) {
                                    (o = c.getActiveUser()) && e.csrfToken ? (o.csrf = e.csrfToken, o.timestamp = Date.now(), a.set("user", o)) : e.error && 9 == e.error.group && 101 == e.error.code && c.invalidateSessionAndReload()
                                })), t.renewSession && this.startSessionTimer()), [2, s]
                        }
                    }))
                }))
            }, e.prototype.csrfHeadFetch = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    var o, r, s, c, l = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                n = n || null, o = this.getActiveUser(), t || (t = {}), t["Com-Wago-Session-Token"] = void 0 !== o ? "" + o.csrf : "false", t["Com-Wago-Renew-Session"] = "true", r = {
                                    method: "POST",
                                    headers: t,
                                    credentials: "include",
                                    body: n
                                }, i.label = 1;
                            case 1:
                                return i.trys.push([1, 3, , 4]), [4, fetch(e, r)];
                            case 2:
                                return s = i.sent(), [3, 4];
                            case 3:
                                throw c = i.sent(), this.startSessionTimer(), this.loggerService.error(c), c;
                            case 4:
                                return o && (s.clone().json().then((function (e) {
                                    e.csrfToken ? (o.csrf = e.csrfToken, o.timestamp = Date.now(), a.set("user", o)) : e.error && 9 == e.error.group && 101 == e.error.code && l.invalidateSessionAndReload()
                                })), this.startSessionTimer()), [2, s]
                        }
                    }))
                }))
            }, e.prototype.setupStatusService = function () {
                this.statusService.addStatusGroup(700, "AuthenticationService"), this.statusService.addStatus(701, "authentication failed due to an HTTP Error"), this.statusService.addStatus(702, "authentication failed due to wrong username/password"), this.statusService.addStatus(703, "logout failed due to an HTTP Error")
            }, e.prototype.getActiveUser = function () {
                var e = a.getJSON("user");
                if (e && !this.sessionTimer) {
                    var t = Date.now() - e.timestamp;
                    this.loggerService.info("[TimeStamp] " + t + " ms"), t < this.expireTime ? this.startSessionTimer(t) : (e = void 0, this.stopSessionTimer())
                }
                return e
            }, e.prototype.updateActiveUser = function (e) {
                var t = a.getJSON("user") || {}, n = {
                    name: e.name || t.name,
                    roles: e.roles ? r(e.roles) : t.roles,
                    csrf: null != e.csrf ? e.csrf : t.csrf,
                    hasDefaultPassword: void 0 !== e.hasDefaultPassword ? e.hasDefaultPassword : t.hasDefaultPassword,
                    timestamp: e.timestamp || t.timestamp,
                    sessionExists: e.sessionExists || t.sessionExists
                };
                a.set("user", n)
            }, e.prototype.login = function (e, t) {
                return void 0 === e && (e = ""), void 0 === t && (t = ""), o(this, void 0, void 0, (function () {
                    var n, o, r;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return "" !== e ? [3, 1] : (r = {
                                    name: "guest",
                                    roles: [s.UserRoles.guest],
                                    csrf: !1,
                                    hasDefaultPassword: !1,
                                    timestamp: Date.now(),
                                    sessionExists: !0
                                }, a.set("user", r), this.loggerService.info("[Base] AuthenticationService: logged in as guest"), [2, r]);
                            case 1:
                                return [4, fetch("php/authentication/login.php", {
                                    body: JSON.stringify({
                                        username: e,
                                        password: t
                                    }), credentials: "include", method: "POST"
                                })];
                            case 2:
                                return (n = i.sent()).status >= 200 && n.status < 300 ? [4, n.json()] : [3, 4];
                            case 3:
                                if (0 !== (o = i.sent()).status) throw new c.StatusError(702);
                                return r = this.createPFCUser(o), a.set("user", r), this.startSessionTimer(), this.loggerService.info("[Base] AuthenticationService: logged in as " + r.name), [2, r];
                            case 4:
                                throw new c.StatusError(701, "HTTP/" + n.status + ": " + n.statusText)
                        }
                    }))
                }))
            }, e.prototype.createPFCUser = function (e) {
                return {
                    name: e.username,
                    roles: this.getUserRoles(e.username),
                    hasDefaultPassword: "1" === e.isDefaultPW,
                    csrf: e.csrfToken,
                    timestamp: Date.now(),
                    sessionExists: !0
                }
            }, e.prototype.getUserRoles = function (e) {
                var t = [];
                switch (e) {
                    case"admin":
                        t.push(s.UserRoles.admin);
                    case"user":
                        t.push(s.UserRoles.user);
                    default:
                        t.push(s.UserRoles.guest)
                }
                return t
            }, e.prototype.logout = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return a.remove("user"), [4, fetch("php/authentication/logout.php", {
                                    body: JSON.stringify({
                                        username: e.name,
                                        csrfToken: e.csrf
                                    }), method: "POST"
                                })];
                            case 1:
                                if (!((t = n.sent()).status >= 200 && t.status < 300)) throw new c.StatusError(703, "HTTP/" + t.status + ": " + t.statusText);
                                return this.loggerService.info("[Base] AuthenticationService: logged out"), [2]
                        }
                    }))
                }))
            }, e.prototype.invalidateSessionAndReload = function () {
                this.loggerService.info("[Base] Session timer expired!");
                var e = this.getActiveUser();
                e.sessionExists = !1, e.timestamp = e.timestamp - this.expireTime, a.set("user", e), location.reload()
            }, e.prototype.startSessionTimer = function (e) {
                var t = this;
                void 0 === e && (e = 0), this.sessionTimer && this.stopSessionTimer(), this.sessionTimer = window.setTimeout((function () {
                    return t.invalidateSessionAndReload()
                }), this.expireTime - e)
            }, e.prototype.stopSessionTimer = function () {
                window.clearTimeout(this.sessionTimer), this.sessionTimer = 0
            }, e.prototype.getSessionState = function () {
                var e = a.getJSON("user");
                if (void 0 !== e) return e.sessionExists
            }, e.prototype.clearActiveUser = function () {
                a.remove("user")
            }, e
        }();
        t.PhpAuthenticationService = l
    }, function (e, t, n) {
        var o, i;
        /*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
        !function (r) {
            if (void 0 === (i = "function" == typeof (o = r) ? o.call(t, n, t, e) : o) || (e.exports = i), !0, e.exports = r(), !!0) {
                var a = window.Cookies, s = window.Cookies = r();
                s.noConflict = function () {
                    return window.Cookies = a, s
                }
            }
        }((function () {
            function e() {
                for (var e = 0, t = {}; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var o in n) t[o] = n[o]
                }
                return t
            }

            function t(e) {
                return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
            }

            return function n(o) {
                function i() {
                }

                function r(t, n, r) {
                    if ("undefined" != typeof document) {
                        "number" == typeof (r = e({path: "/"}, i.defaults, r)).expires && (r.expires = new Date(1 * new Date + 864e5 * r.expires)), r.expires = r.expires ? r.expires.toUTCString() : "";
                        try {
                            var a = JSON.stringify(n);
                            /^[\{\[]/.test(a) && (n = a)
                        } catch (e) {
                        }
                        n = o.write ? o.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                        var s = "";
                        for (var c in r) r[c] && (s += "; " + c, !0 !== r[c] && (s += "=" + r[c].split(";")[0]));
                        return document.cookie = t + "=" + n + s
                    }
                }

                function a(e, n) {
                    if ("undefined" != typeof document) {
                        for (var i = {}, r = document.cookie ? document.cookie.split("; ") : [], a = 0; a < r.length; a++) {
                            var s = r[a].split("="), c = s.slice(1).join("=");
                            n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                            try {
                                var l = t(s[0]);
                                if (c = (o.read || o)(c, l) || t(c), n) try {
                                    c = JSON.parse(c)
                                } catch (e) {
                                }
                                if (i[l] = c, e === l) break
                            } catch (e) {
                            }
                        }
                        return e ? i[e] : i
                    }
                }

                return i.set = r, i.get = function (e) {
                    return a(e, !1)
                }, i.getJSON = function (e) {
                    return a(e, !0)
                }, i.remove = function (t, n) {
                    r(t, "", e(n, {expires: -1}))
                }, i.defaults = {}, i.withConverter = n, i
            }((function () {
            }))
        }))
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e.admin = "admin", e.user = "user", e.guest = "guest"
        }(t.UserRoles || (t.UserRoles = {}))
    }, function (e, t, n) {
        "use strict";
        var o;

        function i(e) {
            return /^[0-9]+(\.[0-9]+)*.*/.test(e)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
            e[e.Higher = 1] = "Higher", e[e.Equal = 0] = "Equal", e[e.Lower = -1] = "Lower"
        }(o = t.VersionComparisonResult || (t.VersionComparisonResult = {})), t.default = function (e, t) {
            if (!i(e)) throw new TypeError("argument version: '" + e + "' is not a version");
            if (!i(t)) throw new TypeError("argument toVersion: '" + e + "' is not a version");
            for (var n, r, a, s = o.Equal, c = e.split("."), l = t.split("."), u = 0; s == o.Equal && u < c.length && u < l.length;) n = c[u], r = l[u], a = void 0, s = 0 == (a = parseInt(n) - parseInt(r)) ? o.Equal : a > 0 ? o.Higher : o.Lower, u++;
            return s
        }
    }, function (e, t, n) {
        "use strict";
        var o = n(3), i = n(12), r = n(25), a = new i.PFCBase;
        r.default(o.default, a);
        var s = {base: a};
        e.exports = s
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(13), a = n(7), s = n(21), c = n(23), l = n(3), u = n(24),
            f = new c.PhpLocaleService({locale: "en_US", name: "English (United States)"}, {}),
            d = new a.PhpAuthenticationService(l.logger, l.status), p = function () {
                this.transfer = new u.PfcTransferService(d, l.logger), this.localization = f, this.viewGenerator = l.viewGenerator, this.subframeGenerator = l.subframeGenerator, this.parameter = new r.PfcParameterService(f, l.logger, l.status, d), this.plugin = new s.PhpPluginService(l.logger, l.status, d, this.parameter), this.authentication = d, this.modalPresenter = l.modalPresenter, this.logger = l.logger, this.status = l.status, this.manifest = {
                    getInfo: function () {
                        return o(this, void 0, void 0, (function () {
                            return i(this, (function (e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, fetch("manifest.json")];
                                    case 1:
                                        return [2, e.sent().json()]
                                }
                            }))
                        }))
                    }
                }, this.browser = l.browser
            };
        t.PFCBase = p
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(1), a = n(0), s = n(4), c = n(16), l = n(18), u = n(19), f = n(20), d = function () {
            function e(e, t, n, o, i) {
                this.runningTransactions = 0, this.waitingForTransactions = !1, this.localeService = e, this.loggerService = t, this.statusService = n, this.authenticationService = o, this.setupStatusService(), this.parameterCache = i && i.parameterCache || new r.Cache, this.methodCache = i && i.methodCache || new r.Cache, this.valueCache = i && i.valueCache || new r.Cache, this.reloadParameters()
            }

            return e.prototype.setupStatusService = function () {
                var e;
                this.statusService.addStatusGroup(800, "ParameterService");
                for (var t = 0, n = u.parameterServiceStatusErrorDefinitions; t < n.length; t++) {
                    var o = n[t];
                    (e = this.statusService).addStatus.apply(e, o)
                }
            }, e.prototype.loadParametersAndMethods = function () {
                return o(this, void 0, void 0, (function () {
                    var e, t, n, o, r = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return i.trys.push([0, 3, , 4]), [4, this.authenticationService.csrfFetch("php/parameter/infos.php")];
                            case 1:
                                return [4, i.sent().json().then((function (e) {
                                    return [e.parameterInfos, e.methodInfos]
                                }))];
                            case 2:
                                return e = i.sent(), t = e[0], n = e[1], t.forEach((function (e) {
                                    e.label = e.label && r.localeService.localized(e.label), e.descripion && (e.descripion = r.localeService.localized(e.descripion))
                                })), [2, {parameters: t, methods: n}];
                            case 3:
                                throw o = i.sent(), new a.StatusError(801, o.message);
                            case 4:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.loadMappings = function () {
                return o(this, void 0, void 0, (function () {
                    var e;
                    return i(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return t.trys.push([0, 2, , 3]), [4, this.authenticationService.csrfFetch("php/parameter/mappings.php")];
                            case 1:
                                return [2, t.sent().json().then((function (e) {
                                    return e.parameterMappings
                                }))];
                            case 2:
                                throw e = t.sent(), new a.StatusError(802, e.message);
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.processParametersAndMethods = function (e, t) {
                var n = this;
                e.forEach((function (e) {
                    if (e.error) {
                        var t = e.error;
                        n.loggerService.warn('[Base] ParameterService: error received from "parameter/infos.php". See PHP Log for more details', "Error:" + t.code + "/" + t.group, t.text)
                    } else n.parameterCache.set(e.id, e)
                })), t.forEach((function (e) {
                    if (e.error) {
                        var t = e.error;
                        n.loggerService.warn('[Base] ParameterService: error received from "parameter/infos.php". See PHP Log for more details', "Error:" + t.code + "/" + t.group, t.text)
                    } else n.methodCache.set(e.id, e)
                }))
            }, e.prototype.get = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, this.init];
                            case 1:
                                if (n.sent(), (t = this.parameterCache.get(e)) || (t = this.pfcReader.getParameterInfoFromCache(e)), !t) throw new a.StatusError(811, e);
                                return [2, t]
                        }
                    }))
                }))
            }, e.prototype.read = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t, n, o, r;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return "string" == typeof e && (e = [e]), this.isTransationRunning ? (n = new Promise((function (e) {
                                    t = e
                                })), o = {read: e, resolve: t, promise: n, done: !1}, n.then((function () {
                                    return o.done = !0
                                })), this.readTransactions.push(o), [2, n]) : [4, this.init];
                            case 1:
                                return i.sent(), [4, s.PfcReader.singleton.read(e)];
                            case 2:
                                return r = i.sent(), [2, e.reduce((function (e, t) {
                                    var n;
                                    if (/\*/.test(t)) if ((n = r[t]) instanceof Error) e.push({
                                        parameterId: t,
                                        error: n
                                    }); else for (var o = 0; ;) {
                                        var i = t.replace(/\*/, "" + o);
                                        if (!(i in r)) break;
                                        var a = r[i];
                                        a instanceof Error ? e.push({
                                            parameterId: i,
                                            error: a
                                        }) : e.push({parameterId: i, value: a}), o += 1
                                    } else (n = r[t]) instanceof Error ? e.push({
                                        parameterId: t,
                                        error: n
                                    }) : e.push({parameterId: t, value: n});
                                    return e
                                }), [])]
                        }
                    }))
                }))
            }, e.prototype.browse = function (e, t) {
                return void 0 === t && (t = !1), o(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        throw 'deprecated API. use #read method to "browse" placeholder ids instead. Example: read("a.b.*.c") instead of browse("a.b")'
                    }))
                }))
            }, e.prototype.fetch = function (e) {
                return o(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        throw "deprecated API. use #read method instead"
                    }))
                }))
            }, e.prototype.write = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n, o, r, a, s, c;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return o = (n = "string" == typeof e) ? [{
                                    parameterId: e,
                                    value: t
                                }] : e, [4, this.init];
                            case 1:
                                return i.sent(), r = o.map((function (e) {
                                    return e.parameterId
                                })), a = o.reduce((function (e, t) {
                                    return e[t.parameterId] = t.value, e
                                }), {}), [4, this.pfcWriter.write(r, a)];
                            case 2:
                                return s = i.sent(), c = Object.keys(s).map((function (e) {
                                    return s[e] instanceof Error ? {parameterId: e, error: s[e]} : {
                                        parameterId: e,
                                        value: s[e]
                                    }
                                })), [2, n ? c[0] : c]
                        }
                    }))
                }))
            }, e.prototype.commit = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t, n;
                    return i(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return t = "string" == typeof e ? [e] : e, [4, this.pfcWriter.write(t, {}, c.WriteMode.commit)];
                            case 1:
                                return n = o.sent(), [2, Object.keys(n).map((function (e) {
                                    return n[e] instanceof Error ? {parameterId: e, error: n[e]} : {
                                        parameterId: e,
                                        value: n[e]
                                    }
                                }))]
                        }
                    }))
                }))
            }, Object.defineProperty(e.prototype, "isTransationRunning", {
                get: function () {
                    return this.runningTransactions > 0
                }, enumerable: !0, configurable: !0
            }), e.prototype.transaction = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t = this;
                    return i(this, (function (n) {
                        return [2, new Promise((function (n) {
                            return o(t, void 0, void 0, (function () {
                                var t, r = this;
                                return i(this, (function (a) {
                                    return this.isTransationRunning || (this.readTransactions = this.readTransactions || []), this.waitingForTransactions || (this.readTransactions = []), this.runningTransactions += 1, this.waitingForTransactions = !0, this.runningTransactions, t = e(), setTimeout((function () {
                                        return o(r, void 0, void 0, (function () {
                                            var e, o, r, a, s, c, l, u, f, d, p, h, v;
                                            return i(this, (function (i) {
                                                switch (i.label) {
                                                    case 0:
                                                        return this.runningTransactions -= 1, this.isTransationRunning ? [3, 2] : (e = this.readTransactions.filter((function (e) {
                                                            return !e.done
                                                        })), o = (v = []).concat.apply(v, e.map((function (e) {
                                                            return e.read
                                                        }))), [4, this.read(o)]);
                                                    case 1:
                                                        for (r = i.sent(), a = 0, s = e; a < s.length; a++) c = s[a], p = c.read.reduce((function (e, t) {
                                                            return r.forEach((function (n) {
                                                                e.some((function (e) {
                                                                    return e.parameterId === n.parameterId
                                                                })) || n.parameterId !== t && n.parameterId.replace(/\.[0-9]+/, ".*") !== t || e.push(n)
                                                            })), e
                                                        }), []), c.resolve(p);
                                                        i.label = 2;
                                                    case 2:
                                                        return [4, t];
                                                    case 3:
                                                        return i.sent(), [4, Promise.all(this.readTransactions.map((function (e) {
                                                            return e.promise
                                                        })))];
                                                    case 4:
                                                        for (l = i.sent(), u = [], f = 0, d = l; f < d.length; f++) p = d[f], h = p.filter((function (e) {
                                                            return !1 === u.some((function (t) {
                                                                return t.parameterId === e.parameterId
                                                            }))
                                                        })), u.push.apply(u, h);
                                                        return n({
                                                            results: u,
                                                            readResults: u,
                                                            writeResults: []
                                                        }), this.isTransationRunning || (this.waitingForTransactions = !1), [2]
                                                }
                                            }))
                                        }))
                                    })), [2]
                                }))
                            }))
                        }))]
                    }))
                }))
            }, e.prototype.observe = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    var o, r, a, s, c, l = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                o = e, i.label = 1;
                            case 1:
                                return i.trys.push([1, 3, , 5]), [4, this.get(o)];
                            case 2:
                                return r = i.sent(), [3, 5];
                            case 3:
                                return a = i.sent(), [4, this.init];
                            case 4:
                                if (i.sent(), !(r = this.methodCache.get(o))) throw a;
                                return [3, 5];
                            case 5:
                                return r.id = o, s = {
                                    cancel: function () {
                                        l.observings[o] = l.observings[o].filter((function (e) {
                                            return e.observation !== s
                                        }))
                                    }
                                }, this.observings || (this.observings = {}, "change" === t.kind && this.valueCache.subscribe("change", (function (e, t, n) {
                                    return f.PFCObserver.UpdateChangeOnObservers(e, t, n, l.observings)
                                }))), f.PFCObserver.AddObservings(o, n, s, t, r, this.observings), "sample" === t.kind && (c = this.valueCache.get(o), f.PFCObserver.SampleObserver(o, this.pfcReader, this.observings, t.interval, c)), [2, s]
                        }
                    }))
                }))
            }, e.prototype.reloadParameters = function () {
                return o(this, void 0, void 0, (function () {
                    var e, t, n = this;
                    return i(this, (function (o) {
                        return this.parameterCache.clear(), e = [], t = [], this.init = this.loadParametersAndMethods().then((function (o) {
                            return e = o.parameters, t = o.methods, n.loadMappings()
                        })).then((function (o) {
                            n.processParametersAndMethods(e, t), delete s.PfcReader._singleton, n.pfcReader = new s.PfcReader(n.valueCache, o, e), delete c.PfcWriter._singleton, n.pfcWriter = new c.PfcWriter(n.valueCache, o, e), delete l.PfcMethodCaller._singleton, n.pfcCaller = new l.PfcMethodCaller(n.valueCache, o, t)
                        })), [2]
                    }))
                }))
            }, e.prototype.execute = function (e, t) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    var n, o, r, a, s = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return n = e.replace(/\.[0-9]+/, ".*"), [4, this.pfcCaller.exec(e, !0, t)];
                            case 1:
                                return o = i.sent(), r = o instanceof Error ? {methodId: e, error: o} : {
                                    methodId: e,
                                    returnValue: o
                                }, (a = this.observings && this.observings[n]) && a.forEach((function (t) {
                                    o instanceof Error || f.PFCObserver.UpdateHistory(t.observation, t.options, {
                                        originalValue: o,
                                        value: o
                                    }, {originalValue: o, value: o});
                                    var i = s.methodCache.get(n);
                                    i && (i.id = e), t.observer(i, o)
                                })), [2, r]
                        }
                    }))
                }))
            }, e
        }();
        t.PfcParameterService = d
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__assign || function () {
            return (o = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, i = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(1), s = n(2), c = n(5), l = n(0), u = n(6), f = function () {
            function e() {
            }

            return e.createTemporaryCache = function () {
                this.temporaryValueCache = new a.Cache
            }, e.deleteTemporaryCache = function () {
                delete this.temporaryValueCache
            }, e.checkTemporaryCache = function (e) {
                var t = this, n = [], o = [];
                return e.forEach((function (i) {
                    if (t.temporaryValueCache) if (/\*/.test(i)) {
                        var r = !1;
                        t.temporaryValueCache.keys.forEach((function (e) {
                            e.replace(/\.[0-9]+/, ".*") === i && (n.push(e), r = !0)
                        })), !r && o.push(i)
                    } else t.temporaryValueCache.has(i) ? n.push(i) : o.push(i); else o.push.apply(o, e)
                })), {cachedIds: n, notCachedIds: o}
            }, e.loadValues = function (e, t, n, a) {
                return i(this, void 0, void 0, (function () {
                    var i, s, c, l, f, d, p, h, v, b, m, y = this;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return i = this.checkTemporaryCache(e), n = this.temporaryValueCache ? n.merged(this.temporaryValueCache) : n, [4, this.generateLoadToolsFromMappingCache(i.notCachedIds, t, n)];
                            case 1:
                                return s = r.sent(), c = this.checkTemporaryCache(i.notCachedIds), l = c.cachedIds, f = c.notCachedIds, l.push.apply(l, i.cachedIds), d = l.reduce((function (e, t) {
                                    return e[t] = y.temporaryValueCache.get(t), e
                                }), {}), [4, u.PfcCommandExecutor.executeTools(f, s, a)];
                            case 2:
                                for (b in p = r.sent(), h = this.getRawValuesFromExecutionResults(f, p), v = this.getValuesForRawValues(f, h, s)) (m = v[b]) instanceof Error || this.temporaryValueCache && this.temporaryValueCache.set(b, m);
                                return [2, o(o({}, v), d)]
                        }
                    }))
                }))
            }, e.generateLoadToolsFromMappingCache = function (e, t, n) {
                return i(this, void 0, void 0, (function () {
                    var o;
                    return r(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return o = s.PfcMappingLoader.getLoadMappingForIds(e, t, n), [4, c.PfcToolCreator.createLoadTool(e, o)];
                            case 1:
                                return [2, i.sent()]
                        }
                    }))
                }))
            }, e.getRawValuesFromExecutionResults = function (e, t) {
                return e.reduce((function (e, n) {
                    var o = t[n];
                    return o instanceof Error ? e[n] = o : e[n] = o.resultString, e
                }), {})
            }, e.getValuesForRawValues = function (e, t, n) {
                var o = [];
                return e.reduce((function (e, i) {
                    var r = n[i], a = t[i];
                    if (r instanceof Error) e[i] = r; else if (a instanceof Error) e[i] = a; else {
                        if (o.indexOf(r) >= 0) return e;
                        var s = r.postProcess(a);
                        Object.keys(s).filter((function (e) {
                            return s.hasOwnProperty(e)
                        })).forEach((function (t) {
                            e[t] = s[t]
                        })), i.match(/\*/) || void 0 !== s[i] || (e[i] = new l.StatusError(832, i)), o.push(r)
                    }
                    return e
                }), {})
            }, e
        }();
        t.PfcValueLoader = f
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var __assign = this && this.__assign || function () {
            return (__assign = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, __awaiter = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, __generator = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(exports, "__esModule", {value: !0});
        var error_1 = __webpack_require__(0), cache_1 = __webpack_require__(1), PfcProcessorLoader = function () {
            function PfcProcessorLoader() {
            }

            return PfcProcessorLoader.loadCustomTransformer = function (customUrl) {
                return __awaiter(this, void 0, void 0, (function () {
                    var _this = this;
                    return __generator(this, (function (_a) {
                        return [2, fetch(customUrl).then((function (e) {
                            return e.text()
                        })).then((function (scriptText) {
                            var transformFn = function (js) {
                                return eval(js)
                            }.call({}, scriptText);
                            return _this.customTransformationsCache.set(customUrl, transformFn), transformFn
                        }))]
                    }))
                }))
            }, PfcProcessorLoader.createPostTransformerFromMapping = function (e, t) {
                return __awaiter(this, void 0, void 0, (function () {
                    var n, o, i = this;
                    return __generator(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return n = {}, o = e.reduce((function (e, o) {
                                    var r = t[o];
                                    if (r instanceof Error) e[o] = r; else {
                                        if (e[o]) return e;
                                        switch (r.type) {
                                            case"custom":
                                                var a = r.custom;
                                                if (i.customTransformationsCache.has(a)) e[o] = i.customTransformationsCache.get(a); else {
                                                    var s = (n[a] || i.loadCustomTransformer(a)).then((function (t) {
                                                        return e[o] = t
                                                    })).catch((function (t) {
                                                        return e[o] = new error_1.StatusError(827, t.message)
                                                    }));
                                                    n[a] = s
                                                }
                                                break;
                                            case"mapping":
                                                e[o] = function (e) {
                                                    var t;
                                                    if (e instanceof Error) return (t = {})[o] = e, t;
                                                    try {
                                                        var n = JSON.parse(e);
                                                        return Object.keys(r.mapping).reduce((function (e, t) {
                                                            var o = r.mapping[t];
                                                            if (/\*/.test(o)) {
                                                                var i = 0, a = void 0;
                                                                do {
                                                                    var s = o.replace(/\*/, "" + i).split(".");
                                                                    for (a = n; a && s.length > 0;) a = a[s.shift()];
                                                                    null != a && (e[t.replace(/\*/, "" + i)] = a), i += 1
                                                                } while (null != a)
                                                            } else {
                                                                for (s = o.split("."), a = n; s.length > 0;) a = a[s.shift()];
                                                                void 0 !== a && (e[t] = a)
                                                            }
                                                            return e
                                                        }), {})
                                                    } catch (e) {
                                                        return Object.keys(r.mapping).reduce((function (t, n) {
                                                            r.mapping[n];
                                                            return t[n] = e, t
                                                        }), {})
                                                    }
                                                };
                                                break;
                                            case"value":
                                            default:
                                                e[o] = function (e) {
                                                    return r.reads.reduce((function (t, n) {
                                                        var o;
                                                        return __assign(__assign({}, t), ((o = {})[n] = e, o))
                                                    }), {})
                                                }
                                        }
                                        if (r.reads) for (var c = 0, l = r.reads; c < l.length; c++) {
                                            var u = l[c];
                                            e[u] = e[o]
                                        }
                                    }
                                    return e
                                }), {}), [4, Promise.all(Object.keys(n).map((function (e) {
                                    return n[e]
                                })))];
                            case 1:
                                return r.sent(), [2, o]
                        }
                    }))
                }))
            }, PfcProcessorLoader.createPreTransformerFromMapping = function (e, t) {
                return __awaiter(this, void 0, void 0, (function () {
                    var n, o, i = this;
                    return __generator(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return n = {}, o = e.reduce((function (e, o) {
                                    var r = t[o];
                                    if (r instanceof Error) e[o] = r; else {
                                        if (e[o]) return e;
                                        switch (r.type) {
                                            case"custom":
                                                var a = r.custom;
                                                if (i.customTransformationsCache.has(a)) e[o] = i.customTransformationsCache.get(a); else {
                                                    var s = (n[a] || i.loadCustomTransformer(a)).then((function (t) {
                                                        return e[o] = t
                                                    })).catch((function (t) {
                                                        return e[o] = new error_1.StatusError(827, t.message)
                                                    }));
                                                    n[a] = s
                                                }
                                                break;
                                            case"mapping":
                                            default:
                                                try {
                                                    e[o] = function (e) {
                                                        return (r.writes || Object.keys(e) || []).reduce((function (t, n) {
                                                            var o = r.mapping[n] || r.mapping[n.replace(/\.[0-9]+/, ".*")],
                                                                i = e[n];
                                                            if (i instanceof Error) throw i;
                                                            return t[o] = "" + i, t
                                                        }), {})
                                                    }
                                                } catch (t) {
                                                    e[o] = t
                                                }
                                        }
                                        if (r.writes) for (var c = 0, l = r.writes; c < l.length; c++) {
                                            var u = l[c];
                                            e[u] = e[o]
                                        }
                                    }
                                    return e
                                }), {}), [4, Promise.all(Object.keys(n).map((function (e) {
                                    return n[e]
                                })))];
                            case 1:
                                return r.sent(), [2, o]
                        }
                    }))
                }))
            }, PfcProcessorLoader.createConverterFromMapping = function (e, t) {
                return e.reduce((function (e, n) {
                    var o = t[n];
                    if (o instanceof Error) e[n] = o; else {
                        var i = o.conversion || {};
                        e[n] = function (e) {
                            for (var t = Object.keys(e || {}), n = 0, r = Object.keys(o.mapping || {}); n < r.length; n++) {
                                var a = r[n];
                                !/\*/.test(a) && t.indexOf(a) <= 0 && t.push(a)
                            }
                            return t.reduce((function (t, n) {
                                var o = e[n], r = n.replace(/\.[0-9]+/, ".*"), a = (i[r] || []).filter((function (e) {
                                    return e.from === o
                                }))[0];
                                return t[n] = a ? a.to : o, t
                            }), {})
                        }
                    }
                    return e
                }), {})
            }, PfcProcessorLoader.mergeTransformerAndConverterToPostProcessor = function (e, t, n, o) {
                return e.reduce((function (e, i) {
                    var r = t[i], a = n[i], s = o[i];
                    return r instanceof Error ? e[i] = r : a instanceof Error ? e[i] = a : s instanceof Error ? e[i] = s : e[i] = function (e) {
                        return s(a(e))
                    }, e
                }), {})
            }, PfcProcessorLoader.mergeTransformerAndConverterToPreProcessor = function (e, t, n, o) {
                return e.reduce((function (e, i) {
                    var r = t[i], a = n[i], s = o[i];
                    if (r instanceof Error) e[i] = r; else if (a instanceof Error) e[i] = a; else if (s instanceof Error) e[i] = s; else {
                        if (e[i]) return e;
                        if (e[i] = function (e) {
                            return a(s(e))
                        }, r.writes) for (var c = 0, l = r.writes; c < l.length; c++) {
                            e[l[c]] = e[i]
                        }
                    }
                    return e
                }), {})
            }, PfcProcessorLoader.createPostProcessor = function (e, t) {
                return __awaiter(this, void 0, void 0, (function () {
                    var n, o;
                    return __generator(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.createPostTransformerFromMapping(e, t)];
                            case 1:
                                return n = i.sent(), o = this.createConverterFromMapping(e, t), [2, this.mergeTransformerAndConverterToPostProcessor(e, t, n, o)]
                        }
                    }))
                }))
            }, PfcProcessorLoader.createPreProcessor = function (e, t) {
                return __awaiter(this, void 0, void 0, (function () {
                    var n, o;
                    return __generator(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.createPreTransformerFromMapping(e, t)];
                            case 1:
                                return n = i.sent(), o = this.createConverterFromMapping(e, t), [2, this.mergeTransformerAndConverterToPreProcessor(e, t, n, o)]
                        }
                    }))
                }))
            }, PfcProcessorLoader.customTransformationsCache = new cache_1.Cache, PfcProcessorLoader
        }();
        exports.PfcProcessorLoader = PfcProcessorLoader
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__assign || function () {
            return (o = Object.assign || function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, i = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, r = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a, s, c, l, u = n(1), f = n(0), d = n(17);
        !function (e) {
            e[e.cacheOnly = 0] = "cacheOnly", e[e.commit = 1] = "commit"
        }(a = t.WriteMode || (t.WriteMode = {})), function (e) {
            e[e.current = 0] = "current", e[e.original = 1] = "original"
        }(s = t.CacheLookUpMode || (t.CacheLookUpMode = {})), function (e) {
            e[e.current = 0] = "current", e[e.original = 1] = "original", e[e.both = 2] = "both"
        }(c = t.CacheUpdateMode || (t.CacheUpdateMode = {})), function (e) {
            e[e.always = 0] = "always", e[e.strict = 1] = "strict"
        }(l = t.CacheLookUpCondition || (t.CacheLookUpCondition = {}));
        var p = function () {
            function e(t, n, o) {
                if (e._singleton) throw new Error("pfc writer is intended to be used as a singleton. However, you tried to create a second instance, which is prohibited.");
                this.valueCache = t, this.parameterInfos = o, this.mappingCache = this.createMappingCache(n, this.parameterInfos), e._singleton = this
            }

            return Object.defineProperty(e, "singleton", {
                get: function () {
                    return this._singleton
                }, enumerable: !0, configurable: !0
            }), e.prototype.createMappingCache = function (e, t) {
                var n = new u.Cache;
                return t.forEach((function (t) {
                    e.forEach((function (e) {
                        if (e.writes && e.writes.indexOf(t.id) > -1) {
                            var o = n.get(t.id) || [];
                            o.push(e), n.set(t.id, o)
                        }
                    }))
                })), n
            }, e.prototype.write = function (e, t, n) {
                return void 0 === n && (n = a.cacheOnly), i(this, void 0, void 0, (function () {
                    var i, l, u, p, h, v, b, m, y;
                    return r(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return this.runningRequest ? [4, this.runningRequest] : [3, 2];
                            case 1:
                                r.sent(), r.label = 2;
                            case 2:
                                return i = /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*(\.[0-9]+)?(\.[a-z][a-z0-9]*)*$/, e.filter((function (e) {
                                    return !i.test(e)
                                })).length > 0 ? [2, e.reduce((function (e, t) {
                                    return e[t] = new f.StatusError(814, t), e
                                }), {})] : (l = [], u = this.checkParameterExistsInCache(e, l), t = t && e.reduce((function (e, n) {
                                    return void 0 !== t[n] && l.indexOf(n) >= 0 && (e[n] = t[n]), e
                                }), {}), p = {}, h = {}, l.length > 0 ? (t && this.updateValueCache(t, c.current), n !== a.commit ? [3, 4] : (this.runningRequest = d.PfcValueSaver.saveValues(l, this.mappingCache, this.valueCache), [4, this.runningRequest])) : [3, 5]);
                            case 3:
                                for (v = r.sent(), this.updateValueCache(v, c.both), b = 0, m = l; b < m.length; b++) y = m[b], p[y] = v[y];
                                return this.runningRequest = void 0, h = this.valueCacheLookUp(e, s.original), [3, 5];
                            case 4:
                                h = this.valueCacheLookUp(e, s.current), r.label = 5;
                            case 5:
                                return [2, o(o(o({}, u), h), p)]
                        }
                    }))
                }))
            }, e.prototype.updateValueCache = function (e, t) {
                for (var n in e) if (!(e[n] instanceof Error) && void 0 !== e[n]) {
                    var o = this.valueCache.get(n) || {value: null, originalValue: null};
                    switch (t) {
                        case c.both:
                            o.value = e[n], o.originalValue = e[n];
                            break;
                        case c.original:
                            o.originalValue = e[n];
                            break;
                        case c.current:
                            o.value = e[n]
                    }
                    this.valueCache.set(n, o)
                }
            }, e.prototype.valueCacheLookUp = function (e, t, n) {
                var o = this;
                return void 0 === n && (n = l.always), e.reduce((function (e, i) {
                    if (n === l.always || n === l.strict && "never" === o.getParameterInfoFromCache(i).changeBehaviour) if (i.indexOf("*") > -1) {
                        var r = 0;
                        do {
                            var a = i.replace("*", "" + r), c = o.valueCache.get(a);
                            e[a] = t === s.current ? c.value : c.originalValue, r += 1
                        } while (o.valueCache.has(i.replace("*", "" + r)))
                    } else if (o.valueCache.has(i)) {
                        c = o.valueCache.get(i);
                        e[i] = t === s.current ? c.value : c.originalValue
                    }
                    return e
                }), {})
            }, e.prototype.getParameterInfoFromCache = function (e) {
                return e = e.replace(/\.[0-9]+/, ".*"), this.parameterInfos.filter((function (t) {
                    return t.id === e
                }))[0]
            }, e.prototype.checkParameterExistsInCache = function (e, t) {
                var n = this;
                return e.reduce((function (e, o) {
                    var i, r = o.replace(/\.[0-9]+/, ".*");
                    return n.parameterInfos.some((function (e) {
                        return e.id === r && (i = e, !0)
                    })), i ? i.writable ? "readwrite" !== i.accessRights ? e[o] = new f.StatusError(844, o) : t.push(o) : e[o] = new f.StatusError(843, o) : e[o] = new f.StatusError(811, o), e
                }), {})
            }, e
        }();
        t.PfcWriter = p
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(2), a = n(5), s = n(0), c = n(6), l = function () {
            function e() {
            }

            return e.saveValues = function (e, t, n, l) {
                return o(this, void 0, void 0, (function () {
                    var o, u, f, d, p;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return o = r.PfcMappingLoader.getSaveMappingForIds(e, t, n), [4, a.PfcToolCreator.createSaveTool(e, o)];
                            case 1:
                                return u = i.sent(), f = e.reduce((function (e, t) {
                                    if (n.has(t)) {
                                        var o = n.get(t);
                                        e[t] = null !== o.value && void 0 !== o.value ? o.value : o.originalValue
                                    } else e[t] = new s.StatusError(845, t);
                                    return e
                                }), {}), d = e.reduce((function (e, t) {
                                    var n = o[t], i = u[t];
                                    return n instanceof Error ? e[t] = n : i instanceof Error ? e[t] = i : (e[t] = i.preProcess(f), e[t] || (e[t] = new s.StatusError(831, t))), e
                                }), {}), [4, c.PfcCommandExecutor.executeTools(e, u, l, d)];
                            case 2:
                                return p = i.sent(), [2, this.getValuesForExecutionResults(e, p, n)]
                        }
                    }))
                }))
            }, e.getValuesForExecutionResults = function (e, t, n) {
                return e.reduce((function (e, o) {
                    var i = t[o];
                    return i instanceof Error ? e[o] = i : e[o] = n.get(o).value, e
                }), {})
            }, e
        }();
        t.PfcValueSaver = l
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(1), a = n(0), s = n(6), c = n(5), l = n(2), u = function () {
            function e(t, n, o) {
                if (e._singleton) throw new Error("pfc method caller is intended to be used as a singleton. However, you tried to create a second instance, which is prohibited.");
                this.valueCache = t, this.methodInfos = o, this.mappingCache = this.createMappingCache(n, this.methodInfos), e._singleton = this
            }

            return Object.defineProperty(e, "singleton", {
                get: function () {
                    return this._singleton
                }, enumerable: !0, configurable: !0
            }), e.prototype.createMappingCache = function (e, t) {
                var n = new r.Cache;
                return t.forEach((function (t) {
                    e.forEach((function (e) {
                        e.executes && e.executes.indexOf(t.id) > -1 && n.set(t.id, [e])
                    }))
                })), n
            }, e.prototype.exec = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    var o, r, u, f, d;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return this.runningRequest ? [4, this.runningRequest] : [3, 2];
                            case 1:
                                i.sent(), i.label = 2;
                            case 2:
                                return /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*(\.[0-9]+)?(\.[a-z][a-z0-9]*)*$/.test(e) ? [4, l.PfcMappingLoader.getCallMappingForIds([e], this.mappingCache, this.valueCache)] : [2, new a.StatusError(814, e)];
                            case 3:
                                return o = i.sent(), [4, c.PfcToolCreator.createCallTool([e], o)];
                            case 4:
                                if (r = i.sent(), u = {}, f = r[e], n && f && !(f instanceof Error) && (u[e] = f.preProcess ? f.preProcess(n) : n, !u[e])) throw new a.StatusError(831, e);
                                return [4, s.PfcCommandExecutor.executeTools([e], r, t, u)];
                            case 5:
                                return (d = i.sent()[e]) instanceof Error ? [2, d] : [2, d.resultString]
                        }
                    }))
                }))
            }, e
        }();
        t.PfcMethodCaller = u
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.parameterServiceStatusErrorDefinitions = [[801, "Failed to load parameter infos due to an error"], [802, "Failed to load mapping infos due to an error"], [811, "Unknown parameter"], [812, "Unknown method"], [813, "Invalid id"], [814, "Invalid id (no placeholders allowed)"], [821, "No configtool mapping to read parameter"], [822, "Invalid configtool mapping to read parameter"], [823, "No configtool mapping to write parameter"], [824, "Invalid configtool mapping to write parameter"], [825, "No configtool mapping to execute method"], [826, "Invalid configtool mapping to execute method"], [827, "Could not get transformation function"], [831, "Preprocessor function did not deliver variables for values"], [832, "Postprocessor function did not return values for raw value"], [833, "Missing value for configtool template constant"], [834, "Missing value for configtool template variable"], [841, "Not readable"], [842, "No permission to read"], [843, "Not writable"], [844, "No permission to write"], [845, "Cannot write, because no value is existing in cache"], [846, "No permission to execute"], [847, "Missing argument for method"], [861, "Configtool returned with an unknown error"], [862, "Configtool returned with an error code"]]
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = n(4), i = function () {
            function e() {
                this.intervalCache = []
            }

            return e.AddObservings = function (e, t, n, o, i, r) {
                r[e] || (r[e] = []), r[e].push({observer: t, observation: n, options: o, parameter: i})
            }, e.UpdateChangeOnObservers = function (e, t, n, o) {
                var i = o[e];
                if (/\.[0-9]+/.test(e)) {
                    var r = o[e.replace(/\.[0-9]+/, ".*")];
                    r && (i = i ? i.concat(r) : r)
                }
                (i = i && i.filter((function (e) {
                    return "change" == e.options.kind
                }))) && t.originalValue !== (n && n.originalValue) && this.CallObserversUpdateObservations(i, e, t, n)
            }, e.SampleObserver = function (e, t, n, i, r) {
                var a = this, s = n[e];
                window.setInterval((function () {
                    t.read([e], o.ValueCacheUsage.strict, !1).then((function (t) {
                        var n = {value: t, originalValue: t};
                        a.CallObserversUpdateObservations(s, e, n, r), r = n
                    }))
                }), 1e3 * i)
            }, e.CallObserversUpdateObservations = function (e, t, n, o) {
                var i = this;
                e.forEach((function (e, r) {
                    var a = e.observer, s = e.observation, c = e.options, l = JSON.parse(JSON.stringify(e.parameter));
                    l.id = t, i.UpdateHistory(s, c, o, n), a(l, n.originalValue, null != o ? o.originalValue : null)
                }))
            }, e.UpdateHistory = function (e, t, n, o) {
                if (e.lastValue = n && n.originalValue, t.maxHistoryLength && t.maxHistoryLength > 0) for (e.history = e.history || [], e.history.unshift({
                    time: new Date,
                    value: o.originalValue
                }); e.history.length > t.maxHistoryLength;) e.history.pop()
            }, e
        }();
        t.PFCObserver = i
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        }, r = this && this.__spreadArrays || function () {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var o = Array(e), i = 0;
            for (t = 0; t < n; t++) for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
            return o
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var a = n(0), s = n(22), c = n(10), l = n(10), u = function () {
            function e(e, t, n, o) {
                this.plugins = {}, this.scripts = {}, this.loggerService = e, this.statusService = t, this.authenticationService = n, this.parameterService = o, this.setupStatusService()
            }

            return e.prototype.setupStatusService = function () {
                this.statusService.addStatusGroup(600, "PluginService"), this.statusService.addStatus(601, "registration failed. tried to register a load function for a script that has not been injected by the plugin service"), this.statusService.addStatus(602, "plugin has not provided a load function"), this.statusService.addStatus(603, "plugins failed to load")
            }, e.prototype.getLoaded = function () {
                var e = [];
                for (var t in this.plugins) e.push(this.plugins[t]);
                return e
            }, e.prototype.isLoaded = function (e, t) {
                var n = this.plugins[e];
                return !(!n || n.name != e || null != t && c.default(t, n.version) != l.VersionComparisonResult.Equal)
            }, e.prototype.getResourceUrl = function (e) {
                return this.isLoaded(e) ? "plugins/" + e : ""
            }, e.prototype.register = function (e, t) {
                var n = this.plugins[e];
                n ? n.load = t : this.loggerService.error("[Base] " + this.statusService.getStatus(601).description, e)
            }, e.prototype.preparePlugin = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n, s, c, l, u, f, d, p = this;
                    return i(this, (function (h) {
                        switch (h.label) {
                            case 0:
                                n = {
                                    name: t.name,
                                    version: t.version,
                                    description: t.description,
                                    requires: t.requires,
                                    provides: r(t.provides),
                                    license: t.license,
                                    load: function () {
                                        return o(p, void 0, void 0, (function () {
                                            var e;
                                            return i(this, (function (t) {
                                                throw e = new a.StatusError(602, "plugin '" + n.name + "@" + n.version + "' has not provided a load function and therefore did not load appropriately"), this.loggerService.error("[Base] " + this.statusService.getStatus(602).description, name), e
                                            }))
                                        }))
                                    }
                                }, this.plugins[n.name] = n, s = [], c = 0, l = t.files, h.label = 1;
                            case 1:
                                return c < l.length ? (u = l[c], d = (f = s).push, [4, e.inject(u + "?v=" + t.version)]) : [3, 4];
                            case 2:
                                d.apply(f, [h.sent()]), h.label = 3;
                            case 3:
                                return c++, [3, 1];
                            case 4:
                                return this.scripts[n.name] = s, [2, n]
                        }
                    }))
                }))
            }, e.prototype.isPlatformCompatible = function (e) {
                return e.platform.indexOf("pfc") >= 0
            }, e.prototype.isVersionCompatible = function (e, t) {
                try {
                    if (!(parseInt(e.base, 10) === parseInt(t))) return !1;
                    var n = c.default(e.base, t);
                    return n === l.VersionComparisonResult.Lower || n === l.VersionComparisonResult.Equal
                } catch (e) {
                    return !1
                }
            }, e.prototype.load = function () {
                return o(this, void 0, void 0, (function () {
                    var e, t, n, o, r, c, l, u, f, d, p, h, v = this;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return i.trys.push([0, 14, , 15]), this.loggerService.info("[Base] PluginService: get own version info"), [4, fetch("manifest.json")];
                            case 1:
                                return [4, i.sent().json()];
                            case 2:
                                return e = i.sent(), this.loggerService.info("[Base] PluginService: detecting device features"), t = [], [4, this.parameterService.read("features.*.name")];
                            case 3:
                                return i.sent().map((function (e) {
                                    e.error ? v.loggerService.error("[Base] a device feature could not be detected. plugins requiring it may not be loaded.") : t.push(e.value)
                                })), this.loggerService.info("[Base] detected device features:", t), [4, this.authenticationService.csrfFetch("php/plugins/load.php")];
                            case 4:
                                return [4, i.sent().json()];
                            case 5:
                                n = i.sent(), o = new s.Injector(document.body), r = [], c = 0, l = n.plugins, i.label = 6;
                            case 6:
                                return c < l.length ? (u = l[c]).error ? (f = u.error, this.loggerService.error('[Base] PluginService: error received from "plugins/load.php". See PHP Log for more details', "Error:" + f.code + "/" + f.group, f.text), [3, 12]) : [3, 7] : [3, 13];
                            case 7:
                                return this.isPlatformCompatible(u) ? [3, 8] : (this.loggerService.error("[Base] PluginService: plugin '" + u.name + "@" + u.version + " is not compatible to this platform"), r.push(new a.StatusError(604, "Plugin '" + u.name + "@" + u.version + " is not compatible to this platform")), [3, 12]);
                            case 8:
                                return this.isVersionCompatible(u, e.base) ? [3, 9] : (this.loggerService.error("[Base] PluginService: plugin '" + u.name + "@" + u.version + " is not compatible to this platform"), r.push(new a.StatusError(605, "plugin '" + u.name + "@" + u.version + " is not compatinble to this version. It requires a base version of " + u.base + ", but this WBM has a base version of " + e.base)), [3, 12]);
                            case 9:
                                return this.arePluginFeaturesSupported(u, t) ? [3, 10] : (this.loggerService.info("[Base] PluginService: " + u.name + "@" + u.version + " will not been loaded as not all required device features are available. required features are:", u.features), [3, 12]);
                            case 10:
                                return p = (d = r).push, [4, this.preparePlugin(o, u)];
                            case 11:
                                p.apply(d, [i.sent()]), this.loggerService.info("[Base] PluginService: successfully loaded '" + u.name + "@" + u.version, this.scripts[u.name].map((function (e) {
                                    return e.src
                                }))), i.label = 12;
                            case 12:
                                return c++, [3, 6];
                            case 13:
                                return [2, r];
                            case 14:
                                throw h = i.sent(), new a.StatusError(603, "failed to load plugins due to an error: " + h.message);
                            case 15:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.arePluginFeaturesSupported = function (e, t) {
                return !e.features || !e.features.some((function (e) {
                    return t.indexOf(e) < 0
                }))
            }, e
        }();
        t.PhpPluginService = u
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e) {
                this.container = e
            }

            return e.prototype.inject = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t = this;
                    return i(this, (function (n) {
                        return [2, new Promise((function (n, o) {
                            var i = document.createElement("script");
                            t.container.appendChild(i), i.addEventListener("load", (function (e) {
                                return n(i)
                            })), i.src = e
                        }))]
                    }))
                }))
            }, e
        }();
        t.Injector = r
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function () {
            function e(e, t) {
                this.dictionary = t, this.language = e
            }

            return e.prototype.translate = function (e) {
                return void 0 !== this.dictionary[e] ? this.dictionary[e] : null
            }, e.prototype.localized = function (e) {
                var t = e.key, n = e.fallback, o = this.translate(t);
                return null !== o ? o : n
            }, e
        }();
        t.PhpLocaleService = o
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(8), a = function () {
            function e(e, t) {
                this.successedUploads = [], this.authenticationService = e, this.loggerService = t
            }

            return e.prototype.upload = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n, o, r;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return n = this.calculateUploadSize(e), [4, this.prepareTransfer(n)];
                            case 1:
                                return o = i.sent(), [4, this.chunkedFilesUpload(e, o.chunkSize, o.transferToken, t)];
                            case 2:
                                return r = i.sent(), this.lastTransferToken = o.transferToken, [2, r]
                        }
                    }))
                }))
            }, e.prototype.cleanUp = function () {
                return o(this, void 0, void 0, (function () {
                    var e, t, n;
                    return i(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return this.lastTransferToken ? (e = {"Com-Wago-Transfer-Token": this.lastTransferToken}, [4, this.authenticationService.csrfHeadFetch("php/file_transfer/cleanup_transfer.php", e)]) : (this.loggerService.info("Nothing to do. No transfer exists"), [2]);
                            case 1:
                                if (200 != (t = o.sent()).status) throw new Error(t.statusText);
                                return [4, t.json()];
                            case 2:
                                if (0 != (n = o.sent()).status) throw new Error(n.statusMessage);
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.calculateUploadSize = function (e) {
                var t = 0;
                return e.forEach((function (e) {
                    t += e instanceof File ? e.size : e.file.size
                })), t
            }, e.prototype.prepareTransfer = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t, n, o;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = {}, void 0 !== e && (t["Com-Wago-Transfer-Size"] = "" + e), [4, this.authenticationService.csrfHeadFetch("php/file_transfer/prepare_transfer.php", t)];
                            case 1:
                                if (200 != (n = i.sent()).status) throw new Error(n.statusText);
                                return [4, n.json()];
                            case 2:
                                if ((o = i.sent()).error) throw this.loggerService.error(o.error.text), new Error(o.error.text);
                                return [2, {
                                    chunkSize: o.uploadChunkSize,
                                    transferToken: o.transferToken,
                                    transferPath: o.transferPath
                                }]
                        }
                    }))
                }))
            }, e.prototype.cacheUploadedFile = function (e, t) {
                this.successedUploads.push({file: e, destination: t})
            }, e.prototype.chunkedFilesUpload = function (e, t, n, r) {
                return o(this, void 0, void 0, (function () {
                    var o, a, s, c, l, u, f;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                o = [], a = 0, s = e, i.label = 1;
                            case 1:
                                return a < s.length ? (c = s[a], l = c instanceof File ? c.size : c.file.size, u = this.createChunkedFile(c, t, r), [4, this.uploadChunk(u, n, l)]) : [3, 4];
                            case 2:
                                f = i.sent(), o.push(f), i.label = 3;
                            case 3:
                                return a++, [3, 1];
                            case 4:
                                return [2, o]
                        }
                    }))
                }))
            }, e.prototype.createChunkedFile = function (e, t, n) {
                var o = {name: e.name, destination: n ? n.replace(/\/$/, "") : void 0, chunks: []},
                    i = e instanceof File ? e : e.file, r = 0;
                do {
                    var a = i.slice(r, r + t);
                    o.chunks.push(a), r += a.size
                } while (r < i.size);
                return o
            }, e.prototype.uploadChunk = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    var o, r, a, s, c, l, u;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                o = "", r = "", a = {
                                    "Com-Wago-Transfer-Token": t,
                                    "Com-Wago-Upload-Name": encodeURIComponent(e.name),
                                    "Com-Wago-Upload-Size": n
                                }, e.destination && (a["Com-Wago-Upload-Destination"] = encodeURIComponent(e.destination) + "/" + encodeURIComponent(e.name)), s = 0, i.label = 1;
                            case 1:
                                return s < e.chunks.length ? (c = e.chunks[s], r && (a["Com-Wago-Upload-Token"] = r), [4, this.authenticationService.csrfHeadFetch("php/file_transfer/receive_upload.php", a, c)]) : [3, 5];
                            case 2:
                                if (200 != (l = i.sent()).status) throw new Error(l.statusText);
                                return [4, l.json()];
                            case 3:
                                if ((u = i.sent()).error) throw this.loggerService.error(u.error.text), new Error(u.error.text);
                                u.uploadPath ? o = u.uploadPath : u.uploadToken && (r = u.uploadToken), i.label = 4;
                            case 4:
                                return s += 1, [3, 1];
                            case 5:
                                return [2, o]
                        }
                    }))
                }))
            }, e.prototype.download = function (e) {
                return o(this, void 0, void 0, (function () {
                    var t = this;
                    return i(this, (function (n) {
                        return [2, new Promise((function (n, o) {
                            var i = document.createElement("iframe");
                            i.style.display = "none", document.body.appendChild(i);
                            var a = t.authenticationService.getActiveUser(), s = "string" == typeof e ? e : e.filepath,
                                c = "string" == typeof e ? void 0 : e.token;
                            s ? i.src = "php/file_transfer/download.php?download=" + s + "&csrf=" + a.csrf : c && (i.src = "php/file_transfer/download.php?transfer=" + c + "&csrf=" + a.csrf);
                            var l = function () {
                                h(), o(new Error("could not load"))
                            };
                            i.addEventListener("error", l);
                            var u = function () {
                                try {
                                    var e = i.contentWindow && i.contentWindow.document.body,
                                        t = e && JSON.parse(e.textContent || "false");
                                    t && (h(), o(t.error))
                                } catch (e) {
                                    h(), n()
                                }
                            };
                            i.addEventListener("load", u);
                            var f = "download(" + s + ")", d = 30, p = setInterval((function () {
                                r.get(f) ? (h(), n()) : --d <= 0 && (h(), o(new Error("download timed out")))
                            }), 1e3), h = function () {
                                i.removeEventListener("load", u), i.removeEventListener("error", l), i.remove(), clearInterval(p), r.remove(f)
                            }
                        }))]
                    }))
                }))
            }, e
        }();
        t.PfcTransferService = a
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(3), a = n(9), s = n(26);

        function c(e, t) {
            return o(this, void 0, void 0, (function () {
                var n;
                return i(this, (function (o) {
                    switch (o.label) {
                        case 0:
                            return n = "", [4, e.parameter.read(t).then((function (e) {
                                var t = e[0];
                                n = t.error ? "" : t.value
                            }))];
                        case 1:
                            return o.sent(), [2, n]
                    }
                }))
            }))
        }

        function l(e, t) {
            e.frame.registerActionItem({id: "logout", title: "Logout", icon: "exit_to_app", priority: 1}, (function () {
                var e = t.authentication.getActiveUser();
                t.authentication.logout(e), window.location.href = ""
            })), e.frame.registerActionItem({
                id: "reboot",
                title: "Reboot",
                icon: "power_settings_new",
                priority: 2,
                userRoles: [a.UserRoles.admin]
            }, (function () {
                return s.default(t)
            }))
        }

        t.default = function (e, t) {
            return o(this, void 0, void 0, (function () {
                var n = this;
                return i(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return e.showLogin = function () {
                                return o(n, void 0, void 0, (function () {
                                    var n, a, s, u, f = this;
                                    return i(this, (function (d) {
                                        switch (d.label) {
                                            case 0:
                                                return void 0 === (n = t.authentication.getSessionState()) || n || (t.modalPresenter.showInfoDialog(t, {
                                                    title: "Session Expired",
                                                    message: "Your session is expired. You were logged out"
                                                }), t.authentication.clearActiveUser()), [4, c(t, "device.productdescription")];
                                            case 1:
                                                return a = d.sent(), [4, c(t, "device.hostname")];
                                            case 2:
                                                return s = d.sent(), (u = new r.Login(t, "", a, s)).onLogin = function () {
                                                    return o(f, void 0, void 0, (function () {
                                                        return i(this, (function (n) {
                                                            switch (n.label) {
                                                                case 0:
                                                                    return u.view.remove(), [4, t.parameter.reloadParameters()];
                                                                case 1:
                                                                    return n.sent(), [4, e.loadBase(t)];
                                                                case 2:
                                                                    return n.sent(), l(e, t), [2]
                                                            }
                                                        }))
                                                    }))
                                                }, document.body.appendChild(u.view), [4, u.load()];
                                            case 3:
                                                return d.sent(), [2]
                                        }
                                    }))
                                }))
                            }, [4, e.loadBase(t)];
                        case 1:
                            a.sent();
                            try {
                                l(e, t)
                            } catch (e) {
                            }
                            return [2]
                    }
                }))
            }))
        }
    }, function (e, t, n) {
        "use strict";
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(27), a = n(28), s = 18e4, c = 1e3;

        function l(e) {
            return o(this, void 0, void 0, (function () {
                var t, n, o, r;
                return i(this, (function (i) {
                    switch (i.label) {
                        case 0:
                            return [4, e.parameter.execute("reboot")];
                        case 1:
                            return (t = i.sent()).error ? (e.modalPresenter.showErrorDialog(e, {
                                title: e.localization.localized({
                                    fallback: "Reboot failed",
                                    key: "reboot-failed-modal-title"
                                }),
                                message: e.localization.localized({
                                    fallback: "Something went wrong and the reboot could not be initiated.",
                                    key: "reboot-failed-modal-message."
                                }),
                                detailMessage: t.error.message
                            }), [3, 6]) : [3, 2];
                        case 2:
                            n = Date.now(), o = !0, r = !0, i.label = 3;
                        case 3:
                            return o ? [4, a.sleep(c)] : [3, 5];
                        case 4:
                            return i.sent(), fetch("", {method: "HEAD"}).then((function () {
                                o = !1, r = !1
                            })).catch((function () {
                                Date.now() - n > s && (o = !1)
                            })), [3, 3];
                        case 5:
                            if (r) throw new Error("reconnect failed");
                            i.label = 6;
                        case 6:
                            return [2]
                    }
                }))
            }))
        }

        t.default = function (e) {
            return o(void 0, void 0, void 0, (function () {
                var t;
                return i(this, (function (n) {
                    switch (n.label) {
                        case 0:
                            return [4, e.modalPresenter.showDialog(e, {
                                title: e.localization.localized({
                                    fallback: "Reboot",
                                    key: "reboot-prompt-modal-title"
                                }),
                                message: e.localization.localized({
                                    fallback: "Do you really want to reboot the device? The device will be unavailable for a few minutes.",
                                    key: "reboot-prompt-modal-message"
                                }),
                                primaryButton: {title: "Reboot", style: r.DialogButtonStyle.action},
                                secondaryButton: r.DialogButton.cancel
                            })];
                        case 1:
                            if (n.sent() != r.DialogButtonType.primary) return [3, 7];
                            n.label = 2;
                        case 2:
                            return n.trys.push([2, 5, , 7]), [4, e.modalPresenter.showLoadingDialog(e, {title: "Rebooting device..."}, l(e))];
                        case 3:
                            return n.sent(), [4, e.modalPresenter.showDialog(e, {
                                title: e.localization.localized({
                                    fallback: "Reboot completed",
                                    key: "reboot-completed-modal-title"
                                }),
                                message: e.localization.localized({
                                    fallback: "Press okay to reload the page. You may need to login again.",
                                    key: "reboot-completed-modal-message"
                                })
                            })];
                        case 4:
                            return n.sent(), window.location.reload(), [3, 7];
                        case 5:
                            return t = n.sent(), [4, e.modalPresenter.showErrorDialog(e, {
                                title: e.localization.localized({
                                    fallback: "Reconnect failed",
                                    key: "reboot-reconnect-failed-modal-title"
                                }),
                                message: e.localization.localized({
                                    fallback: "The WBM is not reachable any more.",
                                    key: "reboot-reconnect-failed-modal-message"
                                }),
                                detailMessage: t.message
                            })];
                        case 6:
                            return n.sent(), [3, 7];
                        case 7:
                            return [2]
                    }
                }))
            }))
        }
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
        var o = this && this.__awaiter || function (e, t, n, o) {
            return new (n || (n = Promise))((function (i, r) {
                function a(e) {
                    try {
                        c(o.next(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function s(e) {
                    try {
                        c(o.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((o = o.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, o, i, r, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
                return this
            }), r;

            function s(r) {
                return function (s) {
                    return function (r) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                            switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {value: r[1], done: !1};
                                case 5:
                                    a.label++, o = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], o = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & r[0]) throw r[1];
                        return {value: r[0] ? r[1] : void 0, done: !0}
                    }([r, s])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.sleep = function (e) {
            return o(this, void 0, void 0, (function () {
                return i(this, (function (t) {
                    return [2, new Promise((function (t) {
                        return setTimeout(t, e)
                    }))]
                }))
            }))
        }
    }])
}));
//# sourceMappingURL=pfc.js.map