import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Company } from '@core/interfaces/company.interface';
import { AddEditCompanyComponent } from '../add-edit-company/add-edit-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

 @Input() company: Company = null;

  constructor(private dialog: MatDialog) { }

  openEditCompanyDialog(company: Company): void {
		const dialogRef = this.dialog.open(AddEditCompanyComponent, {
      width: '1000px',
      data: company
		})
	}

}
