"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getXHRErrorMessage = getXHRErrorMessage;
exports.renderUserRoleLabel = renderUserRoleLabel;
exports.searchHighlight = searchHighlight;
exports.renderSearchHighlight = renderSearchHighlight;
exports.roundToPrecision = roundToPrecision;
exports.readableFileSize = readableFileSize;
exports.intVal = intVal;
exports.floatVal = floatVal;
exports.uInt = uInt;
exports.uFloat = uFloat;
exports.gcd = gcd;
exports.getRatio = getRatio;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getXHRErrorMessage(xhr) {
    var out = "Unknown error";
    if (xhr.responseJSON) {
        out = xhr.responseJSON.message || xhr.responseJSON.error || "Unknown error";
    }

    if (out && (typeof out === "undefined" ? "undefined" : _typeof(out)) == "object") {
        var out2 = [];
        for (var key in out) {
            out2.push(_react2.default.createElement(
                "li",
                { key: key },
                out[key]
            ));
        }
        out = _react2.default.createElement(
            "div",
            null,
            "Multiple errors",
            _react2.default.createElement(
                "ul",
                null,
                out2
            )
        );
    }

    return out;
}

function renderUserRoleLabel(role) {
    var map = {
        user: "label-info",
        manager: "label-warning",
        admin: "label-danger"
    },
        className = "label " + (map[role] || "label-default");
    return _react2.default.createElement(
        "b",
        { className: className },
        role
    );
}

function searchHighlight(input, query, caseSensitive) {
    var s = String(input);
    var q = String(query);
    var x = s;

    if (!caseSensitive) {
        x = x.toLowerCase();
        q = q.toLowerCase();
    }

    var i = x.indexOf(q);

    if (i > -1) {
        return s.substr(0, i) + "<span class=\"search-match\">" + s.substr(i, q.length) + "</span>" + s.substr(i + q.length);
    }

    return input;
}

function renderSearchHighlight(html, search) {
    return _react2.default.createElement("span", { dangerouslySetInnerHTML: {
            __html: search ? searchHighlight(html, search) : html
        } });
}

function roundToPrecision(n, precision, fixed) {
    n = parseFloat(n);

    if (isNaN(n) || !isFinite(n)) {
        return NaN;
    }

    if (!precision || isNaN(precision) || !isFinite(precision) || precision < 1) {
        return Math.round(n);
    }

    var q = Math.pow(10, precision);
    n = Math.round(n * q) / q;

    if (fixed) {
        n = n.toFixed(fixed);
    }

    return n;
}

/**
 * Obtains a human-readable file size string (1024 based).
 * @param {Number} bytes The file size in bytes
 * @param {Number} precision (optional) Defaults to 2
 * @return {String}
 */
function readableFileSize(bytes, precision, fixed) {
    var i = 0,
        step = 1024,
        units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        out;

    while (bytes > step) {
        bytes = bytes / step;
        i++;
    }

    out = roundToPrecision(bytes, precision === undefined ? 2 : precision);

    if (fixed) {
        out = out.toFixed(fixed);
    }

    return out + " " + units[i];
}

/**
 * Returns the int representation of the first argument or the
 * "defaultValue" if the int conversion is not possible.
 * @memberof Utils
 * @param {*} x The argument to convert
 * @param {*} defaultValue The fall-back return value. This is going to be
 *                         converted to integer too.
 * @return {Number} The resulting integer.
 */
function intVal(x, defaultValue) {
    var out = parseInt(x, 10);
    if (isNaN(out) || !isFinite(out)) {
        out = defaultValue === undefined ? 0 : intVal(defaultValue);
    }
    return out;
}

function floatVal(x, defaultValue) {
    var out = parseFloat(x);
    if (isNaN(out) || !isFinite(out)) {
        out = defaultValue === undefined ? 0 : floatVal(defaultValue);
    }
    return out;
}

function uInt(x, defaultValue) {
    return Math.max(intVal(x, defaultValue), 0);
}

function uFloat(x, defaultValue) {
    return Math.max(floatVal(x, defaultValue), 0);
}

// finds the greatest common divider for a and b
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function getRatio(w, h) {
    var d = gcd(w, h);
    return w / d + "/" + h / d;
}