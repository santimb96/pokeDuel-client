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
    //objects
    if (localStorage.getItem('userLogged') !== null) {
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.userID = this.user.id;
      this.userLogged = true;
    }

  }

  ngOnInit(): void {
  }
  goTo() {
    let path = localStorage.getItem('path');
    if (path !== null) {
      if (path === `/menu-game/${this.userID}`) {
        console.log('first');
        this.router.navigate([`menu-game/${this.userID}`]);
      }
      else if (path === `/continue-game/${this.userID}` || path === `/game/${this.userID}`) {
        console.log('second');
        this.router.navigate([`continue-game/${this.userID}`]);
      }
      else {
        console.log('third');
        this.router.navigate(['']);
      }
    } else {
      console.log('fourth');
      this.router.navigate(['']);
    }
  }
}
