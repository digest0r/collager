var app = require('express')();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3004;

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
      '/img/fero.jpg',
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

    socket.emit("sessionCheck", {
      id: sessionId,
      success: !!session,
    })
  })

  socket.on('init', (sessionId) => {
    session = getSessionById(sessionId)

    // Entered, init state
    if (session) {
      socket.emit("install", session)
    }
  })

  socket.on('switch', (index) => {
    console.log(`[${socket.id}] SWITCH TO:`, index)

    io.emit("selectIndex", index)
  })

  socket.on('cursor', ({ x, y }) => {
    // console.log("[" + x + " ; " + y + "]")

    socket.broadcast.emit('cursorMoved', { x, y })
  })

  socket.on('disconnect', () => {
    console.log(`User left [${socket.id}] -`)
  })
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
