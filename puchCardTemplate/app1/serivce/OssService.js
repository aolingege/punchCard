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

function o(e) {
    e = e || 32;
    for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", r = t.length, n = "", o = 0; o < e; o++) n += t.charAt(Math.floor(Math.random() * r));
    return n;
}

function i(e) {
    var t = e.lastIndexOf(".");
    return -1 !== t ? e.substring(t) : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = function() {
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
}(), a = e(require("./BaseService")), c = e(require("./WxService")), s = require("../utils/http"), l = function(e) {
    function l() {
        t(this, l);
        var e = r(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this));
        return e.wxService = new c.default(), e;
    }
    return n(l, a.default), u(l, [ {
        key: "getOssPolicy",
        value: function(e) {
            return (0, s.get)("/HabitNote/getOssPolicy");
        }
    }, {
        key: "uploadFile",
        value: function(e) {
            var t = this, r = "";
            return this.getOssPolicy().then(function(n) {
                var o = t._getFileName(e), i = n.dir + "/" + o;
                r = n.host + "/" + i;
                var u = {
                    key: i,
                    policy: n.policy,
                    OSSAccessKeyId: n.accessid,
                    success_action_status: "200",
                    signature: n.signature
                };
                return t.wxService.uploadFile(n.host, e, u);
            }).then(function(e) {
                return r;
            });
        }
    }, {
        key: "_getFileName",
        value: function(e) {
            return o(10) + new Date().getTime() + i(e);
        }
    } ]), l;
}();

exports.default = l;