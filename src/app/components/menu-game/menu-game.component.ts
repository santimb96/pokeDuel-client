import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.scss']
})
export class MenuGameComponent implements OnInit {

  public userID = JSON.parse(localStorage.getItem('userLogged')).id;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.userID);

  }

  public logOut(): void {
    localStorage.removeItem('userLogged');
    this.router.navigate([""]);
  }
}
