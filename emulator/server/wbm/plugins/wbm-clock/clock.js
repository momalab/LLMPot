/*!
 * @wago/wbm-clock@1.1.0
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
 *     Date and Time Settings
 *
 *
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.clock = t() : e.clock = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var o = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
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
                for (var o in e)
                    n.d(i, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
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
        n(n.s = 1)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ddmmyyyyPattern = "^(?:(?:31(\\/|-|\\.)(?:0[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)\\d{2})$|^(?:29(\\/|-|\\.)02\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)\\d{2})$",
        t.hhmmssPattern = "^((((0[1-9]|1[0-2]|[0-9])(:[0-5][0-9]){2})(( PM)|( AM))|( am)|( pm))|(((0[0-9]|1[0-9]|2[0-3]|[0-9])(:[0-5][0-9]){2})))$",
        t.tzStringPattern = "^[A-Z]+[+-]?(([0-9]|1[0-9]|2[0-4])(:([0-5]?[0-9])){0,2})?([A-Z]+([+-]?[0-9]|1[0-2](:([0-5]?[0-9])){0,2})?( ([0-5]?[0-9]))?)?(,M(([0-9]|1[0-9]|2[0-4])).[1-5].[0-6](/([0-9]|1[0-9]|2[0-4])(:([0-5]?[0-9])){0,2})?){0,2}$"
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        s(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function l(e) {
                    try {
                        s(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                s((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, i, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (o = 2 & r[0] ? i.return : r[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, r[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(2);
        base.plugin.register("wbm-clock", (function(e) {
            return i(this, void 0, void 0, (function() {
                var t;
                return o(this, (function(n) {
                    return t = {
                        title: {
                            default: "Clock Settings",
                            localized: "clock-settings-page-title"
                        },
                        content: [new r.TimeAndDateSettings(e)]
                    },
                    [2, {
                        id: "clock",
                        title: {
                            fallback: "Clock",
                            key: "clock-menu-title"
                        },
                        description: {
                            fallback: "Date and time Settings",
                            key: "date-and-time-settings-area-description"
                        },
                        priority: 930,
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
        var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
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
        ), r = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        s(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function l(e) {
                    try {
                        s(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    e.done ? o(e.value) : new n((function(t) {
                        t(e.value)
                    }
                    )).then(a, l)
                }
                s((i = i.apply(e, t || [])).next())
            }
            ))
        }
        , a = this && this.__generator || function(e, t) {
            var n, i, o, r, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function l(r) {
                return function(l) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (o = 2 & r[0] ? i.return : r[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, r[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (r = [2 & r[0], o.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    o = r;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = r;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(r);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                r = t.call(e, a)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, l])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = n(3)
          , s = n(4)
          , c = n(5)
          , u = n(6)
          , d = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.utcConfigSection = n.base.viewGenerator.generate(n.base, c.default),
                n.utcConfigForm = n.base.viewGenerator.generate(n.base, {
                    title: {
                        localized: "utc-time-and-date-settings",
                        default: "UTC Time and Date"
                    },
                    sections: [n.utcConfigSection]
                }),
                n.localConfigSection = n.base.viewGenerator.generate(n.base, u.default),
                n.localConfigForm = n.base.viewGenerator.generate(n.base, {
                    title: {
                        localized: "local-time-and-date-settings",
                        default: "Local Time and Date"
                    },
                    sections: [n.localConfigSection]
                }),
                n.didLoad = !1,
                n.useAmPm = !1,
                n.timeAndDateObservations = [],
                n.alreadyGeneratedClockSettingsForm = !1,
                n.view = document.createElement("wbm-ng-time-date-settings"),
                n
            }
            return o(t, e),
            t.prototype.load = function() {
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return this.didLoad ? [2] : (this.didLoad = !0,
                            this.beginObservingClockFormat(),
                            this.view.appendChild(this.utcConfigForm.view),
                            this.view.appendChild(this.localConfigForm.view),
                            [4, this.createClockSettingsForm()]);
                        case 1:
                            return e.sent(),
                            [4, Promise.all([this.clockConfigForm.load(), this.utcConfigForm.load(), this.localConfigForm.load()])];
                        case 2:
                            return e.sent(),
                            this.beginObservingUTCAndLocalTimesAndDates(),
                            this.beginAutoIncreaseOfTimeInputs(),
                            this.beginObservingTimezone(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.unload = function() {
                return r(this, void 0, void 0, (function() {
                    return a(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return this.didLoad = !1,
                            this.stopAutoIncreaseOfTimeInputs(),
                            this.stopObservingClockFormat(),
                            this.stopObservingUTCAndLocalTimesAndDates(),
                            this.stopObservingTimezone(),
                            [4, Promise.all([this.clockConfigForm.unload(), this.utcConfigForm.unload(), this.localConfigForm.unload()])];
                        case 1:
                            return e.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.beginObservingClockFormat = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t = this;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return this.base.parameter.read("clock.time.format").then((function(e) {
                                var n = e[0];
                                t.useAmPm = "12-hour-format" === n.value
                            }
                            )),
                            e = this,
                            [4, this.base.parameter.observe("clock.time.format", {
                                kind: "change",
                                throttleTime: 0
                            }, (function(e, n) {
                                t.useAmPm = "12-hour-format" === n
                            }
                            ))];
                        case 1:
                            return e.clockFormatObservation = n.sent(),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.stopObservingClockFormat = function() {
                this.clockFormatObservation.cancel()
            }
            ,
            t.prototype.afterFormSubmitted = function(e, t) {
                var n = document.querySelector(e + " div.section");
                n.querySelector("button").addEventListener("click", (function() {
                    var e = window.setInterval((function() {
                        0 == n.classList.contains("submitting") && (t(),
                        window.clearInterval(e))
                    }
                    ), 10)
                }
                ))
            }
            ,
            t.prototype.beginObservingUTCAndLocalTimesAndDates = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t, n = this;
                    return a(this, (function(i) {
                        return e = !1,
                        t = function() {
                            e || (Promise.all([n.localConfigSection.load(), n.utcConfigSection.load()]).then((function() {
                                e = !1
                            }
                            )),
                            e = !0)
                        }
                        ,
                        this.afterFormSubmitted('[taid="form-utc-time-and-date-settings"]', (function() {
                            return t()
                        }
                        )),
                        this.afterFormSubmitted('[taid="form-local-time-and-date-settings"]', (function() {
                            return t()
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.stopObservingUTCAndLocalTimesAndDates = function() {
                for (var e = 0, t = this.timeAndDateObservations; e < t.length; e++) {
                    t[e].cancel()
                }
                this.timeAndDateObservations = []
            }
            ,
            t.prototype.beginAutoIncreaseOfTimeInputs = function() {
                var e = this
                  , t = this.view.querySelector('[taid="field-utc-time-label"] input');
                t.addEventListener("blur", (function() {
                    return t.dispatchEvent(new CustomEvent("input"))
                }
                ), {
                    once: !0
                });
                var n = this.view.querySelector('[taid="field-local-time-label"] input');
                n.addEventListener("blur", (function() {
                    return n.dispatchEvent(new CustomEvent("input"))
                }
                ), {
                    once: !0
                }),
                window.clearInterval(this.increaseTimeHandler),
                this.increaseTimeHandler = window.setInterval((function() {
                    var t = e.view.querySelector('[taid="field-utc-time-label"] input')
                      , n = e.view.querySelector('[taid="field-utc-date-label"] input')
                      , i = e.getTimestampFromInputs(t, n);
                    e.applyTimestampToInputs(i + 1e3, t, n);
                    var o = e.view.querySelector('[taid="field-local-time-label"] input')
                      , r = e.view.querySelector('[taid="field-local-date-label"] input')
                      , a = e.getTimestampFromInputs(o, r);
                    e.applyTimestampToInputs(a + 1e3, o, r)
                }
                ), 1e3)
            }
            ,
            t.prototype.stopAutoIncreaseOfTimeInputs = function() {
                window.clearInterval(this.increaseTimeHandler)
            }
            ,
            t.prototype.applyTimestampToInputs = function(e, t, n) {
                if (!isNaN(e)) {
                    var i = new Date(e);
                    if (t !== document.activeElement && t.validity.valid) {
                        var o = i.getUTCHours()
                          , r = i.getUTCMinutes()
                          , a = i.getUTCSeconds()
                          , l = "";
                        if (this.useAmPm && (0 === o ? (o = 12,
                        l = " am") : 12 === o ? l = " pm" : o > 12 ? (o -= 12,
                        l = " pm") : l = " am"),
                        t.value = (o < 10 ? "0" + o : o) + ":" + (r < 10 ? "0" + r : r) + ":" + (a < 10 ? "0" + a : a) + l.toUpperCase(),
                        n !== document.activeElement && n.validity.valid) {
                            var s = i.getUTCFullYear()
                              , c = i.getUTCMonth() + 1
                              , u = i.getUTCDate();
                            n.value = (u < 10 ? "0" + u : u) + "." + (c < 10 ? "0" + c : c) + "." + (s < 10 ? "0" + s : s)
                        }
                    }
                }
            }
            ,
            t.prototype.getUtcDateComponents = function(e) {
                var t = e.split(".").map((function(e) {
                    return parseInt(e)
                }
                ));
                return [t[0], t[1], t[2]]
            }
            ,
            t.prototype.getUtcTimeComponents = function(e) {
                var t = /am$/i.exec(e)
                  , n = /pm$/i.exec(e)
                  , i = ((t || n || [])[0] || "").toLowerCase();
                i && (e = e.substring(0, e.length - 3));
                var o = e.split(":").map((function(e) {
                    return /^[0-9]+$/.test(e) ? parseInt(e) : NaN
                }
                ));
                return [o[0], o[1], o[2], i]
            }
            ,
            t.prototype.getTimestampFromInputs = function(e, t) {
                var n = e.value
                  , i = t.value
                  , o = this.getUtcDateComponents(i)
                  , r = o[0]
                  , a = o[1]
                  , l = o[2]
                  , s = this.getUtcTimeComponents(n)
                  , c = s[0]
                  , u = s[1]
                  , d = s[2]
                  , f = s[3];
                return "am" === f ? 12 === c && (c = 0) : "pm" === f && (c = (c + 12) % 24),
                Date.UTC(l, a - 1, r, c, u, d)
            }
            ,
            t.prototype.createClockSettingsForm = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t, n;
                    return a(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            if (this.alreadyGeneratedClockSettingsForm)
                                return [2];
                            this.alreadyGeneratedClockSettingsForm = !0,
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 3, , 4]),
                            [4, this.getTimezonePresets()];
                        case 2:
                            return e = i.sent(),
                            t = s.generateClockConfigSection(e),
                            this.clockConfigSection = this.base.viewGenerator.generate(this.base, t),
                            this.clockConfigForm = this.base.viewGenerator.generate(this.base, {
                                title: {
                                    localized: "timezone-and-format-form-title",
                                    default: "Timezone and Format"
                                },
                                sections: [this.clockConfigSection]
                            }),
                            this.view.insertBefore(this.clockConfigForm.view, this.view.firstChild),
                            [3, 4];
                        case 3:
                            return n = i.sent(),
                            this.base.modalPresenter.showErrorDialog(this.base, {
                                title: this.base.localization.localized({
                                    key: "error-loading-timezones-modal-title",
                                    fallback: "Failed to load timezones"
                                }),
                                message: this.base.localization.localized({
                                    key: "error-loading-timezones-modal-message",
                                    fallback: "Timezones could not be loaded due to an error."
                                }),
                                detailMessage: n.message
                            }),
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
            t.prototype.getTimezonePresets = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t;
                    return a(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return e = this.base.plugin.getResourceUrl("wbm-clock") + "/platform/pfcXXX/php/get_timezones.php",
                            [4, fetch(e)];
                        case 1:
                            if ((t = n.sent()).ok)
                                return [2, t.json()];
                            throw new Error("failed to get timezone presets")
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.beginObservingTimezone = function() {
                return r(this, void 0, void 0, (function() {
                    var e, t, n, i = this;
                    return a(this, (function(o) {
                        return e = this.view.querySelector('[taid="field-timezone-field-label"] select'),
                        t = this.view.querySelector('[taid="field-tzstring-field-label"] input'),
                        e.value = t.value,
                        this.onTimezoneChangeListener = function() {
                            "custom-timezone" !== e.value ? t.value = e.value : t.value = "",
                            t.dispatchEvent(new CustomEvent("input"))
                        }
                        ,
                        n = function() {
                            e.querySelector('option[value="' + t.value + '"]') ? e.value = t.value : e.value = "custom-timezone"
                        }
                        ,
                        this.onTzStringChangeListener = n,
                        e.addEventListener("change", this.onTimezoneChangeListener),
                        t.addEventListener("input", this.onTzStringChangeListener),
                        n(),
                        this.afterFormSubmitted('[taid="form-timezone-and-format-form-title"]', (function() {
                            i.localConfigSection.load(),
                            n()
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.stopObservingTimezone = function() {
                var e = this.view.querySelector('[taid="field-timezone-field-label"] select')
                  , t = this.view.querySelector('[taid="field-tzstring-field-label"] input');
                e.removeEventListener("change", this.onTimezoneChangeListener),
                t.removeEventListener("change", this.onTzStringChangeListener),
                this.onTimezoneChangeListener = void 0,
                this.onTzStringChangeListener = void 0,
                this.tzStringObservation.cancel()
            }
            ,
            t
        }(l.ViewController);
        t.TimeAndDateSettings = d
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
        t.generateClockConfigSection = function(e) {
            return {
                fields: [{
                    title: {
                        localized: "timezone-field-label",
                        default: "Timezone"
                    },
                    control: {
                        type: "dropdown",
                        items: e.map((function(e, t) {
                            return {
                                title: {
                                    default: "" + e.timezone,
                                    localized: "timezone-preset-" + t
                                },
                                value: e.tzstring
                            }
                        }
                        )).concat([{
                            title: {
                                default: "Custom Timezone",
                                localized: "custom-timezone"
                            },
                            value: "custom-timezone"
                        }])
                    }
                }, {
                    title: {
                        localized: "tzstring-field-label",
                        default: "TZ String"
                    },
                    parameter: "clock.timezone.tzstring",
                    control: {
                        type: "textfield"
                    }
                }, {
                    title: {
                        localized: "time-format-field-label",
                        default: "Time Format"
                    },
                    parameter: "clock.time.format",
                    control: {
                        type: "dropdown",
                        items: [{
                            title: {
                                default: "24 hour format",
                                localized: "24-hour-format"
                            },
                            value: "24-hour-format"
                        }, {
                            title: {
                                default: "12 hour format",
                                localized: "12-hour-format"
                            },
                            value: "12-hour-format"
                        }]
                    }
                }]
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        t.default = {
            fields: [{
                title: {
                    localized: "utc-date-label",
                    default: "UTC Date"
                },
                parameter: "clock.date.utc",
                control: {
                    type: "textfield",
                    validation: {
                        pattern: i.ddmmyyyyPattern,
                        hint: {
                            localized: "invalid-date-hint",
                            default: "Required format is DD.MM.YYYY"
                        }
                    }
                }
            }, {
                title: {
                    localized: "utc-time-label",
                    default: "UTC Time"
                },
                parameter: "clock.time.utc",
                control: {
                    type: "textfield",
                    validation: {
                        pattern: i.hhmmssPattern,
                        hint: {
                            localized: "invalid-date-hint",
                            default: "Required format is hh:mm:ss [AM|PM]"
                        }
                    }
                }
            }]
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        t.default = {
            fields: [{
                title: {
                    localized: "local-date-label",
                    default: "Local Date"
                },
                parameter: "clock.date.local",
                control: {
                    type: "textfield",
                    validation: {
                        pattern: i.ddmmyyyyPattern,
                        hint: {
                            localized: "invalid-date-hint",
                            default: "Required format is DD.MM.YYYY"
                        }
                    }
                }
            }, {
                title: {
                    localized: "local-time-label",
                    default: "Local Time"
                },
                parameter: "clock.time.local",
                control: {
                    type: "textfield",
                    validation: {
                        pattern: i.hhmmssPattern,
                        hint: {
                            localized: "invalid-date-hint",
                            default: "Required format is hh:mm:ss [AM|PM]"
                        }
                    }
                }
            }]
        }
    }
    ])
}
));
//# sourceMappingURL=clock.js.map
