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
 *   onChange - (Function) If provided it will be called with the new page number
 */
var SimplePaginator = (_temp = _class = function (_React$Component) {
    _inherits(SimplePaginator, _React$Component);

    function SimplePaginator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, SimplePaginator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SimplePaginator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.currentPage = _this.props.currentPage;
        return _this;
    }

    _createClass(SimplePaginator, [{
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
            var cur = this.props.currentPage;

            return _react2.default.createElement(
                "nav",
                null,
                _react2.default.createElement(
                    "button",
                    {
                        className: "btn btn-sm btn-default",
                        style: { minWidth: "8em", backgroundImage: "none", boxShadow: "none" },
                        disabled: this.props.disabled || cur === 1,
                        title: "Go to the previous page",
                        onClick: this.setPage.bind(this, cur - 1) },
                    _react2.default.createElement("i", { className: "glyphicon glyphicon-menu-left" }),
                    "\xA0Previous"
                ),
                "\xA0",
                _react2.default.createElement(
                    "button",
                    {
                        className: "btn btn-sm btn-default",
                        style: { minWidth: "8em", backgroundImage: "none", boxShadow: "none" },
                        disabled: this.props.disabled || cur === this.props.totalPages,
                        onClick: this.setPage.bind(this, cur + 1),
                        title: "Go to the next page" },
                    "Next\xA0",
                    _react2.default.createElement("i", { className: "glyphicon glyphicon-menu-right" })
                )
            );
        }
    }]);

    return SimplePaginator;
}(_react2.default.Component), _class.propTypes = {
    currentPage: _react2.default.PropTypes.number,
    totalPages: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func,
    disabled: _react2.default.PropTypes.bool
}, _class.defaultProps = {
    currentPage: 1,
    totalPages: 1,
    onChange: _jquery2.default.noop,
    disabled: false
}, _temp);
exports.default = SimplePaginator;