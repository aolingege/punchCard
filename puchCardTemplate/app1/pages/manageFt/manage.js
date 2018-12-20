var t = new (function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")).default)();

Page({
    data: {
        userList: [],
        id: 0,
        ft_user: 0,
        ft_check: 0
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getHabitGroupUser(), this.getHabitGroupStatistics();
    },
    toCopyDirect: function() {
        wx.setClipboardData({
            data: "pages/checkFt/check?scene=" + this.data.id,
            success: function(t) {
                wx.showToast({
                    title: "直达路径复制成功",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    romoveGrouper: function(e) {
        var i = this, o = e.currentTarget.dataset.user;
        wx.showModal({
            title: "移出圈子成员提示",
            content: "移出该圈子成员，他的习惯、打卡记录等内容将会被删除，确定移出该圈子成员吗？",
            confirmText: "确定",
            confirmColor: "#ea2000",
            success: function(e) {
                e.confirm && t.deleteGroupUser(i.data.id, o).then(function(t) {
                    wx.showToast({
                        title: "移出成功",
                        icon: "none",
                        duration: 2e3
                    }), i.getHabitGroupUser(), i.getHabitGroupStatistics();
                }).catch(function(t) {
                    wx.showToast({
                        title: "操作失败",
                        icon: "none",
                        duration: 2e3
                    });
                });
            }
        });
    },
    getHabitGroupStatistics: function() {
        var e = this;
        t.getHabitGroupStatistics(this.data.id, "0").then(function(t) {
            e.setData({
                ft_user: t[0].u_count,
                ft_check: t[0].c_count
            });
        }).catch(function(t) {});
    },
    getHabitGroupUser: function() {
        var e = this;
        t.getHabitAllGroupUser(this.data.id).then(function(t) {
            t.length > 0 && e.setData({
                userList: t
            });
        }).catch(function(t) {});
    },
    toDirect: function(t) {
        wx.navigateTo({
            url: "../direct/direct?url=https://mp.weixin.qq.com/s/oMtsNJ9cDMhb4501gdrnIw&t=萌芽圈子直达服务"
        });
    }
});