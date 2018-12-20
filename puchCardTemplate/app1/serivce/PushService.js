function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
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

var n = function() {
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
}(), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./BaseService")), u = require("../utils/http"), i = function(i) {
    function a() {
        return e(this, a), t(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
    }
    return r(a, o.default), n(a, [ {
        key: "addPushForm",
        value: function(e, t, r) {
            return (0, u.get)("/HabitPush/addPushForm", {
                form_id: e,
                push_type: t,
                habit_id: r,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    } ]), a;
}();

exports.default = i;