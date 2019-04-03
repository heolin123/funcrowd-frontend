import axios from 'axios';
import SessionManager from "../SessionManager";
import Bounty from "../models/bounty/Bounty";
import UserBounty from "../models/bounty/UserBounty";


export default class BountyRepository {
    static all() {
        return axios.get(process.env.BACKEND_URL+'/api/v1/bounty', SessionManager.config)
            .then((response) => {
                let bounties = response.data.map((bounty_data) => Bounty.fromJson(bounty_data));
                return bounties;
            })
    }

    static get(bountyId) {
        return axios.get(process.env.BACKEND_URL+'/api/v1/bounty/'+bountyId, SessionManager.config)
            .then((response) => {
                let bounty = Bounty.fromJson(response.data);
                return bounty;
            })
    }

    static getStatus(bountyId) {
        return axios.get(process.env.BACKEND_URL+'/api/v1/bounty/'+bountyId+'/status', SessionManager.config)
            .then((response) => {
                let userBounty = UserBounty.fromJson(response.data);
                return userBounty;
            })
    }
}