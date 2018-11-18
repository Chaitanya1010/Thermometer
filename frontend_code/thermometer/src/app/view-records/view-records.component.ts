import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TemperatureReadingsService } from '../temperature-readings.service';
import { AppComponent } from '../app.component';
import * as Chart from 'chart.js'

@Component({
	selector: 'app-view-records',
	templateUrl: './view-records.component.html',
	styleUrls: ['./view-records.component.scss']
})
export class ViewRecordsComponent implements AfterViewInit {
	private device_correct_info;
	private device_info;
	private errorMessageDevice;
	public chart;

	constructor(private temp_reading_service: TemperatureReadingsService,private app_comp : AppComponent) { }
	
	ngOnInit() 
	{

	}
	
	search_device(device_id)
	{
		this.errorMessageDevice="";
		this.device_info = undefined;

		if(device_id!="")		
		{
			this.temp_reading_service.get_device_info(device_id).subscribe((data:any)=>
			{
				if(data.err==undefined)
				{
					if(data.code=="200")
						this.device_info = data.data[0];
				}
				else
				{
					this.errorMessageDevice = data.err;
				}
			})
		}
		else
		{
			this.errorMessageDevice = "Please enter some value";
		}
		return;
	}

	view_recs()
	{
		console.log("in the viewwwww");
		this.app_comp.draw_graph();
	}
	ngAfterViewInit()
  	{
		
	}
}
