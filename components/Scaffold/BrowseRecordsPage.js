"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (mountPoint, schema) {
    return function (props) {
        props = _jquery2.default.extend({}, props, {
            mountPoint: mountPoint,
            schema: schema
        });
        return _react2.default.createElement(BrowseRecordsPage, props);
    };
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _Grid = require("../Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function access(obj, prop) {
    if (typeof obj[prop] == "function") {
        return obj[prop]();
    }
    return obj[prop];
}

var BrowseRecordsPage = (_temp = _class = function (_React$Component) {
    _inherits(BrowseRecordsPage, _React$Component);

    function BrowseRecordsPage() {
        var _Object$getPrototypeO;

        _classCallCheck(this, BrowseRecordsPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BrowseRecordsPage)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            data: [],
            loading: true,
            total: 0,
            error: null,
            params: {
                limit: 10,
                offset: 0,
                sortcol: "",
                sortdir: "",
                search: ""
            }
        };
        _this.onRowClick = _this.onRowClick.bind(_this);
        _this.fetch = _this.fetch.bind(_this);
        return _this;
    }

    _createClass(BrowseRecordsPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetch(this.state.params);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.ignoreLastFetch = true;
        }
    }, {
        key: "fetch",
        value: function fetch(params) {
            var _this2 = this;

            var offset = params.offset;
            var limit = params.limit;
            var sortdir = params.sortdir;
            var sortcol = params.sortcol;
            var search = params.search;

            var q = this.state.params;
            this.setState({ loading: true, error: null });

            return this.props.schema.backend.fetch(this.props.mountPoint, params).then(function (data) {
                if (!_this2.ignoreLastFetch) {
                    _jquery2.default;
                    _this2.setState({
                        loading: false,
                        data: data.results,
                        total: data.total,
                        params: {
                            offset: offset === undefined ? q.offset || 0 : offset || undefined,
                            limit: limit === undefined ? q.limit || _this2.props.defaultLimit : limit || _this2.props.defaultLimit,
                            sortdir: sortdir || q.sortdir || undefined,
                            sortcol: sortcol || q.sortcol || undefined,
                            search: search || undefined
                        }
                    });
                }
            }, function (error) {
                if (!_this2.ignoreLastFetch) {
                    _this2.setState({
                        loading: false,
                        error: String(error)
                    });
                }
            });
        }
    }, {
        key: "onRowClick",
        value: function onRowClick(rec) {
            this.context.router.push({
                pathname: this.props.mountPoint + "/" + rec.id
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            /*
            cols           : PropTypes.array,
            rows           : PropTypes.array,
            onRowClick     : PropTypes.func,
            hovered        : PropTypes.bool,
            bordered       : PropTypes.bool,
            striped        : PropTypes.bool,
            condensed      : PropTypes.bool,
            parse          : PropTypes.func,
            fetch          : PropTypes.func.isRequired,
            sortdir        : PropTypes.string,
            sortcol        : PropTypes.string,
            limit          : PropTypes.number,
            offset         : PropTypes.number,
            total          : PropTypes.number,
            loading        : PropTypes.bool,
            simplePaginator: PropTypes.bool,
            error          : PropTypes.string,
            searchDelay    : PropTypes.number,
            getRowProps    : PropTypes.func,
            rowStyle       : PropTypes.object,
            emptyMessage   : PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
            search         : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ])
            */
            var search = this.state.params.search;
            var cols = this.props.schema.columns.filter(function (c) {
                return !access(c, "hidden");
            }).map(function (c) {
                var meta = {
                    prop: access(c, "name"),
                    label: access(c, "label") || access(c, "name"),
                    sortable: access(c, "sortable")
                };

                _jquery2.default.extend(meta, c.list || {});

                var searchable = access(c, "searchable");
                if (search && searchable) {
                    if (typeof c.render == "function") {
                        meta.render = function (o) {
                            var rec = _jquery2.default.extend({}, o);
                            rec["__" + meta.prop] = o[meta.prop];
                            rec[meta.prop] = (0, _lib.renderSearchHighlight)(o[meta.prop], search);
                            return c.render(rec);
                        };
                    } else {
                        meta.render = function (o) {
                            return (0, _lib.renderSearchHighlight)(o[meta.prop], search);
                        };
                    }
                } else {
                    if (typeof c.render == "function") {
                        meta.render = c.render;
                    }
                }

                return meta;
            });
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "h2",
                    { style: { textTransform: "capitalize", marginTop: 0 }, className: "page-header" },
                    _react2.default.createElement("i", { className: "glyphicon glyphicon-list text-muted" }),
                    " Browse " + this.props.schema.labelPlural
                ),
                _react2.default.createElement(_Grid2.default, {
                    cols: cols,
                    fetch: this.fetch,
                    sortcol: this.state.params.sortcol,
                    sortdir: this.state.params.sortdir,
                    offset: this.state.params.offset,
                    limit: this.state.params.limit,
                    search: this.state.params.search,
                    rows: this.state.data,
                    total: this.state.total,
                    loading: this.state.loading,
                    error: this.state.error,
                    onRowClick: this.onRowClick,
                    rowStyle: { cursor: "pointer" },
                    hovered: true
                }),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    "div",
                    { className: "text-right" },
                    _react2.default.createElement(
                        "button",
                        {
                            className: "btn btn-success",
                            onClick: function onClick() {
                                return _this3.context.router.push("/" + _this3.props.mountPoint + "/create");
                            },
                            style: { textTransform: "capitalize" } },
                        _react2.default.createElement("i", { className: "glyphicon glyphicon-plus-sign" }),
                        "\xA0",
                        "Create New " + this.props.schema.label
                    )
                )
            );
        }
    }]);

    return BrowseRecordsPage;
}(_react2.default.Component), _class.propTypes = {
    mountPoint: _react2.default.PropTypes.string.isRequired,
    schema: _react2.default.PropTypes.object.isRequired,
    location: _react2.default.PropTypes.object.isRequired,
    defaultLimit: _react2.default.PropTypes.number,
    fetch: _react2.default.PropTypes.func
}, _class.defaultProps = {
    defaultLimit: 10
}, _class.contextTypes = {
    router: _react2.default.PropTypes.object
}, _temp);