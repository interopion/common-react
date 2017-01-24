"use strict";

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

var _PropertyGrid = require("../PropertyGrid");

var _PropertyGrid2 = _interopRequireDefault(_PropertyGrid);

var _Loader = require("../Loader");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteRecordPage = (_temp = _class = function (_React$Component) {
    _inherits(DeleteRecordPage, _React$Component);

    _createClass(DeleteRecordPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.findRecord();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.ignoreLastFetch = true;
        }
    }]);

    function DeleteRecordPage() {
        var _Object$getPrototypeO;

        _classCallCheck(this, DeleteRecordPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DeleteRecordPage)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            record: null,
            loading: true,
            error: null
        };
        return _this;
    }

    _createClass(DeleteRecordPage, [{
        key: "findRecord",
        value: function findRecord() {
            var _this2 = this;

            this.setState({ loading: true, error: null });
            this.props.schema.backend.find(this.props.mountPoint, this.props.params.id).then(function (record) {
                if (!_this2.ignoreLastFetch) {
                    _this2.setState({ loading: false, record: record });
                }
            }, function (error) {
                if (!_this2.ignoreLastFetch) {
                    _this2.setState({ loading: false, error: error });
                }
            });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return _react2.default.createElement(
                "h2",
                { className: "text-center text-danger" },
                "Please Confirm!"
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
                            { style: { minWidth: "12em" }, className: "btn btn-danger", onClick: this.onDelete.bind(this) },
                            _react2.default.createElement("i", { className: "glyphicon glyphicon-trash" }),
                            " Delete Record"
                        )
                    )
                )
            );
        }
    }, {
        key: "onDelete",
        value: function onDelete() {
            var _this4 = this;

            this.setState({ loading: true, error: null });
            this.props.schema.backend.destroy(this.props.mountPoint, this.props.params.id).then(function (record) {
                if (!_this4.ignoreLastFetch) {
                    _this4.setState({ loading: false, record: record });
                    _this4.context.router.push("/" + _this4.props.mountPoint);
                }
            }, function (error) {
                if (!_this4.ignoreLastFetch) {
                    _this4.setState({ loading: false, error: error });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loading) {
                return _react2.default.createElement(_Loader2.default, null);
            }

            return _react2.default.createElement(
                "div",
                null,
                this.state.error ? _react2.default.createElement(
                    "p",
                    { className: "text-danger" },
                    this.state.error
                ) : null,
                this.renderHeader(),
                _react2.default.createElement(_PropertyGrid2.default, {
                    record: this.state.record,
                    schema: this.props.schema,
                    gridProps: {
                        className: "table table-condensed text-danger table-striped",
                        style: {
                            margin: 0
                        }
                    }
                }),
                this.renderFooter()
            );
        }
    }]);

    return DeleteRecordPage;
}(_react2.default.Component), _class.propTypes = {
    mountPoint: _react2.default.PropTypes.string.isRequired,
    schema: _react2.default.PropTypes.object.isRequired,
    params: _react2.default.PropTypes.object,
    onDelete: _react2.default.PropTypes.func,
    buttons: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.boolean])
}, _class.contextTypes = {
    router: _react2.default.PropTypes.object
}, _temp);
exports.default = DeleteRecordPage;
function wrap(mountPoint, schema) {
    return function (props) {
        props = _jquery2.default.extend({}, props, {
            mountPoint: mountPoint,
            schema: schema
        });
        return _react2.default.createElement(DeleteRecordPage, props);
    };
}