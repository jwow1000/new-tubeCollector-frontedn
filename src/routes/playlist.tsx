import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylist } from "../services/playlists.ts";
import { youtube_parser, convertVid } from "../services/imgHandle.ts";
import { Tube, Playlist as PListType } from "../lib/types.ts";
import AddTube from "../components/add-tube.tsx";
import styles from "../ui/pListStyles.module.css"

// type definitons
type IdParams = {
  id: number | undefined ;
}

// make an embed from any type of youtube link
const handleUtubeURL = (path) => {
  const link = youtube_parser(path);
  // console.log('whats this link look like', link);
  const embed = `https://www.youtube.com/embed/${link}`;
  return embed ? embed : null;
}

function Playlist() {
  console.log("did playlist even load?")
  const { id } = useParams<IdParams>();

  // the playlist info
  const [pList, setPlist] = useState<PListType>();
  // focused playing tube
  const [focusTube, setFocusTube] = useState<Tube>();
  // add-tube focus state
  const [addTubeState, setAddTubeState] = useState(false);

  useEffect( () => {
    const fetchPlaylist = async () => {
      if(id) {
        const data = await getPlaylist( id );
        // set the pList
        setPlist( data );
      }
      console.log(pList?.title)
    } 

    fetchPlaylist();
  }, [])
  // function to handle when a tube is clicked
  function handleTubePlay( item: Tube) {
    console.log("did tube play fire?")
    setFocusTube( item );
    console.log("tube info?", item)
  }
  
  // console.log("loaded playlist", pList);
  
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{pList?.playlist.title}</h1>
      <button
        onClick={() => setAddTubeState(!addTubeState)}
      > 
        ADD A TUBE! 
      </button>
      {
        addTubeState &&
          <AddTube 
            setAddTubeState={setAddTubeState}
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
              onClick={() => {handleTubePlay(item)}}
            >
                
            </img>
          </div>
        ))
      }

      {
        focusTube &&
        <iframe
          src={ handleUtubeURL(focusTube.url) }
          title={focusTube.title} 
          className={styles.focusVid}
        >  
            
  
        </iframe> 
      }
    </div>
  )
}


export default Playlist