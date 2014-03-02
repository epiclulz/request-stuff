/*
A simple web server you can run to test making requests. It processes
GET AND POST requests, returning info about any data you posted in the
response body. You can use this to test requests to make sure you're
submitting the correct data
*/

var http = require('http')
  , url = require('url');

// Helper functions for displaying the request data
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

var dumpRequestBody = function(body) {
  var dataStr = "";
  if (body === null || body === "") {
    dataStr = "<Empty Request Body>";
  } else {
    dataStr = "Contents:\r\n" + body + "\r\n";
  }
  return dataStr;
};

var dumpPairs = function(pairs) {
  var dataStr = "Key-Value Pairs:\r\n";
  for (var i = 0; i < pairs.length; ++i) {
    dataStr += "  " + pairs[i] + "\r\n";
  }
  return dataStr;
};

http.createServer(function (req, res) {
  if (req.method === "GET") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Your GET was received\r\n');

    var query = url.parse(req.url).query;
    if (query === null || query === "") {
      res.end();
    } else {
      res.end(dumpPairs(query.split('&')));
    }
  } else if (req.method === "POST") {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var postData = "";
    // Read in the data from the POST body
    req.on('data', function(chunk) {
      postData += chunk;
    });

    // When all the data is read, send the response
    req.on('end', function() {
      res.write("Your POST was received\r\n");
      res.end(dumpPostData(postData));
    });
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

