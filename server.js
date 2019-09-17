const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user.route');

mongoose.connect('mongodb://localhost/jwtauth');


const PORT = 3012;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(httpRequest, httpResponse, next){
   httpResponse.write("Hello");
   next();
});

app.get("/", function(httpRequest, httpResponse, next){
   httpResponse.write(" Word !!!");
   httpResponse.end();
});

app.get('/checking', function(req, res){
    res.json({
       "Tutorial": "Welcome to the Node express JWT Tutorial"
    });
 });

 app.use('/user',user)

 app.listen(PORT, function(){
    console.log('Server is running on Port',PORT);
 });