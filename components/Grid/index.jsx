import React           from "react"
import $               from "jquery"
import Paginator       from "../Paginator"
import SimplePaginator from "../SimplePaginator"
import Loader          from "../Loader/index.jsx"
import                      "./style.less"

const {
    PropTypes,
    Component
} = React;

//test

/**
 * Generates bootstrap tables based on configuration passed via props
 */
export default class Grid extends Component
{
    static propTypes = {
        cols           : PropTypes.array,
        rows           : PropTypes.array,
        onRowClick     : PropTypes.func,
        hovered        : PropTypes.bool,
        bordered       : PropTypes.bool,
        striped        : PropTypes.bool,
        condensed      : PropTypes.bool,
        parse          : PropTypes.func,
        fetch          : PropTypes.func.isRequired,
        sortdir        : PropTypes.string,
        sortcol        : PropTypes.string,
        limit          : PropTypes.number,
        offset         : PropTypes.number,
        total          : PropTypes.number,
        loading        : PropTypes.bool,
        simplePaginator: PropTypes.bool,
        error          : PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
        searchDelay    : PropTypes.number,
        getRowProps    : PropTypes.func,
        rowStyle       : PropTypes.object,
        tableStyle     : PropTypes.object,
        emptyMessage   : PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
        search         : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ])
    };

    static defaultProps = {
        rows: [],
        cols: [{ label: "No columns defined" }],
        onRowClick() {},
        limit: 10,
        offset: 0,
        parse(json) { return json },
        sortdir: "",
        sortcol: "",
        total: 0,
        search: "",
        loading: true,
        searchDelay: 300,
        emptyMessage: "No Records Found"
    };

    constructor(...args) {
        super(...args)
        this._searchDelay = null
        this.fetch = this.fetch.bind(this)
        this.search = this.search.bind(this)
        this.state = {
            search: this.props ? this.props.search || "" : ""
        }
        this.lastHeight = 0
    }

    componentDidUpdate(): void {
        if (!this.props.loading) {
            this.refs.table.style.minHeight = 0
            this.lastHeight = this.refs.table.offsetHeight || 0
            this.refs.table.style.minHeight = this.lastHeight + "px"
        }
    }

    /**
     * Introduces a 100ms delay so that very fast queries do not make the grid
     * transition to it's loading state (that would look like blinking)
     */
    shouldComponentUpdate(nextProps): boolean {
        if (nextProps.loading) {
            if (!this._isWaiting) {
                this._isWaiting = setTimeout(() => {
                    if (!this.willUnmount) {
                        this.setState({})
                    }
                }, 200)
                return false
            }
        }
        else if (this._isWaiting) {
            clearTimeout(this._isWaiting)
        }
        this._isWaiting = false
        return true
    }

    componentWillUnmount() {
        this.willUnmount = true
    }

    fetch(options) {
        this.props.fetch($.extend(true, {
            limit  : this.props.limit,
            offset : this.props.offset,
            sortcol: this.props.sortcol,
            sortdir: this.props.sortdir,
            search : this.props.search
        }, options))
    }

    componentWillReceiveProps(newProps) {
        if (newProps.search != this.props.search) {
            this.setState({
                search: newProps.search || ""
            })
        }
    }

    search() {
        if (this._searchDelay) {
            clearTimeout(this._searchDelay)
        }
        this.setState({ search: this.refs.search.value })
        this._searchDelay = setTimeout(() => {
            this.fetch({
                search: this.refs.search.value,
                offset: 0
            })
        }, this.props.searchDelay)
    }

    // Rendering methods -------------------------------------------------------

    /**
     * If any of the columns is set to searchable than we have to render the
     * search field in the header
     */
    renderHeader() {
        if (this.props.search === false) {
            return null
        }

        return (
            <div className="row" style={{ marginBottom: 20 }}>
                <div className="text-center col-sm-6 col-sm-offset-3  col-md-4 col-md-offset-4">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        value={ this.state.search }
                        ref="search"
                        onChange={ this.search }/>
                </div>
            </div>
        )
    }

    renderFooter() {
        let limit      = this.props.limit

        if (!limit) {
            return null
        }

        let totalPages = Math.ceil(this.props.total / limit)
        let curPage    = Math.max(Math.ceil(this.props.offset / limit) + 1, 1)
        let endRec     = Math.min(this.props.offset + limit, this.props.total)

        // Errored state -------------------------------------------------------
        if (this.props.error) {
            return null
        }

        // Empty state ---------------------------------------------------------
        if (!this.props.rows.length) {
            return null
        }

        // Single-page state ---------------------------------------------------
        else if (totalPages < 2) {
            return (
                <div className="panel-footer text-muted">
                    { this.props.total + " records total"}
                </div>
            )
        }

        // Normal state --------------------------------------------------------
        let PaginatorClass = this.props.simplePaginator ?
            SimplePaginator :
            Paginator
        return (
            <div className="panel-footer">
                <div className="row">
                    <div className="col-xs-4 small text-muted">
                        <div style={{ marginTop: 7 }}>
                            Records&nbsp;<b>{ this.props.offset + 1 }</b>&nbsp;
                            to&nbsp;<b>{ endRec }</b>&nbsp;
                            of&nbsp;<b>{ this.props.total }</b>
                        </div>
                    </div>
                    <div className={ "text-right col-xs-8" + (this.props.loading ? " disabled" : "") }>
                        <PaginatorClass
                            currentPage={curPage}
                            totalPages={totalPages}
                            range={3}
                            onChange={ n => this.fetch({ offset: (n - 1) * this.props.limit }) }
                            disabled={ this.props.loading }
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderTHead() {
        let rows = this.props.rows

        // Loading state -------------------------------------------------------
        if (this.props.loading) {
            return <th className="text-muted">Please wait...</th>
        }

        // Errored state -------------------------------------------------------
        if (this.props.error) {
            return <th className="text-danger">Error</th>
        }

        // Empty state ---------------------------------------------------------
        if (!rows.length) {
            return null//<th>&nbsp;</th>
        }

        // Normal state --------------------------------------------------------
        return this.props.cols.map((col, i) => {
            let props = {
                key : "header-cell-" + i,
                style: {}
            }

            let className = []

            if (col.headerClass) {
                className.push(col.headerClass)
            }

            if (col.headerStyle) {
                props.style = col.headerStyle
            }

            if (col.sortable) {
                className.push("sortable")
                props.onClick = (column => {
                    this.fetch({
                        sortdir: this.props.sortcol == column.prop ?
                                this.props.sortdir == "asc" ? "desc" : "asc" : "asc",
                        sortcol: column.prop
                    })
                }).bind(this, col)

                if (this.props.sortcol == col.prop) {
                    className.push("sorted", this.props.sortdir || "asc")
                }
            }

            className = className.join(" ");
            if (className) {
                props.className = className
            }

            return <th {...props}>{ col.renderHeader && col.renderHeader() || col.label }</th>
        })
    }

    renderTBody() {

        let rows = this.props.rows

        // Loading state -------------------------------------------------------
        if (this.props.loading) {
            rows = [
                <tr key="empty-row-0">
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                        <Loader className="text-info" style={{ margin: 0 }}/>
                    </td>
                </tr>
            ]

            // for (let i = 1; i < this.props.limit; i++) {
            //     rows.push(<tr key={"empty-row-" + i}><td>&nbsp;</td></tr>)
            // }

            return rows
        }

        // Errored state -------------------------------------------------------
        if (this.props.error) {
            return (
                <tr>
                    <td className="text-center">
                        <div className="alert alert-danger">
                            <i className="glyphicon glyphicon-minus-sign">&#x202f;</i>
                            { String(this.props.error) }
                        </div>
                    </td>
                </tr>
            )
        }

        // Empty state ---------------------------------------------------------
        if (!rows.length) {
            return (
                <tr>
                    <td className="text-center text-danger">
                        { this.props.emptyMessage }
                    </td>
                </tr>
            )
        }

        // Normal state --------------------------------------------------------
        return rows.map((row, ri) => {
            let rowProps = {
                key    : "body-row-" + ri,
                onClick: this.props.onRowClick.bind(null, row),
                style  : this.props.rowStyle || undefined
            }

            if (row.ui_selected) {
                rowProps.className = "info"
            }

            if (this.props.getRowProps) {
                $.extend(rowProps, this.props.getRowProps(row))
            }

            return (
                <tr { ...rowProps }>
                    {this.props.cols.map((col, ci) => {
                        let props = {
                            key : "body-cell-" + ci
                        }

                        if (col.cellStyle) {
                            props.style = col.cellStyle
                        }

                        if (col.prop && this.props.sortcol == col.prop) {
                            props.className = "sorted"
                        }

                        if (col.cellClass) {
                            props.className = [
                                props.className,
                                col.cellClass
                            ].join(" ")
                        }

                        return (
                            <td {...props}>
                                {col.render ? col.render(row) : row[col.prop] }
                            </td>
                        )
                    })}
                </tr>
            )
        })
    }

    render() {
        let tableClass = "table grid"
        if (this.props.hovered) {
            tableClass += " table-hover"
        }
        if (this.props.condensed) {
            tableClass += " table-condensed"
        }
        if (this.props.bordered) {
            tableClass += " table-bordered"
        }
        if (this.props.striped) {
            tableClass += " table-striped"
        }
        let tableStyle = $.extend({}, this.props.tableStyle, { minHeight: this.lastHeight });
        return (
            <div className="grid">
                { this.renderHeader() }
                <table className={tableClass} ref="table" style={ tableStyle }>
                    <thead><tr>{ this.renderTHead() }</tr></thead>
                    <tbody>{ this.renderTBody() }</tbody>
                </table>
                { this.renderFooter() }
            </div>
        )
    }
}
