var n = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
}, t = (require("./utils/ald-stat.js"), {
    onLaunch: function() {
        var n = this;
        wx.getSystemInfo({
            success: function(t) {
                n.isIos = "ios" == t.platform;
            }
        });
    },
    onHide: function() {
        this.lockApp();
    },
    getUserInfo: function(n) {
        return wx.getStorageSync("userInfo") || {};
    },
    getLoginStatus: function() {
        return Boolean(this.getUserInfo().openid);
    },
    updateUserInfo: function(n) {
        return wx.setStorageSync("userInfo", n);
    },
    globalData: {
        hasUnlock: !1,
        userInfo: null,
        habitList: []
    },
    isIos: !1
});

App(n({}, t, function() {
    var n = {
        prevent: !1,
        isOpen: !1
    };
    return {
        lockApp: function() {
            n.prevent || (n.isOpen = !1);
        },
        unlockApp: function() {
            n.isOpen = !0;
        },
        preventLock: function() {
            n.prevent = !0;
        },
        allowLock: function() {
            n.prevent = !1;
        },
        appNeedUnlock: function() {
            var t = this.getUserInfo();
            return t.id && t.private_pwd && t.private_pwd.length > 16 && !n.isOpen;
        }
    };
}()));