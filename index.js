const express = require('express');
const loggernpm = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const app = express();


app.use(express.static('static_resource'))


if (process.env.NODE_ENV !== 'test') 
{      
    //app.use(logger);
    app.use(errormw);
    app.use(loggernpm('dev',  {stream: accessLogStream}));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs');


const user = require('./api/user');
app.use('/users', user);


app.post('/email_post', (req,res)=>{
    //res.send(req.body.email)
    res.render('email.ejs', {'email': req.body.email})
})

function logger(req,res,next){
   // console.log(' log');
    next(new Error('Error'));
};

function errormw(err,req,res,next){
    console.log(err.message);
    next();
};

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

module.exports = app;

//amazon S3 Test
const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
var param = {
    'Bucket':'kimtaehonodejstest1',
    'Key':'logo.png',
    'ACL':'public-read',
    'Body':fs.createReadStream('./static_resource/png/IMGP2141.JPG'),
    'ContentType':'image/png'
}
s3.upload(param, function(err, data){
    console.log(err);
});


s3.listObjects({Bucket: 'kimtaehonodejstest1'}).on('success', function handlePage(response) {
    for(var name in response.data.Contents){
        console.log(response.data.Contents[name]);
    }
    if (response.hasNextPage()) {
        response.nextPage().on('success', handlePage).send();
    }
}).send();
//server.myServer();