import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl(''),
  })

  constructor(private _authService: AuthService) { }

  signUp(form) {
    let formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('email', form.email);
    formData.append('avatar', form.avatar);
    
    this._authService.signUp(formData).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error))

  }

}
