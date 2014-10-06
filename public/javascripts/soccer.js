$(document).ready(function(){
  console.log("document ready.");
  window.io = io.connect();

  io.on('connect', function(){
    console.log('client -> hi');
    io.emit('hi');
  });


  io.on('hi server', function( data){
    console.log('My ID is ->', data.socketId);
  });
  
  $("#fwd").click( function(){
    console.log("forward");
    io.emit('fwd');
  });
  $("#left").click( function(){
    console.log("left");
    io.emit('left');
  });
  $("#stop").click( function(){
    console.log("stop");
    io.emit('stop');
  });
  $("#right").click( function(){
    console.log("right");
    io.emit('right');
  });
  $("#back").click( function(){
    console.log("back");
    io.emit('back');
  });

});