
export default class UserStatus {
    constructor(id, username, profile, exp) {
        this.id = id;
        this.username = username;
        this.profile = profile;
        this.exp = exp;
    }

    static fromJson(user_data) {
        let user = new UserStatus(user_data.id,
            user_data.username,
            user_data.profile,
            user_data.exp
        );
        return user;
    }
}
