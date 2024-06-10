(async _ => {
  // WebSocket
  document.addEventListener('DOMContentLoaded', _ => {
    const socket = io('http://localhost:3000', {
      auth: {
        role: 'streamer'
      }
    })

    document.getElementById('start').onclick = async _ => {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          'width': {
            'min': 1280
          },
          'height': {
            'min': 720
          }
        }
      })
      const mediaRecorder = new MediaRecorder(videoStream, {
        'mimeType': 'video/webm; codecs="vp9"'
      })
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          socket.emit('stream', event.data)
        }
      }
      mediaRecorder.start(500) // 500 ms

      const videoElement = document.getElementById('preview')
      videoElement.srcObject = videoStream
      videoElement.play()
    }
  })
})()
