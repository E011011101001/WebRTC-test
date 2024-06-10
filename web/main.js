(async _ => {
  // WebSocket
  document.addEventListener('DOMContentLoaded', _ => {

    const mediaSource = new MediaSource()
    const videoElement = document.getElementById('preview')
    videoElement.src = URL.createObjectURL(mediaSource)

    const socket = io('http://localhost:3000', {
      auth: {
        role: 'audience'
      }
    })

    mediaSource.addEventListener('sourceopen', _ => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"')

      socket.on('stream', data => {
        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
          data = new Uint8Array(data)
          sourceBuffer.appendBuffer(data)
          console.log(data)
        } else {
          console.log(mediaSource.readyState)
        }
      })

    })
  })
})()
