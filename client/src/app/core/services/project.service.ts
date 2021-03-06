import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Project } from '@core/interfaces/project.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
    projects$ = new BehaviorSubject<Project[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getProjects(): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Project[]>(`${baseUrl}/projects`, {headers: header})
            .subscribe(i => {
                this.projects$.next(i);
            });
    }

    getProject(id: number): Observable<Project> {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );

        return this.http.get<Project>(`${baseUrl}/projects/${id}`, {headers: header});
    }

    addProject(project: Project) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<Project>(`${baseUrl}/projects`, project, {headers: header})
        .subscribe(
            ni => {
                this.getProjects();
                this.ns.show('Hibabejelentés hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    updateProject(project: Project, id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.patch<Project>(`${baseUrl}/projects/${id}`, project, {headers: header})
        .subscribe(
            ni => {
                this.getProjects();
                this.ns.show('Projekt módosítva!');
            },
            error => {
                this.ns.show('HIBA! Projekt módosítása sikertelen!');
                console.error(error);
            }
        );
    }

    deleteProject(id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.delete<Project>(`${baseUrl}/projects/${id}`, {headers: header})
        .subscribe(
            ni => {
                this.getProjects();
                this.ns.show('Projekt törölve!');
            },
            error => {
                this.ns.show('HIBA! Projekt törlése sikertelen!');
                console.error(error);
            }
        );
    }

}
