import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Task } from '@core/interfaces/task.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
    tasks$ = new BehaviorSubject<Task[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getTasks(): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Task[]>(`${baseUrl}/tasks`, {headers: header})
            .subscribe(i => {
                this.tasks$.next(i);
            });
    }

    addTask(task: Task) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<Task>(`${baseUrl}/projects/2/tasks`, task, {headers: header})
        .subscribe(
            ni => {
                this.tasks$.next(this.tasks$.getValue().concat([ni]));
                this.ns.show('Feladat hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Feladat hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }
}
