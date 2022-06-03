import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { BattleService } from 'src/app/services/battle.service';
import { UserStatService } from 'src/app/services/user-stat.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public pokemonLeft: Pokemon;
  public user: User;
  public pokemonRight: Pokemon;
  public myTeam: Pokemon[] = [];
  public myAliveTeam: Pokemon[] = [];
  public isDisabled: boolean = false;
  public currentDate: Date = new Date();
  public userCurrentStat: UserStat;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router,
    private _userStatService: UserStatService, private _battleService: BattleService) {
    this.user = this.route.snapshot.data['users'].user;

    this.currentStat();
    this.generateDataPokemon();
    this._battleService.playAudio();
    // this.attackFirst();
    localStorage.setItem('myTeam', JSON.stringify(this.myTeam));
    cdr.detach();
    let interval = setInterval(() => {
      this.cdr.detectChanges();
      this.autosave();

      if (this.pokemonLeft.life === 0 || this.pokemonRight.life === 0) {

        if ((this.pokemonLeft.life === 0 && this.pokemonRight.life !== 0) ||
          (this.pokemonLeft.life !== 0 && this.pokemonRight.life === 0)) {
            console.log(this.user._id)
          this._battleService.saveGame(this.user._id);
        }

        if (this.pokemonLeft.life === 0) {
          this.myAliveTeam.pop()
          localStorage.setItem('myAliveTeam', JSON.stringify(this.myAliveTeam));
          localStorage.removeItem('pokemonLeft');
        }

        this.generateDataPokemon();
        setTimeout(function () {
          this.attackFirst();
        }.bind(this), 5000);
      }

      if (this.myAliveTeam.length === 0) {
        this._battleService.saveGame(this.user._id);
        this.router.navigate([`my-account/${this.user._id}`]);
        clearInterval(interval);
      }
    }, 3000)
  }



  public currentStat(): void {
    this.userCurrentStat = this.route.snapshot.data['userStat'].userStat;
    if (this.userCurrentStat !== null) {
      let newState = JSON.stringify({
        user: this.user,
        victories: this.userCurrentStat.victories,
        score: this.userCurrentStat.score,
        round: 1,
        team: this.generateTeam(),
        aliveTeam: this.myTeam       
      });
      this._userStatService.editState(this.user._id, newState).subscribe(newStat => {
        this.userCurrentStat = newStat.userToUpdate;
        this.myTeam = newStat.userToUpdate.team;
        this.myAliveTeam = newStat.userToUpdate.team;
      });

    } else {
      let newState = JSON.stringify({
        user: this.user._id,
        victories: 0,
        score: 0,
        round: 1,
        team: this.generateTeam(),
        aliveTeam: this.myTeam
      });

      this._userStatService.newState(newState).subscribe(newStat => {
        this.userCurrentStat = newStat.userStat;
        this.myTeam = newStat.userStat.team;
        this.myAliveTeam = newStat.userStat.team;
      });
    }

    if (localStorage.getItem("pokemonRight") !== null){
      localStorage.removeItem('pokemonRight');
    }

    if(localStorage.getItem("pokemonLeft") !== null){
      localStorage.removeItem('pokemonLeft');
    }

    if(localStorage.getItem("pokemonLeftLife") !== null){
      localStorage.removeItem('pokemonLeftLife');
    }
  }

  private generateTeam(): Pokemon[] {
    let myTeam: Pokemon[] = [];
    let pokemon: Pokemon = {};
    for (let i = 0; i < 3; i++) {
      pokemon = this.route.snapshot.data['pokemons'].pokemons[this._battleService.getRandomId(88)];
      myTeam.push({
        name: pokemon.name,
        life: 100,
        speed: pokemon.speed,
        imgBack: pokemon.imgBack,
        img3d: pokemon.img3d
      });
    }

    this.myTeam = myTeam;
    this.myAliveTeam = myTeam;
    return myTeam;
  }

  private generateDataPokemon(): void {
    if (this.myAliveTeam.length !== 0) {
      this.pokemonLeft = this.myAliveTeam[this.myAliveTeam.length - 1];
      if (localStorage.getItem('pokemonLeftLife') !== null) {
        this.pokemonLeft.life = JSON.parse(localStorage.getItem('pokemonLeftLife'));
      }
      else {
        this.pokemonLeft.life = 100;
      }
      if (localStorage.getItem('pokemonRight') == null) {
        this.pokemonRight = this.route.snapshot.data['pokemons'].pokemons[this._battleService.getRandomId(88)];
        this.pokemonRight.life = 100;
        localStorage.setItem('pokemonRight', JSON.stringify(this.pokemonRight));
      } else {
        this.pokemonRight = JSON.parse(localStorage.getItem('pokemonRight'));
      }
    } else {
      this.router.navigate([`my-account/${this.user._id}`]);
    }
  }

  private enemyAtacking(): void {
    let life: number = 0;
    const moves = ['attack', 'defense', 'attack', 'attack', 'attack'];
    if (this.pokemonRight.life > 0 && this.pokemonLeft.life > 0) {

      let move = moves[this._battleService.getRandomId(5)];
      switch (move) {
        case 'attack':
          if (this.pokemonLeft.life <= 20) {
            this.pokemonLeft.life = 0;
            this._battleService.openSnackBar(life, this.pokemonLeft.name, 'died');
            localStorage.removeItem('pokemonLeftLife');
          }
          else {
            life = Math.round(this.pokemonLeft.life * (this._battleService.getRandomId(50) / 100));
            this.pokemonLeft.life = this.pokemonLeft.life - life;
            this._battleService.openSnackBar(life, this.pokemonRight.name, 'attack');
            document.getElementById("pokemonLeft").classList.add("animate__bounceIn");
          }
          break;
        case 'defense':
          life = this.pokemonRight.life * 0.05;
          this.pokemonRight.life = this.pokemonRight.life + life;
          this._battleService.openSnackBar(life, this.pokemonRight.name, 'defense');
          break;
        default:
          this.pokemonLeft.life = this.pokemonLeft.life - (this.pokemonLeft.life * (this._battleService.getRandomId(20) / 100));
          this._battleService.openSnackBar(life, this.pokemonRight.name, 'attack');
      }
      this.isDisabled = false;
      document.getElementById("pokemonRight").classList.remove("animate__bounceIn");
      localStorage.setItem('pokemonLeftLife', JSON.stringify(this.pokemonLeft.life));
    }
  }

  public attack(): void {
    let attack: number = 0;
    if (this.pokemonLeft.type === 'fire' && this.pokemonRight.type === 'grass'
      || this.pokemonLeft.type === 'grass' && this.pokemonRight.type === 'water'
      || this.pokemonLeft.type === 'water' && this.pokemonRight.type === 'fire') {

      if (this.pokemonRight.life <= 20) {
        document.getElementById("pokemonRight").classList.add("animate__backOutRight");
        this.pokemonRight.life = 0;
        this._battleService.openSnackBar(attack, this.pokemonRight.name, 'died');
        localStorage.removeItem('pokemonRight');
      }
      else {
        attack = Math.round(this.pokemonRight.life * (this._battleService.getRandomId(80) / 100));
        this.pokemonRight.life = this.pokemonRight.life - attack;
        this._battleService.openSnackBar(attack, this.pokemonLeft.name, 'attack');
        document.getElementById("pokemonRight").classList.add("animate__bounceIn");
      }
    }
    else {
      if (this.pokemonRight.life <= 10) {
        this.pokemonRight.life = 0;
        this._battleService.openSnackBar(attack, this.pokemonRight.name, 'died');
        localStorage.removeItem('pokemonRight');
        document.getElementById("pokemonRight").classList.add("animate__backOutRight");
      }
      else {
        attack = Math.round(this.pokemonRight.life * (this._battleService.getRandomId(50) / 100));
        this.pokemonRight.life = this.pokemonRight.life - attack;
        this._battleService.openSnackBar(attack, this.pokemonLeft.name, 'attack');
        document.getElementById("pokemonRight").classList.add("animate__bounceIn");
      }
    }
    localStorage.setItem('pokemonRight', JSON.stringify(this.pokemonRight));
    document.getElementById("pokemonLeft").classList.remove("animate__bounceIn");
    this.isDisabled = true;
    setTimeout(function () {
      this.enemyAtacking();
    }.bind(this), 3000);
  }

  public defense(): void {
    let heal = this.pokemonLeft.life * 0.05;
    this.pokemonLeft.life = this.pokemonLeft.life + heal;
    localStorage.setItem('pokemonLeftLife', JSON.stringify(this.pokemonLeft.life));
    this._battleService.openSnackBar(heal, this.pokemonLeft.name, 'defense');
    setTimeout(function () {
      this.enemyAtacking();
    }.bind(this), 3000);
  }

  private autosave(): void {
    localStorage.setItem('pokemonRight', JSON.stringify(this.pokemonRight));
    localStorage.setItem('pokemonLeft', JSON.stringify(this.pokemonLeft));
    localStorage.setItem('myAliveTeam', JSON.stringify(this.myAliveTeam));
  }

  private attackFirst(): void {
    if (this.pokemonLeft.speed < this.pokemonRight.speed) {
      this.isDisabled = true;
      this.enemyAtacking();
    } else if (this.pokemonLeft.speed > this.pokemonRight.speed) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
      this.enemyAtacking();
    }
  }
}

