import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Project } from '@core/interfaces/project.interface';
import { ProjectService } from '@core/services/project.service';
import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';

@Component({
  selector: 'app-projectShow',
  templateUrl: './projectShow.component.html',
  styleUrls: ['./projectShow.component.scss']
})
export class ProjectShowComponent {
 @Input() project: Project = null;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public ps: ProjectService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ps.getProject(id)
      .subscribe(project => this.project = project);
  }

  openEditProjectDialog(project: Project): void {
		const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '1000px',
      data: project
		})
	}

}
