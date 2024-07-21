import { useLoaderData } from "react-router-dom";
import { getPlaylist } from "../services/playlists.ts";
import { youtube_parser, convertVid } from "../services/imgHandle.ts";
import styles from "../ui/pListStyles.module.css"

async function loader({params}) {
  const data = await getPlaylist(params.id);
  return data;
}

// make an embed from any type of youtube link
const handleUtubeURL = (path) => {
  const link = youtube_parser(path);
  // console.log('whats this link look like', link);
  const embed = `https://www.youtube.com/embed/${link}`;
  return embed ? embed : null;
}

function Playlist() {
  const load = useLoaderData();
  const tubes = load.playlist.tubes;
  const title = load.playlist.title;
  console.log("loaded playlist", load.playlist.tubes);
  
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {
        tubes?.map((item, idx) => (
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

Playlist.loader = loader;

export default Playlist