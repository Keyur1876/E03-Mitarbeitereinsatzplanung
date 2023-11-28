// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: EmployeeDashboardComponent },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
