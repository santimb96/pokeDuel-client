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
  public isDisabled: boolean = false;

  constructor(private _pokemonService: PokemonsService, private route: ActivatedRoute) {
    this.pokemons = this.route.snapshot.data['pokemons'];
    this.pokemonLeft = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.pokemonRight = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.pokemonLeft.life = 100;
    this.pokemonRight.life = 100;
  }

  ngOnInit(): void {
    console.log(this.pokemons);
    console.log(this.pokemonLeft);
    console.log(this.pokemonRight);
  }

  getRandomId(): number {
    return Math.round(Math.random() * 88);
  }

  attack(): void {
    if (this.pokemonLeft.type === 'fire' && this.pokemonRight.type === 'grass'
      || this.pokemonLeft.type === 'grass' && this.pokemonRight.type === 'water'
      || this.pokemonLeft.type === 'water' && this.pokemonRight.type === 'fire') {

      if (this.pokemonRight.life <= 20) {
        this.pokemonRight.life = 0;
      }
      else {
        this.pokemonRight.life = this.pokemonRight.life * 0.2;
      }
    }
    else {
      if (this.pokemonRight.life <= 10) {
        this.pokemonRight.life = 0;
      }
      else {
        this.pokemonRight.life = this.pokemonRight.life * 0.1;
      }
    }

    this.isDisabled = true;
    setTimeout(function () {
      this.enemyAtacking();
    }.bind(this), 1000);

  }

  defense(): void {
    this.pokemonRight.life = this.pokemonRight.life * 0.2;
    setTimeout(function () {
      this.enemyAtacking();
    }.bind(this), 1000);
  }

  enemyAtacking(): void {
    const moves = ['attack', 'defense'];
    if (this.pokemonRight.life > 0 || this.pokemonLeft.life > 0) {
      let move = moves[Math.round(Math.random() * 2)];
      switch (move) {
        case 'attack': this.pokemonLeft.life = this.pokemonLeft.life * 0.2;
        case 'defense': this.pokemonLeft.life = this.pokemonLeft.life * 0.2;
        default: console.log('not attacking');
      }
      this.isDisabled = false;
    }
  }
}
