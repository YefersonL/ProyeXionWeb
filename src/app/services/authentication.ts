import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Jwtres } from '../models/jwtres';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  apiUri = '/api/auth';
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/register', user);
  }

  login(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/login', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
          {
            //console.log(JSON.parse(JSON.stringify(res)).accessToken)
            //ACCESS_TOKEN: JSON.parse(JSON.stringify(res)).accessToken
          }
        } else {
          console.log('hubo un error')
        }
      })

    )
  }


  logout() {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  updateProfile(data: any): Observable<Jwtres> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.httpClient.put<Jwtres>(this.apiUri + '/profile', data, { headers });
  }

  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", token);
    this.token = token;
  }

  private getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}
