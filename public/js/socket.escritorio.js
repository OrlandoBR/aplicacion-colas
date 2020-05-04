var socket = io();


//Obtener parametros por URL
var searchParams = new URLSearchParams(window.location.search);

//se verifica si en la url viene la variable escritorio
console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp.numeroticket);
            alert(resp);
            label.text(resp.numeroticket);
            return;
        }

        label.text('Ticket ' + resp.numeroticket);
    })
})