import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  tubeId: string | null;
  vol: number;
  className: string;
  setPlayState: (state: number) => void;

}


function VideoPlayer({ tubeId, vol, className, setPlayState}: VideoPlayerProps) {
  // use react reference
  const [player, setPlayer] = useState<YouTubeEvent['target'] | null>(null);

  // callback function to set youtube as useState
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayer( event.target );

  }

  // useEffect for volume change
  useEffect(() => {
    if(player) {
      player.setVolume( vol );
      // console.log( "ugh the player", player );
    }

  }, [vol, player]);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  


  // state change
  const onStateChange: YouTubeProps['onStateChange'] = () => {
    // access to player in all event handlers via event.target
    // console.log( "state changes: ", event.target );
    const fetchState = async () => {
      const data = await player?.getPlayerState();
      return data;
    }
    
    
    if(player) {
      player.setVolume( vol );
      // const playState = player.getPlayerState();
      setPlayState( fetchState() );
    }
    
  }


  return (
    <YouTube 
      videoId={tubeId || ""} 
      opts={opts} 
      className={className}
      onReady={ onPlayerReady }
      onStateChange={onStateChange}
    />

  )
}

export default VideoPlayer