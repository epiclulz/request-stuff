var http = require('http')
  , qs = require('querystring');

// Sugar provides some function that make changing the opts a bit
// simpler
require('sugar');
Object.extend();

// Logs an error in the request to the console
var errorHandler = function(error) {
  console.log('ERROR: ' + error.message);
};

// Logs the response to the console, displaying the status, headers,
// and body
var responseHandler = function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  console.log('BODY: ');
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log(chunk);
  });
};

// This is the data that node needs to make the request
var opts = {
  hostname: '127.0.0.1',
  port: 1337,
  method: 'GET'
};

// *** GET requests ***

// Make a GET request
var getReq = http.request(opts, responseHandler);
getReq.on('error', errorHandler);
getReq.end();

// Make a GET request with a query string
var query = {name: 'value'};
var getWithQuery = http.request(
  opts.clone().merge({path: '/?' + qs.stringify(query)}),
  responseHandler
);
getWithQuery.on('error', errorHandler);
getWithQuery.end();

// *** POST requests ***

// Make a POST request
var postReq = http.request(opts.clone().merge({method: 'POST'}), responseHandler);
postReq.on('error', errorHandler);
postReq.write("name=value");
postReq.end();

