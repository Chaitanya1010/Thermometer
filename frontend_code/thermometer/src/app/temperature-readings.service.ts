import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TemperatureReadingsService {

	constructor(private _http: HttpClient) { }

	add_new_device(device_id,name)
	{
		return this._http.post('http://localhost:3000/therometer_apis/add_device',{
			device_id:device_id,
			user_name:name
		});
	}

	past_date_records(device_id,time_period)
	{
		if(time_period == 'hour')
		{
			return this._http.post('http://localhost:3000/therometer_apis/fetch_data_hour',{
				device_id:device_id
			});
		}
		else if(time_period == 'day')
		{
			return this._http.post('http://localhost:3000/therometer_apis/fetch_data_day',{
			device_id:device_id
			});
		}
		else if(time_period == 'month')
		{
			return this._http.post('http://localhost:3000/therometer_apis/fetch_data_month',{
			device_id:device_id
			});
		}
	}

	
	get_device_info(device_id)
	{
		return this._http.get('http://localhost:3000/therometer_apis/get_device',{params:{device_id:device_id}
		});
	}
	
	add_device_info(device_id,user_name)
	{
		return this._http.post('http://localhost:3000/therometer_apis/add_device',{
				device_id:device_id,
				user_name:user_name
			});
	}

	add_data_to_device(device_id)
	{
		return this._http.post('http://localhost:3000/therometer_apis/add_temparatures',{
				device_id:device_id
			});
	}
}
