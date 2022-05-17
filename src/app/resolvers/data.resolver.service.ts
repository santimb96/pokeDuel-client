import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { PokemonsService } from "../services/pokemons.service";

@Injectable({ providedIn: 'root' })
export class DataResolverService implements Resolve<any>{

    public pokemons: any;
    public pokemonId: string;
    public pokemonRight: Pokemon;

    constructor(private _pokemonService: PokemonsService) { }
    resolve(): Observable<any> {
        return this._pokemonService.getPokemons();
    }
}

