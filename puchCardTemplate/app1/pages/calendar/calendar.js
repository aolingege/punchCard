var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../serivce/HabitService")), a = {
    data: {
        id: 0,
        name: "",
        hasEmptyGrid: !1,
        checkDays: [],
        checkNum: 0,
        continueCount: 0,
        startNum: 0
    },
    getCheckDayByUser: function(a) {
        var e = this;
        new t.default().getCheckDays(a).then(function(t) {
            e.setData({
                checkDays: t.checkDays,
                checkNum: t.checkNum,
                continueCount: t.continueCount,
                startNum: "未知" == t.disDays ? "未知" : parseInt(t.disDays) + 1
            });
            var a = new Date(), s = a.getFullYear(), r = a.getMonth() + 1;
            e.calculateDays(s, r);
        }).catch(function(t) {
            wx.showToast({
                title: t.info || "获取数据失败",
                icon: "warn",
                duration: 2e3
            });
        });
    },
    initCalendar: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1, s = [ "日", "一", "二", "三", "四", "五", "六" ];
        this.calculateEmptyGrids(a, e), this.calculateDays(a, e, !1), this.setData({
            cur_year: a,
            cur_month: e,
            weeks_ch: s
        });
    },
    onLoad: function(t) {
        this.initCalendar(), this.getCheckDayByUser(t.id);
    },
    getThisMonthDays: function(t, a) {
        return new Date(t, a, 0).getDate();
    },
    getFirstDayOfWeek: function(t, a) {
        return new Date(Date.UTC(t, a - 1, 1)).getDay();
    },
    calculateEmptyGrids: function(t, a) {
        var e = this.getFirstDayOfWeek(t, a), s = [];
        if (e > 0) {
            for (var r = 0; r < e; r++) s.push(r);
            this.setData({
                hasEmptyGrid: !0,
                empytGrids: s
            });
        } else this.setData({
            hasEmptyGrid: !1,
            empytGrids: []
        });
    },
    isCheckDay: function(t, a, e) {
        for (var s = this.data.checkDays, r = 0; r < s.length; r++) {
            var n = s[r].split("-");
            if (parseInt(n[0]) == t && parseInt(n[1]) == a && parseInt(n[2]) == e) return !0;
        }
        return !1;
    },
    calculateDays: function(t, a) {
        for (var e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], s = [], r = this.getThisMonthDays(t, a), n = 1; n <= r; n++) {
            var i = !1;
            e && (i = this.isCheckDay(t, a, n)), s.push({
                day: n,
                choosed: i
            });
        }
        this.setData({
            days: s
        });
    },
    handleCalendar: function(t) {
        var a = t.currentTarget.dataset.handle, e = this.data.cur_year, s = this.data.cur_month;
        if ("prev" === a) {
            var r = s - 1, n = e;
            r < 1 && (n = e - 1, r = 12), this.calculateDays(n, r), this.calculateEmptyGrids(n, r), 
            this.setData({
                cur_year: n,
                cur_month: r
            });
        } else {
            var i = s + 1, c = e;
            i > 12 && (c = e + 1, i = 1), this.calculateDays(c, i), this.calculateEmptyGrids(c, i), 
            this.setData({
                cur_year: c,
                cur_month: i
            });
        }
    },
    tapDayItem: function(t) {
        var a = t.currentTarget.dataset.idx, e = this.data.days;
        e[a].choosed = !e[a].choosed, this.setData({
            days: e
        });
    },
    onShareAppMessage: function() {
        return getApp().aldstat.sendEvent("用户分享", {
            "位置": "打卡日历",
            "按钮": "顶部按钮"
        }), {
            title: "打卡日历",
            desc: "每天培养习惯，一步一个脚印。",
            path: "pages/create/create"
        };
    }
};

Page(a);