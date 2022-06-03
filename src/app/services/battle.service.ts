import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { User } from '../models/user';
import { UserStat } from '../models/userStat';
import { AuthService } from './auth.service';
import { PokemonsService } from './pokemons.service';
import { UserStatService } from './user-stat.service';

@Injectable({
  providedIn: 'root',
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
  private AUDIO = new Audio('../../assets/audio/battleMusic.mp3');
  private volume: number = 0.3;

  constructor(
    private _pokemonService: PokemonsService,
    private route: ActivatedRoute,
    private router: Router,
    private _userStatService: UserStatService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  private audioListener(): void {
    setInterval(() => {
      if (this.AUDIO.ended) {
        this.AUDIO.currentTime = 0;
        this.playAudio();
      }
    }, 1000);
  }

  public getAudio(): any {
    return this.AUDIO;
  }
  
  public playAudio(): void {
    console.log('playing!');
    this.AUDIO.volume = this.volume;
    this.AUDIO.play();
    this.audioListener();
  }

  public stopAudio(): void {
    this.AUDIO.pause();
  }

  public setVolume(volume: number): void {
    this.AUDIO.volume = volume;
    this.volume = this.AUDIO.volume;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getRandomId(max): number {
    return Math.round(Math.random() * max);
  }

  public getRandomAttack(min,max): number {
    return Math.round(Math.random() * (max-min)) + min;
  }

  public saveGame(userID) {
    this._userStatService.getOneUserStats(userID).subscribe((currentStatus) => {
      this.userCurrentStat = currentStatus.userStat;
    });

    this.pokemonLeft = JSON.parse(localStorage.getItem('pokemonLeft'));
    this.pokemonRight = JSON.parse(localStorage.getItem('pokemonRight'));
    this.myAliveTeam = JSON.parse(localStorage.getItem('myAliveTeam'));

    let currentStatus: string = '';
    if (this.pokemonLeft.life === 0) {
      this.myAliveTeam.pop();
      localStorage.setItem('myAliveTeam', JSON.stringify(this.myAliveTeam));
      currentStatus = JSON.stringify({
        user: userID,
        victories: this.userCurrentStat.victories,
        score: this.userCurrentStat.score,
        round: this.userCurrentStat.round + 1,
        team: this.myAliveTeam,
        aliveTeam: this.userCurrentStat.aliveTeam,
      });

      this._userStatService
        .editState(userID, currentStatus)
        .subscribe((status) => {
          this.userCurrentStat = status.status;
        });
      localStorage.removeItem('pokemonLeftLife');
    } else if (this.pokemonRight.life === 0) {
      currentStatus = JSON.stringify({
        user: userID,
        victories: this.userCurrentStat.victories + 1,
        score: this.userCurrentStat.score + this.score(),
        round: this.userCurrentStat.round + 1,
        team: this.myAliveTeam,
        aliveTeam: this.userCurrentStat.aliveTeam,
      });

      this._userStatService
        .editState(userID, currentStatus)
        .subscribe((status) => {
          this.userCurrentStat = status.status;
        });

      localStorage.removeItem('pokemonRight');
    }
  }

  public score(): number {
    let sum: number = 0;
    this.myAliveTeam.forEach((pokemon) => {
      sum += pokemon.life;
    });
    return sum;
  }

  public openSnackBar(life: number, pokemonName: string, action: string) {
    let message: string = '';
    let pokemonNameFormatted: string =
      pokemonName.slice(0, 1).toLocaleUpperCase() + pokemonName.slice(1);
    switch (action) {
      case 'attack':
        if (life < 30) {
          message = `${pokemonNameFormatted} has attacked`;
        } else if (life > 30) {
          message = 'Critic attack!';
        } else if (life === 10) {
          message = 'You can do better! :´(';
        }
        else {
          message = `Amazing attack by ${pokemonNameFormatted}`;
        }
        break;
      case 'defense':
        message = `${pokemonNameFormatted} choose defense!`;
        break;
      case 'died':
        message = `${pokemonNameFormatted} defeated :(`;
        break;
    }

    this._snackBar.open(message, '', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
