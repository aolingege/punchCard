function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../serivce/HabitService")), a = e(require("../../serivce/PushService")), i = require("../../utils/router"), s = new t.default(), c = new a.default(), n = require("../../utils/util");

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
        today: n.formatYesterday(new Date()) + "补卡",
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
        canNote: !1
    },
    onShow: function() {
        this.getTodayByUser();
    },
    onLoad: function(e) {
        this.setData({
            id: e.id,
            name: e.name
        }), wx.setNavigationBarTitle({
            title: e.name
        });
    },
    onShareAppMessage: function(e) {
        if ("button" === e.from) {
            var t = e.target.dataset.id, a = (e.target.dataset.day, e.target.dataset.path);
            return (i = getApp()).aldstat.sendEvent("用户分享", {
                "位置": "补卡页面",
                "按钮": "列表按钮"
            }), {
                title: "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。",
                path: "/pages/share/index?id=" + t + "&page=1",
                imageUrl: a,
                success: function(e) {},
                fail: function(e) {}
            };
        }
        var i = getApp();
        return i.aldstat.sendEvent("用户分享", {
            "位置": "补卡页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在培养「" + this.data.name + "」习惯，已经坚持" + this.data.checkNum + "天。",
            path: "/pages/habit/habit",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    startCheck: function() {
        this.data.isCheck || this.addCheck();
    },
    addCheck: function() {
        var e = this;
        s.checkYesterdayHabit(this.data.id).then(function(t) {
            wx.showToast({
                title: "补卡成功,能量-5g",
                icon: "none",
                duration: 2e3
            }), e.setData({
                isCheck: !0,
                checkId: t
            }), e.getTodayByUser(), e.data.canNote && (setTimeout(function() {
                (0, i.navigate)({
                    path: "pages/send/send",
                    params: {
                        habitId: e.data.id,
                        c: e.data.checkId,
                        p: e.data.isPrivate,
                        r: !0
                    }
                });
            }, 1e3), console.log(t));
        }).catch(function(e) {
            e && e.info ? wx.showModal({
                title: "打卡提示",
                content: e.info || "打卡失败"
            }) : wx.showToast({
                title: "打卡失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    startRecord: function() {
        this.data.canNote && (0, i.navigate)({
            path: "pages/send/send",
            params: {
                habitId: this.data.id,
                c: this.data.checkId,
                p: this.data.isPrivate,
                r: !0
            }
        });
    },
    toCalendar: function(e) {
        (0, i.navigate)({
            path: "pages/calendar/calendar",
            params: {
                id: this.data.id,
                cname: this.data.name
            }
        });
    },
    getTodayByUser: function() {
        var e = this;
        s.findHabitCheck(this.data.id, !0).then(function(t) {
            var a = [ {
                day: "一",
                isCheck: t.weekChecks[0]
            }, {
                day: "二",
                isCheck: t.weekChecks[1]
            }, {
                day: "三",
                isCheck: t.weekChecks[2]
            }, {
                day: "四",
                isCheck: t.weekChecks[3]
            }, {
                day: "五",
                isCheck: t.weekChecks[4]
            }, {
                day: "六",
                isCheck: t.weekChecks[5]
            }, {
                day: "日",
                isCheck: t.weekChecks[6]
            } ];
            e.setData({
                isCheck: t.isCheck,
                isRecord: t.isNoted,
                checkNum: t.checkNum,
                continueCount: t.continueCount,
                startNum: t.disDays,
                dateInfo: a,
                isPrivate: t.isPrivate,
                checkId: t.isCheck ? t.checkId : 0,
                canNote: t.record
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.info || "获取数据失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    submitCheck: function(e) {
        var t = e.detail.formId, a = this.data.id;
        c.addPushForm(t, 1, a).then(function(e) {
            console.log(e);
        }).catch(function(e) {
            console.log(e);
        });
    }
});