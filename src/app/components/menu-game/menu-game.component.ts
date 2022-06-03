import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.scss']
})
export class MenuGameComponent implements OnInit {

  public userID: string;
  public user: User;
  public userStat: UserStat;
  public userStatExists: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, 
    private _battleService: BattleService) { 
    this.user = this.route.snapshot.data['users'].user;
    this.userStat = this.route.snapshot.data['userStats'].userStat;
    this.userID = this.user._id;

    if( this.userStat === null){
      this.userStatExists = false;
    } else if( this.userStat.team.length === 0){
      this.userStatExists = false;
    }

  }

  ngOnInit(): void {
      this._battleService.stopAudio();
  }

  public logOut(): void {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('gameId');
    localStorage.removeItem('path');
    localStorage.removeItem('myAliveTeam');
    localStorage.removeItem('pokemonLeft');
    localStorage.removeItem('pokemonRight');
    localStorage.removeItem('pokemonLeftLife');
    this.router.navigate([""]);
  }
}
