import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { ChartForRecordsComponent } from './chart-for-records/chart-for-records.component';
import { AddDeviceComponent } from './add-device/add-device.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view_records', component: ViewRecordsComponent},
  { path: 'draw_chart/:id/:time', component: ChartForRecordsComponent },
  { path: 'add_device', component: AddDeviceComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
