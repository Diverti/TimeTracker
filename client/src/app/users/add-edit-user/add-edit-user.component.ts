import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserService } from '@core/services/user.service';
import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';
import { Label } from '@core/interfaces/label.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  labels: string[] = [];
  lids: number[] = [];
  allLabels: string[] = [];
  allLabelObjects: Label[] = [];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public is: UserService,
    private ns: NotificationService
  ) {
    this.userForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      place: null,
      labels: []
    });

    this.filteredLabels = this.labelCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));
  }

  ngOnInit(): void {
    this.is.getLabels().then((ls: Label[]) => {
      this.allLabelObjects = ls;
      ls.forEach((value, key) => {
        this.allLabels.push(value['text']);
      });
      if (this.data) {
        this.userForm.disable();
        this.labelCtrl.disable();
        this.userForm.patchValue(this.data);
        this.data.labels.map(l => {
          this.labels.push(l.text);
        });
      }
    });
  }

  addUser(form: FormGroup) {
    if (form.valid) {
      form.patchValue({'labels': this.lids})
      console.log(form.value);
      this.is.addUser(<User>form.value);
      this.userForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

  labelAdd(event: MatChipInputEvent): void {    
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }
    if (input) {
      input.value = '';
    }    
    this.is.addLabel(value).then(lid => {
      this.lids.push(lid);
    });
    this.labelCtrl.setValue(null);
  }

  labelSelected(event: MatAutocompleteSelectedEvent): void {    
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
    this.lids.push(this.allLabelObjects.find(l => l.text === event.option.viewValue).id);    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }

}
