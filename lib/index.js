import React from "react"

export function getXHRErrorMessage(xhr) {
    if (xhr.responseJSON) {
        return (
            xhr.responseJSON.message ||
            xhr.responseJSON.error ||
            "Unknown error"
        )
    }
    return "Unknown error"
}

export function renderUserRoleLabel(role) {
    let map = {
            user   : "label-info",
            manager: "label-warning",
            admin  : "label-danger"
        }, className = "label " + (map[role] || "label-default")
    return <b className={className}>{role}</b>
}

export function searchHighlight(input, query, caseSensitive) {
    let s = String(input)
    let q = String(query)
    let x = s

    if (!caseSensitive) {
        x = x.toLowerCase()
        q = q.toLowerCase()
    }

    let i = x.indexOf(q)

    if (i > -1) {
        return (
            s.substr(0, i) +
            `<span class="search-match">` +
            s.substr(i, q.length) +
            "</span>" +
            s.substr(i + q.length)
        )
    }

    return input
}

export function renderSearchHighlight(html, search) {
    return (
        <span dangerouslySetInnerHTML={{
            __html: search ? searchHighlight(html, search) : html
        }}/>
    )
}

export function roundToPrecision(n, precision, fixed) {
    n = parseFloat(n);

    if ( isNaN(n) || !isFinite(n) ) {
        return NaN;
    }

    if ( !precision || isNaN(precision) || !isFinite(precision) || precision < 1 ) {
        return Math.round( n );
    }

    var q = Math.pow(10, precision);
    n = Math.round( n * q ) / q;

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
export function readableFileSize(bytes, precision, fixed) {
    var i = 0, step = 1024  , units = [
            "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"
        ], out;

    while (bytes > step) {
        bytes = bytes / step;
        i++;
    }

    out = roundToPrecision(
        bytes,
        precision === undefined ? 2 : precision
    );

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
export function intVal( x, defaultValue ) {
    var out = parseInt(x, 10);
    if ( isNaN(out) || !isFinite(out) ) {
        out = defaultValue === undefined ? 0 : intVal(defaultValue);
    }
    return out;
}

export function floatVal( x, defaultValue ) {
    var out = parseFloat(x);
    if ( isNaN(out) || !isFinite(out) ) {
        out = defaultValue === undefined ? 0 : floatVal(defaultValue);
    }
    return out;
}

export function uInt( x, defaultValue ) {
    return Math.max(intVal( x, defaultValue ), 0);
}

export function uFloat( x, defaultValue ) {
    return Math.max(floatVal( x, defaultValue ), 0);
}
