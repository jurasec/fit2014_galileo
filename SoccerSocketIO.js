var express = require('express.io');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var five = require("johnny-five");
var Spark = require("spark-io");

var board = new five.Board({
  io: new Spark({
    token: "7550da40ccf9ac697211eb17c031bbe7ac16a20a",
    deviceId: "53ff72066667574837422067"
  })
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.io.route('left', function(){
    console.log('izquierda!');
    servo1.cw();  
    servo2.ccw(); 
});

app.io.on('connection', function (socket){
    console.log('client: ',socket.id);
});


app.io.route('hi', function(req){
        console.log('cliente dice hola!');
        app.io.broadcast('hi server', {socketId: req.socket.id});
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

    app.io.route('fwd', function( req ){    
        servo1.cw();  
        servo2.ccw(); 
    });
    app.io.route('left', function( req ){    
        servo1.ccw();  
        servo2.ccw();
    });
    app.io.route('stop', function( req ){    
        servo1.stop();  
        servo2.stop();
    });
    app.io.route('right', function( req ){    
        servo1.cw();  
        servo2.cw();
    });
    app.io.route('back', function( req ){    
        servo1.ccw();  
        servo2.cw(); 
    });
});

app.listen(3000, function(){
    console.log("Servidor Express.io listo.");
});
