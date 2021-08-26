const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Héroes del  Silencio') );
bands.addBand( new Band('Metallica') );

// Mensajes de sockets

io.on('connection', client => {//Client es una computadoras que se acaba de conectar al server
        
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
            console.log('Cliente desconectado');
         }); // Cuando el cliente se desconecte
         
    client.on('mensaje', ( payload )=>{
        console.log('Mensaje: ', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('emitir-mensaje', ( payload ) => {
        // io.emit('nuevo-mensaje', payload); // Esto emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //Lo emite a todos menos al que lo emitió
        console.log(payload);
    })

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {

        bands.addBand( new Band(payload.name) );
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {

        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());

    });
  
        });