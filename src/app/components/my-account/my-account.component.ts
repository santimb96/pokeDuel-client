import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private _authService: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myAccountData();
  }

  public myAccountData() {
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.getOneUser(userLogged.id).subscribe(
      data => {
        this.user = {
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar
        }
      }
    );
  }
}
