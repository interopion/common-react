import React from "react"
import $     from "jquery"

/**
 * Eaxample usage (minimal):
 *   <Paginator totalPages={10} currentPage={5} />
 *
 * Props:
 *   totalPages  - (Number)
 *   currentPage - (Number)
 *   onChange - (Function) If provided it will be called with the new page number
 */
export default class SimplePaginator extends React.Component
{
    static propTypes = {
        currentPage: React.PropTypes.number,
        totalPages : React.PropTypes.number,
        onChange   : React.PropTypes.func,
        disabled   : React.PropTypes.bool
    };

    static defaultProps = {
        currentPage: 1,
        totalPages : 1,
        onChange   : $.noop,
        disabled   : false
    };

    constructor(...args) {
        super(...args)
        this.currentPage = this.props.currentPage
    }

    setPage(n, event) {
        if (event && $(event.target).closest(".disabled").length) {
            return false;
        }
        n = parseFloat(n)
        if (!isNaN(n) && isFinite(n) && this.currentPage !== n) {
            this.currentPage = n
            this.props.onChange(n)
        }
    }

    render() {
        let cur = this.props.currentPage

        return (
            <nav>
                <button
                    className="btn btn-sm btn-default"
                    style={{ minWidth: "8em", backgroundImage: "none", boxShadow: "none" }}
                    disabled={ this.props.disabled || cur === 1 }
                    title="Go to the previous page"
                    onClick={ this.setPage.bind(this, cur - 1) }>
                    <i className="glyphicon glyphicon-menu-left"/>
                    &nbsp;Previous
                </button>
                &nbsp;
                <button
                    className="btn btn-sm btn-default"
                    style={{ minWidth: "8em", backgroundImage: "none", boxShadow: "none" }}
                    disabled={ this.props.disabled || cur === this.props.totalPages }
                    onClick={ this.setPage.bind(this, cur + 1) }
                    title="Go to the next page">
                    Next&nbsp;
                    <i className="glyphicon glyphicon-menu-right"/>
                </button>
            </nav>
        )
    }
}
