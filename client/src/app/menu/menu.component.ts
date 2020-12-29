import { User } from '@core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	isLoggedIn$: Observable<boolean>;
	userbs$: BehaviorSubject<any>;
	user$: User;

	constructor(protected as: AuthService) {
		this.isLoggedIn$ = as.isLoggedIn();
		this.userbs$ = as.getCurrentUser();
		this.userbs$.subscribe(user => this.user$ = user);
	}

	logout(): void {
		this.as.logout();
	}
}
