//# Client Examples
//
//Examples of using the http library to make web requests

// ## Imports
// We need the `http` library to make the requests, and `querystring`
// provides some functions to help with creating queries. Both of
// these are port of node's standard library.
var http = require('http')
  , qs = require('querystring');

// Sugar provides some functions that make working with objects a
// bit simpler. We use these methods mostly for modifying `opts`
// to use with the different requests.`
require('sugar');
Object.extend();

// ## Response Handlers
// Since everything in node.js is async, we'll need to provide some
// callback functions for the http requests.

// ### Error Handler
// Logs an error in the request to the console
var errorHandler = function(error) {
  console.log('ERROR: ' + error.message);
};

// ### Response Handler
// This function will get called with the server's response as the argument,
// and will log it to the console, displaying the status, headers, and body
var responseHandler = function(res) {
  // Log some info about the response
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  console.log('BODY: ');

  // Make sure we use the right encoding to read the data from the response
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    // Log the response body
    console.log(chunk);
  });
};

// ## Making HTTP requests
// Creating a request is fairly simple. We just need to use the `http.request`
// function, which needs 2 arguments, the options for the request, like the host
// and method, and then a callback function to use when the request completes.
//
// After we create the request, we want to add a callback that will be used in
// case there is an error during the request.
//
// When everything is set up how we want, we just need to call the `end` method
// on the request, which will tell node to make the request and process it with
// our callbacks.

// ### Request Options
// These options configure the request to point to our [test server](server.html).
var opts = {
  hostname: '127.0.0.1',
  port: 1337,
  method: 'GET'
};

// ### GET request
var getReq = http.request(opts, responseHandler);
getReq.on('error', errorHandler);
getReq.end();

// ### GET Request with query string
var query = {name: 'value'};
var getWithQuery = http.request(
  opts.clone().merge({path: '/?' + qs.stringify(query)}),
  responseHandler
);
getWithQuery.on('error', errorHandler);
getWithQuery.end();

// ### POST with request body
var postReq = http.request(opts.clone().merge({method: 'POST'}), responseHandler);
postReq.on('error', errorHandler);
postReq.write(qs.stringify(query));
postReq.end();

