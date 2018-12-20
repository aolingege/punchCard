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

var a = t(require("../../serivce/HabitService")), i = t(require("../../serivce/UserService")), n = require("../../utils/router"), s = new a.default();

Page({
    data: {
        habitList: null,
        delBtnWidth: 160,
        isLogin: !1
    },
    onShow: function() {
        getApp().getLoginStatus() ? (this.setData({
            isLogin: !0
        }), this.loadHabits(), new i.default().syncUnReadMsgCount()) : (this.setData({
            habitList: [],
            isLogin: !1
        }), wx.hideLoading());
    },
    onLoad: function() {
        this.initEleWidth(), wx.showLoading({
            title: ""
        }), getApp().aldstat.sendEvent("版本号", {
            "当前版本": 173
        });
    },
    onPullDownRefresh: function() {
        this.loadHabits();
    },
    onShareAppMessage: function(t) {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "习惯列表",
            "按钮": "顶部"
        }), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    goSearchHabitPage: function() {
        (0, n.navigate)({
            path: "pages/searchHabit/search"
        }), getApp().aldstat.sendEvent("点击个人习惯", {
            "页面": "习惯页面"
        });
    },
    goGroupHabitPage: function() {
        (0, n.navigate)({
            path: "pages/createFt/create?home=1"
        }), getApp().aldstat.sendEvent("点击打卡圈子", {
            "页面": "习惯页面"
        });
    },
    toCreate: function(t) {
        wx.switchTab({
            url: "../create/create"
        });
    },
    toCheck: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name, i = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: (0 == i ? "../check/check?id=" : "../checkFt/check?id=") + e + "&name=" + a + "&type=" + i
        });
    },
    toLearn: function(t) {
        wx.navigateTo({
            url: "../feed/feed"
        });
    },
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX,
            startY: t.touches[0].clientY
        });
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var a = t.touches[0].clientX, i = t.touches[0].clientY, n = this.data.startX - a, s = this.data.startY - i, c = this.data.delBtnWidth, o = "";
            s > 35 || s < -35 ? o = "right:-" + c + "px" : 0 == n || n < 35 ? o = "right:-" + c + "px" : n > 35 && (o = "right:-" + parseInt(c - n + 35) + "px", 
            n >= c && (o = "right:0px"));
            var r = "habitList[" + t.currentTarget.dataset.index + "].txtStyle";
            this.setData(e({}, r, o));
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var a = t.changedTouches[0].clientX, i = this.data.startX - a, n = t.changedTouches[0].clientY, s = this.data.startY - n, c = this.data.delBtnWidth, o = "";
            o = s > 35 || s < -35 ? "right:-" + c + "px" : i > 2 * c / 3 ? "right:0px" : "right:-" + c + "px";
            var r = "habitList[" + t.currentTarget.dataset.index + "].txtStyle";
            this.setData(e({}, r, o));
        }
    },
    initEleWidth: function() {
        try {
            var t = wx.getSystemInfoSync().windowWidth, e = 375 / (this.data.delBtnWidth / 2), a = Math.floor(t / e);
            this.setData({
                delBtnWidth: a
            });
        } catch (t) {
            return !1;
        }
    },
    delItem: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name, i = t.currentTarget.dataset.day, n = this;
        wx.showActionSheet({
            itemList: [ "删除习惯", "修改习惯图标" ],
            success: function(t) {
                console.log(t.tapIndex), 0 == t.tapIndex ? wx.showModal({
                    title: "删除习惯",
                    content: "删除习惯后，该习惯的历史记录会被清空，您确定删除？",
                    success: function(t) {
                        t.cancel ? n.handleDeleteHabit(e) : t.confirm && console.log("用户点击取消");
                    },
                    cancelColor: "#ea2000",
                    cancelText: "删除",
                    confirmText: "取消",
                    confirmColor: "#666666"
                }) : 1 == t.tapIndex && wx.navigateTo({
                    url: "../changeIcon/change?id=" + e + "&name=" + a + "&day=" + i
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    handleDeleteHabit: function(t) {
        var e = this;
        s.deleteHabit(t).then(function(a) {
            wx.showToast({
                title: "删除成功！",
                icon: "success",
                duration: 2e3
            });
            var i = e.data.habitList.filter(function(e) {
                return e.id !== t;
            });
            e.setData({
                habitList: i
            }), getApp().globalData.habitList = i;
        }).catch(function(t) {
            wx.showToast({
                title: "删除失败！",
                icon: "success",
                duration: 2e3
            });
        });
    },
    loadHabits: function() {
        var t = this;
        s.getHabits().then(function(e) {
            if (e.length > 0) {
                var a = e.map(function(t) {
                    return t.join_days = null == t.join_days ? 1 : parseInt(t.join_days) + 1, t.txtStyle = "", 
                    t;
                });
                a.sort(function(t, e) {
                    var a = 0 == t.check_today ? -1 : 1, i = 0 == e.check_today ? -1 : 1;
                    return a > i ? -1 : a < i ? 1 : 0;
                }), getApp().globalData.habitList = a, t.setData({
                    habitList: a
                });
            } else t.setData({
                habitList: []
            });
            wx.stopPullDownRefresh(), wx.hideLoading();
        }).catch(function(e) {
            t.setData({
                habitList: ""
            }), wx.stopPullDownRefresh(), wx.hideLoading();
        });
    }
});