import React from "react"
import MissionCard from "./MissionCard";
import MissionRepository from "../../logic/repositories/MissionRepository";
import MissionProgressRepository from "../../logic/repositories/MissionProgressRepository";
import ListContainer from "../../components/animated/ListContainer"
import Loading from "../../components/Loading";
import FeedbackPanel from "../feedback/FeedbackPanel";
import {Footer} from "../../Footer";


export default class MissionsMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            missions: null,
            progress: null,
            loadingMissions: true,
            loadingProgress: true
        }
    }

    componentDidMount() {
        MissionRepository.all()
            .then((missions) => {
                this.setState({
                    loadingMissions: false,
                    missions: missions
                });
            })
            .catch((error) => {
                this.setState({ loadingMissions: false});
                console.log(error)
            });

        MissionProgressRepository.all()
            .then((progress) => {
                let missionProgress = {};
                progress.forEach((progress) => {
                    missionProgress[progress.mission] = progress;
                });
                this.setState({
                    loadingProgress: false,
                    progress: missionProgress
                });
            })
            .catch((error) => {
                this.setState({ loadingProgress: false});
                console.log(error)
            });
    }

    render() {
        if (this.state.loadingMissions || this.state.loadingProgress)
            return <Loading/>;

        let missions = this.state.missions.map(
            (mission, i) => <MissionCard key={i} mission={mission}
                                         progress={this.state.progress[mission.id]}
                                         onSelect={() => this.props.onMissionSelect(mission)}/>);

        return (
            <div className="container-fluid base-row-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 missions-introduction">
                            <h3>Welcome</h3>
                            <p></p>
                        </div>
                    </div>
                    <ListContainer className="row missions-row" key='list'>
                        {missions}
                    </ListContainer>
                </div>
                <Footer style={{marginTop: "70px"}}/>
            </div>
        );
    }
}
