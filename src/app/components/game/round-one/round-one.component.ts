import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-round-one',
  templateUrl: './round-one.component.html',
  styleUrls: ['./round-one.component.scss']
})
export class RoundOneComponent implements OnInit {

  public pokemonLeft: Pokemon;
  public pokemonRight: Pokemon;
  private pokemons: Pokemon[];

  constructor(private _pokemonService: PokemonsService, private route: ActivatedRoute) {
    this.pokemons = this.route.snapshot.data['pokemons'];
    this.pokemonLeft = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.pokemonRight = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];

    // this.pokemonLeft.value = 100;
    
  }

  ngOnInit(): void {
    console.log(this.pokemonLeft);
    console.log(this.pokemonRight);
  }


  getRandomId() {
    return Math.round(Math.random() * 88);
  }



}
