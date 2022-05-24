import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { User } from '../models/user';
import { UserStat } from '../models/userStat';
import { AuthService } from './auth.service';
import { PokemonsService } from './pokemons.service';
import { UserStatService } from './user-stat.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  public pokemonLeft: Pokemon;
  public user: User;
  public pokemonRight: Pokemon;
  public myTeam: Pokemon[] = [];
  public myAliveTeam: Pokemon[] = [];
  public isDisabled: boolean = false;
  public currentDate: Date = new Date();
  public userCurrentStat: UserStat;

  constructor(private _pokemonService: PokemonsService, private route: ActivatedRoute,
    private router: Router, private _userStatService: UserStatService,
    private _authService: AuthService) {
  }

  //gets a random number
  getRandomId(max): number {
    return Math.round(Math.random() * max);
  }

  saveGame(userID) {
    this._userStatService.getOneUserStats(userID).subscribe(currentStatus => {
      this.userCurrentStat = currentStatus.userStat;
    });

    this.pokemonLeft = JSON.parse(localStorage.getItem('pokemonLeft'));
    this.pokemonRight = JSON.parse(localStorage.getItem('pokemonRight'));
    this.myAliveTeam = JSON.parse(localStorage.getItem('myAliveTeam'));

    let currentStatus: string = '';
    if (this.pokemonLeft.life === 0) {
      this.myAliveTeam.pop();
      localStorage.setItem('myAliveTeam',JSON.stringify(this.myAliveTeam));
      currentStatus = JSON.stringify({
        user: this.userCurrentStat.user,
        victories: this.userCurrentStat.victories,
        score: this.userCurrentStat.score,
        round: this.userCurrentStat.round + 1,
        team: this.myAliveTeam
      });

      this._userStatService.editState(userID, currentStatus).subscribe(status => {
        this.userCurrentStat = status.status;
      });
      localStorage.removeItem('pokemonLeftLife');

    } else if (this.pokemonRight.life === 0) {
      currentStatus = JSON.stringify({
        user: this.userCurrentStat.user,
        victories: this.userCurrentStat.victories + 1,
        score: this.userCurrentStat.score + this.score(),
        round: this.userCurrentStat.round + 1,
        team: this.myAliveTeam
      });

      this._userStatService.editState(userID, currentStatus).subscribe(status => {
        this.userCurrentStat = status.status;
      });

      localStorage.removeItem('pokemonRight');
    }
  }

  score(): number {
    let sum: number = 0;
    this.myAliveTeam.forEach(pokemon => {
      sum += pokemon.life;
    })
    return sum;
  }

}
