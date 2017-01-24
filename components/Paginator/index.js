"use strict";

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

var _PaginatorButton = require("./PaginatorButton");

var _PaginatorButton2 = _interopRequireDefault(_PaginatorButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Eaxample usage (minimal):
 *   <Paginator totalPages={10} currentPage={5} />
 *
 * Props:
 *   totalPages  - (Number)
 *   currentPage - (Number)
 *   range - (Number) The number of buttons to show before and after the current
 *   onChange - (Function) If provided it will be called with the new page number
 */
var Paginator = (_temp = _class = function (_React$Component) {
    _inherits(Paginator, _React$Component);

    function Paginator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, Paginator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paginator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.currentPage = _this.props.currentPage;
        return _this;
    }

    _createClass(Paginator, [{
        key: "setPage",
        value: function setPage(n, event) {
            if (event && (0, _jquery2.default)(event.target).closest(".disabled").length) {
                return false;
            }
            n = parseFloat(n);
            if (!isNaN(n) && isFinite(n) && this.currentPage !== n) {
                this.currentPage = n;
                this.props.onChange(n);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var pageLinks = [];
            var cur = this.props.currentPage;
            var rng = this.props.range;
            var start = Math.max(cur - rng, 1);
            var end = Math.min(cur + rng, this.props.totalPages);
            for (var i = start; i <= end; i++) {
                var className = this.props.disabled ? "disabled" : "";
                if (i === cur) {
                    className += " active";
                }
                pageLinks.push(_react2.default.createElement(
                    _PaginatorButton2.default,
                    { key: i, className: className, onClick: this.setPage.bind(this, i),
                        title: "Go to Page " + i },
                    i
                ));
            }

            return _react2.default.createElement(
                "nav",
                null,
                _react2.default.createElement(
                    "ul",
                    { className: "pagination pagination-sm", style: { margin: "0 0 -5px" } },
                    _react2.default.createElement(
                        _PaginatorButton2.default,
                        {
                            onClick: this.setPage.bind(this, 1),
                            title: "Go to First Page",
                            className: this.props.disabled || cur === 1 ? "disabled" : "" },
                        _react2.default.createElement("span", { "aria-hidden": "true", className: "glyphicon glyphicon-fast-backward" })
                    ),
                    _react2.default.createElement(
                        _PaginatorButton2.default,
                        {
                            onClick: this.setPage.bind(this, cur - 1),
                            title: "Go to Previous Page",
                            className: this.props.disabled || cur === 1 ? "disabled" : "" },
                        _react2.default.createElement("span", { "aria-hidden": "true", className: "glyphicon glyphicon-step-backward" })
                    ),
                    pageLinks,
                    _react2.default.createElement(
                        _PaginatorButton2.default,
                        {
                            onClick: this.setPage.bind(this, cur + 1),
                            title: "Go to Next Page",
                            className: this.props.disabled || cur === this.props.totalPages ? "disabled" : "" },
                        _react2.default.createElement("span", { "aria-hidden": "true", className: "glyphicon glyphicon-step-forward" })
                    ),
                    _react2.default.createElement(
                        _PaginatorButton2.default,
                        {
                            onClick: this.setPage.bind(this, this.props.totalPages),
                            title: "Go to Last Page",
                            className: this.props.disabled || cur === this.props.totalPages ? "disabled" : "" },
                        _react2.default.createElement("span", { "aria-hidden": "true", className: "glyphicon glyphicon-fast-forward" })
                    )
                )
            );
        }
    }]);

    return Paginator;
}(_react2.default.Component), _class.propTypes = {
    currentPage: _react2.default.PropTypes.number,
    totalPages: _react2.default.PropTypes.number,
    range: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func,
    disabled: _react2.default.PropTypes.bool
}, _class.defaultProps = {
    currentPage: 1,
    totalPages: 1,
    range: 3,
    onChange: _jquery2.default.noop,
    disabled: false
}, _temp);
exports.default = Paginator;