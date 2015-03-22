// Function to send a message to the Pebble using AppMessage API
function sendMessage() {
	Pebble.sendAppMessage({"status": 0});
	
	// PRO TIP: If you are sending more than one message, or a complex set of messages, 
	// it is important that you setup an ackHandler and a nackHandler and call 
	// Pebble.sendAppMessage({ /* Message here */ }, ackHandler, nackHandler), which 
	// will designate the ackHandler and nackHandler that will be called upon the Pebble 
	// ack-ing or nack-ing the message you just sent. The specified nackHandler will 
	// also be called if your message send attempt times out.
}


// Called when JS is ready
Pebble.addEventListener("ready",
      function(e) {
        Pebble.sendAppMessage({"status": 1, "message":"No results yet."});
        
       // Construct URL
       // var url = 'https://goals.app.delaporte.us/api/next';
      var url = 'https://mygoal.space/api/next';
      // var url = 'https://mygoal.space';
      // var url = 'https://www.cacert.org/index.php?id=1';
      // var url = 'https://google.com';
        
        
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange=function()
  {
       console.log("Status code returned: " + xmlhttp.status);
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      console.log("Got something: " + xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send(); 
        
      var xhrRequest = function (url, type, callback) {
        console.log("Calling API URL: " + url);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          callback(this.responseText);
        };
        console.log("About to open url: " + url);
        xhr.open(type, url);
        console.log("About to send...");
        xhr.send();
        console.log("Finished send ...");
        };
        
        // Send request
      xhrRequest(url, 'GET', 
      function(responseText) {
        console.log("API raw result: " + responseText);
        var json_txt = JSON.parse(responseText);
        Pebble.sendAppMessage({"status": 1, "message":"Got something..."});
        console.log("API result: " + json_txt);
    }      
  ); 
        
});
												
// Called when incoming message from the Pebble is received
Pebble.addEventListener("appmessage",
							function(e) {
								console.log("Received Status: " + e.payload.status);
								sendMessage();
							});

Pebble.addEventListener("showConfiguration", function() {
  // var url = ' https://goals.app.delaporte.us/';
  var url = 'https://mygoal.space';
  console.log("showing configuration at " + url);
  Pebble.openURL(url);
});