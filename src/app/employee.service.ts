import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'http://localhost:5143/api/employees';
  baseUrlBranches: string = 'http://localhost:5143/api/Branch';
  baseUrlAll: string = 'http://localhost:5143/api/All';

  constructor(private _HttpClient: HttpClient) {}

  getEmployees(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/all`);
  }
  //http://localhost:5143/api/Employees/id/1
  addEmployees(employee: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl, employee);
  }

  getEmployeesById(id: Number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/id/${id}`);
  }

  editEmployees(employee: any, id: Number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/edit/${id}`, employee);
  }

  softDeleteEmployees(employee: any, id: Number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/softdelete/${id}`, employee);
  }

  DeleteEmployees(id: Number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/Delete/${id}`);
  }

  getBranches() {
    return this._HttpClient.get(this.baseUrlBranches);
  }

  getAllUsers(login : any):Observable<any> {
    return this._HttpClient.post(this.baseUrlAll , login);
  }
}
