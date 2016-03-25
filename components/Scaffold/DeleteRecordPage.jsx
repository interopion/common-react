import React        from "react"
import $            from "jquery"
import PropertyGrid from "../PropertyGrid"
import Loader       from "../Loader"

export default class DeleteRecordPage extends React.Component
{
    static propTypes = {
        mountPoint: React.PropTypes.string.isRequired,
        schema    : React.PropTypes.object.isRequired,
        params    : React.PropTypes.object,
        onEdit    : React.PropTypes.func,
        onDelete  : React.PropTypes.func,
        buttons   : React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.boolean
        ])
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentDidMount() {
        this.findRecord()
    }

    componentWillUnmount() {
        this.ignoreLastFetch = true
    }

    constructor(...args) {
        super(...args)
        this.state = {
            record : null,
            loading: true,
            error  : null
        }
    }

    findRecord() {
        this.setState({ loading: true, error: null })
        this.props.schema.backend.find(
            this.props.mountPoint,
            this.props.params.id
        ).then(
            record => {
                if (!this.ignoreLastFetch) {
                    this.setState({ loading: false, record })
                }
            },
            error => {
                if (!this.ignoreLastFetch) {
                    this.setState({ loading: false, error })
                }
            }
        )
    }

    renderHeader() {
        return (
            <h2 className="text-center text-danger">Please Confirm!</h2>
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
                        <button style={{ minWidth: "12em" }} className="btn btn-danger" onClick={ this.onDelete.bind(this) }>
                            <i className="glyphicon glyphicon-trash"/> Delete Record
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    onEdit() {
        if (typeof this.props.onEdit == "function") {
            return this.props.onEdit()
        }

        this.context.router.push(
            `/${this.props.mountPoint}/${this.state.record.id}/edit`
        )
    }

    onDelete() {
        if (typeof this.props.onDelete == "function") {
            return this.props.onDelete()
        }

        this.context.router.push(
            `/${this.props.mountPoint}/${this.state.record.id}/delete`
        )
    }

    render() {
        if (this.state.loading) {
            return <Loader/>
        }

        return (
            <div>
                { this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                ) : null }
                { this.renderHeader() }
                <PropertyGrid
                    record={ this.state.record }
                    schema={ this.props.schema }
                    gridProps={{
                        className: "table table-condensed text-danger table-striped",
                        style: {
                            margin: 0
                        }
                    }}
                />
                { this.renderFooter() }
            </div>
        )
    }
}

export function wrap(mountPoint, schema) {
    return function(props) {
        props = $.extend({}, props, {
            mountPoint,
            schema
        })
        return <DeleteRecordPage {...props}/>
    }
}
