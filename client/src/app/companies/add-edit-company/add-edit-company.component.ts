import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { NotificationService } from '@core/services/notification.service';

import { CompanyService } from '@core/services/company.service';
import { Company } from '@core/interfaces/company.interface';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isAddMode: boolean;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    public cs: CompanyService,
    private ns: NotificationService
  ) {
    this.companyForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.data){
      this.companyForm.patchValue(this.data);
      this.isAddMode = false;
    } else {
      this.isAddMode = true;
    }
      
  }

  addEditCompany(form: FormGroup) {
    if (form.valid) {
      if(this.isAddMode){
        this.cs.addCompany(<Company>form.value);
      } else {
        this.cs.updateCompany(<Company>form.value, this.data.id);
      }
      
      setTimeout(() => {this.dialogRef.close()},500);
    } else {
      this.ns.show('Error! Check the given inputs!');
    }
  }

}
