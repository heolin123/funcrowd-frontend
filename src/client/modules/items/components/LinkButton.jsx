import React from "react"


export default class LinkButton extends React.Component {

    render() {
        if (this.props.value == "")
            return null;

        return (
            <div className="form-group">
                <label><strong>{this.props.label}</strong></label>
                <div>
                    <a href={this.props.value}>
                        <div className="btn btn-primary download-button">
                            Download
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
