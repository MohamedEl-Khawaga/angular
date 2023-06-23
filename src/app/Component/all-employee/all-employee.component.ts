import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css'],
})
export class AllEmployeeComponent implements OnInit {
  employees: any;
  branches: any;
  id: number = 0;

  constructor(private _EmployeeService: EmployeeService) {
    this.getAll();
  }
  ngOnInit(): void {}

  getAll() {
    this._EmployeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  softDelete(emp: any) {
    let emp_id = Number(emp.id);
    this._EmployeeService.softDeleteEmployees(emp, emp_id).subscribe();
  }
  Delete(id: number) {
    this._EmployeeService.DeleteEmployees(id).subscribe();
    this.getAll();
  }
}
