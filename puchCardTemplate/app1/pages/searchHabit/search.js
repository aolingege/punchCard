var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")), e = require("../../utils/router"), i = new t.default();

Page({
    data: {
        input: "",
        isCreated: !1,
        result: "",
        recommendList: []
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.recommendHabit();
    },
    onShareAppMessage: function() {
        return "button" === res.from && console.log(res.target), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    inputChangeHandle: function(t) {
        this.setData({
            input: t.detail.value
        }), this.searchHabit(), this.recommendHabit();
    },
    inputCompleteHandle: function(t) {
        this.data.input && this.data.input.trim() && this.searchHabit();
    },
    createHabit: function() {
        var t = this;
        i.createHabit(this.data.result).then(function(e) {
            wx.showToast({
                title: "加入习惯成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                result: "",
                input: "",
                isCreate: !1
            });
        }).catch(function(i) {
            t.setData({
                result: t.data.input,
                isCreate: !1
            }), i && 13005 === i.status ? wx.showModal({
                title: "创建失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, e.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: i.info || "",
                icon: "fail",
                duration: 2e3
            });
        });
    },
    searchHabit: function() {
        var t = this;
        i.searchHabit(this.data.input).then(function(e) {
            t.setData({
                result: t.data.input,
                isCreated: !0
            });
        }).catch(function(e) {
            t.setData({
                result: t.data.input,
                isCreated: !1
            });
        });
    },
    recommendHabit: function() {
        var t = this;
        i.getRecommendHabitBySearch(this.data.input).then(function(e) {
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
    clickHabit: function(t) {
        var e = t.currentTarget.dataset.habitid;
        wx.navigateTo({
            url: "../mindFeed/feed?id=" + e
        });
    },
    clickJoin: function(t) {
        var a = this, n = (t.detail.payload, t.currentTarget.dataset.type), o = t.currentTarget.dataset.habitid;
        2 != n ? i.joinHabit(o).then(function(t) {
            var e = a.data.recommendList.filter(function(e) {
                return e.habit_id !== t.habit_id;
            });
            a.setData({
                recommendList: e
            }), wx.showToast({
                title: "加入习惯成功",
                icon: "success",
                duration: 2e3
            });
        }).catch(function(t) {
            a.setData({
                result: a.data.input,
                isCreate: !1
            }), t && 13005 === t.status ? wx.showModal({
                title: "添加失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, e.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: t.info || "加入失败",
                icon: "fail",
                duration: 2e3
            });
        }) : i.joinGroupHabit(o).then(function(t) {
            var e = a.data.recommendList.filter(function(e) {
                return e.habit_id !== t.habit_id;
            });
            a.setData({
                recommendList: e
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
                    t.confirm && (0, e.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: t.info || "加入失败",
                icon: "fail",
                duration: 2e3
            });
        });
    }
});