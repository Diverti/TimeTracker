import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { TaskService } from '@core/services/task.service';
import { NotificationService } from '@core/services/notification.service';

import { Task } from '@core/interfaces/task.interface';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  lids: number[] = [];
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public is: TaskService,
    private ns: NotificationService
  ) {
    this.taskForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      due_date: [null, Validators.required],
    });
  }

  ngOnInit(): void {
      if (this.data) {
        this.taskForm.patchValue(this.data);
    };
  }

  addTask(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      this.is.addTask(<Task>form.value);
      setTimeout(() => {this.dialogRef.close()},500);
      //this.taskForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}
