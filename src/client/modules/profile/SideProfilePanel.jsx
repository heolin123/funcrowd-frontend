import React from "react"
import posed from 'react-pose';
import {BigIcon, Icon, SmallIcon} from "../../components/Icons";
import ProgressBar from "../../components/ProgressBar";
import BlackBackground from "../../components/BlackBackground";
import UserManager from "../../logic/UserManager";
import { Link } from 'react-router-dom';
import LevelsConfig from "../../resources/levels";
import L from "../../logic/locatization/LocalizationManager";
import AchievementsManager from "../../logic/AchievementsManager";
import AchievementCircle from "../achievements/AchievementCircle";
import RankingRepository from "../../logic/repositories/RankingRepository";
import UserRepository from "../../logic/repositories/UserRepository";


const Sidebar = posed.nav({
    open: { x: '0%', staggerChildren: 100 },
    closed: { x: '150%' }
});

const NavItem = posed.li({
    open: { opacity: 0.6 },
    closed: { opacity: 0 }
});


export class SideProfilePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exp: null,
            username: null,
            finishedAchievementsCount: null,
            unfinishedAchievementsCount: null,
            ranking: null,
            tasksDone: null,
        };

        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        UserManager.addExperienceChangeHandler(this.onUpdate);
        UserManager.addUsernameChangeHandler(this.onUpdate);
        AchievementsManager.addAchievementsChangeHandler(this.onUpdate);
        AchievementsManager.update();
    }

    componentWillUnmount() {
        UserManager.removeExperienceChangeHandler(this.onUpdate);
        UserManager.removeUsernameChangeHandler(this.onUpdate);
        AchievementsManager.removeAchievementsChangeHandler(this.onUpdate)
    }

    onUpdate() {
        let states = {};

        if (UserManager.user) {
            states['exp'] = UserManager.user.exp;
            states['username'] = UserManager.user.username;
        }

        states['finishedAchievementsCount'] = AchievementsManager.finishedAchievements.length;
        states['unfinishedAchievementsCount'] = AchievementsManager.unfinishedAchievements.length;

        this.setState(states);

        this.updateRanking();
        this.updateTasksDone();
    }

    updateRanking() {
        RankingRepository.user(UserManager.user.id)
            .then((row) => {
                if (row)
                    this.setState({
                        ranking: row.position,
                    });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    updateTasksDone() {
        UserRepository.stats(UserManager.user.id)
            .then((stats) => {
                this.setState({
                    tasksDone: stats.annotatedTasks
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        if (UserManager.level === 0)
            return null;

        let nextLevel = Math.min(UserManager.level+1, Object.keys(LevelsConfig).length);
        let expThreshold = LevelsConfig[nextLevel].threshold;
        let expCurrent = 0;
        let username = "";

        if (UserManager.user) {
            username = UserManager.user.username;
            expCurrent = Math.min(UserManager.user.exp, expThreshold);
        }
        let expProgress = expCurrent / expThreshold;

        let achievementsCurrent = this.state.finishedAchievementsCount;
        let achievementsTotal = this.state.finishedAchievementsCount + this.state.unfinishedAchievementsCount;
        let achievementsProgress = achievementsCurrent / achievementsTotal;

        let achievementsLast = AchievementsManager.getLastFinished(3).map((achievement) =>
            <AchievementCircle key={achievement.id} achievement={achievement}/>);
        if (achievementsLast.length === 0)
            achievementsLast = <i style={{paddingLeft: "15px"}}>Nie masz jeszcze żadnych osiągnięć :(</i>;


        return (
            <div>
                <BlackBackground className="black-background behind"
                                 style={{pointerEvents: this.props.isOpen ? "auto" : "none"}}
                                 pose={this.props.isOpen ? 'open' : 'closed'}
                                 onClick={this.props.hideSideProfile}/>
                <Sidebar className="little side-profile weight-bold"
                         pose={this.props.isOpen ? 'open' : 'closed'}>
                    <div className='row'>
                        <div className="col-6">
                            <div onClick={this.props.hideSideProfile}>
                                <Icon className="side-profile-close"
                                      name="arrow-right"
                                      color="dark"/>
                            </div>
                        </div>
                        <div className="col-6 side-profile-settings">
                            <Link to="/profile" className="blue-link" onClick={this.props.hideSideProfile}>
                                <div className="little">{L.labels.showProfile}</div>
                            </Link>
                            <Link to="/settings" className="blue-link" onClick={this.props.hideSideProfile}>
                                <div className="little">{L.labels.settings}</div>
                            </Link>
                        </div>
                        <div className="col-12 side-profile-username text-center">
                            <div>{L.labels.yourNick}</div>
                            <h4>{username}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-6">
                            <div className="side-profile-block card-1-static little text-center">
                                <BigIcon className="side-profile-block-icon" name="ranking"/>
                                <div>{this.state.ranking} miejsce w ranking</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="side-profile-block card-1-static little text-center">
                                <BigIcon className="side-profile-block-icon" name="missions"/>
                                <div>{this.state.tasksDone} rozwiązanych zadań</div>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: "30px", marginBottom: "30px"}}>
                        <div className="col-6 text-left">
                            <div>{L.levels.level} {UserManager.level}: {L.levels["level"+UserManager.level].toUpperCase()}</div>
                        </div>
                        <div className="col-6 text-right">
                            <div>{expCurrent}/{expThreshold}<SmallIcon name="experience"/></div>
                        </div>
                        <div className="col-12">
                            <ProgressBar className="side-profile-progress"
                                         bg="light-blue" fg="blue" progress={expProgress}/>
                        </div>
                    </div>
                    <div className='row' style={{marginBottom: "30px"}}>
                        <div className="col-6 text-left">
                            <div>{L.labels.achievements.toUpperCase()}</div>
                        </div>
                        <div className="col-6 text-right">
                            <div>{achievementsCurrent}/{achievementsTotal}<SmallIcon name="achievements"/></div>
                        </div>
                        <div className="col-12">
                            <ProgressBar className="side-profile-progress"
                                         bg="light-blue" fg="blue" progress={achievementsProgress}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-12">
                            <div style={{marginBottom: "10px"}}>{L.general.newest.toUpperCase()}</div>
                        </div>
                    </div>
                    <div className="row text-center">
                        {achievementsLast}
                        <div className="col-sm-12 text-right color-blue small"
                             style={{paddingRight: "15px", paddingTop: "15px"}}>
                            <Link to="/achievements" className="blue-link">
                                <b>Zobacz wszystkie osiągnięcia</b>
                            </Link>
                        </div>
                    </div>
                </Sidebar>
            </div>
        );
    }
}
