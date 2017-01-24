"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;
exports.wrap = wrap;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _PropertyGrid = require("../PropertyGrid/");

var _PropertyGrid2 = _interopRequireDefault(_PropertyGrid);

var _Loader = require("../Loader");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateRecordPage = (_temp = _class = function (_React$Component) {
    _inherits(CreateRecordPage, _React$Component);

    _createClass(CreateRecordPage, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.ignoreLastFetch = true;
        }
    }]);

    function CreateRecordPage() {
        var _Object$getPrototypeO;

        _classCallCheck(this, CreateRecordPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CreateRecordPage)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            record: _this.getEmptyRecord(),
            loading: false,
            error: null
        };
        _this.onSave = _this.onSave.bind(_this);
        return _this;
    }

    _createClass(CreateRecordPage, [{
        key: "onSave",
        value: function onSave(e) {
            var _this2 = this;

            e.preventDefault();
            var data = {};
            for (var x in this.state.record) {
                if (this.refs.grid.refs[x]) {
                    data[x] = this.refs.grid.refs[x].value;
                }
            }

            // data.id = this.state.record.id

            if (typeof this.props.onSave == "function") {
                return this.props.onSave(data);
            }

            // console.log(data)
            this.setState({ loading: true, error: null });
            this.props.schema.backend.create(this.props.mountPoint, data).then(function (record) {
                if (!_this2.ignoreLastFetch) {
                    // this.setState({ loading: false, record }, () => {
                    _this2.context.router.push("/" + _this2.props.mountPoint + "/" + record.id + "/edit");
                    // })
                }
            }, function (error) {
                if (!_this2.ignoreLastFetch) {
                    _this2.setState({ loading: false, error: error });
                }
            });
        }
    }, {
        key: "getEmptyRecord",
        value: function getEmptyRecord() {
            var rec = {};
            this.props.schema.columns.forEach(function (meta) {
                rec[meta.name] = "defaultValue" in meta ? meta.defaultValue : null;
            });
            return rec;
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return _react2.default.createElement(
                "h2",
                { style: { textTransform: "capitalize" }, className: "text-success" },
                _react2.default.createElement("i", { className: "glyphicon glyphicon-plus-sign" }),
                " Create New " + this.props.schema.label
            );
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                { className: "panel-footer" },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-xs-6 text-left" },
                        _react2.default.createElement(
                            "button",
                            { style: { minWidth: "10em", textTransform: "capitalize" },
                                className: "btn btn-default",
                                onClick: function onClick() {
                                    _this3.context.router.push("/" + _this3.props.mountPoint);
                                },
                                type: "button" },
                            _react2.default.createElement("i", { className: "glyphicon glyphicon-menu-left" }),
                            "\xA0",
                            "Browse " + this.props.schema.labelPlural
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-xs-6 text-right" },
                        _react2.default.createElement(
                            "button",
                            { style: { minWidth: "10em", textTransform: "capitalize" }, className: "btn btn-success", type: "submit" },
                            _react2.default.createElement("i", { className: "glyphicon glyphicon-plus-sign" }),
                            "\xA0",
                            "Create " + this.props.schema.label
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loading) {
                return _react2.default.createElement(_Loader2.default, null);
            }

            var error = this.state.error || null;
            if (error && (typeof error === "undefined" ? "undefined" : _typeof(error)) == "object") {
                try {
                    error = _react2.default.createElement(
                        "pre",
                        { className: "alert alert-danger" },
                        _react2.default.createElement(
                            "button",
                            { type: "button",
                                className: "close",
                                "data-dismiss": "alert",
                                "aria-label": "Close" },
                            _react2.default.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
                            )
                        ),
                        JSON.stringify(error, null, 4)
                    );
                } catch (ex) {
                    error = _react2.default.createElement(
                        "p",
                        { className: "text-danger" },
                        "Unknown error"
                    );
                }
            }

            return _react2.default.createElement(
                "form",
                { onSubmit: this.onSave },
                error || null,
                this.renderHeader(),
                _react2.default.createElement(_PropertyGrid2.default, {
                    ref: "grid",
                    schema: this.props.schema,
                    record: this.state.record,
                    gridProps: {
                        style: {
                            margin: 0
                        }
                    },
                    editable: true }),
                this.renderFooter()
            );
        }
    }]);

    return CreateRecordPage;
}(_react2.default.Component), _class.propTypes = {
    mountPoint: _react2.default.PropTypes.string.isRequired,
    schema: _react2.default.PropTypes.object.isRequired,
    params: _react2.default.PropTypes.object,
    onSave: _react2.default.PropTypes.func
}, _class.contextTypes = {
    router: _react2.default.PropTypes.object
}, _temp);
exports.default = CreateRecordPage;
function wrap(mountPoint, schema) {
    return function (props) {
        props = _jquery2.default.extend({}, props, {
            mountPoint: mountPoint,
            schema: schema
        });
        return _react2.default.createElement(CreateRecordPage, props);
    };
}