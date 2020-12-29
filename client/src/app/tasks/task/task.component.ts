import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

/*import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';*/

import { Task } from '@core/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

 @Input() task: Task = null;

  constructor(private dialog: MatDialog) { }

  openEditTaskDialog(task: Task): void {
		/*const dialogRef = this.dialog.open(AddEditTaskComponent, {
      width: '1000px',
      data: task
		})*/
	}

}
