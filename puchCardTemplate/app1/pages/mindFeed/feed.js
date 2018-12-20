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

var i = t(require("../../serivce/HabitService")), n = t(require("../../serivce/PushService")), o = require("../../utils/router"), s = new i.default();

new n.default();

Page({
    data: {
        loadmore: 1,
        feedList: [],
        isEmpty: !1,
        lastId: 0,
        habitId: 0,
        habitData: "",
        isShare: 0,
        beCommentedId: "",
        atUserName: "",
        btnAnimation: "",
        optionShow: !0,
        ratioW: wx.getSystemInfoSync().windowWidth / 750
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            lastId: 0,
            loadmore: 0,
            habitId: t.id,
            isShare: t.share ? t.share : 0
        }), s.getHabit(this.data.habitId).then(function(t) {
            e.setData({
                habitData: t
            }), wx.setNavigationBarTitle({
                title: t.name
            });
        }).catch(function(t) {}), this.getOpenNoteByHabit();
    },
    onPageScroll: function(t) {
        if (t.scrollTop > 350 * this.data.ratioW && this.data.optionShow) {
            var e = wx.createAnimation({
                duration: 500
            });
            e.translateX(150 * this.data.ratioW).step(), this.setData({
                btnAnimation: e.export(),
                optionShow: !1
            });
        } else if (t.scrollTop < 350 * this.data.ratioW && !this.data.optionShow) {
            var a = wx.createAnimation({
                duration: 500
            });
            a.translateX(0).step(), this.setData({
                btnAnimation: a.export(),
                optionShow: !0
            });
        }
    },
    filterNoteOpen: function(t) {
        for (var e = getApp().globalData.habitList, a = 0; a < t.length; a++) !function(a) {
            t[a].isJoin = !1, e.some(function(e) {
                return e.id === t[a].habit_id;
            }) && (t[a].isJoin = !0);
        }(a);
        return t;
    },
    onPullDownRefresh: function() {
        this.setData({
            lastId: 0,
            loadmore: 0
        }), this.getOpenNoteByHabit();
    },
    onReachBottom: function() {
        var t = this;
        if (-1 != this.data.loadmore && !this.data.isEmpty) {
            var e = this.data.feedList.length > 0 ? this.data.feedList[this.data.feedList.length - 1].id : 0;
            this.setData({
                lastId: e,
                loadmore: 0
            }), s.getOpenNoteByHabit(this.data.habitId, this.data.lastId).then(function(e) {
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
    getOpenNoteByHabit: function() {
        var t = this;
        s.getOpenNoteByHabit(this.data.habitId, this.data.lastId).then(function(e) {
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
            var i, n = "feedList[" + a + "].isLike", o = this.data.feedList[a].prop_count, r = "feedList[" + a + "].prop_count";
            this.setData((i = {}, e(i, n, !1), e(i, r, parseInt(o) - 1), i)), s.cancelLikeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        } else {
            var d, c = "feedList[" + a + "].isLike", u = this.data.feedList[a].prop_count, h = "feedList[" + a + "].prop_count";
            this.setData((d = {}, e(d, c, !0), e(d, h, parseInt(u) + 1), d)), s.likeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
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
            var e = t.target.dataset.id, a = (t.target.dataset.day, t.target.dataset.path), i = t.target.dataset.name;
            if ((n = getApp()).aldstat.sendEvent("小学堂分享", {
                "习惯名": i,
                "点击位置": "按钮"
            }), "" != i && null != i) return {
                title: "「" + i + "」，一起来吗？",
                path: "/pages/mindFeed/feed?id=" + e + "&share=1",
                imageUrl: a,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var n = getApp();
        return n.aldstat.sendEvent("小学堂分享", {
            "习惯名": this.data.habitData.name,
            "点击位置": "顶部"
        }), {
            title: "「" + this.data.habitData.name + "」，一起来吗？",
            path: "/pages/mindFeed/feed?id=" + this.data.habitId + "&share=1",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    },
    toUserPage: function(t) {
        var e = t.currentTarget.dataset.user;
        console.log("userId=" + e), wx.navigateTo({
            url: "../userOther/user?id=" + e
        });
    },
    clickJoin: function(t) {
        var a = this;
        this.data.habitData.isJoin ? wx.showToast({
            title: "已经加入该习惯",
            icon: "none",
            duration: 2e3
        }) : s.joinHabit(this.data.habitId).then(function(t) {
            wx.showToast({
                title: "加入习惯成功",
                icon: "success",
                duration: 2e3
            });
            a.setData(e({}, "habitData.isJoin", !0));
        }).catch(function(t) {
            t && 13005 === t.status ? wx.showModal({
                title: "添加失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, o.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: t.info || "加入失败",
                icon: "fail",
                duration: 2e3
            });
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
        var a, i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, o = t.currentTarget.dataset.user, s = "feedList[" + n + "].isComment";
        this.setData((a = {}, e(a, s, !0), e(a, "beCommentedId", i), e(a, "atUserName", "回复" + o), 
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
        var a = this, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, o = "feedList[" + i + "].isComment";
        this.setData(e({}, o, !1));
        var r = t.detail.value;
        "" != r && 0 != r.length && s.commentNote(n, r, this.data.beCommentedId).then(function(t) {
            var n, o = "feedList[" + i + "].comment", r = a.data.feedList[i].comment, d = "feedList[" + i + "].comment_count", c = a.data.feedList[i].comment_count, u = s.getUserInfo();
            t.nickname = u.nickname, r.push(t), a.setData((n = {}, e(n, o, r), e(n, "beCommentedId", ""), 
            e(n, "atUserName", "评论一下~"), e(n, d, parseInt(c) + 1 + ""), n));
        }).catch(function(t) {});
    }
});