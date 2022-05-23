import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  public user: User;
  ngOnInit(): void { }

  constructor(public fb: FormBuilder, private _authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = this.user = this.route.snapshot.data['users'].user;
    
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required],
    });
    this.oldValues();
    console.log('test');
  }

  editUser(form) {
    console.log(form);
    this._authService.editUser(this.user._id, form).subscribe(
      data => {
        console.log(`${data} has been updated!`);
        this.router.navigate([`my-account/${this.user._id}`]);
      },
      error => {
        console.log(error);
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

