import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

import { baseUrl } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());
  currentUser$ = new BehaviorSubject<any>(null);
  user$ = new Observable<any>(null);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService,
  ) {
    if(this.hasToken()) {
      const header = new HttpHeaders().set(
        'Authorization', `Bearer ${localStorage.getItem('token')}`
      );
      this.http.get<User>(`${baseUrl}/user`, {headers: header}).subscribe(
        userInfo => {
          this.currentUser$.next(userInfo['user']);
        }
      )
    }
    this.user$ = this.currentUser$.asObservable();
    console.log(this.user$);
   }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  register(user: User): void {
    
    this.http.post<User>(`${baseUrl}/register`, user, this.httpOptions).subscribe(
      data => {
        this.ns.show('Register succesfull!');
      },
      error => {
        this.ns.show('Error! Check the given inputs!');
        console.error(error);
      }
    );
  }

  login(user: User): void {    
    this.http.post<User>(`${baseUrl}/login`, user, this.httpOptions).subscribe(
      userInfo => {
        localStorage.setItem('token', userInfo['token']);
        this.currentUser$.next(userInfo['user']);
        this.isLogin$.next(true);
        this.ns.show('Successful login!');
        this.router.navigate(['/profile']);
      },
      error => {
        this.ns.show('Error! Login was unsuccessful!');
        console.error(error);
      }
    );
  }

  getCurrentUser(): BehaviorSubject<any> {
    return this.currentUser$;
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    this.ns.show('You logged out!');
    this.router.navigate(['/']);
  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}