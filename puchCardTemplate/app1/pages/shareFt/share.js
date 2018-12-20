function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../serivce/UserService")), a = new (t(require("../../serivce/HabitService")).default)();

Page({
    data: {
        habitId: 0,
        habitName: "",
        imageData: ""
    },
    onLoad: function(t) {
        this.setData({
            habitId: t.habitId
        });
    },
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "生成中..."
        }), new e.default().getGroupQRCode(this.data.habitId).then(function(e) {
            t.setData({
                imageData: e
            }), a.getHabit(t.data.habitId).then(function(e) {
                t.setData({
                    habitName: e.name
                }), t.drawCard();
            }).catch(function(t) {});
        }).catch(function(t) {
            console.log(t);
        });
    },
    getImageBack: function(t, e) {
        wx.getImageInfo({
            src: t,
            success: function(t) {
                e(t);
            },
            fail: function() {
                wx.hideLoading();
            }
        });
    },
    drawCard: function() {
        console.log("start");
        a.getUserInfo();
        var t = wx.getSystemInfoSync().windowWidth, e = (wx.getSystemInfoSync().windowHeight, 
        "#" + this.data.habitName + "#"), i = t / 750, n = wx.createCanvasContext("shareCanvas");
        console.log(this.data.imageData);
        this.getImageBack(this.data.imageData, function(t) {
            n.setFillStyle("#ffffff"), n.fillRect(0, 0, 680 * i, 680 * i), n.drawImage(t.path, 150 * i, 166 * i, 380 * i, 380 * i), 
            n.setTextAlign("center"), n.setFillStyle("#1f82d2"), n.setFontSize(36 * i), n.fillText(e, 340 * i, 80 * i), 
            n.setFillStyle("#444444"), n.setFontSize(28 * i), n.fillText("邀请你加入一起坚持", 340 * i, 134 * i), 
            n.setFillStyle("#444444"), n.setFontSize(28 * i), n.fillText("微信长按或扫码进入", 340 * i, 600 * i), 
            n.setFillStyle("#666666"), n.setFontSize(24 * i), n.fillText("萌芽习惯·小程序·遇见更好的自己", 340 * i, 645 * i), 
            n.draw(), wx.hideLoading();
        });
    },
    saveCard: function() {
        wx.showLoading({
            title: "保存中..."
        });
        var t = wx.getSystemInfoSync().windowWidth / 750;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 680 * t,
            height: 680 * t,
            destWidth: 1e3,
            destHeight: 1e3,
            canvasId: "shareCanvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function() {
                        wx.hideLoading(), wx.showToast({
                            title: "已保存到相册",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    }
});