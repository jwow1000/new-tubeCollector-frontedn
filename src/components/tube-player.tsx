import React, { ChangeEvent, useState, useEffect } from "react";
import { youtube_parser } from "../services/imgHandle";
import { xfadeConvert, volCurve } from "../services/conversions.js";
import tri from "../assets/tri.png";
import sqr from "../assets/sqr.png";

import Youtube from "../components/youtube";
import styles from "./tubePlayer.module.css";

interface SliderProps {
  value: number | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
}
interface TubePlayerProps {
  // playerRef1: RefObject<HTMLIFrameElement>;
  id1: string | null;
  id2: string | null;
}

interface GainAmt {
  gain1: number | null;
  gain2: number | null;
}

interface SliderVals {
  xfade: number;
  curve: number;
}

// the xfade slider
const Slider = ({ value, handleChange, id, name}: SliderProps ) => {
  return ( 
    <div className={styles.slideContainer} >
      <input
        type="range"
        onChange={ handleChange }
        min={0}
        max={100}
        step={1}
        value={ value }
        name={ name }
        className={styles.slider}
        id={id}
        />
      
    </div>
  )
}



// the vertical gain components
const Gain = ({ value, handleChange, id, name}: SliderProps ) => {
  return ( 
    <div className={styles.slideContainer} >
      <input
        type="range"
        onChange={ handleChange }
        min={0}
        max={100}
        step={1}
        value={ value }
        className={ styles.gainSlider }
        id={id}
        name={name}
        />
      
    </div>
  )
}



function TubePlayer({ id1, id2 } : TubePlayerProps) {
  const [sliderVals, setSliderVals] = useState<SliderVals>({
    xfade: 50,
    curve: 0
  }); 
  const [tubeID1, setTubeID1] = useState<string>("");
  const [tubeID2, setTubeID2] = useState<string>("");
  const [gainAmt, setGainAmt] = useState<GainAmt>({
    gain1: 100,
    gain2: 100
  });

  // change handlers
  const handleSliderChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const name = event.target.name;
    const value = parseInt( event.target.value );
    setSliderVals({
      ...sliderVals,
      [name]: value
    });
    // console.log("sliders", sliderVals)
  }

  const handleGainChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const name = event.target.name;
    const value = parseInt(event.target.value)
    setGainAmt({
      ...gainAmt,
      [name]: value
    });
    // console.log("gains", gainAmt)
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
      <div id={styles.tube1Container}>
        { 
          id1 &&
          <Youtube 
            tubeId={youtube_parser(id1)}
            vol={ 
              volCurve(gainAmt.gain1) * 
              xfadeConvert( 
                100 - sliderVals.xfade, 
                sliderVals.curve/100
              ) 
            } 
            className={styles.tube1}
          />
        }
      </div>
      <Gain 
        id={styles.gain1}
        name="gain1"
        value={gainAmt.gain1}
        handleChange={ handleGainChange } 
      />
      <div id={styles.tube2Container}>
        {
          id2 &&
          <Youtube 
            tubeId={youtube_parser(id2)} 
            vol={ 
              volCurve(gainAmt.gain2) * 
              xfadeConvert( 
                sliderVals.xfade, 
                sliderVals.curve/100
              ) 
            } 
            className={styles.tube2} />
        }
      </div>
      <Gain 
        id={styles.gain2}
        name="gain2"
        value={gainAmt.gain2}
        handleChange={ handleGainChange } 
      />
      <div id={styles.curveContainer}>
        <img src={tri} alt="a simple line drawing of a linear ramp going up halfway along its length and then back down, to represent a wide mix for the crossfader" id={styles.triangle} />
        <Slider 
          name="curve"
          id={styles.curve}
          handleChange={ handleSliderChange }
          value={ sliderVals.curve }
        />
        <img src={sqr} alt="a simple line drawing of a linear ramp going up immediately up and then back down at the very end, to represent a sharp mix for the crossfader" id={styles.square} />

      </div>
      <Slider 
        name="xfade"
        value={sliderVals.xfade} 
        handleChange={ handleSliderChange }
        id={styles.xfade}
      />
    </div>
  )
}

export default TubePlayer