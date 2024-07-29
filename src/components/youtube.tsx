import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  id: string | null;
  vol: number;
  className: string;

}


function VideoPlayer({ id, vol, className }: VideoPlayerProps) {
  // use react reference
  // const player = useRef();
  const [player, setPlayer] = useState();
 

  // useEffect for volume change
  useEffect(() => {
    if(player) {
      player.setVolume( vol );
    }
  }, [vol])

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  

  // callback function to set youtube as useState
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log("did on ready fire?");
    setPlayer(event.target);
    console.log( "player: ", player )
  }


  // function to control volume
  // const onPlayerReady: YouTubeEvent['data'] = (data) => {
  //   // access to player in all event handlers via event.target
  //   console.log("on ready: ", data);
  //   // console.log("look at onReady event: ", event.target);
  //   // event.target.setVolume( 1 );
  // }
  
  
  // state change
  // const onStateChange: YouTubeProps['onStateChange'] = (event) => {
  //   // access to player in all event handlers via event.target
  //   console.log( event.target );
  //   event.target.setVolume(100);
  // }

  // const volChange: YouTubeProps['opts']

  

  return (
    <YouTube 
      videoId={id} 
      opts={opts} 
      
      // onStateChange={onStateChange}
      className={className}
      onReady={ onPlayerReady }
      
      
    />

  )
}

export default VideoPlayer