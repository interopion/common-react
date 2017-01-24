"use strict";

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

var Column = (_temp = _class = function (_React$Component) {
    _inherits(Column, _React$Component);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
    }

    return Column;
}(_react2.default.Component), _class.propTypes = {
    label: _react2.default.PropTypes.string,
    prop: _react2.default.PropTypes.string,
    sortable: _react2.default.PropTypes.bool,
    headerStyle: _react2.default.PropTypes.object,
    render: _react2.default.PropTypes.func
}, _class.defaultProps = {
    label: "",
    prop: null,
    sortable: false,
    headerStyle: null,
    render: function render() {
        return null;
    }
}, _temp);
exports.default = Column;