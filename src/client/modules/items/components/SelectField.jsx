import React from "react"


export default class SelectField extends React.Component {

    render() {
        let options = this.props.value.map((option) =>
            <option value={option}/>);
        return (
            <div className="form-group">
                <select className="form-control">
                    {options}
                </select>
            </div>
        );
    }
}
