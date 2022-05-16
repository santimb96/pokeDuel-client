import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;

  ngOnInit(): void {
    this.oldValues();
  }
  constructor(public fb: FormBuilder, private _authService: AuthService, private router: Router) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  editUser(form) {
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.editUser(userLogged.id, form).subscribe(
      data => {
        console.log(`${data} has been updated!`);
      }
    );
  }

  oldValues() {
    let userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this._authService.getOneUser(userLogged.id).subscribe(
      data => {
        this.editForm.setValue({
          username: data.user.username,
          password: data.user.password,
          email: data.user.email,
          avatar: data.user.avatar
        })
      }
    );
  }

  uploadFile(event) {
    let file = event.target.files[0];
    this.editForm.patchValue({
      avatar: file
    });
  }

}

