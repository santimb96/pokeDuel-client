import { Pokemon } from "./pokemon";

export class UserStat {
    user?: string;
    timePlayed?: Date;
    round?: number;
    team?: Array<Pokemon>;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: string, timePlayed: Date, round: number, team: Array<Pokemon>, createdAt: Date, updatedAt: Date,) {
        this.user = user;
        this.timePlayed = timePlayed;
        this.round = round;
        this.team = team;
        this.createdAt = createdAt
        this.updatedAt = updatedAt;
    }
}
