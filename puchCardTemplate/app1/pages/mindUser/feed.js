function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")), i = (require("../../utils/router"), new a.default());

Page({
    data: {
        habitId: 0,
        userId: 0,
        days: 0,
        habitData: "",
        loadmore: 0,
        feedList: [],
        dayList: [],
        currentNum: 0,
        isEmpty: !1,
        showType: 2,
        beCommentedId: "",
        atUserName: ""
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            currentNum: 0,
            loadmore: 0,
            habitId: t.id,
            days: t.day,
            userId: t.user
        }), i.getHabit(this.data.habitId).then(function(t) {
            e.setData({
                habitData: t
            }), wx.setNavigationBarTitle({
                title: t.name
            });
        }).catch(function(t) {}), this.getHabitNoteList();
    },
    toDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        0 != e && "0" != e && wx.navigateTo({
            url: "../share/index?id=" + e
        });
    },
    toUserPage: function(t) {
        var e = t.currentTarget.dataset.user;
        console.log("userId=" + e), wx.navigateTo({
            url: "../userOther/user?id=" + e
        });
    },
    copyNote: function(t) {
        var e = t.currentTarget.dataset.text;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功！",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        -1 == this.data.loadmore || this.data.isEmpty || (this.setData({
            currentNum: this.data.currentNum + 1,
            loadmore: 0
        }), i.getUserHabitNoteList(this.data.userId, this.data.habitId, this.data.currentNum).then(function(a) {
            if (a.length > 0) {
                var i = a.map(function(t) {
                    var e = t.add_time, a = new Date(t.add_time), i = "日一二三四五六".charAt(a.getDay());
                    return {
                        note: t.note,
                        days: t.days,
                        haibt_id: t.habit_id,
                        id: t.id,
                        pic_url: t.pic_url,
                        week: "周" + i,
                        month: e.split(" ")[0].split("-")[0],
                        day: e.split(" ")[0].split("-")[1],
                        time: e.split(" ")[1]
                    };
                });
                t.setData({
                    feedList: [].concat(e(t.data.feedList), e(a)),
                    dayList: [].concat(e(t.data.dayList), e(i)),
                    loadmore: 1
                });
            } else t.setData({
                loadmore: -1
            });
        }).catch(function(e) {
            t.setData({
                loadmore: -1
            });
        }));
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.setData({
            currentNum: 0,
            loadmore: 0
        }), this.getHabitNoteList();
    },
    getHabitNoteList: function() {
        var t = this;
        i.getUserHabitNoteList(this.data.userId, this.data.habitId, this.data.currentNum).then(function(e) {
            if (e.length > 0) {
                var a = e.map(function(t) {
                    var e = t.add_time, a = new Date(t.add_time), i = "日一二三四五六".charAt(a.getDay());
                    return {
                        note: t.note,
                        days: t.days,
                        haibt_id: t.habit_id,
                        id: t.id,
                        pic_url: t.pic_url,
                        week: "周" + i,
                        month: e.split(" ")[0].split("-")[0],
                        day: e.split(" ")[0].split("-")[1],
                        time: e.split(" ")[1]
                    };
                });
                t.setData({
                    feedList: e,
                    dayList: a,
                    loadmore: e.length > 8 ? 0 : -1,
                    isEmpty: !1
                });
            } else t.setData({
                loadmore: -1,
                isEmpty: !0
            });
        }).catch(function(e) {
            t.setData({
                loadmore: 1,
                isEmpty: !0
            });
        });
    },
    changeType: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            showType: e
        });
    },
    likeHabitNote: function(e) {
        var a = e.currentTarget.dataset.id;
        if (this.data.feedList[a].isLike) {
            var n, s = "feedList[" + a + "].isLike", r = this.data.feedList[a].prop_count, o = "feedList[" + a + "].prop_count";
            this.setData((n = {}, t(n, s, !1), t(n, o, parseInt(r) - 1), n)), i.cancelLikeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        } else {
            var d, c = "feedList[" + a + "].isLike", u = this.data.feedList[a].prop_count, l = "feedList[" + a + "].prop_count";
            this.setData((d = {}, t(d, c, !0), t(d, l, parseInt(u) + 1), d)), i.likeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
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
    clickComment: function(e) {
        var a, i = e.currentTarget.dataset.index, n = (e.detail.payload, "feedList[" + i + "].isComment");
        this.setData((a = {}, t(a, n, !0), t(a, "atUserName", "评论一下~"), t(a, "beCommentedId", ""), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    clickReply: function(e) {
        var a, i = e.currentTarget.dataset.id, n = e.currentTarget.dataset.index, s = e.currentTarget.dataset.user, r = "feedList[" + n + "].isComment";
        this.setData((a = {}, t(a, r, !0), t(a, "beCommentedId", i), t(a, "atUserName", "回复" + s), 
        a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    hideComment: function(e) {
        var a = e.currentTarget.dataset.index, i = (e.currentTarget.dataset.id, "feedList[" + a + "].isComment");
        this.setData(t({}, i, !1));
    },
    sendComment: function(e) {
        var a = this, n = e.currentTarget.dataset.index, s = e.currentTarget.dataset.id, r = "feedList[" + n + "].isComment";
        this.setData(t({}, r, !1));
        var o = e.detail.value;
        "" != o && 0 != o.length && i.commentNote(s, o, this.data.beCommentedId).then(function(e) {
            var s, r = "feedList[" + n + "].comment", o = a.data.feedList[n].comment, d = "feedList[" + n + "].comment_count", c = a.data.feedList[n].comment_count, u = i.getUserInfo();
            e.nickname = u.nickname, o.push(e), a.setData((s = {}, t(s, r, o), t(s, "beCommentedId", ""), 
            t(s, "atUserName", "评论一下~"), t(s, d, parseInt(c) + 1 + ""), s));
        }).catch(function(t) {});
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            var e = t.target.dataset.id, a = t.target.dataset.day, i = t.target.dataset.path, n = t.target.dataset.name;
            return (s = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "个人习惯心情列表",
                "按钮": "心情分享按钮"
            }), {
                title: "培养「" + n + "」习惯，我已经坚持" + a + "天。",
                path: "/pages/share/index?id=" + e + "&page=1",
                imageUrl: i,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var s = getApp();
        return s.aldstat.sendEvent("用户分享", {
            "位置": "个人习惯心情列表",
            "按钮": "顶部按钮"
        }), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/create/create",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});