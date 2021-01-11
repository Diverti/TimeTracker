import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@core/interfaces/company.interface';

import { CompanyService } from '@core/services/company.service';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

	@Input() companies: Company[] = null;

	constructor(
		public dialog: MatDialog,
		public cs: CompanyService
	) { }

	ngOnInit(): void {
		this.cs.getCompanies();
	}

	

}
