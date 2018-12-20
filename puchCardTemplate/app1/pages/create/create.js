function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/HabitService")), n = t(require("../../serivce/PushService")), a = t(require("../../serivce/UserService")), i = require("../../utils/router"), o = new e.default(), c = new n.default();

Page({
    data: {
        showGroup: !0,
        input: "",
        isCreated: !1,
        result: "",
        recommendList: [],
        list: [ {
            id: "0",
            name: "热门",
            type: "0"
        }, {
            id: "1",
            name: "健康",
            type: "1"
        }, {
            id: "2",
            name: "学习",
            type: "2"
        }, {
            id: "3",
            name: "思考",
            type: "3"
        }, {
            id: "4",
            name: "晨间",
            type: "4"
        }, {
            id: "5",
            name: "晚间",
            type: "5"
        }, {
            id: "6",
            name: "有趣",
            type: "6"
        }, {
            id: "8",
            name: "推荐",
            type: "8"
        } ],
        searchId: 0
    },
    onLoad: function(t) {
        this.getRecommendHabit(), t.type && 1 == t.type && (0, i.navigate)({
            path: "pages/about/about"
        }), new a.default().syncUnReadMsgCount();
    },
    getRecommendHabit: function() {
        var t = this;
        7 == this.data.searchId ? o.getGroupOpenHabit().then(function(e) {
            return t.filterRecommend(e);
        }).then(function(e) {
            t.setData({
                recommendList: e
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            console.log(t), wx.stopPullDownRefresh();
        }) : o.getRecommendHabit(this.data.searchId).then(function(e) {
            return t.filterRecommend(e);
        }).then(function(e) {
            t.setData({
                recommendList: e
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            console.log(t), wx.stopPullDownRefresh();
        });
    },
    filterRecommend: function(t) {
        var e = getApp().globalData.habitList;
        return t.filter(function(t) {
            return !e.some(function(e) {
                return e.id === t.habit_id;
            });
        });
    },
    getRecommendType: function() {
        var t = this;
        o.getRecommendType().then(function(e) {
            t.setData({
                list: e
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickHabit: function(t) {
        var e = t.currentTarget.dataset.habitid;
        wx.navigateTo({
            url: "../mindFeed/feed?id=" + e
        });
    },
    clickJoin: function(t) {
        var e = this, n = (t.detail.payload, t.currentTarget.dataset.type), a = t.currentTarget.dataset.habitid;
        2 != n ? o.joinHabit(a).then(function(t) {
            var n = e.data.recommendList.filter(function(e) {
                return e.habit_id !== t.habit_id;
            });
            e.setData({
                recommendList: n
            }), wx.showToast({
                title: "加入习惯成功",
                icon: "success",
                duration: 2e3
            });
        }).catch(function(t) {
            e.setData({
                result: e.data.input,
                isCreate: !1
            }), t && 13005 === t.status ? wx.showModal({
                title: "添加失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, i.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: t.info || "加入失败",
                icon: "fail",
                duration: 2e3
            });
        }) : o.joinGroupHabit(a).then(function(t) {
            var n = e.data.recommendList.filter(function(e) {
                return e.habit_id !== t.habit_id;
            });
            e.setData({
                recommendList: n
            }), wx.showToast({
                title: "加入习惯群成功",
                icon: "success",
                duration: 2e3
            });
        }).catch(function(t) {
            t && 13005 === t.status ? wx.showModal({
                title: "添加失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, i.navigate)({
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
    onPullDownRefresh: function() {
        this.getRecommendHabit();
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) (e = getApp()).aldstat.sendEvent("用户分享", {
            "位置": "添加习惯页面",
            "按钮": "列表按钮"
        }); else {
            var e = getApp();
            e.aldstat.sendEvent("用户分享", {
                "位置": "添加习惯页面",
                "按钮": "顶部按钮"
            });
        }
        return {
            title: "我在坚持培养好习惯，一起来吗？",
            path: "/pages/create/create",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    goSearchHabitPage: function() {
        (0, i.navigate)({
            path: "pages/searchHabit/search"
        }), getApp().aldstat.sendEvent("点击个人习惯", {
            "页面": "发现页面"
        });
    },
    goGroupHabitPage: function() {
        (0, i.navigate)({
            path: "pages/createFt/create?home=1"
        }), getApp().aldstat.sendEvent("点击打卡圈子", {
            "页面": "发现页面"
        });
    },
    changeSearchHabit: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            searchId: e,
            recommendList: []
        }), this.getRecommendHabit();
    },
    submitJoin: function(t) {
        var e = t.detail.formId, n = t.currentTarget.dataset.id;
        c.addPushForm(e, 2, n).then(function(t) {
            console.log(t);
        }).catch(function(t) {
            console.log(t);
        });
    }
});