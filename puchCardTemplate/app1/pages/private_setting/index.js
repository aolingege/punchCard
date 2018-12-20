function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/SignatureService")), a = t(require("../../serivce/UserService")), n = require("../../utils/router"), s = {
    error: "两次密码不一致，请重新输入",
    second: "请再次输入密码",
    first: "请输入密码",
    email: "设置密保邮箱"
}, i = {
    psw: "设置隐私密码后，进入习惯列表需要验证你的身份",
    email: "设置您的密保邮箱，以便找回您的密码"
};

Page({
    data: {
        current: 0,
        numbers: [ "", "", "", "" ],
        lastInput: "",
        value: "",
        title: s.first,
        showEmail: !1,
        warning: i.psw,
        email: "",
        isValidEmail: !1,
        isRetPsw: !1,
        resetReady: !1
    },
    onLoad: function(t) {
        t.reset && this.setData({
            isRetPsw: !0
        });
    },
    handleInput: function(t) {
        var e = t.detail.value;
        this.setData({
            value: e,
            current: e.length,
            numbers: this.switchInput(e)
        }), 4 !== e.length || this.data.lastInput ? 4 === e.length && this.data.lastInput && this.handleResult() : this.setData({
            lastInput: e,
            value: "",
            numbers: [ "", "", "", "" ],
            title: s.second,
            current: 0
        });
    },
    switchInput: function(t) {
        return String(t).padEnd(4, " ").split("");
    },
    handleResult: function() {
        var t = this.data;
        t.lastInput === t.value ? this.handlePswCorrect() : this.handlePswWrong();
    },
    handlePswWrong: function() {
        this.setData({
            current: 0,
            numbers: [ "", "", "", "" ],
            lastInput: "",
            value: "",
            title: s.error
        });
    },
    handlePswCorrect: function() {
        this.data.isRetPsw ? this.setData({
            resetReady: !0
        }) : this.setData({
            showEmail: !0,
            title: s.email,
            warning: i.email
        });
    },
    handleResetPsw: function() {
        this.handleSetPsw();
    },
    handleInputEmail: function(t) {
        var e = t.detail.value, a = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        this.setData({
            email: e,
            isValidEmail: a.test(e)
        });
    },
    handleConfirm: function() {
        var t = this;
        wx.showModal({
            title: "设置邮箱",
            content: "您的邮箱为" + this.data.email + ",请确认是否正确",
            success: function(e) {
                e.confirm && t.handleSetPsw(t.data.email);
            }
        });
    },
    handleSetPsw: function() {
        var t = this, l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, r = new e.default(), u = new a.default(), h = r.sign(this.data.value);
        return u.setPravitePsw(h, l).then(function(t) {
            u.app.unlockApp(), wx.showModal({
                content: "设置隐私密码成功",
                showCancel: !1,
                success: function(t) {
                    (0, n.reLaunch)({
                        path: "pages/mine/mine"
                    });
                }
            });
        }).catch(function(e) {
            wx.showModal({
                content: e.info || "设置隐私密码失败",
                showCancel: !1
            }), t.setData({
                current: 0,
                numbers: [ "", "", "", "" ],
                lastInput: "",
                value: "",
                title: s.first,
                showEmail: !1,
                warning: i.psw,
                email: "",
                isRetPsw: !1,
                resetReady: !1
            });
        });
    }
});