const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db_con.js');
const temperatureController = require('./controllers/temperatureController.js');

var app = express();
app.use(bodyParser.json());

app.use(cors())

app.use('/therometer_apis',temperatureController);


app.get('/*',(req,res)=>
{
    res.json({status:"failure",code:105,err:"The request seems to be improper"});
});

app.post('/*',(req,res)=>
{
    res.json({status:"failure",code:105,err:"The request seems to be improper"});
});

app.listen(3000, ()=>
{
    console.log("The server is running on port",3000);
})