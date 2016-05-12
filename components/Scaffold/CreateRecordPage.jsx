import React        from "react"
import $            from "jquery"
import PropertyGrid from "../PropertyGrid/"
import Loader       from "../Loader"

export default class CreateRecordPage extends React.Component
{
    static propTypes = {
        mountPoint: React.PropTypes.string.isRequired,
        schema    : React.PropTypes.object.isRequired,
        params    : React.PropTypes.object,
        onSave    : React.PropTypes.func
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillUnmount() {
        this.ignoreLastFetch = true
    }

    constructor(...args) {
        super(...args)
        this.state = {
            record : this.getEmptyRecord(),
            loading: false,
            error  : null
        }
        this.onSave   = this.onSave.bind(this)
    }

    onSave(e) {
        e.preventDefault()
        let data = {}
        for( let x in this.state.record ) {
            if (this.refs.grid.refs[x]) {
                data[x] = this.refs.grid.refs[x].value
            }
        }

        // data.id = this.state.record.id

        if (typeof this.props.onSave == "function") {
            return this.props.onSave(data)
        }

        // console.log(data)
        this.setState({ loading: true, error: null })
        this.props.schema.backend.create(this.props.mountPoint, data).then(
            record => {
                if (!this.ignoreLastFetch) {
                    // this.setState({ loading: false, record }, () => {
                    this.context.router.push(
                        "/" + this.props.mountPoint + "/" + record.id + "/edit"
                    )
                    // })
                }
            },
            error => {
                if (!this.ignoreLastFetch) {
                    this.setState({ loading: false, error })
                }
            }
        )
    }

    getEmptyRecord() {
        let rec = {}
        this.props.schema.columns.forEach(meta => {
            rec[meta.name] = "defaultValue" in meta ? meta.defaultValue : null
        })
        return rec
    }

    renderHeader() {
        return (
            <h2 style={{ textTransform: "capitalize" }} className="text-success">
                <i className="glyphicon glyphicon-plus-sign"/>
                { " Create New " + this.props.schema.label }
            </h2>
        )
    }

    renderFooter() {
        return (
            <div className="panel-footer">
                <div className="row">
                    <div className="col-xs-6 text-left">
                        <button style={{ minWidth: "10em", textTransform: "capitalize" }}
                            className="btn btn-default"
                            onClick={ () => {
                                this.context.router.push("/" + this.props.mountPoint)
                            }}
                            type="button">
                            <i className="glyphicon glyphicon-menu-left"/>
                            &nbsp;
                            { "Browse " + this.props.schema.labelPlural }
                        </button>
                    </div>
                    <div className="col-xs-6 text-right">
                        <button style={{ minWidth: "10em", textTransform: "capitalize" }} className="btn btn-success" type="submit">
                            <i className="glyphicon glyphicon-plus-sign"/>
                            &nbsp;
                            { "Create " + this.props.schema.label }
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.loading) {
            return <Loader/>
        }

        let error = this.state.error || null
        if (error && typeof error == "object") {
            try {
                error = (
                    <pre className="alert alert-danger">
                    <button type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"><span aria-hidden="true">&times;</span>
                    </button>
                        { JSON.stringify(error, null, 4) }
                    </pre>
                )
            }
            catch(ex) {
                error = <p className="text-danger">Unknown error</p>
            }
        }

        return (
            <form onSubmit={ this.onSave }>
                { error || null }
                { this.renderHeader() }
                <PropertyGrid
                    ref="grid"
                    schema={ this.props.schema }
                    record={ this.state.record }
                    gridProps={{
                        style: {
                            margin: 0
                        }
                    }}
                    editable/>
                { this.renderFooter() }
            </form>
        )
    }
}

export function wrap(mountPoint, schema) {
    return function(props) {
        props = $.extend({}, props, {
            mountPoint,
            schema
        })
        return <CreateRecordPage {...props}/>
    }
}
