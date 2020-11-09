var app = require('express')();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('test', (got) => {
    socket.emit("testBack", "returned form server")
  })

  socket.on('disconnect', () => {
    console.log(`User left [${socket.id}] -`)
  })
});

http.listen(3004, () => {
  console.log('listening on *:3004');
});
