import React from "react"

export default class ErrorPage extends React.Component
{
    static propTypes = {
        code: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        message: React.PropTypes.string,
        stack: React.PropTypes.string
    };

    static defaultProps = {
        code   : "",
        message: "Unknown Error",
        stack  : ""
    };

    renderStack() {
        if (!this.props.stack) {
            return null
        }

        return (
            <pre>{this.props.stack}</pre>
        )
    }

    renderCode() {
        if (!this.props.code) {
            return null
        }

        return (
            <span className="label label-danger"
                style={{ paddingTop: "0 0.3em", verticalAlign: "top" }}>{ this.props.code }</span>
        )
    }

    render() {
        return (
            <div className="panel panel-default navbar-default">
                <div className="panel-body">
                    <h2 className="text-danger text-center">
                        { this.renderCode() }
                        &nbsp;
                        { this.props.message }
                        <br/>
                    </h2>
                    <br/>
                    { this.renderStack() }
                </div>
            </div>
        );
    }
}
