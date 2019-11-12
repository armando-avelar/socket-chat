var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados',resp);
    });
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});

// socket.emit('crearMensaje', function(mensaje){
//     console.log('Servidor', mensaje)
// });

socket.on('crearMensaje', function(mensaje){
    console.log('Servidor', mensaje)
});

//Cuando Un usuario entra y sali
socket.on('listaPersona', function(personas){
    console.log("lista", personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje Privado', mensaje);
})