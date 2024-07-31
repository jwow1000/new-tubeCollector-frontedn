import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPlaylist } from "../services/playlists.ts";
import { youtube_parser, convertVid } from "../services/imgHandle.ts";
import { Tube, Playlist as PListType } from "../lib/types.ts";
import TubePlayer from "../components/tube-player.tsx";
import AddTube from "../components/add-tube.tsx";
import styles from "../ui/pListStyles.module.css"

// type definitons
type IdParams = {
  id: number | undefined ;
}

// make an embed from any type of youtube link
// const handleUtubeURL = (path) => {
//   const link = youtube_parser(path);
//   // console.log('whats this link look like', link);
//   const embed = `https://www.youtube.com/embed/${link}`;
//   return embed ? embed : null;
// }

function Playlist() {
  const { id } = useParams<IdParams>();
  
  
  // the playlist info
  const [pList, setPlist] = useState<PListType>();
  // focused playing tube1 and tube2
  const [focusTube1, setFocusTube1] = useState<Tube>();
  const [focusTube2, setFocusTube2] = useState<Tube>();
  

  // add-tube focus state
  const [addTubeState, setAddTubeState] = useState(false);
  const [updatePlist, setUpdatePlist] = useState(false);

  useEffect( () => {
    const fetchPlaylist = async () => {
      if(id) {
        const data = await getPlaylist( id );
        // set the pList
        setPlist( data );
      }
      // console.log(pList?.title)
    } 

    fetchPlaylist();
  }, [id, updatePlist])
  // function to handle when a tube is clicked
  function handleTubePlay( item: Tube, point: number) {
    if(point === 1) {
      setFocusTube1( item );
    } else {
      setFocusTube2( item );
    }
    // console.log("tube info?", item)
  }
  
  // console.log("loaded playlist", pList);
  
  return (
    <div>
      <div id={styles.tubePlayer}>
        { 
          <TubePlayer 
            id1={focusTube1?.url} 
            id2={focusTube2?.url} 
          />
        }
      </div>

      <div className={styles.root}>
        <h1 className={styles.title}>{pList?.playlist.title}</h1>
        <button
          onClick={() => setAddTubeState(!addTubeState)}
          className={styles.addTubeButton}
        > 
          ADD A TUBE! 
        </button>
        {
          addTubeState &&
            <AddTube 
              setAddTubeState={setAddTubeState}
              setUpdatePlist={setUpdatePlist}
            />
        }
        {
          pList?.tubes.map((item, idx) => (
            <div
              key={`tube-${idx}`}
              className={styles.tube}
              style={{
                'left': `${item.posX * 100}%`,
                'top': `${item.posY * 100}%`
              }}
            > 
              <img 
                src={ convertVid(item.url) } 
                alt={item.title}
                className={styles.tubePic}
              >
                  
              </img>
              <button 
                className={styles.tube1Button}
                onClick={() => {handleTubePlay(item, 1)}}
              >
                Tube 1
              </button>

              <button 
                className={styles.tube2Button}
                onClick={() => {handleTubePlay(item, 2)}}
              >
                Tube 2
              </button>


            </div>
          ))
        }

        
      </div>
    </div>
  )
}


export default Playlist