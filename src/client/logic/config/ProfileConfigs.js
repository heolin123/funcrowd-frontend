import ProfileTypes from "./ProfileTypes";

let ProfileConfigs = {};

ProfileConfigs[ProfileTypes.NOTLOGGED] = {
    missions: false,
    achievements: false,
    about: false,
    ranking: false,
    bounties: false,
    profile: false,
    availablePages: [
        "/", "/register", "/activation", "/about", "/reset_password", "/reset_password_token"
    ]
};

ProfileConfigs[ProfileTypes.NORMAL] = {
    missions: true,
    achievements: true,
    about: true,
    ranking: true,
    bounties: false,
    profile: true,
    availablePages: null,
};

ProfileConfigs[ProfileTypes.MTURK] = {
    missions: false,
    achievements: false,
    about: false,
    ranking: false,
    bounties: true,
    profile: false,
    availablePages: null,
};

export default ProfileConfigs;
