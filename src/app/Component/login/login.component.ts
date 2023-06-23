import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private _EmployeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  Login(event: any) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this._EmployeeService.getAllUsers(this.registerForm.value).subscribe();
    }
  }
}
