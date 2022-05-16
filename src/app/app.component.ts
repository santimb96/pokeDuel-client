import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'client';
  public currentDate = '';
  constructor(public router: Router, private _authService: AuthService, private datePipe: DatePipe) {
    this.currentDate = format(new Date(), 'DD/MM/YYYY HH:mm');
  }

  ngOnInit(): void {
    console.log(this.currentDate);
    if (localStorage.getItem("userLogged") !== null) {
      let userLogged = JSON.parse(localStorage.getItem('userLogged'));
      if (userLogged.token !== null && this.currentDate < userLogged.expiryDate) {
        
        this._authService.autoLogIn(userLogged.id,userLogged.token).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.error(error)
          });
      }
    }

  }
}