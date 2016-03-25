import React from "react"
import $     from "jquery"
import "./style.less"

export default class PasswordStrenghtMeter extends React.Component {

    static propTypes = {
        for    : React.PropTypes.string.isRequired,
        striped: React.PropTypes.bool
    };

    static defaultProps = {
        striped: true
    };

    constructor(...args) {
        super(...args)
        this.state = {
            passwordStrenghtPCT: 0,
            passwordStrenghtTXT: "Too short!",
            passwordStrenghtCLS: "progress-bar-danger"
        }
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    componentDidMount() {
        $(document).on("input", this.props.for, this.onPasswordChange)
    }

    componentWillUnmount() {
        $(document).off("input", this.props.for, this.onPasswordChange)
    }

    onPasswordChange(e) {
        this.setPassword(e.target.value)
    }

    setPassword(password) {
        let len = password.length
        let pct = Math.min(Math.round(len / 20 * 100), 100)
        let txt = "Perfect"
        let cls = "progress-bar-success"

        if (len < 6) {
            txt = "Too short!"
            cls = "progress-bar-danger"
        }
        else if (len < 10) {
            txt = "Bad"
            cls = "progress-bar-warning"
        }
        else if (len < 16) {
            txt = "Medium"
            cls = "progress-bar-info"
        }
        else if (len < 20) {
            txt = "Good"
            cls = "progress-bar-primary"
        }

        this.setState({
            passwordStrenghtPCT: pct,
            passwordStrenghtTXT: txt,
            passwordStrenghtCLS: cls
        })
    }

    render() {
        let className = "progress-bar " + this.state.passwordStrenghtCLS
        let width = this.state.passwordStrenghtPCT + "%"
        if (this.props.striped) {
            className += " progress-bar-striped"
        }
        return (
            <div className="progress password-strenght"
                style={ this.state.passwordStrenghtPCT ? undefined : { opacity: 0.5 }}>
                <div className={ className } style={{ width }}>
                    <span ref="pctBarLabel">
                        { this.state.passwordStrenghtPCT ? this.state.passwordStrenghtTXT : "N/A"}
                    </span>
                </div>
            </div>
        )
    }

}
