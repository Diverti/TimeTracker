import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

/*import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';*/

import { Group } from '@core/interfaces/group.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

 @Input() group: Group = null;

  constructor(private dialog: MatDialog) { }

  openEditGroupDialog(group: Group): void {
		/*const dialogRef = this.dialog.open(AddEditGroupComponent, {
      width: '1000px',
      data: group
		})*/
	}

}
