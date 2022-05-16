import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  
  public avatarFile = File;

  constructor(public fb: FormBuilder, private _authService: AuthService) {
    this.signUpForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      avatar: [null],
    })
  }

  signUp(form) {
    this._authService.signUp(form).subscribe(
      data => { console.log(data); },
      error => { console.log(error); }
    )
  }

  uploadFile(event) {
    let file = event.target.files[0];
    this.signUpForm.patchValue({
      avatar: file
    });
  }

}
