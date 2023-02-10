import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStatService } from '../services/user-stat.service';

@Injectable({ providedIn: 'root' })
export class AllUserStatsResolverService implements Resolve<any> {
  constructor(private _userStatService: UserStatService) {}
  resolve(): Observable<any> {
    return this._userStatService.getUsersStats();
  }
}
