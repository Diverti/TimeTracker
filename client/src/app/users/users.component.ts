import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '@core/services/user.service';
//import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

import { User } from '@core/interfaces/user.interface';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public us: UserService
	) { }

	ngOnInit(): void {
		this.us.getUsers();
	}

	openAddUserDialog(): void {
		/*const dialogRef = this.dialog.open(AddEditUserComponent, {
			width: '1000px'
		})*/
	}

}
