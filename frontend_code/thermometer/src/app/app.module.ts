import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemperatureReadingsService } from './temperature-readings.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { ChartForRecordsComponent } from './chart-for-records/chart-for-records.component';
import { AddDeviceComponent } from './add-device/add-device.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewRecordsComponent,
    ChartForRecordsComponent,
    AddDeviceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TemperatureReadingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
