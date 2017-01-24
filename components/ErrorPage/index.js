"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorPage = (_temp = _class = function (_React$Component) {
    _inherits(ErrorPage, _React$Component);

    function ErrorPage() {
        _classCallCheck(this, ErrorPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorPage).apply(this, arguments));
    }

    _createClass(ErrorPage, [{
        key: "renderStack",
        value: function renderStack() {
            if (!this.props.stack) {
                return null;
            }

            return _react2.default.createElement(
                "pre",
                null,
                this.props.stack
            );
        }
    }, {
        key: "renderCode",
        value: function renderCode() {
            if (!this.props.code) {
                return null;
            }

            return _react2.default.createElement(
                "span",
                { className: "label label-danger",
                    style: { paddingTop: "0 0.3em", verticalAlign: "top" } },
                this.props.code
            );
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "panel panel-default navbar-default" },
                _react2.default.createElement(
                    "div",
                    { className: "panel-body" },
                    _react2.default.createElement(
                        "h2",
                        { className: "text-danger text-center" },
                        this.renderCode(),
                        "\xA0",
                        this.props.message,
                        _react2.default.createElement("br", null)
                    ),
                    _react2.default.createElement("br", null),
                    this.renderStack()
                )
            );
        }
    }]);

    return ErrorPage;
}(_react2.default.Component), _class.propTypes = {
    code: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    message: _react2.default.PropTypes.string,
    stack: _react2.default.PropTypes.string
}, _class.defaultProps = {
    code: "",
    message: "Unknown Error",
    stack: ""
}, _temp);
exports.default = ErrorPage;