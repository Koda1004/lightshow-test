// Including libraries

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
	
// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
app.listen(8000);
console.log("Listening on 8000");

// If the URL of the socket server is opened in a browser
function handler (request, response) {
	 request.resume();

	request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

// Delete this row if you want to see debug messages
io.set('log level', 1);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

	// Start listening for mouse move events
	socket.on('mousedown', function (data) {
		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('down', data);
	});

	// socket.on('mousedown', function (data) {
		
	// 	// This line sends the event (broadcasts it)
	// 	// to everyone except the originating client.
	// 	socket.broadcast.emit('down', data);
	// 	console.log("down");
	// });

	socket.on('mouseup', function (data) {
		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('up', data);
	});
});