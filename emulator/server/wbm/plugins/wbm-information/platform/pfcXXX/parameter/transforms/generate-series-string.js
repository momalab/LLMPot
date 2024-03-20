/*!
 * @wago/wbm-information@2.2.0
 *
 *   Copyright © 2021 WAGO Kontakttechnik GmbH & Co. KG
 *
 *   License:
 *     WAGO Software License Agreement
 *
 *   Contributors:
 *     Marius Hellmeier <marius.hellmeier@wago.com>
 *   Johann Dück <johann.dueck@wago.com>
 *   Stefanie Meihöfer <stefanie.meihoefer@wago.com>
 *
 *   Description:
 *     This is the information site for PFC's
 *
 *
 */
this["/generate-series-string"] = function(e) {
    var r = {};
    function t(n) {
        if (r[n])
            return r[n].exports;
        var i = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t),
        i.l = !0,
        i.exports
    }
    return t.m = e,
    t.c = r,
    t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        })
    }
    ,
    t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(e, r) {
        if (1 & r && (e = t(e)),
        8 & r)
            return e;
        if (4 & r && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (t.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & r && "string" != typeof e)
            for (var i in e)
                t.d(n, i, function(r) {
                    return e[r]
                }
                .bind(null, i));
        return n
    }
    ,
    t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(r, "a", r),
        r
    }
    ,
    t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }
    ,
    t.p = "",
    t(t.s = 1)
}([, function(e, r, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.default = function(e) {
        if (e instanceof Error)
            return {
                "device.series": e
            };
        var r = {
            "device.series": ""
        };
        return e.match(/^750-82/) ? r["device.series"] = "PFC" : e.match(/^762-/) ? r["device.series"] = "eDisplay" : e.match(/^2850-3/) ? r["device.series"] = "SRC" : e.match(/^768-/) && (r["device.series"] = "PAC"),
        r["device.ordernumber"] = e,
        r
    }
}
]).default;
//# sourceMappingURL=generate-series-string.js.map
