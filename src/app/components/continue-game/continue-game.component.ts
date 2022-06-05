import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';
import { BattleService } from 'src/app/services/battle.service';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { UserStatService } from 'src/app/services/user-stat.service';

@Component({
  selector: 'app-continue-game',
  templateUrl: './continue-game.component.html',
  styleUrls: ['./continue-game.component.scss']
})
export class ContinueGameComponent {
  public pokemonLeft: Pokemon;
  public user: User;
  public pokemonRight: Pokemon;
  public myTeam: Pokemon[] = [];
  public myAliveTeam: Pokemon[] = [];
  public isDisabled: boolean = false;
  public currentDate: Date = new Date();
  public userCurrentStat: UserStat;
  private clickedOneTime: number = 0;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef,
    private router: Router, private _userStatService: UserStatService, private _battleService: BattleService) {
    this.user = this.route.snapshot.data['users'].user;
    this.currentStat();
    this.generateDataPokemon();
    this._battleService.playAudio();
    localStorage.setItem('myTeam', JSON.stringify(this.myTeam));
    cdr.detach();
    let interval = setInterval(() => {
      this.cdr.detectChanges();
      this.autosave();

      if (this.pokemonLeft.life <= 0 || this.pokemonRight.life <= 0) {
        if(this.pokemonRight.life <= 0){
          this.pokemonRight.imgFront = null;
        }

        if(this.pokemonLeft.life <= 0){
          this.pokemonLeft.imgBack = null;
        }

        if (
          (this.pokemonLeft.life <= 0 && this.pokemonRight.life > 0) ||
          (this.pokemonLeft.life > 0 && this.pokemonRight.life <= 0)) {
          this._battleService.saveGame(this.user._id);
        }

        if (this.pokemonLeft.life <= 0) {
          this.myAliveTeam.pop();
          localStorage.setItem('myAliveTeam', JSON.stringify(this.myAliveTeam));
          localStorage.removeItem('pokemonLeft');
        } 

        this.generateDataPokemon();
        setTimeout(function () {this.attackFirst();}.bind(this),3000);
      }

      if (this.myAliveTeam.length === 0 || JSON.parse(localStorage.getItem('myAliveTeam')).length === 0) {
        localStorage.removeItem('myAliveTeam');
        this.myAliveTeam = null;
        this._battleService.saveGame(this.user._id);
        this.router.navigate([`my-account/${this.user._id}`]);
        clearInterval(interval);
      }
    }, 3000);
  }


  ngOnInit(){
    
  }
  private currentStat(): void {
    this.userCurrentStat = this.route.snapshot.data['userStat'].userStat;
    if (this.userCurrentStat === null || this.userCurrentStat === undefined) {

      let newState = JSON.stringify({
        user: this.user._id,
        victories: 0,
        score: 0,
        round: 1,
        team: this.generateTeam(),
        aliveTeam: this.userCurrentStat.aliveTeam
      });


      this._userStatService.newState(newState).subscribe(newStat => {
        this.userCurrentStat = newStat.userToUpdate;
        this.myTeam = newStat.userToUpdate.team;
        this.myAliveTeam = newStat.userToUpdate.team;
      }, error => {
        console.log(error);
        this.router.navigate([`menu-game/${this.user._id}`]);
      });

      if (localStorage.getItem('pokemonRight') !== null || localStorage.getItem('pokemonRight') !== undefined) {
        localStorage.removeItem('pokemonRight');
      }
      if (localStorage.getItem('pokemonLeftLife') !== null || localStorage.getItem('pokemonLeftLife') !== undefined) {
        localStorage.removeItem('pokemonLeftLife');
      }

      if (localStorage.getItem("pokemonLeft") !== null) {
        localStorage.removeItem('pokemonLeft');
      }

    }

    else {
      if (this.userCurrentStat.team.length === 0) {
        let newState = JSON.stringify({
          user: this.user,
          victories: this.userCurrentStat.victories,
          score: this.userCurrentStat.score,
          round: 1,
          team: this.generateTeam(),
          aliveTeam: this.userCurrentStat.aliveTeam
        });

        this._userStatService.editState(this.user._id, newState).subscribe(newStat => {
          this.userCurrentStat = newStat.userStat;
          this.myTeam = newStat.userStat.team;
          this.myAliveTeam = newStat.userStat.team;
        }, error => {
          console.log(error);
          this.router.navigate([`menu-game/${this.user._id}`]);
        });
      } else {
        this.myTeam = this.userCurrentStat.team;
        this.myAliveTeam = this.userCurrentStat.team;
      }
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
        type: pokemon.type,
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
    this.clickedOneTime = 0;
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

  private criticAttack(): boolean {
    return this._battleService.getRandomAttack(1, 5) === 3 ? true : false;
  }

  private enemyAtacking(): void {
    let life: number = 0;
    let isCritic = this.criticAttack();
    const moves = ['attack', 'defense', 'attack', 'attack', 'attack'];
    if (this.pokemonRight.life > 0 && this.pokemonLeft.life > 0) {
      let move = moves[this._battleService.getRandomId(5)];
      switch (move) {
        case 'attack':
          if (
            (this.pokemonLeft.type === 'grass' &&
              this.pokemonRight.type === 'fire') ||
            (this.pokemonLeft.type === 'water' &&
              this.pokemonRight.type === 'grass') ||
            (this.pokemonLeft.type === 'fire' &&
              this.pokemonRight.type === 'water')
          ) {
            if (this.pokemonLeft.life <= 20) {
              this.pokemonLeft.life = 0;
              this._battleService.openSnackBar(
                life,
                this.pokemonLeft.name,
                'died',
                false
              );
            } else {
              if (isCritic) {
                life = Math.round(this._battleService.getRandomAttack(15, 25) + 5);
              } else {
                life = Math.round(this._battleService.getRandomAttack(15, 25));
              }
              this.pokemonLeft.life = Math.round(this.pokemonLeft.life - life);
              this._battleService.openSnackBar(life,this.pokemonRight.name,'attack',isCritic);
              document.getElementById('pokemonLeft').classList.add('animate__bounceIn');
            }
          } else {
            if (this.pokemonLeft.life <= 20) {
              this.pokemonLeft.life = 0;
              this._battleService.openSnackBar(life,this.pokemonLeft.name,'died',false);
              localStorage.removeItem('pokemonLeftLife');
            } else {
              if (isCritic) {
                life = Math.round((this._battleService.getRandomAttack(10, 15) + 5));
              } else {
                life = Math.round(this._battleService.getRandomAttack(10, 15));
              }
              this.pokemonLeft.life = Math.round(this.pokemonLeft.life - life);
              this._battleService.openSnackBar(life, this.pokemonRight.name,'attack',isCritic);
              document.getElementById('pokemonLeft').classList.add('animate__bounceIn');
            }
          }
          if (this.pokemonLeft.life <= 0){
            this.pokemonLeft.life = 0;
            localStorage.removeItem('pokemonLeftLife');
            this.pokemonLeft.imgBack = null;
          }
          break;
        case 'defense':
          life = 7;
          if (this.pokemonRight.life === 100){
            this.pokemonRight.life = 100;
          } else {
            this.pokemonRight.life = Math.round(this.pokemonRight.life + life);
          }
          this._battleService.openSnackBar(life,this.pokemonRight.name,'defense',false);
          break;
        default:
          this.pokemonLeft.life = Math.round(this.pokemonLeft.life - this.pokemonLeft.life * (this._battleService.getRandomId(20) / 100));
          this._battleService.openSnackBar(life,this.pokemonRight.name,'attack',false);
      }

      if(this.pokemonLeft.life > 0){
        this.clickedOneTime = 0
      }
      document
        .getElementById('pokemonRight')
        .classList.remove('animate__bounceIn');
      localStorage.setItem(
        'pokemonLeftLife',
        JSON.stringify(this.pokemonLeft.life)
      );
    }
  }

  public attack(): void {
    if (this.clickedOneTime === 0){
      this.clickedOneTime = 1;
    let attack: number = 0;
    let isCritic = this.criticAttack();
    if ((this.pokemonLeft.type === 'fire' && this.pokemonRight.type === 'grass') || (this.pokemonLeft.type === 'grass' && this.pokemonRight.type === 'water') ||
      (this.pokemonLeft.type === 'water' && this.pokemonRight.type === 'fire')
    ) {
      if (this.pokemonRight.life <= 20) {
        this.pokemonRight.life = 0;
        this._battleService.openSnackBar(attack,this.pokemonRight.name,'died',false);
        localStorage.removeItem('pokemonRight');
      } else {
        if (isCritic) {
          attack = Math.round((this._battleService.getRandomAttack(15, 25) + 5));
        } else {
          attack = Math.round((this._battleService.getRandomAttack(15, 25)));
        }
        this._battleService.openSnackBar(attack,this.pokemonLeft.name,'attack',isCritic);
        this.pokemonRight.life = this.pokemonRight.life - attack;
        document.getElementById('pokemonRight').classList.add('animate__bounceIn');
      }
    } else {
      if (this.pokemonRight.life <= 10) {
        this.pokemonRight.life = 0;
        this._battleService.openSnackBar(attack,this.pokemonRight.name,'died',false);
        localStorage.removeItem('pokemonRight');
        document.getElementById('pokemonRight').classList.add('animate__backOutRight');
      } else {
        if (isCritic){
          attack = Math.round((this._battleService.getRandomAttack(10, 15) + 5));
        } else {
          attack = Math.round(this._battleService.getRandomAttack(10, 15));
        }
        this.pokemonRight.life = this.pokemonRight.life - attack;
        this._battleService.openSnackBar(attack,this.pokemonLeft.name,'attack', isCritic);
        document
          .getElementById('pokemonRight')
          .classList.add('animate__bounceIn');
      }
    }
    if (this.pokemonRight.life <= 0){
      this.pokemonRight.life = 0;
      this.pokemonRight.imgFront = null;
      localStorage.removeItem('pokemonRight');
    } else {
      localStorage.setItem('pokemonRight', JSON.stringify(this.pokemonRight));
      document.getElementById('pokemonLeft').classList.remove('animate__bounceIn');
      setTimeout(
        function () {
          this.enemyAtacking();
        }.bind(this),
        3000
      );
    } 
  }
  }

  public defense(): void {
    this.isDisabled = true;
    if (this.clickedOneTime === 0) {
      this.clickedOneTime = 1;
    let heal = 7;
    if (this.pokemonLeft.life === 100) {
      this.pokemonLeft.life = 100;
    } else {
      this.pokemonLeft.life = Math.round(this.pokemonLeft.life + heal);
    }
    localStorage.setItem(
      'pokemonLeftLife',
      JSON.stringify(this.pokemonLeft.life)
    );
    this._battleService.openSnackBar(heal, this.pokemonLeft.name, 'defense', false);
    setTimeout(
      function () {
        this.enemyAtacking();
      }.bind(this),
      3000
    );
  }
}
  private autosave(): void {
    localStorage.setItem('pokemonRight', JSON.stringify(this.pokemonRight));
    localStorage.setItem('pokemonLeft', JSON.stringify(this.pokemonLeft));
    localStorage.setItem('myAliveTeam', JSON.stringify(this.myAliveTeam));
  }

  private attackFirst(): void {
    if (this.pokemonLeft.speed < this.pokemonRight.speed) {
      this.enemyAtacking();
    } else if (this.pokemonLeft.speed > this.pokemonRight.speed) {
    } else {
      this.enemyAtacking();
    }
  }

  public disable(): void {
    this.isDisabled = !this.isDisabled;
  }

}

