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
    tasks: Task[] = [];

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getTasksForProject(id: number): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );

        this.http.get<Task[]>(`${baseUrl}/projects/${id}/tasks`, {headers: header})
            .subscribe(i => {
                this.tasks$.next(i);
        });
    }

    addTask(task: Task, id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );

        this.http.post<Task>(`${baseUrl}/projects/${id}/tasks`, task, {headers: header})
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

    taskDone(id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );

        this.http.patch<Task>(`${baseUrl}/tasks/${id}/done`, {headers: header})
        .subscribe(
            ni => {
                var newtasks:Task[] = this.tasks$.getValue();
                newtasks[newtasks.findIndex(t => t.id === id)].is_done = true;
                this.ns.show('Feladat elvégezve!');
            },
            error => {
                this.ns.show('HIBA! Feladat hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    updateTask(task: Task, id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );

        this.http.patch<Task>(`${baseUrl}/tasks/${id}`, task, {headers: header})
        .subscribe(
            ni => {
                var newtasks:Task[] = this.tasks$.getValue();
                newtasks[newtasks.findIndex(t => t.id === id)] = ni;
                this.ns.show('Feladat módosítva!');
            },
            error => {
                this.ns.show('HIBA! Feladat módosítása sikertelen!');
                console.error(error);
            }
        );
    }

    deleteTask(id: number){
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        
        this.http.delete<Task>(`${baseUrl}/tasks/${id}`, {headers: header})
        .subscribe(
            ni => {
                console.log(ni);
                var newtasks:Task[] = this.tasks$.getValue();
                newtasks.splice(newtasks.findIndex(t => t.id === id), 1);
                this.ns.show('Feladat törölve!');
            },
            error => {
                this.ns.show('HIBA! Feladat törlése sikertelen!');
                console.error(error);
            }
        );
    }

}
