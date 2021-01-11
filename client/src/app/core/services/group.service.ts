import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Group } from '@core/interfaces/group.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
    groups$ = new BehaviorSubject<Group[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getGroups(): void {        
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Group[]>(`${baseUrl}/groups`, {headers: header})
            .subscribe(i => {
                this.groups$.next(i);
            });
    }

    addGroup(group: Group) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<Group>(`${baseUrl}/groups`, group, {headers: header})
        .subscribe(
            ni => {
                this.groups$.next(this.groups$.getValue().concat([ni]));
                this.ns.show('Csoport hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    updateGroup(group: Group, id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.patch<Group>(`${baseUrl}/groups/${id}`, group, {headers: header})
        .subscribe(
            ni => {
                this.getGroups();
                this.ns.show('Csoport módosítva!');
            },
            error => {
                this.ns.show('HIBA! Csoport módosítása sikertelen!');
                console.error(error);
            }
        );
    }

    deleteGroup(id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.delete<Group>(`${baseUrl}/groups/${id}`, {headers: header})
        .subscribe(
            ni => {
                this.getGroups();
                this.ns.show('Csoport törölve!');
            },
            error => {
                this.ns.show('HIBA! Csoport törlése sikertelen!');
                console.error(error);
            }
        );
    }
}
