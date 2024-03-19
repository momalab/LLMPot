/*!
 * @wago/wbm-statusled@1.1.0
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
 *     Shows the LED state in status area
 *
 *
 */
this["/get-led-config"] = function(e) {
    var r = {};
    function t(n) {
        if (r[n])
            return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t),
        o.l = !0,
        o.exports
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
            for (var o in e)
                t.d(n, o, function(r) {
                    return e[r]
                }
                .bind(null, o));
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
    t(t.s = 0)
}([function(e, r, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.default = function(e) {
        var r, t;
        if (e instanceof Error)
            return {
                "hardware.leds.*.name": e,
                "hardware.leds.*.color": e,
                "hardware.leds.*.message": e,
                "hardware.leds.*.date": e
            };
        for (var n = {}, o = 0, a = 0, u = e.split("\n"); a < u.length; a++) {
            var l = u[a];
            if (l) {
                var i, d;
                i = (r = l.split(": ", 3))[0],
                l = r[1],
                d = r[2];
                var f, s;
                f = (t = l.split(/ [0-9]+ [0-9]+ /, 2))[0],
                s = t[1],
                n["hardware.leds." + o + ".name"] = i,
                n["hardware.leds." + o + ".color"] = f,
                n["hardware.leds." + o + ".message"] = s + "\n" + d,
                o++
            }
        }
        return n
    }
}
]).default;
//# sourceMappingURL=get-led-config.js.map
