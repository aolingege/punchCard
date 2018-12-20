function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
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

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./BaseService")), i = require("../utils/http"), u = function(u) {
    function o() {
        return e(this, o), t(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
    }
    return n(o, s.default), r(o, [ {
        key: "sendFeedback",
        value: function(e, t) {
            return (0, i.get)("/HabitFeedBack/addFeedBack", {
                content: e,
                email: t,
                user_id: this.getUserId()
            }, {
                loadingMsg: "发送反馈中"
            }).then(this.handleRespond);
        }
    }, {
        key: "openVip",
        value: function() {
            return (0, i.get)("/HabitTrade/vipPay", {
                user_id: this.getUserId()
            }, {
                loadingMsg: "请求支付中"
            }).then(this.handleRespond);
        }
    }, {
        key: "freeOpenVip",
        value: function() {
            return (0, i.get)("/HabitTrade/freePay", {
                user_id: this.getUserId()
            }, {
                loadingMsg: "请求支付中"
            }).then(this.handleRespond);
        }
    }, {
        key: "paySuccess",
        value: function(e) {
            return (0, i.get)("/HabitTrade/wxPaySuccess", {
                out_trade_no: e,
                user_id: this.getUserId()
            }, {
                loadingMsg: "请求支付中"
            }).then(this.handleRespond);
        }
    }, {
        key: "updateUserInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = this, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            return (0, i.get)("/HabitUser/updateUser", {
                nickname: e,
                private_pwd: t,
                email: r,
                signature: s,
                user_id: this.getUserId()
            }, {
                noNeedPsw: !0
            }).then(this.handleRespond).then(function(e) {
                return n.app.updateUserInfo(e), e;
            });
        }
    }, {
        key: "updateUserAvatar",
        value: function(e) {
            var t = this;
            return (0, i.get)("/HabitUser/updateAvatar", {
                avatar_small: e,
                user_id: this.getUserId()
            }, {
                noNeedPsw: !0
            }).then(this.handleRespond).then(function(e) {
                return t.app.updateUserInfo(e), e;
            });
        }
    }, {
        key: "getUserInfoFromRemote",
        value: function() {
            var e = this;
            return (0, i.get)("/HabitUser/getUserInfo", {
                user_id: this.getUserId()
            }).then(this.handleRespond).then(function(t) {
                return e.app.updateUserInfo(t), t;
            });
        }
    }, {
        key: "getOtherUserInfo",
        value: function(e) {
            return (0, i.get)("/HabitUser/getOtherUserData", {
                user_id: this.getUserId(),
                target_user_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "setPravitePsw",
        value: function(e, t) {
            return this.updateUserInfo(null, e, t);
        }
    }, {
        key: "fetchVerifyCode",
        value: function() {
            return (0, i.get)("/HabitUser/sendEmail", {
                user_id: this.getUserId()
            }, {
                noNeedPsw: !0,
                loadingMsg: "loading"
            }).then(this.handleRespond);
        }
    }, {
        key: "verifyCode",
        value: function(e) {
            return (0, i.get)("/HabitUser/sendEmail", {
                user_id: this.getUserId()
            }, {
                noNeedPsw: !0
            }).then(this.handleRespond);
        }
    }, {
        key: "getGroupQRCode",
        value: function(e) {
            return (0, i.get)("/HabitUser/getGroupQRCode", {
                habit_id: e,
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getFreeGroupCount",
        value: function(e) {
            return (0, i.get)("/HabitUser/getGroupToFree", {
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "getUserMsg",
        value: function(e) {
            return (0, i.get)("/HabitUser/getUserMessage", {
                user_id: this.getUserId(),
                num: e
            }).then(this.handleRespond);
        }
    }, {
        key: "syncUnReadMsgCount",
        value: function() {
            return (0, i.get)("/HabitUser/getUnReadMsgCount", {
                user_id: this.getUserId()
            }).then(this.handleRespond).then(function(e) {
                return parseInt(e) > 0 ? wx.showTabBarRedDot({
                    index: 3
                }) : wx.hideTabBarRedDot({
                    index: 3
                }), e;
            });
        }
    }, {
        key: "getUserEnergy",
        value: function() {
            return (0, i.get)("/HabitUser/getUserEnergy", {
                user_id: this.getUserId()
            }).then(this.handleRespond);
        }
    }, {
        key: "giveUserEnergy",
        value: function(e, t) {
            return (0, i.get)("/HabitUser/giveUserEnergy", {
                user_give: this.getUserId(),
                user_obtain: e,
                habit_id: t
            }).then(this.handleRespond);
        }
    }, {
        key: "getUserEnergyById",
        value: function(e) {
            return (0, i.get)("/HabitUser/getUserEnergy", {
                user_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "getUserRecommendMina",
        value: function() {
            return (0, i.get)("/HabitUser/recommendMina", {
                account_type: -1
            }).then(this.handleRespond);
        }
    }, {
        key: "followUser",
        value: function(e) {
            return (0, i.get)("/HabitUser/followUser", {
                user_id: this.getUserId(),
                followed_user_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "cancelFollow",
        value: function(e) {
            return (0, i.get)("/HabitUser/cancelFollow", {
                user_id: this.getUserId(),
                followed_user_id: e
            }).then(this.handleRespond);
        }
    }, {
        key: "getFollowerList",
        value: function(e, t) {
            return (0, i.get)("/HabitUser/getFollowerList", {
                user_id: this.getUserId(),
                t_user_id: e,
                page: t
            }).then(this.handleRespond);
        }
    }, {
        key: "getAttentionList",
        value: function(e, t) {
            return (0, i.get)("/HabitUser/getAttentionList", {
                user_id: this.getUserId(),
                t_user_id: e,
                page: t
            }).then(this.handleRespond);
        }
    } ]), o;
}();

exports.default = u;