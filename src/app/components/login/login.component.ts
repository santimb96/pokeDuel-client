import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public users = [];
  isLinear = false;
  username: FormGroup;
  password: FormGroup;

  constructor(private _authService: AuthService, private router: Router) { }

  logInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this._authService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  public logIn(form: LoginI): void {
    this._authService.logIn(form).subscribe(
      data => {
        let dataResponse: ResponseI = data;
        console.log(data);
        localStorage.setItem("userLogged",JSON.stringify({"id": dataResponse.user?._id,"token": dataResponse.token, "expiryDate": dataResponse.expiryDate.toString()}));
        this.router.navigate([`menu-game/${dataResponse.user._id}`]);
      },
      error => console.log(error));
  }
}
