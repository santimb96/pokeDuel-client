import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  hide = true;
  public spinner: boolean = false;
  public hideError = true;
  public error = null;
  constructor(private _authService: AuthService, private router: Router) { }

  logInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit() {}

  public logIn(form: LoginI): void {
    this.spinner = true;
    this._authService.logIn(form).subscribe(
      data => {
        let dataResponse: ResponseI = data;
        console.log(data);
        localStorage.setItem("userLogged",JSON.stringify({"id": dataResponse.user?._id,"token": dataResponse.token, "expiryDate": dataResponse.expiryDate.toString()}));
        this.router.navigate([`menu-game/${dataResponse.user._id}`]);
      },
      error => {
        console.log(error.error.message);
        this.spinner = false;
        this.error = error.error.message;        
        this.hideError = true;
      });
  }
}
