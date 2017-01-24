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

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordStrenghtMeter = (_temp = _class = function (_React$Component) {
    _inherits(PasswordStrenghtMeter, _React$Component);

    function PasswordStrenghtMeter() {
        var _Object$getPrototypeO;

        _classCallCheck(this, PasswordStrenghtMeter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PasswordStrenghtMeter)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            passwordStrenghtPCT: 0,
            passwordStrenghtTXT: "Too short!",
            passwordStrenghtCLS: "progress-bar-danger"
        };
        _this.onPasswordChange = _this.onPasswordChange.bind(_this);
        return _this;
    }

    _createClass(PasswordStrenghtMeter, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _jquery2.default)(document).on("input", this.props.for, this.onPasswordChange);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            (0, _jquery2.default)(document).off("input", this.props.for, this.onPasswordChange);
        }
    }, {
        key: "onPasswordChange",
        value: function onPasswordChange(e) {
            this.setPassword(e.target.value);
        }
    }, {
        key: "setPassword",
        value: function setPassword(password) {
            var len = password.length;
            var pct = Math.min(Math.round(len / 20 * 100), 100);
            var txt = "Perfect";
            var cls = "progress-bar-success";

            if (len < 6) {
                txt = "Too short!";
                cls = "progress-bar-danger";
            } else if (len < 10) {
                txt = "Bad";
                cls = "progress-bar-warning";
            } else if (len < 16) {
                txt = "Medium";
                cls = "progress-bar-info";
            } else if (len < 20) {
                txt = "Good";
                cls = "progress-bar-primary";
            }

            this.setState({
                passwordStrenghtPCT: pct,
                passwordStrenghtTXT: txt,
                passwordStrenghtCLS: cls
            });
        }
    }, {
        key: "render",
        value: function render() {
            var className = "progress-bar " + this.state.passwordStrenghtCLS;
            var width = this.state.passwordStrenghtPCT + "%";
            if (this.props.striped) {
                className += " progress-bar-striped";
            }
            return _react2.default.createElement(
                "div",
                { className: "progress password-strenght",
                    style: this.state.passwordStrenghtPCT ? undefined : { opacity: 0.5 } },
                _react2.default.createElement(
                    "div",
                    { className: className, style: { width: width } },
                    _react2.default.createElement(
                        "span",
                        { ref: "pctBarLabel" },
                        this.state.passwordStrenghtPCT ? this.state.passwordStrenghtTXT : "N/A"
                    )
                )
            );
        }
    }]);

    return PasswordStrenghtMeter;
}(_react2.default.Component), _class.propTypes = {
    for: _react2.default.PropTypes.string.isRequired,
    striped: _react2.default.PropTypes.bool
}, _class.defaultProps = {
    striped: true
}, _temp);
exports.default = PasswordStrenghtMeter;