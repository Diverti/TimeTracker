import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

import { GroupService } from '@core/services/group.service';
import { NotificationService } from '@core/services/notification.service';

import { Group } from '@core/interfaces/group.interface';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent implements OnInit {
  groupForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  isAddMode: boolean;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    public gs: GroupService,
    private ns: NotificationService
  ) {
    this.groupForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
      if (this.data) {
        this.isAddMode = false;
        this.groupForm.patchValue(this.data);
      } else {
        this.isAddMode = true;
      }
  }

  addEditGroup(form: FormGroup) {
    if (form.valid) {
      if(this.isAddMode){
        this.gs.addGroup(<Group>form.value);
      } else {
        this.gs.updateGroup(<Group>form.value, this.data.id);
      }
      
      setTimeout(() => {this.dialogRef.close()},500);
    } else {
      this.ns.show('Error! Check the input fields!');
    }
  }
}
