function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/UserService")).default)();

Page({
    data: {
        targetUserId: "",
        fanOrFollow: 1,
        nickName: "",
        userList: [],
        currentPage: 0,
        loadmore: 0,
        isEmpty: !1
    },
    onLoad: function(t) {
        this.setData({
            targetUserId: t.uid,
            fanOrFollow: t.ut,
            nickName: t.name
        }), wx.setNavigationBarTitle({
            title: this.data.nickName + "的" + (1 == parseInt(this.data.fanOrFollow) ? "关注" : "粉丝")
        });
    },
    onShow: function() {
        this.setData({
            currentPage: 0,
            loadmore: 0
        }), 1 == parseInt(this.data.fanOrFollow) ? this.getAttentionList() : this.getFollowerList();
    },
    getFollowerList: function() {
        var t = this;
        a.getFollowerList(this.data.targetUserId, this.data.currentPage).then(function(a) {
            a.length > 0 ? t.setData({
                userList: a,
                loadmore: a.length > 8 ? 0 : -1,
                isEmpty: !1
            }) : t.setData({
                loadmore: -1,
                isEmpty: !0
            });
        }).catch(function(a) {
            t.setData({
                loadmore: 1,
                isEmpty: !0
            });
        });
    },
    getAttentionList: function() {
        var t = this;
        a.getAttentionList(this.data.targetUserId, this.data.currentPage).then(function(a) {
            a.length > 0 ? t.setData({
                userList: a,
                loadmore: a.length > 5 ? 0 : -1,
                isEmpty: !1
            }) : t.setData({
                loadmore: -1,
                isEmpty: !0
            });
        }).catch(function(a) {
            t.setData({
                loadmore: 1,
                isEmpty: !0
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            currentPage: 0,
            loadmore: 0
        }), 1 == parseInt(this.data.fanOrFollow) ? this.getAttentionList() : this.getFollowerList();
    },
    onReachBottom: function() {
        var e = this;
        -1 == this.data.loadmore || this.data.isEmpty || (this.setData({
            currentPage: this.data.currentPage + 1,
            loadmore: 0
        }), 1 == parseInt(this.data.fanOrFollow) ? a.getAttentionList(this.data.targetUserId, this.data.currentPage).then(function(a) {
            a.length > 0 ? e.setData({
                userList: [].concat(t(e.data.userList), t(a)),
                loadmore: 0
            }) : e.setData({
                loadmore: -1
            });
        }).catch(function(t) {
            e.setData({
                loadmore: -1
            });
        }) : a.getFollowerList(this.data.targetUserId, this.data.currentPage).then(function(a) {
            a.length > 0 ? e.setData({
                userList: [].concat(t(e.data.userList), t(a)),
                loadmore: 0
            }) : e.setData({
                loadmore: -1
            });
        }).catch(function(t) {
            e.setData({
                loadmore: -1
            });
        }));
    },
    toUserPage: function(t) {
        var a = t.currentTarget.dataset.user;
        wx.navigateTo({
            url: "../userOther/user?id=" + a
        });
    },
    onShareAppMessage: function() {}
});