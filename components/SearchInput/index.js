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

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInput = (_temp = _class = function (_React$Component) {
    _inherits(SearchInput, _React$Component);

    function SearchInput() {
        _classCallCheck(this, SearchInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SearchInput).apply(this, arguments));
    }

    _createClass(SearchInput, [{
        key: "onClear",
        value: function onClear() {
            if (this.refs.input.value) {
                var e = new _jquery2.default.Event("click");
                (0, _jquery2.default)(this.refs.input).val("").trigger(e);
                if (this.props.onChange) {
                    this.props.onChange(e);
                }
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.refs.btn.style.display = this.refs.input.value ? "block" : "none";
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "search-input" },
                _react2.default.createElement("input", _extends({
                    type: "search",
                    placeholder: "Search",
                    className: "form-control"
                }, this.props, {
                    ref: "input"
                })),
                _react2.default.createElement("i", { ref: "btn",
                    className: "glyphicon glyphicon-remove-circle",
                    title: "Clear",
                    onClick: this.onClear.bind(this),
                    style: { display: this.props.value ? "block" : "none" } })
            );
        }
    }]);

    return SearchInput;
}(_react2.default.Component), _class.propTypes = {
    value: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func
}, _temp);
exports.default = SearchInput;