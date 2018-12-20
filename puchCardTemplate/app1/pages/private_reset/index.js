var e = require("../../utils/router"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../serivce/UserService"));

Page({
    data: {
        email: "",
        codeHasSend: !1,
        code: ""
    },
    onLoad: function() {
        var e = getApp().getUserInfo().email;
        this.setData({
            email: e
        });
    },
    handleFetchCode: function(e) {
        var n = this;
        new t.default().fetchVerifyCode().then(function() {
            n.setData({
                codeHasSend: !0
            });
        }).catch(function(e) {
            console.log(e), wx.showModal({
                content: e.info || "获取失败，请稍后尝试"
            });
        });
    },
    handleInputCode: function(e) {
        var t = e.detail.value;
        this.setData({
            code: t
        });
    },
    handleVerifyCode: function() {
        new t.default().verifyCode(this.data.code).then(function() {
            (0, e.navigate)({
                path: "pages/private_setting/index",
                params: {
                    reset: 1
                }
            });
        }).catch(function(e) {
            wx.showModal({
                content: e.info || "获取失败，请稍后尝试"
            });
        });
    }
});