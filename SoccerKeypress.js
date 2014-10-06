var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");
var board = new five.Board({
  io: new Spark({
    token: "YOUR TOKER ID HERE",
    deviceId: "YOUR DEVICE ID HERE"
  })
});


board.on("ready", function() {
  var led = new five.Led("D7");
  led.blink();

  servo1 = new five.Servo({
    pin: 'A0',    
    type: "continuous"
  });

  servo2 = new five.Servo({
    pin: 'A4',    
    type: "continuous"
  });

  board.repl.inject({
    servo1: servo1,
    servo2: servo2
  });


  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.exit(0);
    }

    if ( key ){
      switch ( key.name ){
        case 'up':
          console.log('=> Up:');
          servo1.cw();  
          servo2.ccw();
          break;
        case 'down':          
          console.log('=> Down:');
          servo1.ccw();  
          servo2.cw();
          break;
        case 'left':
          console.log('=> Left:');
          servo1.ccw();  
          servo2.ccw();
          break;
        case 'right':
          console.log('=>right');
          servo1.cw();  
          servo2.cw();          
          break;
        case 's':
          console.log('=> Stoping...');
          servo1.stop();
          servo2.stop();
          break;
        case 'e':
          process.exit(0);
          break;          
      }
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

});
