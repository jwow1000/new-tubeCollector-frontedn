import { useState, useEffect } from "react";
import { signOut } from "../services/users";
import { useNavigate, Outlet, NavLink} from "react-router-dom";
import { getPlaylists } from "../services/playlists.ts"
import { verifyUser } from "../services/users";
import AddPlaylist from "../components/add-playlist.tsx";
import styles from "../ui/globStyles.module.css";
import useStore from "../lib/useStore.ts";

// Define the types
interface Playlist {
  id: string;
  title: string;
}

function Root() {
  // global user 
  const { globalUser, setGlobalUser } = useStore();
  // useStates
  const [addPlaylistState, setAddPlaylistState] = useState(false);
  const [plists, setPlists] = useState<Playlist[]>([]);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    // fetch the user function
    const fetchUser = async () => {
      try{
        const userData = await verifyUser();
        setGlobalUser( userData.user );

      } catch(error) {
        navigate("/login");
      }
    };

    // get the playlists function
    const fetchPlists = async () => {
      const data = await getPlaylists();
      setPlists( data );
    }

    // fetch the user if there is none
    if(!globalUser) {
      fetchUser();
    }

    // fetch the playlists
    fetchPlists();
  }, [refresh]);     

  const navigate = useNavigate();
  // get data from loader function

  const handleLogout = async () => {
    await signOut();
    
    navigate("/login");
    
    // Redirect or perform other actions after logout
  };

  
  return (
    <div>
      <div id={styles.navBarContainer}>
        <h1 className={styles.userTitle}> user: {globalUser?.username} </h1>
        
        <button 
          type="button"
          onClick={ () => setAddPlaylistState(!addPlaylistState) }
        >
          + Playlist
        </button>

        <button 
          type="button"
          onClick={handleLogout}
        >
          Log Out!
        </button>


      </div>
      <h2>{globalUser?.username}'s playlists: </h2>
      <nav id={styles.pListContainer}>
        {
          plists?.map((item, idx) => (
            <NavLink
              key={`my-playlists-${idx}`}
              to={`playlists/${item.id}`}
              className={styles.pListLink}
            >
              {item.title}
            </NavLink>
          ))
        }
      </nav>
      {
        addPlaylistState &&
        <AddPlaylist setAddPlaylistState={setAddPlaylistState} setRefresh={setRefresh}/>
      }
      <Outlet context={refresh} />
    </div>
  )
}

export default Root