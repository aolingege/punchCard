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

var i = t(require("../../serivce/HabitService")), n = t(require("../../serivce/PushService")), s = require("../../utils/router"), o = t(require("../../serivce/UserService")), r = new i.default(), c = new n.default(), d = require("../../utils/util");

Page({
    data: {
        id: 0,
        name: "",
        userInfo: null,
        isCheck: !1,
        checkId: 0,
        isPrivate: !0,
        isRecord: !1,
        isEmpty: !1,
        today: d.formatToday(new Date()),
        startNum: 0,
        checkNum: 0,
        continueCount: 0,
        weekChecks: [ !1, !1, !1, !1, !1, !1, !1 ],
        dateInfo: [ {
            day: "一",
            isCheck: !1
        }, {
            day: "二",
            isCheck: !1
        }, {
            day: "三",
            isCheck: !1
        }, {
            day: "四",
            isCheck: !1
        }, {
            day: "五",
            isCheck: !1
        }, {
            day: "六",
            isCheck: !1
        }, {
            day: "日",
            isCheck: !1
        } ],
        loadmore: 0,
        showType: 2,
        feedList: [],
        dayList: [],
        currentNum: 0,
        isRepair: -1,
        canShare: !1,
        canNote: !1,
        isGetCard: !1,
        toRecord: !1,
        repairText: "去补卡",
        beCommentedId: "",
        atUserName: "",
        btnAnimation: "",
        optionShow: !0,
        ratioW: wx.getSystemInfoSync().windowWidth / 750
    },
    onShow: function() {
        this.data.toRecord && (this.setData({
            currentNum: 0,
            loadmore: 0,
            toRecord: !1
        }), this.getTodayByUser(), this.getHabitNoteList());
    },
    onLoad: function(t) {
        this.setData({
            id: t.id,
            name: t.name
        }), wx.setNavigationBarTitle({
            title: t.name
        }), this.getTodayByUser(), this.getHabitNoteList();
    },
    onPageScroll: function(t) {
        if (t.scrollTop > 150 * this.data.ratioW && this.data.optionShow) {
            var e = wx.createAnimation({
                duration: 500
            });
            e.translateY(150 * this.data.ratioW).step(), this.setData({
                btnAnimation: e.export(),
                optionShow: !1
            });
        } else if (t.scrollTop < 150 * this.data.ratioW && !this.data.optionShow) {
            var a = wx.createAnimation({
                duration: 500
            });
            a.translateY(0).step(), this.setData({
                btnAnimation: a.export(),
                optionShow: !0
            });
        }
    },
    startCheck: function() {
        var t = this;
        this.data.isCheck ? wx.showModal({
            title: "取消打卡",
            content: "取消打卡后，该习惯今天的记录会被清空，您确定删除？",
            success: function(e) {
                e.confirm ? t.cancelCheck() : e.cancel && console.log("用户点击取消");
            },
            confirmColor: "#ea2000",
            confirmText: "确定取消"
        }) : this.addCheck();
    },
    addCheck: function() {
        var t = this;
        r.checkHabit(this.data.id).then(function(e) {
            wx.showToast({
                title: "打卡成功，能量+1g",
                icon: "none",
                duration: 2e3
            }), t.setData({
                isCheck: !0,
                checkId: e
            }), t.getTodayByUser(), t.data.canNote && setTimeout(function() {
                (0, s.navigate)({
                    path: "pages/send/send",
                    params: {
                        habitId: t.data.id,
                        c: t.data.checkId,
                        p: t.data.isPrivate,
                        r: !1
                    }
                }), t.setData({
                    toRecord: !0
                });
            }, 1e3);
        }).catch(function(t) {
            t && t.info ? wx.showModal({
                title: "打卡提示",
                content: t.info || "打卡失败"
            }) : wx.showToast({
                title: "打卡失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    cancelCheck: function() {
        var t = this;
        r.cancelHabit(this.data.id).then(function(e) {
            wx.showToast({
                title: "取消打卡成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                isCheck: !1,
                currentNum: 0,
                loadmore: 0,
                feedList: []
            }), t.getTodayByUser(), t.getHabitNoteList();
        }).catch(function(t) {
            t && t.info ? wx.showModal({
                title: "取消打卡提示",
                content: t.info || "取消打卡失败"
            }) : wx.showToast({
                title: "取消打卡失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    startRecord: function() {
        this.data.isRecord ? wx.navigateTo({
            url: "../makeCard/index?id=" + this.data.checkId + "&day=" + this.data.checkNum + "&name=" + this.data.name
        }) : (0, s.navigate)({
            path: "pages/send/send",
            params: {
                habitId: this.data.id,
                c: this.data.checkId,
                p: this.data.isPrivate,
                r: !1
            }
        }), this.setData({
            toRecord: !0
        });
    },
    toUserPage: function(t) {
        var e = t.currentTarget.dataset.user;
        console.log("userId=" + e), wx.navigateTo({
            url: "../userOther/user?id=" + e
        });
    },
    clickHabit: function(t) {
        getApp().aldstat.sendEvent("点击小学堂", {
            "页面": "个人打卡页"
        }), wx.navigateTo({
            url: "../mindFeed/feed?id=" + this.data.id
        });
    },
    toCalendar: function(t) {
        (0, s.navigate)({
            path: "pages/calendar/calendar",
            params: {
                id: this.data.id,
                cname: this.data.name
            }
        }), getApp().aldstat.sendEvent("查看日历", {
            "页面": "个人打卡页"
        });
    },
    toGetCard: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.day;
        wx.navigateTo({
            url: "../makeCard/index?id=" + e + "&day=" + a + "&name=" + this.data.name
        }), getApp().aldstat.sendEvent("查看卡片", {
            "位置": "个人签到页面",
            "按钮": "心情记录卡片"
        });
    },
    makeDayCard: function() {
        wx.navigateTo({
            url: "../makeDayCard/card?id=" + this.data.id + "&day=" + this.data.checkNum + "&name=" + this.data.name
        }), getApp().aldstat.sendEvent("查看卡片", {
            "位置": "个人签到页面",
            "按钮": "心情打卡卡片"
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
    toDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        0 != e && "0" != e && wx.navigateTo({
            url: "../share/index?id=" + e
        });
    },
    onReachBottom: function() {
        var t = this;
        -1 == this.data.loadmore || this.data.isEmpty || (this.setData({
            currentNum: this.data.currentNum + 1,
            loadmore: 0
        }), r.getHabitNoteList(this.data.id, this.data.currentNum).then(function(e) {
            if (e.length > 0) {
                var i = e.map(function(t) {
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
                    feedList: [].concat(a(t.data.feedList), a(e)),
                    dayList: [].concat(a(t.data.dayList), a(i)),
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
        r.getHabitNoteList(this.data.id, this.data.currentNum).then(function(e) {
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
    getUserEnergy: function() {
        var t = this;
        new o.default().getUserEnergy().then(function(e) {
            (null == e[0].total ? 0 : e[0].total) < 5 ? wx.showModal({
                title: "补卡能量不足提醒",
                content: "补卡需要使用5g能量，你的能量不足，去能量树求好友赐你能量吧？",
                success: function(e) {
                    e.confirm ? t.lookTree() : e.cancel && console.log("用户点击取消");
                },
                confirmColor: "#1f82d2",
                confirmText: "查看能量"
            }) : (wx.navigateTo({
                url: "../checkRepair/repair?id=" + t.data.id + "&name=" + t.data.name
            }), t.setData({
                toRecord: !0
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getTodayByUser: function() {
        var t = this;
        r.findHabitCheck(this.data.id, !1).then(function(e) {
            var a = [ {
                day: "一",
                isCheck: e.weekChecks[0]
            }, {
                day: "二",
                isCheck: e.weekChecks[1]
            }, {
                day: "三",
                isCheck: e.weekChecks[2]
            }, {
                day: "四",
                isCheck: e.weekChecks[3]
            }, {
                day: "五",
                isCheck: e.weekChecks[4]
            }, {
                day: "六",
                isCheck: e.weekChecks[5]
            }, {
                day: "日",
                isCheck: e.weekChecks[6]
            } ];
            t.setData({
                isCheck: e.isCheck,
                isRecord: e.isNoted,
                checkNum: e.checkNum,
                continueCount: e.continueCount,
                startNum: e.disDays,
                dateInfo: a,
                isPrivate: e.isPrivate,
                checkId: e.isCheck ? e.checkId : 0,
                canShare: e.share,
                canNote: e.record
            }), t.getYesterdayCheck();
        }).catch(function(t) {
            wx.showToast({
                title: t.info || "获取数据失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    getYesterdayCheck: function() {
        var t = this;
        r.isCheckYesterday(this.data.id).then(function(e) {
            t.data.isRepair;
            t.setData({
                isRepair: t.data.startNum > 1 ? e ? 0 : 1 : 0,
                repairText: 0 === e ? "去记录" : "去补卡"
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    startRepair: function(t) {
        this.getUserEnergy();
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
    submitCheck: function(t) {
        var e = t.detail.formId, a = this.data.id;
        c.addPushForm(e, 1, a).then(function(t) {}).catch(function(t) {
            console.log(t);
        });
    },
    priviteChange: function(t) {
        var e = this;
        t.detail.value ? r.setHabitPrivate(this.data.id, 2).then(function(t) {
            e.setData({
                isPrivate: !1
            }), wx.showModal({
                title: "公开记录提示",
                content: "你的记录已公开，心情将进入萌芽学堂，大家相互学习监督成长。",
                showCancel: !1,
                success: function(t) {},
                confirmText: "明白"
            });
        }).catch(function(a) {
            e.setData({
                isPrivate: t.detail.value
            });
        }) : r.setHabitPrivate(this.data.id, 1).then(function(t) {
            e.setData({
                isPrivate: !0
            }), wx.showModal({
                title: "隐私记录提示",
                content: "你的记录已只可以自己看到，萌芽学堂将不再呈现，建议公开大家相互学习监督成长。",
                showCancel: !1,
                success: function(t) {},
                confirmText: "明白"
            });
        }).catch(function(a) {
            e.setData({
                isPrivate: t.detail.value
            });
        });
    },
    lookTree: function() {
        var t = r.getUserInfo();
        wx.navigateTo({
            url: "/pages/energy/energy?h=" + this.data.id + "&u=" + t.id + "&s=0"
        }), getApp().aldstat.sendEvent("查看树", {
            "位置": "个人签到页面"
        });
    },
    likeHabitNote: function(t) {
        var a = t.currentTarget.dataset.id;
        if (this.data.feedList[a].isLike) {
            var i, n = "feedList[" + a + "].isLike", s = this.data.feedList[a].prop_count, o = "feedList[" + a + "].prop_count";
            this.setData((i = {}, e(i, n, !1), e(i, o, parseInt(s) - 1), i)), r.cancelLikeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        } else {
            var c, d = "feedList[" + a + "].isLike", h = this.data.feedList[a].prop_count, u = "feedList[" + a + "].prop_count";
            this.setData((c = {}, e(c, d, !0), e(c, u, parseInt(h) + 1), c)), r.likeNote(this.data.feedList[a].id).then(function(t) {}).catch(function(t) {});
        }
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
    },
    hideComment: function(t) {
        var a = t.currentTarget.dataset.index, i = (t.currentTarget.dataset.id, "feedList[" + a + "].isComment");
        this.setData(e({}, i, !1));
    },
    sendComment: function(t) {
        var a = this, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, s = "feedList[" + i + "].isComment";
        this.setData(e({}, s, !1));
        var o = t.detail.value;
        "" != o && 0 != o.length && r.commentNote(n, o, this.data.beCommentedId).then(function(t) {
            var n, s = "feedList[" + i + "].comment", o = a.data.feedList[i].comment, c = "feedList[" + i + "].comment_count", d = a.data.feedList[i].comment_count, h = r.getUserInfo();
            t.nickname = h.nickname, o.push(t), a.setData((n = {}, e(n, s, o), e(n, "beCommentedId", ""), 
            e(n, "atUserName", "评论一下~"), e(n, c, parseInt(d) + 1 + ""), n));
        }).catch(function(t) {});
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            (n = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "个人签到页面",
                "按钮": "列表按钮"
            });
            var e = t.target.dataset.id, a = (t.target.dataset.day, t.target.dataset.path), i = "1" == t.target.dataset.invite ? "/pages/mindFeed/feed?id=" + this.data.id + "&share=1" : "/pages/share/index?id=" + e + "&page=1";
            return {
                title: "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。",
                path: i,
                imageUrl: a,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var n = getApp();
        return n.aldstat.sendEvent("用户分享", {
            "位置": "个人签到页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});