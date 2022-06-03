import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit{

  public userID;
  public userLogged: boolean = false;
  constructor(private router: Router, private _battleService: BattleService) {
    if (localStorage.getItem('userLogged') !== null) {
      this.userID = JSON.parse(localStorage.getItem('userLogged')).id;
      console.log(this.userID);
      this.userLogged = true;
    }
  }

  ngOnInit(): void {
    this._battleService.stopAudio();
  }
  
}
