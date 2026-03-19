const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Alguém conectou');

  socket.on('chat message', (msg) => {
    // Envia a mensagem para todos os conectados
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});