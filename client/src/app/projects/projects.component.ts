import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ProjectService } from '@core/services/project.service';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	

	constructor(
		public dialog: MatDialog,
		public ps: ProjectService,
	) {}

	ngOnInit(): void {
		this.ps.getProjects();
	}

	openAddProjectDialog(): void {
		const dialogRef = this.dialog.open(AddEditProjectComponent, {
			width: 'relative'
		})
	}
}
