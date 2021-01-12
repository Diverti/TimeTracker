import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected as: AuthService,
    private ns : NotificationService
  ) {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  signin(form: FormGroup): void {
    if (form.valid) {
      console.log("login");
      
      this.as.login(<User>form.value);
    }
    else {
      this.ns.show('Error! The given e-mail or password is incorrect!');
    }
  }

}
