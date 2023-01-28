import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = environment.urlBase;
  private _auth : Auth | undefined;

  get auth(){
    return {...this._auth}; 
  }

  constructor(
    private http : HttpClient
  ) { }

  login(){
    return this.http.get<Auth>(`${this._url}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth=> localStorage.setItem('id', auth.id))
      );
  }

  verificarAuth() : Observable<boolean> {
    if(localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this._url}/usuarios/1`)
      .pipe(
        map( auth => {
          console.log('map', auth);
          this._auth = auth;
          return true; 
        })
      );

    return of(true);
  }

  logout() {
    this._auth = undefined;
  }
}
