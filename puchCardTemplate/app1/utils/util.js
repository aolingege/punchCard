function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, r = e.getDate(), a = e.getHours(), i = e.getMinutes(), u = e.getSeconds();
        return [ n, o, r ].map(t).join("/") + " " + [ a, i, u ].map(t).join(":");
    },
    formatToday: function(e) {
        return [ e.getMonth() + 1, e.getDate() ].map(t).join("/");
    },
    formatYesterday: function(e) {
        return e.setTime(e.getTime() - 864e5), [ e.getMonth() + 1, e.getDate() ].map(t).join("/");
    }
};