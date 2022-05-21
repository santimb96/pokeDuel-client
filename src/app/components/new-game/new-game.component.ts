import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { of } from 'rxjs';
import { UserStatService } from 'src/app/services/user-stat.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Params } from '@angular/router';
import { UserStat } from 'src/app/models/userStat';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  public pokemonLeft: Pokemon;
  public user: User;
  public pokemonRight: Pokemon;
  public pokemons: Pokemon[];
  public isDisabled: boolean = false;
  public currentDate: Date = new Date();
  public userStat: UserStat;

  constructor(private _pokemonService: PokemonsService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private router: Router, private _userStatService: UserStatService,
    private _authService: AuthService) {
    this.generateData();
    cdr.detach();
    let interval = setInterval(() => {
      this.cdr.detectChanges();
      if (this.pokemonLeft.life === 0 || this.pokemonRight.life === 0) {
        this.generateNewUserState();
        setTimeout(function () {
          console.log(this.userStat._id);
          this.router.navigate([`my-stats/${this.user._id}/${this.userStat._id}`]);
        }.bind(this), 3000)

        clearInterval(interval);

      }
    }, 1000)


  }

  ngOnInit(): void { }

  generateData(): void {
    this.pokemons = this.route.snapshot.data['pokemons'];
    this.pokemonLeft = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.pokemonRight = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.user = this.route.snapshot.data['users'].user;
    this.pokemonLeft.life = 100;
    this.pokemonRight.life = 100;


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
    if (this.pokemonRight.life > 0 && this.pokemonLeft.life > 0) {
      let move = moves[Math.round(Math.random() * 2)];
      switch (move) {
        case 'attack': this.pokemonLeft.life = this.pokemonLeft.life * 0.2;
        case 'defense': this.pokemonLeft.life = this.pokemonLeft.life * 0.2;
        default: console.log('not attacking');
      }
      this.isDisabled = false;
    }
  }

  //TODO CREAR UN OBSERVABLE PARA QUE OBSERVE SI LA VIDA DE UNO DE LOS POKEMONS LLEGA A 0
  pokemonToObservable(pokemon): Observable<Pokemon> {
    if (pokemon !== null) {
      return of(pokemon);
    }
  }

  generateNewUserState() {
    let newState = JSON.stringify({
      user: this.user._id,
      timePlayed: this.currentDate,
      round: 1,
      team: [{ "name": this.pokemonLeft.name, "life": this.pokemonLeft.life, "img3d": this.pokemonLeft.img3d }]
    });

    this._userStatService.getOneUserStats(this.user._id).subscribe(state => {
      console.log(state);
      if (state !== null || state !== undefined){
        this._userStatService.deleteState(state.userStat._id).subscribe(state => {
          console.log(`${state} erased`);
          this._userStatService.newState(newState).subscribe(state => {
            this.userStat = state.userStat;
          });
        });
      }else{
        this._userStatService.newState(newState).subscribe(state => {
          this.userStat = state.userStat;
        });
      }
    });
    
  }

}
