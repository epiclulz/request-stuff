// # Test Server
// A simple web server you can run to test making requests. It processes
// GET AND POST requests, returning info about any data you posted in the
// response body. You can use this to test requests to make sure you're
// submitting the correct data

// ## Imports
// We need the `http` library to create the server, and `url`
// has some functions for parsing a query string.
var http = require('http')
  , url = require('url');

// ## Helper Functions
// These functions are used for turning the request data into a
// string that we'll return in the response body.

// Takes the data from a POST request's body and creates a string
// to display its contents. Checks to see if the body contains key/value
// pairs; if not, it's treated as a raw string.
var dumpPostData = function(data) {
  var dataStr = "";
  var pairs = data.split("&");
  if (pairs.length > 1 || /=/.test(data)) {
    dataStr = dumpPairs(pairs);
  } else {
    dataStr = dumpRequestBody(data);
  }
  return dataStr;
};

// Takes a request body that does not contain key/value pairs and returns
// it formatted for the response. Properly handles the case where the body
// was empty.
var dumpRequestBody = function(body) {
  var dataStr = "";
  if (body === null || body === "") {
    dataStr = "<Empty Request Body>";
  } else {
    dataStr = "Contents:\r\n" + body + "\r\n";
  }
  return dataStr;
};

// Takes an array of strings containing a single key/value pair (e.g.,
// "key=value") and returns it formatted for the response.
var dumpPairs = function(pairs) {
  var dataStr = "Key-Value Pairs:\r\n";
  for (var i = 0; i < pairs.length; ++i) {
    dataStr += "  " + pairs[i] + "\r\n";
  }
  return dataStr;
};

// ## Creating the Server
// `http.createServer` needs a function that takes 2 arguments, an object
// containing the request info and an object containing the response info.
// Whenever a request is received, it will call this function and then
// return the response after it's done.
http.createServer(function (req, res) {
  // Handle a GET request
  if (req.method === "GET") {
    // Indicate that the response was a success and that we're going to
    // return some text.
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Your GET was received\r\n');

    // Check for a query string, and if there is one, display its contents
    var query = url.parse(req.url).query;
    if (query === null || query === "") {
      res.end();
    } else {
      res.end(dumpPairs(query.split('&')));
    }
  // Handle a POST request
  } else if (req.method === "POST") {
    // Indicate that the response was a success and that we're going to
    // return some text.
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var postData = "";
    // Read in the data from the request's body. Since IO in node is async,
    // we need to do this with a callback function. The request will trigger
    // a `data` event whenever there is a chunk of data to read, so we'll use
    // a function here that will read each chunk of data and combine them all.
    req.on('data', function(chunk) {
      postData += chunk;
    });

    // When all the data is read, the request will trigger and `end` event. We
    // set up a callback for this event that will take all the data we read and
    // send it back in the response.
    req.on('end', function() {
      res.write("Your POST was received\r\n");
      // Format the data to make it more user-friendly
      res.end(dumpPostData(postData));
    });
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

