function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function i(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./BaseService")), a = require("../utils/http"), r = function(r) {
    function d() {
        return e(this, d), t(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
    }
    return i(d, s.default), n(d, [ {
        key: "getHabits",
        value: function() {
            return (0, a.get)("/HabitList/getUserHabitList", {
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getUserHabits",
        value: function(e) {
            return (0, a.get)("/HabitList/getOtherUserHabitList", {
                user_id: this.getUserId(),
                other_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/getHabitInfo", {
                user_id: this.getUserId(),
                habit_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "deleteHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/deleteHabit", {
                id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: "删除中"
            }).then(this.handleRespond);
        }
    }, {
        key: "createHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/createHabit", {
                name: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: "创建中"
            }).then(this.handleRespond);
        }
    }, {
        key: "joinHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/joinHabit", {
                habit_id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: "加入中..."
            }).then(this.handleRespond);
        }
    }, {
        key: "createGroupHabit",
        value: function(e, t, i) {
            return (0, a.get)("/HabitList/createGroupHabit", {
                name: e,
                habit_type: t,
                notice: i,
                user_id: this.getUserId()
            }, {
                loadingMsg: "创建中"
            }).then(this.handleRespond);
        }
    }, {
        key: "joinGroupHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/joinGroupHabit", {
                habit_id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: "加入中..."
            }).then(this.handleRespond);
        }
    }, {
        key: "searchHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/searchHabit", {
                name: e
            }).then(this.handleRespond);
        }
    }, {
        key: "getRecommendHabit",
        value: function(e) {
            return (0, a.get)("/HabitList/getRecommendHabit", {
                type: e
            }, {
                noNeedPsw: !0
            }).then(this.handleRespond);
        }
    }, {
        key: "getRecommendHabitBySearch",
        value: function(e) {
            return (0, a.get)("/HabitList/getRecommendBySearch", {
                content: e
            }, {
                noNeedPsw: !0
            }).then(this.handleRespond);
        }
    }, {
        key: "getGroupOpenHabit",
        value: function() {
            return (0, a.get)("/HabitList/getGroupOpenHabit", {}, {
                noNeedPsw: !0
            }).then(this.handleRespond);
        }
    }, {
        key: "getRecommendType",
        value: function() {
            return (0, a.get)("/HabitList/getRecommendTypeList").then(this.handleRespond);
        }
    }, {
        key: "getHabitIcons",
        value: function(e) {
            return (0, a.get)("/HabitList/getHabitIconList", {
                page: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "changeHabitIcon",
        value: function(e, t) {
            return (0, a.get)("/HabitList/changeHabitIcon", {
                habit_id: e,
                user_id: this.getUserId(),
                url: t
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitNoteList",
        value: function(e, t) {
            return (0, a.get)("/HabitNote/getHabitNoteList", {
                habit_id: e,
                num: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getUserHabitNoteList",
        value: function(e, t, i) {
            return (0, a.get)("/HabitNote/getHabitNoteList", {
                habit_id: t,
                num: i,
                user_id: void 0 == e || 0 == e ? this.getUserId() : e
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitGroupNote",
        value: function(e, t, i) {
            return (0, a.get)("/HabitNote/getHabitGroupNote", {
                habit_id: e,
                num: t,
                user_id: this.getUserId(),
                personal: i
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitGroupStatistics",
        value: function(e, t) {
            return (0, a.get)("/HabitNote/getHabitGroupStatistics", {
                habit_id: e,
                day_last: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitGroupUser",
        value: function(e, t, i) {
            return (0, a.get)("/HabitNote/getHabitGroupUser", {
                habit_id: e,
                num: i,
                day_last: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitAllGroupUser",
        value: function(e) {
            return (0, a.get)("/HabitNote/getHabitGroupUser", {
                habit_id: e,
                num: 0,
                day_last: 0,
                user_id: this.getUserId(),
                size: "1000"
            }).then(this.handleRespond);
        }
    }, {
        key: "deleteGroupUser",
        value: function(e, t) {
            return (0, a.get)("/HabitNote/deleteGroupUser", {
                habit_id: e,
                delete_id: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "likeNote",
        value: function(e) {
            return (0, a.get)("/HabitNote/likeNote", {
                note_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "cancelLikeNote",
        value: function(e) {
            return (0, a.get)("/HabitNote/cancelLikeNote", {
                note_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "commentNote",
        value: function(e, t, i) {
            return (0, a.get)("/HabitNote/commentNote", {
                note_id: e,
                user_id: this.getUserId(),
                content: t,
                be_commented_id: i
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitNotice",
        value: function(e) {
            return (0, a.get)("/HabitList/getHabitNotice", {
                habit_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "changeHabitNotice",
        value: function(e, t) {
            return (0, a.get)("/HabitList/changeHabitNotice", {
                habit_id: e,
                user_id: this.getUserId(),
                notice: t
            }).then(this.handleRespond);
        }
    }, {
        key: "findHabitCheck",
        value: function(e, t) {
            return (0, a.get)("/HabitCheck/findHabitCheck", {
                id: e,
                user_id: this.getUserId(),
                isRepair: t ? 1 : 0
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitTree",
        value: function(e, t) {
            return (0, a.get)("/HabitCheck/getHabitTree", {
                id: e,
                user_id: t
            }).then(this.handleRespond);
        }
    }, {
        key: "checkHabit",
        value: function(e) {
            return (0, a.get)("/HabitCheck/addCheck", {
                id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: ""
            }).then(this.handleRespond);
        }
    }, {
        key: "checkYesterdayHabit",
        value: function(e) {
            return (0, a.get)("/HabitCheck/addYesterdayCheck", {
                id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: ""
            }).then(this.handleRespond);
        }
    }, {
        key: "isCheckYesterday",
        value: function(e) {
            return (0, a.get)("/HabitCheck/isCheckYesterday", {
                id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "cancelHabit",
        value: function(e) {
            return (0, a.get)("/HabitCheck/cancelCheck", {
                id: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: ""
            }).then(this.handleRespond);
        }
    }, {
        key: "addRecord",
        value: function(e, t, i, n) {
            return (0, a.post)("/HabitNote/addRecord", {
                check_id: e,
                habit_id: t,
                picUrl: n,
                note: i,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "addYesterdayRecord",
        value: function(e, t, i, n) {
            return (0, a.post)("/HabitNote/addYesterdayRecord", {
                check_id: e,
                habit_id: t,
                picUrl: n,
                note: i,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getCheckDays",
        value: function(e) {
            return (0, a.get)("/HabitCheck/findCheckDays", {
                id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitNote",
        value: function(e) {
            return (0, a.get)("/HabitNote/getHabitNoteById", {
                check_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getMindNoteList",
        value: function(e, t) {
            var i = "getHabitNoteOpenList";
            return 0 == t ? i = "getHotNoteOpenList" : 1 == t && (i = "listAllNotesByAttention"), 
            (0, a.get)("/HabitNote/" + i, {
                last_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHotNoteOpenList",
        value: function(e) {
            return (0, a.get)("/HabitNote/getHotNoteOpenList", {
                last_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitNoteOpen",
        value: function(e) {
            return (0, a.get)("/HabitNote/getHabitNoteOpenList", {
                last_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "listAllNotesByAttention",
        value: function(e) {
            return (0, a.get)("/HabitNote/listAllNotesByAttention", {
                last_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getOpenNoteByHabit",
        value: function(e, t) {
            return (0, a.get)("/HabitNote/getOpenNoteByHabit", {
                habit_id: e,
                last_id: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getOpenNoteByUser",
        value: function(e, t) {
            return (0, a.get)("/HabitNote/getNoteByUser", {
                other_id: e,
                last_id: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getCard",
        value: function() {
            return (0, a.get)("/HabitNote/getTodayCard", {
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getRandCard",
        value: function() {
            return (0, a.get)("/HabitNote/getRandCard", {
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "setHabitPrivate",
        value: function(e, t) {
            return (0, a.get)("/HabitList/setHabitPrivate", {
                habit_id: e,
                is_private: t,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "setUserCanMsg",
        value: function(e) {
            return (0, a.get)("/HabitUser/setUserCanMsg", {
                can_msg: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getHabitNoteShare",
        value: function(e) {
            return (0, a.get)("/HabitNote/getHabitNoteShare", {
                id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getShareGroupHabit",
        value: function(e, t) {
            return (0, a.get)("/HabitList/getShareGroupHabit", {
                habit_id: e,
                user_id: t
            }).then(this.handleRespond);
        }
    } ]), d;
}();

exports.default = r;