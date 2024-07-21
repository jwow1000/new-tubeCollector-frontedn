import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylist } from "../services/playlists.ts";
import { youtube_parser, convertVid } from "../services/imgHandle.ts";
import { Tube, Playlist as PListType } from "../lib/types.ts";
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

  useEffect( () => {
    const fetchPlaylist = async () => {
      if(id) {
        const data = await getPlaylist( id );
        // set the pList
        setPlist( data );
      }
    } 

    fetchPlaylist();
  }, [])

  console.log("loaded playlist", pList);
  
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{pList?.title}</h1>
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
            {/* <img 
              src={ convertVid(item.url) } 
              alt={item.title}
              className={styles.tubePic}
            >
                
            </img> */}
            <iframe
              src={ handleUtubeURL(item.url) }
              title={item.title} 
              className={styles.video}
              allowFullScreen="true"
            >
  
            </iframe>
            {item.title}
            {item.description}
          </div>
        ))
      }
    </div>
  )
}


export default Playlist