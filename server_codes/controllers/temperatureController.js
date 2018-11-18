const express = require('express');
var router = express.Router();

var { Reading_collection, Device_collection } = require('../models/models_reading_device');


function check_if_device_exists(req,res,next)
{
    if(req.body.device_id!=null && req.body.device_id!="")
    {
        Device_collection.find({actual_device_id:req.body.device_id})
        .then((doc)=>
        {
            console.log("the device exists fun value is",doc);
            if(doc.length!=0)
            {
                next();
            }
            else
            {
                res.json({status:"failure",code:106,err:"Unable to find any device with the given id"});
                return;
            }
        })
        .catch((err)=>{})
    }
    else
    {
        console.log("improper request");
        res.json({status:"failure",code:105,err:"The request seems to be improper"});
        return;
    }
}

router.get('/get_device',(req,res)=>
{
    console.log(req.query.device_id);
    if(req.query.device_id!=null && req.query.device_id!="")
    {
        Device_collection.find({actual_device_id:req.query.device_id})
        .then((doc)=>
        {
            console.log("the device exists fun value is",doc);
            if(doc.length!=0)
            {
                res.json({status:"success",code:200,data:doc});
            }
            else
            {
                res.json({status:"failure",code:106,err:"Unable to find any device with the given id"});
                return;
            }
        })
        .catch((err)=>{})
    }
    else
    {
        console.log("improper request");
        res.json({status:"failure",code:105,err:"The request seems to be improper"});
        return;
    }
});

router.post('/add_device',(req,res)=>
{
    if((req.body.device_id!=null && req.body.device_id!="")&&(req.body.user_name!=null && req.body.user_name!=""))
    {
        console.log(req.body.device_id,"is the device_id");
        
        Device_collection.countDocuments({ actual_device_id: req.body.device_id }, function (err, doc_count) 
        {
            if(err)
            {
                res.json({status:"failure",code:100,err:"Unable to fetch the data, please try again later #002"});
                return;
            }
            else
            {        
                console.log("the count is",doc_count);
                if(doc_count==0)
                {
                    let device = new Device_collection(
                        {
                            actual_device_id : req.body.device_id,
                            user_name : req.body.user_name
                        }
                    )
                    
                    device.save((err,doc) => {
                        if(err)
                        {
                            console.log("the error in insertion is",err);
                            res.json({status:"failure",code:102,err:"There is an issue in the insertion #001"});
                        }
                        else
                        {
                            res.json({status:"success",code:200,data:"the insertion is successfull"});
                        }
                    });    
                }
                else
                {
                    res.json({status:"failure",code:101,err:"The given device already exists, please try inserting an other device"});
                    return;
                }
            }
        });
        
    }
    else
    {
        console.log("improper request",req.body.device_id,req.body.user_name);
        res.json({status:"failure",code:105,err:"The request seems to be improper"});
        return;
    }
    
});

router.post('/fetch_data_hour',check_if_device_exists,async (req,res)=>
{
    let time = req.body.time_to_search !=null ? req.body.time_to_search : 'hour';
    let x = new Date();
    let past_time_first_limit,past_time_second_limit;

    var arr= [];
    let obj = {};

    for(i=0;i<60;i+=10)
    {
        if(i==0)
        {
            x.setMinutes(x.getMinutes()-60);
            past_time_first_limit = x.toISOString();

            obj["_id"] = past_time_first_limit;
            obj["count"] = 0;
            arr.push(obj);
            
            x.setMinutes(x.getMinutes()+10);
            past_time_second_limit = x.toISOString();
        }
        else
        {
            past_time_first_limit = past_time_second_limit;
            let temp = new Date(past_time_second_limit);
            temp.setMinutes(temp.getMinutes()+10);
            past_time_second_limit = temp.toISOString();
        }
        
        console.log("the timings are", past_time_first_limit,past_time_second_limit,typeof(past_time_first_limit));

        let doc_array;
        try
        {
            doc_array = await Reading_collection.aggregate(
            [
                { 
                    $match: 
                    { 
                        $and:  
                        [{    
                            created_at: { 
                                $gte: new Date(past_time_first_limit), 
                                $lt: new Date(past_time_second_limit)
                            }
                        },
                        {
                            device_id: {
                                $eq : req.body.device_id
                            }
                        }]
                    }
                },
                {
                    $group: 
                        {
                            _id : past_time_second_limit,
                            count:{$avg: "$temperature"}
                        }
                }
            ]);
        }
        catch(err)
        {
            res.json({status:"failure",code:104,err:"There is an issue in fetching"});
            return;
        }
        console.log("the details are",doc_array);

        if(doc_array.length>0)
            arr.push(doc_array[0]);
        else
        {
            obj = {};
            obj["_id"] = past_time_second_limit;
            obj["count"] = 0;

            arr.push(obj);
        }
    }
    console.log("the final array is",arr);
    res.json({status:"success",code:200,data:arr});  
})


