import { Pokemon } from "./pokemon";

export class UserStat {
    _id?: string;
    user?: string;
    victories?: number;
    score?:number
    round?: number;
    team?: Array<Pokemon>;
    aliveTeam?: Array<Pokemon>;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(id: string, user: string, victories: number, score: number, round: number, team: Array<Pokemon>, aliveTeam: Array<Pokemon>, createdAt: Date, updatedAt: Date,) {
        this._id = id;
        this.user = user;
        this.victories = victories;
        this.score = score;
        this.round = round;
        this.team = team;
        this.aliveTeam = aliveTeam;
        this.createdAt = createdAt
        this.updatedAt = updatedAt;
    }
}
