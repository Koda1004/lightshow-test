$(function(){

	// This demo depends on the canvas element
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}

	// The URL of your web server (the port is set in app.js)
	var url = 'http://secret-lake-5030.herokuapp.com/';

	var doc = $(document),
		win = $(window),
		canvas = $('#paper'),
		ctx = canvas[0].getContext('2d'),
		instructions = $('#instructions');
	
	// Generate an unique ID
	var id = Math.round($.now()*Math.random());
	
	var socket = io.connect(url);

	socket.on('down', function (data) {
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(0,0,10000,10000);
	});


	socket.on('up', function (data) {
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,10000,10000);
	});
	
	canvas.on('mousedown',function(e){
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(0,0,10000,10000);
		e.preventDefault();
		
		socket.emit('mousedown',{});
		lastEmit = $.now();
		instructions.fadeOut();
	});
	
	doc.bind('mouseup mouseleave',function(){
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,10000,10000);

		socket.emit('mouseup',{});
		lastEmit = $.now();
	});

	var lastEmit = $.now();

});