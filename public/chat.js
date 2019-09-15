//make connection with the server. This is on the client side
var socket=io.connect("http://localhost:4000");

//query DOM to get value of variable
var output=document.getElementById('output');
var handle=document.getElementById('handle');
var message=document.getElementById('message');
var send=document.getElementById('send');
var feedback=document.getElementById('feedback');

//Emit Events
send.addEventListener("click",function(){
	socket.emit("chat",{
			handle:handle.value,
			message:message.value
	});
});

message.addEventListener("keypress",function(){
	socket.emit("typing",handle.value);
});


//listen for events
socket.on("chat", function(data){
	feedback.innerHTML="";
	output.innerHTML += "<p><strong>" + data.handle +":</strong> " + data.message +"</p><hr>";
});

socket.on("typing",function(data){
	feedback.innerHTML = "<p><em>" + data + " is typing..." + "</em></p>";
})