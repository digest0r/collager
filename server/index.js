var app = require('express')();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const activeSessions = [
  {
    id: '123',
    name: 'Eritrea 1',
    imageUrls: [
      '/img/эритрея город.jpg',
      '/img/эритрея достопримечательности.jpg',
      '/img/эритрея еда.jpg',
      '/img/эритрея коллаж1.jpg',
      '/img/эритрея природа.jpg',
      // '/img/myslienka-je-materialna-sk-instagram.jpg',
    ],
  },
  {
    id: '1234',
    name: 'Eritrea 2',
    imageUrls: [
      '/img/эритрея город.jpg',
      '/img/эритрея достопримечательности.jpg',
      '/img/эритрея природа.jpg',
    ],
  }
]

const getSessionById = (sessionId) => {
  return activeSessions.find(({ id }) => id === sessionId)
}

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('sessionCheck', (sessionId) => {
    session = getSessionById(sessionId)

    console.log("Chceked: ", sessionId, " <- validation");

    socket.emit("sessionCheck", {
      id: sessionId,
      success: !!session,
    })
  })

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
