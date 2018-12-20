function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/UserService")), a = t(require("../../serivce/HabitService")), n = new e.default(), i = new a.default();

Page({
    data: {
        smallAni: "",
        sayingAni: "",
        waterAni: "",
        userId: 0,
        habitId: 0,
        habitName: "",
        userUrl: "",
        isShare: 0,
        showHome: 0,
        sayText: [ "一分耕耘一分收获\n打卡我就一天天长大", "分享给朋友赐能量\n能量可以用来补打卡", "积累到180g总能量\n可以用来兑换高级账户", "成长的孤独与开心\n我可以陪在你的身边" ],
        sayingIndex: 0,
        energy: 0,
        checkNum: 0,
        treeUrl: "",
        showEnergy: !1
    },
    onLoad: function(t) {
        var e = i.getUserInfo(), a = t.s;
        e && e.id > 0 && e.id == t.u && (a = 0), this.setData({
            userId: t.u,
            habitId: t.h,
            isShare: a,
            showHome: t.s
        });
    },
    onShow: function() {
        this.getUserEnergy();
    },
    onReady: function() {
        var t = this, e = wx.getSystemInfoSync(), a = wx.createAnimation();
        a.translateX(e.windowWidth).step({
            duration: 7e4
        }).translateX(0).step({
            duration: 8e4
        }), this.setData({
            smallAni: a.export()
        });
        var n = this;
        setInterval(function() {
            a.translateX(e.windowWidth).step({
                duration: 7e4
            }).translateX(0).step({
                duration: 8e4
            }), n.setData({
                smallAni: a.export()
            });
        }.bind(n), 15e4), setInterval(function() {
            var e = wx.createAnimation();
            e.scale(1, 1).step({
                duration: 300
            }), t.setData({
                sayingIndex: t.data.sayingIndex >= t.data.sayText.length - 1 ? 0 : t.data.sayingIndex + 1,
                sayingAni: e.export()
            }), t.sayingTime();
        }, 12e3), this.sayingTime();
    },
    sayingTime: function() {
        var t = this;
        setTimeout(function() {
            var e = wx.createAnimation();
            e.scale(0, 0).step({
                duration: 300
            }), t.setData({
                sayingAni: e.export()
            });
        }, 4e3);
    },
    getUserEnergy: function() {
        var t = this;
        n.getUserEnergyById(this.data.userId).then(function(e) {
            console.log(e), t.setData({
                energy: null == e[0].total ? 0 : e[0].total
            });
        }).catch(function(t) {
            console.log(t);
        }), i.getHabitTree(this.data.habitId, this.data.userId).then(function(e) {
            console.log(e), t.setData({
                checkNum: e.checkNum,
                treeUrl: e.tree,
                userUrl: e.avatar_small,
                habitName: e.habitName
            }), wx.setNavigationBarTitle({
                title: e.habitName + "能量树"
            });
        }).catch(function(t) {
            console.log(t), t && 13e3 === t.status && wx.showModal({
                title: "萌芽习惯提示",
                content: t.info,
                showCancel: !1,
                success: function(t) {
                    wx.switchTab({
                        url: "../create/create"
                    });
                },
                confirmText: "去首页"
            });
        });
    },
    onShareAppMessage: function(t) {
        var e = getApp();
        return "button" === t.from ? e.aldstat.sendEvent("用户分享", {
            "位置": "能量树页面",
            "按钮": "页面按钮"
        }) : e.aldstat.sendEvent("用户分享", {
            "位置": "能量树页面",
            "按钮": "顶部按钮"
        }), {
            title: "我在培养「" + this.data.habitName + "」习惯，赐我一点点能量好吗？",
            path: "/pages/energy/energy?h=" + this.data.habitId + "&u=" + this.data.userId + "&s=1",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    },
    wateringFriend: function() {
        var t = this;
        n.giveUserEnergy(this.data.userId, this.data.habitId).then(function(e) {
            console.log(e), t.setData({
                energy: parseInt(t.data.energy) + 1
            }), wx.showToast({
                title: "好友能量+1g",
                icon: "none",
                duration: 2e3
            });
            var a = wx.createAnimation();
            a.rotate(-30).step({
                duration: 300
            }).rotate(0).step({
                duration: 300
            }).rotate(-30).step({
                duration: 300
            }).rotate(0).step({
                duration: 300
            }), t.setData({
                waterAni: a.export()
            }), setTimeout(function() {
                wx.showModal({
                    title: "萌芽习惯提示",
                    content: "能量好友能量+1g，谢谢你。要种植属于自己的能量树吗？",
                    success: function(t) {
                        t.confirm ? wx.switchTab({
                            url: "../create/create"
                        }) : t.cancel && console.log("用户点击取消");
                    },
                    confirmText: "去种植"
                });
            }, 1200);
        }).catch(function(t) {
            console.log(t), t && 13e3 === t.status && wx.showModal({
                title: "萌芽习惯提示",
                content: t.info,
                success: function(t) {
                    t.confirm ? wx.switchTab({
                        url: "../create/create"
                    }) : t.cancel && console.log("用户点击取消");
                },
                confirmText: "去首页"
            });
        });
    },
    energyDesc: function() {
        this.setData({
            showEnergy: !0
        });
    },
    hideEnergy: function() {
        this.setData({
            showEnergy: !1
        });
    }
});