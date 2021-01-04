import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { UserService } from '@core/services/user.service';
//import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	userbs$: BehaviorSubject<any>;
	user: User;

	constructor(
		public dialog: MatDialog,
		public us: UserService,
		protected as: AuthService
	) { }

	ngOnInit(): void {
		this.us.getUsers();
		
		this.userbs$ = this.as.getCurrentUser();
		console.log(this.userbs$.getValue());
	}

	openAddUserDialog(): void {
		/*const dialogRef = this.dialog.open(AddEditUserComponent, {
			width: '1000px'
		})*/
	}

}
