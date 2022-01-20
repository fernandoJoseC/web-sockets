var socket = io.connect('http://localhost:8080', {'forceNew': true});

//evento que emite el servidor
//el cliente lo escucha con on
//cada cliente
socket.on('messages', function(data) {
    console.log(data);
    render(data);
})

// va a llegar un array con varios objetos
function render(data){
    var html = data.map(function(elem, index) {
        return (`<div>
                    <strong>${elem.author}</strong>:
                    <em>${elem.text}</em>
                </div>`);
    }).join(" "); //une los elementos del array por espacio y no por coma

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    //emitir uno nosotros
    //el cliente va a emitir desde un socket el evento new-message
    socket.emit('new-message', payload);
    return false;
}