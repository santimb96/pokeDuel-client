import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { AuthService } from "../services/auth.service";
import { PokemonsService } from "../services/pokemons.service";
import { UserStatService } from "../services/user-stat.service";

@Injectable({ providedIn: 'root' })
export class AllUsersResolverService implements Resolve<any>{

    constructor(private _authService: AuthService) { }
    resolve(): Observable<any> {
        return this._authService.getUsers();
    }
}

