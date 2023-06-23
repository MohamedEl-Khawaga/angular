import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { AllEmployeeComponent } from '../all-employee/all-employee.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  id: number = 0;
  branches: any;
  registerForm!: FormGroup;

  employees: any;
  constructor(
    private formBuilder: FormBuilder,
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getbranch();
  }

  //getById() {
  //  this._EmployeeService.getEmployeesById(this.id).subscribe((data) => {
  //    //console.log(data)
  //    //this.value = data;
  //    console.log();
  //  });
  //}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z_ ]{5,25}'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{1,20}@[a-zA-Z]{1,7}.com'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^01[0125][0-9]{8}$'),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(60),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      available: new FormControl(true),
      role_Id: new FormControl(2),
      branch_Id: new FormControl( null, [Validators.required])
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this._EmployeeService.getEmployeesById(this.id).subscribe({
        next: (response) => {
          this.employees = response;
          this.registerForm.controls['name'].setValue(this.employees.name);
          this.registerForm.controls['phone'].setValue(this.employees.phone);
          this.registerForm.controls['email'].setValue(this.employees.email);
          this.registerForm.controls['age'].setValue(this.employees.age);
          this.registerForm.controls['password'].setValue(
            this.employees.password
          );
          this.registerForm.controls['address'].setValue(
            this.employees.address
          );
          this.registerForm.controls['branch_Id'].setValue(
            this.employees.branch_Id 
          );
        },
      });
    }
  }


  get getEmployeeName() {
    return this.registerForm.controls['name'];
  }

  get getEmployeeEmail() {
    return this.registerForm.controls['email'];
  }

  get getEmployeePhone() {
    return this.registerForm.controls['phone'];
  }

  
  get getEmployeeAddress() {
    return this.registerForm.controls['address'];
  }

  get getEmployeePassword() {
    return this.registerForm.controls['password'];
  }

  get getEmplyeeBranch() {
    return this.registerForm.controls['branch_Id'];
  }

  get getEmployeeAge() {
    return this.registerForm.controls['age'];
  }


  submit(e: Event) {
    e.preventDefault();
    if (this.registerForm.valid) {
      if (this.id == 0) {
        this._EmployeeService
          .addEmployees(this.registerForm.value)
          .subscribe({});
        this.registerForm.reset();
        this._Router.navigate(['AllEmployee']);
      } else {
        this._EmployeeService
          .editEmployees(this.registerForm.value, this.id)
          .subscribe();
        console.log(this.registerForm.value);
      }
    } else {
      this.markAllControlsAsTouched();
    }
  }

  getbranch() {
    this._EmployeeService.getBranches().subscribe((data) => {
      this.branches = data;
    });
  }

  markAllControlsAsTouched(): void {
    for (const controlName in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(controlName)) {
        this.registerForm.controls[controlName].markAsTouched();
      }
    }
  }
  //submitForm(e: Event) {
  //  e.preventDefault();
  //  // console.log(registerForm.value)
  //  //this.submitted = false;
  //  this._Router.navigate(['AllEmployee']);
  //  if (this.registerForm.valid) {
  //    this._EmployeeService.addEmployees(this.registerForm.value).subscribe();
  //    // console.log(registerForm.value)
  //  }
  //}
}
