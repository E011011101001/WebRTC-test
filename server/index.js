import { createServer } from 'node:http'
import { Server } from "socket.io";

const server = createServer()
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log(`a user ${socket.id} connected`)

  if (socket.handshake.auth.role === 'streamer') {
    socket.on('stream', data => socket.broadcast.emit('stream', data))
  }

  socket.on('disconnect', _ => {
    console.log(`user ${socket.id} disconnected`)
  })

})


server.listen(3000, _ => {
  console.log('Server started listening at 3000')
})
