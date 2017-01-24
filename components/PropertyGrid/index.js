"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var PropertyGrid = (_temp = _class = function (_React$Component) {
    _inherits(PropertyGrid, _React$Component);

    function PropertyGrid() {
        _classCallCheck(this, PropertyGrid);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PropertyGrid).apply(this, arguments));
    }

    _createClass(PropertyGrid, [{
        key: "renderCellValue",
        value: function renderCellValue(val, name, meta, record) {
            if (this.props.editable) {
                return meta.editor ? meta.editor(record) : _react2.default.createElement("input", { type: "text",
                    ref: name,
                    name: name,
                    defaultValue: String(val || val === 0 ? val : ""),
                    className: "form-control",
                    readOnly: !!meta.primaryKey });
            }

            if (meta.render) {
                return meta.render(record, meta);
            }

            if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
                return _react2.default.createElement(PropertyGrid, { record: val, gridProps: {
                        className: "table table-bordered table-condensed small",
                        style: {
                            margin: 0
                        }
                    } });
            }

            return String(val);
        }
    }, {
        key: "renderHeadingValue",
        value: function renderHeadingValue(val, record) {
            if (typeof val == "function") {
                return val(record);
            }

            if (this.props.editable) {
                return _react2.default.createElement(
                    "label",
                    { className: "form-control-static" },
                    val
                );
            }

            return val;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var record = this.props.record || {};
            var rows = [];
            var noTH = Array.isArray(record) && record.length === 1;
            var props = Object.keys(record).sort(function (a, b) {
                return _this2.props.schema.columns.findIndex(function (c) {
                    return c.name === a;
                }) - _this2.props.schema.columns.findIndex(function (c) {
                    return c.name === b;
                });
            });
            props.forEach(function (x) {
                // for (let x in record) {
                var meta = _this2.props.schema.columns.find(function (c) {
                    return c.name === x;
                }) || {};

                // If the property is defined as hidden don't render the row
                if (meta.hidden) {
                    // continue;
                    return;
                }

                // If the grid is in edit mode and this property is not editable
                // then just skip the ntire row
                if (_this2.props.editable && meta.editable === false) {
                    // continue;
                    return;
                }

                rows.push(_react2.default.createElement(
                    "tr",
                    { key: x },
                    noTH ? null : _react2.default.createElement(
                        "th",
                        { className: "text-right" },
                        _this2.renderHeadingValue(meta.label || x, record)
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _this2.renderCellValue(record[x], x, meta, record)
                    )
                ));
            });

            if (!rows.length) {
                rows = _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { className: "text-muted text-center" },
                        "No Properties Found"
                    )
                );
            }

            return _react2.default.createElement(
                "table",
                _extends({ className: "table table-striped" }, this.props.gridProps),
                _react2.default.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return PropertyGrid;
}(_react2.default.Component), _class.propTypes = {
    record: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),
    editable: _react2.default.PropTypes.bool,
    gridProps: _react2.default.PropTypes.object,
    schema: _react2.default.PropTypes.object
}, _class.defaultProps = {
    gridProps: {},
    schema: {
        columns: []
    }
}, _temp);
exports.default = PropertyGrid;