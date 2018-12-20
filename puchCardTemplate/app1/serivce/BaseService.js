function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
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
}(), n = (require("../utils/router"), function() {
    function n() {
        e(this, n), this.app = getApp();
    }
    return t(n, [ {
        key: "handleRespond",
        value: function(e) {
            return 0 === e.status ? Promise.resolve(e.data) : Promise.reject(e);
        }
    }, {
        key: "handleError",
        value: function(e) {
            wx.showModal({
                title: "请求失败",
                content: e.errMsg || e.msg || "请求失败",
                showCancel: !1
            });
        }
    }, {
        key: "getUserInfo",
        value: function() {
            return this.app.getUserInfo();
        }
    }, {
        key: "getUserId",
        value: function() {
            return this.getUserInfo().id;
        }
    } ]), n;
}());

exports.default = n;