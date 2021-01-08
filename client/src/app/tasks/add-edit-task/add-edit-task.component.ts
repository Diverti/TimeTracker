import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';

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
  isAddMode: boolean;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  project_id: number;
  
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public ts: TaskService,
    private ns: NotificationService
  ) {
    this.taskForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      due_date: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.project_id = +this.router.url.split('/').pop();
    if (this.data) {
      this.taskForm.patchValue(this.data);
      this.isAddMode = false;
    } else {
      this.isAddMode = true;
    }
  }

  addEditTask(form: FormGroup) {
    
    if (form.valid) {
      console.log(form.value);
      if(this.isAddMode) {
        this.ts.addTask(<Task>form.value, this.project_id);
      } else {
        this.ts.updateTask(<Task>form.value, this.data.id);
      }
      
      setTimeout(() => {this.dialogRef.close()},500);
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}
