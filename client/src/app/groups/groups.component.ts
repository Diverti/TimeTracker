import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { GroupService } from '@core/services/group.service';
//import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';

import { Group } from '@core/interfaces/group.interface';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public gs: GroupService
	) { }

	ngOnInit(): void {
		this.gs.getGroups();
	}

	/*openAddGroupDialog(): void {
		const dialogRef = this.dialog.open(AddEditGroupComponent, {
			width: '1000px'
		})
	}*/

}
