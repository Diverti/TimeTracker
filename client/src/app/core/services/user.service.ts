import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
    users$ = new BehaviorSubject<User[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getUsers(): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<User[]>(`${baseUrl}/users`, {headers: header})
            .subscribe(i => {
                this.users$.next(i);
            });
    }
    
    addUser(user: User) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<User>(`${baseUrl}/users`, user, {headers: header})
        .subscribe(
            ni => {
                this.users$.next(this.users$.getValue().concat([ni]));
                this.ns.show('Hibabejelentés hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    updateUser(user: User,id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<User>(`${baseUrl}/users`, user, {headers: header})
        .subscribe(
            ni => {
                this.users$.next(this.users$.getValue().concat([ni]));
                this.ns.show('Hibabejelentés hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }
}
