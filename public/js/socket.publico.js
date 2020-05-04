var socket = io();
var lblTiket1 = $('#lblTicket1');
var lblTiket2 = $('#lblTicket2');
var lblTiket3 = $('#lblTicket3');
var lblTiket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var tickets = [lblTiket1, lblTiket2, lblTiket3, lblTiket4];
var escritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimos4);
})

socket.on('ultimos4', function(data) {
    // console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
})

function actualizaHTML(ultimos4) {

    for (x = 0; x <= ultimos4.length - 1; x++) {

        tickets[x].text('Ticket ' + ultimos4[x].numeroticket);
        escritorios[x].text('Ticket ' + ultimos4[x].escritorioatiende);

    }
}