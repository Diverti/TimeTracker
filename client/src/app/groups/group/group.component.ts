import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';

import { Group } from '@core/interfaces/group.interface';
import { GroupService } from '@core/services/group.service';
import { ProjectService } from '@core/services/project.service';
import { Project } from '@core/interfaces/project.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  projects: Project[];

 @Input() group: Group = null;

  constructor(
    private dialog: MatDialog,
    private ps: ProjectService,
    private router: Router
  ) { 
    
  }

  ngOnInit(){
    this.projects = this.group.projects;
  }

  goToGroup(group: Group): void{
    this.router.navigate([`/groups/${group.id}`])
  }

  openEditGroupDialog(group: Group): void {
		const dialogRef = this.dialog.open(AddEditGroupComponent, {
      width: '1000px',
      data: group
		})
  }

  openDeleteGroupDialog(group: Group):void {
    this.dialog.open(DeleteGroupDialogComponent, {
      data: group
    });
  }

}

@Component({
  selector: 'delete-group-dialog',
  templateUrl: 'delete-group-dialog.html',
})
export class DeleteGroupDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Group,
    protected gs: GroupService
  ){}
  deleteGroup(group: Group){
    this.gs.deleteGroup(this.data.id);
  }
}