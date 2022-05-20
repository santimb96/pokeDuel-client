import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserStatService } from "../services/user-stat.service";

@Injectable({ providedIn: 'root' })
export class UserStatResolverService implements Resolve<any>{

    constructor(private _userStatService: UserStatService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._userStatService.getOneUserStats(route.paramMap.get('id'));
    }
}

