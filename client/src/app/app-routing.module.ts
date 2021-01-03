import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectShowComponent } from './projects/projectShow/projectShow.component';
import { GroupsComponent } from './groups/groups.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { AnonymGuard } from '@core/guards/anonym.guard';

import { AuthComponent } from './auth/auth.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ path: '', component: AuthComponent, /*canActivate: [AnonymGuard]*/ },
	{ path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
	{ path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
	{ path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
	{ path: 'projects/:id', component: ProjectShowComponent, canActivate: [AuthGuard] },
	{ path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: '404', component: PagenotfoundComponent },
		{ path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
