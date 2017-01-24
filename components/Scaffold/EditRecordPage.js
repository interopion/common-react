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

var _PropertyGrid = require("../PropertyGrid/");

var _PropertyGrid2 = _interopRequireDefault(_PropertyGrid);

var _Loader = require("../Loader");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditRecordPage = (_temp = _class = function (_React$Component) {
    _inherits(EditRecordPage, _React$Component);

    _createClass(EditRecordPage, [{
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

    function EditRecordPage() {
        var _Object$getPrototypeO;

        _classCallCheck(this, EditRecordPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EditRecordPage)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            record: null,
            loading: true,
            error: null
        };
        _this.onDelete = _this.onDelete.bind(_this);
        return _this;
    }

    _createClass(EditRecordPage, [{
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
        key: "onDelete",
        value: function onDelete() {
            if (typeof this.props.onDelete == "function") {
                return this.props.onDelete();
            }

            this.context.router.push("/" + this.props.mountPoint + "/" + this.state.record.id + "/delete");
        }
    }, {
        key: "onEdit",
        value: function onEdit(e) {
            var _this3 = this;

            e.preventDefault();

            var data = {};
            for (var x in this.state.record) {
                if (this.refs.grid.refs[x]) {
                    if (this.refs.grid.refs[x].value + "" != "null") {
                        data[x] = this.refs.grid.refs[x].value;
                    }
                }
            }

            data.id = this.state.record.id;

            if (typeof this.props.onEdit == "function") {
                return this.props.onEdit(data);
            }

            // console.log(data)
            this.setState({ loading: true, error: null });
            this.props.schema.backend.update(this.props.mountPoint, data).then(function (record) {
                if (!_this3.ignoreLastFetch) {
                    _this3.setState({ loading: false, record: record });
                }
            }, function (error) {
                if (!_this3.ignoreLastFetch) {
                    _this3.setState({ loading: false, error: error });
                }
            });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            if (this.props.title === false) {
                return null;
            }

            return _react2.default.createElement(
                "h2",
                { style: { textTransform: "capitalize" } },
                this.props.title || "Edit " + this.props.schema.label
            );
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            var _this4 = this;

            var buttons = this.props.buttons;

            if (!buttons) {

                // Parent can pass buttons={false} to hide the footer
                if (buttons === false) {
                    return null;
                }

                // Generate default buttons - edit and delete
                buttons = _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement(
                        "button",
                        { style: { minWidth: "10em" }, type: "submit", className: "btn btn-success" },
                        _react2.default.createElement("i", { className: "glyphicon glyphicon-edit" }),
                        " Save"
                    ),
                    _react2.default.createElement(
                        "span",
                        null,
                        "\xA0"
                    ),
                    _react2.default.createElement(
                        "button",
                        { style: { minWidth: "10em" }, type: "button", className: "btn btn-danger", onClick: this.onDelete },
                        _react2.default.createElement("i", { className: "glyphicon glyphicon-trash" }),
                        " Delete"
                    )
                );
            }

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
                                    _this4.context.router.push("/" + _this4.props.mountPoint);
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
                        buttons
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

            return _react2.default.createElement(
                "form",
                { onSubmit: this.onEdit.bind(this) },
                this.state.error ? _react2.default.createElement(
                    "p",
                    { className: "text-danger" },
                    this.state.error
                ) : null,
                this.renderHeader(),
                _react2.default.createElement(_PropertyGrid2.default, {
                    ref: "grid",
                    schema: this.props.schema,
                    record: this.state.record,
                    primaryKey: this.props.primaryKey,
                    editable: true,
                    gridProps: {
                        style: { margin: 0 }
                    } }),
                this.renderFooter()
            );
        }
    }]);

    return EditRecordPage;
}(_react2.default.Component), _class.propTypes = {
    mountPoint: _react2.default.PropTypes.string.isRequired,
    schema: _react2.default.PropTypes.object.isRequired,
    params: _react2.default.PropTypes.object,
    onEdit: _react2.default.PropTypes.func,
    onDelete: _react2.default.PropTypes.func,
    primaryKey: _react2.default.PropTypes.string,
    buttons: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.boolean]),
    title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.element])
}, _class.contextTypes = {
    router: _react2.default.PropTypes.object
}, _temp);
exports.default = EditRecordPage;
function wrap(mountPoint, schema) {
    return function (props) {
        props = _jquery2.default.extend({}, props, {
            mountPoint: mountPoint,
            schema: schema
        });
        return _react2.default.createElement(EditRecordPage, props);
    };
}