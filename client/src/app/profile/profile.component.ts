import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AddEditCompanyComponent } from '../companies/add-edit-company/add-edit-company.component';
import { EditProfileComponent } from './add-edit-profile/edit-profile.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  user$: BehaviorSubject<User>;
  user: User;

  constructor(
      protected as: AuthService,
      private dialog: MatDialog,
    ) { 
    this.user$ = as.getCurrentUser();
    this.user$.subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    console.log(this.user);
  }

  openEditProfileDialog(user: User): void {
		const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '1000px',
      data: user
		})
  }
  
  openAddCompanyDialog(): void {
		const dialogRef = this.dialog.open(AddEditCompanyComponent, {
			width: '1000px'
		})
	}

}
