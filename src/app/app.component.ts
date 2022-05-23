import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';
import { format } from 'date-fns';
import { PokemonsService } from './services/pokemons.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'client';
  public currentDate = '';
  public user;
  public userID;
  public userLogged: boolean = false;
  
  constructor(public router: Router, private _authService: AuthService, private _pokemonService: PokemonsService, private route: ActivatedRoute) {
    this.currentDate = format(new Date(), 'DD/MM/YYYY HH:mm');
    //objects
    if (localStorage.getItem('userLogged') !== null) {
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.userID = this.user.id;
      this.userLogged = true;
    }
  }

  ngOnInit(): void {
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

  savePath(){
    localStorage.setItem('path',this.router.url);
    this.router.navigate['options'];
  }

}