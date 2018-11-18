import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemperatureReadingsService } from '../temperature-readings.service';
import * as Chart from 'chart.js'
import {Router} from "@angular/router";

@Component({
	selector: 'app-chart-for-records',
	templateUrl: './chart-for-records.component.html',
	styleUrls: ['./chart-for-records.component.scss']
})
export class ChartForRecordsComponent implements AfterViewInit 
{
	private chart;
	private device_id;
	private time_given;
	private obj;
	private title;
	
	@ViewChild('myCanvas') myCanvas: ElementRef;
	public context: CanvasRenderingContext2D;
	
	constructor(private activatedRoute: ActivatedRoute,private temp_reading_service: TemperatureReadingsService, private router:Router) { }

	load_hour_info()
	{
		this.router.navigate(['/draw_chart/'+this.device_id+'/hour']);
		location.reload();
	}

	load_day_info()
	{
		this.router.navigate(['/draw_chart/'+this.device_id+'/day']);
		location.reload();
	}

	load_month_info()
	{
		this.router.navigate(['/draw_chart/'+this.device_id+'/month']);
		location.reload();
	}
	ngOnInit() 
	{
		this.device_id = this.activatedRoute.snapshot.paramMap.get('id');
		this.time_given = this.activatedRoute.snapshot.paramMap.get('time');
		this.title = "Last one "+this.time_given+" records";
		console.log("the data is",this.device_id,this.time_given);
	}
	
	ngAfterViewInit(): void 
	{
		this.view_records_func();
		setInterval(()=>{this.view_records_func()},10*60*1000);
	}

	view_records_func()
	{
		this.temp_reading_service.past_date_records(this.device_id,this.time_given).subscribe((data:any)=>
		{
			let obj = {};
			let dates_arr = [];
			let temp_arr = [];
			data = data.data;
			for(let i=0;i<data.length;i++)
			{
				let temp_date = new Date(data[i]._id);
				let str;
				if(this.time_given == 'hour')
				{
					str = temp_date.getHours()+":"+temp_date.getMinutes();
					dates_arr.push(str);
				}
				else if(this.time_given == 'day')
				{
					str = temp_date.getHours()+":"+temp_date.getMinutes();
					dates_arr.push(str);
				}
				else if(this.time_given == 'month')
				{
					str = temp_date.getDate()+"-"+temp_date.getMonth();
					dates_arr.push(str);
				}

				temp_arr.push(data[i].count);
			}
			obj['dates_arr'] = dates_arr;
			obj['temp_arr'] = temp_arr;
			
			console.log("the output is",obj);

			let label;

			if(this.time_given=='month')
			{
				label = "Average temperature for last 1 day"
			}
			else if(this.time_given=='hour')
			{
				label = "Average temperature for last 10 mins"
			}
			else if(this.time_given=='day')
			{
				label = "Average temperature for last 30 mins"
			}
			this.chart = new Chart('canvas', {
				type: 'line',
				data: {
					labels: obj['dates_arr'],
					datasets: [
						{ 
							label: label,
							data: obj['temp_arr'],
							borderWidth: 2,
							backgroundColor: "rgba(75,192,192,0.4)",
            				borderColor:"rgba(75,192,192,1)",
           					pointBackgroundColor: "pink",
            				pointBorderColor:"rgba(75,192,192,1)",
            				pointRadius:3,
            				pointHitRadius:10
						}
					]
				},
				options: 
				{
					layout: {
						padding: {
							left: 150,
							right: 150,
							top:0,
							bottom: 0
						}
					},
					legend: {
						display: false
					},
					scales: {
						xAxes: [{
							display: true
						}],
						yAxes: [{
							display: true
						}],
					}
				}
			});
		});
	}
	
}
