'use strict'

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
const names = {
  '87.255.84.77': 'Dorin',
  '193.33.93.43': 'Alex',
  '95.65.36.159': 'Andy',
  '89.41.65.137': 'Ion',
  '89.149.98.3': 'Dana',
  '79.140.164.168': 'Alexy',
  '95.65.100.5': 'Alex',
  '127.0.0.1': 'Home'
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  let ip = socket.request.socket.remoteAddress.split(':').pop()
  console.log('+ ' + (names[ip] || ip) + ' connected: '+ ip)

  socket.on('disconnect', () => {
   console.log('- ' + (names[ip] || ip) + ' disconnected: ' + ip)
  })

  socket.on('chat message', (msg) => {
    console.log((names[ip] || ip) + ': ' + msg)
    io.emit('chat message', (names[ip] || ip)+ ': ' + msg)
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})
