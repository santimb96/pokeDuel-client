export class User {
    _id?: number; //mongoDB --> optional
    username: string;
    password: string;
    email: string;
    avatar?: string;
    createdAt: Date;

    constructor(username: string, password: string, email: string, avatar: string, createdAt: Date) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.createdAt = createdAt
    }
}
