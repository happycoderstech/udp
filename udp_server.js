var udp = require('dgram');

// --------------------creating a udp server --------------------
//8200
//first 4, sec 4, then data
// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  console.log('Data received from sensor : ' + msg[0]);
  console.log('Data received from frame : ' + msg[4]);
  console.log('Received %d bytes from %s:%d\n%s',msg.length, info.address, info.port,msg);

//sending msg
server.send(msg,9999,'127.0.0.1',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }

});

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(15000); // change port based on your need // client should be connected to this port

setTimeout(function(){
server.close();
},8000);

