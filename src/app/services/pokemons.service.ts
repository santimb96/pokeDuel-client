import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  readonly url = `${environment.api}/pokemons`;

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  options(type: string, token?: any) {
    switch (type) {
      case 'sign-up': return { headers: new HttpHeaders({ 'Authorization': `Bearer${token}` }) };
      case 'autologin': return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }) };
      case 'login': return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '' }) };
      case 'edit': return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
      default: console.log('error');
    }
  }
}
