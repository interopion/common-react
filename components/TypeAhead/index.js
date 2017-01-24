"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_ENTER = 13;
var KEYCODE_ESCAPE = 27;

var TypeAhead = (_temp = _class = function (_React$Component) {
    _inherits(TypeAhead, _React$Component);

    function TypeAhead() {
        var _Object$getPrototypeO;

        _classCallCheck(this, TypeAhead);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TypeAhead)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            inputValue: _this.props.inputValue || "",
            hintIndex: -1,
            loading: false
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(TypeAhead, [{
        key: "onChange",
        value: function onChange(e) {
            var _this2 = this;

            var val = e.target.value.trim();

            if (!val) {
                return this.setState({
                    inputValue: e.target.value,
                    hintIndex: -1,
                    loading: false,
                    isOpen: false
                });
            }

            if (val === this.state.inputValue) {
                return this.setState({
                    inputValue: e.target.value
                });
            }

            this.setState({
                inputValue: e.target.value,
                hintIndex: 0,
                loading: true,
                isOpen: true
            }, function () {
                if (_this2._searchDelay) {
                    clearTimeout(_this2._searchDelay);
                }
                _this2._searchDelay = setTimeout(function () {
                    _this2.props.onSearch(e.target.value);
                }, 350);
            });
        }
    }, {
        key: "selectHintIndex",
        value: function selectHintIndex(index, event) {
            var _this3 = this;

            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var hint = this.props.hints[index];
            if (hint) {
                // this.props.onSubmit(hint.data)
                this.setState({
                    inputValue: hint.value,
                    hintIndex: index,
                    isOpen: false
                }, function () {
                    _this3.props.onSubmit(hint.raw);
                });
            }
        }
    }, {
        key: "onBlur",
        value: function onBlur() {
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            switch (e.keyCode) {
                case KEYCODE_DOWN:
                    e.preventDefault();
                    this.setState(this.state.isOpen ? { hintIndex: Math.min(this.props.hints.length - 1, this.state.hintIndex + 1) } : { isOpen: true });
                    break;
                case KEYCODE_UP:
                    e.preventDefault();
                    var newIndex = Math.max(-1, this.state.hintIndex - 1);
                    this.setState({
                        hintIndex: Math.max(newIndex, 0),
                        isOpen: newIndex > -1
                    });
                    break;
                case KEYCODE_ENTER:
                    if (this.state.hintIndex != -1) {
                        e.preventDefault();
                        this.selectHintIndex(this.state.hintIndex);
                    }
                    break;
                case KEYCODE_ESCAPE:
                    e.preventDefault();
                    this.setState({
                        isOpen: false
                    });
                    break;
            }
        }
    }, {
        key: "toggleMenu",
        value: function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                this.refs.input.focus();
            }

            var newState = { isOpen: !this.state.isOpen };
            if (newState.isOpen && this.state.hintIndex == -1 && this.props.hints.length) {
                newState.hintIndex = 0;
            }
            this.setState(newState);
        }
    }, {
        key: "renderHintsMenuRow",
        value: function renderHintsMenuRow(data) {
            var cells = [];
            for (var x in data) {
                cells.push(_react2.default.createElement(
                    "td",
                    { key: x },
                    _react2.default.createElement(
                        "span",
                        { className: "text-muted" },
                        x,
                        ": "
                    ),
                    data[x]
                ));
            }
            return cells;
        }
    }, {
        key: "renderHintsMenu",
        value: function renderHintsMenu() {
            var _this4 = this;

            if (!this.state.isOpen) {
                return null;
            }

            if (this.state.loading) {
                return _react2.default.createElement(
                    "div",
                    { role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "div",
                        { className: "text-center text-muted" },
                        "Loading..."
                    )
                );
            }

            if (!this.props.hints.length /* || !this.state.inputValue*/) {
                    return _react2.default.createElement(
                        "div",
                        { role: "menu", className: "dropdown-menu" },
                        _react2.default.createElement(
                            "div",
                            { className: "text-center text-muted" },
                            "No Entries"
                        )
                    );
                }

            if (this.state.hintIndex == -1) {
                return null;
            }

            return _react2.default.createElement(
                "div",
                { role: "menu", className: "dropdown-menu" },
                _react2.default.createElement(
                    "table",
                    { style: { width: "100%" } },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        this.props.hints.map(function (h, i) {
                            return _react2.default.createElement(
                                "tr",
                                _extends({ key: "hint-" + i }, i === _this4.state.hintIndex ? { className: "active" } : {}, { onMouseDown: _this4.selectHintIndex.bind(_this4, i),
                                    onClick: _this4.selectHintIndex.bind(_this4, i) }),
                                _this4.renderHintsMenuRow(h.data)
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var nextState = { loading: false };
            if (!this.state.loading) {
                nextState.inputValue = nextProps.inputValue || "";
            }
            this.setState(nextState);
        }
    }, {
        key: "render",
        value: function render() {
            var inputProps = {
                className: "form-control",
                type: "text",
                placeholder: this.props.placeholder || null,
                value: this.state.inputValue,
                onChange: this.onChange,
                onKeyDown: this.onKeyDown,
                onBlur: this.onBlur
            };

            var isOpen = !!this.state.isOpen;

            return _react2.default.createElement(
                "div",
                { className: "dropdown open type-ahead" + (this.state.loading ? " loading" : "") },
                _react2.default.createElement("input", _extends({}, inputProps, this.props.inputProps, { ref: "input" })),
                _react2.default.createElement(
                    "button",
                    {
                        tabIndex: "-1",
                        type: "button",
                        className: "btn btn-default" + (isOpen ? " active" : ""),
                        onMouseDown: this.toggleMenu.bind(this),
                        style: {
                            position: "absolute",
                            top: 1,
                            right: 1,
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            borderWidth: "0 0 0 1px",
                            outline: 0,
                            borderRadius: "0 3px 3px 0"
                        }
                    },
                    _react2.default.createElement("span", { className: "caret", style: isOpen ? {
                            transform: "translateY(-2px) rotate(-180deg)"
                        } : null })
                ),
                this.renderHintsMenu()
            );
        }
    }]);

    return TypeAhead;
}(_react2.default.Component), _class.propTypes = {
    onSearch: _react2.default.PropTypes.func,
    onSubmit: _react2.default.PropTypes.func,
    hints: _react2.default.PropTypes.array,
    placeholder: _react2.default.PropTypes.string,
    inputValue: _react2.default.PropTypes.string,
    inputProps: _react2.default.PropTypes.object
}, _class.defaultProps = {
    onSearch: function onSearch() {
        return false;
    },
    onSubmit: function onSubmit() {
        return false;
    },
    hints: [],
    hintIndex: 0,
    inputProps: {}
}, _temp);
exports.default = TypeAhead;