Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.throttle = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, r = arguments[2], n = null;
    return function() {
        try {
            if (n) return !1;
            n = setTimeout(function() {
                n = null;
            }, e);
            for (var o = arguments.length, l = Array(o), u = 0; u < o; u++) l[u] = arguments[u];
            t.apply(r || this, l);
        } catch (t) {
            console.log(t);
        }
    };
};