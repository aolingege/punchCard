var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")), i = require("../../utils/router"), e = new t.default();

Page({
    data: {
        userId: 0,
        habitId: 0,
        inviteInfo: ""
    },
    onLoad: function(t) {
        this.setData({
            userId: t.uid,
            habitId: t.hid
        });
    },
    onShow: function() {
        var t = this;
        e.getShareGroupHabit(this.data.habitId, this.data.userId).then(function(i) {
            t.setData({
                inviteInfo: i
            });
        }).catch(function(t) {
            t && 13e3 === t.status && wx.showModal({
                title: "群初始化失败",
                content: "朋友的群初始化失败，赶快联系客服帮忙处理吧。",
                confirmText: "找客服",
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "../mine/mine"
                    });
                }
            });
        });
    },
    createHabit: function() {
        0 != this.data.userId && 0 != this.data.habitId ? e.joinGroupHabit(this.data.habitId).then(function(t) {
            wx.showToast({
                title: "加入习惯群成功",
                icon: "success",
                duration: 2e3
            }), wx.switchTab({
                url: "../habit/habit"
            });
        }).catch(function(t) {
            t && 13005 === t.status ? wx.showModal({
                title: "加入失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, i.navigate)({
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
        }) : wx.showToast({
            title: "邀请已经失效",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function() {},
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    }
});