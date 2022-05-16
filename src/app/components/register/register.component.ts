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
  formData = new FormData();
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
    
    console.log(form);
    this.formData.append('username', form.username);
    this.formData.append('password', form.password);
    this.formData.append('email', form.email);
    this.signUpForm.patchValue({
      avatar: file
    })
    this.formData.append('avatar',this.signUpForm.get('avatar').value)

    console.log(this.formData.get('avatar'));

    this._authService.signUp(form).subscribe(
      data => { console.log(data) },
      error => { console.log(error) }
    )
  }

  uploadFile(event) {
    let avatarFile = (event.target as HTMLInputElement).files[0];
    //this.avatarFile = avatarFile;
    // this.formData.patchValue({
    //   avatar: file,
    // });
    // this.signUpForm.get('avatar').updateValueAndValidity();
    // this.formData.append('avatar',this.signUpForm.get('avatar').value)
  }

}
