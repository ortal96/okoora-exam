import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(baseUrl + 'users');
  }


  public setUser(user: User): void {
    sessionStorage.setItem('user' ,JSON.stringify(user))
  }

  public getUser() {
    const userData = sessionStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }
  }

