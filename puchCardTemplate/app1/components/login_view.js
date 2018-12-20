function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

require("../utils/throttle");

var n = e(require("../serivce/WxService")), t = e(require("../serivce/LoginService")), o = getApp();

Component({
    properties: {
        payload: {
            type: null,
            value: null
        }
    },
    data: {
        isLogin: !0
    },
    ready: function() {
        this.setData({
            isLogin: o.getLoginStatus()
        });
    },
    methods: {
        handleUserInfo: function(e) {
            var i = this, a = new n.default(), r = new t.default(), s = r.getUserInfo();
            if (s && s.openid) this.triggerEvent("onLoginSuccess", {
                userInfo: s,
                payload: this.data.payload
            }); else if ("getUserInfo:ok" != e.detail.errMsg) wx.showModal({
                title: "授权失败",
                content: "请重新操作",
                showCancel: !1,
                onConfirm: function() {
                    i.triggerEvent("onLoginFail", {});
                }
            }); else {
                var l = e.detail.userInfo;
                wx.showLoading({
                    title: "登陆中"
                }), a.getCode().then(function(e) {
                    return r.getOpenId(e);
                }).then(function(e) {
                    var n = e.openid;
                    return r.loginWithWeChat(n, l.nickName, l.gender, l.avatarUrl, l.province, l.city, l.country);
                }).then(function(e) {
                    console.log(e), wx.hideLoading(), o.updateUserInfo(e), i.triggerEvent("onLoginSuccess", {
                        userInfo: e,
                        payload: i.data.payload
                    });
                }).catch(function(e) {
                    console.log(e), wx.hideLoading(), i.triggerEvent("onLoginFail", {
                        err: e
                    });
                });
            }
        },
        handleTap: function() {
            var e = new t.default().getUserInfo();
            this.triggerEvent("onLoginSuccess", {
                userInfo: e,
                payload: this.data.payload
            });
        }
    }
});