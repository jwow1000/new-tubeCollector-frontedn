import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  id: string | null;
  vol: number;
  className: string;

}


function VideoPlayer({ id, vol, className }: VideoPlayerProps) {
  // use react reference
  const player = useRef();

  // useEffect for volume change
  useEffect(() => {
    
  }, [vol])

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  // function to control volume
  const onPlayerReady: YouTubeEvent['data'] = (data) => {
    // access to player in all event handlers via event.target
    console.log("on ready: ", data);
    // console.log("look at onReady event: ", event.target);
    // event.target.setVolume( 1 );
  }
  
  
  // state change
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // access to player in all event handlers via event.target
    console.log( event.target );
    event.target.setVolume(100);
  }

  // const volChange: YouTubeProps['opts']

  

  return (
    <YouTube 
      videoId={id} 
      opts={opts} 
      
      onStateChange={onStateChange}
      RefObject={player}
      className={className}
      onPlayerReady={onPlayerReady}
      
      
    />

  )
}

export default VideoPlayer