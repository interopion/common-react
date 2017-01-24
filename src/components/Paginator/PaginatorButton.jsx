import React from "react"

export default class PaginatorButton extends React.Component
{
    static propTypes = {
        children: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.element
        ]).isRequired
    };

    render() {
        return (
            <li {...this.props}>
                <a
                    href="javascript:void 0"
                    style={{
                        minWidth: "3em",
                        textAlign: "center"
                    }}
                >{ this.props.children }</a>
            </li>
        )
    }
}
