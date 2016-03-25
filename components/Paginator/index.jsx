import React              from "react"
import $                  from "jquery"
import { default as Btn } from "./PaginatorButton"

/**
 * Eaxample usage (minimal):
 *   <Paginator totalPages={10} currentPage={5} />
 *
 * Props:
 *   totalPages  - (Number)
 *   currentPage - (Number)
 *   range - (Number) The number of buttons to show before and after the current
 *   onChange - (Function) If provided it will be called with the new page number
 */
export default class Paginator extends React.Component
{
    static propTypes = {
        currentPage: React.PropTypes.number,
        totalPages : React.PropTypes.number,
        range      : React.PropTypes.number,
        onChange   : React.PropTypes.func,
        disabled   : React.PropTypes.bool
    };

    static defaultProps = {
        currentPage: 1,
        totalPages : 1,
        range      : 3,
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
        let pageLinks = []
        let cur   = this.props.currentPage
        let rng   = this.props.range
        let start = Math.max(cur - rng, 1)
        let end   = Math.min(cur + rng, this.props.totalPages)
        for (let i = start; i <= end; i++) {
            let className = this.props.disabled ? "disabled" : ""
            if (i === cur) {
                className += " active"
            }
            pageLinks.push(
                <Btn key={i} className={className} onClick={ this.setPage.bind(this, i) }
                    title={"Go to Page " + i}>{i}</Btn>
            )
        }

        return (
            <nav>
                <ul className="pagination pagination-sm" style={{ margin: "0 0 -5px"}}>
                    <Btn
                        onClick={ this.setPage.bind(this, 1) }
                        title="Go to First Page"
                        className={this.props.disabled || cur === 1 ? "disabled" : ""}>
                        <span aria-hidden="true" className="glyphicon glyphicon-fast-backward"/>
                    </Btn>
                    <Btn
                        onClick={ this.setPage.bind(this, cur - 1) }
                        title="Go to Previous Page"
                        className={this.props.disabled || cur === 1 ? "disabled" : ""}>
                        <span aria-hidden="true" className="glyphicon glyphicon-step-backward"/>
                    </Btn>
                    { pageLinks }
                    <Btn
                        onClick={ this.setPage.bind(this, cur + 1) }
                        title="Go to Next Page"
                        className={ this.props.disabled || cur === this.props.totalPages ? "disabled" : ""}>
                        <span aria-hidden="true" className="glyphicon glyphicon-step-forward"/>
                    </Btn>
                    <Btn
                        onClick={ this.setPage.bind(this, this.props.totalPages) }
                        title="Go to Last Page"
                        className={ this.props.disabled || cur === this.props.totalPages ? "disabled" : ""}>
                        <span aria-hidden="true" className="glyphicon glyphicon-fast-forward"/>
                    </Btn>
                </ul>
            </nav>
        )
    }
}
