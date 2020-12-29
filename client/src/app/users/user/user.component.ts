import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

/*import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';*/

import { User } from '@core/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

 @Input() user: User = null;

  constructor(private dialog: MatDialog) { }

  openEditUserDialog(user: User): void {
		/*const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '1000px',
      data: user
		})*/
	}

}
