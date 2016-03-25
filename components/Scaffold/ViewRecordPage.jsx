import React        from "react"
import $            from "jquery"
import PropertyGrid from "../PropertyGrid"
import Loader       from "../Loader"

export default class ViewRecordPage extends React.Component
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
        ]),
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.element
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
        if (this.props.title === false) {
            return null
        }

        return (
            <h2 style={{ textTransform: "capitalize" }}>
                { this.props.title || "View " + this.props.schema.label }
            </h2>
        )
    }

    renderFooter() {
        let buttons = this.props.buttons

        if (!buttons) {

            // Parent can pass buttons={false} to hide the footer
            if (buttons === false) {
                return null
            }

            // Generate default buttons - edit and delete
            buttons = (
                <span>
                    <button style={{ minWidth: "10em" }} className="btn btn-primary" onClick={ this.onEdit.bind(this) }>
                        <i className="glyphicon glyphicon-edit"/> Edit
                    </button>
                    <span>&nbsp;</span>
                    <button style={{ minWidth: "10em" }} className="btn btn-danger" onClick={ this.onDelete.bind(this) }>
                        <i className="glyphicon glyphicon-trash"/> Delete
                    </button>
                </span>
            )
        }

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
                        { buttons }
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
                        style: { margin: 0 }
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
        return <ViewRecordPage {...props}/>
    }
}
