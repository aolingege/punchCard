var t = require("../../utils/router");

Page({
    data: {
        hasSetPrivate: !1
    },
    onLoad: function(t) {
        this.setData({
            hasSetPrivate: 1 & t.hasSetPrivate
        });
    },
    switchPrivate: function(e) {
        var a = this;
        e.detail.value ? (0, t.navigate)({
            path: "pages/private_setting/index"
        }) : wx.showModal({
            title: "提示",
            content: "确定取消隐私密码？",
            success: function(e) {
                e.confirm ? (0, t.redirect)({
                    path: "pages/cancel_private/index"
                }) : a.setData({
                    hasSetPrivate: !0
                });
            }
        });
    }
});