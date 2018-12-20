Page({
    data: {
        url: "",
        title: ""
    },
    onLoad: function(t) {
        this.setData({
            url: t.url,
            title: t.t
        }), wx.setNavigationBarTitle({
            title: t.t
        });
    },
    onShareAppMessage: function() {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "网页文章页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在培养好习惯，一起来吗？",
            path: "/pages/create/create?type=1",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});