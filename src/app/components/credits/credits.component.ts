import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {

  public userID;
  public userLogged: boolean = false;
  constructor(private router: Router) {
    //objects
    if (localStorage.getItem('userLogged') !== null) {
      this.userID = JSON.parse(localStorage.getItem('userLogged')).id;
      this.userLogged = true;
    }

  }
}
