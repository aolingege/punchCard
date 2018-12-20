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

var i, n = t(require("../../serivce/HabitService")), s = t(require("../../serivce/UserService")), o = new n.default(), r = new s.default();

Page((i = {
    data: {
        id: 0,
        userInfo: "",
        lastId: 0,
        habitList: [],
        loadmore: 0,
        feedList: [],
        isEmpty: !1,
        firstLoadEnd: !1,
        beCommentedId: "",
        atUserName: "",
        isShare: 0,
        btnAnimation: "",
        optionShow: !0,
        ratioW: wx.getSystemInfoSync().windowWidth / 750,
        gender: "她"
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        this.setData({
            id: a,
            isShare: t.share ? t.share : 0
        }), o.getUserHabits(a).then(function(t) {
            e.setData({
                habitList: t
            });
        });
    },
    onShow: function() {
        var t = this;
        r.getOtherUserInfo(this.data.id).then(function(e) {
            t.setData({
                userInfo: e,
                gender: r.getUserId() == e.id ? "我" : 1 == e.gender ? "他" : "她"
            }), wx.setNavigationBarTitle({
                title: e.nickname + "的个人主页"
            });
        }).catch(function(t) {
            console.log(t);
        }), this.getOpenNoteByUser();
    },
    onPageScroll: function(t) {
        if (t.scrollTop > 150 * this.data.ratioW && this.data.optionShow) {
            var e = wx.createAnimation({
                duration: 500
            });
            e.translateX(150 * this.data.ratioW).step(), this.setData({
                btnAnimation: e.export(),
                optionShow: !1
            });
        } else if (t.scrollTop < 150 * this.data.ratioW && !this.data.optionShow) {
            var a = wx.createAnimation({
                duration: 500
            });
            a.translateX(0).step(), this.setData({
                btnAnimation: a.export(),
                optionShow: !0
            });
        }
    },
    onPullDownRefresh: function() {
        this.setData({
            lastId: 0,
            loadmore: 0
        }), this.getOpenNoteByUser();
    },
    onReachBottom: function() {
        var t = this;
        if (-1 != this.data.loadmore && !this.data.isEmpty) {
            var e = this.data.feedList.length > 0 ? this.data.feedList[this.data.feedList.length - 1].id : 0;
            this.setData({
                lastId: e,
                loadmore: 0
            }), o.getOpenNoteByUser(this.data.id, this.data.lastId).then(function(e) {
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
    clickAttention: function() {
        var t = this;
        r.getUserId() && void 0 != r.getUserId() ? r.followUser(this.data.id).then(function(a) {
            var i;
            wx.showToast({
                title: "关注成功",
                icon: "none",
                duration: 2e3
            });
            t.setData((i = {}, e(i, "userInfo.relation", 1), e(i, "userInfo.followers", parseInt(t.data.userInfo.followers) + 1), 
            i));
        }).catch(function(t) {
            wx.showToast({
                title: t.info || "关注失败",
                icon: "fail",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请登录再操作",
            icon: "none",
            duration: 2e3
        });
    },
    cancelAttention: function() {
        var t = this;
        r.cancelFollow(this.data.id).then(function(a) {
            var i;
            wx.showToast({
                title: "取消关注成功",
                icon: "none",
                duration: 2e3
            });
            t.setData((i = {}, e(i, "userInfo.relation", 0), e(i, "userInfo.followers", parseInt(t.data.userInfo.followers) - 1), 
            i));
        }).catch(function(t) {
            wx.showToast({
                title: t.info || "取消关注失败",
                icon: "fail",
                duration: 2e3
            });
        });
    },
    clickRelation: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "../fansFollow/index?uid=" + this.data.id + "&ut=" + e + "&name=" + this.data.userInfo.nickname
        });
    },
    getOpenNoteByUser: function() {
        var t = this;
        o.getOpenNoteByUser(this.data.id, this.data.lastId).then(function(e) {
            e.length > 0 ? t.setData({
                feedList: e,
                loadmore: 0,
                isEmpty: !1,
                firstLoadEnd: !0
            }) : t.setData({
                loadmore: -1,
                isEmpty: !0,
                firstLoadEnd: !0
            }), wx.stopPullDownRefresh();
        }).catch(function(e) {
            t.setData({
                loadmore: 1,
                isEmpty: !0,
                firstLoadEnd: !0
            }), wx.stopPullDownRefresh();
        });
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
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            if (1 == t.target.dataset.invite) return {
                title: this.data.userInfo.nickname + "在坚持" + this.data.habitList.length + "个习惯,快来关注！",
                path: "/pages/userOther/user?id=" + this.data.id + "&share=1",
                success: function(t) {},
                fail: function(t) {}
            };
            var e = t.target.dataset.id, a = (t.target.dataset.day, t.target.dataset.path), i = t.target.dataset.name;
            return (n = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "个人主页心情列表",
                "按钮": "心情分享按钮"
            }), {
                title: "培养「" + i + "」习惯，一起来吗？",
                path: "/pages/share/index?id=" + e + "&page=1",
                imageUrl: a,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var n = getApp();
        return n.aldstat.sendEvent("用户分享", {
            "位置": "个人主页心情列表",
            "按钮": "顶部按钮"
        }), {
            title: this.data.userInfo.nickname + "在坚持" + this.data.habitList.length + "个习惯,快来关注！",
            path: "/pages/userOther/user?id=" + this.data.id + "&share=1",
            success: function(t) {},
            fail: function(t) {}
        };
    }
}, e(i, "backHome", function() {
    wx.switchTab({
        url: "../create/create"
    });
}), e(i, "clickHabit", function(t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.days;
    wx.navigateTo({
        url: "../mindUser/feed?id=" + e + "&day=" + a + "&user=" + this.data.id
    }), getApp().aldstat.sendEvent("点击用户主页习惯", {
        "页面": "用户主页"
    });
}), e(i, "likeHabitNote", function(t) {
    var a = t.currentTarget.dataset.id;
    if (this.data.feedList[a].isLike) {
        var i, n = "feedList[" + a + "].isLike", s = this.data.feedList[a].prop_count, r = "feedList[" + a + "].prop_count";
        this.setData((i = {}, e(i, n, !1), e(i, r, parseInt(s) - 1), i)), o.cancelLikeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
    } else {
        var d, c = "feedList[" + a + "].isLike", u = this.data.feedList[a].prop_count, l = "feedList[" + a + "].prop_count";
        this.setData((d = {}, e(d, c, !0), e(d, l, parseInt(u) + 1), d)), o.likeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
    }
}), e(i, "clickComment", function(t) {
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
}), e(i, "clickReply", function(t) {
    var a, i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.user, o = "feedList[" + n + "].isComment";
    this.setData((a = {}, e(a, o, !0), e(a, "beCommentedId", i), e(a, "atUserName", "回复" + s), 
    a)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
        setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: t.scrollTop + 60,
                duration: 300
            });
        }, 400);
    }).exec();
}), e(i, "hideComment", function(t) {
    var a = t.currentTarget.dataset.index, i = (t.currentTarget.dataset.id, "feedList[" + a + "].isComment");
    this.setData(e({}, i, !1));
}), e(i, "sendComment", function(t) {
    var a = this, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, s = "feedList[" + i + "].isComment";
    this.setData(e({}, s, !1));
    var r = t.detail.value;
    "" != r && 0 != r.length && o.commentNote(n, r, this.data.beCommentedId).then(function(t) {
        var n, s = "feedList[" + i + "].comment", r = a.data.feedList[i].comment, d = "feedList[" + i + "].comment_count", c = a.data.feedList[i].comment_count, u = o.getUserInfo();
        t.nickname = u.nickname, r.push(t), a.setData((n = {}, e(n, s, r), e(n, "beCommentedId", ""), 
        e(n, "atUserName", "评论一下~"), e(n, d, parseInt(c) + 1 + ""), n));
    }).catch(function(t) {});
}), i));