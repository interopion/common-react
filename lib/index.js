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
