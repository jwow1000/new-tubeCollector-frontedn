import { ChangeEvent, useState, RefObject } from "react";
import styles from "./tubePlayer.module.css";

interface SliderProps {
  xfadeVal: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface TubePlayerProps {
  playerRef1: RefObject<HTMLIFrameElement>;

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

function TubePlayer({ playerRef1 }: TubePlayerProps) {
  const [xfadeVal, setXfadeVal] = useState( 50 ); 
  

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const value = parseInt( event.target.value );
    setXfadeVal( value );
    playerRef1.current.volume = value;
  }
  
  
  return (
    <div id={styles.root}>
      <Slider xfadeVal={xfadeVal} handleChange={handleChange}/>
    </div>
  )
}

export default TubePlayer