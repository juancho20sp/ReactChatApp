const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);

const socketIo = require('socket.io');

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    let name;

    socket.on('conectado', (data) => {
        name = data;
        console.log("user connected:", data);

        // Decir que se conectó una persona
        // io.emit('mensajes', {
        //     name,
        //     message: `${name} ha entrado al chat`
        // })

        // Decir que se conectó una persona sin notificar a quien se conectó
        socket.broadcast.emit('mensajes', {
            name,
            message: `${name} ha entrado al chat`
        });
    });

    socket.on('mensaje', (name, message) => {
        io.emit('mensajes', {
            name,
            message
        });
    })

    socket.on('disconnect', () => {
        io.emit('mensajes', {
            name: 'Server',
            message: `${name} ha abandonado la sala`
        })
    })
});

server.listen(3000, () => console.log(`Server running on port: ${3000}`))