function r(r, n) {
    r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
    for (var c = 1732584193, a = -271733879, h = -1732584194, i = 271733878, l = 0; l < r.length; l += 16) {
        var m = c, d = a, g = h, v = i;
        a = o(a = o(a = o(a = o(a = u(a = u(a = u(a = u(a = e(a = e(a = e(a = e(a = t(a = t(a = t(a = t(a, h = t(h, i = t(i, c = t(c, a, h, i, r[l + 0], 7, -680876936), a, h, r[l + 1], 12, -389564586), c, a, r[l + 2], 17, 606105819), i, c, r[l + 3], 22, -1044525330), h = t(h, i = t(i, c = t(c, a, h, i, r[l + 4], 7, -176418897), a, h, r[l + 5], 12, 1200080426), c, a, r[l + 6], 17, -1473231341), i, c, r[l + 7], 22, -45705983), h = t(h, i = t(i, c = t(c, a, h, i, r[l + 8], 7, 1770035416), a, h, r[l + 9], 12, -1958414417), c, a, r[l + 10], 17, -42063), i, c, r[l + 11], 22, -1990404162), h = t(h, i = t(i, c = t(c, a, h, i, r[l + 12], 7, 1804603682), a, h, r[l + 13], 12, -40341101), c, a, r[l + 14], 17, -1502002290), i, c, r[l + 15], 22, 1236535329), h = e(h, i = e(i, c = e(c, a, h, i, r[l + 1], 5, -165796510), a, h, r[l + 6], 9, -1069501632), c, a, r[l + 11], 14, 643717713), i, c, r[l + 0], 20, -373897302), h = e(h, i = e(i, c = e(c, a, h, i, r[l + 5], 5, -701558691), a, h, r[l + 10], 9, 38016083), c, a, r[l + 15], 14, -660478335), i, c, r[l + 4], 20, -405537848), h = e(h, i = e(i, c = e(c, a, h, i, r[l + 9], 5, 568446438), a, h, r[l + 14], 9, -1019803690), c, a, r[l + 3], 14, -187363961), i, c, r[l + 8], 20, 1163531501), h = e(h, i = e(i, c = e(c, a, h, i, r[l + 13], 5, -1444681467), a, h, r[l + 2], 9, -51403784), c, a, r[l + 7], 14, 1735328473), i, c, r[l + 12], 20, -1926607734), h = u(h, i = u(i, c = u(c, a, h, i, r[l + 5], 4, -378558), a, h, r[l + 8], 11, -2022574463), c, a, r[l + 11], 16, 1839030562), i, c, r[l + 14], 23, -35309556), h = u(h, i = u(i, c = u(c, a, h, i, r[l + 1], 4, -1530992060), a, h, r[l + 4], 11, 1272893353), c, a, r[l + 7], 16, -155497632), i, c, r[l + 10], 23, -1094730640), h = u(h, i = u(i, c = u(c, a, h, i, r[l + 13], 4, 681279174), a, h, r[l + 0], 11, -358537222), c, a, r[l + 3], 16, -722521979), i, c, r[l + 6], 23, 76029189), h = u(h, i = u(i, c = u(c, a, h, i, r[l + 9], 4, -640364487), a, h, r[l + 12], 11, -421815835), c, a, r[l + 15], 16, 530742520), i, c, r[l + 2], 23, -995338651), h = o(h, i = o(i, c = o(c, a, h, i, r[l + 0], 6, -198630844), a, h, r[l + 7], 10, 1126891415), c, a, r[l + 14], 15, -1416354905), i, c, r[l + 5], 21, -57434055), h = o(h, i = o(i, c = o(c, a, h, i, r[l + 12], 6, 1700485571), a, h, r[l + 3], 10, -1894986606), c, a, r[l + 10], 15, -1051523), i, c, r[l + 1], 21, -2054922799), h = o(h, i = o(i, c = o(c, a, h, i, r[l + 8], 6, 1873313359), a, h, r[l + 15], 10, -30611744), c, a, r[l + 6], 15, -1560198380), i, c, r[l + 13], 21, 1309151649), h = o(h, i = o(i, c = o(c, a, h, i, r[l + 4], 6, -145523070), a, h, r[l + 11], 10, -1120210379), c, a, r[l + 2], 15, 718787259), i, c, r[l + 9], 21, -343485551), 
        c = f(c, m), a = f(a, d), h = f(h, g), i = f(i, v);
    }
    return Array(c, a, h, i);
}

function n(r, n, t, e, u, o) {
    return f(a(f(f(n, r), f(e, o)), u), t);
}

function t(r, t, e, u, o, c, f) {
    return n(t & e | ~t & u, r, t, o, c, f);
}

function e(r, t, e, u, o, c, f) {
    return n(t & u | e & ~u, r, t, o, c, f);
}

function u(r, t, e, u, o, c, f) {
    return n(t ^ e ^ u, r, t, o, c, f);
}

function o(r, t, e, u, o, c, f) {
    return n(e ^ (t | ~u), r, t, o, c, f);
}

function c(n, t) {
    var e = h(n);
    e.length > 16 && (e = r(e, n.length * v));
    for (var u = Array(16), o = Array(16), c = 0; c < 16; c++) u[c] = 909522486 ^ e[c], 
    o[c] = 1549556828 ^ e[c];
    var f = r(u.concat(h(t)), 512 + t.length * v);
    return r(o.concat(f), 640);
}

function f(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

function a(r, n) {
    return r << n | r >>> 32 - n;
}

function h(r) {
    for (var n = Array(), t = (1 << v) - 1, e = 0; e < r.length * v; e += v) n[e >> 5] |= (r.charCodeAt(e / v) & t) << e % 32;
    return n;
}

function i(r) {
    for (var n = "", t = (1 << v) - 1, e = 0; e < 32 * r.length; e += v) n += String.fromCharCode(r[e >> 5] >>> e % 32 & t);
    return n;
}

function l(r) {
    for (var n = d ? "0123456789ABCDEF" : "0123456789abcdef", t = "", e = 0; e < 4 * r.length; e++) t += n.charAt(r[e >> 2] >> e % 4 * 8 + 4 & 15) + n.charAt(r[e >> 2] >> e % 4 * 8 & 15);
    return t;
}

function m(r) {
    for (var n = "", t = 0; t < 4 * r.length; t += 3) for (var e = (r[t >> 2] >> t % 4 * 8 & 255) << 16 | (r[t + 1 >> 2] >> (t + 1) % 4 * 8 & 255) << 8 | r[t + 2 >> 2] >> (t + 2) % 4 * 8 & 255, u = 0; u < 4; u++) 8 * t + 6 * u > 32 * r.length ? n += g : n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 6 * (3 - u) & 63);
    return n;
}

var d = 0, g = "", v = 8;

module.exports.hex_md5 = function(n) {
    return l(r(h(n), n.length * v));
}, module.exports.b64_md5 = function(n) {
    return m(r(h(n), n.length * v));
}, module.exports.str_md5 = function(n) {
    return i(r(h(n), n.length * v));
}, module.exports.hex_hmac_md5 = function(r, n) {
    return l(c(r, n));
}, module.exports.b64_hmac_md5 = function(r, n) {
    return m(c(r, n));
}, module.exports.str_hmac_md5 = function(r, n) {
    return i(c(r, n));
};