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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  signUp(user) {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    formData.append('avatar', user.avatar);
    return this.http.post<ResponseI>(`${this.url}`, formData, this.options('sign-up'));
  }

  logIn(form: LoginI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.url}/login`, form, this.options('login'));
  }

  autoLogIn(id, token) {
    return this.http.post<ResponseI>(`${this.url}/autologin`, { id, token }, this.options('autologin', token));
  }

  getOneUser(id){
    return this.http.get<any>(`${this.url}/${id}`);
  }

  options(type: string, token?: any) {
    switch (type) {
      case 'sign-up': return { headers: new HttpHeaders({ 'Authorization': `Bearer${token}`}) };
      case 'autologin': return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}) };
      case 'login': return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '' }) };
      default: console.log('error');
    }
  }
}