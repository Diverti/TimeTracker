import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Group } from '@core/interfaces/group.interface';
import { GroupService } from '@core/services/group.service';
import { ProjectService } from '@core/services/project.service';
import { Project } from '@core/interfaces/project.interface';
import { AddEditGroupComponent } from '../../add-edit-group/add-edit-group.component';
import { DeleteGroupDialogComponent } from '../../group/group.component';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/interfaces/user.interface';

@Component({
  selector: 'app-groupShow',
  templateUrl: './groupShow.component.html',
  styleUrls: ['./groupShow.component.scss']
})
export class GroupShowComponent {
  projects: Project[];
  group: Group;
  isMember: boolean;
  currentUser: User;

  constructor(
    private dialog: MatDialog,
    private gs: GroupService,
    private as: AuthService,
    private route: ActivatedRoute
  ) { 
    this.currentUser = this.as.getCurrentUser().getValue();
  }

  ngOnInit(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.gs.getGroup(id)
      .subscribe(group => this.group = group);
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