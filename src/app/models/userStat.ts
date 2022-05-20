import { Pokemon } from "./pokemon";

export class UserStat {
    _id?: string;
    user?: string;
    timePlayed?: Date;
    round?: number;
    team?: Array<Pokemon>;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(id: string, user: string, timePlayed: Date, round: number, team: Array<Pokemon>, createdAt: Date, updatedAt: Date,) {
        this._id = id;
        this.user = user;
        this.timePlayed = timePlayed;
        this.round = round;
        this.team = team;
        this.createdAt = createdAt
        this.updatedAt = updatedAt;
    }
}
