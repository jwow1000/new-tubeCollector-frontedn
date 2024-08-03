import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useConfirm from "../components/alert.tsx";
import { getPlaylist, deletePlaylist } from "../services/playlists.ts";
import { convertVid } from "../services/imgHandle.ts";
import { Tube, Playlist as PListType } from "../lib/types.ts";
import TubePlayer from "../components/tube-player.tsx";
import AddTube from "../components/add-tube.tsx";
import styles from "../ui/pListStyles.module.css"

function Playlist({ refresh }) {
  const { id } = useParams< 'id' >();

  // useConfirm
  const [Dialog, confirmDelete] = useConfirm(
    'Are you sure?',
    'Are you sure you want to delete this Playlist?'
  );
  
  
  // the playlist info
  const [pList, setPlist] = useState<PListType>();
  // focused playing tube1 and tube2
  const [focusTube1, setFocusTube1] = useState<Tube>();
  const [focusTube2, setFocusTube2] = useState<Tube>();
  // state of Alert Dialog
  const [ dialogState, setDialogState ] = useState( false );
  

  // add-tube focus state
  const [addTubeState, setAddTubeState] = useState(false);
  const [updatePlist, setUpdatePlist] = useState(false);

  useEffect( () => {
    const fetchPlaylist = async () => {
      if(id) {
        const data = await getPlaylist( parseInt( id ) );
        // set the pList
        setPlist( data );
      }
      // console.log(pList?.title)
    } 

    fetchPlaylist();
  }, [id, updatePlist, refresh])
  
  // function to handle when a tube is clicked
  function handleTubePlay( item: Tube, point: number) {
    if(point === 1) {
      setFocusTube1( item );
    } else {
      setFocusTube2( item );
    }
    // console.log("tube info?", item)
  }
  
  // function to delete playlist
  const handleDeletePlaylist = async () => {
    const del = async (x: number) => {
      const data = deletePlaylist(x);
      return data;
    }
    setDialogState( true );
    const answer = await confirmDelete();

    if(answer) {
      del( parseInt( id ) );
      setUpdatePlist((prev) => !prev);
      setDialogState( false );

    } else {
      setDialogState( false )
    }
  }

  // function to delete tube
  const handleDeleteTube = async (item: Tube) => {
    console.log( "delete tube", item);
    // const del = async (x: number) => {
    //   const data = deletePlaylist(x);
    //   return data;
    // }
    // setDialogState( true );
    // const answer = await confirmDelete();

    // if(answer) {
    //   del( id );
    //   setUpdatePlist((prev) => !prev);
    //   setDialogState( false );

    // } else {
    //   setDialogState( false )
    // }
  }
  
  return (
    <div>
      {
        dialogState &&
        <Dialog />
      }
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
        <button
          onClick={ handleDeletePlaylist }
          id={ styles.deletePlistButton }
        >
          Delete this Playlist!
        </button>
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
              <button 
                className={styles.deleteTube}
                onClick={() => {handleDeleteTube( item )}}
              >
                Delete
              </button>


            </div>
          ))
        }

        
      </div>
    </div>
  )
}


export default Playlist