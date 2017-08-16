//	Requiring the package express installed from npm
var express = require('express');
//	Requiring the package cors installed from npm
var cors = require('cors');
//	Requiring the package twit installed from npm
var Twit = require('twit');
//	Requiring the config json file
var config = require("./config");
//	Connecting to twitter
var T = new Twit({
	//	Keys are located in config.json file
	consumer_key:         config.TConsumerKey,	
	consumer_secret:      config.TConsumerKeySecret,	
	access_token:         config.TAcessToken,	
	access_token_secret:  config.TAcessTokenSecret,	 
	timeout_ms:           60*1000,	// optional HTTP request timeout to apply to all requests. 
})
//	Requiring the use of a path
var path = require("path");
//	App is express
var app = express();
//	App will be using the package cors
app.use(cors());
//	Setting up the server
app.use(function(request, response, next){
	//	Displaying the request method (GET OR POST) and the URL 
	console.log(`${request.method} request for ${request.url}`);
	next();
});
//	Telling app to use the static files that are located in the public folder
app.use(express.static("./public"));
//	Using NPM to install jQuery
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
//	Using npm to install bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
//	Displaying Searches
app.get("/search=:term", function(request, response){
	//	Term is a request
	var term = request.params.term;
	//	Search terms
	var params = {q:term};
	//	Getting the twitter tweets searched for in the URL
	T.get('search/tweets', params, function(error, tweets, twitterResponse){
		//	If there are no errors display the data
		if (!error){
			//	Display the data as json
			response.json(tweets);
		//	If there is an error display the error inside the terminal
		} else {
			//	Displaying the error inside the terminal
			console.log("Something went wrong");
		}
	});
});
//	Displaying Trends
app.get("/trends", function(request, response){
	//	The id of the trends is located in New Zealand ID from woeid.rosselliot.co.nz
	var params = {id:23424916};
	//	Getting the twitter trends from the place (ID = New Zealand) 
	T.get('trends/place', params, function(error, trends, twitterResponse){
		console.log(trends);
		//	If there are no errors display the data
		if (!error){
			//	Display the data as json
			response.json(trends);
		//	If there is an error display the error inside the terminal
		} else {
			//	Displaying in the terminal if something went wrong
			console.log("Something went wrong");
		}
	});
});
//	Running the server on port 3000
app.listen(3000);
//	Telling the terminal that the server is running on port 3000
console.log("The server is running on port 3000");
