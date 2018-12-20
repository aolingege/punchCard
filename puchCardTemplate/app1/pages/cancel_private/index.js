function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/SignatureService")), r = t(require("../../serivce/UserService")), n = {
    error: "密码错误，请重新输入",
    first: "请输入密码",
    disable: "请稍后重新尝试"
}, a = null;

Page({
    data: {
        current: 0,
        numbers: [ "", "", "", "" ],
        value: "",
        title: n.first,
        errorCount: 0,
        second: 60
    },
    handleInput: function(t) {
        if (5 !== this.data.errorCount) {
            var e = t.detail.value;
            this.setData({
                value: e,
                current: e.length,
                numbers: this.switchInput(e)
            }), 4 === e.length && this.handleCheckResult(e);
        }
    },
    switchInput: function(t) {
        return String(t).padEnd(4, " ").split("");
    },
    pswIsCorrect: function(t, r) {
        return new e.default().checkSignature(t, r);
    },
    handleCheckResult: function(t) {
        var e = getApp(), a = e.getUserInfo().private_pwd;
        this.pswIsCorrect(a, t) ? new r.default().updateUserInfo(null, !1).then(function(t) {
            e.updateUserInfo(t), wx.navigateBack();
        }).catch(function(t) {
            console.log(t);
        }) : (console.log(this.data.errorCount), this.data.errorCount < 4 ? this.setData({
            current: 0,
            numbers: [ "", "", "", "" ],
            value: "",
            title: n.error,
            errorCount: this.data.errorCount + 1
        }) : this.handleMultiError());
    },
    handleMultiError: function() {
        var t = this;
        this.setData({
            title: n.disable,
            errorCount: this.data.errorCount + 1
        }), a = setInterval(function() {
            t.data.second > 0 ? t.setData({
                second: t.data.second - 1
            }) : (clearInterval(a), a = null, t.setData({
                current: 0,
                numbers: [ "", "", "", "" ],
                value: "",
                title: n.first,
                errorCount: 0,
                second: 60
            }));
        }, 1e3);
    }
});