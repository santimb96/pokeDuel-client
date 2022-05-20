import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { PokemonsService } from "../services/pokemons.service";

@Injectable({ providedIn: 'root' })
export class DataResolverService implements Resolve<any>{

    constructor(private _pokemonService: PokemonsService) { }
    resolve(): Observable<any> {
        return this._pokemonService.getPokemons();
    }
}

