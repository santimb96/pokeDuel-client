import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStat } from '../models/userStat';

@Injectable({
  providedIn: 'root',
})
export class UserStatService {
  readonly url = `${environment.api}/userStats`;

  constructor(private http: HttpClient) {}

  getUsersStats(): Observable<UserStat[]> {
    return this.http.get<UserStat[]>(this.url);
  }

  getOneUserStats(id: string): Observable<any> {
    return this.http.get<UserStat>(`${this.url}/${id}`);
  }

  newState(state): Observable<any> {
    return this.http.post<any>(
      `${this.url}`,
      JSON.parse(state),
      this.options('newState')
    );
  }

  deleteState(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editState(id: string, state): Observable<any> {
    return this.http.put(
      `${this.url}/${id}`,
      JSON.parse(state),
      this.options('edit')
    );
  }

  options(type: string, token?: any): any {
    switch (type) {
      case 'newState':
        return {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        };
      case 'login':
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: '',
          }),
        };
      case 'edit':
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
        };
      default:
        console.log('error');
    }
  }
}
