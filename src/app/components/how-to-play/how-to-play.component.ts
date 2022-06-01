import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent implements OnInit {

  public user;
  public userID;
  public userLogged: boolean = false;
  constructor(private router: Router) {
    if (localStorage.getItem('userLogged') !== null) {
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.userID = this.user.id;
      this.userLogged = true;
    }
  }

  ngOnInit(): void {}
  
  public goTo(): void { 
    let path = localStorage.getItem('path');
    if (path !== null) {
      if (path === `/menu-game/${this.userID}`) {
        this.router.navigate([`menu-game/${this.userID}`]);
      }
      else if (path === `/continue-game/${this.userID}` || path === `/game/${this.userID}`) {
        this.router.navigate([`continue-game/${this.userID}`]);
      }
      else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }
}
