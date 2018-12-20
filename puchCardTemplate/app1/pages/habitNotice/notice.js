var t = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        habitId: 0,
        notice: ""
    },
    onLoad: function(t) {
        this.setData({
            habitId: t.id
        });
    },
    onShow: function() {
        this.getHabitNotice();
    },
    getHabitNotice: function() {
        var i = this;
        t.getHabitNotice(this.data.habitId).then(function(t) {
            i.setData({
                notice: t.notice
            });
        }).catch(function(t) {});
    },
    noticeInput: function(t) {
        var i = t.detail.value + "";
        this.setData({
            notice: i
        });
    },
    onChangeNotice: function() {
        this.data.notice.length <= 0 ? wx.showToast({
            title: "请填写公告",
            icon: "warn",
            duration: 2e3
        }) : t.changeHabitNotice(this.data.habitId, this.data.notice).then(function(t) {
            wx.showToast({
                title: "修改成功",
                icon: "success",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack();
            }, 1500);
        }).catch(function(t) {
            wx.showToast({
                title: "修改失败,请重试",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    onShareAppMessage: function() {
        return {
            title: "我在坚持培养好习惯，期待成长，遇见更好的自己。",
            path: "/pages/habit/habit",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});