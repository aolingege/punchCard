function e(e, t) {
    for (var r = "", n = 0; n < e - 1; n++) r += "../";
    return r + t;
}

function t(t, o) {
    try {
        var c = getCurrentPages().length, a = getCurrentPages()[c - 1].route;
        if (a === i) return;
        if (i = a, n(), t.path === a) return;
        var s = e(a.split("/").length, t.path), f = r(t.params, s), l = u({}, t, {
            url: f
        });
        wx[o].call(null, l);
    } catch (e) {
        console.log(e);
    }
}

function r(e, t) {
    if (!e) return t;
    var r = Object.keys(e), n = "";
    return 0 === r.length ? t : (n = -1 === t.indexOf("?") ? r.reduce(function(t, r) {
        return t + r + "=" + e[r] + "&";
    }, t + "?") : t.endsWith("?") ? r.reduce(function(t, r) {
        return t + r + "=" + e[r] + "&";
    }, t) : t.endsWith("&") ? r.reduce(function(t, r) {
        return t + r + "=" + e[r] + "&";
    }, t) : r.reduce(function(t, r) {
        return t + r + "=" + e[r] + "&";
    }, t + "&")).endsWith("&") ? n.slice(0, n.length - 1) : n;
}

function n() {
    setTimeout(function() {
        i = "";
    }, 0);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
};

exports.navigate = function() {
    return t(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, "navigateTo");
}, exports.redirect = function() {
    return t(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, "redirectTo");
}, exports.switchTab = function() {
    return t(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, "switchTab");
}, exports.reLaunch = function() {
    return t(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, "reLaunch");
};

var i = "";