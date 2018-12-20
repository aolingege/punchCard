function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

function e(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var i = t(require("../../serivce/HabitService")), n = t(require("../../serivce/PushService")), s = require("../../utils/router"), o = new i.default(), c = new n.default(), r = require("../../utils/util");

Page({
    data: {
        id: 0,
        name: "",
        isCheck: !1,
        checkId: 0,
        isPrivate: !0,
        isRecord: !1,
        isEmpty: !1,
        today: r.formatToday(new Date()),
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
        feedList: [],
        userList: [],
        currentNum: 0,
        currentTab: 0,
        ft_user: 0,
        ft_check: 0,
        grouper: !1,
        habitNotice: "",
        toRecord: !1,
        isJoin: !0,
        isScene: !1,
        isLogin: !1,
        isLastDay: !1,
        hideModal: !0,
        animationData: {},
        beCommentedId: "",
        atUserName: "",
        btnAnimation: "",
        optionShow: !0,
        ratioW: wx.getSystemInfoSync().windowWidth / 750
    },
    onShow: function() {
        this.data.toRecord && this.initLoad();
    },
    initLoad: function() {
        this.setData({
            currentNum: 0,
            loadmore: 0,
            toRecord: !1
        }), this.getTodayByUser(), this.getHabitNotice(), 1 == this.data.currentTab ? this.getHabitGroupUser() : this.getHabitGroupNote();
    },
    onLoad: function(t) {
        var a = this, e = decodeURIComponent(t.scene), i = getApp();
        "" != e && void 0 != e && "undefined" != e ? this.setData({
            id: e,
            isLogin: i.getLoginStatus(),
            isScene: !0,
            currentTab: 2
        }) : this.setData({
            id: t.id,
            name: t.name,
            isJoin: !0,
            isLogin: i.getLoginStatus()
        }), o.getHabit(this.data.id).then(function(t) {
            a.setData({
                name: t.name,
                isJoin: t.isJoin,
                currentTab: t.isJoin ? 0 : 2
            }), wx.setNavigationBarTitle({
                title: t.name
            }), a.initLoad();
        }).catch(function(t) {});
    },
    onPageScroll: function(t) {
        if (t.scrollTop > 150 * this.data.ratioW && this.data.optionShow) {
            var a = wx.createAnimation({
                duration: 500
            });
            a.translateX(150 * this.data.ratioW).step(), this.setData({
                btnAnimation: a.export(),
                optionShow: !1
            });
        } else if (t.scrollTop < 150 * this.data.ratioW && !this.data.optionShow) {
            var e = wx.createAnimation({
                duration: 500
            });
            e.translateX(0).step(), this.setData({
                btnAnimation: e.export(),
                optionShow: !0
            });
        }
    },
    joinHabit: function() {
        var t = this;
        this.data.isLogin ? this.joinGroupHabit() : o.getHabit(this.data.id).then(function(a) {
            t.setData({
                name: a.name,
                isJoin: a.isJoin,
                isLogin: !0,
                currentTab: a.isJoin ? 0 : 2
            }), a.isJoin ? t.initLoad() : t.joinGroupHabit();
        }).catch(function(t) {});
    },
    joinGroupHabit: function() {
        var t = this;
        o.joinGroupHabit(this.data.id).then(function(a) {
            wx.showModal({
                title: "加入习惯圈子成功",
                showCancel: !1,
                content: "请按照圈子主题打卡记录，圈主如果把你踢出圈子，习惯将被删除。邀请更多好友一起来活跃圈子吧。",
                confirmText: "确定",
                success: function(t) {}
            }), t.setData({
                isJoin: !0,
                currentTab: 0
            }), t.initLoad();
        }).catch(function(t) {
            t && 13005 === t.status ? wx.showModal({
                title: "加入失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, s.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showModal({
                title: "加入失败",
                content: t.info || "",
                confirmText: "去首页",
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "../habit/habit"
                    });
                }
            });
        });
    },
    backHome: function() {
        wx.switchTab({
            url: "../habit/habit"
        });
    },
    toUserPage: function(t) {
        var a = t.currentTarget.dataset.user;
        console.log("userId=" + a), wx.navigateTo({
            url: "../userOther/user?id=" + a
        });
    },
    onLastDay: function() {
        this.setData({
            isLastDay: !this.data.isLastDay,
            userList: []
        }), this.getHabitGroupUser();
    },
    clickHabit: function(t) {
        wx.navigateTo({
            url: "../mindUser/feed?id=" + this.data.id + "&day=" + this.data.checkNum
        }), getApp().aldstat.sendEvent("点击足迹", {
            "页面": "圈子打卡页"
        });
    },
    swichNav: function(t) {
        if (this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current,
            currentNum: 0,
            loadmore: 0,
            isEmpty: !1
        }), 1 == this.data.currentTab ? (this.getHabitGroupStatistics(), this.getHabitGroupUser()) : (this.setData({
            feedList: [],
            loadmore: 0
        }), this.getHabitGroupNote());
    },
    getHabitNotice: function() {
        var t = this;
        o.getHabitNotice(this.data.id).then(function(a) {
            t.setData({
                habitNotice: a.notice,
                grouper: a.grouper
            });
        }).catch(function(t) {});
    },
    startCheck: function() {
        var t = this;
        this.data.isCheck ? wx.showModal({
            title: "取消打卡",
            content: "取消打卡后，该习惯今天的记录会被清空，您确定删除？",
            success: function(a) {
                a.confirm ? t.cancelCheck() : a.cancel && console.log("用户点击取消");
            },
            confirmColor: "#ea2000",
            confirmText: "确定取消"
        }) : this.addCheck();
    },
    addCheck: function() {
        var t = this;
        o.checkHabit(this.data.id).then(function(a) {
            wx.showToast({
                title: "打卡成功，能量+1g",
                icon: "none",
                duration: 2e3
            }), t.setData({
                isCheck: !0,
                checkId: a
            }), t.getTodayByUser(), setTimeout(function() {
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
        o.cancelHabit(this.data.id).then(function(a) {
            wx.showToast({
                title: "取消打卡成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                isCheck: !1,
                currentNum: 0,
                loadmore: 0,
                feedList: []
            }), t.getTodayByUser(), 1 == t.data.currentTab ? t.getHabitGroupUser() : t.getHabitGroupNote();
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
    priviteChange: function(t) {
        var a = this;
        t.detail.value ? o.setHabitPrivate(this.data.id, 2).then(function(t) {
            a.setData({
                isPrivate: !1
            }), wx.showModal({
                title: "公开记录提示",
                content: "你的记录已公开，心情将进入萌芽学堂，大家相互学习监督成长。",
                showCancel: !1,
                success: function(t) {},
                confirmText: "明白"
            });
        }).catch(function(e) {
            a.setData({
                isPrivate: t.detail.value
            });
        }) : o.setHabitPrivate(this.data.id, 1).then(function(t) {
            a.setData({
                isPrivate: !0
            }), wx.showModal({
                title: "隐私记录提示",
                content: "你的记录已只可以自己看到，萌芽学堂将不再呈现，建议公开大家相互学习监督成长。",
                showCancel: !1,
                success: function(t) {},
                confirmText: "明白"
            });
        }).catch(function(e) {
            a.setData({
                isPrivate: t.detail.value
            });
        });
    },
    groupCard: function() {
        (0, s.navigate)({
            path: "pages/shareFt/share",
            params: {
                habitId: this.data.id,
                c: this.data.checkId,
                p: this.data.isPrivate,
                r: !1
            }
        }), this.setData({
            hideModal: !0
        }), getApp().aldstat.sendEvent("查看卡片", {
            "位置": "圈子签到页面",
            "按钮": "圈子卡片"
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
            "页面": " 圈子打卡页"
        });
    },
    toGetCard: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.day;
        wx.navigateTo({
            url: "../makeCard/index?id=" + a + "&day=" + e + "&name=" + this.data.name
        }), getApp().aldstat.sendEvent("查看卡片", {
            "位置": "圈子签到页面",
            "按钮": "心情记录卡片"
        });
    },
    toManage: function(t) {
        (0, s.navigate)({
            path: "pages/manageFt/manage",
            params: {
                id: this.data.id,
                cname: this.data.name
            }
        });
    },
    copyNote: function(t) {
        var a = t.currentTarget.dataset.text;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.showToast({
                    title: "复制成功！",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    setNotice: function() {
        this.data.grouper ? wx.navigateTo({
            url: "../habitNotice/notice?id=" + this.data.id
        }) : wx.showModal({
            title: "圈子公告",
            content: this.data.habitNotice,
            showCancel: !1,
            success: function(t) {},
            confirmText: "确定"
        });
    },
    onReachBottom: function() {
        var t = this;
        console.info("上拉了"), -1 == this.data.loadmore || this.data.isEmpty || (this.setData({
            currentNum: this.data.currentNum + 1,
            loadmore: 0
        }), 1 == this.data.currentTab ? o.getHabitGroupUser(this.data.id, this.data.isLastDay ? "-1" : "0", this.data.currentNum).then(function(a) {
            a.length > 0 ? t.setData({
                userList: [].concat(e(t.data.userList), e(a)),
                loadmore: 0
            }) : t.setData({
                loadmore: -1
            });
        }).catch(function(a) {
            t.setData({
                loadmore: -1
            });
        }) : o.getHabitGroupNote(this.data.id, this.data.currentNum, 0 == this.data.currentTab ? 0 : 1).then(function(a) {
            a.length > 0 ? t.setData({
                feedList: [].concat(e(t.data.feedList), e(a)),
                loadmore: 1
            }) : t.setData({
                loadmore: -1
            });
        }).catch(function(a) {
            t.setData({
                loadmore: -1
            });
        }));
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.setData({
            currentNum: 0,
            loadmore: 0
        }), 1 == this.data.currentTab ? this.getHabitGroupUser() : this.getHabitGroupNote();
    },
    getHabitGroupNote: function() {
        var t = this;
        o.getHabitGroupNote(this.data.id, this.data.currentNum, 0 == this.data.currentTab ? 0 : 1).then(function(a) {
            a.length > 0 ? t.setData({
                feedList: a,
                loadmore: 0,
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
    getHabitGroupUser: function() {
        var t = this;
        o.getHabitGroupUser(this.data.id, this.data.isLastDay ? "-1" : "0", this.data.currentNum).then(function(a) {
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
        }), this.getHabitGroupStatistics();
    },
    getHabitGroupStatistics: function() {
        var t = this;
        o.getHabitGroupStatistics(this.data.id, this.data.isLastDay ? "-1" : "0").then(function(a) {
            t.setData({
                ft_user: a[0].u_count,
                ft_check: a[0].c_count
            });
        }).catch(function(t) {});
    },
    getTodayByUser: function() {
        var t = this;
        o.findHabitCheck(this.data.id, !1).then(function(a) {
            var e = [ {
                day: "一",
                isCheck: a.weekChecks[0]
            }, {
                day: "二",
                isCheck: a.weekChecks[1]
            }, {
                day: "三",
                isCheck: a.weekChecks[2]
            }, {
                day: "四",
                isCheck: a.weekChecks[3]
            }, {
                day: "五",
                isCheck: a.weekChecks[4]
            }, {
                day: "六",
                isCheck: a.weekChecks[5]
            }, {
                day: "日",
                isCheck: a.weekChecks[6]
            } ];
            t.setData({
                isCheck: a.isCheck,
                isRecord: a.isNoted,
                checkNum: a.checkNum,
                continueCount: a.continueCount,
                startNum: a.disDays,
                dateInfo: e,
                isPrivate: a.isPrivate,
                checkId: a.isCheck ? a.checkId : 0
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.info || "获取数据失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    handleViewImage: function(t) {
        var a = t.target.dataset.src, e = getApp();
        e.preventLock(), wx.previewImage({
            urls: [ a ],
            complete: function(t) {
                e.allowLock();
            }
        });
    },
    submitCheck: function(t) {
        var a = t.detail.formId, e = this.data.id;
        c.addPushForm(a, 1, e).then(function(t) {
            console.log(t);
        }).catch(function(t) {
            console.log(t);
        });
    },
    likeHabitNote: function(t) {
        var e = t.currentTarget.dataset.id;
        if (this.data.feedList[e].isLike) {
            var i, n = "feedList[" + e + "].isLike", s = this.data.feedList[e].prop_count, c = "feedList[" + e + "].prop_count";
            this.setData((i = {}, a(i, n, !1), a(i, c, parseInt(s) - 1), i)), o.cancelLikeNote(this.data.feedList[e].id).then(function(t) {}).catch(function(t) {});
        } else {
            var r, d = "feedList[" + e + "].isLike", h = this.data.feedList[e].prop_count, u = "feedList[" + e + "].prop_count";
            this.setData((r = {}, a(r, d, !0), a(r, u, parseInt(h) + 1), r)), o.likeNote(this.data.feedList[e].id).then(function(t) {}).catch(function(t) {});
        }
    },
    clickComment: function(t) {
        var e, i = t.currentTarget.dataset.index, n = (t.detail.payload, "feedList[" + i + "].isComment");
        this.setData((e = {}, a(e, n, !0), a(e, "atUserName", "评论一下~"), a(e, "beCommentedId", ""), 
        e)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    clickReply: function(t) {
        var e, i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.user, o = "feedList[" + n + "].isComment";
        this.setData((e = {}, a(e, o, !0), a(e, "beCommentedId", i), a(e, "atUserName", "回复" + s), 
        e)), getApp().isIos && wx.createSelectorQuery().selectViewport().scrollOffset(function(t) {
            setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: t.scrollTop + 60,
                    duration: 300
                });
            }, 400);
        }).exec();
    },
    hideComment: function(t) {
        var e = t.currentTarget.dataset.index, i = (t.currentTarget.dataset.id, "feedList[" + e + "].isComment");
        this.setData(a({}, i, !1));
    },
    sendComment: function(t) {
        var e = this, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, s = "feedList[" + i + "].isComment";
        this.setData(a({}, s, !1));
        var c = t.detail.value;
        "" != c && 0 != c.length && o.commentNote(n, c, this.data.beCommentedId).then(function(t) {
            var n, s = "feedList[" + i + "].comment", c = e.data.feedList[i].comment, r = "feedList[" + i + "].comment_count", d = e.data.feedList[i].comment_count, h = o.getUserInfo();
            t.nickname = h.nickname, c.push(t), e.setData((n = {}, a(n, s, c), a(n, "beCommentedId", ""), 
            a(n, "atUserName", "评论一下~"), a(n, r, parseInt(d) + 1 + ""), n));
        }).catch(function(t) {});
    },
    showModal: function() {
        var t = this;
        t.setData({
            hideModal: !1
        });
        var a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        this.animation = a, setTimeout(function() {
            t.fadeIn();
        }, 50);
    },
    hideModal: function() {
        var t = this, a = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        this.animation = a, t.fadeDown(), setTimeout(function() {
            t.setData({
                hideModal: !0
            });
        }, 240);
    },
    fadeIn: function() {
        this.animation.translateY(0).step(), this.setData({
            animationData: this.animation.export()
        });
    },
    fadeDown: function() {
        this.animation.translateY(300).step(), this.setData({
            animationData: this.animation.export()
        });
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            var a = t.target.dataset.invite;
            (d = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "群签到页面",
                "按钮": "列表按钮" + a
            });
            var e = "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。", i = "";
            if (1 == a) e = o.getUserInfo().nickname + "邀请你一起培养「" + this.data.name + "」习惯，一起来遇见更好的自己", 
            i = "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/group_share.jpg"; else if (2 == a) e = t.target.dataset.name + "你的习惯「" + this.data.name + "」今天还没有行动哦", 
            i = "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/group_nocheck.jpg"; else if (3 == a) {
                var n = t.target.dataset.days;
                e = "哇塞！" + t.target.dataset.name + "你已经坚持「" + this.data.name + "」" + n + "天啦！厉害啦！", 
                i = "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/group_check.jpg";
            } else if (0 == a) {
                var s = t.target.dataset.day, c = t.target.dataset.path, r = t.target.dataset.name;
                "" != r && null != r && (e = "培养「" + r + "」习惯，萌友已经坚持" + s + "天。", i = c);
            }
            return {
                title: e,
                path: "/pages/checkFt/check?scene=" + this.data.id,
                imageUrl: i,
                success: function(t) {},
                fail: function(t) {}
            };
        }
        var d = getApp();
        return d.aldstat.sendEvent("用户分享", {
            "位置": "群签到页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。",
            path: "/pages/checkFt/check?scene=" + this.data.id,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});