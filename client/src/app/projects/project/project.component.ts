import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';

import { Project } from '@core/interfaces/project.interface';
import { TaskService } from '@core/services/task.service';
import { Router } from '@angular/router';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

 @Input() project: Project = null;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  goToProject(project: Project): void{
    this.router.navigate([`/projects/${project.id}`])
  }

  

  openDeleteDialog(project: Project):void {
    this.dialog.open(DeleteProjectDialogComponent, {
      data: project
    });
  }

  openEditProjectDialog(project: Project): void {
		const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '1000px',
      data: project
		})
	}

}

@Component({
  selector: 'delete-project-dialog',
  templateUrl: 'delete-project-dialog.html',
})
export class DeleteProjectDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ){}
  deleteProject(project: Project){
    console.log(this.data);
  }
}