import React from "react"
import $     from "jquery"
import Grid  from "../Grid"
import {
    renderSearchHighlight
} from "../../lib"

function access(obj, prop) {
    if ( typeof obj[prop] == "function" ) {
        return obj[prop]()
    }
    return obj[prop]
}

class BrowseRecordsPage extends React.Component
{
    static propTypes = {
        mountPoint  : React.PropTypes.string.isRequired,
        schema      : React.PropTypes.object.isRequired,
        location    : React.PropTypes.object.isRequired,
        defaultLimit: React.PropTypes.number,
        fetch       : React.PropTypes.func
    };

    static defaultProps = {
        defaultLimit: 10
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor(...args) {
        super(...args)
        this.state = {
            data   : [],
            loading: true,
            total  : 0,
            error  : null,
            params : {
                limit  : 10,
                offset : 0,
                sortcol: "",
                sortdir: "",
                search : ""
            }
        }
        this.onRowClick = this.onRowClick.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    componentDidMount() {
        this.fetch(this.state.params)
    }

    componentWillUnmount() {
        this.ignoreLastFetch = true
    }

    fetch(params) {
        let { offset, limit, sortdir, sortcol, search } = params
        let q = this.state.params
        this.setState({ loading: true, error: null })

        return this.props.schema.backend.fetch(
            this.props.mountPoint,
            params
        ).then(
            data => {
                if (!this.ignoreLastFetch) {
                    $
                    this.setState({
                        loading: false,
                        data   : data.results,
                        total  : data.total,
                        params: {
                            offset : offset === undefined ? q.offset || 0 : offset || undefined,
                            limit  : limit  === undefined ? q.limit  || this.props.defaultLimit : limit || this.props.defaultLimit,
                            sortdir: sortdir || q.sortdir || undefined,
                            sortcol: sortcol || q.sortcol || undefined,
                            search : search  || undefined
                        }
                    })
                }
            },
            error => {
                if (!this.ignoreLastFetch) {
                    this.setState({
                        loading: false,
                        error  : String(error)
                    })
                }
            }
        )
    }

    onRowClick(rec) {
        this.context.router.push({
            pathname: this.props.mountPoint + "/" + rec.id
        })
    }

    render() {
        /*
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
        error          : PropTypes.string,
        searchDelay    : PropTypes.number,
        getRowProps    : PropTypes.func,
        rowStyle       : PropTypes.object,
        emptyMessage   : PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
        search         : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ])
        */
        let search = this.state.params.search
        let cols = this.props.schema.columns
            .filter(c => !access(c, "hidden"))
            .map(c => {
                let meta = {
                    prop    : access(c, "name"),
                    label   : access(c, "label") || access(c, "name"),
                    sortable: access(c, "sortable")
                }

                $.extend(meta, c.list || {})

                let searchable = access(c, "searchable")
                if (search && searchable) {
                    if (typeof c.render == "function") {
                        meta.render = (o) => {
                            let rec = $.extend({}, o)
                            rec[meta.prop] = renderSearchHighlight(o[meta.prop], search)
                            return c.render(rec)
                        }
                    }
                    else {
                        meta.render = (o) => renderSearchHighlight(o[meta.prop], search)
                    }
                }
                else {
                    if (typeof c.render == "function") {
                        meta.render = c.render
                    }
                }

                return meta
            })
        return (
            <div>
                <h2 style={{ textTransform: "capitalize", marginTop: 0 }} className="page-header">
                    <i className="glyphicon glyphicon-list text-muted"/>
                    { " Browse " + this.props.schema.labelPlural }
                </h2>
                <Grid
                    cols   ={ cols }
                    fetch  ={ this.fetch }
                    sortcol={ this.state.params.sortcol }
                    sortdir={ this.state.params.sortdir }
                    offset ={ this.state.params.offset }
                    limit  ={ this.state.params.limit }
                    search ={ this.state.params.search }
                    rows   ={ this.state.data }
                    total  ={ this.state.total }
                    loading={ this.state.loading }
                    error  ={ this.state.error }
                    onRowClick={ this.onRowClick }
                    rowStyle={{ cursor: "pointer" }}
                    hovered
                />
                <br/>
                <div className="text-right">
                    <button
                        className="btn btn-success"
                        onClick={ () => this.context.router.push("/" + this.props.mountPoint + "/create") }
                        style={{ textTransform: "capitalize" }}>
                        <i className="glyphicon glyphicon-plus-sign"/>
                        &nbsp;{ "Create New " + this.props.schema.label }
                    </button>
                </div>
            </div>
        )
    }
}

export default function(mountPoint, schema) {
    return function(props) {
        props = $.extend({}, props, {
            mountPoint,
            schema
        })
        return <BrowseRecordsPage {...props}/>
    }
}
