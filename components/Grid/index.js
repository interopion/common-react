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

var _Paginator = require("../Paginator");

var _Paginator2 = _interopRequireDefault(_Paginator);

var _SimplePaginator = require("../SimplePaginator");

var _SimplePaginator2 = _interopRequireDefault(_SimplePaginator);

var _index = require("../Loader/index.jsx");

var _index2 = _interopRequireDefault(_index);

require("./style.less");

var _SearchInput = require("../SearchInput");

var _SearchInput2 = _interopRequireDefault(_SearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;
var Component = _react2.default.Component;

//test

/**
 * Generates bootstrap tables based on configuration passed via props
 */

var Grid = (_temp = _class = function (_Component) {
    _inherits(Grid, _Component);

    function Grid() {
        var _Object$getPrototypeO;

        _classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Grid)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this._searchDelay = null;
        _this.fetch = _this.fetch.bind(_this);
        _this.search = _this.search.bind(_this);
        _this.state = {
            search: _this.props ? _this.props.search || "" : ""
        };
        _this.lastHeight = 0;
        return _this;
    }

    _createClass(Grid, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (!this.props.loading) {
                this.refs.table.style.minHeight = 0;
                this.lastHeight = this.refs.table.offsetHeight || 0;
                this.refs.table.style.minHeight = this.lastHeight + "px";
            }
        }

        /**
         * Introduces a 100ms delay so that very fast queries do not make the grid
         * transition to it's loading state (that would look like blinking)
         */

    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            var _this2 = this;

            if (nextProps.loading) {
                if (!this._isWaiting) {
                    this._isWaiting = setTimeout(function () {
                        if (!_this2.willUnmount) {
                            _this2.setState({});
                        }
                    }, 200);
                    return false;
                }
            } else if (this._isWaiting) {
                clearTimeout(this._isWaiting);
            }
            this._isWaiting = false;
            return true;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.willUnmount = true;
        }
    }, {
        key: "fetch",
        value: function fetch(options) {
            this.props.fetch(_jquery2.default.extend(true, {
                limit: this.props.limit,
                offset: this.props.offset,
                sortcol: this.props.sortcol,
                sortdir: this.props.sortdir,
                search: this.props.search
            }, options));
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            if (newProps.search != this.props.search) {
                this.setState({
                    search: newProps.search || ""
                });
            }
        }
    }, {
        key: "search",
        value: function search() {
            var _this3 = this;

            if (this._searchDelay) {
                clearTimeout(this._searchDelay);
            }
            this.setState({ search: this.refs.search.refs.input.value });
            this._searchDelay = setTimeout(function () {
                _this3.fetch({
                    search: _this3.refs.search.refs.input.value,
                    offset: 0
                });
            }, this.props.searchDelay);
        }

        // Rendering methods -------------------------------------------------------

        /**
         * If any of the columns is set to searchable than we have to render the
         * search field in the header
         */

    }, {
        key: "renderHeader",
        value: function renderHeader() {
            if (this.props.search === false || !this.props.search && !this.props.rows.length) {
                return null;
            }

            return _react2.default.createElement(
                "div",
                { className: "row", style: { marginBottom: 20 } },
                _react2.default.createElement(
                    "div",
                    { className: "text-center col-sm-6 col-sm-offset-3  col-md-4 col-md-offset-4" },
                    _react2.default.createElement(_SearchInput2.default, { ref: "search", value: this.state.search, onChange: this.search })
                )
            );
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            var _this4 = this;

            var limit = this.props.limit;

            if (!limit) {
                return null;
            }

            var totalPages = Math.ceil(this.props.total / limit);
            var curPage = Math.max(Math.ceil(this.props.offset / limit) + 1, 1);
            var endRec = Math.min(this.props.offset + limit, this.props.total);

            // Errored state -------------------------------------------------------
            if (this.props.error) {
                return null;
            }

            // Empty state ---------------------------------------------------------
            if (!this.props.rows.length) {
                return null;
            }

            // Single-page state ---------------------------------------------------
            else if (totalPages < 2) {
                    return _react2.default.createElement(
                        "div",
                        { className: "panel-footer text-muted" },
                        this.props.total + " records total"
                    );
                }

            // Normal state --------------------------------------------------------
            var PaginatorClass = this.props.simplePaginator ? _SimplePaginator2.default : _Paginator2.default;
            return _react2.default.createElement(
                "div",
                { className: "panel-footer" },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-xs-4 small text-muted" },
                        _react2.default.createElement(
                            "div",
                            { style: { marginTop: 7 } },
                            "Records\xA0",
                            _react2.default.createElement(
                                "b",
                                null,
                                this.props.offset + 1
                            ),
                            "\xA0 to\xA0",
                            _react2.default.createElement(
                                "b",
                                null,
                                endRec
                            ),
                            "\xA0 of\xA0",
                            _react2.default.createElement(
                                "b",
                                null,
                                this.props.total
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "text-right col-xs-8" + (this.props.loading ? " disabled" : "") },
                        _react2.default.createElement(PaginatorClass, {
                            currentPage: curPage,
                            totalPages: totalPages,
                            range: 3,
                            onChange: function onChange(n) {
                                return _this4.fetch({ offset: (n - 1) * _this4.props.limit });
                            },
                            disabled: this.props.loading
                        })
                    )
                )
            );
        }
    }, {
        key: "renderTHead",
        value: function renderTHead() {
            var _this5 = this;

            var rows = this.props.rows;

            // Loading state -------------------------------------------------------
            if (this.props.loading) {
                return _react2.default.createElement(
                    "th",
                    { className: "text-muted" },
                    "Please wait..."
                );
            }

            // Errored state -------------------------------------------------------
            if (this.props.error) {
                return _react2.default.createElement(
                    "th",
                    { className: "text-danger" },
                    "Error"
                );
            }

            // Empty state ---------------------------------------------------------
            if (!rows.length) {
                return null; //<th>&nbsp;</th>
            }

            // Normal state --------------------------------------------------------
            return this.props.cols.map(function (col, i) {

                if (col.headerColSpan === 0) {
                    return null;
                }

                var props = {
                    key: "header-cell-" + i,
                    style: {}
                };

                var className = [];

                if (col.headerClass) {
                    className.push(col.headerClass);
                }

                if (col.headerStyle) {
                    props.style = col.headerStyle;
                }

                if (col.sortable) {
                    className.push("sortable");
                    props.onClick = function (column) {
                        _this5.fetch({
                            sortdir: _this5.props.sortcol == column.prop ? _this5.props.sortdir == "asc" ? "desc" : "asc" : "asc",
                            sortcol: column.prop
                        });
                    }.bind(_this5, col);

                    if (_this5.props.sortcol == col.prop) {
                        className.push("sorted", _this5.props.sortdir || "asc");
                    }
                }

                className = className.join(" ");
                if (className) {
                    props.className = className;
                }

                return _react2.default.createElement(
                    "th",
                    props,
                    col.renderHeader && col.renderHeader() || col.label
                );
            });
        }
    }, {
        key: "renderTBody",
        value: function renderTBody() {
            var _this6 = this;

            var rows = this.props.rows;

            // Loading state -------------------------------------------------------
            if (this.props.loading) {
                rows = [_react2.default.createElement(
                    "tr",
                    { key: "empty-row-0" },
                    _react2.default.createElement(
                        "td",
                        { className: "text-center", style: { verticalAlign: "middle" } },
                        _react2.default.createElement(_index2.default, { className: "text-info", style: { margin: 0 } })
                    )
                )];

                // for (let i = 1; i < this.props.limit; i++) {
                //     rows.push(<tr key={"empty-row-" + i}><td>&nbsp;</td></tr>)
                // }

                return rows;
            }

            // Errored state -------------------------------------------------------
            if (this.props.error) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { className: "text-center" },
                        _react2.default.createElement(
                            "div",
                            { className: "alert alert-danger" },
                            _react2.default.createElement(
                                "i",
                                { className: "glyphicon glyphicon-minus-sign" },
                                "\u202F"
                            ),
                            String(this.props.error)
                        )
                    )
                );
            }

            // Empty state ---------------------------------------------------------
            if (!rows.length) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { className: "text-center text-danger" },
                        this.props.emptyMessage
                    )
                );
            }

            // Normal state --------------------------------------------------------
            return rows.map(function (row, ri) {
                var rowProps = {
                    key: "body-row-" + ri,
                    onClick: _this6.props.onRowClick.bind(null, row),
                    style: _this6.props.rowStyle || undefined
                };

                if (row.ui_selected) {
                    rowProps.className = "info";
                }

                if (_this6.props.getRowProps) {
                    _jquery2.default.extend(rowProps, _this6.props.getRowProps(row));
                }

                return _react2.default.createElement(
                    "tr",
                    rowProps,
                    _this6.props.cols.map(function (col, ci) {

                        if (col.cellColSpan === 0) {
                            return null;
                        }

                        var props = {
                            key: "body-cell-" + ci
                        };

                        if (col.cellStyle) {
                            props.style = col.cellStyle;
                        }

                        if (col.prop && _this6.props.sortcol == col.prop) {
                            props.className = "sorted";
                        }

                        if (col.cellClass) {
                            props.className = [props.className, col.cellClass].join(" ");
                        }

                        if (col.cellColSpan) {
                            props.colSpan = col.cellColSpan;
                        }

                        return _react2.default.createElement(
                            "td",
                            props,
                            col.render ? col.render(row, _this6) : row[col.prop]
                        );
                    })
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var tableClass = "table grid";
            if (this.props.hovered) {
                tableClass += " table-hover";
            }
            if (this.props.condensed) {
                tableClass += " table-condensed";
            }
            if (this.props.bordered) {
                tableClass += " table-bordered";
            }
            if (this.props.striped) {
                tableClass += " table-striped";
            }
            var tableStyle = _jquery2.default.extend({}, this.props.tableStyle, { minHeight: this.lastHeight });
            return _react2.default.createElement(
                "div",
                { className: "grid", style: this.props.wrapperStyle || null },
                this.renderHeader(),
                _react2.default.createElement(
                    "table",
                    { className: tableClass, ref: "table", style: tableStyle },
                    _react2.default.createElement(
                        "thead",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            this.renderTHead()
                        )
                    ),
                    _react2.default.createElement(
                        "tbody",
                        null,
                        this.renderTBody()
                    )
                ),
                this.renderFooter()
            );
        }
    }]);

    return Grid;
}(Component), _class.propTypes = {
    cols: PropTypes.array,
    rows: PropTypes.array,
    onRowClick: PropTypes.func,
    hovered: PropTypes.bool,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    condensed: PropTypes.bool,
    parse: PropTypes.func,
    fetch: PropTypes.func.isRequired,
    sortdir: PropTypes.string,
    sortcol: PropTypes.string,
    limit: PropTypes.number,
    offset: PropTypes.number,
    total: PropTypes.number,
    loading: PropTypes.bool,
    simplePaginator: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    searchDelay: PropTypes.number,
    getRowProps: PropTypes.func,
    rowStyle: PropTypes.object,
    tableStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
    emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}, _class.defaultProps = {
    rows: [],
    cols: [{ label: "No columns defined" }],
    onRowClick: function onRowClick() {},

    limit: 10,
    offset: 0,
    parse: function parse(json) {
        return json;
    },

    sortdir: "",
    sortcol: "",
    total: 0,
    search: "",
    loading: true,
    searchDelay: 300,
    emptyMessage: "No Records Found"
}, _temp);
exports.default = Grid;