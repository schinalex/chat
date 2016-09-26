const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  var address = socket.request.socket.remoteAddress.split(':').pop()

  socket.on('disconnect', () => {
   console.log('user disconnected')
  })

  socket.on('chat message', (msg) => {
    console.log(address + '> ' + msg)
    io.emit('chat message', address + '> ' + msg)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
