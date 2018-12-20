var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")), e = require("../../utils/router"), a = new t.default();

Page({
    data: {
        input: "",
        createType: "1",
        recommendList: [],
        notice: "",
        needHome: !1
    },
    onLoad: function(t) {
        this.setData({
            needHome: !t.home
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "创建圈子页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    bindReplaceInput: function(t) {
        this.setData({
            input: t.detail.value
        });
    },
    bindRuleInput: function(t) {
        this.setData({
            notice: t.detail.value
        });
    },
    privateChange: function(t) {
        console.log(t), this.setData({
            createType: t.detail.value
        });
    },
    backHome: function() {
        wx.switchTab({
            url: "../habit/habit"
        });
    },
    toDirect: function(t) {
        wx.navigateTo({
            url: "../direct/direct?url=https://mp.weixin.qq.com/s/oMtsNJ9cDMhb4501gdrnIw&t=萌芽圈子直达服务"
        });
    },
    createHabit: function() {
        var t = this;
        "" != this.data.input ? a.createGroupHabit(this.data.input, this.data.createType, this.data.notice).then(function(e) {
            wx.showToast({
                title: "创建习惯群成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                input: ""
            }), wx.switchTab({
                url: "../habit/habit"
            });
        }).catch(function(t) {
            t && 13005 === t.status ? wx.showModal({
                title: "创建失败",
                content: "您目前只能添加5个习惯，您可通过连续签到或者开通高级账号功能解除限制",
                confirmText: "去开通",
                success: function(t) {
                    t.confirm && (0, e.navigate)({
                        path: "pages/vip/index"
                    });
                }
            }) : wx.showToast({
                title: t.info || "",
                icon: "fail",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "群打卡名称不能为空",
            icon: "none",
            duration: 2e3
        });
    },
    searchHabit: function() {
        var t = this;
        a.searchHabit(this.data.input).then(function(e) {
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
    }
});