const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//set the app
const app = express();

//set up mongodb
mongoose.connect(process.env.Connection_Url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, res){
    if(err)
        console.log(err);
    else
        console.log("Mongodb connected...");
});

//set body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use('/persons', require('./Api/routes/person'));

let port = process.env.PORT;
if(port == "" || port==null)
{
  port=5000;
}

app.listen(5000, function(req, res){
    console.log("server started at 5000");
});