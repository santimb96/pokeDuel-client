import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  signUp(user){
    return this.http.post(`${this.url}`, user, this.options('sign-up'));
  }  

  logIn(form: LoginI): Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/login`, form, this.options('login'));
  }

  autoLogIn(id,token){
    return this.http.post<ResponseI>(`${this.url}/autologin`, {id,token}, this.options('autologin',token));
  }

  options(type: string, token?: any){
    switch(type){
      case 'sign-up': return {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': ''}) };
      case 'autologin': return {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${token}`}) };
      case 'login': return {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': ''}) };
      default: console.log('error');
    }
  }
}