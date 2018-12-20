function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        habitId: 0,
        habitName: "",
        insistDay: 0,
        habitData: "",
        currentIcon: "",
        iconList: [],
        currentPage: 0,
        loadMoreText: "加载更多图标",
        loadMore: !0
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            habitId: t.id,
            insistDay: t.day,
            habitName: t.name
        }), a.getHabit(this.data.habitId).then(function(t) {
            e.setData({
                habitData: t
            });
        }).catch(function(t) {});
    },
    onShow: function() {
        this.getIconList();
    },
    getIconList: function() {
        var e = this;
        this.data.loadMore && a.getHabitIcons(this.data.currentPage).then(function(a) {
            a.length > 0 ? e.setData({
                iconList: [].concat(t(e.data.iconList), t(a)),
                loadMore: a.length > 10,
                loadMoreText: a.length > 10 ? "加载更多图标" : "更多图标即将上线"
            }) : e.setData({
                loadMore: !1,
                loadMoreText: "更多图标即将上线"
            });
        }).catch(function(t) {});
    },
    onLoadMore: function() {
        this.setData({
            currentPage: this.data.currentPage + 1
        }), this.getIconList();
    },
    onSelectIcon: function(t) {
        var a = t.currentTarget.dataset.icon;
        this.setData({
            currentIcon: a
        });
    },
    onChange: function() {
        a.changeHabitIcon(this.data.habitId, this.data.currentIcon).then(function(t) {
            wx.showToast({
                title: "修改成功！",
                icon: "success",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack();
            }, 1500);
        }).catch(function(t) {});
    },
    toFeedback: function(t) {
        wx.navigateTo({
            url: "../feedback/send"
        });
    },
    onShareAppMessage: function(t) {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "修改图标",
            "按钮": "button" === t.from ? "推荐按钮" : "顶部按钮"
        }), {
            title: "遇见更好的自己，一起来吗？",
            path: "/pages/create/create",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});