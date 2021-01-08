import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NotificationService } from '@core/services/notification.service';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { User } from '@core/interfaces/user.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ns: NotificationService,
    protected us: UserService,
    protected as: AuthService
  ) {
      this.profileForm = this.formBuilder.group({
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]]
      });
    }

  ngOnInit(): void {
    this.profileForm.patchValue(this.data);
  }

  editProfile(form: FormGroup) {
    if (form.valid) {
        this.us.updateUser(<User>form.value, this.data.id);
      setTimeout(() => {this.dialogRef.close()},500);
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }
}
