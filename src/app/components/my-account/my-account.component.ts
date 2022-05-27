import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private _authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = this.route.snapshot.data['users'].user;
    this.userStat = this.route.snapshot.data['userStats'].userStat;
    this.userID = this.user._id;
    this.score = Math.round(this.userStat.score);

  }

  ngOnInit(): void {}

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
      this.router.navigate([""]);
    });
  }
}
