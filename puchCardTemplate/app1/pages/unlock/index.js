var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/SignatureService")), e = require("../../utils/router"), r = {
    error: "密码错误，请重新输入",
    first: "请输入密码",
    disable: "请稍后重新尝试"
}, n = null;

Page({
    data: {
        current: 0,
        numbers: [ "", "", "", "" ],
        value: "",
        title: r.first,
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
    pswIsCorrect: function(e, r) {
        return new t.default().checkSignature(e, r);
    },
    handleCheckResult: function(t) {
        var e = getApp(), n = e.getUserInfo().private_pwd;
        this.pswIsCorrect(n, t) ? (e.unlockApp(), wx.navigateBack()) : (console.log(this.data.errorCount), 
        this.data.errorCount < 4 ? this.setData({
            current: 0,
            numbers: [ "", "", "", "" ],
            value: "",
            title: r.error,
            errorCount: this.data.errorCount + 1
        }) : this.handleMultiError());
    },
    handleMultiError: function() {
        var t = this;
        this.setData({
            title: r.disable,
            errorCount: this.data.errorCount + 1
        }), n = setInterval(function() {
            t.data.second > 0 ? t.setData({
                second: t.data.second - 1
            }) : (clearInterval(n), n = null, t.setData({
                current: 0,
                numbers: [ "", "", "", "" ],
                value: "",
                title: r.first,
                errorCount: 0,
                second: 60
            }));
        }, 1e3);
    },
    handleForget: function() {
        (0, e.navigate)({
            path: "pages/private_reset/index"
        });
    }
});