import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredentials = false;
  logInFormGroup: FormGroup;
  email: string;
  password: string;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.invalidCredentials.subscribe(valid => this.invalidCredentials = valid);

    this.logInFormGroup = this.formBuilder.group({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    const username = this.logInFormGroup.controls['email'].value;
    const password = this.logInFormGroup.controls['password'].value;

    this.authService.logIn(this.email, this.password);
  }
}
