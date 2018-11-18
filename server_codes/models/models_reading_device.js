const mongoose = require('mongoose');

var ReadingSchema = new mongoose.Schema({
    device_id: String,
    temperature : Number,
    created_at : { type: Date, default: Date.now }
});

var Reading_collection = mongoose.model('Reading_collection',ReadingSchema)


var DeviceSchema = new mongoose.Schema({
    actual_device_id: String,
    user_name : String,
    device_bought_at : { type: Date, default: Date.now }
});

var Device_collection = mongoose.model('Device_collection',DeviceSchema)

module.exports.Reading_collection = Reading_collection;
module.exports.Device_collection = Device_collection;