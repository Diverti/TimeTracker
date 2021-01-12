import { Component, OnInit, Inject, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ProjectService } from '@core/services/project.service';
import { NotificationService } from '@core/services/notification.service';

import { Project } from '@core/interfaces/project.interface';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/interfaces/user.interface';
import { Company } from '@core/interfaces/company.interface';
import { CompanyService } from '@core/services/company.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  projectForm: FormGroup;
  isAddMode: boolean;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //companies: Company[];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() companies: Company[] = null;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public is: ProjectService,
    private ns: NotificationService,
    protected as: AuthService,
    protected cs: CompanyService
  ) {
      this.projectForm = this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        due_date: [null, Validators.required],
        company_id: [null, Validators.required],
      });
    }

  ngOnInit(): void {
      if (this.data.description) {
        this.isAddMode = false;
        this.companies = []
        this.projectForm.patchValue(this.data);
      } else {
        this.isAddMode = true;
        this.companies = this.cs.getCurrentCompanies();
      }
  }

  addEditProject(form: FormGroup) {
    if (form.valid) {
      if(this.isAddMode)
        this.is.addProject(<Project>form.value);
      else
        this.is.updateProject(<Project>form.value, this.data.id);
      setTimeout(() => {this.dialogRef.close()},500);
    } else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }
}
