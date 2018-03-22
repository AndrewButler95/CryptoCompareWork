 
 $(function(){

var socket = io.connect('https://9fba0082e63d4630aaa54338df094fc2.vfs.cloud9.eu-west-1.amazonaws.com/?_c9_id=livepreview0&_c9_host=https://eu-west-1.console.aws.amazon.com');

//buttons and inputs
 	var message = $("#message")
 	var username = $("#username")
 	var send_message = $("#send_message")
 	var send_username = $("#send_username")
 	var chatroom = $("#chatroom")
 	var feedback = $("#feedback")
 	
 	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
	    console.log(data);
	    feedback.html('');
        message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
})

     send_username.click(function(){
         console.log(username.val())
 		socket.emit('change_username', {username : username.val()})
 	})
 	
 	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
})
	 console.log("connected")
 });

