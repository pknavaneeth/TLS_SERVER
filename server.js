'use strict';
var tls = require('tls');
var fs = require('fs');

const PORT = process.env.PORT || 1337;
// const PORT =  1337;
// const HOST = '127.0.0.1'

// console.log(process.cwd()+"\\key.pem")
var options = {
    key: fs.readFileSync(process.cwd()+"\\resource\\key.pem"),
    cert: fs.readFileSync(process.cwd()+"\\resource\\certificate.pem"),
};

var server = tls.createServer(options, function(socket) {

    // Send a friendly message
    // socket.write("I am the server sending you a message.");

    // Print the data that we received
    socket.on('data', function(data) {

        console.log('Received: %s [it is %d bytes long]',
            data.toString().replace(/(\n)/gm,""),
            data.length);
        socket.write("Query request '"+data+"' has been registered.")
    });

    // Let us know when the transmission is over
    socket.on('end', function() {

        console.log('EOT (End Of Transmission)');

    });

});

// Start listening on a specific port and address
server.listen(PORT,function() {

    console.log("I'm listening on port %s", PORT);

});

// When an error occurs, show it.
server.on('error', function(error) {

    console.error(error);

    // Close the connection after the error occurred.
    server.destroy();

});