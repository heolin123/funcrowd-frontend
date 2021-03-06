import React from "react"
import L from "../../../logic/locatization/LocalizationManager";
import {Icon, SmallIcon} from "../../../components/Icons";

export default class TestCard extends React.Component {

    render() {

        let isUnlocked = false;
        let score = 0;
        let maxScore = 0;
        this.props.testResults.forEach((result) => {
            if (result.status !== "LOCKED")
                isUnlocked = true;

            score += result.score;
            maxScore += result.maxScore;
        });

        let iconName = "task/test_grey";
        let scores = "";
        let message = "Rozwiąż test aby zobaczyć wynik";
        let className = "locked";

        if (isUnlocked) {
            scores = (score || 0) + "/" + maxScore + " pytań";
            iconName = isUnlocked ? "task/test_blue" : "task/test_grey";
            message = "Odpowiedziałeś/łaś dobrze na:";
            className = "";
        }

        return (
            <div className="col-3 d-inline-block" style={{verticalAlign: "top"}}>
                <div className={"test-card card-2-static " + className}>
                    <div className="small"><b>{this.props.name}</b></div>
                    <Icon className="test-card-icon" name={iconName}/>
                    <div className="little" style={{marginBottom: "8px"}}>{message}</div>
                    <div style={{minHeight: "25px"}}><b>{scores}</b></div>

                </div>
            </div>
        );
    }
}
