import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Task } from '@core/interfaces/task.interface';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

 @Input() task: Task = null;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(){
    console.log(this.task.name);
  }

  openEditTaskDialog(task: Task): void {
	    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      width: '1000px',
      data: task
		})
	}

}
