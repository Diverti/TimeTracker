import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ProjectService } from '@core/services/project.service';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { CompaniesComponent } from '../companies/companies.component';
import { Company } from '@core/interfaces/company.interface';
import { CompanyService } from '@core/services/company.service';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	companies: Company[];

	constructor(
		public dialog: MatDialog,
		public ps: ProjectService,
		public cs: CompanyService
	) {}

	ngOnInit(): void {
		this.ps.getProjects();
		this.companies = this.cs.getCurrentCompanies();
	}

	openAddProjectDialog(): void {
		const dialogRef = this.dialog.open(AddEditProjectComponent, {
			width: 'relative',
			data: this.companies
		})
	}
}
