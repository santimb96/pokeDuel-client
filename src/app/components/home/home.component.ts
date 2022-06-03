import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentDate: string = '';
  public logged: boolean;
  constructor(public router: Router, private _authService: AuthService) {
    this.currentDate = format(new Date(), 'DD/MM/YYYY HH:mm');
    if (localStorage.getItem("userLogged") !== null) {
      let userLogged = JSON.parse(localStorage.getItem('userLogged'));
      if (userLogged.token !== null && this.currentDate < userLogged.expiryDate) {
        this._authService.autoLogIn(userLogged.id, userLogged.token).subscribe( //FIXME: PARA QUE ME SIRVE EL AUTOLOGIN?
          () => {
            this.logged = true;
            this.router.navigate([`menu-game/${userLogged.id}`]);
          },
          error => {
            console.error(error)
          });
      }
    } else {
      this.logged = false;
    }
  }

  ngOnInit(): void {}

  quit(): void {
    window.open("", '_self').window.close(); //TODO: fix the close window
  }

}