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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListGroupItem = (_temp = _class = function (_React$Component) {
    _inherits(ListGroupItem, _React$Component);

    function ListGroupItem() {
        _classCallCheck(this, ListGroupItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ListGroupItem).apply(this, arguments));
    }

    _createClass(ListGroupItem, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var selected = _props.selected;
            var heading = _props.heading;
            var text = _props.text;
            var className = _props.className;
            var icon = _props.icon;

            var rest = _objectWithoutProperties(_props, ["selected", "heading", "text", "className", "icon"]);

            var cls = "list-group-item";

            if (this.props.selected) {
                // cls += " active"
                cls += " list-group-item-info";
            }

            if (icon) {
                cls += " has-icon";
            }

            if (className) {
                cls += " " + className;
            }

            return _react2.default.createElement(
                "div",
                _extends({ className: cls }, rest, { draggable: true }),
                icon ? _react2.default.createElement("i", { className: "list-group-item-text " + icon }) : null,
                _react2.default.createElement(
                    "div",
                    { className: "list-group-item-heading" },
                    this.props.heading
                ),
                this.props.text ? _react2.default.createElement(
                    "div",
                    { className: "list-group-item-text" },
                    this.props.text
                ) : null
            );
        }
    }]);

    return ListGroupItem;
}(_react2.default.Component), _class.propTypes = {
    selected: _react2.default.PropTypes.bool,
    heading: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.string
}, _temp);
exports.default = ListGroupItem;