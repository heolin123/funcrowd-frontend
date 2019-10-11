import React from "react"
import {Breadcrumbs, BreadcrumbItem} from "../../components/Breadcrumbs";
import L from "../../logic/locatization/LocalizationManager";
import {Icon, SmallIcon} from "../../components/Icons";
import {CircleImage} from "../../components/Image";
import BountyRepository from "../../logic/repositories/BountyRepository";
import ProgressBar from "../../components/ProgressBar";

let statusStyle = {
    "NEW": "badge-orange",
    "IN_PROGRESS": "badge-orange",
    "FINISHED": "badge-green",
    "CLOSED": "badge-secondary",
};


export default class BountyHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userBounty: null,
            previousStatus: null
        };
    }

    componentDidMount() {
        this.updateStatus();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateStatus();
        }
    }

    updateStatus() {
        BountyRepository.getStatus(this.props.bounty.id).then((userBounty) => {
            let newStatus = null;
            if (userBounty) {
                newStatus = userBounty.status;
                if (newStatus != this.state.previousStatus && newStatus === "FINISHED")
                    this.props.onBountyFinished();
            }

            this.setState({
                userBounty: userBounty,
                previousStatus: newStatus,
                loading: false
            });
        });
    }

    render() {
        let bounty = this.props.bounty;
        let task = bounty.task;
        let progressBar = null;
        let bountyStatus = "CLOSED";
        let elements = null;

        if (this.state.userBounty) {
            let userBounty = this.state.userBounty;
            bountyStatus = userBounty.status;

            let annotationsDone = Math.min(userBounty.annotationsDone, bounty.annotationsTarget);
            progressBar = <ProgressBar progress={userBounty.progress}
                                       text={"Ukończono "+annotationsDone + "/" + bounty.annotationsTarget}/>;

            let reward = <span className="badge badge-secondary" style={{fontSize: "14px"}}>{L.bounty.labels.bountyNotFinished}</span>;
            if (userBounty.reward)
                reward = <span className="badge badge-green" style={{fontSize: "14px"}}>{userBounty.reward}</span>;

            let status = <div className={"badge " + statusStyle[bountyStatus]} style={{fontSize: "14px"}}>{L.bounty.status[bountyStatus]}</div>;

            elements = (
                <div className="bounty-header-info">
                    <div className="color-white">
                        <h3 style={{marginBottom: 0}}>#{bounty.id} {task.name}</h3>
                        <span className="small">{task.description}</span>
                        <div className="small" style={{margin: "15px 0"}}>
                            <div>Status:&nbsp;{status}</div>
                            <div>Reward:&nbsp;{reward}</div>
                        </div>
                    </div>
                    {progressBar}
                </div>
            );
        }

        return (
            <div>
                <div className="tasks-header-bar card-2-static"/>
                <div className="row tasks-header">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}

