const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(express.static('dist'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', (socket) => {
  console.log("Server is working");
  socket.on('address', (adr) => {
    io.emit('address', adr);
  });
  socket.on('coordinates', (coords) => {
    io.emit('coordinates', coords);
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
}); 