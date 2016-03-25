/* @flow */

import React from "react"
import "../../styles/animations/spin.less"

export default class Loader extends React.Component
{
    static propTypes = {
        message: React.PropTypes.string,
        icon   : React.PropTypes.string
    };

    static defaultProps = {
        message: "Loading...",
        icon   : "glyphicon glyphicon-refresh spin"
    };

    render() {
        let { message, icon, ...props } = this.props
        return (
            <span { ...props }>
                <i className={ icon } />
                &nbsp;{ message }
            </span>
        )
    }
}
