# Making Web Requests in Node.js

## Installation

The first thing you need to do is install [node.js](http://www.nodejs.org). It's probably simpler to do on windows because
they provide an installer; on Linux you'll need to compile it yourself.

After that, install the [Github app](https://github-windows.s3.amazonaws.com/GitHubSetup.exe). It looks like you'll
probably need to create a Github account to use the app because I can't find anyway to download a repository that isn't
associated with your account. You should be able to use the Git shell that the app installs though. After you make an
account, I'll add you to the organization, but for now just open the shell and then use the command `cd` to change into
your Documents folder and run the command `git clone https://github.com/epiclulz/request-stuff.git`. That should create
a folder called request-stuff and download the code into it. After that, just run `cd request-stuff` and then the command
`npm install`, which will download a Javascript library I used in the code.

When that's done, run `npm install docco` and then `docco server.js client.js`. This will create some documentation out
of the comments in the Javascript code and put them in the `docs` folder. Now just open up your Documents folder and click
through until you get to the request-stuff/docs folder and open up `server.html` and `client.html` in your browser.

## Running the Code

The server and client can be run from the `request-stuff` folder in the Git Shell.

* To run the server: `node server.js`
* To run the client: `node client.js`
