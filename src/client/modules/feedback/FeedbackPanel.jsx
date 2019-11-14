import React from "react"
import BlackBackground from "../../components/BlackBackground";
import FeedbackFactory from "./FeedbackFactory";
import FeedbackTypes from "../feedback/FeedbackTypes";


export default class FeedbackPanel extends React.Component {

    render() {
        let annotation = this.props.annotation;
        let feedback = null;
        let type = FeedbackTypes.NONE;

        if (annotation && annotation.feedback) {
            feedback = annotation.feedback;
            type = feedback.type;
        }

        let modal = FeedbackFactory.create(type,
            this.props.isOpen, this.props.onAccept,
            annotation, feedback, this.props.exp);

        return (
            <div className="modal-base">
                <BlackBackground className="black-background"
                                 style={{pointerEvents: this.props.isOpen ? "auto" : "none"}}
                                 pose={this.props.isOpen ? 'open' : 'closed'}
                                 onClick={this.props.onClose}/>
                {modal}
            </div>
        );
    }
}
