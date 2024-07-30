import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  tubeId: string | null;
  vol: number;
  className: string;
  playState: number;

}


function VideoPlayer({ tubeId, vol, className, playState}: VideoPlayerProps) {
  // use react reference
  const [player, setPlayer] = useState<YouTubeProps>( {} );
  const [init, setInit] = useState<boolean>(false);

  // useEffect for volume change
  useEffect(() => {
    if(init) {
      player.setVolume( vol );
    }

  }, [vol]);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  

  // callback function to set youtube as useState
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
    setInit( true );

  }

  // state change
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // access to player in all event handlers via event.target
    console.log( "state changes: ", event.target );
    player.setVolume( vol );
    
  }


  return (
    <YouTube 
      videoId={tubeId} 
      opts={opts} 
      className={className}
      onReady={ onPlayerReady }
      onStateChange={onStateChange}
      
      
    />

  )
}

export default VideoPlayer