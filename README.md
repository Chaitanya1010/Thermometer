# Thermometer

* **Project outline**
* **Technologies used**
* **Installation process**
* **Database design**
* **End points**
* **Points assumed**

**Project outline**:\
   This is a MEAN stack application to view the records added in a chart for a given device for the give time(hour/day/month), and to add a new device information. This project is a dashboard for a thermometer and has features like adding device, adding records from the device, viewing records according to last 1 hour/day/month on a graph in real-time.

**Technologies used**:\
   This project was developed in MEAN stack and Chart.js is used for drawing graphs.

**Installation process**:\
   There are two folders frontend_code(which has the angular codes) and server_codes(which has the express code). 
There is a package.json in each of the folders. After cloning the repo, run `npm install` by navigating to both of the folders through terminal.\
`cd \to_the_destination\frontend_codes\thermometer && npm i`\
`cd \to_the_destination\server_codes && npm i`\
To start the node server, run `nodemon index.js` in the server_codes directory.\
To start the Angular process, run `ng serve -o` in the thermometer directory.

**Database design**:\
  You can configure the connection to mongoDB from the file db_con.js and add a database in your mongoDB with name 'thermometer'.\
The mongo DB has two collections: `reading_collections`, `device_collections`\
*reading_collections*: stores the readings of individual thermometer for the given time.\
Has attributes `device_id`(the device this temperature belongs to),`temperature`(the temperature stored for the given device at a given time),`created_at`(the time when the temperature is added in the database)\
*device_collections*: stores the records of individual thermometer device.\
Has attributes `actual_device_id`(the device id that is added by user),`user_name`(the name of the owner the device belongs to),`device_bought_at`(the time when the device is added into the database)

**End points**:\
There are total 6 end-points in Express.\
`/thermometer_apis` is the prefix for all the below requests.\
`/get_device` : to search device with the given ID.\
`/add_device` : to add device the given ID.\
`/fetch_data_hour` : to fetch data the past 1 hour for the given device.\
`/fetch_data_day` : to fetch data the past 1 day for the given device.\
`/fetch_data_month` : to fetch data the past 1 month for the given device.\
`/add_temperatures` : to add random temperatures for a given device every 5 seconds

**Points assumed**:

* When a device is being inserted we would check if its ID exists and if it does then the device won't be added again and only if the ID seems new we shall add the device. 
* When the end point for adding temperatures is used, for every 5 seconds a random temperature is added to the mongoDB. This works in the background as long as the node process background, a simple restart of node process would stop the insertion.
* Since for every 5 seconds a new record has been added into mongoDB, I thought it would be better to aggregate the temperatures and display them in a chart. 
  * For month based records, day-based aggregation happens.
  * For day based records, 30-mins aggregation happens.
  * For hour based records, 10-mins aggregation happens.
* CORS is by default enable for all routes and one can configure it using the middleware of CORS.
* A middleware is added to check if the device exists or not for many of the routes.
* The graph reloads every 10mins as it is the min average for which we shall be taking the times
