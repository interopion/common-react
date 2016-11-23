import React from "react"

export default class PropertyGrid extends React.Component
{
    static propTypes = {
        record    : React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]),
        editable  : React.PropTypes.bool,
        gridProps : React.PropTypes.object,
        schema    : React.PropTypes.object
    };

    static defaultProps = {
        gridProps: {},
        schema: {
            columns: []
        }
    };

    renderCellValue(val, name, meta, record) {
        if (this.props.editable) {
            return (
                meta.editor ? meta.editor(record) :
                <input type="text"
                    ref={ name }
                    name={ name }
                    defaultValue={ String(val || val === 0 ? val : "") }
                    className="form-control"
                    readOnly={ !!meta.primaryKey } />
            )
        }

        if (meta.render) {
            return meta.render(record, meta);
        }

        if (val && typeof val == "object") {
            return (
                <PropertyGrid record={ val } gridProps={{
                    className: "table table-bordered table-condensed small",
                    style: {
                        margin: 0
                    }
                }} />
            )
        }

        return String(val)
    }

    renderHeadingValue(val, record) {
        if (typeof val == "function") {
            return val(record);
        }

        if (this.props.editable) {
            return (
                <label className="form-control-static">{ val }</label>
            )
        }

        return val
    }

    render() {
        let record = this.props.record || {}
        let rows   = []
        let noTH   = Array.isArray(record) && record.length === 1;
        let props  = Object.keys(record).sort((a, b) => {
            return this.props.schema.columns.findIndex(c => c.name === a) -
                   this.props.schema.columns.findIndex(c => c.name === b)
        })
        props.forEach(x => {
        // for (let x in record) {
            let meta = this.props.schema.columns.find(c => c.name === x) || {}

            // If the property is defined as hidden don't render the row
            if (meta.hidden) {
                // continue;
                return;
            }

            // If the grid is in edit mode and this property is not editable
            // then just skip the ntire row
            if (this.props.editable && meta.editable === false) {
                // continue;
                return;
            }

            rows.push(
                <tr key={ x }>
                    { noTH ? null : <th className="text-right">
                        { this.renderHeadingValue(meta.label || x, record) }
                    </th> }
                    <td>{ this.renderCellValue(record[x], x, meta, record) }</td>
                </tr>
            )
        })

        if (!rows.length) {
            rows = (
                <tr>
                    <td className="text-muted text-center">No Properties Found</td>
                </tr>
            )
        }

        return (
            <table className="table table-striped" { ...this.props.gridProps }>
                <tbody>
                    { rows }
                </tbody>
            </table>
        )
    }
}
