import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {

  public user;
  public userID;
  public userLogged: boolean = false;
  constructor(private router: Router, private _battleService: BattleService) {
    if (localStorage.getItem('userLogged') !== null) {
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.userID = this.user.id;
      this.userLogged = true;
    }
  }

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

  public volumeMusic(volume: any): void {
    this._battleService.setVolume(volume?.value);
  }
  public getVolumeMusic(): number {
    return this._battleService.getVolume();
  }
}
