import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.component.html',
  styleUrls: ['./my-stats.component.scss']
})
export class MyStatsComponent implements OnInit {

  public user: User;
  public userStat: UserStat;

  constructor(private _authService: AuthService,) {
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.getOneUser(userLogged.id).subscribe(user => {
      this.user = {
        _id: user.user._id,
        username: user.user.username,
        email: user.user.email,
        avatar: user.user.avatar
      }
      console.log(this.user);
    })
  }

  ngOnInit(): void {
  }

}
