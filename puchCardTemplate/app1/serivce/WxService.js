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

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./BaseService")), i = function(i) {
    function u(n) {
        return e(this, u), t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, n));
    }
    return n(u, r.default), o(u, [ {
        key: "getUserInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return new Promise(function(t, n) {
                wx.getUserInfo({
                    withCredentials: e,
                    success: function(e) {
                        t(e);
                    },
                    fail: function(e) {
                        n("无法获取您的登录信息，请重新授权");
                    }
                });
            });
        }
    }, {
        key: "getCode",
        value: function() {
            return this.login();
        }
    }, {
        key: "login",
        value: function() {
            return new Promise(function(e, t) {
                wx.login({
                    success: function(n) {
                        return n.code ? e(n.code) : t("微信用户登录失败！");
                    }
                });
            });
        }
    }, {
        key: "getLocation",
        value: function() {
            return new Promise(function(e, t) {
                wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        e(t);
                    },
                    fail: function(e) {
                        t("无法获取您的地理位置，请确保您的微信定位权限已开通");
                    }
                });
            });
        }
    }, {
        key: "uploadFile",
        value: function(e, t, n) {
            return new Promise(function(o, r) {
                wx.uploadFile({
                    url: e,
                    filePath: t,
                    name: "file",
                    formData: n,
                    success: function(e) {
                        o(e);
                    },
                    fail: function(e) {
                        r({
                            info: "文件上传失败"
                        });
                    }
                });
            });
        }
    } ]), u;
}();

exports.default = i;