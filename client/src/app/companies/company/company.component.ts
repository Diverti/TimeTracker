import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Company } from '@core/interfaces/company.interface';
import { AddEditCompanyComponent } from '../add-edit-company/add-edit-company.component';
import { CompanyService } from '@core/services/company.service';

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
  
  openDeleteCompanyDialog(company: Company):void {
    this.dialog.open(DeleteCompanyDialogComponent, {
      data: company
    });
  }

}

@Component({
  selector: 'delete-company-dialog',
  templateUrl: 'delete-company-dialog.html',
})
export class DeleteCompanyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Company,
    protected cs: CompanyService
  ){}
  deleteCompany(company: Company){
    this.cs.deleteCompany(this.data.id);
  }
}
