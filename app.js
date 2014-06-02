
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var sass = require('node-sass');
var twitterAPI = require('node-twitter-api');



var index = require('./routes/index');
var project = require('./routes/project');
// var tweet = require('./routes/tweet');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(
    sass.middleware({
         src: __dirname + '/public', //where the sass files are 
         dest: __dirname + '/public', //where css should go
         debug: true // obvious
    })
);

app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/project/:name', project.viewProject);
// Example route
// app.get('/users', user.list);

// Tweet from my twitter account. This is going to be fun...
// Basically a setup rerouter for tweets




var twitter = new twitterAPI({
    consumerKey: 'QadTMIKyK9k0ByTpIAe4ZWA8L',
    consumerSecret: 'FGFBeJofTjmM36g2WLKOf0ZxnK90sc3f3hhkO6ZrMUH2Tu9bOh',
    // callback: 'http://yoururl.tld/something'

});

var twitter_data = {};
var result_str = "Response: ";

twitter_data.accessToken =  "2529590665-h5UxPLr7UzPvIjHlAwV3rfPpkFeFrGNytWmYz6l";
twitter_data.accessTokenSecret = "Gz8qe5yqSyGc6NvzLBmtYrlO791p75ZN4GzdKIiNrfrq1";

app.get('/tweet', function(req, res){
// app.post('/tweet', function(req, res){
    // res.send('hello world ' + req.query.s);
    // var result_str = "Response: ";
    var tweet_str = req.query.s;
    var response_str = result_str;


    twitter.statuses("update", {
            status: tweet_str
        },
        twitter_data.accessToken,
        twitter_data.accessTokenSecret,
        function(error, data, response){
            if (error){
                response_str += " update error "
            } else {
                
            }
        }
    );

    res.send(result_str);
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
