var t = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        checkId: 0,
        note: "",
        userInfo: "",
        day: 0,
        habitName: "",
        canvasHeight: 300,
        page: 0
    },
    onLoad: function(t) {
        this.setData({
            checkId: t.id,
            day: t.day,
            habitName: t.name,
            page: t.page ? t.page : 0
        }), wx.showLoading({
            title: "图片生成中..."
        }), this.getNote();
    },
    onShow: function() {},
    backHome: function() {
        wx.switchTab({
            url: "../create/create"
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "我在培养「" + this.data.habitName + "」习惯，已经坚持" + this.data.day + "天。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    saveCardShow: function() {
        var t = this;
        wx.showModal({
            title: "卡片保存",
            content: "预览图会保存到相册，可分享给朋友",
            success: function(e) {
                e.confirm ? t.saveCard() : e.cancel && console.log("用户点击取消");
            },
            confirmText: "保存"
        });
    },
    getNote: function() {
        var e = this;
        t.getHabitNote(this.data.checkId).then(function(i) {
            e.setData({
                note: i,
                userInfo: t.getUserInfo()
            }), e.drawCard();
        }).catch(function(t) {
            t && t.info ? wx.showModal({
                title: "失败提示",
                content: "生成卡片失败",
                success: function(t) {
                    t.confirm ? wx.navigateBack() : t.cancel && (console.log("用户点击取消"), wx.navigateBack());
                }
            }) : wx.showToast({
                title: "生成卡片失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    getImageBack: function(t, e) {
        wx.getImageInfo({
            src: t,
            success: function(t) {
                e(t);
            }
        });
    },
    drawCard: function() {
        var t = this, e = wx.getSystemInfoSync().windowWidth, i = (wx.getSystemInfoSync().windowHeight, 
        this.data.habitName), a = this.data.day, n = this.data.note, l = n.add_time + "";
        l = l.split(" ")[0];
        var s = n.pic_url, o = this.data.userInfo.nickname, f = e / 750, c = wx.createCanvasContext("shareCanvas");
        c.setFillStyle("#ffffff"), c.fillRect(0, 0, 750 * f, 193 * f);
        var r = 100;
        if (c.setTextAlign("right"), c.setFillStyle("#29a1f7"), c.setFontSize(46 * f), c.fillText("第 " + a + " 天", 700 * f, r * f), 
        r += 51, c.setFillStyle("#666666"), c.setFontSize(28 * f), c.fillText("坚持" + i, 700 * f, r * f), 
        r += 40, c.setFillStyle("#999999"), c.setFontSize(24 * f), c.fillText(l, 700 * f, r * f), 
        null != s && "" != s && void 0 != s) this.getImageBack(s + "?x-oss-process=image/resize,w_650", function(e) {
            if (c.setFillStyle("#ffffff"), c.fillRect(0, r * f, 750 * f, (r + 45 + e.height) * f), 
            r += 45, c.drawImage(e.path, 50 * f, r * f, e.width * f, e.height * f), r += e.height, 
            null != n.note && null != n.note && void 0 != n.note) {
                var i = t.formatString(n.note, 23), a = 0;
                for (var l in i) a += 38;
                c.setFillStyle("#ffffff"), c.fillRect(0, r * f, 750 * f, (r + 55 + a) * f), r += 55, 
                c.setTextAlign("left"), c.setFillStyle("#666666"), c.setFontSize(28 * f);
                for (var l in i) c.fillText(i[l], 50 * f, r * f, 650 * f), r += 38;
            }
            c.setFillStyle("#ffffff"), c.fillRect(0, r * f, 750 * f, (r + 35 + 175) * f), r += 35, 
            c.setTextAlign("right"), c.setFillStyle("#999999"), c.setFontSize(24 * f), c.fillText("by" + o, 700 * f, r * f);
            var s = r + 55;
            c.drawImage("../../images/keep.jpg", 580 * f, s * f, 120 * f, 120 * f), c.setTextAlign("left"), 
            c.setFillStyle("#999999"), c.setFontSize(23 * f), c.fillText("余生很贵，不懈努力，", 332 * f, (s + 49) * f), 
            c.fillText("期待遇见更好的自己！", 332 * f, (s + 89) * f), c.setFillStyle("#cccccc"), c.setFontSize(19 * f), 
            c.fillText("萌芽习惯", 464 * f, (s + 120) * f), t.setData({
                canvasHeight: (s + 175) * f
            }), c.draw(), wx.hideLoading(), wx.showToast({
                title: "图片生成成功",
                icon: "none",
                duration: 1600
            });
        }); else {
            if (null != n.note && null != n.note && void 0 != n.note) {
                var h = t.formatString(n.note, 23), d = 0;
                for (var g in h) d += 38;
                c.setFillStyle("#ffffff"), c.fillRect(0, r * f, 750 * f, (r + 55 + d) * f), r += 55, 
                c.setTextAlign("left"), c.setFillStyle("#666666"), c.setFontSize(28 * f);
                for (var g in h) c.fillText(h[g], 50 * f, r * f, 650 * f), r += 38;
            }
            c.setFillStyle("#ffffff"), c.fillRect(0, r * f, 750 * f, (r + 35 + 175) * f), r += 35, 
            c.setTextAlign("right"), c.setFillStyle("#999999"), c.setFontSize(24 * f), c.fillText("by" + o, 700 * f, r * f);
            var u = r + 55;
            c.drawImage("../../images/keep.jpg", 580 * f, u * f, 120 * f, 120 * f), c.setTextAlign("left"), 
            c.setFillStyle("#999999"), c.setFontSize(23 * f), c.fillText("余生很贵，不懈努力，", 332 * f, (u + 49) * f), 
            c.fillText("期待遇见更好的自己！", 332 * f, (u + 89) * f), c.setFillStyle("#cccccc"), c.setFontSize(19 * f), 
            c.fillText("萌芽习惯", 464 * f, (u + 120) * f), t.setData({
                canvasHeight: (u + 175) * f
            }), c.draw(), wx.hideLoading(), wx.showToast({
                title: "图片生成成功",
                icon: "none",
                duration: 1600
            });
        }
    },
    saveCard: function() {
        wx.showLoading({
            title: "保存中..."
        });
        var t = wx.getSystemInfoSync().windowWidth / 750, e = this.data.canvasHeight;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750 * t,
            height: e,
            destWidth: 750 * t * 2,
            destHeight: 2 * e,
            canvasId: "shareCanvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function() {
                        wx.hideLoading(), wx.showToast({
                            title: "已保存到相册,去分享到朋友圈或微博吧",
                            icon: "none",
                            duration: 3e3
                        });
                    },
                    fail: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
        var i = getApp(), a = this.data.habitName, n = this.data.userInfo.nickname;
        i.aldstat.sendEvent("保存卡片", {
            "习惯名称": a,
            "用户名": n
        });
    },
    formatString: function(t, e) {
        for (var i = (t += "").split(/[\n,]/g), a = new Array(), n = 0; n < i.length; n++) for (var l = i[n], s = (l.length, 
        0); s < l.length / e; s++) {
            var o = l.substring(s * e, (s + 1) * e);
            a.push(o);
        }
        return a;
    }
});