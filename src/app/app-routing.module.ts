import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeComponent } from './Component/all-employee/all-employee.component';
import { AddEmployeeComponent } from './Component/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: AllEmployeeComponent },
  { path: 'AllEmployee', component: AllEmployeeComponent },
  { path: 'employee', component: AddEmployeeComponent, pathMatch: 'full' },
  {
    path: 'employee/:id',
    component: AddEmployeeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
