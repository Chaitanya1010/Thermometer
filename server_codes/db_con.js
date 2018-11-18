const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/thermometer', { useNewUrlParser: true }).then((data)=> 
{
    console.log("MongoDB is successfully connected!");
    
}).catch(err=>
{
    console.log("The error in connecting to the mongodb is",err);
})

module.exports = mongoose;