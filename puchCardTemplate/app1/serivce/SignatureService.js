function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), i = e(require("./BaseService")), u = e(require("../lib/md5")), a = function(e) {
    function a() {
        var e, n, o, i;
        t(this, a);
        for (var u = arguments.length, s = Array(u), c = 0; c < u; c++) s[c] = arguments[c];
        return n = o = r(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [ this ].concat(s))), 
        o.salt = "SDasd13as1zdfweA", i = n, r(o, i);
    }
    return n(a, i.default), o(a, [ {
        key: "sign",
        value: function(e) {
            var t = this.getUserInfo(), r = t.id, n = t.register_time;
            return u.default.hex_md5(r + Date.parse(n) + this.salt + e);
        }
    }, {
        key: "checkSignature",
        value: function(e, t) {
            return console.log(this.sign(t), e), this.sign(t).startsWith(e);
        }
    } ]), a;
}();

exports.default = a;