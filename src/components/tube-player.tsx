import { ChangeEvent, useState, RefObject, useEffect } from "react";
import { youtube_parser } from "../services/imgHandle";
import { xfadeConvert } from "../services/conversions.js";
import Youtube from "../components/youtube";
import styles from "./tubePlayer.module.css";

interface SliderProps {
  xfadeVal: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface TubePlayerProps {
  // playerRef1: RefObject<HTMLIFrameElement>;
  id1: string | null;
  id2: string | null;
}

interface TubeIdState {
  id1: string | null;
  id2: string | null;
}

const Slider = ({ xfadeVal, handleChange}: SliderProps ) => {
  return ( 
    <div className={styles.slideContainer} >
      <input
        type="range"
        onChange={ handleChange }
        min={0}
        max={100}
        step={1}
        value={ xfadeVal }
        className={styles.xfadeSlider}
        />
      
    </div>
  )
}

function TubePlayer({ id1, id2 } : TubePlayerProps) {
  const [xfadeVal, setXfadeVal] = useState( 50 ); 
  const [tubeID1, setTubeID1] = useState<string>("");
  const [tubeID2, setTubeID2] = useState<string>("");

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const value = parseInt( event.target.value );
    setXfadeVal( value );
  }

  useEffect(() => {
    if(id1 && tubeID1 !== id1) {
      setTubeID1( youtube_parser( id1 ) );
    }
    if(id2 && tubeID2 !== id2) {
      setTubeID2( youtube_parser( id2 ) );
    }

  },[id1, id2])
  
  
  return (
    <div id={styles.root}>
      { 
        id1 &&
        <Youtube 
          id={youtube_parser(id1)}
          vol={ xfadeConvert( 100 - xfadeVal, 1) } 
          className={styles.tube1}
        />
      }
      {
        id2 &&
        <Youtube 
          id={youtube_parser(id2)} 
          vol={ xfadeConvert( xfadeVal, 1) } 
          className={styles.tube2} />
      }
      <Slider 
        xfadeVal={xfadeVal} 
        handleChange={handleChange}
      />
    </div>
  )
}

export default TubePlayer