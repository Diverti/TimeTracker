import { DatePipe } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Task } from '@core/interfaces/task.interface';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { TaskService } from '@core/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

 @Input() task: Task = null;

  constructor(private dialog: MatDialog) { }

  openDeleteDialog(task: Task):void {
    this.dialog.open(DeleteTaskDialogComponent, {
      data: task
    });
  }

  openEditTaskDialog(task: Task): void {
	    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      width: '1000px',
      data: task
		})
	}

}

@Component({
	selector: 'delete-task-dialog',
	templateUrl: 'delete-task-dialog.html',
  })
  export class DeleteTaskDialogComponent {
	constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private ts: TaskService,
	){}
	deleteProject(task: Task){
	  this.ts.deleteTask(task.id);
	}
  }