function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/HabitService")), a = t(require("../../serivce/OssService")), i = (require("../../utils/router"), 
new e.default());

Page({
    data: {
        canLook: !1,
        content: "",
        imageSrc: "",
        habitId: 0,
        checkId: 0,
        isRepair: !1
    },
    onLoad: function(t) {
        this.setData({
            habitId: t.habitId,
            checkId: t.c,
            canLook: "true" != t.p,
            isRepair: "true" == t.r
        }), 0 == this.data.checkId && (wx.showToast({
            title: "请重新进入记录",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            wx.navigateBack();
        }, 2e3)), console.log(t.p), wx.hideLoading();
    },
    onShow: function() {
        console.log(this.data.canLook);
    },
    contentInput: function(t) {
        var e = t.detail.value + "";
        this.setData({
            content: e
        });
    },
    selectImage: function() {
        var t = this, e = getApp();
        e.preventLock(), wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e), t.setData({
                    imageSrc: e.tempFilePaths
                });
            },
            fail: function() {},
            complete: function() {
                e.allowLock();
            }
        });
    },
    onSend: function() {
        "" != this.data.content || "" != this.data.imageSrc ? (wx.showLoading({
            title: "发送中..."
        }), "" == this.data.imageSrc ? this.addNote() : this.addNoteWithPic()) : wx.showToast({
            title: "发送内容不能空",
            icon: "none",
            duration: 2e3
        });
    },
    addNoteWithPic: function() {
        var t = this, e = new a.default(), i = this.data.imageSrc[0];
        e.uploadFile(i).then(function(e) {
            t.addNote(e);
        }).catch(function(t) {
            console.log(t), wx.hideLoading(), wx.showToast({
                title: "文件上传失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    addNote: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.data.isRepair ? i.addYesterdayRecord(this.data.checkId, this.data.habitId, this.data.content, t).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "补卡心情发送成功",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t.info || "添加失败",
                icon: "warn",
                duration: 2e3
            });
        }) : i.addRecord(this.data.checkId, this.data.habitId, this.data.content, t).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "发送成功,能量+1g",
                icon: "none",
                duration: 2e3
            });
            var e = getCurrentPages(), a = e[e.length - 2];
            a.data;
            a.setData({
                isRecord: !0
            }), setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t.info || "添加失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    onShareAppMessage: function() {}
});