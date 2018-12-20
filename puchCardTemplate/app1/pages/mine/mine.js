function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../utils/router"), n = e(require("../../serivce/HabitService")), a = e(require("../../serivce/UserService")), s = (new n.default(), 
new a.default());

Page({
    data: {
        isLogin: !1,
        userInfo: {},
        showModal: !1,
        showEnergy: !1,
        recommend: "",
        energy: 0,
        hasUnRead: !1
    },
    onShow: function() {
        var e = this, t = getApp().getLoginStatus();
        t && (s.getUserInfoFromRemote().then(function(t) {
            e.setData({
                userInfo: t
            });
        }).catch(function(e) {
            console.log(e);
        }), this.initMessage()), this.setData({
            isLogin: t
        }), this.getRecommend(), this.getUserEnergy();
    },
    initMessage: function() {
        var e = this;
        s.syncUnReadMsgCount().then(function(t) {
            e.setData({
                hasUnRead: parseInt(t) > 0
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    handleLoginSuccess: function(e) {
        var t = e.detail.userInfo;
        this.setData({
            userInfo: t,
            isLogin: !0
        }), this.initMessage(), this.getRecommend(), this.getUserEnergy();
    },
    onShareAppMessage: function(e) {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "个人页面",
            "按钮": "button" === e.from ? "推荐按钮" : "顶部按钮"
        }), {
            title: this.data.userInfo.nickname + "邀请你加入萌芽习惯",
            path: "/pages/create/create",
            imageUrl: "http://xiaeke.oss-cn-shanghai.aliyuncs.com/habit/qun/group_share.jpg",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    toUserPage: function(e) {
        wx.navigateTo({
            url: "../userOther/user?id=" + s.getUserId()
        });
    },
    toFeedback: function(e) {
        wx.navigateTo({
            url: "../feedback/send"
        });
    },
    toAbout: function(e) {
        wx.navigateTo({
            url: "../about/about"
        });
    },
    toDirect: function(e) {
        wx.navigateTo({
            url: "../direct/direct?url=https://mp.weixin.qq.com/s/oMtsNJ9cDMhb4501gdrnIw&t=萌芽圈子直达服务"
        }), getApp().aldstat.sendEvent("查看直达服务", {
            "页面": "个人中心"
        });
    },
    goMessage: function() {
        wx.navigateTo({
            url: "../message/message"
        }), getApp().aldstat.sendEvent("查看消息", {
            "是否有消息": this.data.hasUnRead
        });
    },
    editUser: function() {
        wx.navigateTo({
            url: "../userSetting/index"
        });
    },
    toRelation: function(e) {
        this.setData({
            showModal: !0
        });
    },
    toBuyVIP: function(e) {
        var n = this.data.userInfo, a = n.vip, s = n.private_pwd;
        1 & a ? (0, t.navigate)({
            path: "pages/vip_features/index",
            params: {
                hasSetPrivate: s && s.length > 16 ? 1 : 0
            }
        }) : (0, t.navigate)({
            path: "pages/vip/index",
            params: {
                vip: a
            }
        }), getApp().aldstat.sendEvent("点击高级账户", {
            "已经vip": a,
            "用户名": this.data.userInfo.nickname
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    onConfirm: function() {
        wx.setClipboardData({
            data: "wx496e9bad2411496f",
            success: function(e) {
                wx.showToast({
                    title: "复制成功！",
                    icon: "success",
                    duration: 1500
                });
            }
        }), this.hideModal();
    },
    getRecommend: function() {
        var e = this;
        s.getUserRecommendMina().then(function(t) {
            e.setData({
                recommend: t
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    getUserEnergy: function() {
        var e = this;
        s.getUserEnergy().then(function(t) {
            e.setData({
                energy: null == t[0].total ? 0 : t[0].total
            });
        }).catch(function(e) {
            console.log(e);
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