function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var e = o(require("../../utils/we-cropper.js")), t = o(require("../../serivce/OssService")), n = new (o(require("../../serivce/UserService")).default)(), c = wx.getSystemInfoSync(), i = c.windowWidth, r = c.windowHeight - 50;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: i,
            height: r,
            scale: 2.5,
            zoom: 8,
            withRadio: !1,
            cut: {
                x: (i - 300) / 2,
                y: (r - 300) / 2,
                width: 300,
                height: 300
            }
        }
    },
    touchStart: function(o) {
        this.wecropper.touchStart(o);
    },
    touchMove: function(o) {
        this.wecropper.touchMove(o);
    },
    touchEnd: function(o) {
        this.wecropper.touchEnd(o);
    },
    getCropperImage: function() {
        this.wecropper.getCropperImage(function(o) {
            o ? (wx.showLoading({
                title: "上传中..."
            }), new t.default().uploadFile(o).then(function(o) {
                n.updateUserAvatar(o).then(function(e) {
                    wx.hideLoading(), console.log(o), wx.showToast({
                        title: "头像更新成功",
                        icon: "none",
                        duration: 2e3
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1500);
                }).catch(function(o) {
                    console.log(o), wx.showToast({
                        title: "文件上传失败",
                        icon: "warn",
                        duration: 2e3
                    });
                });
            }).catch(function(o) {
                console.log(o), wx.hideLoading(), wx.showToast({
                    title: "文件上传失败",
                    icon: "warn",
                    duration: 2e3
                });
            })) : wx.showToast({
                title: "文件上传失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    uploadTap: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths[0];
                o.wecropper.pushOrign(t);
            }
        });
    },
    onLoad: function(o) {
        var t = this.data.cropperOpt;
        console.log(o), o.src && (t.src = o.src, new e.default(t).on("ready", function(o) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(o) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", o), 
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(o) {
            console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast();
        }).on("beforeDraw", function(o, e) {
            console.log("before canvas draw,i can do something"), console.log("current canvas context:", o);
        }).updateCanvas());
    }
});