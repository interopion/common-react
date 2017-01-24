import React  from "react"
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
        inputValue : React.PropTypes.string,
        inputProps : React.PropTypes.object
    };

    static defaultProps = {
        onSearch: () => false,
        onSubmit: () => false,
        hints: [],
        hintIndex: 0,
        inputProps: {}
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
                loading   : false,
                isOpen    : false
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
            loading   : true,
            isOpen    : true
        }, () => {
            if (this._searchDelay) {
                clearTimeout(this._searchDelay)
            }
            this._searchDelay = setTimeout(() => {
                this.props.onSearch(e.target.value)
            }, 350)
        })
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
                hintIndex : index,
                isOpen    : false
            }, () => {
                this.props.onSubmit(hint.raw)
            })
        }
    }

    onBlur() {
        this.setState({
            isOpen: false
        })
    }

    onKeyDown(e) {
        switch(e.keyCode) {
        case KEYCODE_DOWN:
            e.preventDefault()
            this.setState(
                this.state.isOpen ?
                { hintIndex: Math.min(this.props.hints.length - 1, this.state.hintIndex + 1) } :
                { isOpen: true }
            )
            break;
        case KEYCODE_UP:
            e.preventDefault()
            let newIndex = Math.max(-1, this.state.hintIndex - 1)
            this.setState({
                hintIndex: Math.max(newIndex, 0),
                isOpen: newIndex > -1
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
                isOpen: false
            })
            break;
        }
    }

    toggleMenu(event) {
        if (event) {
            event.preventDefault()
            this.refs.input.focus()
        }

        let newState = { isOpen: !this.state.isOpen }
        if (newState.isOpen && this.state.hintIndex == -1 && this.props.hints.length) {
            newState.hintIndex = 0
        }
        this.setState(newState)
    }

    renderHintsMenuRow(data) {
        let cells = []
        for (let x in data) {
            cells.push(
                <td key={x}>
                    <span className="text-muted">{x}: </span>
                    { data[x] }
                </td>
            )
        }
        return cells
    }

    renderHintsMenu() {

        if (!this.state.isOpen) {
            return null
        }

        if (this.state.loading) {
            return (
                <div role="menu" className="dropdown-menu">
                    <div className="text-center text-muted">
                        Loading...
                    </div>
                </div>
            )
        }

        if (!this.props.hints.length/* || !this.state.inputValue*/) {
            return (
                <div role="menu" className="dropdown-menu">
                    <div className="text-center text-muted">
                        No Entries
                    </div>
                </div>
            )
        }

        if (this.state.hintIndex == -1) {
            return null
        }

        return (
            <div role="menu" className="dropdown-menu">
                <table style={{ width: "100%" }}>
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
        let nextState = { loading: false }
        if (!this.state.loading) {
            nextState.inputValue = nextProps.inputValue || ""
        }
        this.setState(nextState)
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

        let isOpen = !!this.state.isOpen

        return (
            <div className={ "dropdown open type-ahead" + (this.state.loading ? " loading" : "") }>
                <input { ...inputProps } { ...this.props.inputProps } ref="input" />
                <button
                    tabIndex="-1"
                    type="button"
                    className={ "btn btn-default" + ( isOpen ? " active" : "") }
                    onMouseDown={ ::this.toggleMenu }
                    style={{
                        position    : "absolute",
                        top         : 1,
                        right       : 1,
                        borderColor : "rgba(0, 0, 0, 0.1)",
                        borderWidth : "0 0 0 1px",
                        outline     : 0,
                        borderRadius: "0 3px 3px 0"
                    }}
                ><span className="caret" style={
                    isOpen ? {
                        transform: "translateY(-2px) rotate(-180deg)"
                    } : null
                }/></button>
                { this.renderHintsMenu() }
            </div>
        )
    }
}
