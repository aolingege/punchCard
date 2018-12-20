var t = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        habitId: 0,
        day: 1,
        habitName: "",
        imageData: ""
    },
    onLoad: function(t) {
        this.setData({
            habitId: t.id,
            day: t.day,
            habitName: t.name
        }), console.log(t);
    },
    onShow: function() {
        var e = this;
        wx.showLoading({
            title: "卡片生成中..."
        }), t.getCard().then(function(a) {
            e.setData({
                imageData: a[0].url
            }), t.getHabit(e.data.habitId).then(function(t) {
                e.setData({
                    habitName: t.name
                }), e.drawCard();
            }).catch(function(t) {});
        }).catch(function(t) {
            console.log(t);
        });
    },
    randCard: function() {
        var e = this;
        wx.showLoading({
            title: "卡片生成中..."
        }), t.getRandCard().then(function(t) {
            e.setData({
                imageData: t[0].url
            }), e.drawCard();
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
        t.getUserInfo();
        var e = wx.getSystemInfoSync().windowWidth, a = (wx.getSystemInfoSync().windowHeight, 
        "#" + this.data.habitName + "#"), i = this.data.day, n = new Date(), o = n.getMonth() + 1;
        o = o < 10 ? "0" + o : o;
        var s = n.getDate() < 10 ? "0" + n.getDate() : n.getDate(), d = e / 750, l = wx.createCanvasContext("shareCanvas");
        this.getImageBack(this.data.imageData, function(t) {
            l.setFillStyle("#ffffff"), l.fillRect(0, 0, 620 * d, 500 * d), l.drawImage(t.path, 10 * d, 10 * d, 600 * d, 300 * d), 
            l.drawImage("../../images/day_card_bg.png", 28 * d, 28 * d, 52 * d, 52 * d), l.setTextAlign("right"), 
            l.setFillStyle("#ffffff"), l.setFontSize(21 * d), l.fillText(o, 56 * d, 52 * d), 
            l.fillText(s, 75 * d, 73 * d), l.setFontSize(25 * d), l.fillText(a, 595 * d, 55 * d), 
            l.setFontSize(28 * d), l.fillText("第" + i + "天", 595 * d, 97 * d), l.drawImage("../../images/day_card.jpg", 40 * d, 340 * d, 130 * d, 130 * d), 
            l.setFillStyle("#f2bc00"), l.setTextAlign("left"), l.setFontSize(35 * d), l.fillText("#", 270 * d, 421 * d), 
            l.setFillStyle("#585858"), l.setFontSize(32 * d), l.setTextAlign("left"), l.fillText("遇见更好的自己", 308 * d, 418 * d), 
            l.draw(), wx.hideLoading();
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
            width: 620 * t,
            height: 500 * t,
            destWidth: 1240,
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