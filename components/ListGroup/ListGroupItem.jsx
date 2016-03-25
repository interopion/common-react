import React from "react"

export default class ListGroupItem extends React.Component
{
    static propTypes = {
        selected : React.PropTypes.bool,
        heading  : React.PropTypes.string.isRequired,
        text     : React.PropTypes.string,
        className: React.PropTypes.string,
        icon     : React.PropTypes.string
    };

    render() {
        let {
            selected,
            heading,
            text,
            className,
            icon,
            ...rest
        } = this.props

        let cls = "list-group-item"

        if (this.props.selected) {
            // cls += " active"
            cls += " list-group-item-info"
        }

        if (icon) {
            cls += " has-icon"
        }

        if (className) {
            cls += " " + className
        }

        return (
            <div className={ cls } { ...rest } draggable>
                {
                    icon ?
                    <i className={ "list-group-item-text " + icon} /> :
                    null
                }
                <div className="list-group-item-heading">
                    { this.props.heading }
                </div>
                {
                    this.props.text ? (
                        <div className="list-group-item-text">
                            { this.props.text }
                        </div>
                    ) : null
                }
            </div>
        )
    }
}
