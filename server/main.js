var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//esto no es escalable al momento de produccion
var messages = [{
    
    id: 1,
    text: "hola soy un mensaje",
    author: "fernando calderon"
    
}];

app.use(express.static('public'));

app.get('/', function(req,res){
    res.status(200).send("hola world");
});

//cuando reciba el mensaje connection
io.on('connection', function(socket) {
    console.log('alguien se ha conectado con sockets');
    socket.emit('messages', messages);

    //escuchar el evento new-message
    socket.on('new-message', function(data) {
        messages.push(data);

        //sockets porque no es uno a uno sino se envia a todos
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080")
});