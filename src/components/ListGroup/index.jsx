import React from "react"
import "./style.less"

export default class ListGroup extends React.Component
{
    static propTypes = {
        children : React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.arrayOf(React.PropTypes.element)
        ])
    };

    render() {
        let { children, ...rest } = this.props
        let cls = "className" in rest ? rest.className + " list-group" : "list-group"
        return (
            <div { ...rest } className={ cls }>
                { this.props.children }
            </div>
        )
    }
}
