import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';
import { UserStatService } from 'src/app/services/user-stat.service';

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.component.html',
  styleUrls: ['./my-stats.component.scss']
})
export class MyStatsComponent implements OnInit {

  public user: User;
  public userStat: UserStat;
  public currentDate: Date = new Date();
  public userID: string;
  public userStatID: string;
  public won: boolean;

  constructor(private _authService: AuthService, private _userStatService: UserStatService, private route: ActivatedRoute) {
    //objects
    this.user = this.route.snapshot.data['users'].user;
    this.userStat = this.route.snapshot.data['userStats'].userStat;

    console.log(this.userStat);
    //id's
    this.userStatID = this.userStat._id;
    this.userID = this.user._id;

    // //data for html
    // this.won = this.userStat.team[this.userStat.round-1].life !== 0 ? true : false;
  }

  ngOnInit(): void {
    console.log(this.userStat);
  }

  print(){
  }

}
