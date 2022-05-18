import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { of } from 'rxjs';
import { UserStatService } from 'src/app/services/user-stat.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { format } from 'date-fns';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  public pokemonLeft: Pokemon;
  public user: User;
  // public pokemonLeft$: Observable<Pokemon>;
  public pokemonRight: Pokemon;
  // public pokemonRight$: Observable<Pokemon>;
  private pokemons: Pokemon[];
  public isDisabled: boolean = false;
  public currentDate: string;

  constructor(private _pokemonService: PokemonsService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private router: Router, private _userStatService: UserStatService,
    private _authService: AuthService) {
    this.currentDate = format(new Date(), 'DD/MM/YYYY HH:mm');
    cdr.detach();
    setInterval(() => {
      this.cdr.detectChanges();
      if (this.pokemonLeft.life === 0 || this.pokemonRight.life === 0) {
        setTimeout(function () {
          this.router.navigate(["my-stats"]);
        }.bind(this), 3000)
        // console.log("pokemonDied");
        // setInterval(function () {
        //   if(this.pokemonLeft.life > 0){
        //     console.log(`Winner is ${this.pokemonLeft.name}`)
        //   } else if (this.pokemonRight > 0) {
        //     console.log(`Winner is ${this.pokemonRight.name}`)
        //   }

        //   this.router.navigate(["my-stats"]);
        // }.bind(this), 2000);
      }
    }, 1000)
    this.generatePokemons();

  }

  ngOnInit(): void {
    // this.generateNewUserState
    // this.pokemonLeft$ = this.pokemonToObservable(this.pokemonLeft);
    // this.pokemonRight$ = this.pokemonToObservable(this.pokemonRight);
    // this.pokemonLeft$.subscribe(pokemonLeft => {
    //   console.log(pokemonLeft);
    //   if(pokemonLeft.life === 0){
    //     console.log('PokeLeft died');
    //   }
    //   else{
    //     console.log('not died');
    //   }
    // });

  }

  generatePokemons(): void {
    this.pokemons = this.route.snapshot.data['pokemons'];
    this.pokemonLeft = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
    this.pokemonRight = this.route.snapshot.data['pokemons'].pokemons[this.getRandomId()];
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
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.getOneUser(userLogged.id).subscribe(user => {
      this.user = user.user;
    })

    const newState = {
      user: this.user._id,
      timePlayed: this.currentDate,
      round: 1,
      team: [this.pokemonLeft]
    }
    this._userStatService.newState(newState);

  }
}
