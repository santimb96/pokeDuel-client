import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public user: User;
  constructor(private _authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.myAccountData();
  }

  public myAccountData() {
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

  public deleteProfile(id: string) {
    this._authService.deleteUser(id).subscribe(user => {
      console.log(`${user} eliminated`);
      this.router.navigate([""]);
    });
  }
}
