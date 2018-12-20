function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        feedList: [],
        isEmpty: !1,
        page: 0,
        id: -1,
        beCommentedId: "",
        atUserName: ""
    },
    onLoad: function(e) {
        this.setData({
            page: e.page,
            id: e.id
        }), wx.showLoading(), this.getHabitNoteShare();
    },
    getHabitNoteShare: function() {
        var e = this;
        t.getHabitNoteShare(this.data.id).then(function(t) {
            t.length > 0 ? e.setData({
                feedList: t
            }) : e.setData({
                isEmpty: !0
            }), wx.hideLoading();
        }).catch(function(t) {
            e.setData({
                isEmpty: !0
            }), wx.hideLoading();
        });
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "",
            path: "/pages/share/index?id=" + this.data.id + " & page=1",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    },
    toUserPage: function(e) {
        var t = e.currentTarget.dataset.user;
        console.log("userId=" + t), wx.navigateTo({
            url: "../userOther/user?id=" + t
        });
    },
    copyNote: function(e) {
        var t = e.currentTarget.dataset.text;
        wx.setClipboardData({
            data: t,
            success: function(e) {
                wx.showToast({
                    title: "复制成功！",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    likeHabitNote: function(a) {
        var i = a.currentTarget.dataset.id;
        if (this.data.feedList[i].isLike) {
            var n, s = "feedList[" + i + "].isLike", o = this.data.feedList[i].prop_count, r = "feedList[" + i + "].prop_count";
            this.setData((n = {}, e(n, s, !1), e(n, r, parseInt(o) - 1), n)), t.cancelLikeNote(this.data.feedList[i].id).then(function(e) {}).catch(function(e) {});
        } else {
            var c, d = "feedList[" + i + "].isLike", u = this.data.feedList[i].prop_count, f = "feedList[" + i + "].prop_count";
            this.setData((c = {}, e(c, d, !0), e(c, f, parseInt(u) + 1), c)), t.likeNote(this.data.feedList[i].id).then(function(e) {}).catch(function(e) {});
        }
    },
    handleViewImage: function(e) {
        var t = e.target.dataset.src, a = getApp();
        a.preventLock(), wx.previewImage({
            urls: [ t ],
            complete: function(e) {
                a.allowLock();
            }
        });
    },
    clickComment: function(t) {
        var a, i = t.currentTarget.dataset.index, n = (t.detail.payload, "feedList[" + i + "].isComment");
        this.setData((a = {}, e(a, n, !0), e(a, "atUserName", "评论一下~"), e(a, "beCommentedId", ""), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(e) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: e.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    clickReply: function(t) {
        var a, i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.user, o = "feedList[" + n + "].isComment";
        this.setData((a = {}, e(a, o, !0), e(a, "beCommentedId", i), e(a, "atUserName", "回复" + s), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(e) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: e.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    hideComment: function(t) {
        var a = t.currentTarget.dataset.index, i = (t.currentTarget.dataset.id, "feedList[" + a + "].isComment");
        this.setData(e({}, i, !1));
    },
    sendComment: function(a) {
        var i = this, n = a.currentTarget.dataset.index, s = a.currentTarget.dataset.id, o = "feedList[" + n + "].isComment";
        this.setData(e({}, o, !1));
        var r = a.detail.value;
        "" != r && 0 != r.length && t.commentNote(s, r, this.data.beCommentedId).then(function(a) {
            var s, o = "feedList[" + n + "].comment", r = i.data.feedList[n].comment, c = "feedList[" + n + "].comment_count", d = i.data.feedList[n].comment_count, u = t.getUserInfo();
            a.nickname = u.nickname, r.push(a), i.setData((s = {}, e(s, o, r), e(s, "beCommentedId", ""), 
            e(s, "atUserName", "评论一下~"), e(s, c, parseInt(d) + 1 + ""), s));
        }).catch(function(e) {});
    }
});