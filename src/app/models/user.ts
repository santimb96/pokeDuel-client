export class User {
    _id?: string;
    username?: string;
    password?: string;
    email?: string;
    avatar?: string;
    createdAt?: Date;

    constructor(id: string, username: string, password: string, email: string, avatar: string, createdAt: Date) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.createdAt = createdAt
    }
}
