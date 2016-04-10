import React  from "react"
import Loader from "../Loader"
import "./style.less"

const KEYCODE_UP     = 38;
const KEYCODE_DOWN   = 40;
const KEYCODE_ENTER  = 13;
const KEYCODE_ESCAPE = 27;


export default class TypeAhead extends React.Component
{
    static propTypes = {
        onSearch   : React.PropTypes.func,
        onSubmit   : React.PropTypes.func,
        hints      : React.PropTypes.array,
        placeholder: React.PropTypes.string,
        inputValue : React.PropTypes.string
    };

    static defaultProps = {
        onSearch: () => false,
        onSubmit: () => false,
        hints: [],
        hintIndex: 0
    };

    constructor(...args) {
        super(...args)
        this.state = {
            inputValue: this.props.inputValue || "",
            hintIndex : -1,
            loading   : false
        }
        this.onChange  = this.onChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onBlur    = this.onBlur.bind(this)
    }

    onChange(e) {
        let val = e.target.value.trim()

        if (!val) {
            return this.setState({
                inputValue: e.target.value,
                hintIndex : -1,
                loading   : false
            })
        }

        if (val === this.state.inputValue) {
            return this.setState({
                inputValue: e.target.value
            })
        }

        this.setState({
            inputValue: e.target.value,
            hintIndex : 0,
            loading   : true
        })

        if (this._searchDelay) {
            clearTimeout(this._searchDelay)
        }
        this._searchDelay = setTimeout(() => {
            this.props.onSearch(e.target.value)
        }, 50)
    }

    selectHintIndex(index, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        let hint = this.props.hints[index]
        if (hint) {
            // this.props.onSubmit(hint.data)
            this.setState({
                inputValue: hint.value,
                hintIndex : -1
            }, () => {
                this.props.onSubmit(hint.raw)
            })
        }
    }

    onBlur() {
        this.setState({
            hintIndex: -1
        })
    }

    onKeyDown(e) {
        switch(e.keyCode) {
        case KEYCODE_DOWN:
            e.preventDefault()
            this.setState({
                hintIndex: Math.min(this.props.hints.length - 1, this.state.hintIndex + 1)
            })
            break;
        case KEYCODE_UP:
            e.preventDefault()
            this.setState({
                hintIndex: Math.max(-1, this.state.hintIndex - 1)
            })
            break;
        case KEYCODE_ENTER:
            if (this.state.hintIndex != -1) {
                e.preventDefault()
                this.selectHintIndex(this.state.hintIndex)
            }
            break;
        case KEYCODE_ESCAPE:
            e.preventDefault()
            this.setState({
                hintIndex: -1
            })
            break;
        }
    }

    renderHintsMenuRow(data) {
        let cells = []
        for (let x in data) {
            cells.push(
                <td key={x} style={{ width: cells.length ? 140 : "auto" }}>
                    <span className="text-muted">{x}: </span>
                    { data[x] }
                </td>
            )
        }
        return cells
    }

    renderHintsMenu() {
        if (!this.props.hints.length || this.state.hintIndex == -1 || !this.state.inputValue) {
            return null
        }

        if (this.state.loading) {
            return (
                <div role="menu" className="dropdown-menu">
                    <div className="text-center text-muted">
                        <Loader/>
                    </div>
                </div>
            )
        }

        return (
            <div role="menu" className="dropdown-menu">
                <table>
                    <tbody>
                        {
                            this.props.hints.map((h, i) => (
                                <tr key={ "hint-" + i } {
                                    ...(i === this.state.hintIndex ? { className: "active" } : {})
                                } onMouseDown={ this.selectHintIndex.bind(this, i) }
                                 onClick={ this.selectHintIndex.bind(this, i) }>
                                    { this.renderHintsMenuRow(h.data) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading   : false,
            inputValue: nextProps.inputValue || ""
        })
    }

    render() {
        let inputProps = {
            className  : "form-control",
            type       : "text",
            placeholder: this.props.placeholder || null,
            value      : this.state.inputValue,
            onChange   : this.onChange,
            onKeyDown  : this.onKeyDown,
            onBlur     : this.onBlur
        }

        return (
            <div className="dropdown open type-ahead">
                <input { ...inputProps } ref="input" />
                { this.renderHintsMenu() }
            </div>
        )
    }
}
