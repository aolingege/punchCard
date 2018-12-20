function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
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

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./BaseService")), i = require("../utils/http"), u = function(u) {
    function a() {
        return e(this, a), t(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
    }
    return n(a, o.default), r(a, [ {
        key: "loginWithOpenId",
        value: function(e) {
            return (0, i.get)("/HabitUser/loginWithOpenId", {
                openid: e
            }).then(this.handleRespond);
        }
    }, {
        key: "getOpenId",
        value: function(e) {
            return (0, i.get)("/HabitUser/getWeChatSession", {
                code: e
            });
        }
    }, {
        key: "loginWithWeChat",
        value: function(e, t, n, r, o, u, a) {
            var c = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1;
            return (0, i.get)("/HabitUser/loginWithWeChat", {
                openid: e,
                nickname: t,
                gender: n,
                avatar_small: r,
                province: o,
                city: u,
                country: a,
                account_type: c
            }).then(this.handleRespond);
        }
    } ]), a;
}();

exports.default = u;