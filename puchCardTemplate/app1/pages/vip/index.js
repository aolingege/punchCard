var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../serivce/UserService")), t = require("../../utils/router"), n = new e.default();

Page({
    data: {
        fee: 18,
        isVIP: !1,
        energy: 0,
        groupCount: 0,
        isIos: !1
    },
    onLoad: function(e) {
        this.setData({
            isVIP: 1 & e.vip
        }), this.getUserEnergy(), this.getFreeGroup(), this.setData({
            isIos: getApp().isIos
        });
    },
    getUserEnergy: function() {
        var e = this;
        n.getUserEnergy().then(function(t) {
            e.setData({
                energy: null == t[0].total ? 0 : t[0].total
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    getFreeGroup: function() {
        var e = this;
        n.getFreeGroupCount().then(function(t) {
            console.log(t), e.setData({
                groupCount: t
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    handleOpenMethod: function() {
        wx.showModal({
            title: "免费开通攻略",
            content: "坚持培养好习惯打卡，收集180g能量就可以免费开通！五个习惯大概坚持18天，加油哦",
            confirmText: "明白",
            showCancel: !1,
            complete: function() {}
        });
    },
    handleOpenVIP: function() {
        var e = this;
        n.openVip().then(this.handlePayment).then(this.handlePaySuccess.bind(this)).catch(function(t) {
            e.handleError(t);
        }), getApp().aldstat.sendEvent("购买高级功能", {
            "是否免费": "否",
            "用户id": n.getUserId()
        });
    },
    handleFreeVIP: function() {
        var e = this;
        n.freeOpenVip().then(function(n) {
            e.setData({
                isVIP: !0
            }), wx.showModal({
                title: "开通成功",
                content: "恭喜您，您已经开通萌芽习惯高级账号，赶快去体验吧！",
                confirmText: "马上去",
                showCancel: !1,
                complete: function() {
                    (0, t.redirect)({
                        path: "pages/vip_features/index"
                    });
                }
            });
        }).catch(function(t) {
            e.handleError(t);
        }), getApp().aldstat.sendEvent("购买高级功能", {
            "是否免费": "是",
            "用户id": n.getUserId()
        });
    },
    handleError: function(e) {
        e && 13001 === e.status ? (this.setData({
            isVIP: !0
        }), wx.showModal({
            title: "",
            content: e.info,
            confirmText: "知道了",
            showCancel: !1
        })) : wx.showModal({
            title: "",
            content: e.info || "支付失败",
            confirmText: "知道了",
            showCancel: !1
        });
    },
    handlePayment: function(e) {
        return new Promise(function(t, n) {
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(n) {
                    t(e.out_trade_no);
                },
                fail: function(e) {
                    console.log(e), n({
                        info: "支付请求失败"
                    });
                }
            });
        });
    },
    handlePaySuccess: function(e) {
        var i = this;
        return n.paySuccess(e).then(function(e) {
            i.setData({
                isVIP: !0
            }), wx.showModal({
                title: "开通成功",
                content: "恭喜您，您已经开通萌芽习惯高级账号，赶快去体验吧！",
                confirmText: "马上去",
                showCancel: !1,
                complete: function() {
                    (0, t.redirect)({
                        path: "pages/vip_features/index"
                    });
                }
            }), getApp().aldstat.sendEvent("支付高级功能", {
                "是否免费": "否",
                "用户id": n.getUserId()
            });
        });
    },
    switchPrivate: function(e) {
        var n = this;
        e.detail.value ? (0, t.navigate)({
            path: "pages/private_setting/index"
        }) : wx.showModal({
            title: "提示",
            content: "确定取消隐私密码？",
            success: function(e) {
                e.confirm ? (0, t.redirect)({
                    path: "pages/cancel_private/index"
                }) : n.setData({
                    hasSetPrivate: !0
                });
            }
        });
    }
});