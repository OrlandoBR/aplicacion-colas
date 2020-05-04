const fs = require('fs');

//Se crea ésta clase para llevar el control de los tickets pendientes
class Ticket {
    constructor(numeroticket, escritorioatiende) {
        this.numeroticket = numeroticket;
        this.escritorioatiende = escritorioatiende;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json')

        //Cada que inicie el dia se reinicia el proceso
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciaConteo();
        }

        console.log(data);
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numeroticket;
        //Quita el primer elemento de un arreglos
        this.tickets.shift();
        //Se crea tiket que se va a atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //Lo agrega al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            //borra el ultimo elemento
            this.ultimos4.splice(-1, 1);
        }

        console.log(this.tickets);
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciaConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        //Tengo que mandar como string para guardar
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }

} //FIN DE LA CLASE



module.exports = {
    TicketControl
}