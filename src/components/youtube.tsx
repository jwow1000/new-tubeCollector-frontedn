import { useRef } from 'react'
import YouTube from 'react-youtube'

function VideoPlayer({
  id, opts 
}) {
  const playerRef = useRef(null);
  
  return (
    <YouTube 
      videoId={ id, opts }
    />

  )
}

export default VideoPlayer