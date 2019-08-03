import React from "react"


export default class ProgressBar extends React.Component {

    render() {
        let percent = this.props.progress * 100;

        let textAlign = this.props.textAlign ? " text-" + this.props.textAlign : "text-left";
        let color = this.props.color ? " color-" + this.props.color : " color-white";
        let fg = this.props.fg ? " bg-" + this.props.fg : " bg-white";
        let bg = this.props.bg ? " bg-" + this.props.bg : " bg-dark";


        return (
            <div className={this.props.className || ""}>
                <div className={"progress" + bg}>
                    <div className={"progress-bar" + fg}
                         style={{width: percent + "%"}}/>
                </div>
                <p className={"little" + textAlign + color}>
                    0/0 ukończone
                </p>
            </div>
        );
    }
}