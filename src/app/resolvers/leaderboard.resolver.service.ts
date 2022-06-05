import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { PokemonsService } from "../services/pokemons.service";
import { UserStatService } from "../services/user-stat.service";

@Injectable({ providedIn: 'root' })
export class LeaderboardResolverService implements Resolve<any>{

    constructor(private _userStatService: UserStatService) { }
    resolve(): Observable<any> {
        return this._userStatService.getUsersStats();
    }
}

