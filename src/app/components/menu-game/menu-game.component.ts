import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.scss']
})
export class MenuGameComponent implements OnInit {

  public userID: string;
  public user: User;
  public userStat: UserStat;
  public userStatID: string;

  constructor(private router: Router, private route: ActivatedRoute) { 
    //objects
    this.user = this.route.snapshot.data['users'].user;
    this.userStat = this.route.snapshot.data['userStats'].userStat;

    console.log(this.userStat);
    //id's
    this.userStatID = this.userStat._id;
    this.userID = this.user._id;
  }

  ngOnInit(): void {}

  public logOut(): void {
    localStorage.removeItem('userLogged');
    this.router.navigate([""]);
  }
}
