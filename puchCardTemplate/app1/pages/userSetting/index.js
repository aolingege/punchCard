function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../../serivce/UserService")), t = new (e(require("../../serivce/HabitService")).default)();

Page({
    data: {
        userInfo: {},
        signature: "",
        nickname: "",
        isCanMsg: !0
    },
    onShow: function() {
        var e = this;
        new n.default().getUserInfoFromRemote().then(function(n) {
            e.setData({
                userInfo: n,
                signature: n.signature,
                nickname: n.nickname,
                isCanMsg: 1 == parseInt(n.can_msg)
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    nicknameInput: function(e) {
        var n = e.detail.value + "";
        console.log(n.length), this.setData({
            nickname: n
        });
    },
    signatureInput: function(e) {
        var n = e.detail.value + "";
        this.setData({
            signature: n
        });
    },
    quitReLogin: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var n = e.tempFilePaths[0];
                wx.navigateTo({
                    url: "../upload/upload?src=" + n
                });
            }
        });
    },
    onChangUser: function() {
        if (this.data.nickname.length <= 0) wx.showToast({
            title: "请填写昵称",
            icon: "warn",
            duration: 2e3
        }); else if (this.data.signature.length <= 0) wx.showToast({
            title: "请填写签名",
            icon: "warn",
            duration: 2e3
        }); else {
            var e = getApp();
            new n.default().updateUserInfo(this.data.nickname, null, null, this.data.signature).then(function(n) {
                wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 2e3
                }), e.updateUserInfo(n), setTimeout(function() {
                    wx.navigateBack();
                }, 1500);
            }).catch(function(e) {
                wx.showToast({
                    title: "修改失败,请重试",
                    icon: "warn",
                    duration: 2e3
                });
            });
        }
    },
    canMsgChange: function(e) {
        var n = getApp();
        e.detail.value ? t.setUserCanMsg(1).then(function(e) {
            n.updateUserInfo(e), wx.showToast({
                title: "打开通知成功",
                icon: "none",
                duration: 2e3
            });
        }).catch(function(e) {}) : t.setUserCanMsg(0).then(function(e) {
            n.updateUserInfo(e), wx.showToast({
                title: "关闭通知成功",
                icon: "none",
                duration: 2e3
            });
        }).catch(function(e) {});
    },
    onShareAppMessage: function() {
        return {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(e) {},
            fail: function(e) {}
        };
    }
});