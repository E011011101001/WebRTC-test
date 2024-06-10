import { io } from "socket.io-client"

const socket = io('http://localhost:3000')

socket.on('connect', _ => {
  console.log('connected')
})

socket.on('stream', data => {
  console.log(data)
})
