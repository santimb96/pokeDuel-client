import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  hide = true;
  public error = null;

  constructor(public fb: FormBuilder, private _authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      avatar: [null],
    })
  }

  signUp(form) {
    this._authService.signUp(form).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["login"])
      },
      error => { 
        console.log(error.error.message);
        this.error = error.error.message;   
      }
    )
  }

  uploadFile(event) {
    let file = event.target.files[0];
    this.signUpForm.patchValue({
      avatar: file
    });
  }

}
