import React from "react"
import ErrorPage from "../ErrorPage"

export default class PageNotFound extends React.Component
{
    render() {
        return <ErrorPage code="404" message="Page Not Found" {...this.props} />
    }
}
