// var app = require('http').createServer(handler)
// var io = require('socket.io')(app); 
// var fs = require('fs');
// app.listen(80);
// function handler (req, res) {  fs.readFile(__dirname + '/index.html',  function (err, data) {    if (err) {      res.writeHead(500);      return res.end('Error loading index.html');    }
//     res.writeHead(200);    res.end(data);  }); }
// io.on('connection', function (socket) {  socket.emit('news', { hello: 'world' });  socket.on('my other event', function (data) {    console.log(data);  }); });       
var express=require("express");
var socket=require("socket.io");

//App setup
var app=express();
var server = (app.listen(4000,function(){
	console.log("Listening for request on port 4000");
})); 

//App to use the public folder    
app.use(express.static('public'));

//socket io set up  
var io = socket(server) ;

io.on("connection", function(socket){
	console.log("connected to socket",socket.id);

	socket.on("chat",function(data){
		io.sockets.emit('chat',data);
	});

	socket.on("typing",function(data){
		socket.broadcast.emit("typing",data);
	});
});                                                          