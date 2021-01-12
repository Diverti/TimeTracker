import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService } from '@core/services/task.service';
import { UserService } from '@core/services/user.service';
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { GroupService } from '@core/services/group.service';
import { NotificationService } from '@core/services/notification.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatSnackBarModule
	],
	providers: [
		AuthService,
		GroupService,
		UserService,
		TaskService,
		ProjectService,
		NotificationService
	]
})
export class CoreModule { }
