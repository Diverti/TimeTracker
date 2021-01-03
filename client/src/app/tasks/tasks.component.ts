import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { TaskService } from '@core/services/task.service';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ActivatedRoute } from '@angular/router';

import { Task } from '@core/interfaces/task.interface';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public ts: TaskService,
		private route: ActivatedRoute,
    	private projectService: TaskService
	) { }

	ngOnInit(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.ts.getTasksForProject(id);
	}

	openAddTaskDialog(): void {
		const dialogRef = this.dialog.open(AddEditTaskComponent, {
			width: '1000px'
		})
	}
}