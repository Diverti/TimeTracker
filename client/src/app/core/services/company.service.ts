import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Company } from '@core/interfaces/Company.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {
    companies$ = new BehaviorSubject<Company[]>([]);
    currentCompanies$ = new BehaviorSubject<Company[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getCompanies(): void {        
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Company[]>(`${baseUrl}/companies`, {headers: header})
            .subscribe(i => {
                this.companies$.next(i);
            });
    }

    addCompany(company: Company) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<Company>(`${baseUrl}/companies`, company, {headers: header})
        .subscribe(
            ni => {
                this.companies$.next(this.companies$.getValue().concat([ni]));
                this.ns.show('Cég hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Cég hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    updateCompany(company: Company, id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.patch<Company>(`${baseUrl}/companies/${id}`, company, {headers: header})
        .subscribe(
            ni => {
                this.getCompanies();
                this.ns.show('Cég adatai módosítva!');
            },
            error => {
                this.ns.show('HIBA! Cég hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    getCurrentCompanies(): Company[]{
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Company[]>(`${baseUrl}/currentcompanies`, {headers: header})
            .subscribe(i => {
                this.currentCompanies$.next(i);
        });
        return this.currentCompanies$.getValue();
    } 

    deleteCompany(id: number) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.delete<Company>(`${baseUrl}/companies/${id}`, {headers: header})
        .subscribe(
            ni => {
                this.getCompanies();
                this.ns.show('Cég törölve!');
            },
            error => {
                this.ns.show('HIBA! Cég hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }
}
