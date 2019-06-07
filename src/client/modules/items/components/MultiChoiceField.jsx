import React from "react"


export default class MultiChoiceField extends React.Component {

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <div>{this.props.value}</div>
            </div>
        );
    }
}
