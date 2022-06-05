import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public user: User;
  public userStat: UserStat;
  public userID: string;
  public score: number;
  constructor(private _authService: AuthService, private router: Router, 
    private route: ActivatedRoute, private _battleService: BattleService) {
    this.user = this.route.snapshot.data['users'].user;
    this.userStat = this.route.snapshot.data['userStats'].userStat;
    this.userID = this.user._id;
    if (this.userStat !== null){
      this.score = Math.round(this.userStat.score);      
    }

  }

  ngOnInit(): void {
    this._battleService.stopAudio();
  }

  public myAccountData(): void {
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.getOneUser(userLogged.id).subscribe(
      data => {
        this.user = {
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar
        }
      }
    );
  }

  public deleteProfile(id: string): void {
    this._authService.deleteUser(id).subscribe(user => {
      if (localStorage.getItem('userLogged') !== null){
        localStorage.removeItem('userLogged');
      }
      this.router.navigate([""]);
    });
  }
}
