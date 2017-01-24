import React from "react"

export default class Column extends React.Component
{
    static propTypes = {
        label      : React.PropTypes.string,
        prop       : React.PropTypes.string,
        sortable   : React.PropTypes.bool,
        headerStyle: React.PropTypes.object,
        render     : React.PropTypes.func
    };

    static defaultProps = {
        label      : "",
        prop       : null,
        sortable   : false,
        headerStyle: null,
        render     : () => null
    };
}
