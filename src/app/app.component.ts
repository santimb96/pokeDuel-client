import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';
import { format } from 'date-fns';
import { PokemonsService } from './services/pokemons.service';
import { MatDialog } from '@angular/material/dialog';
import { BattleService } from './services/battle.service';

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

  constructor(public router: Router, private _authService: AuthService,
    private _pokemonService: PokemonsService, private route: ActivatedRoute, public dialog: MatDialog,
    private _battleService: BattleService) {
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

        this._authService.autoLogIn(userLogged.id, userLogged.token).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.error(error)
          });
      }
    }
  }

  savePath() {
    localStorage.setItem('path', this.router.url);
    this.router.navigate(['options']);
  }

  goTo(): void{
    if(location.pathname.includes('/game/') || location.pathname.includes('continue-game')){
      this.openDialog();
    }
    else{
      this.router.navigate([`menu-game/${this.userID}`]);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._battleService.saveGame(this.userID); //TODO: SAVE THE GAME HERE
        this.router.navigate([`menu-game/${this.userID}`]);
      } else if(!result){
        this.router.navigate([`menu-game/${this.userID}`]);
      } 
    });
  }

}

@Component({
  selector: 'dialog-content',
  template: `<h2 mat-dialog-title>Do you want to save the game?</h2>
  <mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]=false>Close</button>
  <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Save</button>
  </mat-dialog-actions>`,
})
export class DialogContentComponent { }

//TODO: DIALOG TO CONFIRM IF YOU WANT TO GO TO MENU
//FIXME: FIX THE 'MY-ACCOUNT' INTERFACE