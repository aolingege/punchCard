function e(e) {
    var t = {};
    return Object.keys(e).forEach(function(n) {
        null !== e[n] && void 0 !== e && (t[n] = e[n]);
    }), t.vc = i, t;
}

function t(e) {
    var t = getApp();
    return e.hasOwnProperty("noNeedPsw") && e.noNeedPsw || !t.appNeedUnlock();
}

function n(e) {
    return !t(e);
}

function o(t, o) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return n(a) ? ((0, r.navigate)({
        path: "pages/unlock/index"
    }), Promise.reject({
        info: "",
        status: 99
    })) : (s.beforeRequest(a), i = e(i), new Promise(function(e, n) {
        wx.request({
            url: (a.url || u) + o,
            data: i,
            method: t,
            header: {
                "content-type": "POST" === t ? "application/x-www-form-urlencoded" : "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                n({
                    info: "网络请求失败"
                });
            },
            complete: function() {
                s.afterRequest(a);
            }
        });
    }));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.request = o, exports.get = function(e) {
    return o("GET", e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
}, exports.post = function(e) {
    return o("POST", e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
}, exports.put = function(e) {
    return o("PUT", e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
};

var r = require("../utils/router"), i = 173, u = "https://www.xiaeke.com/benmao/index.php/Home", s = {
    beforeRequest: function(e) {
        e.hasOwnProperty("loadingMsg") && wx.showLoading({
            title: "" + e.loadingMsg
        });
    },
    afterRequest: function(e) {
        e.hasOwnProperty("loadingMsg") && wx.hideLoading();
    }
};