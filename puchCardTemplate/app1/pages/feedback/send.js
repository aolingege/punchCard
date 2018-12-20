var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/UserService"));

Page({
    data: {
        userInfo: {},
        content: "",
        email: "",
        intputLength: 0
    },
    contentInput: function(t) {
        var n = t.detail.value + "";
        console.log(n.length), this.setData({
            content: n,
            intputLength: n.length
        });
    },
    emailInput: function(t) {
        var n = t.detail.value + "";
        this.setData({
            email: n
        });
    },
    onSendFeed: function() {
        this.data.content.length <= 0 ? wx.showToast({
            title: "请填写反馈内容",
            icon: "warn",
            duration: 2e3
        }) : new t.default().sendFeedback(this.data.content, this.data.email).then(function(t) {
            wx.showToast({
                title: "发送成功",
                icon: "success",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack();
            }, 1500);
        }).catch(function(t) {
            wx.showToast({
                title: "发送失败,请重试",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    officialError: function(t) {
        console.log(t);
    },
    officialOk: function(t) {
        console.log(t);
    },
    onShareAppMessage: function() {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "发送心情页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    previewImage: function(t) {
        wx.previewImage({
            current: "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/mengyaqun02.jpg",
            urls: [ "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/mengyaqun02.jpg" ]
        });
    }
});