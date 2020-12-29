import { ProjectService } from './services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './services/auth.service';
import { GroupService } from '@core/services/group.service';
import { IssueService } from '@core/services/issue.service';
import { NotificationService } from '@core/services/notification.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatSnackBarModule
	],
	providers: [
		AuthService,
		IssueService,
		GroupService,
		ProjectService,
		NotificationService
	]
})
export class CoreModule { }
