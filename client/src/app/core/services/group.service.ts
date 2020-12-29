import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Group } from '@core/interfaces/group.interface';
import { Label } from '@core/interfaces/label.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
    groups$ = new BehaviorSubject<Group[]>([]);
    labels: Label[] = [];

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
                this.ns.show('Hibabejelentés hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    async getLabels(): Promise<Label[]> {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        const labels: Label[] = await this.http.get<Label[]>(`${baseUrl}/labels`, {headers: header}).toPromise();
        return labels;
    }

    async addLabel(label: string) {        
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );        
        const id = await this.http.post<number>(`${baseUrl}/labels`, {'text': label}, {headers: header}).toPromise()
        .then(
            l => {
                this.ns.show('Új cimke hozzáadva!');
                return l['id'];
            })
            .catch(error => {
                this.ns.show('HIBA! Új cimke hozzáadása sikertelen!');
                console.error(error);
            }
        );
        return id;
    }

}
