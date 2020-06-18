var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var campaignRoute = require('./routes/campaign')

var {handleError} = require('./helpers/errorHandler')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/campaign',campaignRoute);

app.use((err, req, res, next) => {
    //err.isServer
    let result = handleError(err, res) ;
    result.send(result.body)
    next()
  });

const redis = require("redis");
const client = redis.createClient();
   
client.on("error", function(error) {
    console.error(error);
});
   
client.set("key", "value", redis.print);
client.get("key", redis.print);
  

module.exports = app;
