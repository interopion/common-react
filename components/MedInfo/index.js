"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _PropertyGrid = require("../PropertyGrid");

var _PropertyGrid2 = _interopRequireDefault(_PropertyGrid);

require("./med-view.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API_MAP = {
    "drug_interactions": "Drug Interactions",
    "geriatric_use": "Geriatric Use",
    "pharmacodynamics": "Pharmacodynamics",
    "spl_patient_package_insert": "Patient Information",
    "description": "Description",
    "nonclinical_toxicology": "Nonclinical Toxicology",
    "dosage_forms_and_strengths": "Dosage Forms and Strengths",
    "clinical_pharmacology_table": "Clinical Pharmacology",
    "mechanism_of_action": "Mechanism of Action",
    "pharmacokinetics_table": "Pharmacokinetics",
    "pharmacokinetics": "Pharmacokinetics",
    "overdosage": "Overdosage",
    "carcinogenesis_and_mutagenesis_and_impairment_of_fertility": "Carcinogenesis and Mutagenesis and Impairment of Fertility",
    "clinical_pharmacology": "Clinical Pharmacology",
    "clinical_studies": "Clinical Studies",
    "package_label_principal_display_panel": "Package Label Principal Display Panel",
    "clinical_studies_table": "Clinical Studies",
    "teratogenic_effects": "Teratogenic effects",
    "pediatric_use": "Pediatric Use",
    "dosage_and_administration": "Dosage and Administration",
    "adverse_reactions": "Adverse Reactions",
    "use_in_specific_populations": "Use in Specific Populations",
    "how_supplied": "How Supplied",
    "information_for_patients": "Information for Patients",
    "labor_and_delivery": "Labor and Delivery",
    "indications_and_usage": "Indications and Usage",
    "nursing_mothers": "Nursing Mothers",
    "boxed_warning": "Boxed Warning",
    "adverse_reactions_table": "Adverse Reactions",
    "warnings_and_cautions": "Warnings and Cautions",
    "contraindications": "Contraindications",
    "pregnancy": "Pregnancy"
};

var MedInfo = (_temp = _class = function (_React$Component) {
    _inherits(MedInfo, _React$Component);

    function MedInfo() {
        var _Object$getPrototypeO;

        _classCallCheck(this, MedInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MedInfo)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            loading: true,
            error: null,
            data: {},
            meta: {}
        };
        return _this;
    }

    _createClass(MedInfo, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetch(this.props.packageNDC);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.ignoreRequests = true;
            if (this.dataLookUp && !this.dataLookUp.state() == "pending") {
                this.dataLookUp.abort();
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.packageNDC != this.props.packageNDC) {
                this.fetch(nextProps.packageNDC);
            }
        }
    }, {
        key: "fetch",
        value: function fetch(ndc) {
            var _this2 = this;

            this.setState({ loading: true });

            if (this.dataLookUp && !this.dataLookUp.state() == "pending") {
                this.dataLookUp.abort();
            }

            this.dataLookUp = _jquery2.default.ajax({
                url: "https://api.fda.gov/drug/label.json",
                data: {
                    search: "openfda.package_ndc.exact:" + ndc,
                    limit: 1
                }
            }).then(function (data) {
                if (!_this2.ignoreRequests) {
                    _this2.setState({
                        loading: false,
                        meta: data.meta,
                        data: data.results[0]
                    });
                }
            }, function (xhr) {
                if (!_this2.ignoreRequests) {
                    _this2.setState({
                        loading: false,
                        error: xhr.responseJSON.error.message
                    });
                }
            });
        }
    }, {
        key: "renderSections",
        value: function renderSections() {
            var out = [],
                i = 0;

            for (var prop in this.state.data) {
                var val = this.state.data[prop];
                var title = API_MAP[prop] || prop;

                if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) == "object" && !Array.isArray(val)) {
                    out.push(_react2.default.createElement(
                        "section",
                        { key: ++i },
                        _react2.default.createElement(
                            "h3",
                            null,
                            title
                        ),
                        _react2.default.createElement(_PropertyGrid2.default, { record: val }),
                        _react2.default.createElement("br", null)
                    ));
                } else {
                    val = _react2.default.createElement("div", { dangerouslySetInnerHTML: {
                            __html: String(val)
                        } });
                    out.push(_react2.default.createElement(
                        "section",
                        { key: ++i },
                        _react2.default.createElement(
                            "h3",
                            null,
                            title
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "small" },
                            val
                        ),
                        _react2.default.createElement("br", null)
                    ));
                }
            }

            return out;
        }
    }, {
        key: "renderSubHeader",
        value: function renderSubHeader() {
            if (this.state.loading || this.state.error) {
                return null;
            }

            return _react2.default.createElement(
                "div",
                { className: "alert alert-info" },
                _react2.default.createElement(
                    "p",
                    null,
                    _react2.default.createElement(
                        "b",
                        null,
                        "Disclaimer: "
                    ),
                    this.state.meta.disclaimer
                ),
                _react2.default.createElement(
                    "b",
                    null,
                    "OpenFDA Terms of Service: "
                ),
                _react2.default.createElement(
                    "a",
                    { href: this.state.meta.terms, target: "_blank" },
                    this.state.meta.terms
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    "b",
                    null,
                    "License: "
                ),
                _react2.default.createElement(
                    "a",
                    { href: this.state.meta.license, target: "_blank" },
                    this.state.meta.license
                ),
                _react2.default.createElement("hr", { style: { margin: "5px 0" } }),
                _react2.default.createElement(
                    "b",
                    null,
                    "This information was last updated at "
                ),
                this.state.meta.last_updated
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loading) {
                return _react2.default.createElement(
                    "div",
                    { className: "text-center text-muted" },
                    "Loading..."
                );
            }

            if (this.state.error) {
                return _react2.default.createElement(
                    "div",
                    { className: "text-center text-danger" },
                    this.state.error
                );
            }

            var data = this.state.data;

            return _react2.default.createElement(
                "div",
                { className: "med-info" },
                this.renderSubHeader(),
                _react2.default.createElement(
                    "h1",
                    { className: "page-header" },
                    data.openfda.brand_name
                ),
                this.renderSections()
            );
        }
    }]);

    return MedInfo;
}(_react2.default.Component), _class.propTypes = {
    packageNDC: _react2.default.PropTypes.string.isRequired
}, _temp);
exports.default = MedInfo;