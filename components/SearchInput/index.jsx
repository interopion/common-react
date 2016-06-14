import React from "react"
import $     from "jquery"
import "./style"

export default class SearchInput extends React.Component
{
    static propTypes = {
        value   : React.PropTypes.string,
        onChange: React.PropTypes.func
    };

    onClear() {
        if (this.refs.input.value) {
            let e = new $.Event("click")
            $(this.refs.input).val("").trigger(e)
            if (this.props.onChange) {
                this.props.onChange(e)
            }
        }
    }

    componentDidUpdate() {
        this.refs.btn.style.display = this.refs.input.value ? "block" : "none"
    }

    render() {
        return (
            <div className="search-input">
                <input
                    type="search"
                    placeholder="Search"
                    className="form-control"
                    { ...this.props }
                    ref="input"
                />
                <i  ref="btn"
                    className="glyphicon glyphicon-remove-circle"
                    title="Clear"
                    onClick={ ::this.onClear }
                    style={{ display: this.props.value ? "block" : "none" }}/>
            </div>
        )
    }
}
