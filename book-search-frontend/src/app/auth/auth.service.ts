import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<AuthResponse | null>(null);
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService
  ) {
    this.autoLogin()
  }
  user: Observable<AuthResponse | null> = this.userSubject.asObservable();
  signIn(identifier: string | Blob, password: string | Blob) {
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);
    return this.http.post<any>(`auth/local`, formData);
  }

  setUser(authResponse: AuthResponse) {
    this.userSubject.next(authResponse);
    localStorage.setItem('user', JSON.stringify(authResponse));
  }

  refreshInfo() {
    this.me().subscribe(userinfo => {
      const item = localStorage.getItem("user");
      const user = item ? JSON.parse(item) : [];
      user.user = userinfo;
      this.setUser(user);
    })
  }

  autoLogin() {
    const txt = localStorage.getItem('user');
    if (txt) {
      const user = JSON.parse(txt);
      if (!user) {
        return;
      }
      this.setUser(user);
    }
  }

  signOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  signUp(firstName : string, email : string, password : string) {
    const formData = new FormData();
    formData.append('username', firstName);
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(`auth/local/register`, formData);
  }

  me() {
    return this.http.get('users/me?populate=*');
  }

  handleError(errorObject: any) {
    return this._errorService.handleError(errorObject)
  }
  
}
