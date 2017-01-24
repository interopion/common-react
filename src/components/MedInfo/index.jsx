import React from "react"
import $     from "jquery"
import PropertyGrid from "../PropertyGrid"

import "./med-view.less"

const API_MAP = {
    "drug_interactions"          : "Drug Interactions",
    "geriatric_use"              : "Geriatric Use",
    "pharmacodynamics"           : "Pharmacodynamics",
    "spl_patient_package_insert" : "Patient Information",
    "description"                : "Description",
    "nonclinical_toxicology"     : "Nonclinical Toxicology",
    "dosage_forms_and_strengths" : "Dosage Forms and Strengths",
    "clinical_pharmacology_table": "Clinical Pharmacology",
    "mechanism_of_action"        : "Mechanism of Action",
    "pharmacokinetics_table"     : "Pharmacokinetics",
    "pharmacokinetics"           : "Pharmacokinetics",
    "overdosage"                 : "Overdosage",
    "carcinogenesis_and_mutagenesis_and_impairment_of_fertility": "Carcinogenesis and Mutagenesis and Impairment of Fertility",
    "clinical_pharmacology"      : "Clinical Pharmacology",
    "clinical_studies"           : "Clinical Studies",
    "package_label_principal_display_panel": "Package Label Principal Display Panel",
    "clinical_studies_table"     : "Clinical Studies",
    "teratogenic_effects"        : "Teratogenic effects",
    "pediatric_use"              : "Pediatric Use",
    "dosage_and_administration"  : "Dosage and Administration",
    "adverse_reactions"          : "Adverse Reactions",
    "use_in_specific_populations": "Use in Specific Populations",
    "how_supplied"               : "How Supplied",
    "information_for_patients"   : "Information for Patients",
    "labor_and_delivery"         : "Labor and Delivery",
    "indications_and_usage"      : "Indications and Usage",
    "nursing_mothers"            : "Nursing Mothers",
    "boxed_warning"              : "Boxed Warning",
    "adverse_reactions_table"    : "Adverse Reactions",
    "warnings_and_cautions"      : "Warnings and Cautions",
    "contraindications"          : "Contraindications",
    "pregnancy"                  : "Pregnancy"
}

export default class MedInfo extends React.Component
{
    static propTypes = {
        packageNDC: React.PropTypes.string.isRequired
    };

    constructor(...args) {
        super(...args);
        this.state = {
            loading: true,
            error  : null,
            data   : {},
            meta   : {}
        };
    }

    componentDidMount() {
        this.fetch(this.props.packageNDC);
    }

    componentWillUnmount() {
        this.ignoreRequests = true;
        if (this.dataLookUp && !this.dataLookUp.state() == "pending") {
            this.dataLookUp.abort()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.packageNDC != this.props.packageNDC) {
            this.fetch(nextProps.packageNDC);
        }
    }

    fetch(ndc) {
        this.setState({ loading: true });

        if (this.dataLookUp && !this.dataLookUp.state() == "pending") {
            this.dataLookUp.abort()
        }

        this.dataLookUp = $.ajax({
            url: "https://api.fda.gov/drug/label.json",
            data: {
                search: `openfda.package_ndc.exact:${ndc}`,
                limit : 1
            }
        }).then(
            data => {
                if (!this.ignoreRequests) {
                    this.setState({
                        loading: false,
                        meta   : data.meta,
                        data   : data.results[0]
                    })
                }
            },
            xhr => {
                if (!this.ignoreRequests) {
                    this.setState({
                        loading: false,
                        error: xhr.responseJSON.error.message
                    })
                }
            }
        )
    }

    renderSections() {
        let out = [], i=0;

        for (let prop in this.state.data) {
            let val = this.state.data[prop]
            let title = API_MAP[prop] || prop;

            if ( val && typeof val == "object" && !Array.isArray(val)) {
                out.push(
                    <section key={++i}>
                        <h3>{ title }</h3>
                        <PropertyGrid record={ val }/>
                        <br/>
                    </section>
                );
            }
            else {
                val = (
                    <div dangerouslySetInnerHTML={{
                        __html: String(val)
                    }}/>
                )
                out.push(
                    <section key={++i}>
                        <h3>{ title }</h3>
                        <div className="small">{val}</div>
                        <br/>
                    </section>
                )
            }
        }

        return out;
    }

    renderSubHeader() {
        if (this.state.loading || this.state.error) {
            return null
        }

        return (
            <div className="alert alert-info">
                <p>
                    <b>Disclaimer: </b>
                    { this.state.meta.disclaimer }
                </p>
                <b>OpenFDA Terms of Service: </b>
                <a href={this.state.meta.terms} target="_blank">{ this.state.meta.terms }</a>
                <br />
                <b>License: </b>
                <a href={this.state.meta.license} target="_blank">{ this.state.meta.license }</a>
                <hr style={{ margin: "5px 0"}}/>
                <b>This information was last updated at </b>
                { this.state.meta.last_updated }
            </div>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="text-center text-muted">Loading...</div>
            )
        }

        if (this.state.error) {
            return (
                <div className="text-center text-danger">{ this.state.error }</div>
            )
        }

        let data = this.state.data;

        return (
            <div className="med-info">
                { this.renderSubHeader() }
                <h1 className="page-header">{ data.openfda.brand_name }</h1>
                { this.renderSections() }
            </div>
        )
    }
}