router.post('/fetch_data_day',check_if_device_exists,async (req,res)=>
{
 
    let time = req.body.time_to_search !=null ? req.body.time_to_search : 'hour';
    let x = new Date();
    let past_time_first_limit,past_time_second_limit;

    var arr= [];
    let obj = {};

    for(i=0;i<1440;i+=30)
    {
        if(i==0)
        {
            x.setHours(x.getHours()-24);
            past_time_first_limit = x.toISOString();

            obj["_id"] = past_time_first_limit;
            obj["count"] = 0;
            arr.push(obj);
            
            x.setMinutes(x.getMinutes()+30);
            past_time_second_limit = x.toISOString();
        }
        else
        {
            past_time_first_limit = past_time_second_limit;
            let temp = new Date(past_time_second_limit);
            temp.setMinutes(temp.getMinutes()+30);
            past_time_second_limit = temp.toISOString();
        }
        
        console.log("the timings are", past_time_first_limit,past_time_second_limit,typeof(past_time_first_limit));

        let doc_array;
        try
        {
            doc_array = await Reading_collection.aggregate(
            [
                { 
                    $match: 
                    { 
                        $and:  
                        [{    
                            created_at: { 
                                $gte: new Date(past_time_first_limit), 
                                $lt: new Date(past_time_second_limit)
                            }
                        },
                        {
                            device_id: {
                                $eq : req.body.device_id
                            }
                        }]
                    }
                },
                {
                    $group: 
                        {
                            _id : past_time_second_limit,
                            count:{$avg: "$temperature"}
                        }
                }
            ]);
        }
        catch(err)
        {
            res.json({status:"failure",code:104,err:"There is an issue in fetching"});
            return;
        }
        console.log("the details are",doc_array);

        if(doc_array.length>0)
            arr.push(doc_array[0]);
        else
        {
            obj = {};
            obj["_id"] = past_time_second_limit;
            obj["count"] = 0;

            arr.push(obj);
        }
    }
    console.log("the final array is",arr);
    res.json({status:"success",code:200,data:arr});

})

router.post('/fetch_data_month', check_if_device_exists, async (req,res)=>
{
    let time = req.body.time_to_search !=null ? req.body.time_to_search : 'hour';
    let x = new Date();
    let past_time_first_limit,past_time_second_limit;

    var arr= [];

    let obj = {};

    for(i=0;i<30;i++)
    {
        if(i==0)
        {
            x.setDate(x.getDate()-30);
            past_time_first_limit = x.toISOString();

            obj["_id"] = past_time_first_limit;
            obj["count"] = 0;
            arr.push(obj);
            
            x.setDate(x.getDate()+1);
            past_time_second_limit = x.toISOString();
        }
        else
        {
            past_time_first_limit = past_time_second_limit;
            let temp = new Date(past_time_second_limit);
            temp.setDate(temp.getDate()+1);
            past_time_second_limit = temp.toISOString();
        }
        
        let doc_array;
        try
        {
            doc_array = await Reading_collection.aggregate(
            [
                { 
                    $match: 
                    { 
                        $and:  
                        [{    
                            created_at: { 
                                $gte: new Date(past_time_first_limit), 
                                $lt: new Date(past_time_second_limit)
                            }
                        },
                        {
                            device_id: {
                                $eq : req.body.device_id
                            }
                        }]
                    }
                },
                {
                    $group: 
                        {
                            _id : past_time_second_limit,
                            count:{$avg: "$temperature"}
                        }
                }
            ]);
        }
        catch(err)
        {
            res.json({status:"failure",code:104,err:"There is an issue in fetching"});
            return;
        }


        if(doc_array.length>0)
            arr.push(doc_array[0]);
        else
        {
            obj = {};
            obj["_id"] = past_time_second_limit;
            obj["count"] = 0;

            arr.push(obj);
        }
    }
    console.log("the final array is",arr);
    res.json({status:"success",code:200,data:arr});
})
    
router.post('/add_temparatures',(req,res)=>
{
    if(req.body.device_id!=null && req.body.device_id!="")
    {
        console.log(req.body.device_id,"is the device_id");

        if(add_temp_records(req.body.device_id))
        {
            res.json({status:"failure",code:102,err:"There is an issue in the insertion #002"});
        }
        else
        {
            res.json({status:"success",code:200,data:"the insertion is successfull"});

            setInterval(()=>{
                let temp = Math.floor(Math.random() * 100) + 1;  
                let device = new Reading_collection(
                    {
                        device_id : req.body.device_id,
                        temperature : temp
                    }
                )
                device.save((err,doc) => {
                    if(err)
                    {
                        console.log("the error in insertion is",err);
                        return 1;
                    }
                    else
                    {
                        console.log("inserted",doc)
                        return 0;
                    }
                });
            },5000);
        }
    }
    else
    {
        console.log("improper request");
        res.json({status:"failure",code:103,err:"The request seems to be improper"});
        return;
    }
    
});

function add_temp_records(device_id)
{
    let temp = Math.floor(Math.random() * 100) + 1;  
    let device = new Reading_collection(
        {
            device_id : device_id,
            temperature : temp
        }
    )
    device.save((err,doc) => {
        if(err)
        {
            console.log("the error in insertion is",err);
            return 1;
        }
        else
        {
            console.log("inserted",doc)
            return 0;
        }
    });
}

router.post('/*',(req,res)=>
{
    res.json({status:"failure",code:105,err:"The request seems to be improper"});
});

router.get('/*',(req,res)=>
{
    res.json({status:"failure",code:105,err:"The request seems to be improper"});
});

module.exports = router;