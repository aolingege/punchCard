function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function a(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var i = t(require("../../serivce/HabitService")), n = t(require("../../serivce/PushService")), s = new i.default();

new n.default();

Page({
    data: {
        currentTab: 0,
        loadmore: 1,
        feedList: [],
        isEmpty: !1,
        page: 0,
        lastId: 0,
        beCommentedId: "",
        atUserName: ""
    },
    onLoad: function(t) {
        this.setData({
            lastId: 0,
            loadmore: 1
        }), this.getHabitNoteOpen();
    },
    swichNav: function(t) {
        if (this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            feedList: [],
            currentTab: t.target.dataset.current,
            lastId: 0,
            loadmore: 1,
            isEmpty: !1
        }), this.getHabitNoteOpen();
    },
    filterNoteOpen: function(t) {
        for (var e = getApp().globalData.habitList, a = 0; a < t.length; a++) !function(a) {
            t[a].isJoin = !1, t[a].isComment = !1, e.some(function(e) {
                return e.id === t[a].habit_id;
            }) && (t[a].isJoin = !0);
        }(a);
        return t;
    },
    onPullDownRefresh: function() {
        this.setData({
            lastId: 0,
            loadmore: 1
        }), this.getHabitNoteOpen();
    },
    onReachBottom: function() {
        var t = this;
        if (-1 != this.data.loadmore && !this.data.isEmpty) {
            var e = this.data.feedList.length > 0 ? this.data.feedList[this.data.feedList.length - 1].id : 0;
            0 == this.data.currentTab && (e = this.data.feedList.length > 0 ? this.data.feedList[this.data.feedList.length - 1].hot_id : 0), 
            this.setData({
                lastId: e,
                loadmore: 1
            }), s.getMindNoteList(this.data.lastId, this.data.currentTab).then(function(e) {
                return t.filterNoteOpen(e);
            }).then(function(e) {
                e.length > 0 ? t.setData({
                    feedList: [].concat(a(t.data.feedList), a(e)),
                    loadmore: 0
                }) : t.setData({
                    loadmore: -1
                });
            }).catch(function(e) {
                t.setData({
                    loadmore: -1
                });
            });
        }
    },
    getHabitNoteOpen: function() {
        var t = this;
        s.getMindNoteList(this.data.lastId, this.data.currentTab).then(function(e) {
            return t.filterNoteOpen(e);
        }).then(function(e) {
            e.length > 0 ? t.setData({
                feedList: e,
                loadmore: 0,
                isEmpty: !1
            }) : t.setData({
                loadmore: -1,
                isEmpty: !0
            }), wx.stopPullDownRefresh();
        }).catch(function(e) {
            t.setData({
                loadmore: 1,
                isEmpty: !0
            }), wx.stopPullDownRefresh();
        });
    },
    likeHabitNote: function(t) {
        var a = t.currentTarget.dataset.id;
        if (this.data.feedList[a].isLike) {
            var i, n = "feedList[" + a + "].isLike", r = this.data.feedList[a].prop_count, o = "feedList[" + a + "].prop_count";
            this.setData((i = {}, e(i, n, !1), e(i, o, parseInt(r) - 1), i)), s.cancelLikeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        } else {
            var d, c = "feedList[" + a + "].isLike", u = this.data.feedList[a].prop_count, f = "feedList[" + a + "].prop_count";
            this.setData((d = {}, e(d, c, !0), e(d, f, parseInt(u) + 1), d)), s.likeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        }
    },
    handleViewImage: function(t) {
        var e = t.target.dataset.src, a = getApp();
        a.preventLock(), wx.previewImage({
            urls: [ e ],
            complete: function(t) {
                a.allowLock();
            }
        });
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            var e = t.target.dataset.id, a = t.target.dataset.day, i = t.target.dataset.path, n = t.target.dataset.name;
            return (s = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "学堂页面",
                "按钮": "页面按钮"
            }), "" == n || null == n ? {
                title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
                path: "/pages/feed/feed?page=1",
                success: function(t) {},
                fail: function(t) {}
            } : {
                title: "培养「" + n + "」习惯，萌友已经坚持" + a + "天。",
                path: "/pages/share/index?id=" + e + "&page=1",
                imageUrl: i,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var s = getApp();
        return s.aldstat.sendEvent("用户分享", {
            "位置": "学堂页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/feed/feed?page=1",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    toUserPage: function(t) {
        var e = t.currentTarget.dataset.user;
        wx.navigateTo({
            url: "../userOther/user?id=" + e
        });
    },
    clickComment: function(t) {
        var a, i = t.currentTarget.dataset.index, n = (t.detail.payload, "feedList[" + i + "].isComment");
        this.setData((a = {}, e(a, n, !0), e(a, "atUserName", "评论一下~"), e(a, "beCommentedId", ""), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    clickReply: function(t) {
        var a, i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.user, r = "feedList[" + n + "].isComment";
        this.setData((a = {}, e(a, r, !0), e(a, "beCommentedId", i), e(a, "atUserName", "回复" + s), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    hideComment: function(t) {
        var a = t.currentTarget.dataset.index, i = (t.currentTarget.dataset.id, "feedList[" + a + "].isComment");
        this.setData(e({}, i, !1));
    },
    sendComment: function(t) {
        var a = this, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, r = "feedList[" + i + "].isComment";
        this.setData(e({}, r, !1));
        var o = t.detail.value;
        "" != o && 0 != o.length && s.commentNote(n, o, this.data.beCommentedId).then(function(t) {
            var n, r = "feedList[" + i + "].comment", o = a.data.feedList[i].comment, d = "feedList[" + i + "].comment_count", c = a.data.feedList[i].comment_count, u = s.getUserInfo();
            t.nickname = u.nickname, o.push(t), a.setData((n = {}, e(n, r, o), e(n, "beCommentedId", ""), 
            e(n, "atUserName", "评论一下~"), e(n, d, parseInt(c) + 1 + ""), n));
        }).catch(function(t) {});
    }
});