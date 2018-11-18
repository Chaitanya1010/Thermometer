import { Component, OnInit } from '@angular/core';
import { TemperatureReadingsService } from '../temperature-readings.service'

@Component({
	selector: 'app-add-device',
	templateUrl: './add-device.component.html',
	styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {

	private errorMessageInsertion;
	private successfulMessageInsertion;
	private successfulMessageInsertion_1;
	private device_id;
	
	constructor(private temp_reading_service: TemperatureReadingsService)
	{
		
	}
	
	ngOnInit() {
	}
	
	add_device(device_id,owner_name)
	{
		this.errorMessageInsertion = undefined;
		this.successfulMessageInsertion_1 = undefined;

		if(device_id!="" || owner_name!="")
		{
			this.temp_reading_service.add_device_info(device_id,owner_name).subscribe((data:any)=>{
				
				if(data.err==undefined)
				{
					if(data.code=="200")
					{
						this.device_id = device_id;
						this.successfulMessageInsertion = "Device info inserted successfully!";
					}
				}
				else
				{
					if(data.code=="101")
						this.errorMessageInsertion = "The device id seems to be present already!";
					
					else
						this.errorMessageInsertion = data.err;
				}
			});
		}
		else
		{
			this.errorMessageInsertion = "Please enter both the owner name and the device id";
		}
	}

	add_records_to_device()
	{
		this.errorMessageInsertion = undefined;
		this.successfulMessageInsertion = undefined;

		this.temp_reading_service.add_data_to_device(this.device_id).subscribe((data:any)=>{
				
			if(data.err==undefined)
			{
				if(data.code=="200")
				{
					this.successfulMessageInsertion_1 = "Temperatures are being added every 5sec";
				}
			}
			else
			{
				this.errorMessageInsertion=data.err;
			}
		});
	}
		
}
