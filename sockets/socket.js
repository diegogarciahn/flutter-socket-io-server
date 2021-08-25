const { io } = require('../index');

// Mensajes de sockets

io.on('connection', client => {//Client es una computadoras que se acaba de conectar al server
        
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
            console.log('Cliente desconectado');
         }); // Cuando el cliente se desconecte
         
    client.on('mensaje', ( payload )=>{
        console.log('Mensaje: ', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });
  
        });