function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../serivce/UserService")).default)();

Page({
    data: {
        page: 0,
        messageList: [],
        loadmore: 1,
        isEmpty: !1
    },
    onLoad: function(e) {
        this.getMessage();
    },
    onShow: function() {},
    toDetail: function(e) {
        var a = e.currentTarget.dataset.id, s = e.currentTarget.dataset.index;
        if (0 != a && "0" != a) {
            wx.navigateTo({
                url: "../share/index?id=" + a
            });
            var r = "messageList[" + s + "].has_read";
            this.setData(t({}, r, 1));
        }
    },
    toUserPage: function(e) {
        var t = e.currentTarget.dataset.user;
        console.log("userId=" + t), wx.navigateTo({
            url: "../userOther/user?id=" + t
        });
    },
    getMessage: function() {
        var e = this;
        a.getUserMsg(this.data.page).then(function(t) {
            t.length > 0 ? e.setData({
                messageList: t,
                loadmore: t.length > 15 ? 0 : -1,
                isEmpty: !1
            }) : e.setData({
                loadmore: -1,
                isEmpty: !0
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            e.setData({
                loadmore: 1,
                isEmpty: !0
            }), wx.stopPullDownRefresh();
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 0
        }), this.getMessage();
    },
    onReachBottom: function() {
        var t = this;
        if (-1 != this.data.loadmore && !this.data.isEmpty) {
            var s = this.data.page + 1;
            this.setData({
                page: s
            }), a.getUserMsg(s).then(function(a) {
                a.length > 0 ? t.setData({
                    messageList: [].concat(e(t.data.messageList), e(a)),
                    loadmore: 0
                }) : t.setData({
                    loadmore: -1
                });
            }).catch(function(e) {
                console.log(e), t.setData({
                    loadmore: -1
                });
            });
        }
    }
});