import YouTube, { YouTubeProps } from 'react-youtube';
import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  id: string;
  vol: number;

}


function VideoPlayer({ id, vol }: VideoPlayerProps) {
  // use react reference
  const player = useRef();

  // useEffect for volume change
  useEffect(() => {
    player?.setVolume( vol );
  }, [vol])

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
    volume: 0,
  };
  // function to control volume
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // access to player in all event handlers via event.target
    console.log( event.target );
  }

  // const volChange: YouTubeProps['opts']

  

  return (
    <YouTube 
      videoId={id} 
      opts={opts} 
      onStateChange={onStateChange}
      RefObject={player}
      
    />

  )
}

export default VideoPlayer