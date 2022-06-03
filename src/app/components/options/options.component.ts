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

  public volumeMusic(volume: any): void {
    console.log(volume?.value);
    this._battleService.setVolume(volume?.value);
  }
  
  public getVolumeMusic(): number {
    console.log(this._battleService.getVolume());
    return this._battleService.getVolume();
  }
}
