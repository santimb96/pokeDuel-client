import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.scss']
})
export class MenuGameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    localStorage.removeItem('userLogged');
    this.router.navigate([""]);
  }
}
