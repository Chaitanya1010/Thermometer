import { Component,ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { TemperatureReadingsService } from './temperature-readings.service';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{
  title = 'Thermometer Dashboard';
  chart; // This will hold our chart info

  constructor(private temp_reading_service: TemperatureReadingsService) {}

  ngAfterViewInit()
  {
  }

  public draw_graph()
  {
   
  }
}
