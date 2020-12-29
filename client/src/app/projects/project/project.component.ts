import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

/*import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';*/

import { Project } from '@core/interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

 @Input() project: Project = null;

  constructor(private dialog: MatDialog) { }

  openEditProjectDialog(project: Project): void {
		/*const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '1000px',
      data: project
		})*/
	}

}
